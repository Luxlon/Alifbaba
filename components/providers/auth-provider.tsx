"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { getSession, setSession, clearSession, type SessionData } from "@/lib/session";
import type { Profile } from "@/types/supabase";

interface AuthContextType {
  session: SessionData | null;
  profile: Profile | null;
  isLoading: boolean;
  signIn: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => void;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  profile: null,
  isLoading: true,
  signIn: async () => ({ success: false, error: "Not initialized" }),
  signOut: () => {},
  refreshProfile: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSessionState] = useState<SessionData | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const supabase = createClient();

  // Fetch profile from database
  const fetchProfile = async (userId: string): Promise<Profile | null> => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        return null;
      }

      return data as Profile;
    } catch (err) {
      console.error("Exception fetching profile:", err);
      return null;
    }
  };

  // Refresh profile
  const refreshProfile = async () => {
    if (session) {
      const profileData = await fetchProfile(session.userId);
      setProfile(profileData);
    }
  };

  // Sign in - check username and password from profiles table
  const signIn = async (username: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("username", username.toLowerCase().trim())
        .eq("password", password)
        .eq("is_active", true)
        .single();

      if (error || !data) {
        return { success: false, error: "Username atau password salah" };
      }

      const profileData = data as Profile;

      // Create session
      const sessionData: SessionData = {
        userId: profileData.id,
        username: profileData.username,
        role: profileData.role,
        email: profileData.email,
      };

      setSession(sessionData);
      setSessionState(sessionData);
      setProfile(profileData);

      return { success: true };
    } catch (err) {
      console.error("Sign in error:", err);
      return { success: false, error: "Terjadi kesalahan saat login" };
    }
  };

  // Sign out
  const signOut = () => {
    clearSession();
    setSessionState(null);
    setProfile(null);
    window.location.replace("/");
  };

  // Initialize session on mount
  useEffect(() => {
    const initSession = async () => {
      setIsLoading(true);

      try {
        const existingSession = getSession();

        if (existingSession) {
          setSessionState(existingSession);
          // Fetch fresh profile data
          const profileData = await fetchProfile(existingSession.userId);
          if (profileData) {
            setProfile(profileData);
            // Update session if role changed
            if (profileData.role !== existingSession.role) {
              const updatedSession: SessionData = {
                ...existingSession,
                role: profileData.role,
              };
              setSession(updatedSession);
              setSessionState(updatedSession);
            }
          } else {
            // Profile not found, clear session
            clearSession();
            setSessionState(null);
          }
        }
      } catch (error) {
        console.error("Error initializing session:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        profile,
        isLoading,
        signIn,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
