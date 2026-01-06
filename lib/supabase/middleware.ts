import { NextResponse, type NextRequest } from "next/server";
import { parseSessionFromCookie } from "@/lib/session";

export async function updateSession(request: NextRequest) {
  const response = NextResponse.next({ request });

  // Get session from cookie
  const cookieHeader = request.headers.get("cookie") || "";
  const session = parseSessionFromCookie(cookieHeader);

  // Protected routes - redirect to login if not authenticated
  const protectedPaths = [
    "/learn",
    "/hijaiyah",
    "/stories",
    "/hadith",
    "/iqro",
    "/quests",
    "/shop",
    "/leaderboard",
    "/account",
    "/dashboard",
    "/admin",
  ];

  const isProtectedPath = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  // If not logged in and trying to access protected route, redirect to login
  if (isProtectedPath && !session) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  // If logged in and tries to access login/register, redirect to appropriate page
  if (session && (request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/register")) {
    const url = request.nextUrl.clone();
    if (session.role === "superadmin") {
      url.pathname = "/admin";
    } else if (session.role === "teacher") {
      url.pathname = "/dashboard";
    } else {
      url.pathname = "/learn";
    }
    return NextResponse.redirect(url);
  }

  // Admin route is only for superadmin
  if (request.nextUrl.pathname.startsWith("/admin") && session) {
    if (session.role !== "superadmin") {
      const url = request.nextUrl.clone();
      url.pathname = session.role === "teacher" ? "/dashboard" : "/learn";
      return NextResponse.redirect(url);
    }
  }

  // Dashboard is only for teachers
  if (request.nextUrl.pathname.startsWith("/dashboard") && session) {
    if (session.role !== "teacher") {
      const url = request.nextUrl.clone();
      url.pathname = session.role === "superadmin" ? "/admin" : "/learn";
      return NextResponse.redirect(url);
    }
  }

  return response;
}
