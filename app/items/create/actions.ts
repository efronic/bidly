'use server';

import { items } from '@/app/db/schema';
import { database } from '@/app/db/database';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';

export async function createItemAction(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) throw new Error('Unauthorized');

  const name = formData.get('name') as string;

  await database
    .insert(items)
    .values({
      name,
      userId: user?.id,
      startingPrice: parseFloat(formData.get('startingPrice') as string),
    })
    .execute();
  redirect('/');
}
