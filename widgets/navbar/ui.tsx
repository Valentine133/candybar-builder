'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { NavbarItem } from '@/shared/ui/navbarItem';
import { SearchInput } from '@/shared/ui/inputs/searchInput';
import { ShopBag } from '@/entities/shopBag';
import { ModalButton } from '@/shared/ui/buttons/modalButton';
import { CommonModal } from '@/shared/ui/commonModal';
import { CartList } from '@/entities/cartList';
import { CategoryList } from '@/entities/categories';
import { UserMenu } from '@/entities/userMenu';

import useCategories from '@/shared/hooks/useCategories';

import { GiPartyHat } from 'react-icons/gi';
import { HiOutlineMenuAlt1 } from 'react-icons/hi';

export const Navbar = () => {
  const { data: categories, error, isLoading } = useCategories();
  const [show, setShow] = useState('translate-y-0');
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY) {
        setShow('-translate-y-[100px]');
      } else {
        setShow('shadow-sm');
      }
    } else {
      setShow('translate-y-0');
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    }
  },[lastScrollY]);

  return (
    <>
      <nav
        className={`${show} w-full z-40 transition duration-500 bg-white border-b-2 border-gray-200`}
      >
        <div className="container mx-auto px-4 py-2 md:py-4 flex flex-row items-center">
          <Link href="/" className="text-purple-700 flex flex-row items-center">
            <GiPartyHat size="40" className="mr-2" />{' '}
            <span className="text-md md:text-xl xl:text-2xl font-bold !leading-none hidden md:flex">
              Paper <br />
              pyramid
            </span>
          </Link>

          <div className="flex ml-5">
            <ModalButton style="default" modalName="mobileMenuModal">
              <HiOutlineMenuAlt1 size={20} />
              Categories
            </ModalButton>
          </div>

          <div className="hidden lg:flex flex-row ml-8 mr-4 gap-7 lg-flex">
            <NavbarItem label="Candybar Builder" link="/builder" />
            <NavbarItem label="Catalog" link="/catalog" />
          </div>

          <div className="md:ml-auto mr-4 hidden md:block">
            <SearchInput />
          </div>

          <div className="ml-auto">
            <ShopBag />
          </div>

          <div className="ml-3">{/* <UserMenu /> */}</div>
        </div>
      </nav>

      {/* Modal Windows  */}
      <CommonModal openStyle="right" modalName="cartModal">
        <CartList />
      </CommonModal>
      <CommonModal openStyle="left" modalName="mobileMenuModal">
        <CategoryList categories={categories} error={error} isLoading={isLoading}/>
      </CommonModal>
    </>
  );
}