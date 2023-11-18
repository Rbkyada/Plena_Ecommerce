import { GET_CURRENT_PRODUCT, GET_RECOMMENDED_PRODUCTS } from '@Keys';

export const getRecommendList = (payload: {
  skip: number;
  isLoading: boolean;
}) => ({
  type: GET_RECOMMENDED_PRODUCTS,
  payload,
});

export const getCurrentProductDetail = (payload: {
  id: number;
  isLoading: boolean;
}) => ({
  type: GET_CURRENT_PRODUCT,
  payload,
});
