import { UserActivity } from '../types/userActivity.types';

export async function addRecentlyViewed(payload: UserActivity) {
  // TODO: persist recently viewed
  return { ok: true, payload };
}

export async function getRecentlyViewed(userId?: string) {
  // TODO: query recently viewed by userId
  return [] as UserActivity[];
}
