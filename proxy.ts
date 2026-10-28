import {NextRequest,NextResponse} from 'next/server';

export function proxy(request:NextRequest){
  const headers=new Headers(request.headers);
  // Derive language from the URL, never from a caller-supplied header.
  headers.set('x-site-language',request.nextUrl.pathname.split('/')[1]==='fr'?'fr':'en');
  return NextResponse.next({request:{headers}});
}
export const config={matcher:['/((?!api|_next|images|favicon|robots.txt|sitemap.xml).*)']};
