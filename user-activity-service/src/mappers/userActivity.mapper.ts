import { UserActivity } from '../types/userActivity.types';

export function mapToUserActivity(input: any): UserActivity {
  return {
    id: input.id || '',
    userId: input.userId || '',
    type: input.type || 'view',
    payload: input.payload || {},
    createdAt: input.createdAt || new Date().toISOString(),
  };
}
