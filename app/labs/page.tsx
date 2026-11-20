"use client";
import { useEffect,useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Building2, Search } from "lucide-react";
import { PageHeading } from "@/components/page-heading";
import { BrandAvatar } from "@/components/brand-avatar";
import type { Lab } from "@/lib/types";
import { Loading,ErrorNotice } from "@/components/api-feedback";
export default function LabsPage(){
  const [items,setItems]=useState<Lab[]>([]);const [q,setQ]=useState("");const [loading,setLoading]=useState(true);const [error,setError]=useState("");
  useEffect(()=>{fetch("/api/labs").then(r=>{if(!r.ok)throw Error("Could not load labs from database");return r.json();}).then(setItems).catch(e=>setError(e.message)).finally(()=>setLoading(false));},[]);
  const filtered=items.filter(item=>`${item.name} ${item.description}`.toLowerCase().includes(q.toLowerCase()));
  return <div className="shell pt-12 pb-12"><PageHeading eyebrow="The organizations behind the models" title="AI labs directory" description="Learn about the organizations building the models in this demo, and browse each lab's catalog entries."/>
    <div className="panel mb-7 flex items-center gap-3 p-4"><Search size={18} className="text-muted"/><input className="w-full bg-transparent text-sm text-white outline-none placeholder:text-muted" aria-label="Search AI labs" placeholder="Search research labs…" value={q} onChange={e=>setQ(e.target.value)}/></div>
    {loading?<Loading/>:error?<ErrorNotice error={error}/>:<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{filtered.map(lab=><article key={lab.id} className="panel flex flex-col p-6"><div className="flex items-center justify-between"><BrandAvatar initials={lab.initials} large/><Building2 size={18} className="text-muted"/></div><h2 className="mt-5 text-xl font-bold text-white">{lab.name}</h2><p className="mt-2 min-h-[50px] text-sm leading-6 text-muted">{lab.description}</p><div className="mt-auto flex items-center justify-between border-t border-stroke pt-5"><span className="text-xs text-muted"><strong className="text-white">{lab.modelCount}</strong> catalog models</span><Link href={`/models?lab=${encodeURIComponent(lab.slug)}`} className="inline-flex items-center gap-1 text-xs font-bold text-accent">Explore models <ArrowUpRight size={13}/></Link></div>{lab.website&&<a href={lab.website} target="_blank" rel="noopener noreferrer" className="mt-3 text-xs text-muted underline hover:text-white">Official website</a>}</article>)}</div>}{!loading&&!error&&!filtered.length&&<p className="py-10 text-center text-muted">No matching labs found.</p>}
  </div>;
}
