import { Project } from '../models/Project.js';
import { deleteCloudinaryAsset } from '../utils/cloudinaryHelpers.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

// Helper to normalize slug
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
};

export const getPublicProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({ is_published: true })
      .sort({ display_order: 1, createdAt: -1 });

    // Format safely according to public confidentiality rules
    const formatted = projects.map((p) => {
      const canShowGithub = p.show_github_link && Boolean(p.github_url);
      return {
        id: p.slug || p._id.toString(),
        _id: p._id.toString(),
        slug: p.slug,
        title: p.title,
        badge: p.badge || (p.project_type === 'Client Project' ? '💼 Client Project' : '🚀 Project'),
        type: p.project_type || 'Full Stack',
        period: p.period || '',
        tech: p.technologies || [],
        technologies: p.technologies || [],
        description: p.full_description || p.short_description || '',
        full_description: p.full_description,
        short_description: p.short_description,
        category: p.category || 'Full Stack',
        highlightColor: p.highlight_color || 'default',
        highlight_color: p.highlight_color || 'default',
        thumbnail: p.thumbnail_url || null,
        thumbnail_url: p.thumbnail_url || null,
        screenshots: p.screenshots || [],
        links: {
          live: p.live_url || null,
          github: canShowGithub ? p.github_url : null,
        },
        live_url: p.live_url || null,
        github_url: canShowGithub ? p.github_url : null,
        show_github_link: p.show_github_link,
        is_featured: p.is_featured,
        display_order: p.display_order,
      };
    });

    return successResponse(res, formatted, 'Public projects fetched successfully');
  } catch (error) {
    next(error);
  }
};

export const getAdminProjects = async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ display_order: 1, createdAt: -1 });
    return successResponse(res, projects, 'Admin projects fetched successfully');
  } catch (error) {
    next(error);
  }
};

export const getProjectBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const project = await Project.findOne({ slug });
    if (!project) {
      return errorResponse(res, 'Project not found', 404);
    }
    return successResponse(res, project, 'Project retrieved successfully');
  } catch (error) {
    next(error);
  }
};

export const createProject = async (req, res, next) => {
  try {
    const data = { ...req.body };

    // Format technologies if passed as a comma-separated string
    if (typeof data.technologies === 'string') {
      data.technologies = data.technologies
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);
    }

    if (!data.slug && data.title) {
      data.slug = slugify(data.title);
    }

    // Check slug collision
    const existing = await Project.findOne({ slug: data.slug });
    if (existing) {
      data.slug = `${data.slug}-${Date.now().toString().slice(-4)}`;
    }

    const project = await Project.create(data);
    return successResponse(res, project, 'Project created successfully', 201);
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (typeof updateData.technologies === 'string') {
      updateData.technologies = updateData.technologies
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);
    }

    const project = await Project.findById(id);
    if (!project) {
      return errorResponse(res, 'Project not found', 404);
    }

    // If new thumbnail is replacing an old one, queue deletion of old Cloudinary asset
    const oldPublicId = project.thumbnail_public_id;
    if (updateData.thumbnail_public_id && oldPublicId && oldPublicId !== updateData.thumbnail_public_id) {
      deleteCloudinaryAsset(oldPublicId).catch((err) =>
        console.warn('Old thumbnail deletion error:', err.message)
      );
    }

    Object.assign(project, updateData);
    await project.save();

    return successResponse(res, project, 'Project updated successfully');
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (!project) {
      return errorResponse(res, 'Project not found', 404);
    }

    if (project.thumbnail_public_id) {
      deleteCloudinaryAsset(project.thumbnail_public_id).catch((err) =>
        console.warn('Thumbnail deletion error:', err.message)
      );
    }

    await Project.findByIdAndDelete(id);
    return successResponse(res, { id }, 'Project deleted successfully');
  } catch (error) {
    next(error);
  }
};

