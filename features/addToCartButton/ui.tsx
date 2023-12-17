import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useAddToCart from '@/shared/hooks/useAddToCart';
import {
  calculateTotalQuantityById,
  selectCartItemById,
} from '@/shared/lib/redux/slices/cartSlice';
import { Button } from '@/shared/ui/buttons/simple-btn';
import { BsFillCartCheckFill, BsCart } from 'react-icons/bs';

export const AddToCartButton = ({ product, id, selectedOption, error }) => {
  const { onClickAdd } = useAddToCart(product, id, selectedOption);
  const totalQuantity = useSelector(calculateTotalQuantityById(id));
  const cartItem = useSelector(selectCartItemById(id));

  const isItemInCart = !!cartItem;

  const countNestedProperties = (obj) => {
    return obj
      ? Object.values(obj).reduce((count, value) => {
          if (
            typeof value === 'object' &&
            value !== null &&
            !Array.isArray(value)
          ) {
            count += 1;
          }
          return count;
        }, 0)
      : 0;
  };

  const numberOfNestedProperties = countNestedProperties(product?.options);

  const handleAddToCart = () => {
    if (numberOfNestedProperties == Object.keys(selectedOption).length) {
      onClickAdd();
    } else {
      error(true);
    }
  };

  return (
    <Button as="button" customClass="h-[3rem] w-full" onClick={handleAddToCart}>
      {isItemInCart ? (
        <>
          <BsFillCartCheckFill size="20" />{' '}
          <span className="bg-purple-100 text-purple-600 aspect-square h-[1.2rem] rounded-full">
            {totalQuantity}
          </span>
        </>
      ) : (
        <BsCart size="20" />
      )}
      <span className="md:text-lg">Add to cart</span>
    </Button>
  );
};
