import { Bid, bids } from '@/app/db/schema';
import { eq } from 'drizzle-orm';
import { database } from '@/app/db/database';

export async function createBid(bid: Omit<Bid, 'id'>) {
  await database.insert(bids).values({ ...bid });
}

export async function getBidsForUser(userId: string) {
  console.log('userId', userId);
  return await database.query.bids.findMany({ where: eq(bids.userId, userId) });
}

export async function getBidsByItemId(itemId: number) {
  return await database.query.bids.findMany({
    where: eq(bids.itemId, itemId),
    with: { users: true },
  });
}
