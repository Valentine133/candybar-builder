import React, { ReactNode, useRef, useEffect, useState } from 'react';

interface IDropdownMenuProps {
  visible?: boolean;
  children?: ReactNode;
  position?: 'left' | 'right' | 'center';
  onClose?: () => void;
}

export const DropdownMenu: React.FC<IDropdownMenuProps> = ({
  visible,
  children,
  position,
  onClose,
}) => {
  const dropdownRef = useRef(null);
  const menuButtonRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        menuButtonRef.current &&
        menuButtonRef.current.contains(event.target)
      ) {
        // Clicked the menu button, toggle the menu
        setIsOpen(!isOpen);
      } else if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        // Click occurred outside the menu, close the menu
        onClose && onClose();
      }
    };

    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [isOpen, onClose]);

  if (!visible) {
    return null;
  }

  return (
    <div
      ref={dropdownRef}
      className={`z-10 absolute top-10 min-w-[200px] bg-white divide-y divide-gray-100 rounded-lg shadow w-46 dark:bg-gray-700 ${
        position === 'left'
          ? 'left-0'
          : position === 'right'
          ? 'right-0'
          : 'left-1/2 transform -translate-x-1/2'
      }`}
    >
      {children}
    </div>
  );
};
