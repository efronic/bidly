import { User, users } from '@/app/db/schema';
import { database } from '@/app/db/database';
import { eq } from 'drizzle-orm';

export async function createUser(user: User) {
  const inserted = await database
    .insert(users)
    .values({ ...user })
    .returning();
  return inserted[0];
}


export async function getUserById(userId: string) {
  return await database.query.users.findFirst({ where: eq(users.id, userId) });
}
