import { prisma } from "@/lib/prisma";
import { modelInclude,serializeModel } from "@/lib/serialize";
import { apiError } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET(request:NextRequest) {
  try {
    const ids=[...new Set((request.nextUrl.searchParams.get("ids")??"").split(",").filter(Boolean))];
    if (!ids.length||ids.length>4||ids.some(id=>!/^[a-z0-9-]{1,80}$/.test(id))) return NextResponse.json({error:"Enter 1–4 valid model slugs"},{status:400});
    const rows=await prisma.model.findMany({where:{slug:{in:ids}},include:modelInclude});
    const lookup=new Map(rows.map(row=>[row.slug,serializeModel(row)]));
    return NextResponse.json(ids.map(id=>lookup.get(id)).filter(Boolean));
  } catch(error){return apiError(error);}
}
