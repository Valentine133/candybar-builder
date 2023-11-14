import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addItem,
  selectCartItemById,
} from '@/shared/lib/redux/slices/cartSlice';
import { setLocalStorage, getLocalStorage } from '@/shared/utils/localStorage';
import { openModal } from '@/shared/lib/redux/slices/modalSlice';
import Link from 'next/link';
import { Product } from '@/shared/lib/types/product';

import { Button } from '@/shared/ui/buttons/simple-btn';
import { WishButton } from '@/features/addToWishlist';
import { BsFillCartCheckFill, BsCart } from 'react-icons/bs';

type ProductCardProps = {
  product: Product;
};

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const cartItem = useSelector(selectCartItemById(product.id));

  const onClickAdd = () => {
    const existingItem = cartItem;

    if (existingItem) {
      dispatch(openModal());
    } else {
      const item: Product = {
        id: product.id,
        title: product.title,
        imgUrl: product.imgUrl,
        description: product.description,
        price: product.price,
        count: 1,
        productImages: product.productImages || [],
      };
      dispatch(addItem(item));

      const updatedCart: Product[] = getLocalStorage('cart') || [];
      updatedCart.push(item);
      setLocalStorage('cart', updatedCart);
    }

    // Open a modal window when adding an item to cart
    // dispatch(openModal());
  };

  return (
    <div
      key={product.id}
      className="w-full max-w-sm flex flex-col bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <div className="product__item--image relative">
        <Link href="#">
          <img
            className="p-3 md:p-5 rounded-t-lg"
            src={product.imgUrl}
            alt={product.title}
          />
        </Link>
        <div className="absolute top-2 right-2">
          <WishButton productId={product.id} />
        </div>
      </div>
      <div className="px-3 md:px-5 pb-3 md:pb-5 mt-auto">
        <Link href="#">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {product.title}
          </h5>
        </Link>
        <div className="py-1">{product.description}</div>
        <div className="flex flex-wrap items-center justify-between gap-2 mt-4">
          <span className="text-2xl font-semibold text-gray-900 dark:text-white">
            ${product.price}
          </span>
          <Button as="button" customClass="min-w-fit" onClick={onClickAdd}>
            {cartItem ? (
              <BsFillCartCheckFill size="20" />
            ) : (
              <BsCart size="20" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
