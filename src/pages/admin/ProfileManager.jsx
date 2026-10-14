import React, { useEffect, useState } from 'react';
import { 
  fetchAdminProfile, 
  updateAdminProfile, 
  uploadFile 
} from '../../services/adminData';
import { 
  User, 
  Mail, 
  MapPin, 
  Phone, 
  Globe, 
  Upload, 
  Check, 
  AlertCircle 
} from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

export default function ProfileManager() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    name: 'Chandan Tiwadi',
    initials: 'CT',
    headline: 'Full Stack Web Developer',
    tagline: 'Building real-world web apps with modern tech & AI tools.',
    bio1: '',
    bio2: '',
    email: 'chandan110906@gmail.com',
    phone: '+91 8879753917',
    location: 'Mumbai, India',
    github_url: 'https://github.com/Chandan11op',
    linkedin_url: 'https://www.linkedin.com/in/chandan-tiwadi/',
    instagram_url: 'https://www.instagram.com/chandan_tiwadii/',
    twitter_url: 'https://x.com/ChandanTiwadi11',
    portfolio_url: 'https://first-basic-portfolio.vercel.app/',
    is_available: true,
    availability_text: 'Currently Available',
    avatar_url: ''
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await fetchAdminProfile();
      if (data) {
        setProfile(data);
        setFormData({
          name: data.name || 'Chandan Tiwadi',
          initials: data.initials || 'CT',
          headline: data.headline || 'Full Stack Web Developer',
          tagline: data.tagline || '',
          bio1: data.bio?.[0] || '',
          bio2: data.bio?.[1] || '',
          email: data.email || 'chandan110906@gmail.com',
          phone: data.phone || '+91 8879753917',
          location: data.location || 'Mumbai, India',
          github_url: data.github_url || 'https://github.com/Chandan11op',
          linkedin_url: data.linkedin_url || 'https://www.linkedin.com/in/chandan-tiwadi/',
          instagram_url: data.instagram_url || 'https://www.instagram.com/chandan_tiwadii/',
          twitter_url: data.twitter_url || 'https://x.com/ChandanTiwadi11',
          portfolio_url: data.portfolio_url || 'https://first-basic-portfolio.vercel.app/',
          is_available: Boolean(data.is_available),
          availability_text: data.availability_text || 'Currently Available',
          avatar_url: data.avatar_url || ''
        });
      }
    } catch (err) {
      setError(err.message || 'Error loading profile');
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingAvatar(true);
      const res = await uploadFile(file, 'portfolio-media', 'avatars');
      setFormData(prev => ({ ...prev, avatar_url: res.publicUrl }));
    } catch (err) {
      alert(`Avatar upload error: ${err.message}`);
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccess('');
    setError('');

    try {
      const bioArray = [formData.bio1.trim(), formData.bio2.trim()].filter(Boolean);
      const payload = {
        name: formData.name.trim(),
        initials: formData.initials.trim(),
        headline: formData.headline.trim(),
        tagline: formData.tagline.trim(),
        bio: bioArray,
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        location: formData.location.trim(),
        github_url: formData.github_url.trim(),
        linkedin_url: formData.linkedin_url.trim(),
        instagram_url: formData.instagram_url.trim(),
        twitter_url: formData.twitter_url.trim(),
        portfolio_url: formData.portfolio_url.trim(),
        is_available: formData.is_available,
        availability_text: formData.availability_text.trim(),
        avatar_url: formData.avatar_url || null
      };

      if (profile?.id) {
        await updateAdminProfile(profile.id, payload);
      }
      setSuccess('Profile updated successfully! Live portfolio will display these changes.');
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-white/5">
        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Profile & Contact Manager</h1>
        <p className="text-xs md:text-sm text-gray-400 mt-1">
          Update personal biography, headline, contact channels and public availability.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-amber-400" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-3">
          <Check className="w-5 h-5 flex-shrink-0 text-emerald-400" />
          <span>{success}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Core Identity */}
        <div className="p-6 rounded-2xl glass-card border border-white/5 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <User className="w-4 h-4 text-accent" />
            <span>Personal Information</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Initials</label>
              <input
                type="text"
                value={formData.initials}
                onChange={(e) => setFormData({ ...formData, initials: e.target.value })}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Headline</label>
              <input
                type="text"
                value={formData.headline}
                onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Hero Tagline</label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Biography Paragraph 1</label>
            <textarea
              rows={3}
              value={formData.bio1}
              onChange={(e) => setFormData({ ...formData, bio1: e.target.value })}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Biography Paragraph 2</label>
            <textarea
              rows={3}
              value={formData.bio2}
              onChange={(e) => setFormData({ ...formData, bio2: e.target.value })}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-accent"
            />
          </div>
        </div>

        {/* Contact & Social Links */}
        <div className="p-6 rounded-2xl glass-card border border-white/5 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-accentPurple" />
            <span>Contact & Social Links</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Phone</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">GitHub Profile URL</label>
              <input
                type="url"
                value={formData.github_url}
                onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">LinkedIn Profile URL</label>
              <input
                type="url"
                value={formData.linkedin_url}
                onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Instagram URL</label>
              <input
                type="url"
                value={formData.instagram_url}
                onChange={(e) => setFormData({ ...formData, instagram_url: e.target.value })}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">X / Twitter URL</label>
              <input
                type="url"
                value={formData.twitter_url}
                onChange={(e) => setFormData({ ...formData, twitter_url: e.target.value })}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-accent"
              />
            </div>
          </div>
        </div>

        {/* Availability Status */}
        <div className="p-6 rounded-2xl glass-card border border-white/5 space-y-4">
          <h2 className="text-sm font-bold text-white">Availability Banner Status</h2>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="is_available"
                checked={formData.is_available}
                onChange={(e) => setFormData({ ...formData, is_available: e.target.checked })}
                className="w-4 h-4 rounded border-gray-700 text-accent focus:ring-accent"
              />
              <label htmlFor="is_available" className="text-xs text-gray-300 font-semibold cursor-pointer">
                Available for Hire / Freelance Projects
              </label>
            </div>
            <div className="flex-1 w-full sm:w-auto">
              <input
                type="text"
                value={formData.availability_text}
                onChange={(e) => setFormData({ ...formData, availability_text: e.target.value })}
                placeholder="Currently Available"
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-accent"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-accent hover:bg-accent/90 text-white font-bold text-xs shadow-blue-glow disabled:opacity-50 transition-all"
          >
            {saving ? 'Saving changes...' : 'Save Profile Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
