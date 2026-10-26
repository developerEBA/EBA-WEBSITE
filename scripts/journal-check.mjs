import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {stories,storiesByType,storyUrl} from '../src/lib/stories.ts';
import {seriesSchema,publicSeries,publishedEpisodes,episodeNavigation} from '../src/lib/story-series.ts';
import {parseReadingProgress} from '../src/lib/reading-progress.ts';
const now=Date.parse('2026-10-26T12:00:00Z');
const episode=(number,status='published',publishedAt='2026-10-01T12:00:00Z')=>({slug:`episode-${number}`,number,title:`Test ${number}`,status,publishedAt,readingMinutes:2,blocks:[{type:'p',segments:[{type:'text',text:'Test fixture only.'}]}]});
const series={slug:'test-only',title:'Test fixture',description:'Not public content.',author:'Test author',status:'published',publishedAt:'2026-10-01T12:00:00Z',seriesStatus:'Ongoing',episodes:[episode(3),episode(2,'draft'),episode(1),episode(4,'scheduled','2027-01-01T12:00:00Z')]};
test('all original posts, body blocks and photographs are preserved',async()=>{const original=JSON.parse(await readFile(new URL('../src/lib/stories/posts.json',import.meta.url),'utf8'));assert.equal(stories.filter(s=>!s.mediaCoverage).length,original.length);for(const post of original){const actual=stories.find(s=>s.slug===post.slug);assert.deepEqual(actual.blocks,post.blocks);assert.equal(actual.image,post.image);assert.equal(actual.title,post.title);}});
test('original classifications have distinct URLs',()=>{assert.equal(storiesByType('article').length,12);assert.equal(storiesByType('press-release').length,12);for(const s of stories)assert.equal(storyUrl(s),`/stories/${s.contentType==='article'?'articles':'press-releases'}/${s.slug}`);});
test('only published episodes are ordered numerically',()=>assert.deepEqual(publishedEpisodes(series,now).map(e=>e.number),[1,3]));
test('navigation skips drafts and future episodes',()=>{assert.equal(episodeNavigation(series,'episode-1',now).next.slug,'episode-3');assert.equal(episodeNavigation(series,'episode-3',now).previous.slug,'episode-1');assert.equal(episodeNavigation(series,'episode-3',now).next,undefined);assert.equal(episodeNavigation(series,'episode-2',now).current,undefined);});
test('draft parent hides all episodes',()=>assert.deepEqual(publishedEpisodes({...series,status:'draft'},now),[]));
test('duplicate episode numbers and slugs are rejected',()=>assert.equal(seriesSchema.safeParse({...series,episodes:[episode(1),episode(1)]}).success,false));
test('reading progress only resumes a published episode and valid position',()=>{const saved={episodeSlug:'episode-1',position:.4,updatedAt:now};assert.deepEqual(parseReadingProgress(JSON.stringify(saved),['episode-1']),saved);for(const value of [{...saved,episodeSlug:'draft'},{...saved,position:2},{...saved,position:-1}])assert.equal(parseReadingProgress(JSON.stringify(value),['episode-1']),null);assert.equal(parseReadingProgress('invalid',[]),null);});
test('illustrative series are not published',()=>assert.deepEqual(publicSeries(now),[]));

test("external coverage has publisher attribution, source links and short summaries",()=>{const coverage=stories.filter(s=>s.mediaCoverage);assert.equal(coverage.length,8);assert.equal(new Set(stories.map(s=>s.slug)).size,stories.length);for(const s of coverage){assert.ok(s.publication);assert.match(s.sourceUrl,/^https:\/\//);assert.equal(s.blocks.length,1);assert.ok(s.excerpt.length<600);}});
