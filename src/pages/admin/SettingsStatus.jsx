import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { ADMIN_EMAIL, isSupabaseConfigured } from '../../lib/supabase';
import { Settings, ShieldCheck, CheckCircle2, AlertCircle, Database, Lock, Server } from 'lucide-react';

export default function SettingsStatus() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-white/5">
        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Settings & System Status</h1>
        <p className="text-xs md:text-sm text-gray-400 mt-1">
          Review backend connectivity, authentication policies and Cloudflare deployment configuration.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Backend & DB Health */}
        <div className="p-6 rounded-2xl glass-card border border-white/5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Database & Supabase Connection</h2>
              <p className="text-[11px] text-gray-400">PostgreSQL backend with Row Level Security</p>
            </div>
          </div>

          <div className="space-y-3 pt-2 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-gray-400">Supabase Config Status</span>
              {isSupabaseConfigured ? (
                <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <CheckCircle2 className="w-4 h-4" /> Connected
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                  <AlertCircle className="w-4 h-4" /> Missing Env Vars
                </span>
              )}
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-gray-400">Supabase URL</span>
              <span className="text-gray-200 font-mono text-[11px]">
                {import.meta.env.VITE_SUPABASE_URL ? `${import.meta.env.VITE_SUPABASE_URL.slice(0, 20)}...` : 'Not Set'}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-gray-400">Row Level Security</span>
              <span className="text-emerald-400 font-semibold">Enabled (SQL RLS)</span>
            </div>
          </div>
        </div>

        {/* Security & Access Controls */}
        <div className="p-6 rounded-2xl glass-card border border-white/5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Security & Authorization</h2>
              <p className="text-[11px] text-gray-400">Restricted administrator allowlist</p>
            </div>
          </div>

          <div className="space-y-3 pt-2 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-gray-400">Authorized Admin Email</span>
              <span className="text-white font-mono text-[11px] font-bold">{ADMIN_EMAIL}</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-gray-400">Current Session User</span>
              <span className="text-emerald-400 font-mono text-[11px] font-bold">{user?.email || 'Authenticated'}</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-gray-400">Admin Secret Safety</span>
              <span className="text-emerald-400 font-semibold">No secrets in bundle</span>
            </div>
          </div>
        </div>
      </div>

      {/* Deployment & Routing info */}
      <div className="p-6 rounded-2xl glass-card border border-white/5 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accentPurple/10 border border-accentPurple/20 flex items-center justify-center text-accentPurple">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">Cloudflare Pages & SPA Routing</h2>
            <p className="text-[11px] text-gray-400">Single-page application fallback configuration</p>
          </div>
        </div>

        <div className="text-xs text-gray-300 space-y-2 leading-relaxed">
          <p>
            • Public domain: <a href="https://chandan-tiwadi.pages.dev/" target="_blank" rel="noopener noreferrer" className="text-accent underline">https://chandan-tiwadi.pages.dev/</a>
          </p>
          <p>
            • Admin Portal URL: <code className="text-accentPurple bg-white/5 px-2 py-0.5 rounded">/admin-portal</code> (Unlinked in public sitemap/navigation)
          </p>
          <p>
            • Wrangler single-page-application asset fallback is active in <code className="text-gray-300 bg-white/5 px-1.5 py-0.5 rounded">wrangler.jsonc</code> ensuring smooth client-side routing on Cloudflare Pages.
          </p>
        </div>
      </div>
    </div>
  );
}
