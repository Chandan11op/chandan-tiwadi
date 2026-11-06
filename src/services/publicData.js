import { apiRequest } from './apiClient';
import { portfolioData } from '../data/portfolioData';

/**
 * Public Data Service
 * Retrieves live portfolio content from MongoDB via the Express backend.
 * Gracefully falls back to bundled static portfolioData.js if the backend is offline or warming up.
 */

// Simple in-memory cache to prevent redundant requests
const cache = {
  profile: null,
  projects: null,
  skills: null,
  certificates: null,
  education: null,
  resume: null,
  timestamps: {},
};

const CACHE_TTL_MS = 60 * 1000; // 1 minute client cache

export const invalidatePublicCache = () => {
  cache.profile = null;
  cache.projects = null;
  cache.skills = null;
  cache.certificates = null;
  cache.education = null;
  cache.resume = null;
  cache.timestamps = {};
};

const isCacheValid = (key) => {
  const ts = cache.timestamps[key];
  return Boolean(cache[key] && ts && Date.now() - ts < CACHE_TTL_MS);
};

export const getPublicProfile = async () => {
  if (isCacheValid('profile')) {
    return cache.profile;
  }

  try {
    const res = await apiRequest('/api/profile');
    const data = res?.data;

    if (!data) {
      return portfolioData.personalInfo;
    }

    const formatted = {
      name: data.name || portfolioData.personalInfo.name,
      initials: data.initials || portfolioData.personalInfo.initials,
      location: data.location || portfolioData.personalInfo.location,
      tagline: data.tagline || portfolioData.personalInfo.tagline,
      bio: Array.isArray(data.bio) && data.bio.length > 0 ? data.bio : portfolioData.personalInfo.bio,
      email: data.email || portfolioData.personalInfo.email,
      phone: data.phone || portfolioData.personalInfo.phone,
      github: data.github_url || portfolioData.personalInfo.github,
      linkedin: data.linkedin_url || portfolioData.personalInfo.linkedin,
      instagram: data.instagram_url || portfolioData.personalInfo.instagram,
      twitter: data.twitter_url || portfolioData.personalInfo.twitter,
      portfolioUrl: data.portfolio_url || portfolioData.personalInfo.portfolioUrl,
      resumeUrl: data.resume_url || portfolioData.personalInfo.resumeUrl,
      stats: data.stats && data.stats.length > 0 ? data.stats : portfolioData.personalInfo.stats,
      heroTitles: data.hero_titles && data.hero_titles.length > 0 ? data.hero_titles : portfolioData.heroTitles,
      isAvailable: data.is_available,
      availabilityText: data.availability_text,
      avatarUrl: data.avatar_url || null,
    };

    cache.profile = formatted;
    cache.timestamps['profile'] = Date.now();
    return formatted;
  } catch (err) {
    console.warn('Backend unavailable, using bundled fallback profile:', err.message);
    return portfolioData.personalInfo;
  }
};

export const getPublicProjects = async () => {
  if (isCacheValid('projects')) {
    return cache.projects;
  }

  try {
    const res = await apiRequest('/api/projects');
    const data = res?.data;

    if (!data || !Array.isArray(data) || data.length === 0) {
      return portfolioData.projects;
    }

    cache.projects = data;
    cache.timestamps['projects'] = Date.now();
    return data;
  } catch (err) {
    console.warn('Backend unavailable, using bundled fallback projects:', err.message);
    return portfolioData.projects;
  }
};

export const getPublicSkills = async () => {
  if (isCacheValid('skills')) {
    return cache.skills;
  }

  try {
    const res = await apiRequest('/api/skills');
    const data = res?.data;

    if (!data || !Array.isArray(data) || data.length === 0) {
      return portfolioData.skills;
    }

    cache.skills = data;
    cache.timestamps['skills'] = Date.now();
    return data;
  } catch (err) {
    console.warn('Backend unavailable, using bundled fallback skills:', err.message);
    return portfolioData.skills;
  }
};

export const getPublicCertificates = async () => {
  if (isCacheValid('certificates')) {
    return cache.certificates;
  }

  try {
    const res = await apiRequest('/api/certificates');
    const data = res?.data;

    if (!data || !Array.isArray(data) || data.length === 0) {
      return portfolioData.certifications;
    }

    cache.certificates = data;
    cache.timestamps['certificates'] = Date.now();
    return data;
  } catch (err) {
    console.warn('Backend unavailable, using bundled fallback certificates:', err.message);
    return portfolioData.certifications;
  }
};

export const getPublicEducation = async () => {
  if (isCacheValid('education')) {
    return cache.education;
  }

  try {
    const res = await apiRequest('/api/education');
    const data = res?.data;

    if (!data || !Array.isArray(data) || data.length === 0) {
      return portfolioData.education;
    }

    cache.education = data;
    cache.timestamps['education'] = Date.now();
    return data;
  } catch (err) {
    console.warn('Backend unavailable, using bundled fallback education:', err.message);
    return portfolioData.education;
  }
};

export const getPublicActiveResume = async () => {
  if (isCacheValid('resume')) {
    return cache.resume;
  }

  try {
    const res = await apiRequest('/api/resume/active');
    const data = res?.data;

    if (data && data.file_url) {
      cache.resume = data;
      cache.timestamps['resume'] = Date.now();
      return data;
    }
    return null;
  } catch (err) {
    console.warn('Active resume endpoint error, fallback:', err.message);
    return null;
  }
};
