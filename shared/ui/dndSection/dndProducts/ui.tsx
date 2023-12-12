import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Draggable from 'react-draggable';

import { Product, ProductImage } from '@/shared/lib/types/product';

type DndProductsProps = {
  products: Product[];
  onMove: (movedImage: ProductImage) => void;
};

export const DndProducts: React.FC<DndProductsProps> = ({ products, onMove }) => {
  // const cartItems = useSelector((state) => state.cart.items);
  const [localProducts, setLocalProducts] = useState<Product[]>([]);
  console.log(products[0]);
  useEffect(() => {
    setLocalProducts(products);
  }, [products]);

  return (
    <div className="col-span-4 md:col-span-1 flex flex-col">
      <div className="bg-gray-100 h-[52px] py-2 px-4">
        <h2 className="text-xl font-semibold">Decor items</h2>
      </div>

      <div className="dndProducts__wrapper overflow-y-auto md:max-h-[308px] lg:max-h-[416px] xl:max-h-[524px] 2xl:max-h-[632px] p-4">
        <div className="grid grid-cols-3 md:grid-cols-2 xl:grid-cols-3 gap-2 ">
          {localProducts && localProducts.length > 0 ? (
            localProducts?.map((product) =>
              Array.from({ length: product?.image?.data?.length }).map(
                (_, index) => (
                  <Draggable key={index} onStart={() => false}>
                    <div
                      className="group/item cursor-pointer transition border border-gray-200 rounded-md overflow-hidden"
                      onClick={() => onMove(product?.image?.data?.[index])}
                    >
                      <div className="w-full h-full absolute inset-0 invisible group-hover/item:visible text-white text-center leading-none font-semibold bg-purple-900 bg-opacity-60 transition flex items-center justify-center p-2">
                        Click me
                      </div>
                      <Image
                        width={200}
                        height={200}
                        src={product?.image?.data?.[index].attributes.url}
                        alt={product?.image?.data?.[index].attributes.name}
                        className="object-cover aspect-square rounded-md"
                        draggable="false"
                      />
                    </div>
                  </Draggable>
                ),
              ),
            )
          ) : (
            <div className="text-center text-gray-600 col-span-2">
              Add products to cart
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
