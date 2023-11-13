import React, { useRef, useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import html2canvas from 'html2canvas';

import { Button } from '@/shared/ui/buttons/simple-btn';
import { HiOutlineTrash } from 'react-icons/hi';
import { GoDownload } from 'react-icons/go';

export const DndBanners = ({
  rightColumnProducts,
  onRemoveFromRightColumn,
  onRemoveAllFromRightColumn,
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

    html2canvas(bannerRef.current, {
      logging: true,
      LetterRendering: 1,
      allowTaint: true,
      useCORS: true,
    }).then((canvas) => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'composite_image.png';
      link.click();
    });
  };

  const handleRemoveAllFromRightColumn = () => {
    onRemoveAllFromRightColumn(rightColumnProducts);
  };

  const hasDraggableElements =
    localProductsDrop?.some((product) =>
      product.productImages?.length > 0 ? true : false,
    ) || false;

  return (
    <div className="banner-wrapper col-span-4 md:col-span-3 order-first md:order-last">
      <div className="flex justify-between align-items-center h-[52px] py-2 bg-gray-100">
        <div className="flex align-items-center literal-none text-md font-semibold">
          {/* Change background image */}
        </div>
        <Button
          style="primary"
          onClick={handleDownloadImage}
          customClass="me-2 min-w-0"
        >
          <GoDownload size="20" />
          <span className="hidden md:block ml-2">Download image result</span>
        </Button>
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
        {hasDraggableElements && (
          <Button
            style="primary"
            onClick={handleRemoveAllFromRightColumn}
            customClass="absolute top-2 right-2 min-w-[100px]"
          >
            Remove All
          </Button>
        )}
        {localProductsDrop?.map((product, index) =>
          Array.from({ length: product.productImages?.length }).map(
            (_, innerIndex) => (
              <Draggable key={innerIndex} bounds="parent">
                <div className="group/item product__drop w-12 md:w-20 cursor-move absolute">
                  <button
                    className="absolute top-[-0.5rem] right-[-0.5rem] invisible group-hover/item:visible text-white inline-flex items-center justify-center p-1 bg-indigo-500 rounded-md shadow-lg"
                    onClick={() =>
                      onRemoveFromRightColumn(product.productImages[innerIndex])
                    }
                  >
                    <HiOutlineTrash size="20" />
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
