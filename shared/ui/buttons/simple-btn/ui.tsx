import React, { ReactNode, ElementType } from 'react';
import Link from 'next/link';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  href?: string;
  select?: boolean;
  children: ReactNode;
  style?: 'default' | 'primary';
  onClick?: () => void;
  width?: 'auto' | 'full';
  customClass?: string;
  as?: ElementType | typeof Link;
}

export const Button: React.FC<ButtonProps> = ({
  type,
  href,
  select,
  children,
  style = 'primary',
  width,
  customClass,
  onClick,
  as,
}) => {
  const buttonClass: string = `btn flex justify-center items-center gap-2 ${
    style === 'primary'
      ? ' btn-primary'
      : style === 'default'
      ? ' btn-default'
      : ''
  }`;

  const buttonWidth: string = `w-${width}`;

  const DEFAULT_ELEMENT: React.ElementType = 'button';
  const Element = as || DEFAULT_ELEMENT;

  if (Element === Link) {
    return (
      <Link
        href={href}
        className={`${buttonClass} ${buttonWidth} ${customClass}`}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }

  return (
    <Element
      type={type}
      href={href}
      className={`${buttonClass} ${buttonWidth} ${customClass}`}
      onClick={onClick}
      disabled={select ? true : false}
    >
      {children}
    </Element>
  );
};
