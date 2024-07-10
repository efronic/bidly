'use server';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { User } from '../db/schema';
import { createUser, getUserById } from '@/data-access/users';
// import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function Register() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const newUser: User = {
    name: user?.family_name || '',
    email: user?.email || '',
    emailVerified: new Date(),
    image: user?.picture || '',
    id: user?.id || '',
  };
  if (!newUser.id) {
    throw new Error('Failed to get user');
  }
  const existingUser = await getUserById(newUser.id);
  console.log('efron ahmadifar existingUser', existingUser);

  if (!existingUser) {
    const createdUser = await createUser(newUser);
    if (!createdUser) {
      throw new Error('Failed to create user');
    }
    // const baseUrl = process.env.KINDE_SITE_URL;
    // const redirectUrl = new URL('/register', baseUrl).toString();
    // console.log('efron ahmadifar redirectUrl', redirectUrl);
    console.log('efron ahmadifar createdUser', createdUser);
  }
  redirect('/');

  //   revalidatePath('/your-rooms');
  //   revalidatePath(`/edit-room/${user.id}`);
  // redirect('/');
}
