import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import RemoveBtn from './RemoveBtn';
import { Badge } from './ui/badge';
import { format, isValid } from 'date-fns';

const getTopics = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/topics`,
      {
        cache: 'no-store',
      }
    );

    if (!res.ok) {
      throw new Error('Failed to fetch topics');
    }

    return res.json();
  } catch (error) {
    console.log('Error loading topics: ', error);
    return { topics: [] };
  }
};

export default async function Product() {
  const { topics } = await getTopics();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (!isValid(date)) {
      return 'Invalid date';
    }
    return format(date, ' do MMM , yy');
  };

  return (
    <div className=' grid grid-cols-4  gap-2  w-full'>
      {topics.map((t) => (
        <Card key={t._id} className='col-span-1 m-4'>
          <CardHeader>
            <div className='flex  justify-between'>
              <div>
                <CardTitle>{t.title}</CardTitle>
                <div className='mt-2 grid gap-1 '>
                  <div>
                    <CardDescription>{formatDate(t.startDate)}</CardDescription>
                  </div>
                  <CardDescription>{formatDate(t.endDate)}</CardDescription>
                </div>
              </div>
              <div>
                <Badge variant='outline' className='text-xl '>
                  ₹ {t.price}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p>{t.description}</p>
          </CardContent>
          <CardFooter className='flex justify-between gap-4'>
            <div className='grid gap-2'>
              <Badge variant='secondary' className='text-sm rounded-full'>
                Qty : {t.quantity}
              </Badge>
              <Badge variant='secondary' className='text-sm rounded-full'>
                Pri / Qty : ₹ {t.pricePerQty}
              </Badge>
            </div>
            <div className='flex gap-4'>
              <Link href={`/editTopic/${t._id}`}>
                <Button>Edit</Button>
              </Link>
              <RemoveBtn id={t._id} />
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
