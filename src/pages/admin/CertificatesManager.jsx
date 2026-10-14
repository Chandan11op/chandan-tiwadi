import React, { useEffect, useState } from 'react';
import { 
  fetchAdminCertificates, 
  createCertificate, 
  updateCertificate, 
  deleteCertificate,
  uploadFile 
} from '../../services/adminData';
import { 
  Award, 
  Plus, 
  Trash2, 
  Edit, 
  Eye, 
  EyeOff, 
  ExternalLink, 
  Upload, 
  X,
  AlertCircle
} from 'lucide-react';

export default function CertificatesManager() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    year: '2025',
    credential_id: '',
    verification_url: '',
    file_url: '',
    badge_icon: 'award',
    is_published: true,
    display_order: 1
  });

  useEffect(() => {
    loadCertificates();
  }, []);

  const loadCertificates = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await fetchAdminCertificates();
      setCertificates(data || []);
    } catch (err) {
      setError(err.message || 'Failed to load certificates');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingCert(null);
    setFormData({
      title: '',
      issuer: '',
      year: new Date().getFullYear().toString(),
      credential_id: '',
      verification_url: '',
      file_url: '',
      badge_icon: 'award',
      is_published: true,
      display_order: certificates.length + 1
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (cert) => {
    setEditingCert(cert);
    setFormData({
      title: cert.title || '',
      issuer: cert.issuer || '',
      year: cert.year || '',
      credential_id: cert.credential_id || '',
      verification_url: cert.verification_url || '',
      file_url: cert.file_url || '',
      badge_icon: cert.badge_icon || 'award',
      is_published: Boolean(cert.is_published),
      display_order: cert.display_order || 0
    });
    setModalOpen(true);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const res = await uploadFile(file, 'portfolio-media', 'certificates');
      setFormData(prev => ({ ...prev, file_url: res.publicUrl }));
    } catch (err) {
      alert(`Upload error: ${err.message}`);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.issuer) {
      alert('Please fill in title and issuer.');
      return;
    }

    try {
      setSaving(true);
      const payload = {
        title: formData.title.trim(),
        issuer: formData.issuer.trim(),
        year: formData.year.trim(),
        credential_id: formData.credential_id.trim() || null,
        verification_url: formData.verification_url.trim() || null,
        file_url: formData.file_url.trim() || null,
        badge_icon: formData.badge_icon,
        is_published: formData.is_published,
        display_order: parseInt(formData.display_order, 10) || 0
      };

      if (editingCert) {
        await updateCertificate(editingCert.id, payload);
      } else {
        await createCertificate(payload);
      }

      setModalOpen(false);
      loadCertificates();
    } catch (err) {
      alert(`Save error: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete certificate "${title}"?`)) return;
    try {
      await deleteCertificate(id);
      loadCertificates();
    } catch (err) {
      alert(`Delete error: ${err.message}`);
    }
  };

  const handleTogglePublish = async (cert) => {
    try {
      await updateCertificate(cert.id, { is_published: !cert.is_published });
      setCertificates(prev => prev.map(c => c.id === cert.id ? { ...c, is_published: !c.is_published } : c));
    } catch (err) {
      alert(`Update error: ${err.message}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Certificates Manager</h1>
          <p className="text-xs md:text-sm text-gray-400 mt-1">
            Manage your credentials, upload verification certificates and control publication status.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent text-white font-bold text-xs hover:bg-accent/90 transition-all shadow-blue-glow"
        >
          <Plus className="w-4 h-4" />
          <span>Add Certificate</span>
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-amber-400" />
          <span>{error}</span>
        </div>
      )}

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {loading ? (
          <div className="col-span-full p-12 text-center text-xs text-gray-500">Loading certificates...</div>
        ) : certificates.length === 0 ? (
          <div className="col-span-full p-12 text-center text-xs text-gray-500">
            No certificates in database yet.
          </div>
        ) : (
          certificates.map((cert) => (
            <div key={cert.id} className="p-5 rounded-2xl glass-card border border-white/5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono text-gray-500">#{cert.display_order}</span>
                  <button
                    onClick={() => handleTogglePublish(cert)}
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      cert.is_published
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                        : 'bg-amber-500/15 text-amber-400 border border-amber-500/20'
                    }`}
                  >
                    {cert.is_published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    <span>{cert.is_published ? 'Published' : 'Hidden'}</span>
                  </button>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accentPurple/10 border border-accentPurple/20 flex items-center justify-center text-accentPurple flex-shrink-0 mt-0.5">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">{cert.title}</h3>
                    <p className="text-xs text-gray-400">{cert.issuer} • {cert.year}</p>
                  </div>
                </div>

                {cert.file_url && (
                  <div className="mt-4 rounded-xl overflow-hidden border border-white/5 bg-black/40 h-28 flex items-center justify-center">
                    <img
                      src={cert.file_url}
                      alt={cert.title}
                      className="max-h-full max-w-full object-contain"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  </div>
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between">
                {cert.verification_url ? (
                  <a
                    href={cert.verification_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-accent hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>Verify Link</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-[11px] text-gray-600">No external link</span>
                )}

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(cert)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300"
                    title="Edit"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(cert.id, cert.title)}
                    className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
          <div className="max-w-lg w-full bg-[#0d121f] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-8">
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <h2 className="text-base font-bold text-white">
                {editingCert ? 'Edit Certificate' : 'Add Certificate'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-300 mb-1">Certificate Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. JavaScript Bootcamp"
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-accent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-gray-300 mb-1">Issuer Organization *</label>
                  <input
                    type="text"
                    required
                    value={formData.issuer}
                    onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                    placeholder="e.g. LetsUpgrade"
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-300 mb-1">Year</label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    placeholder="2025"
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-gray-300 mb-1">Badge Icon Style</label>
                  <select
                    value={formData.badge_icon}
                    onChange={(e) => setFormData({ ...formData, badge_icon: e.target.value })}
                    className="w-full px-3 py-2 bg-[#090d16] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-accent"
                  >
                    <option value="award">Award Ribbon</option>
                    <option value="js">JavaScript (JS)</option>
                    <option value="python">Python</option>
                    <option value="ui">UI/UX Design</option>
                    <option value="html">HTML/CSS</option>
                    <option value="c">C Language</option>
                    <option value="ai">AI / ML</option>
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

              <div>
                <label className="block font-semibold text-gray-300 mb-1">Verification URL (Optional)</label>
                <input
                  type="url"
                  value={formData.verification_url}
                  onChange={(e) => setFormData({ ...formData, verification_url: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-300 mb-1">Upload Certificate File / Image</label>
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={handleFileUpload}
                  disabled={uploadingImage}
                  className="text-xs text-gray-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20"
                />
                {uploadingImage && <span className="text-accent text-[11px] animate-pulse block mt-1">Uploading...</span>}
                {formData.file_url && (
                  <p className="text-[11px] text-emerald-400 mt-1 truncate">File: {formData.file_url}</p>
                )}
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="cert_is_published"
                  checked={formData.is_published}
                  onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-700 text-accent focus:ring-accent"
                />
                <label htmlFor="cert_is_published" className="text-gray-300 font-semibold cursor-pointer">
                  Publish on public portfolio
                </label>
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
                  {saving ? 'Saving...' : editingCert ? 'Update Certificate' : 'Save Certificate'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
