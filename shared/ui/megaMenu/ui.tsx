import { useState } from 'react';

type Subcategory = {
  name: string;
  link: string;
};

type Category = {
  name: string;
  link: string;
  subcategories: Subcategory[];
};

type MegaMenuProps = {
  categories: Category[];
};

export const MegaMenu: React.FC<MegaMenuProps> = ({ categories }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleCategoryHover = (categoryName: string) => {
    setActiveCategory(categoryName);
  };

  const handleMenuLeave = () => {
    setActiveCategory(null);
  };

  return (
    <div className="relative">
      <div className="flex space-x-4">
        {categories.map((category) => (
          <div
            key={category.name}
            className="relative group"
            onMouseEnter={() => handleCategoryHover(category.name)}
          >
            <a href={category.link} className="text-white">
              {category.name}
            </a>
            {activeCategory === category.name && (
              <div
                className="absolute top-full left-0 w-full bg-white p-4 mt-2 z-50"
                onMouseLeave={handleMenuLeave}
              >
                <div className="grid grid-cols-3 gap-4">
                  {category.subcategories.map((subcategory) => (
                    <div key={subcategory.name}>
                      <p className="text-gray-700 font-semibold">
                        {subcategory.name}
                      </p>
                      <a
                        href={subcategory.link}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        View All
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
