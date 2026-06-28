import mongoose, { Schema, Document } from 'mongoose';

const favoriteSchema = new Schema(
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
  },
  {
    timestamps: true,
  }
);

export const Favorite = mongoose.model('Favorite', favoriteSchema);
