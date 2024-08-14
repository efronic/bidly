'use client';
import {
  LoginLink,
  RegisterLink,
  LogoutLink,
} from '@kinde-oss/kinde-auth-nextjs/components';
import Image from 'next/image';
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
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
import {
  NotificationCell,
  NotificationFeedPopover,
  NotificationIconButton,
} from "@knocklabs/react";
import { useRef, useState } from 'react';

export function Header() {
  const { user, getUser } = useKindeBrowserClient();
  const { isAuthenticated } = useKindeBrowserClient();
  const [isVisible, setIsVisible] = useState(false);
  const notifButtonRef = useRef(null);

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

            {!isAuthenticated ? (
              <div className='flex gap-2'>
                <Button>
                  <LoginLink
                    className='btn btn-ghost sign-in-btn'
                    postLoginRedirectURL='/register'
                  >
                    Sign in
                  </LoginLink>
                </Button>
                <Button>
                  <RegisterLink
                    className='btn btn-dark'
                    postLoginRedirectURL='/register'
                  >
                    Sign up
                  </RegisterLink>
                </Button>

              </div>
            ) : (
              <div className='flex gap-3 items-center'>
                <NotificationIconButton
                  ref={notifButtonRef}
                  onClick={(e) => setIsVisible(!isVisible)}
                />
                <NotificationFeedPopover
                  buttonRef={notifButtonRef}
                  isVisible={isVisible}
                  onClose={() => setIsVisible(false)}
                  renderItem={({ item, ...props }) => (
                    <NotificationCell {...props} item={item}>
                      <div className="rounded-xl">
                        <Link
                          className="text-blue-400 hover:text=blue-500"
                          onClick={() => {
                            setIsVisible(false);
                          }}
                          href={`/items/${item?.data?.itemId}`}
                        >
                          Someone outbidded you on{" "}
                          <span className="font-bold">{item?.data?.itemName}</span>{" "}
                          by ${item?.data?.bidAmount}
                        </Link>
                      </div>
                    </NotificationCell>
                  )}
                />
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
