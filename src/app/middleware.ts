// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

import { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Immer Login-Seite öffentlich halten
  if (url.pathname.startsWith("/auth")) return NextResponse.next();

  // Wenn nicht eingeloggt, direkt zum Login
  if (!token) {
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  // Rolle-basierte Einschränkungen
  if (url.pathname.startsWith("/dashboard/hr") && token.role !== "HR") {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }
  if (
    url.pathname.startsWith("/dashboard/supervisor") &&
    token.role !== "SUPERVISOR"
  ) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
