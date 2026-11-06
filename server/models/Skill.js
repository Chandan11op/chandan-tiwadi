import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Skill name is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      default: 'Frontend',
      trim: true,
      index: true,
    },
    proficiency: {
      type: String,
      default: '',
      trim: true,
    },
    icon_name: {
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

// Compound index to ensure uniqueness per category
skillSchema.index({ name: 1, category: 1 }, { unique: true });

export const Skill = mongoose.model('Skill', skillSchema);

