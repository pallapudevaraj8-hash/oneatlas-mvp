import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET() {
  try {const models=await prisma.model.count();return NextResponse.json({status:"ok",models,data:"illustrative demo"});}
  catch{return NextResponse.json({status:"error",error:"Database connection unavailable"},{status:503});}
}
