import { AppTab } from '@Routes/AppTab';

enum Route {
  LoginScreen = 'Login',
  HomeScreen = 'Home',
}

const Routes = [
  {
    name: Route.HomeScreen,
    screen: AppTab,
    navigationOptions: {
      headerShown: false,
    },
  },
];

export { Routes, Route };
