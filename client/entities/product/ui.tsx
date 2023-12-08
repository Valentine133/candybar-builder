import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/shared/lib/types/product';
import useAddToCart from '@/shared/hooks/useAddToCart';
import { getDiscountedPricePercentage } from '@/shared/utils/getDiscountedPricePercentage';

import { Button } from '@/shared/ui/buttons/simple-btn';
import { WishButton } from '@/features/addToWishlist';
import { BsFillCartCheckFill, BsCart } from 'react-icons/bs';

type ProductCardProps = {
  data: Product;
};

export const ProductCard: React.FC<ProductCardProps> = ({ data: {attributes: p, id} }) => {
  const { onClickAdd, isItemInCart } = useAddToCart(p);
  console.log(p);
  const productLink = p?.categories
    ? `/catalog/${p.categories.data[0].attributes.slug}/${p?.slug}`
    : '#';

  return (
    <div
      key={p.id}
      className="w-full max-w-sm flex flex-col bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <div className="product__item--image relative">
        <Link href={productLink}>
          <Image
            className="p-3 md:p-5 rounded-t-lg"
            width={500}
            height={500}
            src={p?.thumbnail?.data.attributes.url}
            alt={p?.title}
          />
        </Link>
        <div className="absolute top-2 right-2">
          <WishButton productId={p?.id} />
        </div>
      </div>
      <div className="px-3 md:px-5 pb-3 md:pb-5 mt-auto">
        <Link href={productLink}>
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {p?.title}
          </h5>
        </Link>
        {/* <div className="py-1">{p?.description}</div> */}
        <div className="py-1"></div>
        <div className="flex flex-wrap items-center justify-between gap-2 mt-4">
          <span className="flex flex-col justify-center">
            {p.original_price && (
              <span className="text-gray-600 text-lg line-through">
                ${p.original_price} (
                {getDiscountedPricePercentage(p.original_price, p.price)}% off)
              </span>
            )}
            <span className="text-2xl font-semibold text-gray-900 dark:text-white">
              ${p?.price}
            </span>
          </span>
          <Button as="button" customClass="min-w-fit" onClick={onClickAdd}>
            {isItemInCart ? (
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
