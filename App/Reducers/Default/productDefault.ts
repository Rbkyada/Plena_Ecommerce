import { Product } from '@Utils/Interface';

export interface ProductDefault {
  productList: {
    data: Product[];
    skip: number;
    isLoading: boolean;
    hasMore: boolean;
  };
}

const productDefault: ProductDefault = {
  productList: {
    data: [],
    skip: 0,
    isLoading: false,
    hasMore: true,
  },
};

export default productDefault;
