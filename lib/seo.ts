import {cityName} from './cities';
import {editorialImages,pageImages} from './media';
import type {Metadata} from 'next';
import {Lang,tr,href,origin,Bi,reviewed} from './site';
import {articles,hubs} from './content';
import {places,cities} from './places';
import {policies} from './policies';

export const special:Record<string,{title:Bi;intro:Bi}>={
'request-help':{title:['Find professional help for your next step','Trouvez de l’aide pour votre prochaine étape'],intro:['Tell us about your situation. We review requests for a possible connection with an authorized immigration consultant or lawyer.','Expliquez votre situation. Nous examinons les demandes pour une éventuelle mise en relation avec un consultant ou avocat autorisé.']},
'partner-with-us':{title:['Work with PermanentResident.ca','Collaborer avec PermanentResident.ca'],intro:['For authorized immigration consultants, lawyers and eligible Québec professionals interested in referrals.','Pour les consultants, avocats et professionnels québécois autorisés intéressés par des mises en relation.']},
'find-help':{title:['Find an immigration professional','Trouver un professionnel de l’immigration'],intro:['Explore professional resources, verify authorization and request help suited to your situation.','Explorez les ressources, vérifiez les autorisations et demandez une aide adaptée.']},
'provinces':{title:['Explore Canada, province by province','Explorer le Canada, province par province'],intro:['Understand local immigration routes and practical resources before choosing where to settle.','Comprenez les voies locales et les ressources avant de choisir votre destination.']},
'cities':{title:['Newcomer city guides','Guides des villes pour nouveaux arrivants'],intro:['Local newcomer resources, arrival checklists and immigration guidance for 25 cities across every Canadian province and territory.','Ressources locales, listes d’arrivée et renseignements d’immigration pour 25 villes dans toutes les provinces et tous les territoires.']},
 'tools/pathway-finder':{title:['PR Pathway Finder','Explorateur de voies RP'],intro:['Explore potentially relevant pathways in a few minutes. No contact details required.','Explorez les voies potentiellement pertinentes en quelques minutes. Aucune coordonnée requise.']},
 'tools/residency-calculator':{title:['PR Residency Calculator','Calculateur de résidence RP'],intro:['Estimate the days you have spent in Canada as a permanent resident.','Estimez les jours passés au Canada comme résident permanent.']},
 'tools/checklists':{title:['Prepare your next steps','Préparez vos prochaines étapes'],intro:['Practical checklists for your application research and arrival in Canada.','Des listes pratiques pour préparer vos démarches et votre arrivée au Canada.']},
 'tools':{title:['Tools & official calculators','Outils et calculateurs officiels'],intro:['Plan your next steps with transparent tools and direct official resources.','Préparez vos démarches avec des outils transparents et des ressources officielles.']}
};
export function resolve(path:string,l:Lang){const a=articles.find(x=>x.slug===path),p=places.find(x=>'provinces/'+x.slug===path),c=cities.find(x=>'cities/'+x.slug===path);if(!path)return {title:tr(['Your next chapter in Canada','Votre prochain chapitre au Canada'],l),intro:tr(['Canadian permanent residence pathways and professional-help enquiries.','Voies de résidence permanente et demandes d’aide professionnelle.'],l)};if(a)return{title:tr(a.title,l),intro:tr(a.intro,l)};if(p)return {title:tr(p.name,l)+' · '+tr(['Immigration & professional help','Immigration et aide professionnelle'],l),intro:tr(p.text,l)};if(c)return{title:cityName(c,l)+' · '+tr(['Immigration & newcomer guide','Guide d’immigration et d’accueil'],l),intro:tr(c.text,l)};const x=hubs[path]||special[path];if(x)return{title:tr(x.title,l),intro:tr(x.intro,l)};if(policies[path])return{title:tr(policies[path].title,l),intro:tr(['How PermanentResident.ca operates. Updated September 19, 2026.','Fonctionnement de PermanentResident.ca. Mise à jour le 19 septembre 2026.'],l)};return null}

// A single route inventory keeps metadata, breadcrumbs and the sitemap aligned.
export const publicPaths=[...new Set(['',...Object.keys(hubs),...articles.map(a=>a.slug),...places.map(p=>'provinces/'+p.slug),...cities.map(c=>'cities/'+c.slug),...Object.keys(policies),...Object.keys(special)])];
const searchTitles:Record<string,Bi>={
'':['Canadian Permanent Residence: Guides & Professional Help','Résidence permanente au Canada : guides et aide'],
'get-pr':['Canadian Permanent Residence Programs','Programmes de résidence permanente au Canada'],
'already-a-pr':['Canadian PR Status, Residency & Travel','Statut RP au Canada, résidence et voyages'],
'pr-card':['Canada PR Card: Apply, Renew or Replace','Carte RP du Canada : demande et renouvellement'],
'citizenship':['Canadian Citizenship: Eligibility & Application','Citoyenneté canadienne : critères et demande'],
'new-to-canada':['Newcomer Guide to Settling in Canada','Guide des nouveaux arrivants au Canada'],
'provinces':['Canadian Immigration by Province & Territory','Immigration au Canada par province et territoire'],
'cities':['Canadian City Guides for Newcomers','Guides des villes canadiennes pour nouveaux arrivants'],
'get-pr/express-entry':['Express Entry: Canadian Permanent Residence','Entrée express : résidence permanente au Canada'],
'pr-card/renewal':['PR Card Renewal in Canada','Renouvellement de la carte RP au Canada'],
'get-pr/provincial-nominee-program':['Provincial Nominee Program (PNP) Guide','Guide du Programme des candidats des provinces'],
'get-pr/quebec':['Québec Immigration: PSTQ & PEQ Guide','Immigration au Québec : guide du PSTQ et du PEQ'],
'get-pr/regional-programs':['Rural & Francophone Immigration Pilots','Pilotes d’immigration rurale et francophone'],
'get-pr/atlantic-immigration':['Atlantic Immigration Program Guide','Guide du Programme d’immigration au Canada atlantique'],
'find-help':['Find Canadian Immigration Professional Help','Trouver de l’aide professionnelle en immigration'],
'request-help':['Request Canadian Immigration Professional Help','Demander de l’aide professionnelle en immigration'],
'partner-with-us':['Immigration Professional Referral Partnerships','Partenariats de mise en relation en immigration'],
 'tools/pathway-finder':['Canada PR Pathway Finder','Explorateur de voies de résidence permanente au Canada'],
 'tools/residency-calculator':['Canada PR Residency Calculator: 730-Day Planning','Calculateur de résidence RP au Canada : 730 jours'],
 'tools/checklists':['Canada Immigration & Arrival Checklists','Listes de préparation à l’immigration au Canada']
};
const descriptions:Record<string,Bi>={
'get-pr/express-entry':['Understand Canada’s Express Entry system, the federal programs it manages, language testing and the official CRS tool before planning your next step.','Comprenez Entrée express, ses programmes fédéraux, les tests linguistiques et le calculateur SCG officiel avant de préparer votre prochaine étape.'],
'get-pr/provincial-nominee-program':['Explore how provincial nomination relates to Canadian permanent residence, and find province-specific sources and questions to discuss with a professional.','Explorez la désignation provinciale pour la résidence permanente au Canada, les sources de chaque province et les questions à poser à un professionnel.'],
'already-a-pr/residency-obligation':['Understand Canada’s permanent resident residency obligation, the five-year window and the records to review. Use the PR residency planning calculator.','Comprenez l’obligation de résidence des résidents permanents, la période de cinq ans et les preuves à examiner. Utilisez notre calculateur de planification.'],
'pr-card/renewal':['Prepare for a Canadian PR card renewal with official application instructions, travel-history records and a review of your residency obligation.','Préparez le renouvellement de votre carte RP avec les instructions officielles, votre historique de voyages et un examen de l’obligation de résidence.'],
'already-a-pr/travel-document':['Learn when to check PR travel document requirements for returning to Canada without a valid PR card, and follow the official IRCC application process.','Vérifiez les exigences du titre de voyage pour revenir au Canada sans carte RP valide et consultez la procédure officielle de demande d’IRCC.'],
'citizenship/physical-presence':['Find the official Canadian citizenship physical presence calculator and prepare your PR date, temporary status history and travel records.','Trouvez le calculateur officiel de présence effective pour la citoyenneté et préparez votre date de RP, vos statuts temporaires et vos voyages.'],
 'tools/pathway-finder':['Explore Canadian immigration pathways based on your work, education, family and destination. See explained suggestions without providing contact details.','Explorez des voies d’immigration selon votre travail, vos études, votre famille et votre destination. Consultez les pistes sans fournir de coordonnées.'],
 'tools/residency-calculator':['Estimate days in Canada against the 730-day PR residency obligation. Enter landing and travel dates, see assumptions and compare the five-year window.','Estimez vos jours au Canada par rapport à l’obligation de résidence RP de 730 jours. Saisissez vos dates et consultez les hypothèses sur cinq ans.'],
 'tools/checklists':['Use practical immigration research and arrival checklists for Canada. Save progress on your device, print your list and follow official sources.','Utilisez les listes de recherche en immigration et d’arrivée au Canada. Conservez votre progression sur votre appareil et imprimez votre liste.'],

'':['Explore Canadian permanent residence programs, PR cards and citizenship. Use free planning tools and request immigration professional help in English or French.','Explorez la résidence permanente, la carte RP et la citoyenneté au Canada. Utilisez nos outils gratuits et demandez une aide professionnelle.'],
about:['Learn who publishes PermanentResident.ca, how our Canadian immigration guides are prepared, and how professional-help enquiries work.','Découvrez l’éditeur de PermanentResident.ca, la préparation des guides d’immigration et le fonctionnement des demandes d’aide professionnelle.'],
privacy:['How PermanentResident.ca collects, stores and shares enquiry data, records your consent, and handles access, correction and deletion requests.','Comment PermanentResident.ca recueille, conserve et partage vos données, enregistre vos consentements et traite les demandes d’accès ou de suppression.'],
terms:['Understand PermanentResident.ca’s information, planning tools and referral service, including professional engagement and responsible use.','Comprenez les conditions des renseignements, outils et mises en relation de PermanentResident.ca, le recours aux professionnels et l’utilisation du site.'],
editorial:['Read how PermanentResident.ca uses official immigration sources, reviews content, explains planning tools and handles corrections.','Découvrez les sources officielles, la révision des contenus, les limites des outils et le traitement des corrections sur PermanentResident.ca.'],
advertising:['Understand professional referrals, potential paid listings, sponsorship disclosure and your choices when using PermanentResident.ca.','Comprenez les mises en relation, la visibilité rémunérée éventuelle, la transparence publicitaire et vos choix sur PermanentResident.ca.'],
accessibility:['Learn about language options, keyboard navigation and accessible forms, and how to request assistance using PermanentResident.ca.','Découvrez les langues, la navigation au clavier et les formulaires accessibles, et comment demander de l’aide pour utiliser PermanentResident.ca.']
};
export function seoDetails(path:string,l:Lang){const page=resolve(path,l);if(!page)return null;const place=places.find(p=>'provinces/'+p.slug===path),city=cities.find(c=>'cities/'+c.slug===path);return {title:city?cityName(city,l)+tr([' Immigration & PR Guide',' : immigration et résidence permanente'],l):place?tr(place.name,l)+' '+tr(['Immigration Guide','— Guide d’immigration'],l):searchTitles[path]?tr(searchTitles[path],l):page.title,description:descriptions[path]?tr(descriptions[path],l):page.intro};}
export function pageMetadata(path:string,l:Lang):Metadata{
const d=seoDetails(path,l);if(!d)return {robots:{index:false,follow:false}};
const article=articles.find(a=>a.slug===path),url=origin+href(l,path);
const image=editorialImages[pageImages[path]||'arrival'].file;
const images=[{url:origin+'/images/'+image+'-1200.webp',width:1200,height:800,alt:tr(['Canadian life and immigration planning — illustration for PermanentResident.ca','Vie au Canada et démarches d’immigration — illustration pour PermanentResident.ca'],l)}];
return {title:{absolute:d.title+' | PermanentResident.ca'},description:d.description,alternates:{canonical:url,languages:{en:origin+href('en',path),fr:origin+href('fr',path),'x-default':origin+href('en',path)}},openGraph:{title:d.title,description:d.description,url,locale:l==='fr'?'fr_CA':'en_CA',alternateLocale:l==='fr'?'en_CA':'fr_CA',siteName:'PermanentResident.ca',type:article?'article':'website',images,...(article?{modifiedTime:reviewed}:{})},twitter:{card:'summary_large_image',title:d.title,description:d.description,images:[images[0].url]}};
}
export function breadcrumbs(path:string,l:Lang){
const crumbs=[{name:tr(['Home','Accueil'],l),path:''}];
if(!path)return crumbs;
const city=cities.find(c=>'cities/'+c.slug===path);if(city){const p=places.find(p=>p.slug===city.province)!;crumbs.push({name:tr(['City guides','Guides des villes'],l),path:'cities'},{name:tr(p.name,l),path:'provinces/'+p.slug});const page=resolve(path,l)!;crumbs.push({name:page.title,path});return crumbs;}
const parent=path.includes('/')?path.split('/')[0]:null;
if(parent){const page=resolve(parent,l);if(page)crumbs.push({name:page.title,path:parent});}
const page=resolve(path,l);if(page)crumbs.push({name:page.title,path});return crumbs;
}
export function pageSchema(path:string,l:Lang){
const page=resolve(path,l)!,article=articles.find(a=>a.slug===path),url=origin+href(l,path),language=l==='fr'?'fr-CA':'en-CA';
const city=cities.find(c=>'cities/'+c.slug===path),province=places.find(p=>'provinces/'+p.slug===path);
const org={'@id':origin+'/#organization'},site={'@id':origin+'/#website'};
const graph:Record<string,unknown>[]=[{'@type':'Organization','@id':org['@id'],name:'PermanentResident.ca',url:origin,telephone:'+18336969996',publishingPrinciples:origin+href(l,'editorial'),description:tr(['Independent Canadian immigration information and professional referral platform','Plateforme indépendante d’information sur l’immigration canadienne et de mise en relation'],l)}, {'@type':'WebSite','@id':site['@id'],url:origin,name:'PermanentResident.ca',inLanguage:['en-CA','fr-CA'],publisher:org}, {'@type':path==='about'?'AboutPage':hubs[path]||['provinces','cities','tools','find-help'].includes(path)?'CollectionPage':'WebPage','@id':url+'#webpage',url,name:page.title,description:page.intro,inLanguage:language,isPartOf:site,...(path?{breadcrumb:{'@id':url+'#breadcrumb'}}:{}),...(article?{mainEntity:{'@id':url+'#article'}}:{}),...(city?{about:{'@type':'City',name:cityName(city,l),containedInPlace:{'@type':'AdministrativeArea',name:tr(places.find(p=>p.slug===city.province)!.name,l)}},citation:[city.url,places.find(p=>p.slug===city.province)!.url],dateModified:reviewed}:{})}];
if(path)graph.push({'@type':'BreadcrumbList','@id':url+'#breadcrumb',itemListElement:breadcrumbs(path,l).map((c,i)=>({'@type':'ListItem',position:i+1,name:c.name,item:origin+href(l,c.path)}))});
if(article)graph.push({...((pageImages[path])?{image:origin+'/images/'+editorialImages[pageImages[path]].file+'-1200.webp'}:{}),'@type':'Article','@id':url+'#article',headline:tr(article.title,l),description:tr(article.intro,l),inLanguage:language,dateModified:reviewed,author:{'@type':'Organization',...org,name:'PermanentResident.ca',url:origin+href(l,'about')},publisher:org,mainEntityOfPage:{'@id':url+'#webpage'},citation:article.sources.map(s=>s.url),articleSection:tr(hubs[article.group].title,l)});
const listedCities=path==='cities'?cities:province?cities.filter(c=>c.province===province.slug):[];
if(listedCities.length)graph.push({'@type':'ItemList','@id':url+'#city-guides',name:tr(['City guides','Guides des villes'],l),numberOfItems:listedCities.length,itemListElement:listedCities.map((c,i)=>({'@type':'ListItem',position:i+1,name:cityName(c,l),url:origin+href(l,'cities/'+c.slug)}))});
return {'@context':'https://schema.org','@graph':graph};
}
export function sectionId(index:number){return 'section-'+(index+1)}
export function usefulLinks(path:string){
const a=articles.find(a=>a.slug===path);if(!a)return [];
const links=a.group==='get-pr'?['tools/pathway-finder','provinces','find-help']:a.group==='pr-card'||a.group==='already-a-pr'?['already-a-pr/residency-obligation','tools/residency-calculator','already-a-pr/travel-document','pr-card/renewal']:a.group==='citizenship'?['citizenship/physical-presence','already-a-pr/residency-obligation','pr-card']:['tools/checklists','cities','provinces'];
return links.filter(p=>p!==path);
}
