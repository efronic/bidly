import Image from 'next/image';
import { Item } from './db/schema';
import { getImageUrl } from '@/utils/files';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { isBidOver } from '@/utils/bids';
import { format } from "date-fns";


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
      {isBidOver(item) ? (
        <p className="text-lg">Bidding is Over</p>
      ) : (
        <p className="text-lg">
          Ends On: {format(item.endDate, "eeee dd/M/yy")}
        </p>
      )}
      <Button asChild variant={isBidOver(item) ? "outline" : "default"}>
        <Link href={`/items/${item.id}`}>
          {isBidOver(item) ? "View Bid" : "Place Bid"}
        </Link>
      </Button>
    </div>
  );
}
