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


export default function AddTopic() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [pricePerQty, setPricePerQty] = useState('');

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !title ||
      !description ||
      !price ||
      !startDate ||
      !endDate ||
      !quantity ||
      !pricePerQty
    ) {
      alert('Please fill in all fields and select start and end dates.');
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
          body: JSON.stringify({
            title,
            description,
            price,
            startDate,
            endDate,
            quantity,
            pricePerQty,
          }),
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
    <div className='flex mt-6 justify-center'>
      <Card className='my-4  w-[600px]'>
        <CardHeader>
          <CardTitle>Add Item</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit} className='flex flex-col gap-6 m-5'>
          <div className='grid gap-2'>
            <Label htmlFor='terms'>Product Name</Label>
            <Input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className='border border-slate-500  py-4'
              type='text'
              placeholder='Add Product Name'
            />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='terms'>Quantity</Label>
            <Input
              onChange={(e) => setQuantity(e.target.value)}
              value={quantity}
              className='border border-slate-500  py-4'
              type='number'
              placeholder='No of Quantity'
            />
          </div>
          <div className='flex justify-between'>
            <div className='grid gap-2'>
              <Label htmlFor='terms'>Price</Label>
              <Input
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                className='border border-slate-500  py-4 w-[260px]'
                type='number'
                placeholder='Add Price'
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='terms'>Price / Qty</Label>
              <Input
                onChange={(e) => setPricePerQty(e.target.value)}
                value={pricePerQty}
                className='border border-slate-500  py-4 w-[260px]'
                type='number'
                placeholder='Add Price per Quantity'
              />
            </div>
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='terms'>Remarks</Label>
            <Textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              className='border border-slate-500  py-2'
              type='text'
              placeholder='Add any Remarks'
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
                      !startDate && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    {startDate ? (
                      format(startDate, 'PPP')
                    ) : (
                      <span>Select the purchase date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={startDate}
                    onSelect={setStartDate}
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
                      !endDate && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    {endDate ? (
                      format(endDate, 'PPP')
                    ) : (
                      <span>Select the expiration date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <Button type='submit' className='  py-3  w-full '>
            Add Item
          </Button>
        </form>
      </Card>
    </div>
  );
}
