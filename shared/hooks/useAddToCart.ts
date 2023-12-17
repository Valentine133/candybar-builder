import { useDispatch, useSelector } from 'react-redux';
import { addItem, selectCartMatchingItem, updateSelectedItemOptions } from '@/shared/lib/redux/slices/cartSlice';
import { openModal } from '@/shared/lib/redux/slices/modalSlice';
import { Product } from '@/shared/lib/types/product';

import isEqual from 'lodash/isEqual';
import {generateUniqueCode} from '@/shared/utils/generateUniqueCode';

const useAddToCart = (product: Product, id, selectedOption) => {
  const dispatch = useDispatch();
  const cartMatchingItem = useSelector(selectCartMatchingItem(id, selectedOption));
  
  const onClickAdd = () => {
    const existingItem = cartMatchingItem;
    const uniqueCode = generateUniqueCode();
    
    if (existingItem) {
      const optionsMatch = isEqual(existingItem.selectedOption, selectedOption);

      if (optionsMatch) {
        dispatch(updateSelectedItemOptions({ id, selectedOption, count: existingItem.count + 1 }));
        dispatch(openModal({ modalName: 'cartModal' }));
      } else {
        const newItem = {
          id,
          uniqueCode,
          count: 1,
          selectedOption,
          ...product,
        };
        dispatch(addItem(newItem));
        dispatch(openModal({ modalName: 'cartModal' }));
      }
    } else {
      const newItem = {
        id,
        uniqueCode,
        count: 1,
        selectedOption,
        ...product,
      };
      dispatch(addItem(newItem));
      dispatch(openModal({ modalName: 'cartModal' }));
    }
  };

  return { onClickAdd };
};

export default useAddToCart;