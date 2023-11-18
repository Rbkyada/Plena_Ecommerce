import { takeLatest } from 'redux-saga/effects';
import { GET_RECOMMENDED_PRODUCTS, GET_USER } from '@Keys';
import { getUserSaga } from '@Sagas/UserSaga';
import { getRecommendProductList } from '@Sagas/ProductsSaga';

export default function* rootSaga() {
  yield takeLatest(GET_USER, getUserSaga);
  yield takeLatest(GET_RECOMMENDED_PRODUCTS, getRecommendProductList);
}
