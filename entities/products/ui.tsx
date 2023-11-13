import React from 'react';
import { ProductCard } from '@/entities/product';
import { SkeletonProduct } from '@/shared/ui/skeleton/skeletonProduct';

type ProductListProps = {
  title: string;
  products: Array<{
    id: string;
    title: string;
    description: string;
    imgUrl: string;
    price: number;
    productImages: string[];
  }>;
  error: any;
  isLoading: boolean;
};

export const ProductList: React.FC<ProductListProps> = ({
  title,
  products,
  error,
  isLoading,
}) => { 
  const skeletons = [...new Array(6)].map((_, index) => (
    <SkeletonProduct key={index} />
  ));

  return (
    <section>
      <h2 className="text-3xl mb-6 font-bold">{title}</h2>
      {isLoading && (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4">
          {skeletons}
        </div>
      )}
      {error && <p>Error: {error.message}</p>}
      {products?.length === 0 && <p>No products available.</p>}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 pb-[4rem]">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );};
