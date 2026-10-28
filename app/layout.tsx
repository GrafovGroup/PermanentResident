import type { Metadata } from 'next';
import {headers} from 'next/headers';
import './globals.css';
export const metadata:Metadata={title:{default:'Permanent Resident | Your next chapter in Canada',template:'%s | Permanent Resident'},description:'Explore Canadian permanent residence pathways and request help from an authorized immigration professional. Independent guidance in English and French.',icons:{icon:[{url:'/favicon.svg?v=red-white-1',type:'image/svg+xml',sizes:'any'},{url:'/favicon-32.png?v=red-white-1',type:'image/png',sizes:'32x32'},{url:'/favicon-16.png?v=red-white-1',type:'image/png',sizes:'16x16'}],shortcut:'/favicon.ico?v=red-white-1',apple:[{url:'/apple-touch-icon.png?v=red-white-1',sizes:'180x180',type:'image/png'}]}};
export default async function RootLayout({children}:{children:React.ReactNode}){const language=(await headers()).get('x-site-language')==='fr'?'fr':'en';return <html lang={language}><body>{children}</body></html>}
