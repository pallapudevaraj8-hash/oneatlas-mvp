import { fetchRanking } from "@/lib/queries";
import { categories,modelTypes } from "@/lib/types";
import { apiError } from "@/lib/api";
import { NextRequest,NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET(request:NextRequest) {
  try {
    const metric=request.nextUrl.searchParams.get("metric")??"Intelligence";
    const type=request.nextUrl.searchParams.get("type")??"";
    if (!categories.includes(metric)||(type&&!modelTypes.includes(type))) return NextResponse.json({error:"Invalid metric or type"},{status:400});
    return NextResponse.json(await fetchRanking(metric,type));
  } catch(e){return apiError(e);}
}
