import Image from 'next/image';
import { database } from '@/app/db/database';
import { items } from '@/app/db/schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { revalidatePath } from 'next/cache';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export default async function HomePage() {
  const allItems = await database.query.items.findMany();
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) return null;
  return (
    <main className=' container mx-auto py-12'>
      <form
        action={async (formData: FormData) => {
          'use server';
          const name = formData.get('name') as string;
          await database
            .insert(items)
            .values({ name, userId: user?.id })
            .execute();
          revalidatePath('/');
        }}
        className='flex space-x-4'
      >
        <Input name='name' placeholder='Name your item'/>
        <Button type='submit'>Submit</Button>
      </form>
      {allItems.map((item) => (
        <div key={item.id}>
          <p>{item.name}</p>
        </div>
      ))}
    </main>
  );
}
