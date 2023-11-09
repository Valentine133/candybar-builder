import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import Draggable from 'react-draggable';

export const DndProducts = ({ products, onMove }) => {
  // const cartItems = useSelector((state) => state.cart.items);
  const [localProducts, setLocalProducts] = useState([]);

  useEffect(() => {
    setLocalProducts(products);
  }, [products]);

  return (
    <div className="col-span-1 p-4 pt-0 flex flex-col">
      <div className="bg-gray-100 h-[52px] mr-[-1rem] ml-[-1rem] mb-4 py-2 px-4">
        <h2 className="text-xl">Decor items</h2>
      </div>

      <div className="dndProducts__wrapper h-full">
        <div className="grid grid-cols-2 gap-2 overflow-y-auto">
          {localProducts && localProducts.length > 0 ? (
            localProducts?.map((product) =>
              Array.from({ length: product.productImages?.length }).map(
                (_, index) => (
                  <Draggable key={index} onStart={() => false}>
                    <div
                      className="cursor-pointer border border-gray-200 rounded-md overflow-hidden"
                      // style={{
                      //   backgroundImage: `url(${product.productImages[index].productImgUrl})`,
                      //   backgroundSize: 'contain',
                      //   backgroundRepeat: 'no-repeat',
                      //   backgroundPosition: 'center center',
                      // }}
                      onClick={() => onMove(product.productImages[index])}
                    >
                      <img
                        src={product.productImages[index].productImgUrl}
                        alt="fdf"
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
