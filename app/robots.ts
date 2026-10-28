import {origin} from '@/lib/site';
export default function robots(){return {rules:{userAgent:'*',allow:'/',disallow:['/admin','/api/','/signin-with-chatgpt','/signout-with-chatgpt','/callback']},sitemap:origin+'/sitemap.xml'}}
