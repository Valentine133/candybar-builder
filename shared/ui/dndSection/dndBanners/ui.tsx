"use client"

import React, { useRef, useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import html2canvas from 'html2canvas';

import { Button } from '@/shared/ui/buttons/simple-btn';

export const DndBanners = ({
  rightColumnProducts,
  onRemoveFromRightColumn,
  backgroundImageUrl,
}) => {
  const bannerRef = useRef(null);
  const [areImagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const productImages = document.querySelectorAll('.product__drop');
    const loadImagePromises = Array.from(productImages).map((img) => {
      return new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });
    });

    Promise.all(loadImagePromises)
      .then(() => setImagesLoaded(true))
      .catch(() => setImagesLoaded(false));
  }, []);

  const handleDownloadImage = () => {
    if (!areImagesLoaded) {
      alert('Please wait for product images to load.');
      return;
    }

    html2canvas(bannerRef.current).then((canvas) => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'composite_image.png';
      link.click();
    });
  };

  return (
    <div className="banner-wrapper col-span-3">
      <div className="flex justify-between align-items-center py-2 bg-gray-100">
        <div className="text-xl">Filters</div>
        <Button
          label="Download image result"
          style="primary"
          onClick={handleDownloadImage}
          customClass="me-2"
        />
      </div>
      <div
        className="aspect-video bg-gray-200 relative"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
        }}
        ref={bannerRef}
      >
        {rightColumnProducts.map((product, index) => (
          <Draggable key={product.id} bounds="parent">
            <div
              className="product__drop w-20 h-20 cursor-pointer absolute"
              style={{
                backgroundImage: `url(${product.imgUrl})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
              }}
            >
              <button onClick={() => onRemoveFromRightColumn(product)}>
                Remove
              </button>
            </div>
          </Draggable>
        ))}
      </div>
    </div>
  );
};
