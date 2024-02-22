'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';


export default function AddTopic() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !price) {
      alert('Title , description and Price are required.');
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/topics`,
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({ title, description , price }),
        }
      );

      if (res.ok) {
        router.refresh();
        router.push('/');
      } else {
        throw new Error('Failed to create a topic');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex justify-center'>
    <Card className='my-4 w-[600px]'>
      <CardHeader>
        <CardTitle>Add Item</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit} className='flex flex-col gap-5 m-5'>
        <Input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className='border border-slate-500  py-4'
          type='text'
          placeholder='Product Name'
        />
        <Input
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          className='border border-slate-500  py-4'
          type='number'
          placeholder='Price'
        />
        <Textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className='border border-slate-500  py-2'
          type='text'
          placeholder='Remarks'
        />
        <Button type='submit' className='  py-3  w-full '>
          Add Item
        </Button>
      </form>
    </Card>
  </div>
  );
}
