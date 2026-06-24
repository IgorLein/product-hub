import { UserActivity } from '../models/userActivity.model';

export async function addFavorite(userId: string, productId: string): Promise<void> {
  await UserActivity.findOneAndUpdate(
    {
      userId,
    },
    {
      $addToSet: { favorites: productId },
    },
    { upsert: true }
  );
}

export async function getFavorites(userId: string) {
  return await UserActivity.findOne({ userId }).select('favorites -_id').lean();
}

export async function removeFavorite(userId: string, productId: string): Promise<void> {
  await UserActivity.updateOne(
    {
      userId,
    },
    {
      $pull: { favorites: productId },
    }
  );
}
