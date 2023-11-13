import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCart } from '@/shared/lib/redux/slices/cartSlice';

import { DndProducts } from '@/shared/ui/dndSection/dndProducts';
import { DndBanners } from '@/shared/ui/dndSection/dndBanners';

interface DndDecorViewProps {
  backgroundImageUrl: string;
}

export const DndDecorView: React.FC<DndDecorViewProps> = ({ backgroundImageUrl }) => {
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

  const onRemoveAllFromRightColumn = (removedProducts) => {
    setRightColumnProducts([]);
    setProducts((prevProducts) => [...prevProducts, ...removedProducts]);
  };

  const onRemoveFromRightColumn = (removedImage) => {
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
        onRemoveAllFromRightColumn={onRemoveAllFromRightColumn}
        onRemoveFromRightColumn={onRemoveFromRightColumn}
        backgroundImageUrl={backgroundImageUrl}
      />
    </div>
  );
};
