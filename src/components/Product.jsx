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
    <div className='m-5 grid grid-cols-6 gap-4'>
      {topics.map((t) => (
        <Card key={t._id} className='col-span-1'>
          <CardHeader>
            <CardTitle>{t.title}</CardTitle>
            <CardDescription>router @2.86.01</CardDescription>
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
