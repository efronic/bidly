import { Item, items } from '@/app/db/schema';
import { eq } from 'drizzle-orm';

export async function updateItemWithLatestBid(
  itemId: number,
  latestBidValue: number
) {
  const updated = await database
    .update(items)
    .set({
      currentBid: latestBidValue,
    })
    .where(eq(items.id, itemId))
    .returning();
  return updated[0];
}
export async function getItemByItemId(itemId: number) {
  return await database.query.items.findFirst({
    where: eq(items.id, itemId),
  });
}
