"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowUpRight, Menu, X, Layers3 } from "lucide-react";
const links = [
  ["/models","Models"],["/compare","Compare"],["/rankings","Rankings"],["/labs","AI Labs"],["/providers","Providers"]
];
export default function Navbar(){
  const path=usePathname();const [open,setOpen]=useState(false);
  return <header className="sticky top-0 z-40 border-b border-stroke/70 bg-ink/90 backdrop-blur-xl">
    <div className="shell flex h-[72px] items-center justify-between gap-5">
      <Link href="/" className="flex items-center gap-2.5" onClick={()=>setOpen(false)}>
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-cyan text-ink"><Layers3 size={21} strokeWidth={2.5}/></span>
        <span className="text-xl font-bold tracking-tight text-white">one<span className="text-accent">atlas</span><span className="text-xs text-cyan">.demo</span></span>
      </Link>
      <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
        {links.map(([href,label])=><Link key={href} href={href} className={`rounded-lg px-3 py-2 text-sm transition-colors ${path===href || path.startsWith(href+"/")?"bg-[#20253c] font-semibold text-[#cbbaff]":"text-muted hover:bg-[#142239] hover:text-white"}`}>{label}</Link>)}
      </nav>
      <div className="hidden md:block"><Link href="/models" className="btn-secondary"><span>Explore catalog</span><ArrowUpRight size={15}/></Link></div>
      <button type="button" className="btn-ghost md:hidden" aria-label={open?"Close menu":"Open menu"} aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X size={22}/>:<Menu size={22}/>}</button>
    </div>
    {open&&<nav className="shell flex flex-col gap-1 pb-4 md:hidden" aria-label="Mobile navigation">{links.map(([href,label])=><Link href={href} onClick={()=>setOpen(false)} key={href} className={`rounded-lg px-3 py-3 ${path===href?"bg-[#20253c] text-accent":"text-[#bdcbdd]"}`}>{label}</Link>)}</nav>}
  </header>;
}
