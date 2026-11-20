import { prisma } from "@/lib/prisma";
import { modelInclude, serializeModel } from "@/lib/serialize";
import { categories } from "@/lib/types";
import type { Prisma } from "@prisma/client";
import { z } from "zod";

export const modelQuerySchema = z.object({
  q: z.string().trim().max(100).default(""),
  lab: z.string().trim().max(60).default(""),
  type: z.string().trim().max(40).default(""),
  capability: z.string().trim().max(40).default(""),
  sort: z.enum(["name", "newest", "context", "price-low", "price-high"]).default("newest"),
  page: z.coerce.number().int().min(1).max(1000).default(1),
  limit: z.coerce.number().int().min(1).max(48).default(12)
});
export type ModelQuery = z.infer<typeof modelQuerySchema>;

export async function listModels(query: ModelQuery) {
  const where: Prisma.ModelWhereInput = {
    ...(query.q ? { OR: [
      { name: { contains: query.q, mode: "insensitive" } },
      { description: { contains: query.q, mode: "insensitive" } },
      { lab: { name: { contains: query.q, mode: "insensitive" } } }
    ] } : {}),
    ...(query.lab ? { lab: { slug: query.lab } } : {}),
    ...(query.type ? { type: query.type } : {}),
    ...(query.capability ? { capabilities: { has: query.capability } } : {})
  };
  // Price sorts are computed via DB query for the lowest provider price, rather than client-only sorting.
  if (query.sort === "price-low" || query.sort === "price-high") {
    const all = await prisma.model.findMany({ where, include: modelInclude });
    all.sort((a,b) => {
      const costA = Math.min(...a.offerings.map((o) => o.inputPrice));
      const costB = Math.min(...b.offerings.map((o) => o.inputPrice));
      return (query.sort === "price-low" ? costA-costB : costB-costA) || a.name.localeCompare(b.name);
    });
    const start = (query.page-1)*query.limit;
    return { items:all.slice(start,start+query.limit).map(serializeModel), total:all.length, page:query.page, totalPages:Math.ceil(all.length/query.limit) };
  }
  const orderBy: Prisma.ModelOrderByWithRelationInput =
    query.sort === "name" ? { name:"asc" } :
    query.sort === "context" ? { contextWindow:"desc" } : { releasedAt:"desc" };
  const [items,total] = await prisma.$transaction([
    prisma.model.findMany({ where, include:modelInclude, orderBy, skip:(query.page-1)*query.limit, take:query.limit }),
    prisma.model.count({ where })
  ]);
  return { items:items.map(serializeModel), total, page:query.page, totalPages:Math.ceil(total/query.limit) };
}

export async function fetchRanking(category: string, type = "") {
  const metric = categories.includes(category) ? category : "Intelligence";
  const rows = await prisma.benchmark.findMany({
    where: { category:metric, ...(type ? { model: { type } } : {}) },
    include: { model: { include:modelInclude } },
    orderBy: { score:"desc" },take:100
  });
  return rows.map((row,index) => ({ rank:index+1,score:row.score,model:serializeModel(row.model) }));
}

export async function fetchLabs() {
  const labs = await prisma.lab.findMany({ include: { _count: { select: { models:true } } }, orderBy: { name:"asc" } });
  return labs.map(({_count,...lab}) => ({...lab,modelCount:_count.models}));
}
export async function fetchProviders() {
  const rows = await prisma.provider.findMany({ include: { offerings: { select: { modelId:true } } }, orderBy: { name:"asc" } });
  return rows.map(({offerings,...provider}) => ({...provider,modelCount:new Set(offerings.map((o) => o.modelId)).size}));
}
