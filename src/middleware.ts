import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SESSION_COOKIE = "wb_admin";
const LOCALES = ["nl", "en", "fr"] as const;

function authSecret(): Uint8Array {
  const secret =
    process.env.AUTH_SECRET ||
    `dev-secret-${process.env.ADMIN_PASSWORD || "onveilig"}`;
  return new TextEncoder().encode(secret);
}

function detectLocale(req: NextRequest): string {
  const cookie = req.cookies.get("lang")?.value;
  if (cookie && (LOCALES as readonly string[]).includes(cookie)) return cookie;
  const header = req.headers.get("accept-language") || "";
  for (const part of header.split(",")) {
    const code = part.split(";")[0].trim().slice(0, 2).toLowerCase();
    if ((LOCALES as readonly string[]).includes(code)) return code;
  }
  return "nl";
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Admin-guard (admin blijft buiten de taalroutes)
  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") return NextResponse.next();
    const token = req.cookies.get(SESSION_COOKIE)?.value;
    let ok = false;
    if (token) {
      try {
        const { payload } = await jwtVerify(token, authSecret());
        ok = payload.role === "admin";
      } catch {
        ok = false;
      }
    }
    if (!ok) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Taalroutes: /  →  /nl (of en/fr op basis van cookie/browser),
  // en oude paden zoals /pc-bouwen  →  /nl/pc-bouwen
  const first = pathname.split("/")[1];
  if (!(LOCALES as readonly string[]).includes(first)) {
    const url = req.nextUrl.clone();
    url.pathname = `/${detectLocale(req)}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  // Alles behalve api, next-internals en bestanden met een extensie
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
