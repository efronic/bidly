import Image from 'next/image';
import { database } from '@/app/db/database';
import { bids as bidsSchema } from '@/app/db/schema';

export default async function HomePage() {
  const bids = await database.query.bids.findMany();
  return (
    <main className=' container mx-auto py-12'>
      <form
        action={async (formData: FormData) => {
          'use server';
          const name = formData.get('name') as string;
          await database.insert(bidsSchema).values({ name }).execute();
        }}
      >
        <input type='text' name='name' />
        <button type='submit'>Submit</button>
      </form>
      {bids.map((bid) => (
        <div key={bid.id}>
          <p>{bid.name}</p>
        </div>
      ))}
    </main>
  );
}
