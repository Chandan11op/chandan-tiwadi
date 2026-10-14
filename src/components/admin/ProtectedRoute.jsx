import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute() {
  const { user, isAdmin, loading, isConfigured } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-darkBg flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-gray-400 font-medium">Verifying authorization...</span>
        </div>
      </div>
    );
  }

  // If Supabase is not configured yet or user is not logged in / not authorized admin
  if (!isConfigured || !user || !isAdmin) {
    return <Navigate to="/admin-portal" replace />;
  }

  return <Outlet />;
}
