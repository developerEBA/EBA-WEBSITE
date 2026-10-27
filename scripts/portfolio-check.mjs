import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
import {portfolioClients,portfolioCategories} from '../src/lib/client-portfolio.ts';
import {presentedEvents} from '../src/lib/event-presentation.ts';
test('all supplied portfolio groups and names are represented',()=>{
  assert.equal(portfolioClients.length,30);
  for(const [category,count] of Object.entries({'Companies':16,'Events':2,'Foundations':2,'Personal Brands':9,'Podcasts':1}))assert.equal(portfolioClients.filter(c=>c.category===category).length,count);
  assert.equal(new Set(portfolioClients.map(c=>`${c.category}:${c.name}`)).size,30);
  for(const name of ['Omoniyi Dada','Yinka Adebayo','Ope Filani','Oscar Oyekan','Temitope Rusenwe'])assert.ok(portfolioClients.some(c=>c.name===name&&c.category==='Personal Brands'));
});
test('all verified logo and portrait assets exist locally',()=>{for(const c of portfolioClients){assert.ok(portfolioCategories.includes(c.category));for(const file of [c.logo,c.portrait].filter(Boolean))assert.ok(existsSync('public'+file),file);}});
test('sport and partnership filters can include the same event',()=>{for(const id of ['swing-for-autism','swing-for-autism-ghana']){const e=presentedEvents.find(e=>e.id===id);assert.equal(e.group,'Sport');assert.equal(e.partnership,true);}assert.equal(presentedEvents.find(e=>e.id==='falz-community-hangout').partnership,true);});
test('owned community and culture events are not relabelled as partnerships',()=>{const culture=presentedEvents.find(e=>e.id==='independence-edition');assert.equal(culture.group,'Culture');assert.equal(culture.partnership,false);for(const id of ['community-return','sip-and-share','movies-and-conversations'])assert.equal(presentedEvents.find(e=>e.id===id).partnership,false);});
