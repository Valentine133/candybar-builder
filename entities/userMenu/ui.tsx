import React, { useCallback, useState } from 'react';
import Link from 'next/link';

import { signOut } from 'next-auth/react';
import useCurrentUser from '@/shared/hooks/useCurrentUser';

import { Button } from '@/shared/ui/buttons/simple-btn';
import { DropdownMenu } from '@/shared/ui/dropDownMenu';
import { links } from './config';

export const UserMenu = () => {
  const { data: user } = useCurrentUser();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const toggleUserMenu = useCallback(() => {
    setShowUserMenu((current) => !current);
  }, []);

  const isAuthenticated = user != null;

  return (
    <div className="flex items-center relative md:order-2">
      {!isAuthenticated ? (
        <Button label="Sign In" href="auth" as="a" customClass="min-w-fit" />
      ) : (
        <>
          <button
            type="button"
            className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            onClick={toggleUserMenu}
          >
            <img
              className="w-10 h-10 rounded-full bg-gray-400"
              src={user?.image}
              alt="user photo"
            />
          </button>

          <DropdownMenu
            visible={showUserMenu}
            onClose={() => setShowUserMenu(false)}
            position="right"
          >
            <div className="px-4 py-3">
              <span className="block text-md text-gray-900 dark:text-white">
                {user?.name}
              </span>
              <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                {user?.email}
              </span>
            </div>
            <ul className="py-2" aria-labelledby="user-menu-button">
              {links.map(({ link, title }) => {
                return (
                  <li
                    key={title}
                    className="block text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    <Link className="block px-4 py-2" href={link}>
                      {title}
                    </Link>
                  </li>
                );
              })}
              <li>
                <a
                  href="#"
                  onClick={() => signOut()}
                  className="block px-4 py-2 text-sm text-gray-700 font-bold hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Sign out
                </a>
              </li>
            </ul>
          </DropdownMenu>
        </>
      )}
    </div>
  );
}
