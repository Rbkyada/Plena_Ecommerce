/* eslint-disable react/no-unstable-nested-components */
import React, { useContext } from 'react';
import AnimatedTabBar, { TabsConfigsType } from 'curved-bottom-navigation-bar';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '@Components/Home/HomeScreen';
import AppImages from '@Theme/AppImages';
import { AppContext } from '@AppContext';
import ThemeColor from '@Theme/Colors';
import { AssetImage } from '@CommonComponent';
import { CategoryScreen } from '@Components/Categories/CategoryScreen';
import { MoreScreen } from '@Components/More/MoreScreen';
import { FavoriteScreen } from '@Components/Favorite/FavoriteScreen';
import { TabIcon } from '@SubComponents/TabIcon';

const Tab = createBottomTabNavigator();

enum tabs {
  HomeTab = 'Home',
  CategoryTab = 'Category',
  FavoriteTab = 'Favorite',
  MoreTab = 'More',
  SearchTab = 'Search',
  UsersTab = 'Users',
  SettingsTab = 'Settings',
}

const TABS = [
  {
    title: tabs.HomeTab,
    icon: AppImages.icHomeInactive,
    screen: HomeScreen,
    name: 'Home',
  },
  {
    title: tabs.CategoryTab,
    icon: AppImages.icCategoryInactive,
    screen: CategoryScreen,
    name: 'Category',
  },
  {
    title: tabs.FavoriteTab,
    icon: AppImages.icFavoriteInactive,
    screen: FavoriteScreen,
    name: 'Favorite',
  },
  {
    title: tabs.MoreTab,
    icon: AppImages.icMore,
    screen: MoreScreen,
    name: 'More',
  },
];

const AppTab = () => {
  const { appTheme } = useContext(AppContext);

  const MyTabs: TabsConfigsType = {
    Home: {
      icon: ({ focused }) => (
        <TabIcon
          focused={focused}
          tabIcon={
            (focused && AppImages.icHomeActive) || AppImages.icHomeInactive
          }
        />
      ),
    },
    Category: {
      icon: ({ focused }) => (
        <TabIcon
          focused={focused}
          tabIcon={
            (focused && AppImages.icCategoryActive) ||
            AppImages.icCategoryInactive
          }
        />
      ),
    },
    Favorite: {
      icon: ({ focused }) => (
        <TabIcon
          focused={focused}
          tabIcon={
            (focused && AppImages.icFavoriteActive) ||
            AppImages.icFavoriteInactive
          }
        />
      ),
    },
    More: {
      icon: ({ focused }) => (
        <TabIcon focused={focused} tabIcon={AppImages.icMore} />
      ),
    },
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarInactiveTintColor: ThemeColor.gray,
        tabBarStyle: {
          backgroundColor: appTheme.tab,
        },
      }}
      tabBar={props => (
        <AnimatedTabBar
          tabs={MyTabs}
          {...props}
          titleShown={true}
          dotColor={appTheme.blackMat}
        />
      )}
      sceneContainerStyle={{
        backgroundColor: appTheme.background,
      }}>
      {TABS.map(tab => {
        return (
          <Tab.Screen
            key={tab.title}
            name={tab.name}
            component={tab.screen}
            options={(): BottomTabNavigationOptions => {
              return {
                headerShown: false,
                tabBarIcon: ({ focused, size }) => (
                  <AssetImage
                    resizeMode="contain"
                    source={tab.icon}
                    imageStyle={{
                      height: size,
                      width: size,
                      tintColor:
                        (focused && appTheme.themeColor) || appTheme.lightText,
                    }}
                  />
                ),
              };
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export { AppTab, tabs };
