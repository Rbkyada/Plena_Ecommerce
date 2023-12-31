import React, { useContext, useMemo } from 'react';
import {
  Image,
  ImageStyle,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { getRound, getSize, navigateToNextScreen } from '@Utils/Helper';
import AppImages from '@Theme/AppImages';
import { AppContext } from '@AppContext';
import { CustomText } from '@CommonComponent';
import { fonts } from '@Utils/Constant';
import { useNavigation } from '@react-navigation/native';
import { Route } from '@Routes/AppRoutes';
import { useAppSelector } from '@Stores';

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

interface CartBadgeProps {
  exContainerStyle?: StyleProp<ViewStyle>;
  imgStyle?: StyleProp<ImageStyle>;
}

const CartBadge = (props: CartBadgeProps) => {
  const { appTheme } = useContext(AppContext);
  const navigation = useNavigation();

  const { totalCartProduct } = useAppSelector(state => state.cart);

  const { imgStyle, exContainerStyle } = props;
  const { container, badge } = styles;

  const onCartPress = () => {
    navigateToNextScreen(navigation, {
      name: Route.CART_SCREEN,
    });
  };

  const renderBadge = useMemo(() => {
    if (totalCartProduct > 0) {
      return (
        <View style={[badge, { backgroundColor: appTheme.darkYellow }]}>
          <CustomText style={[fonts.Light, { color: appTheme.tint }]}>
            {totalCartProduct?.toString()}
          </CustomText>
        </View>
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalCartProduct]);

  return (
    <Pressable style={[container, exContainerStyle]} onPress={onCartPress}>
      {renderBadge}
      <Image
        resizeMode="contain"
        source={{ uri: AppImages.icBag }}
        style={[getSize(24), imgStyle]}
      />
    </Pressable>
  );
};

export { CartBadge };
