'use server';

import { items } from '@/app/db/schema';
import { createBid, getBidsByItemId, getBidsForUser } from '@/data-access/bids';
import { updateItemWithLatestBid } from '@/data-access/items';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function createBidAction(itemId: number) {
  console.log('im here');
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) throw new Error('Unauthorized');

  const item = await database.query.items.findFirst({
    where: eq(items.id, itemId),
  });
  console.log('item', item);
  if (!item) throw new Error('Item not found');
  const lastBidValue = item.currentBid + item.bidInterval;
  const newBid = {
    itemId: item.id,
    userId: user.id,
    amount: lastBidValue,
    timestamp: new Date(),
  };

  await createBid(newBid);
  //   return newBid;

  await updateItemWithLatestBid(itemId, lastBidValue);
  const currentBids = await getBidsByItemId(itemId);

  const recipients: {
    id: string;
    name: string;
    email: string;
  }[] = [];

  for (const bid of currentBids) {
    if (
      bid.userId !== user.id &&
      !recipients.find((recipient) => recipient.id === bid.userId)
    ) {
      recipients.push({
        id: bid.userId,
        name: bid.users.name,
        email: bid.users.email,
      });
    }
  }
  revalidatePath(`/items/${itemId}`);
}
