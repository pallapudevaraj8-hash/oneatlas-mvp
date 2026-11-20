"use client";
import { useEffect,useState } from "react";
import Link from "next/link";
import { Award, ArrowUpRight } from "lucide-react";
import { categories, modelTypes } from "@/lib/types";
import type { AIModel } from "@/lib/types";
import { fmtPrice,fmtTokens,bestPrice } from "@/lib/format";
import { BrandAvatar } from "@/components/brand-avatar";
import DemoNotice from "@/components/demo-notice";
import { Loading,ErrorNotice } from "@/components/api-feedback";
import { PageHeading } from "@/components/page-heading";
type Ranking = {rank:number;score:number;model:AIModel};
export default function RankingsPage(){
  const [metric,setMetric]=useState("Intelligence");const [type,setType]=useState("");
  const [rows,setRows]=useState<Ranking[]>([]);const [loading,setLoading]=useState(true);const [error,setError]=useState("");
  useEffect(()=>{
    const controller=new AbortController();setLoading(true);setError("");
    fetch(`/api/rankings?metric=${encodeURIComponent(metric)}&type=${encodeURIComponent(type)}`,{signal:controller.signal})
      .then(r=>{if(!r.ok)throw Error("Could not load ranking information");return r.json();})
      .then(setRows).catch(e=>{if(!controller.signal.aborted)setError(e.message);})
      .finally(()=>{if(!controller.signal.aborted)setLoading(false);});
    return()=>controller.abort();
  },[metric,type]);
  return <div className="shell pt-12 pb-12"><PageHeading eyebrow="Benchmark insights" title="Model rankings" description="Explore sortable category leaderboards powered by the database. All benchmark scores are invented demonstration indexes (0–100), not published evaluations."/><div className="mb-6"><DemoNotice/></div>
    <div className="panel mb-6 flex flex-wrap items-center justify-between gap-4 p-5"><div className="flex flex-wrap gap-2" role="group" aria-label="Benchmark category">{categories.map(item=><button type="button" key={item} onClick={()=>setMetric(item)} className={`rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${metric===item?"bg-accent text-ink":"border border-stroke bg-[#18263b] text-muted hover:text-white"}`}>{item}</button>)}</div><label className="flex items-center gap-2 text-xs text-muted">Model type <select aria-label="Ranking model type" className="field !w-auto !py-2" value={type} onChange={e=>setType(e.target.value)}><option value="">All model types</option>{modelTypes.map(item=><option key={item}>{item}</option>)}</select></label></div>
    {loading?<Loading/>:error?<ErrorNotice error={error}/>:rows.length?<div className="panel overflow-hidden"><div className="overflow-x-auto"><table className="w-full min-w-[650px] text-left"><thead className="bg-[#17253a] text-xs text-muted"><tr><th className="px-5 py-4">Rank</th><th className="px-5 py-4">Model</th><th className="px-5 py-4">Index / 100</th><th className="px-5 py-4">Context</th><th className="px-5 py-4">Input / 1M</th><th className="px-5 py-4">Providers</th></tr></thead><tbody>{rows.map(({rank,model,score})=><tr key={model.id} className="border-t border-stroke/80 transition-colors hover:bg-[#1b2940]"><td className="px-5 py-4"><span className={`inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold ${rank<=3?"bg-[#3f3554] text-[#e0ceff]":"bg-[#1e2e43] text-muted"}`}>{rank<=3?<Award size={18}/>:rank}</span></td><td className="px-5 py-4"><Link href={`/models/${model.slug}`} className="flex items-center gap-3"><BrandAvatar initials={model.lab.initials}/><div><div className="inline-flex items-center gap-1 text-sm font-semibold text-white hover:text-accent">{model.name} <ArrowUpRight size={12}/></div><div className="text-xs text-muted">{model.lab.name}</div></div></Link></td><td className="px-5 py-4"><div className="mb-1 font-semibold text-white">{score.toFixed(1)}</div><div className="h-1.5 w-[90px] rounded-full bg-[#26364a]"><div className="h-full rounded-full bg-gradient-to-r from-accent to-cyan" style={{width:`${score}%`}}/></div></td><td className="px-5 py-4 text-sm text-muted">{fmtTokens(model.contextWindow)}</td><td className="px-5 py-4 text-sm text-[#e3eaf5]">{fmtPrice(bestPrice(model.offerings))}</td><td className="px-5 py-4 text-sm text-muted">{model.offerings.length}</td></tr>)}</tbody></table></div></div>:<div className="panel p-10 text-center text-muted">No model rankings for this filter.</div>}
  </div>;
}
