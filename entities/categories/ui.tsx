import React from 'react';
import Link from 'next/link';

type CategoryListProps = {
  categories: Array<Category>;
  error?: any;
  isLoading?: boolean;
};

export const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  error,
  isLoading,
}) => {
  return (
    <section>
      {isLoading && <div className="text-gray-700">Loading...</div>}
      {error && <p>Error: {error.message}</p>}
      {categories?.length === 0 && <p>No categories available.</p>}
      <div className="flex flex-col gap-2">
        {categories?.data?.map(({attributes: c, id}) => (
          <Link key={id} href={`/catalog/${c.slug}`} className="hover:text-primary">
            {c.title}
            <span>{`(${c.products.data.length})`}</span>
          </Link>
        ))}
      </div>
    </section>
  );
};
