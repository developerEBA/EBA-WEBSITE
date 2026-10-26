import ts from 'typescript';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
export async function resolve(specifier,context,next){if(specifier.startsWith('@/'))return {url:pathToFileURL(path.resolve('src',specifier.slice(2)+(path.extname(specifier)?'':'.ts'))).href,shortCircuit:true};return next(specifier,context);}
export async function load(url,context,next){if(url.endsWith('.json'))return {format:'module',shortCircuit:true,source:`export default ${await readFile(new URL(url),'utf8')};`};if(url.endsWith('.ts'))return {format:'module',shortCircuit:true,source:ts.transpileModule(await readFile(new URL(url),'utf8'),{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText};return next(url,context);}
