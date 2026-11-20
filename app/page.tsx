import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChartNoAxesCombined, DatabaseZap, GitCompareArrows, Search, ShieldCheck, Sparkles, Layers3, Network } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { modelInclude, serializeModel } from "@/lib/serialize";
import ModelCard from "@/components/model-card";
import DemoNotice from "@/components/demo-notice";
export const dynamic="force-dynamic";
export default async function Home(){
  const [modelCount,labCount,providerCount,latest] = await Promise.all([
    prisma.model.count(),prisma.lab.count(),prisma.provider.count(),
    prisma.model.findMany({orderBy:{releasedAt:"desc"},take:6,include:modelInclude})
  ]);
  const steps=[{icon:Search,name:"Discover",desc:"Browse, search and filter model specs by capability, company and model type."},
    {icon:GitCompareArrows,name:"Compare",desc:"Evaluate pricing, context limits, modalities and sample performance side by side."},
    {icon:ChartNoAxesCombined,name:"Understand",desc:"Explore rankings, research labs, serving providers and model offerings."}];
  return <><section className="shell pt-16 pb-10 md:pt-24 md:pb-16"><div className="mx-auto max-w-[880px] text-center">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#393c65] bg-[#1a1c36] px-4 py-2 text-xs font-semibold text-[#cfc2ff]"><Sparkles size={14}/> AI model intelligence, made simple <ArrowUpRight size={13}/></div>
      <h1 className="text-4xl font-bold leading-[1.11] tracking-tight text-white sm:text-6xl md:text-[70px]">Every AI model.<br/><span className="bg-gradient-to-r from-[#bcaaff] via-[#86b5fc] to-[#70e7d8] bg-clip-text text-transparent">One place to compare.</span></h1>
      <p className="mx-auto mt-7 max-w-[630px] text-base leading-7 text-[#a5b7cb] md:text-lg">Find the right foundation model for your next idea. Explore model details, inspect pricing, compare specifications and review performance — all from one unified catalog.</p>
      <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"><Link href="/models" className="btn-primary w-full py-3.5 sm:w-auto">Explore AI models <ArrowRight size={17}/></Link><Link href="/compare" className="btn-secondary w-full py-3.5 sm:w-auto"><GitCompareArrows size={17}/> Compare models</Link></div>
      <div className="mx-auto mt-10 max-w-2xl"><DemoNotice/></div>
    </div>
    <div className="mt-14 grid grid-cols-2 gap-3 rounded-2xl border border-stroke bg-panel/65 p-5 sm:grid-cols-4 md:mt-20 md:p-7">
      {[{value:modelCount,label:"AI models",icon:Layers3},{value:labCount,label:"Research labs",icon:Network},{value:providerCount,label:"Inference providers",icon:DatabaseZap},{value:"5",label:"Demo benchmarks",icon:ChartNoAxesCombined}].map(({value,label,icon:Icon})=><div key={label} className="border-r border-stroke/50 px-1 last:border-0 sm:px-5"><Icon size={17} className="mb-3 text-cyan"/><div className="text-3xl font-bold tracking-tight text-white">{value}</div><div className="mt-1 text-xs text-muted">{label}</div></div>)}
    </div>
  </section>
  <section className="border-y border-stroke/65 bg-[#0e1929]/65 py-14"><div className="shell"><div className="eyebrow mb-3">Built for informed decisions</div><h2 className="text-3xl font-bold text-white">One catalog. Every workflow.</h2><div className="mt-8 grid gap-4 md:grid-cols-3">{steps.map(({icon:Icon,name,desc},i)=><div className="panel p-6" key={name}><div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#212641] text-accent"><Icon size={23}/></div><div className="mb-2 text-xs font-semibold text-cyan">0{i+1} / 03</div><h3 className="text-xl font-bold text-white">{name}</h3><p className="mt-3 text-sm leading-6 text-muted">{desc}</p></div>)}</div></div></section>
  <section className="shell py-16"><div className="mb-8 flex items-end justify-between"><div><p className="eyebrow mb-3">Explore the catalog</p><h2 className="text-3xl font-bold text-white">Recently released in our sample</h2><p className="mt-2 text-sm text-muted">Browse database-backed model records.</p></div><Link href="/models" className="hidden items-center gap-1 text-sm font-semibold text-[#c3b2ff] hover:text-white sm:inline-flex">All models <ArrowRight size={16}/></Link></div><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{latest.map(model=><ModelCard key={model.id} model={serializeModel(model)}/>)}</div><Link href="/models" className="btn-secondary mt-6 sm:hidden">View all models <ArrowRight size={16}/></Link></section>
  <section className="shell pb-12"><div className="panel relative overflow-hidden bg-gradient-to-r from-[#1f234c] via-[#1d2e43] to-[#123f45] p-8 sm:p-12"><ShieldCheck size={34} className="text-cyan"/><h2 className="mt-5 text-2xl font-bold text-white sm:text-3xl">Explore the data behind each decision.</h2><p className="mt-3 max-w-[620px] text-sm leading-6 text-[#c6d4e5]">View model capabilities, provider offerings, pricing and test benchmark indexes in one consistent interface.</p><Link href="/rankings" className="btn-primary mt-7">See demo rankings <ArrowRight size={16}/></Link></div></section></>;
}
