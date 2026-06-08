export type UserActivityType = 'view' | 'favorite' | 'click';

export interface UserActivity {
  id: string;
  userId: string;
  type: UserActivityType;
  payload: Record<string, any>;
  createdAt: string;
}
