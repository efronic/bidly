import Image from 'next/image';
import { database } from '@/app/db/database';
import { bids as bidsSchema } from '@/app/db/schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';
import { LoginLink, LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';

export default async function HomePage() {
  const bids = await database.query.bids.findMany();
  const session = await auth();
  return (
    <main className=' container mx-auto py-12'>
      <form
        action={async (formData: FormData) => {
          'use server';
          const name = formData.get('name') as string;
          await database.insert(bidsSchema).values({ name }).execute();
          revalidatePath('/');
        }}
        className='flex space-x-4'
      >
        <Input type='text' name='name' />
        <Button type='submit'>Submit</Button>
      </form>
      {bids.map((bid) => (
        <div key={bid.id}>
          <p>{bid.name}</p>
        </div>
      ))}
    </main>
  );
}
