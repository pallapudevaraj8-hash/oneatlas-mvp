"use client";
import { useEffect,useState, type ReactNode } from "react";
import Link from "next/link";
import { Check, GitCompareArrows, Plus, X } from "lucide-react";
import type { AIModel,ModelList } from "@/lib/types";
import { categories } from "@/lib/types";
import { fmtPrice,fmtTokens,shortDate } from "@/lib/format";
import { BrandAvatar } from "@/components/brand-avatar";
import { Loading,ErrorNotice } from "@/components/api-feedback";
export default function CompareTool({initialIds}:{initialIds:string[]}){
  const [selected,setSelected]=useState<string[]>(initialIds.slice(0,4));
  const [all,setAll]=useState<AIModel[]>([]);const [models,setModels]=useState<AIModel[]>([]);
  const [loading,setLoading]=useState(false);const [error,setError]=useState("");
  useEffect(()=>{fetch("/api/models?limit=48&sort=name").then(r=>{if(!r.ok)throw Error("Could not load model options");return r.json();}).then((data:ModelList)=>setAll(data.items)).catch(e=>setError(e.message));},[]);
  useEffect(()=>{
    const controller=new AbortController();
    if(!selected.length){setModels([]);setLoading(false);return;}
    setLoading(true);setError("");
    fetch(`/api/compare?ids=${encodeURIComponent(selected.join(","))}`,{signal:controller.signal}).then(r=>{if(!r.ok)throw Error("Unable to retrieve comparison data");return r.json();}).then(setModels).catch(e=>{if(!controller.signal.aborted)setError(e.message);}).finally(()=>{if(!controller.signal.aborted)setLoading(false);});
    return()=>controller.abort();
  },[selected]);
  const add=(slug:string)=>{if(slug&&!selected.includes(slug)&&selected.length<4)setSelected(s=>[...s,slug]);};
  const remove=(slug:string)=>setSelected(s=>s.filter(x=>x!==slug));
  const remaining=all.filter(model=>!selected.includes(model.slug));
  function row(label:string,extract:(model:AIModel)=>ReactNode){return <tr className="border-b border-stroke/65"><th scope="row" className="sticky left-0 z-10 w-[160px] min-w-[150px] bg-[#101e30] px-4 py-4 text-left text-xs font-medium text-muted">{label}</th>{models.map(model=><td key={model.id} className="min-w-[190px] px-4 py-4 text-sm text-[#e5eef8]">{extract(model)}</td>)}</tr>}
  return <div><div className="panel mb-6 p-5"><div className="mb-4 flex flex-wrap items-center justify-between gap-3"><h2 className="text-base font-bold text-white">Your comparison ({selected.length}/4)</h2><button type="button" className="text-xs text-muted underline hover:text-white" onClick={()=>setSelected([])}>Clear comparison</button></div>
    <div className="flex flex-wrap items-center gap-2">{selected.map(slug=><span key={slug} className="inline-flex items-center gap-2 rounded-lg border border-[#7266ad] bg-[#222545] px-3 py-2 text-sm text-white">{all.find(m=>m.slug===slug)?.name??slug}<button type="button" aria-label={`Remove ${slug}`} onClick={()=>remove(slug)}><X size={13}/></button></span>)}
    <label className="relative inline-flex items-center gap-2"><Plus size={16} className="pointer-events-none absolute left-3 text-accent"/><select aria-label="Add model to comparison" className="field w-[215px] pl-9" disabled={selected.length>=4} value="" onChange={e=>add(e.target.value)}><option value="">Add another model…</option>{remaining.map(m=><option value={m.slug} key={m.slug}>{m.name}</option>)}</select></label></div>
    <p className="mt-4 text-xs text-muted">Use the dropdown to add models. Compare up to four side by side.</p></div>
    {error&&<ErrorNotice error={error}/>}
    {loading?<Loading/>:models.length?<div className="panel overflow-hidden"><div className="overflow-x-auto"><table className="w-full border-collapse text-left"><thead><tr className="border-b border-stroke bg-[#111e30]"><th className="sticky left-0 z-10 w-[160px] min-w-[150px] bg-[#101e30] px-4 py-5 text-xs font-semibold text-muted">FEATURES</th>{models.map(model=><th className="min-w-[190px] px-4 py-5" key={model.id}><div className="flex items-center gap-2"><BrandAvatar initials={model.lab.initials}/><div><div className="text-xs font-normal text-muted">{model.lab.name}</div><Link href={`/models/${model.slug}`} className="text-sm font-bold text-white hover:text-accent">{model.name}</Link></div></div></th>)}</tr></thead><tbody>
      {row("Model type",m=>m.type)}{row("Context window",m=>fmtTokens(m.contextWindow))}{row("Max output",m=>fmtTokens(m.maxOutput))}{row("Open weights",m=>m.openWeights?<Check className="text-cyan" size={18}/>:"No")}{row("Release",m=>shortDate(m.releasedAt))}
      {row("Input / 1M tokens",m=>fmtPrice(m.offerings[0]?.inputPrice))}{row("Output / 1M tokens",m=>fmtPrice(m.offerings[0]?.outputPrice))}{row("Providers",m=>m.offerings.map(o=>o.provider.name).join(", "))}{row("Modalities",m=>m.modalities.join(", "))}{row("Capabilities",m=>m.capabilities.join(", "))}
      {categories.map(c=>row(`${c} index`,m=><div className="flex items-center gap-2"><div className="h-1.5 w-16 rounded-full bg-[#29384b]"><div className="h-full rounded-full bg-accent" style={{width:`${m.benchmarks.find(b=>b.category===c)?.score??0}%`}}/></div>{m.benchmarks.find(b=>b.category===c)?.score??"—"}</div>))}
    </tbody></table></div></div>:!loading&&!error?<div className="panel py-16 text-center"><GitCompareArrows className="mx-auto mb-4 text-accent" size={32}/><h3 className="text-lg font-bold text-white">Start comparing models</h3><p className="mt-2 text-sm text-muted">Choose a model from the dropdown above, or select models in the catalog.</p><Link href="/models" className="btn-primary mt-6">Browse models</Link></div>:null}
  </div>;
}
