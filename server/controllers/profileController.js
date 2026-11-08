import { Profile } from '../models/Profile.js';
import { buildOptimizedCloudinaryUrl } from '../utils/cloudinaryHelpers.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

export const getProfile = async (req, res, next) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      // Seed initial default profile if none exists
      profile = await Profile.create({
        name: 'Chandan Tiwadi',
        initials: 'CT',
        headline: 'Full Stack Web Developer',
        tagline: 'Building real-world web apps with modern tech & AI tools.',
        bio: [
          "I'm Chandan Tiwadi, a Third-Year B.Sc. IT student at K.P.B. Hinduja College, Mumbai, and a passionate Full Stack Web Developer. I build real-world web applications using React.js, Node.js, and modern databases — and I leverage AI tools like Claude, ChatGPT, and Antigravity IDE to develop faster and smarter.",
          "I've delivered a paid freelance project, built a real-time chat app in just 2 days, and I'm currently developing an AI-enhanced e-commerce platform as my major project. I'm a quick learner who's always eager to pick up new technologies and build things that actually work."
        ],
        email: 'chandan110906@gmail.com',
        phone: '+91 8879753917',
        location: 'Mumbai, India',
        github_url: 'https://github.com/Chandan11op',
        linkedin_url: 'https://www.linkedin.com/in/chandan-tiwadi/',
        instagram_url: 'https://www.instagram.com/chandan_tiwadii/',
        twitter_url: 'https://x.com/ChandanTiwadi11',
        portfolio_url: 'https://first-basic-portfolio.vercel.app/',
        is_available: true,
        availability_text: 'Currently Available',
      });
    }

    const profileObj = profile.toObject ? profile.toObject() : { ...profile };
    if (profileObj.avatar_url) {
      profileObj.avatar_url = buildOptimizedCloudinaryUrl(profileObj.avatar_url);
    }

    return successResponse(res, profileObj, 'Profile fetched successfully');
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    let profile = await Profile.findOne();
    const updateData = req.body;

    // Handle bio array if bio1 & bio2 passed from ProfileManager form
    if (updateData.bio1 !== undefined || updateData.bio2 !== undefined) {
      const bioArray = [];
      if (updateData.bio1) bioArray.push(updateData.bio1);
      if (updateData.bio2) bioArray.push(updateData.bio2);
      updateData.bio = bioArray;
    }

    if (!profile) {
      profile = await Profile.create(updateData);
    } else {
      Object.assign(profile, updateData);
      await profile.save();
    }

    return successResponse(res, profile, 'Profile updated successfully');
  } catch (error) {
    next(error);
  }
};

