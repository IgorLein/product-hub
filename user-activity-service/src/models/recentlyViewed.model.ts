import mongoose, { Schema } from 'mongoose';

const recentlyViewedSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    productId: {
      type: Number,
      required: true,
      index: true,
    },
    viewedAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

recentlyViewedSchema.index({ userId: 1, productId: 1 }, { unique: true });

recentlyViewedSchema.index({ userId: 1, viewedAt: -1 });

export const RecentlyViewed = mongoose.model('RecentlyViewed', recentlyViewedSchema);
