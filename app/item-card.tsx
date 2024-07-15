import Image from 'next/image';
import { Item } from './db/schema';
import { getImageUrl } from '@/utils/files';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function ItemCard({ item }: { item: Item }) {
  return (
    <div className='border p-8 rounded-xl space-y-2' key={item.id}>
      <Image
        src={getImageUrl(item.fileKey)}
        width={200}
        height={200}
        alt={item.name}
      />
      <h2 className='text-xl font-bold'>{item.name}</h2>
      <p className='text-lg'>starting price: ${item.startingPrice}</p>
      <Button asChild>
        <Link href={`/items/${item.id}`}>Place A Bid</Link>
      </Button>
    </div>
  );
}
