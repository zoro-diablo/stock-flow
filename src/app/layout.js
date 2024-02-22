import { Inter } from 'next/font/google';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import BadgeBtn from '@/components/BadgeBtn';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Stock Flow',
  description: 'A simple task management app',
  keywords:
    'task, management, app , stock, flow, stockflow, stock flow, task management, task management app, simple task management app, simple task management, simple task app, simple app, simple, task app, task app, management app, app, stock, flow, stockflow, stock flow, task management, task management app, simple task management app, simple task management, simple task app, simple app, simple, task app, task app, management app, app, stock, flow, stockflow, stock flow, task management, task management app, simple task management app, simple task management, simple task app, simple app, simple, task app, task app, management app, app, stock, flow, stockflow, stock flow, task management, task management app, simple task management app, simple task management, simple task app, simple app, simple, task app, task app, management app, app, stock, flow, stockflow, stock flow, task management, task management app, simple task management app, simple task management, simple task app, simple app, simple, task app, task app, management app, app, stock, flow, stockflow, stock flow, task management, task management app, simple task management app, simple task management, simple task app, simple app, simple, task app, task app, management app, app, stock, flow, stockflow, stock flow, task management, task management app, simple task management app, simple task management, simple task app, simple app, simple, task app, task app, management app, app, stock, flow, stockflow, stock flow, task management, task management app, simple task management app, simple task management, simple task app, simple app, simple, task app, task app, management app, app, stock, flow, stockflow, stock flow, task management, task management app, simple task management app, simple task management, simple task app, simple app, simple, task app, task app, management app, app, stock, flow, stockflow, stock flow, task management, task management app, simple task management app, simple task management, simple task app, simple app, simple, task app, task app, management app, app, stock, flow, stockflow, stock flow, task management, task management app, simple task management app, simple task management, simple task app, simple app, simple, task app, task app',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <Head>
        <link rel='icon' href='/logo.png' />
      </Head>
      <body className={inter.className}>
        <div className='m-2'>
          <Navbar />
          {children}
          <BadgeBtn />
        </div>
      </body>
    </html>
  );
}
