import { Inter } from 'next/font/google';
import Head from 'next/head';
import './globals.css';
import Navbar from '@/components/Navbar';

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
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link rel='manifest' href='/site.webmanifest' />
      </Head>
      <body className={inter.className}>
        <div className='m-2'>
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
