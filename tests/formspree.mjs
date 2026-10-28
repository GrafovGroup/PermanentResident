import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import ts from 'typescript';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
function compile(path, imports){return readFile(new URL(path,import.meta.url),'utf8').then(source=>{const exports={};new Function('require','exports',ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText)(id=>imports[id]??require(id),exports);return exports;});}
const {notifyFormspree,FORMSPREE_ENDPOINT}=await compile('../lib/formspree.ts',{});
let stored=new Map(),audit=[],calls=[],outcome='success',storageFails=false;
const database={prepare(sql){let args;return {bind(...a){args=a;return this},async first(){if(sql.startsWith('SELECT id'))return stored.get(args[0])??null;return {count:1}},async run(){if(sql.startsWith('INSERT INTO audit'))audit.push(args);return {}},sql,get args(){return args}}},async batch(statements){if(storageFails)throw Error('Database unavailable');for(const s of statements){if(s.sql.startsWith('INSERT INTO enquiries'))stored.set(s.args[1],{id:s.args[0]});else audit.push(s.args)}return []}};
const {POST}=await compile('../app/api/enquiries/route.ts',{'@/lib/db':{db:()=>database},'@/lib/formspree':{notifyFormspree}});
const originalFetch=globalThis.fetch;
globalThis.fetch=async(url,options)=>{assert.equal(url,FORMSPREE_ENDPOINT);assert.equal(options.headers.Accept,'application/json');assert(options.signal instanceof AbortSignal);calls.push(JSON.parse(options.body));if(outcome==='timeout')throw new DOMException('Timeout','TimeoutError');if(outcome==='invalid-json')return new Response('<html>Error</html>',{status:502});if(outcome==='rate')return Response.json({errors:[{message:'Rate limited'}]},{status:429});return Response.json({ok:true});};
const base={requestId:crypto.randomUUID(),kind:'client',name:'Automated test',email:'test@example.com',locale:'en',language:'en',country:'Canada',status:'worker',destination:'ontario',pathway:'express-entry',timing:'soon',handling:true,sharing:false,marketing:false,website:'',preferences:'A question'};
async function submit(overrides={},origin='https://site.example'){return POST(new Request('https://site.example/api/enquiries',{method:'POST',headers:{Origin:origin,'Content-Type':'application/json'},body:JSON.stringify({...base,...overrides})}));}
try{
assert.equal((await submit({handling:false})).status,400);assert.equal((await submit({website:'bot'})).status,400);assert.equal((await submit({},'https://attacker.example')).status,403);assert.equal(calls.length,0);
let r=await submit();assert.equal(r.status,201);let b=await r.json();assert.equal(b.notification,'sent');assert.equal(calls.length,1);assert.equal(calls[0].email,base.email);assert.equal(calls[0].message,base.preferences);assert.equal(calls[0].reference,b.receipt);assert.equal(calls[0].sharing,false);assert.equal(calls[0].marketing,false);assert(!('assessment' in calls[0]));assert(!('requestId' in calls[0]));assert(!('website' in calls[0]));assert(audit.some(a=>a[3]==='formspree_sent'));
r=await submit();assert.equal(r.status,200);assert.equal((await r.json()).receipt,b.receipt);assert.equal(calls.length,1);
r=await submit({requestId:crypto.randomUUID(),locale:'fr',language:'fr',assessment:{education:'degree'},sharing:true});assert.equal(r.status,201);assert.equal(calls.at(-1).locale,'fr');assert.equal(calls.at(-1).assessment,'{"education":"degree"}');assert.equal(calls.at(-1).sharing,true);
r=await submit({requestId:crypto.randomUUID(),kind:'partner',organization:'Test firm',authorization:'Test only',locations:'Ontario',languages:'French',practiceAreas:'PR'});assert.equal(r.status,201);assert.match(calls.at(-1)._subject,/Professional interest/);
for(outcome of ['rate','timeout','invalid-json']){r=await submit({requestId:crypto.randomUUID()});assert.equal(r.status,201);b=await r.json();assert.equal(b.notification,'failed');assert([...stored.values()].some(x=>x.id===b.receipt));assert.equal(audit.at(-1)[3],'formspree_failed');}
storageFails=true;const before=calls.length;r=await submit({requestId:crypto.randomUUID()});assert.equal(r.status,503);assert.equal(calls.length,before);
console.log('PASS: consent and origin validation, honeypot, client/partner payloads, optional assessment, French locale, successful delivery, duplicate prevention, provider rejection, timeout, malformed response, and storage-failure safety. All delivery calls mocked; no messages sent.');
}finally{globalThis.fetch=originalFetch;}
