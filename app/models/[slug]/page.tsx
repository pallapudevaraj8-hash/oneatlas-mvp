import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { modelInclude,serializeModel } from "@/lib/serialize";
import { fmtPrice,fmtTokens,shortDate } from "@/lib/format";
import DemoNotice from "@/components/demo-notice";
import { BrandAvatar } from "@/components/brand-avatar";
import { ArrowLeft, ArrowRight, CalendarDays, ExternalLink, GitCompareArrows, Layers3 } from "lucide-react";
export const dynamic="force-dynamic";
export default async function ModelDetail({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const row=await prisma.model.findUnique({where:{slug},include:modelInclude});
  if(!row)notFound();const model=serializeModel(row);
  return <div className="shell pt-10 pb-12"><Link href="/models" className="inline-flex items-center gap-2 text-sm text-muted hover:text-white"><ArrowLeft size={16}/> Back to model explorer</Link>
  <div className="mt-7 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center"><div className="flex items-center gap-4"><BrandAvatar initials={model.lab.initials} large/><div><div className="eyebrow mb-1">{model.lab.name} · {model.type}</div><h1 className="text-3xl font-bold text-white sm:text-4xl">{model.name}</h1><p className="mt-2 text-sm text-muted">{model.description}</p></div></div><Link href={`/compare?ids=${model.slug}`} className="btn-primary"><GitCompareArrows size={16}/> Compare model</Link></div>
  <div className="my-7"><DemoNotice/></div>
  <div className="grid gap-5 lg:grid-cols-3"><div className="lg:col-span-2"><section className="panel p-6"><h2 className="mb-6 text-xl font-bold text-white">Specifications</h2><div className="grid grid-cols-2 gap-6 sm:grid-cols-3">{[
    ["Context window",fmtTokens(model.contextWindow)],["Maximum output",fmtTokens(model.maxOutput)],
    ["Model type",model.type],["Release date",shortDate(model.releasedAt)],
    ["Weights",model.openWeights?"Open":"Proprietary"],["Providers",String(model.offerings.length)]
  ].map(([label,value])=><div key={label} className="border-b border-stroke/60 pb-4"><div className="mb-2 text-xs text-muted">{label}</div><div className="metric-value">{value}</div></div>)}</div>
    <div className="mt-7"><h3 className="mb-3 text-sm font-bold text-white">Capabilities</h3><div className="flex flex-wrap gap-2">{model.capabilities.map(cap=><span key={cap} className="pill">{cap}</span>)}</div></div>
    <div className="mt-7"><h3 className="mb-3 text-sm font-bold text-white">Supported modalities</h3><div className="flex flex-wrap gap-2">{model.modalities.map(modality=><span className="pill" key={modality}>{modality}</span>)}</div></div></section>
    <section className="panel mt-5 p-6"><h2 className="text-xl font-bold text-white">Serving providers & sample pricing</h2><p className="mt-2 mb-5 text-xs text-muted">Illustrative USD per 1M tokens. Actual charges and availability will differ.</p><div className="overflow-x-auto"><table className="w-full min-w-[430px] text-left text-sm"><thead><tr className="border-b border-stroke text-xs text-muted"><th className="pb-3 font-medium">Provider</th><th className="pb-3 text-right font-medium">Input</th><th className="pb-3 text-right font-medium">Output</th></tr></thead><tbody>{model.offerings.map(offer=><tr className="border-b border-stroke/60 last:border-0" key={offer.provider.slug}><td className="py-4 font-semibold text-white">{offer.provider.name}</td><td className="py-4 text-right text-[#e6eef9]">{fmtPrice(offer.inputPrice)}</td><td className="py-4 text-right text-[#e6eef9]">{fmtPrice(offer.outputPrice)}</td></tr>)}</tbody></table></div></section></div>
    <div className="space-y-5"><section className="panel p-6"><h2 className="text-xl font-bold text-white">Demo benchmark indexes</h2><p className="mt-2 text-xs leading-5 text-muted">Fictional scores from 0 to 100 used to demonstrate the ranking system.</p><div className="mt-6 space-y-5">{[...model.benchmarks].sort((a,b)=>b.score-a.score).map(entry=><div key={entry.category}><div className="mb-2 flex justify-between text-xs"><span className="text-[#c4d1e0]">{entry.category}</span><strong className="text-white">{entry.score}/100</strong></div><div className="h-2 rounded-full bg-[#26364a]"><div className="h-2 rounded-full bg-gradient-to-r from-[#8d79ed] to-[#65d6d0]" style={{width:`${entry.score}%`}}/></div></div>)}</div><Link href="/rankings" className="mt-7 inline-flex items-center gap-1 text-sm font-semibold text-accent">View leaderboard <ArrowRight size={14}/></Link></section>
    <section className="panel p-6"><h2 className="text-xl font-bold text-white">About the lab</h2><div className="mt-4 flex items-center gap-3"><BrandAvatar initials={model.lab.initials}/><strong>{model.lab.name}</strong></div><p className="mt-4 text-sm leading-6 text-muted">{model.lab.description}</p><div className="mt-5 flex flex-wrap gap-3"><span className="pill"><Layers3 size={12}/> {model.type}</span><span className="pill"><CalendarDays size={12}/>{shortDate(model.releasedAt)}</span></div>{model.lab.website&&<a href={model.lab.website} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-1 text-xs text-accent hover:text-white">Official website <ExternalLink size={13}/></a>}</section></div></div>
  </div>;
}
