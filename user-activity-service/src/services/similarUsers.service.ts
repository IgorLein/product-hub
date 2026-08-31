import { Favorite } from '../models/favorite.model';

type SimilarUser = {
  userId: string;
  commonFavorites: number;
};

export async function getSimilarUsersWithDetails(
  userId: string,
  limit: number = 10,
): Promise<SimilarUser[]> {
  const similarUsers = await Favorite.aggregate<{
  _id: string;
  commonFavorites: number;
}>([
    {
      $match: {
        userId,
      },
    },
    {
      $unwind: '$favorites',
    },
    {
      $lookup: {
        from: Favorite.collection.name,
        localField: 'favorites',
        foreignField: 'favorites',
        as: 'similarUsers',
      },
    },
    {
      $unwind: '$similarUsers',
    },
    {
      $match: {
        'similarUsers.userId': { $ne: userId },
      },
    },
    {
      $group: {
        _id: '$similarUsers.userId',
        commonFavorites: { $sum: 1 },
      },
    },
    {
      $sort: {
        commonFavorites: -1,
      },
    },
    {
      $limit: limit,
    },
  ]);

  return similarUsers.map((user) => ({
    userId: user._id,
    commonFavorites: user.commonFavorites,
  }));
}
