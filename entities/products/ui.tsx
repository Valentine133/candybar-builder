import React from 'react';
import { ProductCard } from '@/entities/product';
import { Product } from '@/shared/lib/types/product';

import { SkeletonProduct } from '@/shared/ui/skeleton/skeletonProduct';

type ProductListProps = {
  title?: string;
  products: Array<Product>;
  error?: any;
  isLoading?: boolean;
};

export const ProductList: React.FC<ProductListProps> = ({
  title,
  products,
  error,
  isLoading,
}) => { 
  const skeletons = [...new Array(8)].map((_, index) => (
    <SkeletonProduct key={index} />
  ));

  return (
    <section>
      {title && <h2 className="text-3xl mb-6 font-semibold">{title}</h2>}
      {isLoading ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4">
          {skeletons}
        </div>
      ) : (
        <>
          {products?.data?.length === 0 && <p>No products available.</p>}
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 pb-[4rem]">
            {products?.data?.map((product) => (
              <ProductCard key={product?.id} data={product} />
            ))}
          </div>
        </>
      )}
      {error && <p>Error: {error.message}</p>}
    </section>
  );};
