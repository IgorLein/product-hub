import { Favorite } from '../models/favorite.model';

export async function addFavorite(userId: string, productId: string): Promise<void> {
  await Favorite.findOneAndUpdate(
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
  return await Favorite.findOne({ userId }).select('favorites -_id').lean();
}

export async function removeFavorite(userId: string, productId: string): Promise<void> {
  await Favorite.updateOne(
    {
      userId,
    },
    {
      $pull: { favorites: productId },
    }
  );
}
