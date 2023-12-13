import React, { useState } from 'react';
import { Product } from '@/shared/lib/types/product';

import { ProductDetailsCarousel } from '@/shared/ui/productDetailsCarousel';
import { AddToCartButton } from '@/features/addToCartButton';
import Image from 'next/image';
import Head from 'next/head';
import { getDiscountedPricePercentage } from '@/shared/utils/getDiscountedPricePercentage';

type ProductDetailsProps = {
  product: { attributes: Product };
};

export const ProductDetails: React.FC<ProductDetailsProps> = ({
  product
}) => {
  const p = product?.data?.[0]?.attributes;
  const id = product?.data?.[0]?.id;

  const [selectedOption, setSelectedOption] = useState({});
  const [showError, setShowError] = useState(false);

  console.log(p);

  return (
    <>
      <Head>
        <title>{p?.title} - Paper Pyramid</title>
        <meta name="description" content={p?.description} />
      </Head>

      <section className="pt-10">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
            <div className="sticky top-[5rem] lg:col-span-3 lg:row-end-1">
              {p?.image?.data ? (
                <ProductDetailsCarousel
                  images={p?.image?.data}
                  productId={id}
                />
              ) : (
                <Image
                  width={800}
                  height={800}
                  src={p?.thumbnail?.data?.attributes.url}
                  className="h-full w-full max-w-full rounded-lg object-cover aspect-square"
                  alt={p?.thumbnail?.data?.attributes.name}
                />
              )}
            </div>
          </div>
          <div className="w-full px-4 md:w-1/2">
            <div className="lg:pl-20">
              <div className="mb-6">
                <div className="flex items-center mb-6">
                  <span className="px-2.5 py-0.5 mr-8 text-xs text-purple-600 bg-purple-100 dark:bg-gray-700 rounded-xl dark:text-gray-200">
                    New
                  </span>
                  <div className="flex flex-wrap items-center">
                    <ul className="flex mb-4 mr-2 lg:mb-0">
                      <li>
                        <a href="#">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                            viewBox="0 0 16 16"
                          >
                            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path>
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                            viewBox="0 0 16 16"
                          >
                            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path>
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                            viewBox="0 0 16 16"
                          >
                            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path>
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                            viewBox="0 0 16 16"
                          >
                            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path>
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                            viewBox="0 0 16 16"
                          >
                            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path>
                          </svg>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <h2 className="max-w-xl mt-3 mb-6 text-xl font-semibold leading-loose tracking-wide text-gray-700 md:text-2xl dark:text-gray-300">
                  {p?.title}
                </h2>

                <div className="mb-6">
                  {p?.description?.[0]?.children?.[0]?.text}
                </div>

                <p className="flex w-full text-3xl font-semibold text-gray-700 dark:text-gray-400 ">
                  <span>${p?.price}</span>
                  {p?.original_price && (
                    <>
                      <span className="text-lg ml-3 text-base font-normal text-gray-500 line-through dark:text-gray-400">
                        ${p?.original_price}
                      </span>
                      <span className="ml-auto text-red-600">
                        {getDiscountedPricePercentage(
                          p.original_price,
                          p.price,
                        )}
                        % off
                      </span>
                    </>
                  )}
                </p>
              </div>

              {/* Options */}
              {p?.options &&
                Object.entries(p.options).map(([optionKey, optionValue]) => {
                  if (optionKey === 'id') {
                    return null;
                  }

                  return (
                    optionValue != null && (
                      <div key={optionKey} className="option mb-4">
                        {/* Nested level */}
                        <h3 className="mb-2 text-lg font-semibold text-gray-800">
                          {optionValue?.title}
                        </h3>
                        {Object.entries(optionValue).map(
                          ([nestedKey, nestedValue]) => (
                            <div key={nestedKey} className="nested-option">
                              {Array.isArray(nestedValue) &&
                                nestedValue.map((item, i) => (
                                  <button
                                    key={i}
                                    className={`${
                                      selectedOption[nestedKey] === i
                                        ? 'border-purple-600 text-purple-600 bg-purple-100 hover:border-purple-600'
                                        : ''
                                    } p-2 mb-2 mr-1 rounded-md border hover:border-gray-800`}
                                    onClick={() => {
                                      setSelectedOption((prevState) => ({
                                        ...prevState,
                                        [nestedKey]: i,
                                      }));
                                      setShowError(false);
                                    }}
                                  >
                                    {item.name}
                                  </button>
                                ))}
                            </div>
                          ),
                        )}
                      </div>
                    )
                  );
                })}

              {showError && (
                <div className="text-red-600 mb-4">
                  Option selection is required
                </div>
              )}
              <div className="py-6 mb-6 border-t border-b border-gray-200 dark:border-gray-700">
                <span className="text-base text-green-600 font-semibold dark:text-gray-400">
                  In Stock
                </span>
                <p className="mt-2 text-sm dark:text-blue-200">
                  <span className="text-gray-600 dark:text-gray-400">
                    Production time 3-5 days
                  </span>
                </p>
              </div>
              <div className="mb-6 "></div>
              <div className="flex flex-wrap items-center">
                <div className="mr-4 lg:mb-0">
                  <div className="cart__item-count mt-auto relative flex flex-row w-[7rem] h-9 bg-transparent border border-gray-300 rounded-lg overflow-hidden">
                    <button className="w-20 h-full text-gray-600 bg-white border-r rounded-l outline-none cursor-pointer dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-400 hover:text-gray-700 dark:bg-gray-900 hover:bg-gray-300">
                      <span className="m-auto text-2xl font-thin">-</span>
                    </button>
                    <input
                      type="number"
                      max="100"
                      className="flex items-center w-full font-semibold text-center text-gray-700 placeholder-gray-700 bg-white outline-none dark:text-gray-400 dark:placeholder-gray-400 dark:bg-gray-900 focus:outline-none text-md hover:text-black"
                      placeholder="1"
                    />
                    <button className="w-20 h-full text-gray-600 bg-white border-l rounded-r outline-none cursor-pointer dark:border-gray-700 hover:text-gray-700 hover:bg-gray-300">
                      <span className="m-auto text-2xl font-thin">+</span>
                    </button>
                  </div>
                </div>
                <AddToCartButton
                  product={p}
                  id={id}
                  selectedOption={selectedOption}
                  error={setShowError}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
