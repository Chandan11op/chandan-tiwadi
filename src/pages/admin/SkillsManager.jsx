import React, { useEffect, useState } from 'react';
import { 
  fetchAdminSkills, 
  createSkill, 
  updateSkill, 
  deleteSkill,
  deleteCategory
} from '../../services/adminData';
import { Sparkles, Plus, Trash2, Edit, X, AlertCircle } from 'lucide-react';

export default function SkillsManager() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    category: 'Frontend',
    display_order: 1
  });

  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [customCategoryInput, setCustomCategoryInput] = useState('');
  const [removedCategories, setRemovedCategories] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('removed_skill_categories') || '[]');
    } catch {
      return [];
    }
  });

  const defaultCategories = [
    'Frontend',
    'Backend',
    'Databases',
    'Tools & Platforms',
    'AI Dev Tools',
    'Core Concepts'
  ];

  // Dynamically aggregate all categories from existing skills + defaults, minus any removed categories
  const categories = Array.from(
    new Set([
      ...defaultCategories,
      ...skills.map(s => s.category).filter(Boolean)
    ])
  ).filter(cat => !removedCategories.includes(cat));

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await fetchAdminSkills();
      setSkills(data || []);
    } catch (err) {
      setError(err.message || 'Failed to load skills');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingSkill(null);
    setIsCustomCategory(false);
    setCustomCategoryInput('');
    setFormData({
      name: '',
      category: 'Frontend',
      display_order: skills.length + 1
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (skill) => {
    setEditingSkill(skill);
    setIsCustomCategory(false);
    setCustomCategoryInput('');
    setFormData({
      name: skill.name,
      category: skill.category,
      display_order: skill.display_order || 0
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const finalCategory = isCustomCategory 
      ? customCategoryInput.trim() 
      : formData.category.trim();

    if (!finalCategory) {
      alert('Please select or specify a category.');
      return;
    }

    try {
      setSaving(true);
      const payload = {
        name: formData.name.trim(),
        category: finalCategory,
        display_order: parseInt(formData.display_order, 10) || 0
      };

      if (editingSkill) {
        await updateSkill(editingSkill.id, payload);
      } else {
        await createSkill(payload);
      }

      setModalOpen(false);
      loadSkills();
    } catch (err) {
      alert(`Save error: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete skill "${name}"?`)) return;
    try {
      await deleteSkill(id);
      loadSkills();
    } catch (err) {
      alert(`Delete error: ${err.message}`);
    }
  };

  const handleDeleteCategory = async (catName, skillCount) => {
    const confirmMsg = skillCount > 0 
      ? `Are you sure you want to remove the category "${catName}" and all ${skillCount} skills under it?`
      : `Remove category "${catName}"?`;

    if (!window.confirm(confirmMsg)) return;

    try {
      if (skillCount > 0) {
        await deleteCategory(catName);
      }
      const updatedRemoved = [...removedCategories, catName];
      setRemovedCategories(updatedRemoved);
      localStorage.setItem('removed_skill_categories', JSON.stringify(updatedRemoved));
      loadSkills();
    } catch (err) {
      alert(`Error removing category: ${err.message}`);
    }
  };

  // Group by category
  const groupedSkills = categories.reduce((acc, cat) => {
    acc[cat] = skills.filter(s => s.category === cat);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Skills Manager</h1>
          <p className="text-xs md:text-sm text-gray-400 mt-1">
            Organize frontend, backend, database and AI developer competencies.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent text-white font-bold text-xs hover:bg-accent/90 transition-all shadow-blue-glow"
        >
          <Plus className="w-4 h-4" />
          <span>Add Skill</span>
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-amber-400" />
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div className="p-12 text-center text-xs text-gray-500">Loading skills...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const list = groupedSkills[cat] || [];
            return (
              <div key={cat} className="p-5 rounded-2xl glass-card border border-white/5">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/5">
                  <h3 className="font-bold text-xs text-accent uppercase tracking-wider">{cat}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-gray-500">{list.length} skills</span>
                    <button
                      type="button"
                      onClick={() => handleDeleteCategory(cat, list.length)}
                      className="p-1 rounded-md text-gray-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                      title={`Remove Category "${cat}"`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {list.length === 0 ? (
                  <p className="text-[11px] text-gray-600 italic">No skills in this category</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {list.map((skill) => (
                      <span
                        key={skill.id}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-200 group"
                      >
                        <span>{skill.name}</span>
                        <button
                          onClick={() => handleOpenEdit(skill)}
                          className="text-gray-500 hover:text-accent ml-1"
                          title="Edit"
                        >
                          <Edit className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleDelete(skill.id, skill.name)}
                          className="text-gray-500 hover:text-rose-400"
                          title="Delete"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="max-w-md w-full bg-[#0d121f] border border-white/10 rounded-2xl shadow-2xl p-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-4">
              <h2 className="text-base font-bold text-white">
                {editingSkill ? 'Edit Skill' : 'Add Skill'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-300 mb-1">Skill Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Next.js"
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-semibold text-gray-300">Category *</label>
                  <button
                    type="button"
                    onClick={() => setIsCustomCategory(!isCustomCategory)}
                    className="text-[11px] text-accent hover:underline font-semibold"
                  >
                    {isCustomCategory ? "← Choose Existing" : "+ Add New Category"}
                  </button>
                </div>

                {isCustomCategory ? (
                  <input
                    type="text"
                    required
                    value={customCategoryInput}
                    onChange={(e) => setCustomCategoryInput(e.target.value)}
                    placeholder="Enter new category name (e.g. Cloud & DevOps)"
                    className="w-full px-3 py-2 bg-white/5 border border-accent/40 rounded-xl text-white text-xs focus:outline-none focus:border-accent"
                  />
                ) : (
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-[#090d16] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-accent"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                )}
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
                  {saving ? 'Saving...' : editingSkill ? 'Update' : 'Add Skill'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
