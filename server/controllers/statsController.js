import { Project } from '../models/Project.js';
import { Certificate } from '../models/Certificate.js';
import { Skill } from '../models/Skill.js';
import { Education } from '../models/Education.js';
import { Experience } from '../models/Experience.js';
import { Resume } from '../models/Resume.js';
import { isDbConnected } from '../config/database.js';
import { successResponse } from '../utils/apiResponse.js';

export const getDashboardStats = async (req, res, next) => {
  try {
    const [
      totalProjects,
      publishedProjects,
      totalCertificates,
      totalSkills,
      totalEducation,
      totalExperience,
      activeResume,
      latestResume,
    ] = await Promise.all([
      Project.countDocuments(),
      Project.countDocuments({ is_published: true }),
      Certificate.countDocuments(),
      Skill.countDocuments(),
      Education.countDocuments(),
      Experience.countDocuments(),
      Resume.findOne({ is_active: true }),
      Resume.findOne().sort({ upload_date: -1 }),
    ]);

    const activeResumeVersion = activeResume
      ? activeResume.version
      : latestResume?.version || 'Bundled fallback';

    const recentProjects = await Project.find()
      .sort({ createdAt: -1 })
      .limit(5);

    return successResponse(res, {
      totalProjects,
      publishedProjects,
      draftProjects: totalProjects - publishedProjects,
      totalCertificates,
      totalSkills,
      totalEducation,
      totalExperience,
      activeResumeVersion,
      recentProjects,
      dbConnected: isDbConnected(),
      serverUptime: process.uptime(),
    }, 'Dashboard stats retrieved successfully');
  } catch (error) {
    next(error);
  }
};

