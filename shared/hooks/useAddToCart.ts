import { useDispatch, useSelector } from 'react-redux';
import { addItem, selectCartItemById, selectCartMatchingItem, updateSelectedItemOptions } from '@/shared/lib/redux/slices/cartSlice';
import { openModal } from '@/shared/lib/redux/slices/modalSlice';
import { Product } from '@/shared/lib/types/product';
import isEqual from 'lodash/isEqual';

const useAddToCart = (product: Product, id, selectedOption) => {
  const dispatch = useDispatch();
  const cartItem = useSelector(selectCartMatchingItem(id, selectedOption));
  // const storedCart: Product[] = getLocalStorage('cart') || [];
  // console.log(selectedOption);
  const onClickAdd = () => {
    const existingItem = cartItem;
    
    if (existingItem) {
      const optionsMatch = isEqual(existingItem.selectedOption, selectedOption);

      if (optionsMatch) {
        // Increment count if ID and options match
        dispatch(updateSelectedItemOptions({ id, selectedOption, count: existingItem.count + 1 }));
      } else {
        // Add a new item if options are different
        const newItem = {
          id,
          count: 1,
          selectedOption,
          ...product,
        };
        dispatch(addItem(newItem));
        dispatch(openModal({ modalName: 'cartModal' }));
      }
    } else {
      // Add a new item if ID is not in the cart
      const newItem = {
        id,
        count: 1,
        selectedOption,
        ...product,
      };
      dispatch(addItem(newItem));
      dispatch(openModal({ modalName: 'cartModal' }));
    }
  };

  return { onClickAdd, isItemInCart: !!cartItem, quantity: cartItem?.count || 0 };
};

export default useAddToCart;