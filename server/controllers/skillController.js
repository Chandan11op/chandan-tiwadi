import { Skill } from '../models/Skill.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

export const getPublicSkills = async (req, res, next) => {
  try {
    const skills = await Skill.find().sort({ display_order: 1, createdAt: 1 });

    // Group by category to match portfolioData format: [{ category, items: [...] }]
    const categoriesMap = {};
    skills.forEach((s) => {
      if (!categoriesMap[s.category]) {
        categoriesMap[s.category] = [];
      }
      categoriesMap[s.category].push(s.name);
    });

    const grouped = Object.keys(categoriesMap).map((cat) => ({
      category: cat,
      items: categoriesMap[cat],
    }));

    return successResponse(res, grouped, 'Public skills fetched successfully');
  } catch (error) {
    next(error);
  }
};

export const getAdminSkills = async (req, res, next) => {
  try {
    const skills = await Skill.find().sort({ display_order: 1, createdAt: 1 });
    return successResponse(res, skills, 'Admin skills fetched successfully');
  } catch (error) {
    next(error);
  }
};

export const createSkill = async (req, res, next) => {
  try {
    const { name, category, display_order, proficiency } = req.body;
    if (!name || !category) {
      return errorResponse(res, 'Skill name and category are required', 400);
    }

    const skill = await Skill.create({
      name: name.trim(),
      category: category.trim(),
      display_order: display_order || 0,
      proficiency: proficiency || '',
    });

    return successResponse(res, skill, 'Skill created successfully', 201);
  } catch (error) {
    next(error);
  }
};

export const updateSkill = async (req, res, next) => {
  try {
    const { id } = req.params;
    const skill = await Skill.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!skill) {
      return errorResponse(res, 'Skill not found', 404);
    }
    return successResponse(res, skill, 'Skill updated successfully');
  } catch (error) {
    next(error);
  }
};

export const deleteSkill = async (req, res, next) => {
  try {
    const { id } = req.params;
    const skill = await Skill.findByIdAndDelete(id);
    if (!skill) {
      return errorResponse(res, 'Skill not found', 404);
    }
    return successResponse(res, { id }, 'Skill deleted successfully');
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const { categoryName } = req.params;
    if (!categoryName) {
      return errorResponse(res, 'Category name is required', 400);
    }
    const result = await Skill.deleteMany({ category: categoryName });
    return successResponse(res, { deletedCount: result.deletedCount }, `Deleted all skills in category: ${categoryName}`);
  } catch (error) {
    next(error);
  }
};

