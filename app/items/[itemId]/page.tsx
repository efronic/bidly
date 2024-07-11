import { database } from '@/app/db/database';
import { items } from '@/app/db/schema';
import { Button } from '@/components/ui/button';
import { pageTitleStyles } from '@/styles';
import { eq } from 'drizzle-orm';
import Link from 'next/link';
import Image from 'next/image';
import { getImageUrl } from '@/utils/files';
import { formatDistance } from 'date-fns';

function formatTimestamp(timestamp: Date) {
  return formatDistance(timestamp, new Date(), { addSuffix: true });
}

export default async function ItemPage({
  params: { itemId },
}: {
  params: { itemId: string };
}) {
  const item = await database.query.items.findFirst({
    where: eq(items.id, Number(itemId)),
  });

  if (!item) {
    return (
      <div className='space-y-8 flex flex-col items-center mt-12'>
        <Image src='/package.svg' width='200' height='200' alt='empty state' />

        <h1 className={pageTitleStyles}>Item not found</h1>
        <p className='text-center'>
          This item you&apos;re trying to view is invalid.
        </p>
        <Button asChild>
          <Link href={`/`}>View Auctions</Link>
        </Button>
      </div>
    );
  }
  return (
    <main className='container mx-auto py-12 space-y-8'>
      <div className='flex gap-8'>
        <div>
          <h1 className={pageTitleStyles}>
            <span className='font-normal'>Auction for</span> {item.name}
          </h1>
          <Image
            className='rounded-xl'
            src={getImageUrl(item.fileKey)}
            alt={item.name}
            width={400}
            height={400}
          />
          <div>
            Starting Price of
            <span className='bold'>${item.startingPrice}</span>
          </div>
        </div>
        <div>Hello</div>
      </div>
    </main>
  );
}
