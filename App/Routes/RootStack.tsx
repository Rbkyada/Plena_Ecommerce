import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Route, Routes } from '@Routes/AppRoutes';

const Stack = createStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={Route.HomeScreen}
      screenOptions={() => ({
        headerShown: true,
        cardOverlayEnabled: true,
        headerBackTitleVisible: false,
        presentation: 'card',
      })}>
      {Routes.map(route => {
        return (
          <Stack.Screen
            name={route.name}
            component={route.screen}
            key={route.name}
            options={route.navigationOptions || {}}
          />
        );
      })}
    </Stack.Navigator>
  );
};

export { RootStack };
