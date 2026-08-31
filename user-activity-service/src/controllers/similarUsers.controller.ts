import { getSimilarUsersWithDetails } from '../services/similarUsers.service';

export async function getSimilarUsers(
  req: any,
  res: any,
): Promise<void> {
  const { userId } = req.params;
  const { limit } = req.query;

  if (!userId) {
    res.status(400).json({ error: 'Missing userId parameter' });
    return;
  }

  try {
    const similarUsers = await getSimilarUsersWithDetails(
      userId,
      limit ? parseInt(limit, 10) : undefined,
    );
    res.json(similarUsers);
  } catch (error) {
    console.error('Error fetching similar users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
