import React from 'react';
import Link from 'next/link';

interface INavbarItemProps {
  label: string;
  link: string;
}

export const NavbarItem: React.FC<INavbarItemProps> = ({label, link}) => {
  return (
    <Link href={link} className="cursor-pointer px-2 py-1 inline-block hover:text-purple-700 transition">
      {label}
    </Link>
  )
}