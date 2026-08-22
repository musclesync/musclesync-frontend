import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const isLoggedIn = req.cookies.get("session")?.value;

  const protectedRoutes = ["/dashboard"];

  if (protectedRoutes.includes(req.nextUrl.pathname) && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
