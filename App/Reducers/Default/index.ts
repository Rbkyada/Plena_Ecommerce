import userDefault, { UserDefault } from '@Default/UserDefault';
import productDefault, { ProductDefault } from '@Default/productDefault';
import cartDefault, { CartDefault } from '@Default/cartDefault';

export interface DefaultReducer {
  user: UserDefault;
  product: ProductDefault;
  cart: CartDefault;
}

const appDefaultReducer: DefaultReducer = {
  user: userDefault,
  product: productDefault,
  cart: cartDefault,
};

export default appDefaultReducer;
