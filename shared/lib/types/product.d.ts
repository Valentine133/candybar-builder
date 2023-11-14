export type ProductImage = {
  id: string;
  productImgUrl: string;
};

export type Product = {
  id: string;
  title: string;
  price: number;
  imgUrl: string;
  description: string;
  count: number;
  productImages: ProductImage[];
};