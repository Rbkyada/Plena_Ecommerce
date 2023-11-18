import { GET_USER, LOG_OUT, SET_ADD_REMOVE_FAVORITE } from '@Keys';
import { Product } from '@Utils/Interface';

export const getUserDetail = () => ({
  type: GET_USER,
});

export const addRemoveFromFavorite = (payload: { favorites: Product[] }) => ({
  type: SET_ADD_REMOVE_FAVORITE,
  payload,
});

export const userLogout = () => ({
  type: LOG_OUT,
});
