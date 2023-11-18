import { takeLatest } from 'redux-saga/effects';
import { GET_CURRENT_PRODUCT, GET_RECOMMENDED_PRODUCTS, GET_USER } from '@Keys';
import { getUserSaga } from '@Sagas/UserSaga';
import {
  getCurrentProductDetail,
  getRecommendProductList,
} from '@Sagas/ProductsSaga';

export default function* rootSaga() {
  yield takeLatest(GET_USER, getUserSaga);
  yield takeLatest(GET_RECOMMENDED_PRODUCTS, getRecommendProductList);
  yield takeLatest(GET_CURRENT_PRODUCT, getCurrentProductDetail);
}
