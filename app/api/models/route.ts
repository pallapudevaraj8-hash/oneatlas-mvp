import { listModels, modelQuerySchema } from "@/lib/queries";
import { apiError } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  try { return NextResponse.json(await listModels(modelQuerySchema.parse(Object.fromEntries(request.nextUrl.searchParams)))); }
  catch(error){return apiError(error);}
}
