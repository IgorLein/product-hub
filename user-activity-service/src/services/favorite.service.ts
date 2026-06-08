import { UserActivity } from '../types/userActivity.types';

export async function addFavorite(payload: UserActivity) {
  // TODO: persist favorite
  return { ok: true, payload };
}

export async function getFavorites(userId?: string) {
  // TODO: query favorites by userId
  return [] as UserActivity[];
}
