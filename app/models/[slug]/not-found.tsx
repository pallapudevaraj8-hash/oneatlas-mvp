import Link from "next/link";
export default function NotFound(){return <div className="shell py-24 text-center"><h1 className="text-3xl font-bold text-white">Model not found</h1><p className="mt-4 text-muted">This model is not available in the demo catalog.</p><Link href="/models" className="btn-primary mt-7">Browse available models</Link></div>}
