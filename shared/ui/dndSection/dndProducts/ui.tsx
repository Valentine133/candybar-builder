import React from 'react';
import Draggable from 'react-draggable';

export const DndProducts = ({ products, onMove }) => {
  return (
    <div className="col-span-1 p-4 pt-0">
      <div className="bg-gray-100 h-[52px] mr-[-1rem] ml-[-1rem] mb-4 py-2 px-4">
        <h2 className="text-xl">Decor items</h2>
      </div>

      {products && products.length > 0 ? (
        products?.map((product, index) => (
          <Draggable key={product.id} onStart={() => false}>
            <div
              className="w-20 h-20 cursor-pointer"
              style={{
                backgroundImage: `url(${product.imgUrl})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
              }}
              onClick={() => onMove(product)}
            ></div>
          </Draggable>
        ))
      ) : (
        <div className="text-center text-gray-600">Add products to cart</div>
      )}
    </div>
  );
};
