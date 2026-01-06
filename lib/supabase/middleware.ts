import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.
  const {
    data: { user },
  } = await supabase.auth.getUser();

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

  if (isProtectedPath && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  // If user is logged in and tries to access login/register, redirect to appropriate page
  if (user && (request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/register")) {
    // Get user profile to check role
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    const url = request.nextUrl.clone();
    if (profile?.role === "superadmin") {
      url.pathname = "/admin";
    } else if (profile?.role === "teacher") {
      url.pathname = "/dashboard";
    } else {
      url.pathname = "/learn";
    }
    return NextResponse.redirect(url);
  }

  // Admin route is only for superadmin
  if (request.nextUrl.pathname.startsWith("/admin") && user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "superadmin") {
      const url = request.nextUrl.clone();
      url.pathname = profile?.role === "teacher" ? "/dashboard" : "/learn";
      return NextResponse.redirect(url);
    }
  }

  // Dashboard is only for teachers
  if (request.nextUrl.pathname.startsWith("/dashboard") && user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "teacher") {
      const url = request.nextUrl.clone();
      url.pathname = profile?.role === "superadmin" ? "/admin" : "/learn";
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}
