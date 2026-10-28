import {getChatGPTUser} from '@/app/chatgpt-auth';
import {ownerEmail} from './db';
export async function owner(){const u=await getChatGPTUser();return u&&ownerEmail()&&u.email.toLowerCase()===ownerEmail()?u:null}
export function sameOrigin(req:Request){return req.headers.get('origin')===new URL(req.url).origin}
