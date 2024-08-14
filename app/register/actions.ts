'use server';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { User } from '../db/schema';
import { createUser, getUserById } from '@/data-access/users';
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

  if (!existingUser) {
    const createdUser = await createUser(newUser);
    if (!createdUser) {
      throw new Error('Failed to create user');
    }
  }
  redirect('/');
}
