import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createItemAction } from './actions';

export default async function HomePage() {
  return (
    <main className=' container mx-auto py-12 space-y-8'>
      <h1 className='text-4xl font-bold'>Post an Item</h1>

      <form
        className='flex flex-col border p-4 rounded-md mt-4 space-y-4 max-w-lg'
        action={createItemAction}
      >
        <Input required name='name' placeholder='Name your item' />
        <Input
          required
          name='startingPrice'
          placeholder='Starting price'
          type='number'
          step='0.01'
        />
        <Button className='self-end' type='submit'>
          Submit
        </Button>
      </form>
    </main>
  );
}
