import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured, ADMIN_EMAIL } from '../lib/supabase';

const AuthContext = createContext({
  user: null,
  session: null,
  isAdmin: false,
  loading: true,
  isConfigured: false,
  login: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkIsAdmin = (email) => {
    if (!email) return false;
    return email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
  };

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false);
      return;
    }

    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error("Supabase is not configured yet. Please configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    // Verify authorized administrator email
    if (!checkIsAdmin(data.user?.email)) {
      await supabase.auth.signOut();
      throw new Error("Access Denied: This account is not authorized to access the Admin Portal.");
    }

    return data;
  };

  const logout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setSession(null);
  };

  const isAdmin = Boolean(user && checkIsAdmin(user.email));

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isAdmin,
        loading,
        isConfigured: isSupabaseConfigured,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
