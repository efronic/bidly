'use server';

import { items } from '@/app/db/schema';
import { database } from '@/app/db/database';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import { getSignedUrlForS3Object } from '@/lib/s3';

export async function createItemAction({
  fileName,
  name,
  startingPrice,
}: {
  fileName: string;
  name: string;
  startingPrice: number;
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) throw new Error('Unauthorized');

  await database
    .insert(items)
    .values({
      name,
      userId: user?.id,
      fileKey: fileName,
      startingPrice,
    })
    .execute();
  redirect('/');
}

export async function createUploadUrlAction(key: string, type: string) {
  return await getSignedUrlForS3Object(key, type);
}
