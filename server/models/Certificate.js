import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Certificate title is required'],
      trim: true,
    },
    issuer: {
      type: String,
      required: [true, 'Issuing organization is required'],
      trim: true,
    },
    issue_date: {
      type: String,
      default: '',
      trim: true,
    },
    year: {
      type: String,
      default: () => new Date().getFullYear().toString(),
      trim: true,
    },
    credential_id: {
      type: String,
      default: '',
      trim: true,
    },
    verification_url: {
      type: String,
      default: '',
      trim: true,
    },
    file_url: {
      type: String,
      default: '',
      trim: true,
    },
    file_public_id: {
      type: String,
      default: '',
      trim: true,
    },
    badge_icon: {
      type: String,
      default: 'Professional Certificate',
      trim: true,
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

export const Certificate = mongoose.model('Certificate', certificateSchema);

