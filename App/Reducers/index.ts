import { combineReducers } from 'redux';
import UserReducer from '@Reducers/UserReducer';
import ProductReducer from '@Reducers/ProductReducer';
import CartReducer from '@Reducers/CartReducer';

export default combineReducers({
  user: UserReducer,
  product: ProductReducer,
  cart: CartReducer,
});
