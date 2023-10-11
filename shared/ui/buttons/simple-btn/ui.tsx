import React, { ReactNode, ElementType } from 'react';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  href?: string;
  select?: boolean;
  icon?: ReactNode;
  label: string;
  style?: 'default' | 'primary';
  onClick?: () => void;
  width?: 'auto' | 'full';
  customClass: string;
  as?: ElementType;
}

export const Button: React.FC<ButtonProps> = ({
  type,
  href,
  select,
  icon,
  label,
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
  
  const DEFAULT_ELEMENT: ElementType = 'button';
  const Element = as || DEFAULT_ELEMENT;

  return (
    <Element
      type={type}
      href={href}
      className={`${buttonClass} ${buttonWidth} ${customClass}`}
      onClick={onClick}
      disabled={select ? true : false}
    >
      {icon}
      {label}
    </Element>
  );
};
