import { Resume } from '../models/Resume.js';
import { Profile } from '../models/Profile.js';
import { deleteCloudinaryAsset } from '../utils/cloudinaryHelpers.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

export const getPublicActiveResume = async (req, res, next) => {
  try {
    const resume = await Resume.findOne({ is_active: true }).sort({ updatedAt: -1 });
    if (!resume) {
      // Fallback: check profile resume_url or newest resume
      const newest = await Resume.findOne().sort({ upload_date: -1 });
      if (newest) {
        return successResponse(res, newest, 'Latest resume fetched as fallback');
      }
      return successResponse(res, null, 'No active resume found');
    }
    return successResponse(res, resume, 'Active resume retrieved successfully');
  } catch (error) {
    next(error);
  }
};

export const getAdminResumes = async (req, res, next) => {
  try {
    const resumes = await Resume.find().sort({ upload_date: -1, createdAt: -1 });
    return successResponse(res, resumes, 'Admin resumes fetched successfully');
  } catch (error) {
    next(error);
  }
};

export const createResume = async (req, res, next) => {
  try {
    const { title, file_url, file_public_id, version, is_active } = req.body;

    if (!file_url) {
      return errorResponse(res, 'File URL is required', 400);
    }

    if (is_active) {
      // Deactivate all others
      await Resume.updateMany({}, { is_active: false });
    }

    const resume = await Resume.create({
      title: title || 'Chandan Tiwadi - Full Stack Developer CV',
      file_url,
      file_public_id: file_public_id || '',
      version: version || '1.0',
      is_active: Boolean(is_active),
      upload_date: new Date(),
    });

    if (is_active) {
      // Keep Profile.resume_url in sync
      await Profile.updateMany({}, { resume_url: file_url });
    }

    return successResponse(res, resume, 'Resume created successfully', 201);
  } catch (error) {
    next(error);
  }
};

export const setActiveResume = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Set all resumes to inactive
    await Resume.updateMany({}, { is_active: false });

    // Set target resume to active
    const resume = await Resume.findByIdAndUpdate(
      id,
      { is_active: true },
      { new: true }
    );

    if (!resume) {
      return errorResponse(res, 'Resume not found', 404);
    }

    // Keep Profile.resume_url updated
    await Profile.updateMany({}, { resume_url: resume.file_url });

    return successResponse(res, resume, 'Resume set as active successfully');
  } catch (error) {
    next(error);
  }
};

export const deleteResume = async (req, res, next) => {
  try {
    const { id } = req.params;
    const resume = await Resume.findById(id);
    if (!resume) {
      return errorResponse(res, 'Resume not found', 404);
    }

    if (resume.file_public_id) {
      deleteCloudinaryAsset(resume.file_public_id, 'raw').catch((err) =>
        console.warn('Resume file deletion error:', err.message)
      );
    }

    await Resume.findByIdAndDelete(id);
    return successResponse(res, { id }, 'Resume deleted successfully');
  } catch (error) {
    next(error);
  }
};

