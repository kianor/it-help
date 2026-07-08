import { NextRequest, NextResponse } from "next/server";
import { consumeLoginToken } from "@/lib/db";
import { setCustomerCookie } from "@/lib/auth";
import { p } from "@/i18n/slugs.mjs";
import { isLocale } from "@/i18n/config";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token") || "";
  const langParam = req.nextUrl.searchParams.get("lang") || "nl";
  const lang = isLocale(langParam) ? langParam : "nl";

  const url = req.nextUrl.clone();
  url.search = "";

  const email = token ? consumeLoginToken(token) : null;
  if (!email) {
    url.pathname = p(lang, "account");
    url.search = "?fout=link";
    return NextResponse.redirect(url);
  }

  await setCustomerCookie(email);
  url.pathname = p(lang, "account");
  return NextResponse.redirect(url);
}
