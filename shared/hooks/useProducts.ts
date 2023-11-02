import useSWR from 'swr';

import fetcher from '@/shared/lib/fetcher/fetcher';

const useProducts = () => {
  const { data, error, isLoading } = useSWR('/api/products', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    data,
    error,
    isLoading
  }
};

export default useProducts;