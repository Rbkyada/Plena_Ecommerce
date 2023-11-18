import { Product } from '@Utils/Interface';

export interface UserDefault {
  user: any;
  favorites: Product[];
}
const userDefault: UserDefault = {
  user: {},
  favorites: [],
};

export default userDefault;
