export type Trip={departure:string;returned:string};
const DAY=86400000;
function day(v:string){if(!/^\d{4}-\d{2}-\d{2}$/.test(v))throw new Error('date');const t=Date.parse(v+'T00:00:00Z');if(!Number.isFinite(t)||new Date(t).toISOString().slice(0,10)!==v)throw new Error('date');return t/DAY}
function years(t:number,n:number){const d=new Date(t*DAY);const y=d.getUTCFullYear()+n,m=d.getUTCMonth(),date=d.getUTCDate();return Date.UTC(y,m,Math.min(date,new Date(Date.UTC(y,m+1,0)).getUTCDate()))/DAY}
export function calculateResidency(landing:string,asof:string,trips:Trip[],today=new Date().toISOString().slice(0,10)){
const landed=day(landing),end=day(asof);if(end>day(today)||landed>end||landed<day('1900-01-01'))throw new Error('range');
const anniversary=years(landed,5),early=end<anniversary,start=Math.max(landed,years(end,-5));let absent=0;
const sorted=trips.map(t=>({d:day(t.departure),r:t.returned?day(t.returned):end,open:!t.returned})).sort((a,b)=>a.d-b.d);
for(let i=0;i<sorted.length;i++){const t=sorted[i];if(t.d<landed||t.d>end||t.r<t.d||t.r>end)throw new Error('trip');if(i>0&&(sorted[i-1].open||t.d<sorted[i-1].r||t.d===sorted[i-1].d))throw new Error('overlap');absent+=Math.max(0,Math.min(t.r,end)-Math.max(t.d+1,start));}
const present=end-start-absent,remaining=early?Math.max(0,anniversary-end):0;
return{present,absent,total:end-start,start:new Date(start*DAY).toISOString().slice(0,10),end:asof,early,anniversary:new Date(anniversary*DAY).toISOString().slice(0,10),remaining,gap:Math.max(0,730-present),possible:present+remaining>=730,met:present>=730};
}
