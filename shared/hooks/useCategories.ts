import useSWR from 'swr';
import fetcher from '@/shared/lib/fetcher/fetcher';

const useCategories = () => {
  const { data, error } = useSWR(`/api/categories?populate=*`, fetcher, {
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

export default useCategories;
