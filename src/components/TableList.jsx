import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card } from './ui/card';
import Link from 'next/link';
import { Button } from './ui/button';
import RemoveBtn from './RemoveBtn';
import { FaEdit } from 'react-icons/fa';

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

export default async function TableList() {
  const { topics } = await getTopics();

  return (
    <Card className='m-5'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='text-center'>Product</TableHead>
            <TableHead className='text-center'>Description</TableHead>
            <TableHead className='text-center'>Amount</TableHead>
            <TableHead className='text-center'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {topics.map((t) => (
            <TableRow key={t._id}>
              <TableCell className='font-medium text-center'>
                {t.title}
              </TableCell>
              <TableCell className='text-center'>{t.description}</TableCell>
              <TableCell className='text-center'>{t.price}</TableCell>
              <TableCell className='flex gap-2 justify-center'>
                <Link href={`/editTopic/${t._id}`}>
                  <Button className='bg-black border group hover:bg-black'>
                    <FaEdit size={16} className='text-gray-400 group-hover:text-gray-200' />
                  </Button>
                </Link>
                <RemoveBtn id={t._id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3} className='text-center'></TableCell>
            <TableCell className='text-center'></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </Card>
  );
}
