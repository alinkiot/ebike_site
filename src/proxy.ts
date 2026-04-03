import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
  const isAuthed = !!req.auth;
  const isAdmin = (req.auth?.user as { role?: string })?.role === "ADMIN";

  if (isAdminRoute && (!isAuthed || !isAdmin)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
});

export const config = { matcher: ["/admin/:path*"] };
