import type {MetadataRoute} from 'next';
import {publicPaths} from '@/lib/seo';
import {origin,href,Lang,reviewed} from '@/lib/site';
export default function sitemap():MetadataRoute.Sitemap{return (['en','fr'] as Lang[]).flatMap(l=>publicPaths.map(p=>({url:origin+href(l,p),lastModified:p==='pr-card/renewal'?'2026-10-28':reviewed,alternates:{languages:{en:origin+href('en',p),fr:origin+href('fr',p),'x-default':origin+href('en',p)}}})))}
