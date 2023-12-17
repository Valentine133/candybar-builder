import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Product } from '@/shared/lib/types/product';
import useAddToCart from '@/shared/hooks/useAddToCart';
import {
  calculateTotalQuantityById, selectCartItemById,
} from '@/shared/lib/redux/slices/cartSlice';
import { getDiscountedPricePercentage } from '@/shared/utils/getDiscountedPricePercentage';

import { ProductDetails } from '@/shared/ui/productDetails';
import { CommonModal } from '@/shared/ui/commonModal';
import { Button } from '@/shared/ui/buttons/simple-btn';
import { WishButton } from '@/features/addToWishlist';
import { BsFillCartCheckFill, BsCart } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal } from '@/shared/lib/redux/slices/modalSlice';

type ProductCardProps = {
  data: Product;
};

export const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const dispatch = useDispatch();
  const p = data?.attributes;
  const id = data?.id;

  const { onClickAdd } = useAddToCart(p, id, p.selectOption);
  const totalQuantity = useSelector(calculateTotalQuantityById(id));
  
  const cartItem = useSelector(selectCartItemById(id));

  const isItemInCart = !!cartItem;

  const handleToogleCartModal = () => {
    dispatch(toggleModal({ modalName: `productModal-${id}` }));
  };

  const productLink = p?.categories
    ? `/catalog/${p.categories.data[0].attributes.slug}/${p?.slug}`
    : '#';

  const handleButtonClick = () => {
    if (p.options.langOption === null) {
      onClickAdd();
    } else {
      handleToogleCartModal();
    }
  };
  console.log(p);

  return (
    <>
      <div
        key={id}
        className="w-full max-w-sm flex flex-col bg-white card-shadow transform hover:scale-105 transition-transform duration-300"
      >
        <div className="product__item--image relative">
          <Link href={productLink}>
            <Image
              className="rounded-t-lg object-cover aspect-square"
              width={500}
              height={500}
              src={p?.thumbnail?.data.attributes.url}
              alt={p?.title}
            />
          </Link>
          <div className="absolute top-2 right-2">
            <WishButton productId={id} />
          </div>
        </div>
        <div className="flex flex-col p-3 md:p-4 pb-3 md:pb-5 h-full">
          <Link className="mb-auto" href={productLink}>
            <h5 className="text-md md:text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {p?.title}
            </h5>
          </Link>
          <div className="py-1"></div>
          <div className="flex flex-wrap items-center justify-between gap-2 mt-4">
            <span className="flex flex-col justify-center">
              {p.original_price && (
                <span className="text-gray-600 text-lg line-through">
                  ${p.original_price} (
                  {getDiscountedPricePercentage(p.original_price, p.price)}%
                  off)
                </span>
              )}
              <span className="text-2xl font-semibold text-gray-900 dark:text-white">
                ${p?.price}
              </span>
            </span>
            <Button
              as="button"
              customClass="min-w-fit"
              onClick={handleButtonClick}
            >
              {isItemInCart ? (
                <>
                  <BsFillCartCheckFill size="20" />
                  <span className="bg-purple-100 text-purple-600 aspect-square h-[1.2rem] rounded-full">
                    {totalQuantity}
                  </span>
                </>
              ) : (
                <BsCart size="20" />
              )}
            </Button>
          </div>
        </div>
      </div>

      <CommonModal
        openStyle="center"
        modalWindowClass="md:w-[70vw]"
        modalName={`productModal-${id}`}
      >
        <ProductDetails product={data} />
      </CommonModal>
    </>
  );
};
