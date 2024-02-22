import { Button } from '@/components/ui/button';
import { IoIosAdd } from 'react-icons/io';
import Link from 'next/link';

const BadgeBtn = () => {
  return (
    <div className="fixed bottom-6 right-6"> 
      <Link href={'/addTopic'}>
        <Button size='icon' className='group'>
          <IoIosAdd size={30} className='group-hover:text-gray-500' />
        </Button>
      </Link>
    </div>
  );
};

export default BadgeBtn;
