import { database } from '@/app/db/database';
import { items } from '@/app/db/schema';
import { eq } from 'drizzle-orm';

export default async function ItemPage({
  params: { itemId },
}: {
  params: { itemId: string };
}) {
  const item = await database.query.items.findFirst({
    where: eq(items.id, Number(itemId)),
  });

  return (
    <main className='container mx-auto py-12 space-y-8'>
      <h1>Item Page</h1>
    </main>
  );
}
