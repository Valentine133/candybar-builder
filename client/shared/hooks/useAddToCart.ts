import { useDispatch, useSelector } from 'react-redux';
import { addItem, selectCartItemById } from '@/shared/lib/redux/slices/cartSlice';
import { openModal } from '@/shared/lib/redux/slices/modalSlice';
import { setLocalStorage, getLocalStorage } from '@/shared/utils/localStorage';
import { Product } from '@/shared/lib/types/product';

const useAddToCart = (product: Product) => {
  const dispatch = useDispatch();
  const cartItem = useSelector(selectCartItemById(product?.id));

  const onClickAdd = () => {
    const existingItem = cartItem;

    if (existingItem) {
      dispatch(openModal());
    } else {
      const item = {
        id: product.id,
        title: product.title,
        imgUrl: product.imgUrl,
        description: product.description,
        price: product.price,
        count: 1,
        productImages: product.productImages || [],
        category: product.category,
        theme: product.theme,
        type: product.type,
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
