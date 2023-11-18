import { AppTab } from '@Routes/AppTab';
import { CartScreen } from '@Components/Cart/CartScreen';
import { ProductDetailsScreen } from '@Components/Product/ProductDetailsScreen';

enum Route {
  HOME_TAB = 'HomeTab',
  CART_SCREEN = 'CartScreen',
  PRODUCT_DETAILS_SCREEN = 'ProductDetailsScreen',
}

const Routes = [
  {
    name: Route.HOME_TAB,
    screen: AppTab,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    name: Route.CART_SCREEN,
    screen: CartScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    name: Route.PRODUCT_DETAILS_SCREEN,
    screen: ProductDetailsScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
];

export { Routes, Route };
