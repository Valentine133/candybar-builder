"use client"

import React from 'react';
import useCategory from '@/shared/hooks/useCategory';
import { Catalog } from '@/widgets/catalog';
import { GetStaticProps } from 'next';
import fetcher from '@/shared/lib/fetcher/fetcher';

export const CategoryPage = ({
  params,
  products,
}: {
  params: {
    categorySlug: string;
  };
  products: any;
}) => {
  const {
    data: category,
    isLoading,
    error,
  } = useCategory(params.categorySlug as string);
  const slug = params.categorySlug;

  const c = category?.data?.[0]?.attributes;

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl text-center mb-6 font-semibold">{c?.title}</h1>
      <Catalog endpoint="/api/products?populate=*" slug={slug} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const categorySlug = params?.categorySlug as string;
  const endpoint = `/api/products?populate=*&[filters][categories][slug][$eq]=${categorySlug}`;

  try {
    const res = await fetcher(endpoint);
    const products = res;

    return {
      props: {
        params: {
          categorySlug,
        },
        products,
      },
      revalidate: 60, // Adjust revalidation interval as needed
    };
  } catch (error) {
    return {
      props: {
        params: {
          categorySlug,
        },
        products: null,
      },
    };
  }
};
