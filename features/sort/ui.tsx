import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSort, setSort } from '@/shared/lib/redux/slices/filterSlice';

import { Product } from '@/shared/lib/types/product';

type SortProps = {
  products: Product[];
};

type SortListItem = {
  name: string;
  sortProperty: 'rating' | 'price' | '-price' | 'title' | '-rating';
};

export const listPopup: SortListItem[] = [
  { name: 'popularity', sortProperty: 'rating' },
  { name: 'price low to high', sortProperty: 'price' },
  { name: 'price high to low', sortProperty: '-price' },
  { name: 'title', sortProperty: 'title' },
  { name: 'popularity high to low', sortProperty: '-rating' },
];

export const Sort: React.FC<SortProps> = memo(({ products }) => {
  const sort = useSelector(selectSort);
  const dispatch = useDispatch();

  const handleSortChange = (
    sortProperty: 'rating' | 'price' | '-price' | 'title' | '-rating',
  ) => {
    dispatch(setSort({ name: sort.name, sortProperty }));
  };

  return (
    <div className="sort flex items-center">
      <div className="mr-5 font-semibold hidden md:flex">Sort by:</div>
      <div className="sort__list flex flex-wrap gap-3">
        {listPopup.map((obj) => (
          <button
            type="button"
            key={obj.name}
            className={`
              px-2 py-1 border border-gray-400 rounded-lg text-gray-600 hover:bg-gray-200
              ${sort.sortProperty === obj.sortProperty ? 'active' : ''}
            `}
            onClick={() => handleSortChange(obj.sortProperty)}
          >
            {obj.name}
          </button>
        ))}
      </div>
    </div>
  );
});
