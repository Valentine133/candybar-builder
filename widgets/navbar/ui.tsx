'use client'
import React, { useCallback, useState } from 'react';
import Link from 'next/link';

import { NavbarItem } from '@/shared/ui/navbarItem';
import { DropdownMenu } from '@/shared/ui/dropDownMenu';
import { SearchInput } from '@/shared/ui/inputs/searchInput';
import { UserMenu } from '@/entities/userMenu';

import { BsChevronDown } from 'react-icons/bs';
import {RiCake3Line} from 'react-icons/ri';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = useCallback(() => {
    setShowDropdown((current) => !current);
  }, []);

  return (
    <nav className="w-full sticky top-0 z-40">
      <div className="px-4 md:px-16 py-4 flex flex-row items-center transition duration-500 bg-white border-b-2 border-gray-200">
        <Link
          href="/"
          className="text-md md:text-2xl xl:text-3xl font-bold text-purple-700 flex flex-row items-center"
        >
          <RiCake3Line size="40" className="mr-2" /> Candybar Builder
        </Link>
        <div className="hidden md:flex flex-row ml-8 gap-7 lg-flex">
          <NavbarItem label="Candybar" />
          <NavbarItem label="Catalog" />
        </div>
        <div
          onClick={toggleDropdown}
          className="md:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative"
        >
          <p className="text-md">Browse</p>
          <BsChevronDown
            className={`transition ${showDropdown ? 'rotate-180' : 'rotate-0'}`}
          />
          <DropdownMenu
            visible={showDropdown}
            onClose={() => setShowDropdown(false)}
          >
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
              <li>
                <Link
                  href="/"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Home
                </Link>
              </li>
            </ul>
          </DropdownMenu>
        </div>
        <div className="ml-auto">
          <SearchInput />
        </div>
        <div className="ml-auto">
          <UserMenu />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;