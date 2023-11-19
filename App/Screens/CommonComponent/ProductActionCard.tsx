import React, { useContext, useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { Layout, ZoomIn } from 'react-native-reanimated';
import cloneDeep from 'lodash/cloneDeep';
import { AppContext } from '@AppContext';
import { NetworkImage } from '@CommonComponent/NetworkImage';
import { CustomText } from '@CommonComponent/CustomText';
import { fonts, width } from '@Utils/Constant';
import { CartBtn } from '@SubComponents/CartBtn';
import AppImages from '@Theme/AppImages';
import { CartProduct } from '@Utils/Interface';
import { useAppDispatch, useAppSelector } from '@Stores';
import { addOrRemoveFromCart } from '@Actions/CartActions';

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    columnGap: 10,
  },
  bannerStyle: {
    width: 100,
    height: 70,
    borderRadius: 10,
  },
  titleContainer: {
    width: width * 0.34,
  },
  actionBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
});

interface ProductActionCardProps {
  item: CartProduct;
  index: number;
}

const ProductActionCard = (props: ProductActionCardProps) => {
  const { appTheme } = useContext(AppContext);
  const cartDefault = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();
  const initialMode = useRef<boolean>(true);

  const { item, index } = props;

  const { cardContainer, bannerStyle, titleContainer, actionBtnContainer } =
    styles;

  const onIncrementOrDecrement = (isIncrement: boolean) => {
    let newCartList: CartProduct[] = cloneDeep(cartDefault.cartList) || [];
    if (isIncrement) {
      newCartList = newCartList.map((cartItem: CartProduct) => {
        if (cartItem.id === item.id) {
          cartItem.quantity = cartItem.quantity + 1;
        }
        return cartItem;
      });
      dispatch(
        addOrRemoveFromCart({
          cartList: newCartList,
          totalCartProduct: cartDefault.totalCartProduct,
        }),
      );
    } else {
      if (item.quantity > 1) {
        newCartList = newCartList.map((cartItem: CartProduct) => {
          if (cartItem.id === item.id) {
            cartItem.quantity = cartItem.quantity - 1;
          }
          return cartItem;
        });
        dispatch(
          addOrRemoveFromCart({
            cartList: newCartList,
            totalCartProduct: cartDefault.totalCartProduct,
          }),
        );
      } else {
        dispatch(
          addOrRemoveFromCart({
            cartList: newCartList.filter(
              (cartItem: CartProduct) => cartItem.id !== item.id,
            ),
            totalCartProduct: cartDefault.totalCartProduct - 1,
          }),
        );
      }
    }
  };

  useEffect(() => {
    initialMode.current = false;
  }, []);

  return (
    <Animated.View
      style={cardContainer}
      layout={Layout}
      entering={(initialMode.current && ZoomIn.delay(index * 250)) || ZoomIn}>
      <NetworkImage
        resizeMode="cover"
        source={item.thumbnail}
        imageStyle={bannerStyle}
      />
      <View style={titleContainer}>
        <CustomText
          size={14}
          numberOfLines={1}
          style={[fonts.Medium, { color: appTheme.blackMat }]}>
          {item.title}
        </CustomText>
        <CustomText
          size={14}
          style={[fonts.Medium, { color: appTheme.blackMat }]}>
          {`$${item.price}`}
        </CustomText>
      </View>
      <View style={actionBtnContainer}>
        <CartBtn
          img={AppImages.icMinus}
          onBtnPress={() => onIncrementOrDecrement(false)}
        />
        <CustomText>{item?.quantity.toString()}</CustomText>
        <CartBtn
          img={AppImages.icPlus}
          onBtnPress={() => onIncrementOrDecrement(true)}
        />
      </View>
    </Animated.View>
  );
};

export { ProductActionCard };
