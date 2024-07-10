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

// write a function for getting a user by id from the database

export async function getUserById(userId: string) {
  return await database.query.users.findFirst({ where: eq(users.id, userId) });
}

// export async function editRoom(roomData: Room) {
//   const session = await getSession();
//   if (!session) {
//     throw new Error('You must be logged in to create a room.');
//   }
//   const updated = await db
//     .update(room)
//     .set(roomData)
//     .where(eq(room.id, roomData.id))
//     .returning();
//   return updated[0];
// }
