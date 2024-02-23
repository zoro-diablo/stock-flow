'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import * as React from 'react';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Label } from '@/components/ui/label';

export default function EditTopicForm({
  id,
  title,
  description,
  price,
  quantity,
  startDate,
  endDate,
  pricePerQty,
}) {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newPrice, setNewPrice] = useState(price);
  const [newQuantity, setNewQuantity] = useState(quantity);
  const [newStartDate, setNewStartDate] = useState(startDate);
  const [newEndDate, setNewEndDate] = useState(endDate);
  const [newPricePerQty, setNewPricePerQty] = useState(pricePerQty);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/topics/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            newTitle,
            newDescription,
            newPrice,
            newQuantity,
            newStartDate,
            newEndDate,
            newPricePerQty,
          }),
        }
      );

      if (!res.ok) {
        throw new Error('Failed to update topic');
      }

      router.refresh();
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex mt-6 justify-center'>
      <Card className='my-4  w-[600px]'>
        <CardHeader>
          <CardTitle>Update Item</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit} className='flex flex-col gap-8 m-5'>
          <div className='grid gap-2'>
            <Label htmlFor='terms'>Product Name</Label>
            <Input
              onChange={(e) => setNewTitle(e.target.value)}
              value={newTitle}
              className='border border-slate-500  py-4'
              type='text'
              placeholder='Update Product Name'
            />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='terms'>Quantity</Label>
            <Input
              onChange={(e) => setNewQuantity(e.target.value)}
              value={newQuantity}
              className='border border-slate-500  py-4'
              type='number'
              placeholder='Update No of Quantity'
            />
          </div>
          <div className='flex justify-between'>
            <div className='grid gap-2'>
              <Label htmlFor='terms'>Price</Label>
              <Input
                onChange={(e) => setNewPrice(e.target.value)}
                value={newPrice}
                className='border border-slate-500  py-4'
                type='text'
                placeholder='Update Product Price'
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='terms'>Price / Qty</Label>
              <Input
                onChange={(e) => setNewPricePerQty(e.target.value)}
                value={newPricePerQty}
                className='border border-slate-500  py-4'
                type='text'
                placeholder='Update Price / Qty'
              />
            </div>
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='terms'>Remarks</Label>
            <Textarea
              onChange={(e) => setNewDescription(e.target.value)}
              value={newDescription}
              className='border border-slate-500  py-2'
              type='text'
              placeholder='Remarks'
            />
          </div>
          <div className='flex w-full justify-between'>
            <div className='grid gap-2'>
              <Label htmlFor='terms'>Bought On</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-[240px] justify-start text-left font-normal',
                      !newStartDate && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    {newStartDate ? (
                      format(newStartDate, 'PPP')
                    ) : (
                      <span>Update the purchase date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={newStartDate}
                    onSelect={setNewStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='terms'>Expires On</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-[240px] justify-start text-left font-normal',
                      !newEndDate && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    {newEndDate ? (
                      format(newEndDate, 'PPP')
                    ) : (
                      <span>Update the expiration date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={newEndDate}
                    onSelect={setNewEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <Button type='submit' className='  py-3  w-full '>
            Update Item
          </Button>
        </form>
      </Card>
    </div>
  );
}
