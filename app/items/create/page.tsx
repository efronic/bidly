'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createItemAction, createUploadUrlAction } from './actions';

export default function HomePage() {
  return (
    <main className=' container mx-auto py-12 space-y-8'>
      <h1 className='text-4xl font-bold'>Post an Item</h1>

      <form
        className='flex flex-col border p-4 rounded-md mt-4 space-y-4 max-w-lg'
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget as HTMLFormElement);
          const file = formData.get('file') as File;

          const uploadUrl = await createUploadUrlAction(file.name, file.type);

          await fetch(uploadUrl, {
            method: 'PUT',
            body: file,
          });

          const name = formData.get('name') as string;
          const startingPrice = parseFloat(
            formData.get('startingPrice') as string
          );

          await createItemAction({
            fileName: file.name,
            name,
            startingPrice,
          });
        }}
      >
        <Input required name='name' placeholder='Name your item' />
        <Input
          required
          name='startingPrice'
          placeholder='Starting price'
          type='number'
          step='0.01'
        />
        <input type='file' name='file' required />
        <Button className='self-end' type='submit'>
          Submit
        </Button>
      </form>
    </main>
  );
}
