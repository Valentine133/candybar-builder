"use client"

import React from 'react';

import { ProductList } from '@/entities/products';
import useWishlist from '@/shared/hooks/useWishlist';

export const WishlistPage = () => {
  const { data: wishlist, error, isLoading } = useWishlist();

  return (
    <div className="container mx-auto px-4 pt-10">
      <ProductList
        title="Wishlist"
        products={wishlist}
        error={error}
        isLoading={isLoading}
      />
    </div>
  );
}
