"use client"

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  selectCart,
} from '@/shared/lib/redux/slices/cartSlice';

import { Catalog } from '@/widgets/catalog';
import { DndDecorView } from '@/widgets/dndDecorView';

import { Cart } from '@/widgets/cart';

export const HomePage = () => {
  const { items } = useSelector(selectCart);

  const [backgroundImageUrl] = useState('images/candy-bar-2.jpg');
  
  return (
    <>
      <DndDecorView items={items} backgroundImageUrl={backgroundImageUrl} />
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-3 mt-8 mb-8">
        <div className="col-span-2 xl:col-span-3">
            <Catalog title="Catalog" />
        </div>
        <div className="col-span-1">
          <div className="sticky top-[6rem]">
            <Cart />
          </div>
        </div>
      </div>
    </>
  );
};
