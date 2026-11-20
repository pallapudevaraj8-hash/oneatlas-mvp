import type { Metadata } from "next";
import type { ReactNode } from "react";
import Navbar from "@/components/navbar";
import Link from "next/link";
import "./globals.css";
export const metadata:Metadata={title:{default:"OneAtlas Demo | AI Model Discovery",template:"%s | OneAtlas Demo"},description:"Database-powered AI model discovery, comparison and illustrative benchmark demo."};
export default function RootLayout({children}:{children:ReactNode}){
  return <html lang="en"><body><Navbar/><main className="min-h-[calc(100vh-180px)]">{children}</main>
  <footer className="mt-24 border-t border-stroke bg-[#0b1524]"><div className="shell flex flex-col justify-between gap-5 py-9 sm:flex-row sm:items-center"><div><Link href="/" className="font-bold text-white">one<span className="text-accent">atlas</span> / Demo</Link><div className="mt-1 text-xs text-muted">Built with Next.js, TypeScript, Prisma and PostgreSQL.</div></div><div className="max-w-md text-xs leading-5 text-muted">Independent internship demonstration, not affiliated with oneatlas.dev. All catalog metrics are illustrative sample data.</div></div></footer></body></html>;
}
