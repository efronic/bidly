import { database } from '@/app/db/database';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { ItemCard } from './item-card';

export default async function HomePage() {
  const allItems = await database.query.items.findMany();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) return null;

  return (
    <main className=' container mx-auto py-12 space-y-8'>
      <h1 className='text-4xl font-bold'>Items for Sale</h1>

      <div className='grid grid-cols-4 gap-8'>
        {allItems.map((item) => (
          <ItemCard item={item} key={item.id} />
        ))}
      </div>
    </main>
  );
}
