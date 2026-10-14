import React, { useEffect, useState } from 'react';
import { 
  fetchAdminExperience, 
  createExperience, 
  updateExperience, 
  deleteExperience 
} from '../../services/adminData';
import { Briefcase, Plus, Trash2, Edit, X, AlertCircle } from 'lucide-react';

export default function ExperienceManager() {
  const [experienceList, setExperienceList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    role: '',
    organization: '',
    location: 'Remote',
    start_date: '',
    end_date: 'Present',
    description: '',
    display_order: 1
  });

  useEffect(() => {
    loadExperience();
  }, []);

  const loadExperience = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await fetchAdminExperience();
      setExperienceList(data || []);
    } catch (err) {
      setError(err.message || 'Failed to load experience');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormData({
      role: '',
      organization: '',
      location: 'Remote',
      start_date: '',
      end_date: 'Present',
      description: '',
      display_order: experienceList.length + 1
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      role: item.role || '',
      organization: item.organization || '',
      location: item.location || '',
      start_date: item.start_date || '',
      end_date: item.end_date || '',
      description: item.description || '',
      display_order: item.display_order || 0
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.role || !formData.organization) return;

    try {
      setSaving(true);
      const payload = {
        role: formData.role.trim(),
        organization: formData.organization.trim(),
        location: formData.location.trim(),
        start_date: formData.start_date.trim(),
        end_date: formData.end_date.trim(),
        description: formData.description.trim(),
        display_order: parseInt(formData.display_order, 10) || 0
      };

      if (editingItem) {
        await updateExperience(editingItem.id, payload);
      } else {
        await createExperience(payload);
      }

      setModalOpen(false);
      loadExperience();
    } catch (err) {
      alert(`Save error: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete experience record "${name}"?`)) return;
    try {
      await deleteExperience(id);
      loadExperience();
    } catch (err) {
      alert(`Delete error: ${err.message}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Experience & Freelance</h1>
          <p className="text-xs md:text-sm text-gray-400 mt-1">
            Manage freelance engagements, internships and software developer roles.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent text-white font-bold text-xs hover:bg-accent/90 transition-all shadow-blue-glow"
        >
          <Plus className="w-4 h-4" />
          <span>Add Experience</span>
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-amber-400" />
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div className="p-12 text-center text-xs text-gray-500">Loading experience records...</div>
      ) : experienceList.length === 0 ? (
        <div className="p-12 text-center text-xs text-gray-500">
          No experience records in database yet.
        </div>
      ) : (
        <div className="space-y-4">
          {experienceList.map((exp) => (
            <div key={exp.id} className="p-5 rounded-2xl glass-card border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-accentPurple/10 border border-accentPurple/20 flex items-center justify-center text-accentPurple flex-shrink-0 mt-0.5">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">{exp.role}</h3>
                  <p className="text-xs font-semibold text-accent mt-0.5">{exp.organization} • {exp.start_date} – {exp.end_date}</p>
                  {exp.description && <p className="text-xs text-gray-400 mt-1">{exp.description}</p>}
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  onClick={() => handleOpenEdit(exp)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(exp.id, exp.role)}
                  className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="max-w-md w-full bg-[#0d121f] border border-white/10 rounded-2xl shadow-2xl p-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-4">
              <h2 className="text-base font-bold text-white">
                {editingItem ? 'Edit Experience' : 'Add Experience'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-300 mb-1">Role / Job Title *</label>
                <input
                  type="text"
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="e.g. Freelance Full Stack Developer"
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-300 mb-1">Organization / Client *</label>
                <input
                  type="text"
                  required
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  placeholder="e.g. Independent Client / Trading Platform"
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-accent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-gray-300 mb-1">Start Date</label>
                  <input
                    type="text"
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                    placeholder="Jan 2025"
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-300 mb-1">End Date</label>
                  <input
                    type="text"
                    value={formData.end_date}
                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                    placeholder="March 2025 or Present"
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-300 mb-1">Description / Key Accomplishments</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Delivered full stack platform..."
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-accent"
                />
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
                  {saving ? 'Saving...' : editingItem ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
