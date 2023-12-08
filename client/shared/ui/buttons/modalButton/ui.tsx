import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleModal } from '@/shared/lib/redux/slices/modalSlice';
import { Button, ButtonProps } from '@/shared/ui/buttons/simple-btn';

interface ModalButtonProps extends ButtonProps {
  modalName: string;
  children: React.ReactNode;
}

export const ModalButton: React.FC<ModalButtonProps> = ({
  modalName,
  children,
  ...buttonProps
}) => {
  const dispatch = useDispatch();

  const handleButtonClick = () => {
    dispatch(toggleModal({ modalName }));
  };

  return (
    <Button onClick={handleButtonClick} {...buttonProps}>
      {children}
    </Button>
  );
};