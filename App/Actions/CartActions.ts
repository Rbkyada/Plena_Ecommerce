import { ADD_OR_REMOVE_FROM_CART } from '@Keys';
import { CartDefault } from '@Default/cartDefault';

export const addOrRemoveFromCart = (payload: CartDefault) => ({
  type: ADD_OR_REMOVE_FROM_CART,
  payload,
});
