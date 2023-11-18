import { SET_ADD_REMOVE_FAVORITE, SET_USER } from '@Keys';
import DefaultState from '@Default';
import { UserDefault } from '@Default/UserDefault';

const INIT_STATE = DefaultState.user;

const UserReducer = (state = INIT_STATE, action: any): UserDefault => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_ADD_REMOVE_FAVORITE:
      return { ...state, favorites: action.payload.favorites };
    default:
      return state;
  }
};

export default UserReducer;
