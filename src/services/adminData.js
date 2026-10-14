import { supabase } from '../lib/supabase';

const sanitizeFileName = (name) => {
  return name.replace(/[^a-zA-Z0-9.-]/g, '_');
};

/**
 * Uploads a file to a Supabase storage bucket
 * @param {File} file 
 * @param {'portfolio-media' | 'portfolio-docs'} bucket 
 * @param {string} folder 
 * @returns {Promise<{publicUrl: string, path: string}>}
 */
export const uploadFile = async (file, bucket = 'portfolio-media', folder = 'uploads') => {
  if (!supabase) throw new Error("Supabase is not configured.");

  // Validation
  const maxSizeBytes = bucket === 'portfolio-docs' ? 10 * 1024 * 1024 : 5 * 1024 * 1024; // 10MB doc, 5MB image
  if (file.size > maxSizeBytes) {
    throw new Error(`File is too large. Maximum size is ${maxSizeBytes / (1024 * 1024)}MB.`);
  }

  // Type validation
  if (bucket === 'portfolio-docs' && file.type !== 'application/pdf') {
    throw new Error('Only PDF documents are permitted for resume / documents.');
  }

  const fileExt = file.name.split('.').pop()?.toLowerCase();
  const allowedExtensions = bucket === 'portfolio-docs' 
    ? ['pdf']
    : ['jpg', 'jpeg', 'png', 'webp', 'svg', 'gif', 'pdf'];

  if (!allowedExtensions.includes(fileExt)) {
    throw new Error(`Invalid file extension .${fileExt}. Allowed: ${allowedExtensions.join(', ')}`);
  }

  const timestamp = Date.now();
  const safeName = sanitizeFileName(file.name);
  const filePath = `${folder}/${timestamp}_${safeName}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) {
    throw error;
  }

  const { data: publicUrlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(data.path);

  return {
    publicUrl: publicUrlData.publicUrl,
    path: data.path
  };
};

// CRUD Operations: Projects
export const fetchAdminProjects = async () => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('display_order', { ascending: true });
  if (error) throw error;
  return data;
};

export const createProject = async (projectData) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase
    .from('projects')
    .insert([projectData])
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const updateProject = async (id, projectData) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase
    .from('projects')
    .update({ ...projectData, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const deleteProject = async (id) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);
  if (error) throw error;
  return true;
};

// CRUD Operations: Profile
export const fetchAdminProfile = async () => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase
    .from('profile')
    .select('*')
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return data;
};

export const updateAdminProfile = async (id, profileData) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase
    .from('profile')
    .update({ ...profileData, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
};

// CRUD Operations: Certificates
export const fetchAdminCertificates = async () => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase
    .from('certificates')
    .select('*')
    .order('display_order', { ascending: true });
  if (error) throw error;
  return data;
};

export const createCertificate = async (certData) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase
    .from('certificates')
    .insert([certData])
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const updateCertificate = async (id, certData) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase
    .from('certificates')
    .update({ ...certData, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const deleteCertificate = async (id) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { error } = await supabase
    .from('certificates')
    .delete()
    .eq('id', id);
  if (error) throw error;
  return true;
};

// CRUD Operations: Resumes
export const fetchAdminResumes = async () => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase
    .from('resumes')
    .select('*')
    .order('upload_date', { ascending: false });
  if (error) throw error;
  return data;
};

export const createResume = async (resumeData) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  if (resumeData.is_active) {
    // Deactivate previous active resumes first
    await supabase.from('resumes').update({ is_active: false }).neq('id', '00000000-0000-0000-0000-000000000000');
  }
  const { data, error } = await supabase
    .from('resumes')
    .insert([resumeData])
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const setActiveResume = async (id) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  // Set all inactive
  await supabase.from('resumes').update({ is_active: false }).neq('id', id);
  // Set target active
  const { data, error } = await supabase
    .from('resumes')
    .update({ is_active: true, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const deleteResume = async (id) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { error } = await supabase
    .from('resumes')
    .delete()
    .eq('id', id);
  if (error) throw error;
  return true;
};

// CRUD Operations: Skills
export const fetchAdminSkills = async () => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .order('display_order', { ascending: true });
  if (error) throw error;
  return data;
};

export const createSkill = async (skillData) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase
    .from('skills')
    .insert([skillData])
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const updateSkill = async (id, skillData) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase
    .from('skills')
    .update(skillData)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const deleteSkill = async (id) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { error } = await supabase
    .from('skills')
    .delete()
    .eq('id', id);
  if (error) throw error;
  return true;
};

export const deleteCategory = async (categoryName) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { error } = await supabase
    .from('skills')
    .delete()
    .eq('category', categoryName);
  if (error) throw error;
  return true;
};

// CRUD Operations: Education
export const fetchAdminEducation = async () => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase
    .from('education')
    .select('*')
    .order('display_order', { ascending: true });
  if (error) throw error;
  return data;
};

export const createEducation = async (eduData) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase
    .from('education')
    .insert([eduData])
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const updateEducation = async (id, eduData) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase
    .from('education')
    .update(eduData)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const deleteEducation = async (id) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { error } = await supabase
    .from('education')
    .delete()
    .eq('id', id);
  if (error) throw error;
  return true;
};

// CRUD Operations: Experience
export const fetchAdminExperience = async () => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase
    .from('experience')
    .select('*')
    .order('display_order', { ascending: true });
  if (error) throw error;
  return data;
};

export const createExperience = async (expData) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase
    .from('experience')
    .insert([expData])
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const updateExperience = async (id, expData) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase
    .from('experience')
    .update(expData)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const deleteExperience = async (id) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { error } = await supabase
    .from('experience')
    .delete()
    .eq('id', id);
  if (error) throw error;
  return true;
};
