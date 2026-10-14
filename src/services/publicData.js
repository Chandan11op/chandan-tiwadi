import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { portfolioData } from '../data/portfolioData';

/**
 * Public Data Service
 * Safely fetches ONLY published content with public-safe projections.
 * Gracefully falls back to bundled portfolioData.js if Supabase is offline or unconfigured.
 */

export const getPublicProfile = async () => {
  if (!isSupabaseConfigured || !supabase) {
    return portfolioData.personalInfo;
  }

  try {
    const { data, error } = await supabase
      .from('profile')
      .select('name, initials, headline, tagline, bio, email, phone, location, avatar_url, resume_url, github_url, linkedin_url, instagram_url, twitter_url, portfolio_url, is_available, availability_text, stats, hero_titles')
      .limit(1)
      .maybeSingle();

    if (error || !data) {
      console.warn('Falling back to local profile data:', error?.message);
      return portfolioData.personalInfo;
    }

    return {
      name: data.name || portfolioData.personalInfo.name,
      initials: data.initials || portfolioData.personalInfo.initials,
      location: data.location || portfolioData.personalInfo.location,
      tagline: data.tagline || portfolioData.personalInfo.tagline,
      bio: data.bio && data.bio.length > 0 ? data.bio : portfolioData.personalInfo.bio,
      email: data.email || portfolioData.personalInfo.email,
      phone: data.phone || portfolioData.personalInfo.phone,
      github: data.github_url || portfolioData.personalInfo.github,
      linkedin: data.linkedin_url || portfolioData.personalInfo.linkedin,
      instagram: data.instagram_url || portfolioData.personalInfo.instagram,
      twitter: data.twitter_url || portfolioData.personalInfo.twitter,
      portfolioUrl: data.portfolio_url || portfolioData.personalInfo.portfolioUrl,
      resumeUrl: data.resume_url || portfolioData.personalInfo.resumeUrl,
      stats: data.stats || portfolioData.personalInfo.stats,
      heroTitles: data.hero_titles || portfolioData.heroTitles,
      isAvailable: data.is_available,
      availabilityText: data.availability_text
    };
  } catch (err) {
    console.error('Profile fetch error:', err);
    return portfolioData.personalInfo;
  }
};

export const getPublicProjects = async () => {
  if (!isSupabaseConfigured || !supabase) {
    return portfolioData.projects;
  }

  try {
    // Only published projects are returned by RLS and explicit filter
    const { data, error } = await supabase
      .from('projects')
      .select('id, slug, title, project_type, badge, period, short_description, full_description, technologies, category, thumbnail_url, screenshots, live_url, github_url, show_github_link, is_featured, highlight_color, display_order')
      .eq('is_published', true)
      .order('display_order', { ascending: true });

    if (error || !data || data.length === 0) {
      console.warn('Falling back to local projects data:', error?.message);
      return portfolioData.projects;
    }

    // Map database fields to the portfolio component's expected format
    // Strict visibility rules enforcement:
    return data.map((item) => {
      const isClientProject = item.project_type === 'Client Project';
      
      // Personal projects show github link only if show_github_link is true AND github_url exists
      // Client projects show github link only if show_github_link is explicitly true
      const canShowGithub = item.show_github_link && Boolean(item.github_url);

      return {
        id: item.slug || item.id,
        title: item.title,
        badge: item.badge || (isClientProject ? '💼 Client Project' : '🚀 Project'),
        type: item.project_type || 'Full Stack',
        period: item.period || '',
        tech: item.technologies || [],
        description: item.full_description || item.short_description || '',
        highlightColor: item.highlight_color || 'default',
        thumbnail: item.thumbnail_url || null,
        links: {
          live: item.live_url || null,
          github: canShowGithub ? item.github_url : null,
        }
      };
    });
  } catch (err) {
    console.error('Projects fetch error:', err);
    return portfolioData.projects;
  }
};

export const getPublicSkills = async () => {
  if (!isSupabaseConfigured || !supabase) {
    return portfolioData.skills;
  }

  try {
    const { data, error } = await supabase
      .from('skills')
      .select('name, category, display_order')
      .order('display_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return portfolioData.skills;
    }

    // Group by category to match portfolioData format
    const categoriesMap = {};
    data.forEach((s) => {
      if (!categoriesMap[s.category]) {
        categoriesMap[s.category] = [];
      }
      categoriesMap[s.category].push(s.name);
    });

    return Object.keys(categoriesMap).map((cat) => ({
      category: cat,
      items: categoriesMap[cat],
    }));
  } catch (err) {
    console.error('Skills fetch error:', err);
    return portfolioData.skills;
  }
};

export const getPublicCertificates = async () => {
  if (!isSupabaseConfigured || !supabase) {
    return portfolioData.certifications;
  }

  try {
    const { data, error } = await supabase
      .from('certificates')
      .select('title, issuer, year, badge_icon, file_url, verification_url, display_order')
      .eq('is_published', true)
      .order('display_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return portfolioData.certifications;
    }

    return data.map((cert) => ({
      title: cert.title,
      issuer: cert.issuer,
      year: cert.year || '',
      badgeIcon: cert.badge_icon || 'award',
      image: cert.file_url,
      verificationUrl: cert.verification_url || null
    }));
  } catch (err) {
    console.error('Certificates fetch error:', err);
    return portfolioData.certifications;
  }
};

export const getPublicEducation = async () => {
  if (!isSupabaseConfigured || !supabase) {
    return portfolioData.education;
  }

  try {
    const { data, error } = await supabase
      .from('education')
      .select('institution, degree, period, details, relevant_courses, image_url, display_order')
      .order('display_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return portfolioData.education;
    }

    return data.map((edu) => ({
      institution: edu.institution,
      degree: edu.degree,
      period: edu.period,
      details: edu.details,
      relevantCourses: edu.relevant_courses || [],
      image: edu.image_url
    }));
  } catch (err) {
    console.error('Education fetch error:', err);
    return portfolioData.education;
  }
};

export const getPublicActiveResume = async () => {
  if (!isSupabaseConfigured || !supabase) {
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('resumes')
      .select('title, file_url, version')
      .eq('is_active', true)
      .limit(1)
      .maybeSingle();

    if (error || !data) {
      return null;
    }
    return data;
  } catch (err) {
    return null;
  }
};
