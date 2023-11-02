import React from 'react';
import { Catalog } from '@/widgets/catalog';

import { Cart } from '@/widgets/cart';

export const HomePage = () => {
  
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-3 mb-8">
        <div className="col-span-2 xl:col-span-3">
          <div className="">dshsfhsf</div>
          <div className="mt-8">
            <Catalog title="Catalog" />
          </div>
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
