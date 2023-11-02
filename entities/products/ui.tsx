import React from 'react';
import { ProductCard } from '@/entities/product';

type ProductListProps = {
  title: string;
  products: Array<{
    id: string;
    title: string;
    description: string;
    imgUrl: string;
    price: number;
  }>;
  error: any;
  isLoading: boolean;
};

export const ProductList: React.FC<ProductListProps> = ({
  title,
  products,
  error,
  isLoading,
}) => (
  <section>
    <h2 className='text-3xl mb-6 font-bold'>{title}</h2>
    {isLoading && <p>Loading...</p>}
    {error && <p>Error: {error.message}</p>}
    {products?.length === 0 && <p>No products available.</p>}
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4">
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  </section>
);
