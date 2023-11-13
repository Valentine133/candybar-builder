'use client'
import React, { useCallback, useState } from 'react';
import Link from 'next/link';

import { NavbarItem } from '@/shared/ui/navbarItem';
import { DropdownMenu } from '@/shared/ui/dropDownMenu';
import { SearchInput } from '@/shared/ui/inputs/searchInput';
import { UserMenu } from '@/entities/userMenu';
import { ShopBag } from '@/entities/shopBag';

import { CartModal } from '@/widgets/cartModal';

import { BsChevronDown } from 'react-icons/bs';
import { GiPartyHat } from 'react-icons/gi';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const triggerButton = (
    <div
      className="lg:hidden flex flex-row items-center gap-2 ml-4 md:ml-8 mr-auto cursor-pointer relative"
      onClick={() => setIsMenuOpen(!isMenuOpen)}
    >
      <p className="text-md">Menu</p>
      <BsChevronDown
        className={`transition transform ${
          isMenuOpen ? 'rotate-180' : 'rotate-0'
        }`}
      />
    </div>
  );

  return (
    <>
      <nav className="w-full z-40 transition duration-500 bg-white border-b-2 border-gray-200">
        <div className="container mx-auto px-4 py-2 md:py-4 flex flex-row items-center">
          <Link href="/" className="text-purple-700 flex flex-row items-center">
            <GiPartyHat size="40" className="mr-2" />{' '}
            <span className="text-md md:text-xl xl:text-2xl font-bold !leading-none hidden md:flex">
              Paper <br />
              pyramid
            </span>
          </Link>

          <div className="hidden lg:flex flex-row ml-8 mr-4 gap-7 lg-flex">
            <NavbarItem label="Candybar Builder" link="/builder" />
            <NavbarItem label="Catalog" link="/catalog" />
          </div>

          <DropdownMenu button={triggerButton} position='left'>
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
              <li>
                <NavbarItem label="Candybar Builder" link="/builder" />
              </li>
              <li>
                <NavbarItem label="Catalog" link="/catalog" />
              </li>
            </ul>
          </DropdownMenu>

          <div className="md:ml-auto mr-4 hidden md:block">
            <SearchInput />
          </div>

          <div className="ml-auto">
            <ShopBag />
          </div>

          <div className="ml-3">
            <UserMenu />
          </div>
        </div>
      </nav>
      <CartModal />
    </>
  );
}