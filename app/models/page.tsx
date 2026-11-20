"use client";
import { useEffect,useState } from "react";
import Link from "next/link";
import { ArrowRight, Search, SlidersHorizontal, X } from "lucide-react";
import type { AIModel, Lab, ModelList } from "@/lib/types";
import { capabilities,modelTypes } from "@/lib/types";
import { PageHeading } from "@/components/page-heading";
import ModelCard from "@/components/model-card";
import DemoNotice from "@/components/demo-notice";
import { Loading,ErrorNotice } from "@/components/api-feedback";
export default function ModelsPage(){
  const [q,setQ]=useState("");const [lab,setLab]=useState("");const [type,setType]=useState("");const [cap,setCap]=useState("");
  const [sort,setSort]=useState("newest");const [page,setPage]=useState(1);const [labs,setLabs]=useState<Lab[]>([]);
  const [data,setData]=useState<ModelList|null>(null);const [error,setError]=useState("");const [loading,setLoading]=useState(true);
  const [selected,setSelected]=useState<string[]>([]);
  useEffect(()=>{const params=new URLSearchParams(window.location.search);const requested=params.get("lab");if(requested) setLab(requested);fetch("/api/labs").then(r=>r.ok?r.json():Promise.reject()).then(setLabs).catch(()=>{});},[]);
  useEffect(()=>{
    const controller=new AbortController();const t=setTimeout(async()=>{
      setLoading(true);setError("");
      try {const params=new URLSearchParams({q,lab,type,capability:cap,sort,page:String(page),limit:"12"});
        const response=await fetch("/api/models?"+params.toString(),{signal:controller.signal});
        if(!response.ok)throw Error("Unable to load models. Verify that PostgreSQL is running and the database has been seeded.");
        setData(await response.json());
      }catch(e){if(!controller.signal.aborted)setError(e instanceof Error?e.message:"Request failed");}
      finally{if(!controller.signal.aborted)setLoading(false);}
    },220);
    return()=>{clearTimeout(t);controller.abort();};
  },[q,lab,type,cap,sort,page]);
  function resetPage(setter:(value:string)=>void,value:string){setter(value);setPage(1)}
  function toggle(slug:string){setSelected(cur=>cur.includes(slug)?cur.filter(i=>i!==slug):cur.length>=4?cur:[...cur,slug]);}
  const clear=()=>{setQ("");setLab("");setType("");setCap("");setSort("newest");setPage(1)};
  return <div className="shell pt-12 pb-10"><PageHeading eyebrow="The model universe" title="Discover AI models" description="Search the catalog, apply real database filters, and select up to four models to compare." action={<Link href="/compare" className="btn-secondary">Open comparison <ArrowRight size={15}/></Link>}/>
    <div className="mb-6"><DemoNotice/></div>
    <div className="panel p-4 sm:p-5"><div className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#dce7f7]"><SlidersHorizontal size={16} className="text-accent"/> Search & filters</div>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5"><div className="relative md:col-span-2"><Search size={17} className="pointer-events-none absolute left-3.5 top-3.5 text-muted"/><input aria-label="Search models" className="field pl-10" placeholder="Search models or labs…" value={q} onChange={e=>resetPage(setQ,e.target.value)}/></div>
      <select aria-label="Filter by research lab" className="field" value={lab} onChange={e=>resetPage(setLab,e.target.value)}><option value="">All research labs</option>{labs.map(item=><option key={item.id} value={item.slug}>{item.name}</option>)}</select>
      <select aria-label="Filter by model type" className="field" value={type} onChange={e=>resetPage(setType,e.target.value)}><option value="">All types</option>{modelTypes.map(item=><option key={item}>{item}</option>)}</select>
      <select aria-label="Filter by capability" className="field" value={cap} onChange={e=>resetPage(setCap,e.target.value)}><option value="">All capabilities</option>{capabilities.map(item=><option key={item}>{item}</option>)}</select></div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3"><button onClick={clear} type="button" className="inline-flex items-center gap-1 text-xs text-muted hover:text-white"><X size={13}/> Clear filters</button><label className="flex items-center gap-2 text-xs text-muted">Sort by <select aria-label="Sort models" className="field !w-auto !py-2" value={sort} onChange={e=>resetPage(setSort,e.target.value)}><option value="newest">Newest first</option><option value="name">Name A–Z</option><option value="context">Largest context</option><option value="price-low">Lowest input price</option><option value="price-high">Highest input price</option></select></label></div>
    </div>
    <div className="my-6 flex items-center justify-between gap-3"><p role="status" className="text-sm text-muted">{!loading && data ? <><strong className="text-white">{data.total}</strong> matching models</>:"Loading model catalog…"}</p><p className="text-xs text-muted">Select up to four for comparison</p></div>
    {error?<ErrorNotice error={error}/>:loading?<Loading/>:data?.items.length?<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{data.items.map((model:AIModel)=><ModelCard key={model.id} model={model} selected={selected.includes(model.slug)} onToggle={toggle}/>)}</div>:<div className="panel px-6 py-14 text-center text-muted">No matching models. Try clearing a filter.</div>}
    {!!data?.totalPages && data.totalPages>1 && !error && <div className="mt-8 flex items-center justify-center gap-4"><button className="btn-secondary" disabled={page<=1} onClick={()=>setPage(p=>p-1)}>Previous</button><span className="text-sm text-muted">Page {page} of {data.totalPages}</span><button className="btn-secondary" disabled={page>=data.totalPages} onClick={()=>setPage(p=>p+1)}>Next</button></div>}
    {selected.length>0&&<div className="sticky bottom-5 z-20 mx-auto mt-8 flex max-w-lg items-center justify-between gap-3 rounded-2xl border border-[#7767b2] bg-[#1d2340] p-3 shadow-2xl"><div className="pl-2 text-sm"><strong>{selected.length}/4</strong> selected <button className="ml-2 text-xs text-muted underline" onClick={()=>setSelected([])}>Clear</button></div><Link href={`/compare?ids=${encodeURIComponent(selected.join(","))}`} className="btn-primary">Compare selected <ArrowRight size={15}/></Link></div>}
  </div>;
}
