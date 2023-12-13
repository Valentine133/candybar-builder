import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, selectCartItemById } from '@/shared/lib/redux/slices/cartSlice';
import { openModal } from '@/shared/lib/redux/slices/modalSlice';
import { setLocalStorage, getLocalStorage } from '@/shared/utils/localStorage';
import { Product } from '@/shared/lib/types/product';

const useAddToCart = (product: Product, id, selectedOption) => {
  const dispatch = useDispatch();
  const cartItem = useSelector(selectCartItemById(id));

  useEffect(() => {
    if (cartItem) {
      // Update local storage after Redux state is updated
      const updatedCart = getLocalStorage('cart') || [];
      updatedCart.push(cartItem);
      setLocalStorage('cart', updatedCart);
    }
  }, [cartItem]);
  
  const onClickAdd = () => {
    const existingItem = cartItem;
    
    if (existingItem) {
      dispatch(openModal({ modalName: 'cartModal' }));
    } else {
      const item = {
        id,
        count: 1,
        selectedOption: selectedOption,
        ...product,
      };
      dispatch(addItem(item));
      dispatch(openModal({ modalName: 'cartModal' }));

      const updatedCart = getLocalStorage('cart') || [];
      updatedCart.push(item);
      setLocalStorage('cart', updatedCart);
    }
  };

  return { onClickAdd, isItemInCart: !!cartItem };
};

export default useAddToCart;
