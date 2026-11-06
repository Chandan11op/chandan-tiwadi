import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: 'Chandan Tiwadi - Full Stack Developer CV',
      trim: true,
    },
    file_url: {
      type: String,
      required: [true, 'Resume file URL is required'],
      trim: true,
    },
    file_public_id: {
      type: String,
      default: '',
      trim: true,
    },
    version: {
      type: String,
      default: '1.0',
      trim: true,
    },
    is_active: {
      type: Boolean,
      default: false,
      index: true,
    },
    upload_date: {
      type: Date,
      default: Date.now,
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

export const Resume = mongoose.model('Resume', resumeSchema);

