"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { getSession, setSession, clearSession, type SessionData } from "@/lib/session";
import type { Profile } from "@/types/supabase";
import { useUserProgress } from "@/store/use-user-progress";
import { useLessonProgress } from "@/store/use-lesson-progress";

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
  
  // Get store functions
  const { loadFromSupabase: loadUserProgress, clearUserData, setOnlineStatus } = useUserProgress();
  const { loadFromSupabase: loadLessonProgress, clearProgress, setCurrentUserId } = useLessonProgress();

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

      // Clear old data first, then load new user's data from Supabase
      clearUserData();
      clearProgress();
      
      setSession(sessionData);
      setSessionState(sessionData);
      setProfile(profileData);
      
      // Load user's data from database
      setOnlineStatus(true);
      setCurrentUserId(profileData.id);
      
      // Load progress data in background (don't await to not block login)
      loadUserProgress(profileData.id).catch(console.error);
      loadLessonProgress(profileData.id).catch(console.error);

      return { success: true };
    } catch (err) {
      console.error("Sign in error:", err);
      return { success: false, error: "Terjadi kesalahan saat login" };
    }
  };

  // Sign out
  const signOut = () => {
    // Clear all user data from stores
    clearUserData();
    clearProgress();
    setCurrentUserId(null);
    
    // Clear session
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
            
            // Load user's progress data from Supabase
            setOnlineStatus(true);
            setCurrentUserId(profileData.id);
            loadUserProgress(profileData.id).catch(console.error);
            loadLessonProgress(profileData.id).catch(console.error);
          } else {
            // Profile not found, clear session
            clearSession();
            clearUserData();
            clearProgress();
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
