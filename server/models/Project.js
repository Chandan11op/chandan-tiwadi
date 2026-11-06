import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: [true, 'Project slug is required'],
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    project_type: {
      type: String,
      default: 'Personal Project',
      trim: true,
    },
    badge: {
      type: String,
      default: '🚀 Project',
      trim: true,
    },
    period: {
      type: String,
      default: '',
      trim: true,
    },
    short_description: {
      type: String,
      default: '',
      trim: true,
    },
    full_description: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true,
    },
    technologies: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      default: 'Full Stack',
      trim: true,
    },
    thumbnail_url: {
      type: String,
      default: '',
    },
    thumbnail_public_id: {
      type: String,
      default: '',
    },
    screenshots: {
      type: [String],
      default: [],
    },
    live_url: {
      type: String,
      default: '',
      trim: true,
    },
    github_url: {
      type: String,
      default: '',
      trim: true,
    },
    show_github_link: {
      type: Boolean,
      default: false,
    },
    is_featured: {
      type: Boolean,
      default: false,
      index: true,
    },
    is_published: {
      type: Boolean,
      default: true,
      index: true,
    },
    display_order: {
      type: Number,
      default: 0,
      index: true,
    },
    highlight_color: {
      type: String,
      default: 'default',
      trim: true,
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

export const Project = mongoose.model('Project', projectSchema);

