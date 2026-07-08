import { NextResponse } from "next/server";
import { getActivePromo } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const promo = getActivePromo();
  if (!promo) return NextResponse.json({ active: false });
  return NextResponse.json({
    active: true,
    left: promo.left,
    total: promo.total,
    texts: { nl: promo.text_nl, en: promo.text_en, fr: promo.text_fr },
  });
}
