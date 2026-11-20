import Link from "next/link";
import type { AIModel } from "@/lib/types";
import { bestPrice,fmtPrice,fmtTokens } from "@/lib/format";
import { ArrowUpRight, Cpu, Layers3 } from "lucide-react";
import { BrandAvatar } from "./brand-avatar";
export default function ModelCard({model,selected,onToggle}:{model:AIModel;selected?:boolean;onToggle?:(slug:string)=>void}){
  return <article className={`panel group flex min-h-[270px] flex-col p-5 transition-colors hover:border-[#6b659f] ${selected?"border-[#9b8bea] bg-[#191e36]":""}`}>
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-center gap-3"><BrandAvatar initials={model.lab.initials}/><div className="min-w-0"><div className="text-xs text-muted">{model.lab.name}</div><h3 className="mt-0.5 truncate text-[16px] font-bold text-white">{model.name}</h3></div></div>
      {onToggle?<button type="button" aria-label={`${selected?"Remove":"Add"} ${model.name} ${selected?"from":"to"} comparison`} aria-pressed={!!selected} onClick={()=>onToggle(model.slug)} className={`shrink-0 rounded-lg border px-3 py-1.5 text-xs font-semibold ${selected?"border-accent bg-accent text-ink":"border-stroke text-[#c7d5e4] hover:border-accent"}`}>{selected?"Selected":"+ Compare"}</button>:<Link href={`/models/${model.slug}`} aria-label={`View ${model.name}`} className="rounded-md p-1.5 text-muted hover:bg-[#263750] hover:text-white"><ArrowUpRight size={18}/></Link>}
    </div>
    <p className="mt-4 line-clamp-2 min-h-[42px] text-[13px] leading-5 text-muted">{model.description}</p>
    <div className="mt-4 flex flex-wrap gap-1.5"><span className="pill"><Cpu size={11}/>{model.type}</span>{model.openWeights&&<span className="pill border-[#38695a] text-[#7ee8c7]">Open weights</span>}{model.capabilities.slice(0,2).map(cap=><span key={cap} className="pill">{cap}</span>)}</div>
    <div className="mt-auto grid grid-cols-2 gap-4 border-t border-stroke/80 pt-4"><div><div className="mb-1 text-xs text-muted">Context window</div><div className="flex items-center gap-1.5 font-bold text-white"><Layers3 size={14} className="text-cyan"/>{fmtTokens(model.contextWindow)}</div></div><div><div className="mb-1 text-xs text-muted">From / 1M input</div><div className="font-bold text-white">{fmtPrice(bestPrice(model.offerings))}</div></div></div>
    <Link className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#c7baff] hover:text-white" href={`/models/${model.slug}`}>View model details <ArrowUpRight size={13}/></Link>
  </article>;
}
