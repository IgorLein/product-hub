import { UserActivity } from '../types/userActivity.types';

// Placeholder model representation
export type UserActivityModel = UserActivity;

export const createEmptyActivity = (): UserActivityModel => ({
  id: '',
  userId: '',
  type: 'view',
  payload: {},
  createdAt: new Date().toISOString(),
});
