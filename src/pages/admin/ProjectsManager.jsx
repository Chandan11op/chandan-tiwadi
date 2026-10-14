import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  fetchAdminProjects, 
  createProject, 
  updateProject, 
  deleteProject,
  uploadFile 
} from '../../services/adminData';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  Upload, 
  ExternalLink, 
  Check, 
  X, 
  Copy,
  AlertCircle
} from 'lucide-react';

export default function ProjectsManager() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('ALL');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    project_type: 'Personal Project',
    badge: '🌐 Personal Project',
    period: '2025',
    category: 'Full Stack',
    short_description: '',
    full_description: '',
    technologies: '',
    live_url: '',
    github_url: '',
    show_github_link: false,
    is_featured: false,
    is_published: true,
    highlight_color: 'default',
    display_order: 0,
    thumbnail_url: ''
  });

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    const editId = searchParams.get('edit');
    const isNew = searchParams.get('action') === 'new';

    if (isNew) {
      handleOpenCreate();
      setSearchParams({});
    } else if (editId && projects.length > 0) {
      const target = projects.find(p => p.id === editId);
      if (target) {
        handleOpenEdit(target);
        setSearchParams({});
      }
    }
  }, [searchParams, projects]);

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await fetchAdminProjects();
      setProjects(data || []);
    } catch (err) {
      setError(err.message || 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      slug: '',
      project_type: 'Current Working Project',
      badge: '⚡ In Progress / Current Project',
      period: '2025 - Present',
      category: 'Full Stack',
      short_description: '',
      full_description: '',
      technologies: 'React.js, Tailwind CSS',
      live_url: '',
      github_url: '',
      show_github_link: true,
      is_featured: true,
      is_published: true,
      highlight_color: 'electric-blue',
      display_order: projects.length + 1,
      thumbnail_url: ''
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title || '',
      slug: project.slug || '',
      project_type: project.project_type || 'Personal Project',
      badge: project.badge || '',
      period: project.period || '',
      category: project.category || 'Full Stack',
      short_description: project.short_description || '',
      full_description: project.full_description || '',
      technologies: Array.isArray(project.technologies) ? project.technologies.join(', ') : '',
      live_url: project.live_url || '',
      github_url: project.github_url || '',
      show_github_link: Boolean(project.show_github_link),
      is_featured: Boolean(project.is_featured),
      is_published: Boolean(project.is_published),
      highlight_color: project.highlight_color || 'default',
      display_order: project.display_order || 0,
      thumbnail_url: project.thumbnail_url || ''
    });
    setModalOpen(true);
  };

  const handleDuplicate = (project) => {
    setEditingProject(null);
    setFormData({
      title: `${project.title} (Copy)`,
      slug: `${project.slug}-copy-${Date.now().toString().slice(-4)}`,
      project_type: project.project_type || 'Personal Project',
      badge: project.badge || '',
      period: project.period || '',
      category: project.category || 'Full Stack',
      short_description: project.short_description || '',
      full_description: project.full_description || '',
      technologies: Array.isArray(project.technologies) ? project.technologies.join(', ') : '',
      live_url: project.live_url || '',
      github_url: project.github_url || '',
      show_github_link: false, // Default false for safety
      is_featured: false,
      is_published: false, // Default to draft for duplicated
      highlight_color: project.highlight_color || 'default',
      display_order: projects.length + 1,
      thumbnail_url: project.thumbnail_url || ''
    });
    setModalOpen(true);
  };

  const handleThumbnailUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const res = await uploadFile(file, 'portfolio-media', 'projects');
      setFormData(prev => ({ ...prev, thumbnail_url: res.publicUrl }));
    } catch (err) {
      alert(`Upload failed: ${err.message}`);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.full_description) {
      alert('Please fill in title and description.');
      return;
    }

    setSaving(true);
    try {
      const techArray = formData.technologies
        .split(',')
        .map(t => t.trim())
        .filter(Boolean);

      const generatedSlug = formData.slug.trim() || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

      // Strict client project safeguard:
      const showGithub = formData.project_type === 'Client Project' ? false : formData.show_github_link;

      const payload = {
        title: formData.title.trim(),
        slug: generatedSlug,
        project_type: formData.project_type,
        badge: formData.badge.trim(),
        period: formData.period.trim(),
        category: formData.category.trim(),
        short_description: formData.short_description.trim(),
        full_description: formData.full_description.trim(),
        technologies: techArray,
        live_url: formData.live_url.trim() || null,
        github_url: formData.github_url.trim() || null,
        show_github_link: showGithub,
        is_featured: formData.is_featured,
        is_published: formData.is_published,
        highlight_color: formData.highlight_color,
        display_order: parseInt(formData.display_order, 10) || 0,
        thumbnail_url: formData.thumbnail_url || null
      };

      if (editingProject) {
        await updateProject(editingProject.id, payload);
      } else {
        await createProject(payload);
      }

      setModalOpen(false);
      loadProjects();
    } catch (err) {
      alert(`Save error: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      return;
    }

    try {
      await deleteProject(id);
      loadProjects();
    } catch (err) {
      alert(`Delete error: ${err.message}`);
    }
  };

  const handleTogglePublish = async (project) => {
    try {
      await updateProject(project.id, { is_published: !project.is_published });
      setProjects(prev => prev.map(p => p.id === project.id ? { ...p, is_published: !p.is_published } : p));
    } catch (err) {
      alert(`Update error: ${err.message}`);
    }
  };

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.technologies && p.technologies.some(t => t.toLowerCase().includes(searchTerm.toLowerCase())));
    const matchesType = filterType === 'ALL' || p.project_type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Projects Manager</h1>
          <p className="text-xs md:text-sm text-gray-400 mt-1">
            Create, edit, reorder and control the visibility of client and personal portfolio projects.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent text-white font-bold text-xs hover:bg-accent/90 transition-all shadow-blue-glow"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-amber-400" />
          <span>{error}</span>
        </div>
      )}

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search projects or tech..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-accent"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {['ALL', 'Current Working Project', 'Personal Project', 'Client Project', 'Learning / Experiment'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                filterType === type 
                  ? 'bg-accent text-white' 
                  : 'bg-white/5 text-gray-400 hover:text-white border border-white/5'
              }`}
            >
              {type === 'ALL' ? 'All Types' : type === 'Current Working Project' ? '⚡ Currently Working On' : type}
            </button>
          ))}
        </div>
      </div>

      {/* Projects List */}
      <div className="glass-card rounded-2xl border border-white/5 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-gray-500">Loading projects...</div>
        ) : filteredProjects.length === 0 ? (
          <div className="p-12 text-center text-xs text-gray-500">
            No projects match the selected criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-[11px] font-bold uppercase tracking-wider text-gray-400 bg-white/[0.01]">
                  <th className="py-3.5 px-6">Order</th>
                  <th className="py-3.5 px-6">Title & Badge</th>
                  <th className="py-3.5 px-6">Type</th>
                  <th className="py-3.5 px-6">Live Demo</th>
                  <th className="py-3.5 px-6">GitHub</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs">
                {filteredProjects.map((p) => (
                  <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-6 font-mono text-gray-500 text-xs">#{p.display_order}</td>
                    <td className="py-4 px-6">
                      <div className="font-bold text-white text-sm">{p.title}</div>
                      <div className="text-[11px] text-gray-400 mt-0.5">{p.badge}</div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 rounded-md bg-white/5 text-[11px] text-gray-300 font-medium">
                        {p.project_type}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      {p.live_url ? (
                        <a
                          href={p.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent hover:underline flex items-center gap-1 font-semibold"
                        >
                          <span>Live</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="text-gray-600">—</span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      {p.project_type === 'Client Project' ? (
                        <span className="text-[11px] text-gray-500">Private (Protected)</span>
                      ) : p.show_github_link && p.github_url ? (
                        <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                          <Check className="w-3 h-3" /> Public
                        </span>
                      ) : (
                        <span className="text-[11px] text-gray-500">Hidden</span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => handleTogglePublish(p)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold cursor-pointer transition-colors ${
                          p.is_published 
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/25' 
                            : 'bg-amber-500/15 text-amber-400 border border-amber-500/20 hover:bg-amber-500/25'
                        }`}
                        title="Click to toggle publish status"
                      >
                        {p.is_published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        <span>{p.is_published ? 'Published' : 'Draft'}</span>
                      </button>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleDuplicate(p)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white"
                          title="Duplicate Project"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="p-1.5 rounded-lg bg-accent/10 hover:bg-accent/20 text-accent"
                          title="Edit Project"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id, p.title)}
                          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                          title="Delete Project"
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

      {/* Add / Edit Project Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
          <div className="max-w-2xl w-full bg-[#0d121f] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-8">
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
              <h2 className="text-lg font-bold text-white">
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-gray-300 mb-1">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Smart SIP"
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-300 mb-1">Slug (URL friendly)</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="e.g. smart-sip"
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-gray-300 mb-1">Project Type *</label>
                  <select
                    value={formData.project_type}
                    onChange={(e) => {
                      const newType = e.target.value;
                      let newBadge = formData.badge;
                      if (!formData.badge || formData.badge === '🌐 Personal Project' || formData.badge === '⚡ In Progress / Current Project' || formData.badge === '💼 Paid Client Project') {
                        if (newType === 'Current Working Project') newBadge = '⚡ In Progress / Current Project';
                        else if (newType === 'Client Project') newBadge = '💼 Paid Client Project';
                        else if (newType === 'Personal Project') newBadge = '🌐 Personal Project';
                        else newBadge = '🧪 Experiment';
                      }
                      setFormData({ ...formData, project_type: newType, badge: newBadge });
                    }}
                    className="w-full px-3 py-2 bg-[#090d16] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-accent"
                  >
                    <option value="Current Working Project">⚡ Current Working Project</option>
                    <option value="Personal Project">Personal Project</option>
                    <option value="Client Project">Client Project</option>
                    <option value="Learning / Experiment">Learning / Experiment</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-gray-300 mb-1">Badge Text</label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="e.g. 💼 Paid Client Project"
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-300 mb-1">Period / Date</label>
                  <input
                    type="text"
                    value={formData.period}
                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                    placeholder="e.g. Jan 2025 – March 2025"
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-300 mb-1">Technologies (comma separated) *</label>
                <input
                  type="text"
                  required
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  placeholder="React.js, Node.js, Express, MongoDB"
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-300 mb-1">Full Description *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.full_description}
                  onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
                  placeholder="Describe key responsibilities, technical architecture, client impact or features..."
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-accent"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-gray-300 mb-1">Live Demo URL</label>
                  <input
                    type="url"
                    value={formData.live_url}
                    onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
                    placeholder="https://example.com"
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-300 mb-1">GitHub Repository URL (Optional)</label>
                  <input
                    type="url"
                    value={formData.github_url}
                    onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              {/* Strict rules checklist */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="show_github_link"
                    checked={formData.show_github_link}
                    disabled={formData.project_type === 'Client Project'}
                    onChange={(e) => setFormData({ ...formData, show_github_link: e.target.checked })}
                    className="w-4 h-4 rounded border-gray-700 text-accent focus:ring-accent"
                  />
                  <label htmlFor="show_github_link" className="text-gray-300 font-semibold cursor-pointer">
                    Show GitHub Repository link on public site
                    {formData.project_type === 'Client Project' && (
                      <span className="block text-[11px] text-amber-400 font-normal">
                        (Disabled for client projects to guarantee confidential source protection)
                      </span>
                    )}
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="is_featured"
                    checked={formData.is_featured}
                    onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                    className="w-4 h-4 rounded border-gray-700 text-accent focus:ring-accent"
                  />
                  <label htmlFor="is_featured" className="text-gray-300 font-semibold cursor-pointer">
                    Mark as Featured project
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="is_published"
                    checked={formData.is_published}
                    onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                    className="w-4 h-4 rounded border-gray-700 text-accent focus:ring-accent"
                  />
                  <label htmlFor="is_published" className="text-gray-300 font-semibold cursor-pointer">
                    Publish immediately (leave unchecked to save as Draft)
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-gray-300 mb-1">Card Highlight Style</label>
                  <select
                    value={formData.highlight_color}
                    onChange={(e) => setFormData({ ...formData, highlight_color: e.target.value })}
                    className="w-full px-3 py-2 bg-[#090d16] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-accent"
                  >
                    <option value="default">Default Neutral</option>
                    <option value="gold">Gold / Amber Accent</option>
                    <option value="blue">Blue Accent</option>
                    <option value="electric-blue">Electric Blue Glow</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-gray-300 mb-1">Display Order</label>
                  <input
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: e.target.value })}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              {/* Thumbnail image upload */}
              <div>
                <label className="block font-semibold text-gray-300 mb-1">Project Thumbnail</label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailUpload}
                    disabled={uploadingImage}
                    className="text-xs text-gray-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20"
                  />
                  {uploadingImage && <span className="text-accent text-[11px] animate-pulse">Uploading...</span>}
                </div>
                {formData.thumbnail_url && (
                  <p className="text-[11px] text-emerald-400 mt-1 truncate">Image attached: {formData.thumbnail_url}</p>
                )}
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-accent hover:bg-accent/90 text-white font-bold text-xs shadow-blue-glow disabled:opacity-50"
                >
                  {saving ? 'Saving...' : editingProject ? 'Update Project' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
