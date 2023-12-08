'use client'

import useSWR from 'swr';
import fetcher from '@/shared/lib/fetcher/fetcher';

type UseProductsOptions = {
  endpoint: string;
};

const useProducts = ({ endpoint }: UseProductsOptions) => {
  const { data, error } = useSWR(endpoint, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const isLoading = !data && !error;

  return {
    data,
    error,
    isLoading,
  };
};

export default useProducts;
