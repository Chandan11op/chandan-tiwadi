import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, Mail, KeyRound, AlertCircle, ArrowLeft, ShieldCheck } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login, isConfigured } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await login(email.trim(), password);
      navigate('/admin-portal/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid credentials or authorization failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-darkBg flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background glowing effects */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-accentPurple/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-md w-full glass-card p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl relative z-10">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Portfolio</span>
          </button>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin Secure</span>
          </div>
        </div>

        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-accent/20 to-accentPurple/20 border border-white/10 flex items-center justify-center mb-4 text-accent">
            <Lock className="w-7 h-7" />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Admin Portal</h1>
          <p className="text-xs md:text-sm text-gray-400 mt-2">
            Authorized management dashboard for Chandan Tiwadi
          </p>
        </div>

        {!isConfigured && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs leading-relaxed flex items-start gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-amber-400 mt-0.5" />
            <div>
              <p className="font-bold mb-1">Backend Configuration Required</p>
              <p className="text-amber-300/80">
                Please set up your Supabase project credentials in <code>.env</code> to enable live authentication and database operations.
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs leading-relaxed flex items-start gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-400 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
              Administrator Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                <KeyRound className="w-4 h-4" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 rounded-xl bg-accent text-white font-bold text-sm hover:bg-accent/90 disabled:opacity-50 transition-all duration-200 shadow-blue-glow flex items-center justify-center gap-2 mt-2"
          >
            {submitting ? (
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <span>Sign In to Dashboard</span>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-[11px] text-gray-500">
            Protected endpoint with server-verified Row Level Security & JWT session validation.
          </p>
        </div>
      </div>
    </div>
  );
}
