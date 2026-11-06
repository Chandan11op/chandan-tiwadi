import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: [true, 'Role / Job title is required'],
      trim: true,
    },
    organization: {
      type: String,
      required: [true, 'Company / Organization is required'],
      trim: true,
    },
    location: {
      type: String,
      default: 'Remote',
      trim: true,
    },
    start_date: {
      type: String,
      required: [true, 'Start date is required'],
      trim: true,
    },
    end_date: {
      type: String,
      default: 'Present',
      trim: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    display_order: {
      type: Number,
      default: 0,
      index: true,
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

export const Experience = mongoose.model('Experience', experienceSchema);

