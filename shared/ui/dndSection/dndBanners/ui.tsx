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
  const [localProductsDrop, setLocalProductsDrop] = useState([]);

   useEffect(() => {
     setLocalProductsDrop(rightColumnProducts);
   }, [rightColumnProducts]);

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
        <div className="flex align-items-center literal-none text-md font-semibold">
          Change background image
        </div>
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
        {localProductsDrop?.map((product, index) =>
          Array.from({ length: product.productImages?.length }).map(
            (_, innerIndex) => (
              <Draggable key={innerIndex} bounds="parent">
                <div
                  className="product__drop w-20 cursor-pointer absolute"
                  // style={{
                  //   backgroundImage: `url(${product.productImages[innerIndex].productImgUrl})`,
                  //   backgroundSize: 'contain',
                  //   backgroundRepeat: 'no-repeat',
                  //   backgroundPosition: 'center center',
                  // }}
                >
                  <button
                    onClick={() =>
                      onRemoveFromRightColumn(product.productImages[innerIndex])
                    }
                  >
                    Remove
                  </button>
                  <img
                    src={product.productImages[innerIndex].productImgUrl}
                    alt="fdf"
                    draggable="false"
                  />
                </div>
              </Draggable>
            ),
          ),
        )}
      </div>
    </div>
  );
};
