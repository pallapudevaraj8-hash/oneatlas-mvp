import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function apiError(error: unknown) {
  if (error instanceof ZodError) return NextResponse.json({ error: "Invalid query", details: error.flatten() }, { status: 400 });
  console.error("API error", error);
  return NextResponse.json({ error: "Unable to retrieve data. Check database connection and server logs." }, { status: 500 });
}
