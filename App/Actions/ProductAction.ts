import { GET_RECOMMENDED_PRODUCTS } from '@Keys';

export const getRecommendList = (payload: {
  skip: number;
  isLoading: boolean;
}) => ({
  type: GET_RECOMMENDED_PRODUCTS,
  payload,
});
