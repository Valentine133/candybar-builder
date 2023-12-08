import CategoryPage from "@/pages/CategoryPage";

export default function Category({
  params,
}: {
  params: {
    categorySlug: string;
  };
}) {
  return <CategoryPage params={params} />;
}
