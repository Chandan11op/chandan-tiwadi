import React, { useEffect, useState } from 'react';
import { 
  fetchAdminResumes, 
  createResume, 
  setActiveResume, 
  deleteResume,
  uploadFile 
} from '../../services/adminData';
import { 
  FileText, 
  Upload, 
  CheckCircle, 
  Trash2, 
  ExternalLink, 
  AlertCircle, 
  Download,
  Calendar,
  ShieldCheck
} from 'lucide-react';

export default function ResumeManager() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [version, setVersion] = useState('2.0');
  const [title, setTitle] = useState('Chandan Tiwadi - Full Stack Developer CV');

  useEffect(() => {
    loadResumes();
  }, []);

  const loadResumes = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await fetchAdminResumes();
      setResumes(data || []);
    } catch (err) {
      setError(err.message || 'Failed to load resumes');
    } finally {
      setLoading(false);
    }
  };

  const handleUploadResume = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('Only PDF documents are accepted for CV/Resume.');
      return;
    }

    try {
      setUploading(true);
      setError('');
      // Upload to portfolio-docs bucket
      const uploadRes = await uploadFile(file, 'portfolio-docs', 'resumes');
      
      // Save metadata to database and set as active if chosen
      await createResume({
        title: title.trim() || 'Chandan Tiwadi - Full Stack Developer CV',
        file_url: uploadRes.publicUrl,
        file_path: uploadRes.path,
        version: version.trim() || '2.0',
        is_active: true // Auto activate newly uploaded CV
      });

      loadResumes();
    } catch (err) {
      setError(err.message || 'Failed to upload resume');
    } finally {
      setUploading(false);
    }
  };

  const handleSetActive = async (id) => {
    try {
      await setActiveResume(id);
      loadResumes();
    } catch (err) {
      alert(`Activation error: ${err.message}`);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this CV record?')) return;
    try {
      await deleteResume(id);
      loadResumes();
    } catch (err) {
      alert(`Delete error: ${err.message}`);
    }
  };

  const activeResume = resumes.find(r => r.is_active);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-white/5">
        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">CV & Resume Manager</h1>
        <p className="text-xs md:text-sm text-gray-400 mt-1">
          Upload and manage your curriculum vitae. Only the intentionally published active version is accessible on your public portfolio.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-amber-400" />
          <span>{error}</span>
        </div>
      )}

      {/* Active CV Highlight Banner */}
      <div className="p-6 rounded-2xl glass-card border border-accent/20 bg-accent/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center text-accent">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-accent uppercase tracking-wider">Active Public Version</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                Live
              </span>
            </div>
            <h3 className="text-base font-bold text-white mt-1">
              {activeResume ? activeResume.title : 'Default Bundled CV (Chandan Tiwadi.pdf)'}
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Version: {activeResume ? activeResume.version : '1.0 Bundled'}
            </p>
          </div>
        </div>

        {activeResume && (
          <div className="flex items-center gap-3">
            <a
              href={activeResume.file_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-white text-xs font-bold hover:bg-accent/90 shadow-blue-glow transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Preview / Download</span>
            </a>
          </div>
        )}
      </div>

      {/* Upload New CV Box */}
      <div className="p-6 rounded-2xl glass-card border border-white/5 space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Upload className="w-4 h-4 text-accent" />
          <span>Upload New CV Version</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Display Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Chandan Tiwadi - Full Stack Developer CV"
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Version Identifier</label>
            <input
              type="text"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              placeholder="e.g. 2026.1"
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-accent"
            />
          </div>
        </div>

        <div className="border-2 border-dashed border-white/10 hover:border-accent/40 rounded-xl p-8 text-center transition-colors">
          <input
            type="file"
            id="cv-file-input"
            accept="application/pdf"
            onChange={handleUploadResume}
            disabled={uploading}
            className="hidden"
          />
          <label htmlFor="cv-file-input" className="cursor-pointer flex flex-col items-center">
            <Upload className="w-8 h-8 text-accent mb-2" />
            <span className="text-xs font-bold text-white">Click to select PDF document</span>
            <span className="text-[11px] text-gray-400 mt-1">Maximum size 10MB. Only valid PDF files.</span>
          </label>
          {uploading && <p className="text-xs text-accent mt-3 animate-pulse">Uploading and validating document...</p>}
        </div>
      </div>

      {/* CV Version History */}
      <div className="glass-card rounded-2xl border border-white/5 overflow-hidden">
        <div className="p-6 border-b border-white/5">
          <h2 className="font-bold text-sm text-white">CV Version History</h2>
        </div>

        {loading ? (
          <div className="p-10 text-center text-xs text-gray-500">Loading CV records...</div>
        ) : resumes.length === 0 ? (
          <div className="p-10 text-center text-xs text-gray-500">
            No uploaded CV versions in database yet. Public site will use the bundled PDF asset.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/5 text-[11px] font-bold uppercase tracking-wider text-gray-400 bg-white/[0.01]">
                  <th className="py-3 px-6">Title</th>
                  <th className="py-3 px-6">Version</th>
                  <th className="py-3 px-6">Upload Date</th>
                  <th className="py-3 px-6">Status</th>
                  <th className="py-3 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {resumes.map((r) => (
                  <tr key={r.id} className="hover:bg-white/[0.02]">
                    <td className="py-4 px-6 font-bold text-white flex items-center gap-2">
                      <FileText className="w-4 h-4 text-accent" />
                      <span>{r.title}</span>
                    </td>
                    <td className="py-4 px-6 text-gray-300 font-mono">{r.version}</td>
                    <td className="py-4 px-6 text-gray-400">
                      {new Date(r.upload_date || r.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6">
                      {r.is_active ? (
                        <span className="inline-flex items-center gap-1 text-emerald-400 font-bold text-[11px] bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                          <CheckCircle className="w-3 h-3" /> Active Public
                        </span>
                      ) : (
                        <span className="text-gray-500 text-[11px]">Archived</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {!r.is_active && (
                          <button
                            onClick={() => handleSetActive(r.id)}
                            className="px-2.5 py-1 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 font-semibold text-[11px]"
                          >
                            Set Active
                          </button>
                        )}
                        <a
                          href={r.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white"
                          title="Download"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => handleDelete(r.id)}
                          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
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
