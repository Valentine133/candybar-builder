import useSWR from 'swr';
import fetcher from '@/shared/lib/fetcher/fetcher';

const useWishlist = () => {
  const { data, error, isLoading, mutate} = useSWR('/api/wishlist', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    data,
    error,
    isLoading,
    mutate,
  }
};

export default useWishlist;