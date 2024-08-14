import { eq } from 'drizzle-orm';
import { items } from '../db/schema';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { pageTitleStyles } from '@/styles';
import { ItemCard } from '../item-card';
import { EmptyState } from './empty-state';
import { database } from '@/app/db/database';

export default async function MyAuctionPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) throw new Error('Unauthorized');

  const allMyItems = await database.query.items.findMany({
    where: eq(items.userId, user.id),
  });

  const foundAuctions = allMyItems.length > 0;

  return (
    <main className='space-y-8'>
      <h1 className={pageTitleStyles}>Your Current Auctions</h1>

      {foundAuctions ? (
        <div className='grid grid-cols-4 gap-8'>
          {allMyItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div>
          <EmptyState />
        </div>
      )}
    </main>
  );
}
