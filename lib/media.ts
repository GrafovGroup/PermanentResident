import {Bi} from './site';
export const editorialImages={
 arrival:{file:'arrival',alt:['Illustrative newcomer family arriving with luggage in a Canadian airport','Famille illustrative de nouveaux arrivants avec ses bagages dans un aéroport canadien'] as Bi},
 work:{file:'skilled-work',alt:['Illustrative colleagues collaborating in a Canadian design studio','Collègues illustratifs travaillant ensemble dans un studio de conception canadien'] as Bi},
 family:{file:'family-reunion',alt:['Illustrative family reunion outside a Canadian home in autumn','Réunion familiale illustrative devant une maison canadienne en automne'] as Bi},
 travel:{file:'pr-travel',alt:['Travel wallet, notebook and Canadian flag arranged for travel planning','Pochette de voyage, carnet et drapeau canadien pour préparer un déplacement'] as Bi},
 citizenship:{file:'citizenship',alt:['Illustrative friends holding Canadian flags in a sunny civic square','Amis illustratifs tenant des drapeaux canadiens sur une place ensoleillée'] as Bi},
 consultation:{file:'consultation',alt:['Illustrative couple discussing their plans in a professional consultation','Couple illustratif discutant de ses projets lors d’une consultation professionnelle'] as Bi},
 newcomer:{file:'newcomer',alt:['Illustrative family unpacking in a new home','Famille illustrative s’installant dans un nouveau logement'] as Bi},
 preparation:{file:'preparation',alt:['Illustrative desk prepared for immigration research','Bureau illustratif préparé pour des recherches d’immigration'] as Bi},
 waterfront:{file:'hero',alt:['Illustrative couple walking on Toronto’s waterfront','Couple illustratif au bord de l’eau à Toronto'] as Bi}
};
export type ImageKey=keyof typeof editorialImages;
export const pageImages:Record<string,ImageKey>={
 '':'arrival','get-pr':'work','get-pr/express-entry':'work',
 'get-pr/family-sponsorship':'family','get-pr/spousal-sponsorship':'family',
 'already-a-pr':'travel','already-a-pr/travel-document':'travel','pr-card':'travel','pr-card/renewal':'travel',
 'citizenship':'citizenship','citizenship/eligibility':'citizenship',
 'find-help':'consultation','request-help':'consultation','partner-with-us':'consultation',
 'new-to-canada':'newcomer','tools/checklists':'preparation','cities/toronto':'waterfront'
};
