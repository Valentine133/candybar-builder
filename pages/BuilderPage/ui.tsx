'use client';

import React, { useState } from 'react';

import { Catalog } from '@/widgets/catalog';
import { DndDecorView } from '@/widgets/dndDecorView';

import { Cart } from '@/widgets/cart';

export const BuilderPage = () => {
  const endpoint = '/api/products?populate=deep';
  const [backgroundImageUrl] = useState('images/empty-template-1.jpg');

  return (
    <div className="container mx-auto px-4 pt-10">
      <DndDecorView backgroundImageUrl={backgroundImageUrl} />
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-3 mt-8 mb-8">
        <div className="col-span-2 xl:col-span-3">
          <Catalog title="Catalog" endpoint={endpoint} />
        </div>
        <div className="col-span-1">
          <div className="sticky top-[6rem]">
            <Cart />
          </div>
        </div>
      </div>
    </div>
  );
};
