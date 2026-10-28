import {owner} from '@/lib/admin-auth';
import {getChatGPTUser,chatGPTSignInPath} from '@/app/chatgpt-auth';
import Admin from '@/components/site/admin';
export const dynamic='force-dynamic';
export const metadata={title:'Owner workspace',robots:{index:false,follow:false}};
export default async function Page(){const u=await getChatGPTUser();if(!u)return <main className="wrap section"><h1>Owner workspace</h1><p>Sign in with the Site owner’s ChatGPT account.</p><a className="btn navy" href={chatGPTSignInPath('/admin')} target="_top">SIGN IN WITH CHATGPT</a></main>;if(!await owner())return <main className="wrap section"><h1>Owner access required</h1><p>This workspace is restricted to the configured owner.</p><a className="btn" href="/en">BACK TO SITE</a></main>;return <Admin/>}
