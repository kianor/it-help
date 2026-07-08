import { NextResponse } from "next/server";
import { getPromo } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const { active, left, total } = getPromo();
  return NextResponse.json({ active, left, total });
}
