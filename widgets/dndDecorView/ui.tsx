import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCart } from '@/shared/lib/redux/slices/cartSlice';

import { DndProducts } from '@/shared/ui/dndSection/dndProducts';
import { DndBanners } from '@/shared/ui/dndSection/dndBanners';

import { Product, ProductImage } from '@/shared/lib/types/product';

interface DndDecorViewProps {
  backgroundImageUrl: string;
}

export const DndDecorView: React.FC<DndDecorViewProps> = ({
  backgroundImageUrl,
}) => {
  const { items } = useSelector(selectCart);
  const [products, setProducts] = useState(items);
  const [rightColumnProducts, setRightColumnProducts] = useState<{
    id: string;
    image: { data: ProductImage[] }[];
  }>([]);

  useEffect(() => {
    setProducts(items);
  }, [items]);

  const onMove = (movedImage: ProductImage, index: number) => {
    const updatedProducts = products.map((product) => {
      const updatedImages = product?.image?.data?.filter(
        (image) => image.id !== movedImage.id,
      );
      return { ...product, image: { data: updatedImages } };
    });

    setProducts(updatedProducts);

    setRightColumnProducts((prevProducts) => [
      ...prevProducts,
      { id: movedImage.id, image: { data: [movedImage] } },
    ]);
  };

  const onRemoveAllFromRightColumn = (removedProducts) => {
    setRightColumnProducts([]);
    setProducts((prevProducts) => [...prevProducts, ...removedProducts]);
  };

  const onRemoveFromRightColumn = (removedImage, index) => {
    const updatedRightColumnProducts = rightColumnProducts.map((product) => {
      const updatedImages = product?.image?.data?.filter(
        (image) => image.id !== removedImage.id,
      );
      return { ...product, image: { data: updatedImages } };
    });

    setRightColumnProducts(updatedRightColumnProducts);
    setProducts((prevProducts) => [
      ...prevProducts,
      { id: removedImage.id, image: { data: [removedImage] } },
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
