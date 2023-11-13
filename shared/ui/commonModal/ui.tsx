import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '@/shared/lib/redux/slices/modalSlice';
import { Button } from '@/shared/ui/buttons/simple-btn';

import {AiOutlineClose} from 'react-icons/ai';

interface CommonModalProps {
  children: React.ReactNode;
}

export const CommonModal: FC<CommonModalProps> = ({ children }) => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modal.isOpen);

  const handleModalClose = () => {
    dispatch(closeModal());
  };

  const modalClass = isOpen
    ? 'opacity-100 pointer-events-auto'
    : 'opacity-0 pointer-events-none';

  return (
    <div
      className={`modal z-20 fixed top-0 right-0 h-full w-full ${modalClass} duration-300 ease-in-out`}
    >
      <div
        className={`fixed top-0 right-0 h-full w-full bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out`}
        onClick={handleModalClose}
      ></div>
      <div
        className={`absolute bg-white top-0 right-0 h-full w-full md:w-[400px] pt-[5rem] px-4 transition-transform duration-300 ease-in-out ${
          isOpen
            ? 'opacity-100 translate-x-0 pointer-events-auto'
            : 'opacity-0 translate-x-full pointer-events-none'
        }`}
      >
        <Button
          onClick={handleModalClose}
          customClass="absolute top-4 right-4 px-2 text-white min-w-[36px]"
        >
          <AiOutlineClose size="20"/>
        </Button>
        {children}
      </div>
    </div>
  );
};
