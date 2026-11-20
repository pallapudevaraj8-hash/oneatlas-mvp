import { prisma } from "@/lib/prisma";
import { modelInclude,serializeModel } from "@/lib/serialize";
import { apiError } from "@/lib/api";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET(_request: Request, {params}:{params:Promise<{slug:string}>}) {
  try {
    const {slug}=await params;
    if (slug.length>100) return NextResponse.json({error:"Invalid model slug"},{status:400});
    const model=await prisma.model.findUnique({where:{slug},include:modelInclude});
    return model ? NextResponse.json(serializeModel(model)) : NextResponse.json({error:"Model not found"},{status:404});
  } catch(error){return apiError(error);}
}
