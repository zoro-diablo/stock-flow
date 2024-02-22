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

  return (
    <div className=' grid grid-cols-4  gap-2  w-full'>
      {topics.map((t) => (
        <Card key={t._id} className='col-span-1 m-4'>
          <CardHeader>
            <div  className='flex  justify-between'>
              <div>
                <CardTitle>{t.title}</CardTitle>
                <CardDescription>router @2.86.01</CardDescription>
              </div>
              <div>
                <Badge variant='outline' className='text-xl '>₹ {t.price}</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p>{t.description}</p>
          </CardContent>
          <CardFooter className='flex justify-end gap-4'>
            <Link href={`/editTopic/${t._id}`}>
              <Button>Edit</Button>
            </Link>
            <RemoveBtn id={t._id} />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
