'use client';
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue} from '@/components/ui/select';
import {Checkbox} from '@/components/ui/checkbox';
export function Choice({id,label,value,onChange,options,required=false}:{id:string;label:string;value:string;onChange:(v:string)=>void;options:[string,string][];required?:boolean}){return <div className="field"><label htmlFor={id}>{label}{required?' *':''}</label><Select value={value} onValueChange={onChange} required={required} name={id}><SelectTrigger id={id}><SelectValue placeholder="—"/></SelectTrigger><SelectContent position="popper">{options.map(([v,t])=><SelectItem key={v} value={v}>{t}</SelectItem>)}</SelectContent></Select></div>}
export function Tick({id,checked,onChange,children}:{id:string;checked:boolean;onChange:(v:boolean)=>void;children:React.ReactNode}){return <div className="check"><Checkbox id={id} checked={checked} onCheckedChange={v=>onChange(v===true)}/><label htmlFor={id}>{children}</label></div>}
