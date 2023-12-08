import React from 'react';
import { Product } from '@/shared/lib/types/product';
import useAddToCart from '@/shared/hooks/useAddToCart';

import Image from 'next/image';
import { Button } from '@/shared/ui/buttons/simple-btn';
import { WishButton } from '@/features/addToWishlist';
import { BsFillCartCheckFill, BsCart } from 'react-icons/bs';

type ProductDetailsProps = {
  product: { attributes: Product };
};

export const ProductDetails: React.FC<ProductDetailsProps> = ({
  product
}) => {
  const { onClickAdd, isItemInCart } = useAddToCart(product);
  const p = product?.data?.[0]?.attributes;
  const id = product?.data?.[0]?.id;

  console.log('Product:', product);
  
  return (
    <section className="py-10 font-poppins dark:bg-gray-800">
      <div className="flex flex-wrap mb-24 -mx-4">
        <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
          <div className="lg:col-span-3 lg:row-end-1">
            <div className="lg:flex lg:items-start">
              <div className="lg:order-2 lg:ml-5">
                <div className="max-w-xl relative">
                  <Image
                    className="h-full w-full max-w-full rounded-lg object-cover"
                    width={800}
                    height={800}
                    src={p?.thumbnail?.data.attributes.url}
                    alt={p?.title}
                  />
                  <div className="absolute top-2 right-2">
                    <WishButton productId={id} />
                  </div>
                </div>
              </div>

              <div className="mt-2 lg:mt-0 w-full lg:order-1 lg:w-20 lg:flex-shrink-0">
                <div className="flex flex-row items-start lg:flex-col">
                  <button
                    type="button"
                    className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-purple-900 text-center"
                  >
                    <Image
                      className="h-full w-full object-cover"
                      width={200}
                      height={200}
                      src={p?.thumbnail?.data.attributes.url}
                      alt={p?.title}
                    />
                  </button>
                  <button
                    type="button"
                    className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-transparent text-center"
                  >
                    <Image
                      className="h-full w-full object-cover"
                      width={200}
                      height={200}
                      src={p?.thumbnail?.data.attributes.url}
                      alt={p?.title}
                    />
                  </button>
                  <button
                    type="button"
                    className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-transparent text-center"
                  >
                    <Image
                      className="h-full w-full object-cover"
                      width={200}
                      height={200}
                      src={p?.thumbnail?.data.attributes.url}
                      alt={p?.title}
                    />
                  </button>
                  <button
                    type="button"
                    className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-transparent text-center"
                  >
                    <Image
                      className="h-full w-full object-cover"
                      width={200}
                      height={200}
                      src={p?.thumbnail?.data.attributes.url}
                      alt={p?.title}
                    />
                  </button>
                </div>
              </div>
            </div>
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

              {/* <div className="mb-6">{p?.description}</div> */}

              <p className="inline-block text-3xl font-semibold text-gray-700 dark:text-gray-400 ">
                <span>${p?.price}</span>
                {/* <span className="ml-3 text-base font-normal text-gray-500 line-through dark:text-gray-400">
                  Rs.10,000.00
                </span> */}
              </p>
            </div>
            <div className="mb-6">
              <div className="mb-4">
                <h2 className="mb-2 text-xl font-bold dark:text-gray-400">
                  Color
                </h2>
                <div className="flex flex-wrap -mb-2">
                  <button className="p-1 mb-2 mr-2 border border-transparent rounded-full hover:border-gray-400 dark:border-gray-800 dark:hover:border-gray-400 ">
                    <div className="w-6 h-6 bg-red-600 rounded-full"></div>
                  </button>
                  <button className="p-1 mb-2 mr-2 border border-transparent rounded-full hover:border-gray-400 dark:border-gray-800 dark:hover:border-gray-400">
                    <div className="w-6 h-6 bg-green-600 rounded-full"></div>
                  </button>
                  <button className="p-1 mb-2 border border-transparent rounded-full hover:border-gray-400 dark:border-gray-800 dark:hover:border-gray-400">
                    <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
                  </button>
                  <button className="p-1 mb-2 border border-transparent rounded-full hover:border-gray-400 dark:border-gray-800 dark:hover:border-gray-400">
                    <div className="w-6 h-6 rounded-full bg-sky-400"></div>
                  </button>
                </div>
              </div>
              <div className="pb-4 mb-4">
                <h2 className="mb-2 text-xl font-bold dark:text-gray-400">
                  Size
                </h2>
                <div className="flex flex-wrap -mb-2">
                  <button className="p-2 mb-2 mr-1 rounded-md border hover:border-blue-400 dark:border-gray-400 hover:text-blue-600 dark:hover:border-gray-300 dark:text-gray-400">
                    small
                  </button>
                  <button className="p-2 mb-2 mr-1 rounded-md border hover:border-blue-400 hover:text-blue-600 dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400">
                    standart
                  </button>
                  <button className="p-2 mb-2 mr-1 rounded-md border hover:border-blue-400 hover:text-blue-600 dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400">
                    big
                  </button>
                </div>
              </div>
            </div>
            <div className="py-6 mb-6 border-t border-b border-gray-200 dark:border-gray-700">
              <span className="text-base text-gray-600 dark:text-gray-400">
                In Stock
              </span>
              <p className="mt-2 text-sm dark:text-blue-200">
                <span className="text-gray-600 dark:text-gray-400">
                  Production time 3-5 days
                </span>
              </p>
            </div>
            <div className="mb-6 "></div>
            <div className="flex flex-wrap items-center mb-6">
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
              <Button as="button" customClass="min-w-fit" onClick={onClickAdd}>
                {isItemInCart ? (
                  <BsFillCartCheckFill size="20" />
                ) : (
                  <BsCart size="20" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
