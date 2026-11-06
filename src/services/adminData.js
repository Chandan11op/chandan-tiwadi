import { apiRequest } from './apiClient';

/**
 * Uploads a file to Cloudinary via the Express backend
 * @param {File} file 
 * @param {'portfolio-media' | 'portfolio-docs'} bucket 
 * @param {string} folder 
 * @returns {Promise<{publicUrl: string, path: string, public_id: string}>}
 */
export const uploadFile = async (file, bucket = 'portfolio-media', folder = 'portfolio/general') => {
  const isDocument = bucket === 'portfolio-docs' || file.type === 'application/pdf';
  const endpoint = isDocument ? '/api/uploads/document' : '/api/uploads/image';

  // Map bucket/folder name to structured Cloudinary folders
  let cloudinaryFolder = folder;
  if (!cloudinaryFolder.startsWith('portfolio/')) {
    if (folder.includes('certificate')) cloudinaryFolder = 'portfolio/certificates';
    else if (folder.includes('project')) cloudinaryFolder = 'portfolio/projects';
    else if (folder.includes('profile')) cloudinaryFolder = 'portfolio/profile';
    else if (folder.includes('resume')) cloudinaryFolder = 'portfolio/resumes';
    else cloudinaryFolder = `portfolio/${folder}`;
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', cloudinaryFolder);

  const res = await apiRequest(endpoint, {
    method: 'POST',
    body: formData,
  });

  return {
    publicUrl: res.data?.publicUrl || res.data?.url,
    url: res.data?.url || res.data?.publicUrl,
    path: res.data?.public_id || '',
    public_id: res.data?.public_id || '',
  };
};

// CRUD Operations: Projects
export const fetchAdminProjects = async () => {
  const res = await apiRequest('/api/projects/all');
  return res.data || [];
};

export const createProject = async (projectData) => {
  const res = await apiRequest('/api/projects', {
    method: 'POST',
    body: JSON.stringify(projectData),
  });
  return res.data;
};

export const updateProject = async (id, projectData) => {
  const res = await apiRequest(`/api/projects/${id}`, {
    method: 'PUT',
    body: JSON.stringify(projectData),
  });
  return res.data;
};

export const deleteProject = async (id) => {
  await apiRequest(`/api/projects/${id}`, {
    method: 'DELETE',
  });
  return true;
};

// CRUD Operations: Profile
export const fetchAdminProfile = async () => {
  const res = await apiRequest('/api/profile');
  return res.data;
};

export const updateAdminProfile = async (id, profileData) => {
  const res = await apiRequest('/api/profile', {
    method: 'PUT',
    body: JSON.stringify(profileData),
  });
  return res.data;
};

// CRUD Operations: Certificates
export const fetchAdminCertificates = async () => {
  const res = await apiRequest('/api/certificates/all');
  return res.data || [];
};

export const createCertificate = async (certData) => {
  const res = await apiRequest('/api/certificates', {
    method: 'POST',
    body: JSON.stringify(certData),
  });
  return res.data;
};

export const updateCertificate = async (id, certData) => {
  const res = await apiRequest(`/api/certificates/${id}`, {
    method: 'PUT',
    body: JSON.stringify(certData),
  });
  return res.data;
};

export const deleteCertificate = async (id) => {
  await apiRequest(`/api/certificates/${id}`, {
    method: 'DELETE',
  });
  return true;
};

// CRUD Operations: Resumes
export const fetchAdminResumes = async () => {
  const res = await apiRequest('/api/resume/all');
  return res.data || [];
};

export const createResume = async (resumeData) => {
  const res = await apiRequest('/api/resume', {
    method: 'POST',
    body: JSON.stringify(resumeData),
  });
  return res.data;
};

export const setActiveResume = async (id) => {
  const res = await apiRequest(`/api/resume/${id}/active`, {
    method: 'PUT',
  });
  return res.data;
};

export const deleteResume = async (id) => {
  await apiRequest(`/api/resume/${id}`, {
    method: 'DELETE',
  });
  return true;
};

// CRUD Operations: Skills
export const fetchAdminSkills = async () => {
  const res = await apiRequest('/api/skills/all');
  return res.data || [];
};

export const createSkill = async (skillData) => {
  const res = await apiRequest('/api/skills', {
    method: 'POST',
    body: JSON.stringify(skillData),
  });
  return res.data;
};

export const updateSkill = async (id, skillData) => {
  const res = await apiRequest(`/api/skills/${id}`, {
    method: 'PUT',
    body: JSON.stringify(skillData),
  });
  return res.data;
};

export const deleteSkill = async (id) => {
  await apiRequest(`/api/skills/${id}`, {
    method: 'DELETE',
  });
  return true;
};

export const deleteCategory = async (categoryName) => {
  await apiRequest(`/api/skills/category/${encodeURIComponent(categoryName)}`, {
    method: 'DELETE',
  });
  return true;
};

// CRUD Operations: Education
export const fetchAdminEducation = async () => {
  const res = await apiRequest('/api/education/all');
  return res.data || [];
};

export const createEducation = async (eduData) => {
  const res = await apiRequest('/api/education', {
    method: 'POST',
    body: JSON.stringify(eduData),
  });
  return res.data;
};

export const updateEducation = async (id, eduData) => {
  const res = await apiRequest(`/api/education/${id}`, {
    method: 'PUT',
    body: JSON.stringify(eduData),
  });
  return res.data;
};

export const deleteEducation = async (id) => {
  await apiRequest(`/api/education/${id}`, {
    method: 'DELETE',
  });
  return true;
};

// CRUD Operations: Experience
export const fetchAdminExperience = async () => {
  const res = await apiRequest('/api/experience/all');
  return res.data || [];
};

export const createExperience = async (expData) => {
  const res = await apiRequest('/api/experience', {
    method: 'POST',
    body: JSON.stringify(expData),
  });
  return res.data;
};

export const updateExperience = async (id, expData) => {
  const res = await apiRequest(`/api/experience/${id}`, {
    method: 'PUT',
    body: JSON.stringify(expData),
  });
  return res.data;
};

export const deleteExperience = async (id) => {
  await apiRequest(`/api/experience/${id}`, {
    method: 'DELETE',
  });
  return true;
};

// Overview & Health Operations
export const fetchDashboardStats = async () => {
  const res = await apiRequest('/api/stats');
  return res.data;
};

export const checkBackendHealth = async () => {
  const res = await apiRequest('/api/health');
  return res;
};
