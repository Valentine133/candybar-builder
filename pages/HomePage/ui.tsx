"use client"

import React, { useState } from 'react';

import { Banner } from '@/shared/ui/banner';
import { Catalog } from '@/widgets/catalog';

export const HomePage = () => {
  const [backgroundImageUrl] = useState('images/candy-bar-2.jpg');
  const endpoint = '/api/products?populate=*';
  
  return (
    <>
      <Banner
        title="Candy bar builder"
        description="Create you personal party candy bar visualization"
        backgroundImageUrl={backgroundImageUrl}
        labelBtn="Build a visualization"
        link="/builder"
      />
      <div className="py-8"></div>
      <div className="container mx-auto px-4">
        <Catalog title="Popular products" endpoint={endpoint} />
      </div>
    </>
  );
};
