import { ProductDefault } from '@Default/productDefault';
import DefaultState from '@Default/index';
import {
  GET_CURRENT_PRODUCT,
  GET_RECOMMENDED_PRODUCTS,
  SET_CURRENT_PRODUCT,
  SET_RECOMMENDED_PRODUCTS,
} from '@Keys/index';

const INIT_STATE = DefaultState.product;

const ProductReducer = (state = INIT_STATE, action: any): ProductDefault => {
  switch (action.type) {
    case GET_RECOMMENDED_PRODUCTS:
      return {
        ...state,
        productList: {
          ...state.productList,
          isLoading: action.payload.isLoading,
        },
      };
    case SET_RECOMMENDED_PRODUCTS:
      return { ...state, ...action.payload };
    case GET_CURRENT_PRODUCT:
      return {
        ...state,
        currentProduct: {
          ...state.currentProduct,
          isLoading: action.payload.isLoading,
        },
      };
    case SET_CURRENT_PRODUCT:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export default ProductReducer;
