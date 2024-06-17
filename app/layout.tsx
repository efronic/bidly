import type { Metadata } from 'next';
import { Dosis as FontDosis } from 'next/font/google';
import './globals.css';
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from '@kinde-oss/kinde-auth-nextjs/components';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import Link from 'next/link';
import './globals.css';
import { cn } from '@/lib/utils';
import Image from 'next/image';

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
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <html lang='en'>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontDosis.variable
        )}
      >
        <header>
          <nav className='nav container'>
            <h1 className='text-display-3'>Bidly Auctions</h1>
            <div>
              {!(await isAuthenticated()) ? (
                <>
                  <LoginLink
                    className='btn btn-ghost sign-in-btn'
                    postLoginRedirectURL='/'
                  >
                    Sign in
                  </LoginLink>
                  <RegisterLink
                    className='btn btn-dark'
                    postLoginRedirectURL='/'
                  >
                    Sign up
                  </RegisterLink>
                </>
              ) : (
                <div className='profile-blob'>
                  {user?.picture ? (
                    <Image
                      className='avatar'
                      src={user?.picture}
                      alt='user profile avatar'
                      referrerPolicy='no-referrer'
                      width={40}
                      height={40}
                    />
                  ) : (
                    <div className='avatar'>
                      {user?.given_name?.[0]}
                      {user?.family_name?.[0]}
                    </div>
                  )}
                  <div>
                    <p className='text-heading-2'>
                      {user?.given_name} {user?.family_name}
                    </p>

                    <LogoutLink className='text-subtle'>Log out</LogoutLink>
                  </div>
                </div>
              )}
            </div>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
