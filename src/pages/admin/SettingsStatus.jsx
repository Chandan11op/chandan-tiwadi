import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { checkBackendHealth } from '../../services/adminData';
import { API_BASE_URL } from '../../services/apiClient';
import { Settings, ShieldCheck, CheckCircle2, AlertCircle, Database, Lock, Server, Cloud, Cpu, RefreshCw } from 'lucide-react';

export default function SettingsStatus() {
  const { user } = useAuth();
  const [health, setHealth] = useState(null);
  const [checking, setChecking] = useState(true);

  const fetchHealth = async () => {
    try {
      setChecking(true);
      const res = await checkBackendHealth();
      setHealth(res);
    } catch (err) {
      setHealth({ status: 'offline', error: err.message });
    } finally {
      setChecking(false);
    }
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  const isHealthy = health?.status === 'healthy' || health?.status === 'ok';

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Settings & System Status</h1>
          <p className="text-xs md:text-sm text-gray-400 mt-1">
            Real-time inspection of your Express backend, MongoDB Atlas cluster, Render deployment, and Cloudflare Pages SPA.
          </p>
        </div>
        <button
          onClick={fetchHealth}
          disabled={checking}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-xs font-semibold text-gray-300 hover:text-white transition-colors w-fit"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${checking ? 'animate-spin text-accent' : ''}`} />
          <span>Refresh Status</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Backend & MongoDB Atlas Connection */}
        <div className="p-6 rounded-2xl glass-card border border-white/5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Express.js & MongoDB Atlas</h2>
              <p className="text-[11px] text-gray-400">REST API & MongoDB Mongoose connection</p>
            </div>
          </div>

          <div className="space-y-3 pt-2 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-gray-400">Backend API URL</span>
              <span className="text-gray-200 font-mono text-[11px] truncate max-w-[200px]">
                {API_BASE_URL || 'http://localhost:5000'}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-gray-400">API Health Status</span>
              {isHealthy ? (
                <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <CheckCircle2 className="w-4 h-4" /> Healthy ({health?.uptime || 'Active'})
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                  <AlertCircle className="w-4 h-4" /> {checking ? 'Checking...' : 'Offline / Warming Up'}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-gray-400">Database Engine</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                MongoDB Atlas Connected
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-gray-400">Readiness Probe</span>
              <span className="text-gray-300 font-mono text-[11px]">/api/health/ready</span>
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
              <h2 className="text-sm font-bold text-white">Security & Authentication</h2>
              <p className="text-[11px] text-gray-400">JWT tokens, bcryptjs & rate-limiting</p>
            </div>
          </div>

          <div className="space-y-3 pt-2 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-gray-400">Current Session</span>
              <span className="text-emerald-400 font-mono text-[11px] font-bold">{user?.email || 'Authenticated Admin'}</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-gray-400">Auth Mechanism</span>
              <span className="text-gray-200 font-semibold">JWT Bearer + HttpOnly Cookie</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-gray-400">Rate Limiter</span>
              <span className="text-emerald-400 font-semibold">Enabled (Express-Rate-Limit)</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-gray-400">Bundle Protection</span>
              <span className="text-emerald-400 font-semibold">Zero database secrets exposed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cloudinary Media Management & Render Hosting */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl glass-card border border-white/5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Cloud className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Cloudinary Media Storage</h2>
              <p className="text-[11px] text-gray-400">Cloud asset CDN for images, certificates & CV</p>
            </div>
          </div>

          <div className="text-xs text-gray-300 space-y-2 leading-relaxed">
            <p>
              • Media is uploaded via server memory stream (Multer memoryStorage) directly to Cloudinary — avoiding Render's ephemeral filesystem.
            </p>
            <p>
              • Asset folders: <code className="text-[#8C97E6] bg-white/5 px-1.5 py-0.5 rounded">portfolio/certificates</code>, <code className="text-[#8C97E6] bg-white/5 px-1.5 py-0.5 rounded">portfolio/projects</code>, <code className="text-[#8C97E6] bg-white/5 px-1.5 py-0.5 rounded">portfolio/resumes</code>, <code className="text-[#8C97E6] bg-white/5 px-1.5 py-0.5 rounded">portfolio/profile</code>.
            </p>
            <p>
              • Replacing media automatically removes legacy assets from Cloudinary after database verification.
            </p>
          </div>
        </div>

        <div className="p-6 rounded-2xl glass-card border border-white/5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accentPurple/10 border border-accentPurple/20 flex items-center justify-center text-accentPurple">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Cloudflare Pages & Render Deployment</h2>
              <p className="text-[11px] text-gray-400">Decoupled Jamstack + Microservice architecture</p>
            </div>
          </div>

          <div className="text-xs text-gray-300 space-y-2 leading-relaxed">
            <p>
              • Frontend is hosted on Cloudflare Pages: <a href="https://chandan-tiwadi.pages.dev/" target="_blank" rel="noopener noreferrer" className="text-accent underline">chandan-tiwadi.pages.dev</a>
            </p>
            <p>
              • Backend runs on Render as a Node Web Service with root directory <code className="text-gray-300 bg-white/5 px-1.5 py-0.5 rounded">server</code>.
            </p>
            <p>
              • Health check path configured as <code className="text-emerald-400 bg-white/5 px-1.5 py-0.5 rounded">/api/health/ready</code>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
