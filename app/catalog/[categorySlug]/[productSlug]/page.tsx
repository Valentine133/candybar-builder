import ProductPage from '@/pages/ProductPage';

export default function Product({
  params,
}: {
  params: {
    categorySlug: string;
    productSlug: string;
  };
}) {
  return <ProductPage params={params} />;
}
