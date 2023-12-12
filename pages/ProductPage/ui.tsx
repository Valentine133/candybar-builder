'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import useProduct from '@/shared/hooks/useProduct';

import { ProductDetails } from '@/shared/ui/productDetails';
import {IoMdArrowBack} from 'react-icons/io';
import { Catalog } from '@/widgets/catalog';

export const ProductPage = ({
  params,
}: {
  params: {
    categorySlug: string;
    productSlug: string;
  };
}) => {
  const router = useRouter();

  const {
    data: product,
    isLoading,
    error,
  } = useProduct(params.productSlug as string);

  return (
    <div className="container px-4 mx-auto pt-10 pb-8">
      <nav
        className="flex flex-row items-center gap-3 cursor-pointer"
        onClick={() => router.push(`/catalog/${params.categorySlug}`)}
      >
        <IoMdArrowBack size={20} />
        <p className="text-md md:text-lg">Back to category</p>
      </nav>

      <ProductDetails product={product} />

      <div className="pt-10">
        <Catalog
          title="Similar products"
          endpoint="/api/products?populate=*"
          slug={params.categorySlug}
        />
      </div>
    </div>
  );
};