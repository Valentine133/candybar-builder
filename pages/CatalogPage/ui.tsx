'use client';

import React, { useState } from 'react';

import { Catalog } from '@/widgets/catalog';

export const CatalogPage = () => {
  return (
    <div className="container mx-auto px-4 pt-10">
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-4 lg:col-span-1">Filters</div>
        <div className="col-span-4 lg:col-span-3">
          <Catalog title="Catalog" />
        </div>
      </div>
    </div>
  );
};
