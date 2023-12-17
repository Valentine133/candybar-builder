'use client';

import React, { useState } from 'react';

import { Catalog } from '@/widgets/catalog';

import { Sort } from '@/features/sort';
import {Filters } from '@/features/filters/ui';

export const CatalogPage = () => {
  const endpoint = '/api/products?populate=deep';

  return (
    <div className="container mx-auto px-4 pt-10">
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-4 lg:col-span-1">
          <h2 className="text-2xl mb-6">Filters</h2>
        </div>
        <div className="col-span-4 lg:col-span-3">
          <Catalog title="Catalog" endpoint={endpoint} />
        </div>
      </div>
    </div>
  );
};