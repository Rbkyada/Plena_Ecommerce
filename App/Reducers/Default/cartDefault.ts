import { Product } from 'Utils/Interface';

export interface CartDefault {
  products?: Product[];
  totalProducts?: number;
}

const cartDefault: CartDefault = {
  products: [],
  totalProducts: 0,
};

export default cartDefault;
