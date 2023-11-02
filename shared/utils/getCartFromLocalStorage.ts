 import { calcTotalPrice } from "@/shared/utils/calcTotalPrice";
 
 export const getCartFromLocalStorage = () => {
  const data = localStorage.getItem('cart');
  const items = data ? JSON.parse(data) : [];
  const totalPrice = calcTotalPrice(items);

  return {
    items,
    totalPrice,
  }
 }