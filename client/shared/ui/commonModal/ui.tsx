import React, { FC, CSSProperties } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsOpen } from '@/shared/lib/redux/slices/modalSlice';
import { closeModal } from '@/shared/lib/redux/slices/modalSlice';
import { Button } from '@/shared/ui/buttons/simple-btn';
import { AiOutlineClose } from 'react-icons/ai';

interface CommonModalProps {
  children: React.ReactNode;
  openStyle?: 'center' | 'left' | 'right';
  modalName: string;
}

export const CommonModal: FC<CommonModalProps> = ({
  children,
  openStyle = 'center',
  modalName,
}) => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsOpen(modalName));

  const handleModalClose = () => {
    dispatch(closeModal({ modalName }));
  };

  const modalClass = isOpen
    ? 'opacity-100 pointer-events-auto'
    : 'opacity-0 pointer-events-none';

  // Добавлены стили в зависимости от значения openStyle
  const modalStyles: CSSProperties = {
    center: {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      height: 'auto',
      borderRadius: '20px',
    },
    left: {
      top: '0',
      left: '0',
      transform: 'translateX(0)',
    },
    right: {
      top: '0',
      right: '0',
      transform: 'translateX(0)',
    },
  }[openStyle];

  return (
    <div
      className={`modal top-0 z-20 fixed h-full w-full ${modalClass} duration-300 ease-in-out`}
    >
      <div
        className={`fixed h-full w-full bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out`}
        onClick={handleModalClose}
      ></div>
      <div
        className={`absolute bg-white h-full w-full md:w-[400px] pt-[5rem] px-4 transition-transform duration-300 ease-in-out ${
          isOpen
            ? 'opacity-100 translate-x-0 pointer-events-auto'
            : 'opacity-0 translate-x-full pointer-events-none'
        }`}
        style={modalStyles}
      >
        <Button
          onClick={handleModalClose}
          customClass="absolute top-4 right-4 px-2 text-white min-w-[36px]"
        >
          <AiOutlineClose size="20" />
        </Button>
        {children}
      </div>
    </div>
  );
};
