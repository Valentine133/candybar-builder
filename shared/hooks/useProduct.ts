import useSwr from 'swr'
import fetcher from '@/shared/lib/fetcher/fetcher';

const useProduct = (slug?: string) => {
  const { data, error, isLoading } = useSwr(slug ? `/api/products?populate=deep&filters[slug][$eq]=${slug}` : null, fetcher, {
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

export default useProduct;