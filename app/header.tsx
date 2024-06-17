import {
  LoginLink,
  RegisterLink,
  LogoutLink,
} from '@kinde-oss/kinde-auth-nextjs/components';
import Image from 'next/image';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import Link from 'next/link';

export async function Header() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <header>
      <nav className='bg-gray-200 nav container'>
        <div className='container flex justify-between'>
          <>
            <Link
              className='flex items-center gap-2 text-xl hover:underline'
              href='/'
            >
              <Image
                src='/assets/logo.png'
                width='60'
                height='60'
                alt='the application icon of a howling wolf'
              />
              Bidly
            </Link>

            {!(await isAuthenticated()) ? (
              <>
                <LoginLink
                  className='btn btn-ghost sign-in-btn'
                  postLoginRedirectURL='/'
                >
                  Sign in
                </LoginLink>
                <RegisterLink className='btn btn-dark' postLoginRedirectURL='/'>
                  Sign up
                </RegisterLink>
              </>
            ) : (
              <div>
                {user?.picture ? (
                  <Image
                    className='avatar'
                    src={user?.picture}
                    alt='user profile avatar'
                    referrerPolicy='no-referrer'
                    width='50'
                    height='50'
                  />
                ) : (
                  <div className='avatar'>
                    {user?.given_name?.[0]}
                    {user?.family_name?.[0]}
                  </div>
                )}
                <p className='text-heading-2'>
                  {user?.given_name} {user?.family_name}
                </p>
                <LogoutLink className='text-subtle'>Sign out</LogoutLink>
              </div>
            )}
          </>
        </div>
      </nav>
    </header>
  );
}
