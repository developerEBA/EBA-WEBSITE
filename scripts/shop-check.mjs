import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';
const source=await readFile(new URL('../src/lib/shop.ts',import.meta.url),'utf8');
const code=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const {parseBag,shopProducts,merchandiseEmail,shopPrice}=await import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
const item={slug:'everyday-bottle',colour:'Forest green',option:'Standard',quantity:2};
test('valid selections survive a bag round trip',()=>assert.deepEqual(parseBag(JSON.stringify([item])),[item]));
test('invalid JSON and non-array input produce an empty bag',()=>{for(const value of ['broken','null','{}','1'])assert.deepEqual(parseBag(value),[]);});
test('unknown products and options are rejected',()=>{assert.deepEqual(parseBag(JSON.stringify([{...item,slug:'not-a-product'},{...item,option:'not-an-option'},null])),[]);});
test('invalid quantities are rejected',()=>{for(const quantity of [0,-1,11,1.5,'2',null])assert.deepEqual(parseBag(JSON.stringify([{...item,quantity}])),[]);});
test('duplicate lines merge with a bounded quantity',()=>{assert.deepEqual(parseBag(JSON.stringify([item,{...item,quantity:10}])),[{...item,quantity:10}]);});
test('shirt size preferences remain separate',()=>{const lines=[{slug:'signature-shirt',colour:'Forest green',option:'M',quantity:1},{slug:'signature-shirt',colour:'Forest green',option:'L',quantity:1}];assert.deepEqual(parseBag(JSON.stringify(lines)),lines);});
test('enquiry email uses the approved address and readable selections',()=>{const email=new URL(merchandiseEmail([item]));assert.equal(email.pathname,'hello@enibrand.com');assert.ok(email.searchParams.get('body').includes('The Everyday Bottle — Forest green — quantity 2'));});
test('preview catalogue does not invent prices or stock',()=>{assert.equal(shopProducts.length,8);for(const product of shopProducts){assert.equal(product.priceNGN,null);assert.equal(product.status,'preview');assertAsset(product.image);for(const colour of product.colours)assertAsset(colour.image);}});
function assertAsset(asset){assert.ok(asset.startsWith('/images/shop/'));assert.ok(existsSync(new URL('../public'+asset,import.meta.url)));}

test('different colours remain separate bag entries',()=>{const lines=[item,{...item,colour:'Black'}];assert.deepEqual(parseBag(JSON.stringify(lines)),lines);});
test('invalid colours cannot enter the bag',()=>assert.deepEqual(parseBag(JSON.stringify([{...item,colour:'not-a-colour'}])),[]));

test('prices can be supplied later without changing the UI',()=>{assert.equal(shopPrice(null),'Price to be confirmed');assert.ok(shopPrice(1000).includes('1,000'));});
