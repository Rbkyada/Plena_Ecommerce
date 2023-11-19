import DefaultState from '@Default/index';
import { CartDefault } from '@Default/cartDefault';
import { ADD_OR_REMOVE_FROM_CART } from '@Actions/Keys';

const INIT_STATE = DefaultState.cart;

const CartReducer = (state = INIT_STATE, action: any): CartDefault => {
  switch (action.type) {
    case ADD_OR_REMOVE_FROM_CART:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export default CartReducer;
