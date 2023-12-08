import React, { FC, ReactNode } from 'react';

interface FooterProps {
  children: ReactNode;
}

export const Footer: FC<FooterProps> = ({ children }) => {
  return (
    <div className="bg-violet-950 text-white py-8">
      <div className="container mx-auto text-center">{children}</div>
    </div>
  );
}
