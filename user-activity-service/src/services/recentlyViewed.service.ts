import { RecentlyViewed } from '../models/recentlyViewed.model';

export async function addRecentlyViewed(userId: string, productId: number) {
  await RecentlyViewed.updateOne(
    {
      userId,
      productId,
    },
    {
      $set: { viewedAt: new Date() },
    },
    { upsert: true }
  );
}

export async function getRecentlyViewed(userId?: string) {
  return await RecentlyViewed.find({ userId })
    .sort({ viewedAt: -1 })
    .limit(10)
    .select('productId viewedAt -_id')
    .lean();
}

export async function removeRecentlyViewed(userId: string, productId: number) {
  await RecentlyViewed.deleteOne({ userId, productId });
}
