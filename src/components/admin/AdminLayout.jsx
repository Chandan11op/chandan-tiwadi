import React, { useState, useEffect, useCallback, useRef } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
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
  PanelLeftClose,
  PanelLeftOpen,
  ChevronLeft
} from 'lucide-react';

const DEFAULT_SIDEBAR_WIDTH = 260;
const MIN_SIDEBAR_WIDTH = 200;
const MAX_SIDEBAR_WIDTH = 420;

export default function AdminLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Width & Collapse States (Persisted in localStorage)
  const [sidebarWidth, setSidebarWidth] = useState(() => {
    try {
      const saved = localStorage.getItem('admin_sidebar_width');
      const num = parseInt(saved, 10);
      return !isNaN(num) && num >= MIN_SIDEBAR_WIDTH && num <= MAX_SIDEBAR_WIDTH 
        ? num 
        : DEFAULT_SIDEBAR_WIDTH;
    } catch {
      return DEFAULT_SIDEBAR_WIDTH;
    }
  });

  const [isCollapsed, setIsCollapsed] = useState(() => {
    try {
      return localStorage.getItem('admin_sidebar_collapsed') === 'true';
    } catch {
      return false;
    }
  });

  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);

  const toggleCollapse = useCallback(() => {
    setIsCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('admin_sidebar_collapsed', String(next));
      } catch (e) {
        console.warn('Failed to save sidebar collapsed state:', e);
      }
      return next;
    });
  }, []);

  const resetWidth = useCallback(() => {
    setSidebarWidth(DEFAULT_SIDEBAR_WIDTH);
    try {
      localStorage.setItem('admin_sidebar_width', String(DEFAULT_SIDEBAR_WIDTH));
    } catch (e) {
      console.warn('Failed to save sidebar width:', e);
    }
  }, []);

  // Keyboard shortcut: Ctrl+B or Cmd+B to toggle sidebar
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        toggleCollapse();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleCollapse]);

  // Drag-to-resize handlers
  const startResizing = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
    isDraggingRef.current = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';

    const onMouseMove = (moveEvent) => {
      if (!isDraggingRef.current) return;
      const newWidth = moveEvent.clientX;
      if (newWidth >= MIN_SIDEBAR_WIDTH && newWidth <= MAX_SIDEBAR_WIDTH) {
        setSidebarWidth(newWidth);
      }
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
      setIsDragging(false);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      setSidebarWidth((latest) => {
        try {
          localStorage.setItem('admin_sidebar_width', String(latest));
        } catch (err) {
          console.warn('Failed to save width:', err);
        }
        return latest;
      });
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }, []);

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

  const currentNav = navItems.find((item) => 
    item.path === location.pathname || 
    (item.path !== '/admin-portal/dashboard' && location.pathname.startsWith(item.path))
  );
  const currentSectionName = currentNav?.name || 'Dashboard';

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
      <aside
        style={{
          width: isCollapsed ? 0 : `${sidebarWidth}px`,
        }}
        className={`
          fixed inset-y-0 left-0 z-50 bg-[#070b14] border-r border-white/5 flex flex-col justify-between
          ${isDragging ? 'transition-none select-none' : 'transition-[width,transform] duration-200 ease-out'}
          ${isCollapsed ? 'md:border-r-0 md:overflow-hidden md:opacity-0 md:pointer-events-none' : 'md:opacity-100'}
          md:static md:translate-x-0
          ${mobileMenuOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0'}
          relative group
        `}
      >
        <div className="min-w-[200px] w-full">
          {/* Brand header with collapse button */}
          <div className="p-5 border-b border-white/5 flex items-center justify-between gap-2">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-accent to-accentPurple flex items-center justify-center text-white font-extrabold text-sm shadow-blue-glow shrink-0">
                CT
              </div>
              <div className="min-w-0 truncate">
                <h2 className="font-extrabold text-sm text-white tracking-tight leading-none truncate">Chandan Tiwadi</h2>
                <span className="text-[10px] text-accent font-semibold tracking-wider uppercase mt-1 inline-flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> CMS Admin
                </span>
              </div>
            </div>

            {/* Collapse button on sidebar header */}
            <button
              onClick={toggleCollapse}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors hidden md:flex items-center justify-center shrink-0 cursor-pointer"
              title="Hide Sidebar (Ctrl+B)"
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-230px)]">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/admin-portal/dashboard'}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200
                    ${isActive 
                      ? 'bg-accent/15 text-accent border border-accent/25 shadow-[0_0_15px_rgba(59,130,246,0.15)] font-bold' 
                      : 'text-gray-400 hover:text-gray-200 hover:bg-white/[0.03] border border-transparent'}
                  `}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* User Info & Actions */}
        <div className="p-4 border-t border-white/5 bg-white/[0.01] min-w-[200px] w-full">
          <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 mb-3 flex items-center justify-between">
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

        {/* Desktop Draggable Resize Handle */}
        {!isCollapsed && (
          <div
            onMouseDown={startResizing}
            onDoubleClick={resetWidth}
            title="Drag to resize sidebar • Double-click to reset (260px)"
            className={`
              hidden md:block absolute top-0 -right-1 w-2 h-full cursor-col-resize z-30 transition-colors
              ${isDragging ? 'bg-accent shadow-[0_0_10px_#3B82F6]' : 'hover:bg-accent/50'}
            `}
          >
            {/* Quick-collapse chevron button on divider edge */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleCollapse();
              }}
              title="Hide Sidebar"
              className="absolute top-20 -right-2.5 w-5 h-6 rounded-r-md bg-[#070b14] border border-l-0 border-white/10 hover:border-accent text-gray-400 hover:text-white flex items-center justify-center shadow-lg transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-3 h-3" />
            </button>
          </div>
        )}
      </aside>

      {/* Backdrop for mobile menu */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 flex flex-col overflow-y-auto">
        {/* Sticky Desktop Top Control Bar */}
        <header className="sticky top-0 z-30 bg-[#070b14]/80 backdrop-blur-md border-b border-white/5 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={toggleCollapse}
              className={`
                inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border cursor-pointer
                ${isCollapsed 
                  ? 'bg-accent/15 text-accent border-accent/30 shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:bg-accent/25' 
                  : 'bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border-white/10'}
              `}
              title={isCollapsed ? 'Show Sidebar (Ctrl+B)' : 'Hide Sidebar (Ctrl+B)'}
            >
              {isCollapsed ? (
                <>
                  <PanelLeftOpen className="w-4 h-4 text-accent" />
                  <span>Show Sidebar</span>
                  <span className="text-[10px] text-gray-400 font-mono hidden lg:inline ml-1">Ctrl+B</span>
                </>
              ) : (
                <>
                  <PanelLeftClose className="w-4 h-4 text-gray-400" />
                  <span className="hidden sm:inline text-gray-300">Hide Sidebar</span>
                  <span className="text-[10px] text-gray-500 font-mono hidden lg:inline ml-1">Ctrl+B</span>
                </>
              )}
            </button>

            <div className="h-4 w-px bg-white/10 hidden sm:block" />

            <div className="hidden sm:flex items-center gap-2 text-xs">
              <span className="text-gray-500 font-mono">CMS</span>
              <span className="text-gray-600">/</span>
              <span className="font-bold text-white tracking-wide">{currentSectionName}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-medium border border-white/10 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-accent" />
              <span className="hidden sm:inline">View Live Site</span>
            </a>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
