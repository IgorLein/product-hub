import mongoose, { Schema } from 'mongoose';

const recentlyViewedSchema = new Schema(
  {
    productId: {
      type: Number,
      required: true,
    },
    viewedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: false,
  }
);

const userActivitySchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    favorites: {
      type: [Number],
      default: [],
    },

    recentlyViewed: {
      type: [recentlyViewedSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const UserActivity = mongoose.model(
  'UserActivity',
  userActivitySchema
);
