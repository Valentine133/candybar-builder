import React, {
  useState,
  useRef,
  useEffect,
  ReactNode,
  ReactElement,
} from 'react';

interface DropdownProps {
  button: ReactElement;
  children: ReactNode;
  position?: 'left' | 'right' | 'center';
}

export const DropdownMenu: React.FC<DropdownProps> = ({ button, children, position }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      buttonRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleItemClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      {button &&
        React.cloneElement(button, {
          onClick: () => setIsOpen(!isOpen),
          ref: buttonRef,
        })}
      {isOpen && (
        <div
          className={`origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${
            position === 'left'
              ? 'left-0'
              : position === 'right'
              ? 'right-0'
              : 'left-1/2 transform -translate-x-1/2'
          }`}
          ref={dropdownRef}
        >
          <div className="py-1">
            {React.Children.map(children, (child) =>
              React.isValidElement(child)
                ? React.cloneElement(child, { onClick: handleItemClick })
                : child,
            )}
          </div>
        </div>
      )}
    </div>
  );
};
