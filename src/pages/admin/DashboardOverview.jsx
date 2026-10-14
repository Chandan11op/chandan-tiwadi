import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  fetchAdminProjects, 
  fetchAdminCertificates, 
  fetchAdminResumes, 
  fetchAdminProfile 
} from '../../services/adminData';
import { 
  FolderGit2, 
  Award, 
  FileText, 
  Plus, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

export default function DashboardOverview() {
  const [stats, setStats] = useState({
    totalProjects: 0,
    publishedProjects: 0,
    draftProjects: 0,
    certificates: 0,
    activeResumeVersion: 'None',
  });
  const [recentProjects, setRecentProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError('');
      const [projects, certs, resumes] = await Promise.all([
        fetchAdminProjects().catch(() => []),
        fetchAdminCertificates().catch(() => []),
        fetchAdminResumes().catch(() => []),
      ]);

      const published = projects.filter(p => p.is_published).length;
      const drafts = projects.length - published;
      const activeRes = resumes.find(r => r.is_active);

      setStats({
        totalProjects: projects.length,
        publishedProjects: published,
        draftProjects: drafts,
        certificates: certs.length,
        activeResumeVersion: activeRes ? activeRes.version : (resumes[0]?.version || 'Bundled fallback'),
      });

      setRecentProjects(projects.slice(0, 5));
    } catch (err) {
      setError(err.message || 'Error loading dashboard data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs md:text-sm text-gray-400 mt-1">
            Manage public portfolio content, project visibility, CV documents and certifications.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin-portal/projects?action=new"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent text-white font-bold text-xs hover:bg-accent/90 transition-all shadow-blue-glow"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Project</span>
          </Link>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white text-xs font-semibold transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View Public Site</span>
          </a>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 flex-shrink-0 text-amber-400" />
          <span>Note: {error} (Ensure Supabase tables are seeded or check database policies)</span>
        </div>
      )}

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl glass-card border border-white/5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
            <FolderGit2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Projects</p>
            <h3 className="text-2xl font-black text-white mt-0.5">{stats.totalProjects}</h3>
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-white/5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Published Live</p>
            <h3 className="text-2xl font-black text-emerald-400 mt-0.5">{stats.publishedProjects}</h3>
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-white/5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Drafts (Hidden)</p>
            <h3 className="text-2xl font-black text-amber-400 mt-0.5">{stats.draftProjects}</h3>
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-white/5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-accentPurple/10 border border-accentPurple/20 flex items-center justify-center text-accentPurple">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Active CV Version</p>
            <h3 className="text-lg font-black text-accentPurple mt-0.5 truncate max-w-[140px]">{stats.activeResumeVersion}</h3>
          </div>
        </div>
      </div>

      {/* Recent Projects Table */}
      <div className="glass-card rounded-2xl border border-white/5 overflow-hidden">
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <h2 className="font-extrabold text-base text-white">Recent Projects</h2>
          <Link
            to="/admin-portal/projects"
            className="flex items-center gap-1.5 text-xs text-accent hover:underline font-semibold"
          >
            <span>Manage All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="p-10 text-center text-xs text-gray-500">Loading recent projects...</div>
        ) : recentProjects.length === 0 ? (
          <div className="p-10 text-center text-xs text-gray-500">
            No projects found in database. You can add one or seed your database using the provided seed script.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-[11px] font-bold uppercase tracking-wider text-gray-400 bg-white/[0.01]">
                  <th className="py-3.5 px-6">Title</th>
                  <th className="py-3.5 px-6">Type</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6">GitHub Link</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs">
                {recentProjects.map((p) => (
                  <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-6 font-bold text-white">{p.title}</td>
                    <td className="py-4 px-6 text-gray-300">
                      <span className="px-2.5 py-1 rounded-md bg-white/5 text-[11px]">
                        {p.project_type}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        p.is_published 
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20' 
                          : 'bg-amber-500/15 text-amber-400 border border-amber-500/20'
                      }`}>
                        {p.is_published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      {p.show_github_link && p.github_url ? (
                        <span className="text-emerald-400 text-[11px] font-semibold">Enabled</span>
                      ) : (
                        <span className="text-gray-500 text-[11px]">Hidden</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Link
                        to={`/admin-portal/projects?edit=${p.id}`}
                        className="text-accent hover:underline font-bold text-xs"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
