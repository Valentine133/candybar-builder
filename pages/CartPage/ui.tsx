import React from 'react';
import { CartList } from '@/entities/cartList';

export const CartPage = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold text-center mb-10">
        Shopping Cart
      </h1>

      <div className="grid grid-cols-5 gap-4 lg:gap-20">
        <div className="col-span-5 md:col-span-3">
          <CartList />
        </div>
        <div className="col-span-5 md:col-span-2">
          <div className="bg-white card-shadow p-4">
            dgsfg
          </div>
        </div>
      </div>
    </div>
  );
}
