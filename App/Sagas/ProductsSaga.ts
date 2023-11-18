import { store } from '@Stores/index';
import { getProductList } from '@Services/ProductService';
import { put } from 'redux-saga/effects';
import { SET_RECOMMENDED_PRODUCTS } from '@Keys/index';

export function* getRecommendProductList(action: {
  type: string;
  payload: {
    skip: number;
    limit: number;
  };
}): any {
  const productDefault = store.getState().product;

  const { limit = 10, skip } = action.payload;

  try {
    const response: any = yield getProductList(skip, limit);

    if (response?.products) {
      yield put({
        type: SET_RECOMMENDED_PRODUCTS,
        payload: {
          ...productDefault,
          productList: {
            ...productDefault.productList,
            data:
              Number(response?.skip) === 0
                ? response?.products
                : [...productDefault.productList.data, ...response?.products],
            skip: Number(response?.skip) + limit,
            isLoading: false,
            hasMore: response?.products.skip + 1 < response?.products.total,
          },
        },
      });
    }
  } catch (error) {
    console.log('error', error);
    yield put({
      type: SET_RECOMMENDED_PRODUCTS,
      payload: {
        ...productDefault,
        productList: {
          ...productDefault.productList,
          isLoading: false,
        },
      },
    });
  }
}
