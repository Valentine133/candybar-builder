'use client';

import React, { useState } from 'react';
import useProducts from '@/shared/hooks/useProducts';

import { Catalog } from '@/widgets/catalog';
// import { GetStaticProps } from 'next';
// import fetcher from '@/shared/lib/fetcher/fetcher';

import { Sort } from '@/features/sort';
import {Filters } from '@/features/filters/ui';

export const CatalogPage = () => {

  return (
    <div className="container mx-auto px-4 pt-10">
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-4 lg:col-span-1">
          <h2 className="text-2xl mb-6">Filters</h2>
        </div>
        <div className="col-span-4 lg:col-span-3">
          <Catalog
            title="Catalog"
            endpoint="/api/products?populate=*"
          />
        </div>
      </div>
    </div>
  );
};