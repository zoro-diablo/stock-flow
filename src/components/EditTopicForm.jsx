'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function EditTopicForm({ id, title, description }) {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/topics/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ newTitle, newDescription }),
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
    <Card className='my-4 '>
      <CardHeader>
        <CardTitle>Add Topic</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit} className='flex flex-col gap-5 m-5'>
        <Input
          onChange={(e) => setNewTitle(e.target.value)}
          value={newTitle}
          className='border border-slate-500  py-4'
          type='text'
          placeholder='Topic Title'
        />
        <Textarea
            onChange={(e) => setNewDescription(e.target.value)}
            value={newDescription}
          className='border border-slate-500  py-2'
          type='text'
          placeholder='Topic Description'
        />
        <Button type='submit' className='  py-3  w-full '>
          Update Topic
        </Button>
      </form>
    </Card>
  );
}
