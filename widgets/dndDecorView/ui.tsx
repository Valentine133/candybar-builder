import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCart } from '@/shared/lib/redux/slices/cartSlice';

import { DndProducts } from '@/shared/ui/dndSection/dndProducts';
import { DndBanners } from '@/shared/ui/dndSection/dndBanners';

export const DndDecorView = ({ backgroundImageUrl }) => {
  const { items } = useSelector(selectCart);
  const [products, setProducts] = useState(items);
  const [rightColumnProducts, setRightColumnProducts] = useState([]);
  
  useEffect(() => {
    setProducts(items);
  }, [items]);

  const onMove = (movedImage) => {
    const updatedProducts = products.map((product) => {
      const updatedImages = product.productImages.filter(
        (image) => image.id !== movedImage.id,
      );
      return { ...product, productImages: updatedImages };
    });

    setProducts(updatedProducts);
    setRightColumnProducts((prevProducts) => [
      ...prevProducts,
      { id: movedImage.id, productImages: [movedImage] },
    ]);
  };

  const onRemoveFromRightColumn = (removedImage) => {
    // Find the product containing the removed image
    const updatedRightColumnProducts = rightColumnProducts.map((product) => {
      const updatedImages = product.productImages.filter(
        (image) => image.id !== removedImage.id,
      );
      return { ...product, productImages: updatedImages };
    });

    setRightColumnProducts(updatedRightColumnProducts);
    setProducts((prevProducts) => [
      ...prevProducts,
      { id: removedImage.id, productImages: [removedImage] },
    ]);
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
