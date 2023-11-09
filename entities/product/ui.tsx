'use client'

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  CartItem,
  addItem,
  selectCartItemById,
} from '@/shared/lib/redux/slices/cartSlice';
import { setLocalStorage, getLocalStorage } from '@/shared/utils/localStorage';

import { Button } from '@/shared/ui/buttons/simple-btn';

type ProductCardProps = {
  product: {
    id: string;
    title: string;
    description: string;
    imgUrl: string;
    price: number;
    productImages: string[];
  };
};

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const cartItem = useSelector(selectCartItemById(product.id));

  const addedCount = cartItem ? cartItem.count : 0;

  const onClickAdd = () => {
    const item: CartItem = {
      id: product.id,
      title: product.title,
      imgUrl: product.imgUrl,
      price: product.price,
      count: 1,
      productImages: product.productImages || []
    };
    dispatch(addItem(item));

    const updatedCart = getLocalStorage('cart') || [];
    const existingItem = updatedCart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      existingItem.count++;
    } else {
      updatedCart.push(item);
    }

    setLocalStorage('cart', updatedCart);
  };

  return (
    <div
      key={product.id}
      className="w-full max-w-sm flex flex-col bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <a href="#">
        <img
          className="p-3 md:p-5 rounded-t-lg"
          src={product.imgUrl}
          alt={product.title}
        />
      </a>
      <div className="px-3 md:px-5 pb-3 md:pb-5 mt-auto">
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {product.title}
          </h5>
        </a>
        <div className="py-1">{product.description}</div>
        <div className="flex flex-wrap items-center justify-between gap-2 mt-4">
          <span className="text-2xl font-semibold text-gray-900 dark:text-white">
            ${product.price}
          </span>
          <Button
            label={`Add to cart ${addedCount > 0 ? `(${addedCount})` : ''}`}
            as="button"
            customClass="min-w-fit"
            onClick={onClickAdd}
          />
        </div>
      </div>
    </div>
  );
  };
