'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createItemAction, createUploadUrlAction } from './actions';
import { pageTitleStyles } from '@/styles';
import { DatePickerDemo } from "@/components/date-picker";
import { useState } from 'react';

export default function CreatePage() {
  const [date, setDate] = useState<Date | undefined>();

  return (
    <main className='space-y-8'>
      <h1 className={pageTitleStyles}>Post an Item</h1>

      <form
        className='flex flex-col border p-4 rounded-md mt-4 space-y-4 max-w-lg'
        onSubmit={async (e) => {
          e.preventDefault();
          if (!date) {
            return;
          }

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
            endDate: date,
          });
        }}
      >
        <Input required name='name' placeholder='Name your item' className="max-w-lg" />
        <Input
          className="max-w-lg"
          required
          name='startingPrice'
          placeholder='Starting price'
          type='number'
          step='0.01'
        />
        <Input type='file' name='file' required></Input>
        <DatePickerDemo date={date} setDate={setDate} />
        <Button className='self-end' type='submit'>
          Post Item
        </Button>
      </form>
    </main>
  );
}
