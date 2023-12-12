import { useDispatch, useSelector } from 'react-redux';
import { addItem, selectCartItemById } from '@/shared/lib/redux/slices/cartSlice';
import { openModal } from '@/shared/lib/redux/slices/modalSlice';
import { setLocalStorage, getLocalStorage } from '@/shared/utils/localStorage';
import { Product } from '@/shared/lib/types/product';

const useAddToCart = (product: Product, id, selectedOption) => {
  const dispatch = useDispatch();
  const cartItem = useSelector(selectCartItemById(id));

  const onClickAdd = () => {
    const existingItem = cartItem;
    console.log(id)
    
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

      const updatedCart = getLocalStorage('cart') || [];
      updatedCart.push(item);
      setLocalStorage('cart', updatedCart);
    }
  };

  return { onClickAdd, isItemInCart: !!cartItem };
};

export default useAddToCart;
