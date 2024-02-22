'use client';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { FaTrash } from 'react-icons/fa';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export default function RemoveBtn({ id }) {
  const router = useRouter();

  const removeTopic = async () => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/topics?id=${id}`;
    const res = await fetch(apiUrl, {
      method: 'DELETE',
    });

    if (res.ok) {
      router.refresh();
    }
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className='bg-black border group hover:bg-black'>
            <FaTrash className='text-gray-500 group-hover:text-red-500' />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              topic and remove its data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button className='mr-3 text-gray-400'>Cancel</Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                onClick={removeTopic}
                className='bg-red-500 text-gray-200 hover:bg-red-800'
              >
                Delete
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
