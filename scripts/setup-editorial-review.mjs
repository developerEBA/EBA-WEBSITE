import { mkdir, readFile, appendFile, writeFile } from 'node:fs/promises';
import { randomBytes } from 'node:crypto';
import path from 'node:path';
const envFile=path.resolve('.env.local');
const current=await readFile(envFile,'utf8').catch(error=>{if(error.code==='ENOENT')return '';throw error;});
if(/^EBA_EDITORIAL_REVIEW_KEY\s*=\s*.+$/m.test(current)){
 console.log('Private editorial review already has a local access key. No credentials were changed.');
}else{
 const directory=path.resolve('.eba-private');
 await mkdir(directory,{recursive:true,mode:0o700});
 const key=randomBytes(32).toString('base64url');
 await writeFile(path.join(directory,'review-access-key.txt'),key+'\n',{flag:'wx',mode:0o600});
 await appendFile(envFile,`${current.endsWith('\n')||!current?'':'\n'}EBA_EDITORIAL_REVIEW_KEY=${key}\n`,{mode:0o600});
 console.log('Created a private local editorial review key. It was saved outside public files and was not printed. Restart the app to load it.');
}
