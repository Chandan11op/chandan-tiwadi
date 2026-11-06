import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  apiRequest,
  getStoredToken,
  getStoredUser,
  setStoredAuth,
  clearStoredAuth,
  API_BASE_URL,
} from '../services/apiClient';

const AuthContext = createContext({
  user: null,
  session: null,
  isAdmin: false,
  loading: true,
  isConfigured: true,
  login: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser());
  const [loading, setLoading] = useState(true);

  // Validate session against server on mount
  useEffect(() => {
    let isMounted = true;
    const token = getStoredToken();

    if (!token) {
      setLoading(false);
      return;
    }

    apiRequest('/api/auth/me')
      .then((res) => {
        if (!isMounted) return;
        if (res?.data?.user) {
          setUser(res.data.user);
          setStoredAuth(token, res.data.user);
        } else {
          clearStoredAuth();
          setUser(null);
        }
      })
      .catch(() => {
        if (!isMounted) return;
        clearStoredAuth();
        setUser(null);
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (email, password) => {
    try {
      const res = await apiRequest('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: email.trim(), password }),
      });

      if (!res?.data?.token) {
        throw new Error(res?.message || 'Login failed');
      }

      const { token, user: loggedInUser } = res.data;
      setStoredAuth(token, loggedInUser);
      setUser(loggedInUser);
      return res.data;
    } catch (err) {
      clearStoredAuth();
      setUser(null);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await apiRequest('/api/auth/logout', { method: 'POST' }).catch(() => {});
    } finally {
      clearStoredAuth();
      setUser(null);
    }
  };

  const isAdmin = Boolean(user && (user.role === 'admin' || user.email));
  const isConfigured = Boolean(API_BASE_URL !== undefined);

  return (
    <AuthContext.Provider
      value={{
        user,
        session: user ? { user } : null,
        isAdmin,
        loading,
        isConfigured,
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
