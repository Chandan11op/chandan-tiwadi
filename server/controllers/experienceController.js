import { Experience } from '../models/Experience.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

export const getPublicExperience = async (req, res, next) => {
  try {
    const list = await Experience.find().sort({ display_order: 1, createdAt: 1 });
    return successResponse(res, list, 'Public experience fetched successfully');
  } catch (error) {
    next(error);
  }
};

export const getAdminExperience = async (req, res, next) => {
  try {
    const list = await Experience.find().sort({ display_order: 1, createdAt: 1 });
    return successResponse(res, list, 'Admin experience fetched successfully');
  } catch (error) {
    next(error);
  }
};

export const createExperience = async (req, res, next) => {
  try {
    const item = await Experience.create(req.body);
    return successResponse(res, item, 'Experience entry created successfully', 201);
  } catch (error) {
    next(error);
  }
};

export const updateExperience = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await Experience.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!item) {
      return errorResponse(res, 'Experience entry not found', 404);
    }
    return successResponse(res, item, 'Experience entry updated successfully');
  } catch (error) {
    next(error);
  }
};

export const deleteExperience = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await Experience.findByIdAndDelete(id);
    if (!item) {
      return errorResponse(res, 'Experience entry not found', 404);
    }
    return successResponse(res, { id }, 'Experience entry deleted successfully');
  } catch (error) {
    next(error);
  }
};

