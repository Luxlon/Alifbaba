// Simple session management using localStorage (client) and cookies (server)
// No Supabase Auth - just checking profiles table for login

const SESSION_KEY = "alifbaba_session";

export interface SessionData {
  userId: string;
  username: string;
  role: "student" | "teacher" | "superadmin";
  email: string | null;
}

// Client-side session management
export function getSession(): SessionData | null {
  if (typeof window === "undefined") return null;
  
  try {
    const session = localStorage.getItem(SESSION_KEY);
    if (!session) return null;
    return JSON.parse(session) as SessionData;
  } catch {
    return null;
  }
}

export function setSession(data: SessionData): void {
  if (typeof window === "undefined") return;
  
  localStorage.setItem(SESSION_KEY, JSON.stringify(data));
  // Also set a cookie for middleware to read
  document.cookie = `${SESSION_KEY}=${encodeURIComponent(JSON.stringify(data))}; path=/; max-age=604800; SameSite=Lax`;
}

export function clearSession(): void {
  if (typeof window === "undefined") return;
  
  localStorage.removeItem(SESSION_KEY);
  // Clear the cookie
  document.cookie = `${SESSION_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

// Parse session from cookie string (for server/middleware)
export function parseSessionFromCookie(cookieHeader: string): SessionData | null {
  try {
    const cookies = cookieHeader.split(";").reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split("=");
      if (key && value) {
        acc[key] = value;
      }
      return acc;
    }, {} as Record<string, string>);

    const sessionCookie = cookies[SESSION_KEY];
    if (!sessionCookie) return null;

    return JSON.parse(decodeURIComponent(sessionCookie)) as SessionData;
  } catch {
    return null;
  }
}
