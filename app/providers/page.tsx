"use client";
import { useEffect,useState } from "react";
import { ArrowUpRight, Network, Search } from "lucide-react";
import type { Provider } from "@/lib/types";
import { BrandAvatar } from "@/components/brand-avatar";
import { PageHeading } from "@/components/page-heading";
import { Loading,ErrorNotice } from "@/components/api-feedback";
export default function ProvidersPage(){
  const [items,setItems]=useState<Provider[]>([]);const [q,setQ]=useState("");const [loading,setLoading]=useState(true);const [error,setError]=useState("");
  useEffect(()=>{fetch("/api/providers").then(r=>{if(!r.ok)throw Error("Could not load providers from database");return r.json();}).then(setItems).catch(e=>setError(e.message)).finally(()=>setLoading(false));},[]);
  const filtered=items.filter(item=>`${item.name} ${item.description}`.toLowerCase().includes(q.toLowerCase()));
  return <div className="shell pt-12 pb-12"><PageHeading eyebrow="Model access & inference" title="Provider directory" description="Explore organizations that serve models via APIs. Sample provider availability is stored in the database and is not a live availability check."/>
    <div className="panel mb-7 flex items-center gap-3 p-4"><Search size={18} className="text-muted"/><input className="w-full bg-transparent text-sm text-white outline-none placeholder:text-muted" aria-label="Search providers" placeholder="Search inference providers…" value={q} onChange={e=>setQ(e.target.value)}/></div>
    {loading?<Loading/>:error?<ErrorNotice error={error}/>:<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{filtered.map(provider=><article key={provider.id} className="panel flex flex-col p-6"><div className="flex items-center justify-between"><BrandAvatar initials={provider.initials} large/><Network size={19} className="text-muted"/></div><h2 className="mt-5 text-xl font-bold text-white">{provider.name}</h2><p className="mt-2 min-h-[50px] text-sm leading-6 text-muted">{provider.description}</p><div className="mt-auto flex items-center justify-between border-t border-stroke pt-5"><span className="text-xs text-muted"><strong className="text-white">{provider.modelCount}</strong> listed offerings</span>{provider.website&&<a href={provider.website} rel="noopener noreferrer" target="_blank" className="inline-flex items-center gap-1 text-xs font-bold text-accent">Official site <ArrowUpRight size={13}/></a>}</div></article>)}</div>}{!loading&&!error&&!filtered.length&&<p className="py-10 text-center text-muted">No matching providers found.</p>}
  </div>;
}
