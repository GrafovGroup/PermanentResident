import {Lang,tr,href} from '@/lib/site';
import {editorialImages,ImageKey} from '@/lib/media';

export function CanadianFlag({className='',label=false,l='en'}:{className?:string;label?:boolean;l?:Lang}){
 return <img className={'canadian-flag '+className} src="/images/canada-flag.svg" width="48" height="24" alt={label?tr(['Canadian flag','Drapeau canadien'],l):''} aria-hidden={label?undefined:true}/>;
}
export function EditorialImage({image,l,priority=false,className=''}:{image:ImageKey;l:Lang;priority?:boolean;className?:string}){
 const asset=editorialImages[image];return <img className={'editorial-image '+className} src={`/images/${asset.file}-1200.webp`} srcSet={`/images/${asset.file}-600.webp 600w, /images/${asset.file}-1200.webp 1200w`} sizes="(max-width:680px) 100vw, (max-width:950px) 50vw, 600px" width="1200" height="800" alt={tr(asset.alt,l)} loading={priority?'eager':'lazy'} fetchPriority={priority?'high':undefined} decoding="async"/>;
}
export function LifeInCanada({l}:{l:Lang}){
 const stories:[ImageKey,string,[string,string],[string,string]][]=[
 ['work','get-pr/express-entry',['A place for your ambitions','Une place pour vos ambitions'],['Explore pathways connected to your skills and experience.','Explorez les voies liées à vos compétences et à votre expérience.']],
 ['family','get-pr/family-sponsorship',['Closer to the people you love','Plus près de vos proches'],['Understand the pathways that help eligible families reunite.','Comprenez les voies de réunification des familles admissibles.']],
 ['citizenship','citizenship',['A future you can call your own','Un avenir qui vous ressemble'],['Plan the next chapter after permanent residence.','Préparez le prochain chapitre après la résidence permanente.']]
 ];
 return <section className="canada-stories"><div className="wrap section"><div className="section-head"><div><span className="eyebrow"><CanadianFlag/>{tr(['Life in Canada','La vie au Canada'],l)}</span><h2>{tr(['More than a destination. A new beginning.','Plus qu’une destination. Un nouveau départ.'],l)}</h2></div><p>{tr(['Work, family and belonging. Explore the possibilities behind your next step.','Travail, famille et appartenance. Explorez les possibilités de votre prochaine étape.'],l)}</p></div><div className="grid story-grid">{stories.map(([image,path,title,copy])=><article className="story-card" key={path}><a href={href(l,path)} tabIndex={-1} aria-hidden="true"><EditorialImage image={image} l={l}/></a><div><h3><a href={href(l,path)}>{tr(title,l)}</a></h3><p>{tr(copy,l)}</p><a className="link" href={href(l,path)}>{tr(['EXPLORE THE GUIDE','EXPLORER LE GUIDE'],l)} ↗</a></div></article>)}</div><p className="image-note">{tr(['Illustrative scenes of Canadian life.','Scènes illustratives de la vie au Canada.'],l)}</p></div></section>;
}
