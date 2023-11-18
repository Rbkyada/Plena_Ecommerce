import { Product } from '@Utils/Interface';

export interface ProductDefault {
  productList: {
    data: Product[];
    skip: number;
    isLoading: boolean;
    hasMore: boolean;
  };
  currentProduct: {
    data: Product;
    isLoading: boolean;
    isError?: boolean;
  };
}

const productDefault: ProductDefault = {
  productList: {
    data: [],
    skip: 0,
    isLoading: false,
    hasMore: true,
  },
  currentProduct: {
    data: {} as Product,
    isLoading: false,
    isError: false,
  },
};

export default productDefault;
