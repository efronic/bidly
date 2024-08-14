'use server';

import { items } from '@/app/db/schema';
import { createBid, getBidsByItemId, getBidsForUser } from '@/data-access/bids';
import { updateItemWithLatestBid } from '@/data-access/items';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { Knock } from "@knocklabs/node";
import { env } from '@/env';
import { isBidOver } from '@/utils/bids';

const knock = new Knock(env.KNOCK_SECRET_KEY);


export async function createBidAction(itemId: number) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) throw new Error('Unauthorized');

  const item = await database.query.items.findFirst({
    where: eq(items.id, itemId),
  });
  
  if (!item) throw new Error('Item not found');
  if (isBidOver(item))
    throw new Error('This auction is already over.')

  const lastBidValue = item.currentBid + item.bidInterval;
  const newBid = {
    itemId: item.id,
    userId: user.id,
    amount: lastBidValue,
    timestamp: new Date(),
  };

  await createBid(newBid);

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
  if (recipients && recipients.length > 0) {
    await knock.workflows.trigger("user-placed-bid", {
      actor: {
        id: user.id,
        name: user.given_name ?? "Anonymous",
        email: user.email,
        collection: "users",
      },
      recipients,
      data: {
        itemId,
        bidAmount: lastBidValue,
        itemName: item.name,
      },
    });

  }
  revalidatePath(`/items/${itemId}`);
}
