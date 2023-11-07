import React, { useState } from 'react';
import { DndProducts } from '@/shared/ui/dndSection/dndProducts';
import { DndBanners } from '@/shared/ui/dndSection/dndBanners';

export const DndDecorView = ({ items, backgroundImageUrl }) => {
  const [products, setProducts] = useState(items);
  const [rightColumnProducts, setRightColumnProducts] = useState([]);

  const onMove = (product) => {
    setProducts((prevProducts) =>
      prevProducts.filter((p) => p.id !== product.id),
    );
    setRightColumnProducts((prevProducts) => [...prevProducts, product]);
  };

  const onRemoveFromRightColumn = (product) => {
    setRightColumnProducts((prevProducts) =>
      prevProducts.filter((p) => p.id !== product.id),
    );
    setProducts((prevProducts) => [...prevProducts, product]);
  };

  return (
    <div className="grid grid-cols-4 border-2 border-gray-200 rounded-lg">
      <DndProducts products={products} onMove={onMove} />
      <DndBanners
        rightColumnProducts={rightColumnProducts}
        onRemoveFromRightColumn={onRemoveFromRightColumn}
        backgroundImageUrl={backgroundImageUrl}
      />
    </div>
  );
};
