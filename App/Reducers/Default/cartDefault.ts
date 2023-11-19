import { CartProduct } from '@Utils/Interface';

export interface CartDefault {
  cartList?: CartProduct[];
  totalCartProduct: number;
}

const cartDefault: CartDefault = {
  cartList: [],
  totalCartProduct: 0,
};

export default cartDefault;
