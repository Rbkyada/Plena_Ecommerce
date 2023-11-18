import React, { useContext } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { getRound, getSize, navigateToNextScreen } from '@Utils/Helper';
import AppImages from '@Theme/AppImages';
import { AppContext } from '@AppContext';
import { CustomText } from '@CommonComponent';
import { fonts } from '@Utils/Constant';
import { useNavigation } from '@react-navigation/native';
import { Route } from '@Routes/AppRoutes';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 24,
  },
  badge: {
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -8,
    right: -8,
    zIndex: 1,
    ...getRound(22),
  },
});

const CartBadge = () => {
  const { appTheme } = useContext(AppContext);
  const navigation = useNavigation();

  const { container, badge } = styles;

  const onCartPress = () => {
    navigateToNextScreen(navigation, {
      name: Route.CART_SCREEN,
    });
  };

  return (
    <Pressable style={container} onPress={onCartPress}>
      <View style={[badge, { backgroundColor: appTheme.darkYellow }]}>
        <CustomText style={[fonts.Light, { color: appTheme.tint }]}>
          3
        </CustomText>
      </View>
      <Image
        resizeMode="contain"
        source={{ uri: AppImages.icBag }}
        style={getSize(24)}
      />
    </Pressable>
  );
};

export { CartBadge };
