import { AlertCircle, LoaderCircle } from "lucide-react";
export function Loading(){return <div role="status" className="flex items-center justify-center gap-2 rounded-xl border border-stroke py-16 text-sm text-muted"><LoaderCircle size={18} className="animate-spin"/>Loading database records…</div>}
export function ErrorNotice({error}:{error:string}){return <div role="alert" className="flex items-start gap-2 rounded-xl border border-[#a35a63] bg-[#39202b] px-4 py-4 text-sm text-[#ffccd3]"><AlertCircle size={17} className="shrink-0"/>{error}</div>}
