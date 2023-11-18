import DefaultState from '@Default/index';
import { CartDefault } from '@Default/cartDefault';

const INIT_STATE = DefaultState.cart;

const CartReducer = (state = INIT_STATE, action: any): CartDefault => {
  switch (action.type) {
    default:
      return state;
  }
};
export default CartReducer;
