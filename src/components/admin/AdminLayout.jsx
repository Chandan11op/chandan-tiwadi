import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  FolderGit2, 
  FileText, 
  Award, 
  User, 
  Sparkles, 
  GraduationCap, 
  Briefcase, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  ExternalLink,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export default function AdminLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin-portal');
  };

  const navItems = [
    { name: 'Overview', path: '/admin-portal/dashboard', icon: LayoutDashboard },
    { name: 'Projects', path: '/admin-portal/projects', icon: FolderGit2 },
    { name: 'CV & Resume', path: '/admin-portal/resume', icon: FileText },
    { name: 'Certificates', path: '/admin-portal/certificates', icon: Award },
    { name: 'Profile', path: '/admin-portal/profile', icon: User },
    { name: 'Skills', path: '/admin-portal/skills', icon: Sparkles },
    { name: 'Education', path: '/admin-portal/education', icon: GraduationCap },
    { name: 'Experience', path: '/admin-portal/experience', icon: Briefcase },
    { name: 'Settings & Status', path: '/admin-portal/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-darkBg text-gray-100 flex flex-col md:flex-row font-sans">
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-cardBg border-b border-white/5 sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-accent/20 border border-accent/40 flex items-center justify-center text-accent font-black text-sm">
            CT
          </div>
          <div>
            <span className="font-bold text-sm tracking-tight text-white block">Portfolio CMS</span>
            <span className="text-[10px] text-gray-400 block -mt-1">Admin Dashboard</span>
          </div>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Desktop Sidebar & Mobile Drawer */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#070b14] border-r border-white/5 flex flex-col justify-between transition-transform duration-300 md:static md:translate-x-0
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div>
          {/* Brand header */}
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-accent to-accentPurple flex items-center justify-center text-white font-extrabold text-base shadow-blue-glow">
                CT
              </div>
              <div>
                <h2 className="font-extrabold text-base text-white tracking-tight leading-none">Chandan Tiwadi</h2>
                <span className="text-[11px] text-accent font-semibold tracking-wider uppercase mt-1 inline-flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> CMS Admin
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-220px)]">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/admin-portal/dashboard'}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200
                    ${isActive 
                      ? 'bg-accent/15 text-accent border border-accent/25 shadow-[0_0_15px_rgba(59,130,246,0.15)] font-bold' 
                      : 'text-gray-400 hover:text-gray-200 hover:bg-white/[0.03] border border-transparent'}
                  `}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* User Info & Actions */}
        <div className="p-4 border-t border-white/5 bg-white/[0.01]">
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 mb-3 flex items-center justify-between">
            <div className="truncate mr-2">
              <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Signed in as</p>
              <p className="text-xs font-bold text-white truncate">{user?.email || 'admin'}</p>
            </div>
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" title="Connected" />
          </div>

          <div className="flex gap-2">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 text-xs font-semibold transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Site</span>
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center p-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500/20 text-xs font-semibold transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Backdrop for mobile menu */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        <div className="p-6 md:p-10 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
