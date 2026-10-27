import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync, readFileSync} from 'node:fs';
import {globalFootprint} from '../src/lib/global-footprint.ts';

const countries = JSON.parse(readFileSync('src/lib/world-map.json', 'utf8'));

test('every client location maps to a world country and valid coordinates', () => {
  assert.equal(new Set(globalFootprint.map(location => location.id)).size, globalFootprint.length);
  for (const location of globalFootprint) {
    assert.ok(countries.some(country => country.name === location.country), location.country);
    const [longitude, latitude] = location.coordinates;
    assert.ok(longitude >= -180 && longitude <= 180 && latitude >= -60 && latitude <= 85);
    for (const client of location.clients) {
      for (const asset of [client.logo, client.portrait].filter(Boolean)) assert.ok(existsSync('public' + asset), asset);
    }
  }
});

test('Nigeria represents organisations as well as personal brands', () => {
  const clients = globalFootprint.find(location => location.id === 'nigeria').clients;
  for (const category of ['Companies', 'Events', 'Foundations', 'Personal Brands']) assert.ok(clients.some(client => client.category === category));
});

test('Omoniyi Dada is shown as a person in South Africa', () => {
  const clients = globalFootprint.find(location => location.id === 'south-africa').clients;
  assert.equal(clients.find(client => client.name === 'Omoniyi Dada').category, 'Personal Brands');
  assert.ok(!clients.some(client => client.category === 'Foundations'));
});
