"use client"

import React from 'react';
import { ProductList } from '@/entities/products';
import useProducts from '@/shared/hooks/useProducts';

type ProductsProps = {
  title: string;
};

export const Catalog: React.FC<ProductsProps> = ({ title }) => {
  const { data: products, error, isLoading } = useProducts();
  
  return (
    <ProductList
      title={title}
      products={products}
      error={error}
      isLoading={isLoading}
    />
  );
};
