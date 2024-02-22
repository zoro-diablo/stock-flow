'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function EditTopicForm({ id, title, description , price}) {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newPrice, setNewPrice] = useState(price);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/topics/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ newTitle, newDescription , newPrice }),
      });
    
      if (!res.ok) {
        throw new Error("Failed to update topic");
      }
    
      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }    


  return (
    <div className='flex justify-center'>
      <Card className='my-4 w-[600px]'>
        <CardHeader>
          <CardTitle>Add Product</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit} className='flex flex-col gap-8 m-5'>
          <Input
            onChange={(e) => setNewTitle(e.target.value)}
            value={newTitle}
            className='border border-slate-500  py-4'
            type='text'
            placeholder='Product Name'
          />
          <Input
            onChange={(e) => setNewPrice(e.target.value)}
            value={newPrice}
            className='border border-slate-500  py-4'
            type='text'
            placeholder='Product Price'
          />
          <Textarea
              onChange={(e) => setNewDescription(e.target.value)}
              value={newDescription}
            className='border border-slate-500  py-2'
            type='text'
            placeholder='Remarks'
          />
          <Button type='submit' className='  py-3  w-full '>
            Update Product
          </Button>
        </form>
      </Card>
    </div>
  );
}
