import {env} from 'cloudflare:workers';
export function db(){const b=(env as unknown as {DB?:D1Database}).DB;if(!b)throw Error('Storage unavailable');return b}
export function ownerEmail(){return ((env as unknown as {OWNER_EMAIL?:string}).OWNER_EMAIL||'').toLowerCase()}
