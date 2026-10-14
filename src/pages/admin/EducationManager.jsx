import React, { useEffect, useState } from 'react';
import { 
  fetchAdminEducation, 
  createEducation, 
  updateEducation, 
  deleteEducation 
} from '../../services/adminData';
import { GraduationCap, Plus, Trash2, Edit, X, AlertCircle } from 'lucide-react';

export default function EducationManager() {
  const [educationList, setEducationList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    institution: '',
    degree: '',
    period: '',
    details: '',
    relevant_courses: '',
    display_order: 1
  });

  useEffect(() => {
    loadEducation();
  }, []);

  const loadEducation = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await fetchAdminEducation();
      setEducationList(data || []);
    } catch (err) {
      setError(err.message || 'Failed to load education');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormData({
      institution: '',
      degree: '',
      period: '',
      details: '',
      relevant_courses: '',
      display_order: educationList.length + 1
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      institution: item.institution || '',
      degree: item.degree || '',
      period: item.period || '',
      details: item.details || '',
      relevant_courses: Array.isArray(item.relevant_courses) ? item.relevant_courses.join(', ') : '',
      display_order: item.display_order || 0
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.institution || !formData.degree) return;

    try {
      setSaving(true);
      const coursesArray = formData.relevant_courses
        .split(',')
        .map(c => c.trim())
        .filter(Boolean);

      const payload = {
        institution: formData.institution.trim(),
        degree: formData.degree.trim(),
        period: formData.period.trim(),
        details: formData.details.trim(),
        relevant_courses: coursesArray,
        display_order: parseInt(formData.display_order, 10) || 0
      };

      if (editingItem) {
        await updateEducation(editingItem.id, payload);
      } else {
        await createEducation(payload);
      }

      setModalOpen(false);
      loadEducation();
    } catch (err) {
      alert(`Save error: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete education record "${name}"?`)) return;
    try {
      await deleteEducation(id);
      loadEducation();
    } catch (err) {
      alert(`Delete error: ${err.message}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Education Manager</h1>
          <p className="text-xs md:text-sm text-gray-400 mt-1">
            Maintain your college, junior college and secondary schooling credentials.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent text-white font-bold text-xs hover:bg-accent/90 transition-all shadow-blue-glow"
        >
          <Plus className="w-4 h-4" />
          <span>Add Education</span>
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-amber-400" />
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div className="p-12 text-center text-xs text-gray-500">Loading education records...</div>
      ) : (
        <div className="space-y-4">
          {educationList.map((edu) => (
            <div key={edu.id} className="p-5 rounded-2xl glass-card border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent flex-shrink-0 mt-0.5">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">{edu.institution}</h3>
                  <p className="text-xs font-semibold text-accent mt-0.5">{edu.degree} • {edu.period}</p>
                  {edu.details && <p className="text-xs text-gray-400 mt-1">{edu.details}</p>}
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  onClick={() => handleOpenEdit(edu)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(edu.id, edu.institution)}
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
                {editingItem ? 'Edit Education' : 'Add Education'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-300 mb-1">Institution *</label>
                <input
                  type="text"
                  required
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  placeholder="K.P.B. Hinduja College of Commerce, Mumbai"
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-300 mb-1">Degree / Qualification *</label>
                <input
                  type="text"
                  required
                  value={formData.degree}
                  onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                  placeholder="B.Sc. Information Technology"
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-300 mb-1">Period</label>
                <input
                  type="text"
                  value={formData.period}
                  onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                  placeholder="2024 – Present | Third Year"
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-300 mb-1">Details / Grades</label>
                <input
                  type="text"
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  placeholder="SGPA: S1: 8.36 | S2: 8.68..."
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-300 mb-1">Relevant Courses (comma separated)</label>
                <input
                  type="text"
                  value={formData.relevant_courses}
                  onChange={(e) => setFormData({ ...formData, relevant_courses: e.target.value })}
                  placeholder="Web Development, DBMS, Data Structures"
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
