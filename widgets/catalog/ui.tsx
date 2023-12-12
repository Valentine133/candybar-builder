// components/Catalog.tsx

import React from 'react';
import { ProductList } from '@/entities/products';
import useProducts from '@/shared/hooks/useProducts';
import fetcher from '@/shared/lib/fetcher/fetcher';

type ProductsProps = {
  title?: string;
  endpoint: string;
  slug?: string;
};

export const Catalog: React.FC<ProductsProps> = ({ title, endpoint, slug }) => {
  const categoryFilter = slug
    ? `&[filters][categories][slug][$eq]=${slug}`
    : '';
  const fullEndpoint = `${endpoint}${categoryFilter}`;

  const {
    data: products,
    error,
    isLoading,
  } = useProducts({ endpoint: fullEndpoint });

  return (
    <ProductList
      title={title}
      products={products}
      error={error}
      isLoading={isLoading}
    />
  );
};

export async function getStaticProps() {
  const endpoint = '/api/products?populate=*';

  try {
    const res = await fetcher(endpoint);
    const products = res;

    return {
      props: {
        products,
      },
      revalidate: 60,
    };
  } catch (error) {
    return {
      props: {
        products: null,
      },
    };
  }
}
