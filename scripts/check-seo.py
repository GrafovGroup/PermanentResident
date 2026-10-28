"""Check rendered SEO contracts. Run against a local server: python3 scripts/check-seo.py."""
import concurrent.futures, html, json, sys, urllib.request, urllib.error, urllib.parse
import xml.etree.ElementTree as ET
from html.parser import HTMLParser

BASE=sys.argv[1] if len(sys.argv)>1 else 'http://localhost:5173'
class Page(HTMLParser):
    def __init__(self,source):
        super().__init__();self.metas={};self.links=[];self.anchors=[];self.ids=set();self.schemas=[];self.title='';self.lang=None;self.h1=0;self.in_title=False;self.in_schema=False;self.schema='';self.feed(source)
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if tag=='html':self.lang=a.get('lang')
        if tag=='meta':self.metas[a.get('name',a.get('property',''))]=a.get('content','')
        if tag=='link':self.links.append(a)
        if tag=='a':self.anchors.append(a.get('href',''))
        if 'id' in a:self.ids.add(a['id'])
        if tag=='h1':self.h1+=1
        if tag=='title':self.in_title=True
        if tag=='script' and a.get('type')=='application/ld+json':self.in_schema=True;self.schema=''
    def handle_data(self,data):
        if self.in_title:self.title+=data
        if self.in_schema:self.schema+=data
    def handle_endtag(self,tag):
        if tag=='title':self.in_title=False
        if tag=='script' and self.in_schema:self.schemas.append(json.loads(self.schema));self.in_schema=False

def get(path):
    with urllib.request.urlopen(BASE+path) as r:return r.status,r.read().decode()
xml=ET.fromstring(get('/sitemap.xml')[1]);ns={'s':'http://www.sitemaps.org/schemas/sitemap/0.9','x':'http://www.w3.org/1999/xhtml'}
urls=[u.find('s:loc',ns).text for u in xml];paths={urllib.parse.urlsplit(u).path for u in urls}
assert len(urls)==len(paths)==162,'Sitemap must contain 162 unique canonical URLs'
for u in xml:
    alts={a.get('hreflang'):a.get('href') for a in u.findall('x:link',ns)}
    assert set(alts)=={'en','fr','x-default'},alts
    assert alts['x-default']==alts['en']

def check(url):
    path=urllib.parse.urlsplit(url).path;lang=path.split('/')[1]
    status,source=get(path);p=Page(source)
    assert status==200 and p.h1==1,(path,status,p.h1)
    assert p.lang==lang,(path,p.lang)
    canon=[a['href'] for a in p.links if a.get('rel')=='canonical'];assert canon==[url],(path,canon)
    alts={a.get('hreflang'):a.get('href') for a in p.links if a.get('rel')=='alternate'}
    assert set(alts)=={'en','fr','x-default'},(path,alts)
    assert alts[lang]==url and alts['x-default']==alts['en']
    assert p.title and p.metas.get('description'),path
    assert p.metas.get('og:url')==url and p.metas.get('og:image'),path
    assert p.metas.get('twitter:card')=='summary_large_image',path
    assert 'noindex' not in p.metas.get('robots',''),path
    assert len(p.schemas)==1,(path,len(p.schemas))
    graph=p.schemas[0]['@graph'];types={g['@type'] for g in graph}
    assert {'Organization','WebSite'}.issubset(types),(path,types)
    crumbs=[g for g in graph if g['@type']=='BreadcrumbList']
    if path not in ['/en','/fr']:
        assert len(crumbs)==1,path
        trail=crumbs[0]['itemListElement'];assert len(trail)>=2 and trail[-1]['item']==url
        assert all(urllib.parse.urlsplit(c['item']).path in paths for c in trail)
    if '/cities/' in path:
        assert p.ids.issuperset({'local-support','arrival-plan','immigration-pathways','pr-and-citizenship','local-questions','sources'}),path
        webpage=next(g for g in graph if g['@type']=='WebPage')
        assert webpage['about']['@type']=='City' and len(webpage['citation'])==2,path
        assert len(crumbs[0]['itemListElement'])==4,path
    if path in ['/en/cities','/fr/cities']:
        listing=next(g for g in graph if g['@type']=='ItemList')
        assert listing['numberOfItems']==25 and len(listing['itemListElement'])==25
        assert all(urllib.parse.urlsplit(c['url']).path in paths for c in listing['itemListElement'])
    for a in p.anchors:
        parts=urllib.parse.urlsplit(a)
        if a.startswith('#'):assert parts.fragment in p.ids,(path,a)
        if a.startswith(('/en','/fr')):assert parts.path in paths,(path,a)
    for a in [g for g in graph if g['@type']=='Article']:
        assert a['citation'] and a['author']['name']=='PermanentResident.ca'
        assert p.ids.issuperset({'section-1','section-2'}),path
        assert a['dateModified']==('2026-10-28' if path.endswith('/pr-card/renewal') else '2026-09-19')
    return path,p.title,p.metas['description'],'Article' in types
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:results=list(pool.map(check,urls))
for lang in ['en','fr']:
    group=[r for r in results if r[0].startswith('/'+lang+'/') or r[0]=='/'+lang]
    assert len({r[1] for r in group})==len(group),'Duplicate titles: '+lang
    assert len({r[2] for r in group})==len(group),'Duplicate descriptions: '+lang
assert sum(r[3] for r in results)==44,'Expected 22 article guides per language'
for path in ['/de/get-pr','/en/not-a-page']:
    try:get(path);raise AssertionError('Missing 404: '+path)
    except urllib.error.HTTPError as e:assert e.code==404
_,query=get('/fr/pr-card/renewal?source=seo-check');assert next(a['href'] for a in Page(query).links if a.get('rel')=='canonical').endswith('/fr/pr-card/renewal')
assert 'noindex' in Page(get('/admin')[1]).metas.get('robots','')
robots=get('/robots.txt')[1];assert 'Disallow: /admin' in robots and 'Sitemap:' in robots
print('PASS: 162 pages; unique EN/FR titles and descriptions; canonical/hreflang parity; server language; social metadata; 44 Article schemas; breadcrumbs; internal routes/anchors; query canonicals; 404s; admin noindex.')
