import { Education } from '../models/Education.js';
import { deleteCloudinaryAsset } from '../utils/cloudinaryHelpers.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

export const getPublicEducation = async (req, res, next) => {
  try {
    const list = await Education.find().sort({ display_order: 1, createdAt: 1 });

    const formatted = list.map((edu) => ({
      id: edu._id.toString(),
      _id: edu._id.toString(),
      institution: edu.institution,
      degree: edu.degree,
      period: edu.period,
      details: edu.details,
      relevantCourses: edu.relevant_courses || [],
      relevant_courses: edu.relevant_courses || [],
      image: edu.image_url,
      image_url: edu.image_url,
      image_public_id: edu.image_public_id,
      display_order: edu.display_order,
    }));

    return successResponse(res, formatted, 'Public education fetched successfully');
  } catch (error) {
    next(error);
  }
};

export const getAdminEducation = async (req, res, next) => {
  try {
    const list = await Education.find().sort({ display_order: 1, createdAt: 1 });
    return successResponse(res, list, 'Admin education fetched successfully');
  } catch (error) {
    next(error);
  }
};

export const createEducation = async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (typeof data.relevant_courses === 'string') {
      data.relevant_courses = data.relevant_courses
        .split(',')
        .map((c) => c.trim())
        .filter(Boolean);
    }

    const item = await Education.create(data);
    return successResponse(res, item, 'Education entry created successfully', 201);
  } catch (error) {
    next(error);
  }
};

export const updateEducation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };
    if (typeof data.relevant_courses === 'string') {
      data.relevant_courses = data.relevant_courses
        .split(',')
        .map((c) => c.trim())
        .filter(Boolean);
    }

    const item = await Education.findById(id);
    if (!item) {
      return errorResponse(res, 'Education not found', 404);
    }

    if (data.image_public_id && item.image_public_id && item.image_public_id !== data.image_public_id) {
      deleteCloudinaryAsset(item.image_public_id).catch((err) =>
        console.warn('Old education image deletion error:', err.message)
      );
    }

    Object.assign(item, data);
    await item.save();

    return successResponse(res, item, 'Education entry updated successfully');
  } catch (error) {
    next(error);
  }
};

export const deleteEducation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await Education.findById(id);
    if (!item) {
      return errorResponse(res, 'Education not found', 404);
    }

    if (item.image_public_id) {
      deleteCloudinaryAsset(item.image_public_id).catch((err) =>
        console.warn('Education image deletion error:', err.message)
      );
    }

    await Education.findByIdAndDelete(id);
    return successResponse(res, { id }, 'Education entry deleted successfully');
  } catch (error) {
    next(error);
  }
};

