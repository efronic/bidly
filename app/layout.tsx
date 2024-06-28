import type { Metadata } from 'next';
import { Dosis as FontDosis } from 'next/font/google';
import './globals.css';

import './globals.css';
import { cn } from '@/lib/utils';
import { Header } from './header';

const fontDosis = FontDosis({
  subsets: ['latin'],
  variable: '--font-dosis',
});
export const metadata: Metadata = {
  title: 'Bidly Auctions',
  description: 'Creatd by Efron',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontDosis.variable
        )}
      >
        <Header />
        <main className='container mx-auto py-12'>{children}</main>
      </body>
    </html>
  );
}
