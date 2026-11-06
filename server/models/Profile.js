import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: 'Chandan Tiwadi',
      trim: true,
    },
    initials: {
      type: String,
      default: 'CT',
      trim: true,
    },
    headline: {
      type: String,
      default: 'Full Stack Web Developer',
      trim: true,
    },
    tagline: {
      type: String,
      default: 'Building real-world web apps with modern tech & AI tools.',
      trim: true,
    },
    bio: {
      type: [String],
      default: [],
    },
    email: {
      type: String,
      required: true,
      default: 'chandan110906@gmail.com',
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      default: '+91 8879753917',
      trim: true,
    },
    location: {
      type: String,
      default: 'Mumbai, India',
      trim: true,
    },
    avatar_url: {
      type: String,
      default: '',
    },
    avatar_public_id: {
      type: String,
      default: '',
    },
    resume_url: {
      type: String,
      default: '',
    },
    github_url: {
      type: String,
      default: 'https://github.com/Chandan11op',
      trim: true,
    },
    linkedin_url: {
      type: String,
      default: 'https://www.linkedin.com/in/chandan-tiwadi/',
      trim: true,
    },
    instagram_url: {
      type: String,
      default: 'https://www.instagram.com/chandan_tiwadii/',
      trim: true,
    },
    twitter_url: {
      type: String,
      default: 'https://x.com/ChandanTiwadi11',
      trim: true,
    },
    portfolio_url: {
      type: String,
      default: 'https://first-basic-portfolio.vercel.app/',
      trim: true,
    },
    is_available: {
      type: Boolean,
      default: true,
    },
    availability_text: {
      type: String,
      default: 'Currently Available',
      trim: true,
    },
    stats: {
      type: [
        {
          value: { type: String, default: '' },
          label: { type: String, default: '' },
        },
      ],
      default: [
        { value: '4+', label: 'Projects Built' },
        { value: '1', label: 'Paid Client Project' },
        { value: '7+', label: 'Certifications' },
        { value: 'Available', label: 'Currently Hiring' },
      ],
    },
    hero_titles: {
      type: [String],
      default: [
        'Full Stack Web Developer',
        'React.js Developer',
        'AI-Powered Builder',
        'Freelancer',
      ],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        return ret;
      },
    },
  }
);

export const Profile = mongoose.model('Profile', profileSchema);

