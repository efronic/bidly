import {
  LoginLink,
  RegisterLink,
  LogoutLink,
} from '@kinde-oss/kinde-auth-nextjs/components';
import Image from 'next/image';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export async function Header() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <header>
      <nav className='bg-gray-200 nav container'>
        <div className='container flex justify-between py-4 items-center'>
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
              <div className='flex gap-2'>
                <Button>
                  <LoginLink
                    className='btn btn-ghost sign-in-btn'
                    postLoginRedirectURL='/'
                  >
                    Sign in
                  </LoginLink>
                </Button>
                <Button>
                  <RegisterLink
                    className='btn btn-dark'
                    postLoginRedirectURL='/'
                  >
                    Sign up
                  </RegisterLink>
                </Button>
              </div>
            ) : (
              <div className='flex flex-col items-center'>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    {user?.picture ? (
                      <Image
                        className='avata rounded-full'
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
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Link href='/items/create'>Create Auction</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href='/auctions'>My Auctions</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem>
                      <LogoutLink className='text-subtle'>Sign out</LogoutLink>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </>
        </div>
      </nav>
    </header>
  );
}
