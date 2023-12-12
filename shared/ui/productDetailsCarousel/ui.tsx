import React, { FC } from 'react';

import { Carousel } from 'react-responsive-carousel';
import { WishButton } from '@/features/addToWishlist';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './styles.css';

type ProductDetailsCarouselProps = {
  images: string[];
  productId: string;
};

export const ProductDetailsCarousel: FC<ProductDetailsCarouselProps> = ({
  images,
  productId,
}) => {
  return (
    <div className="lg:flex lg:items-start">
      <div className="max-w-2xl relative">
        <Carousel
          infiniteLoop={true}
          showArrows={true}
          showStatus={true}
          thumbWidth={80}
          className="productCarousel"
        >
          {images?.map((image) => (
            <img
              key={image.id}
              className="h-full w-full max-w-full rounded-lg object-cover aspect-square"
              width={800}
              height={800}
              src={image?.attributes.url}
              alt={image?.attributes.title}
            />
          ))}
        </Carousel>
        <div className="absolute top-2 right-2">
          <WishButton productId={productId} />
        </div>
      </div>
    </div>
  );
};
