import React, { ReactNode, useRef, useEffect } from 'react';

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

  useEffect(() => {
    // Add an event listener to the document to handle clicks outside the menu
    const handleClickOutside = (event: MouseEvent) => {
      if (
        visible &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        // Click occurred outside the menu, close the menu
        onClose && onClose(); // Call the optional onClose callback
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [visible, onClose]);

  if (!visible) {
    return null;
  }

  return (
    <div
      ref={dropdownRef}
      id="dropdown"
      className={`z-10 absolute top-9 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 ${
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
