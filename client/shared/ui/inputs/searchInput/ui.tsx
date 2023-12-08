import React from 'react';

import { BsSearch } from 'react-icons/bs';

export const SearchInput = () => {
  return (
    <form className="relative w-full lg:min-w-[300px]">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <BsSearch/>
        </div>
        <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:cyan-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:cyan-500 dark:focus:border-blue-500" placeholder="Search ..." required/>
    </form>
  )
}
