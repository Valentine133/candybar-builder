// CartModal.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, selectIsOpen } from '@/shared/lib/redux/slices/modalSlice';
import { CommonModal } from '@/shared/ui/commonModal';
import { CartList } from '@/entities/cartList';

export const CartModal: React.FC = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsOpen);

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <CommonModal isOpen={isOpen} onClose={handleCloseModal}>
      <CartList />
    </CommonModal>
  );
};
