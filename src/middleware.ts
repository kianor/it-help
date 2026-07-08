import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SESSION_COOKIE = "wb_admin";

function authSecret(): Uint8Array {
  const secret =
    process.env.AUTH_SECRET ||
    `dev-secret-${process.env.ADMIN_PASSWORD || "onveilig"}`;
  return new TextEncoder().encode(secret);
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
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
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
