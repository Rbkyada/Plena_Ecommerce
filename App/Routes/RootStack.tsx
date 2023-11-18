import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Route, Routes } from '@Routes/AppRoutes';
import { useAppDispatch } from '@Stores';
import { getRecommendList } from '@Actions/ProductAction';

const Stack = createStackNavigator();

const RootStack = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getRecommendList({ skip: 0, isLoading: true }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack.Navigator
      initialRouteName={Route.HOME_TAB}
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
