import React from 'react';

interface INavbarItemProps {
  label: string;
}

export const NavbarItem: React.FC<INavbarItemProps> = ({label}) => {
  return (
    <div className="cursor-pointer hover:text-purple-700 transition">
      {label}
    </div>
  )
}