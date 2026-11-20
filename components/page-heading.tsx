import type { ReactNode } from "react";
export function PageHeading({eyebrow,title,description,action}:{eyebrow:string;title:string;description:string;action?:ReactNode}){
  return <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><div className="eyebrow mb-3">{eyebrow}</div><h1 className="title-lg">{title}</h1><p className="mt-3 max-w-[650px] text-sm leading-6 text-muted">{description}</p></div>{action}</div>;
}
