import React, { useContext, useEffect, useState } from 'react';
import { Pressable, StyleSheet, Image } from 'react-native';
import cloneDeep from 'lodash/cloneDeep';
import Toast from 'react-native-simple-toast';
import { getRound, getSize, navigateToNextScreen } from '@Utils/Helper';
import { CartProduct, Product } from '@Utils/Interface';
import { AppContext } from '@AppContext';
import { useAppDispatch, useAppSelector } from '@Stores';
import { addOrRemoveFromCart } from '@Actions/CartActions';
import AppImages from '@Theme/AppImages';
import { ButtonComponent } from '@SubComponents/index';
import { width } from '@Utils/Constant';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Route } from '@Routes/AppRoutes';

const styles = StyleSheet.create({
  addCartBtnStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    ...getRound(24),
  },
  btnStyle: {
    borderWidth: 1,
    width: width * 0.44,
    borderRadius: 20,
  },
});

interface AddCartBadgeProps {
  itemDetails: Product;
  isBtn?: boolean;
  isBtnText?: string;
  btnTextColor?: string;
  btnBackColor?: string;
  onAction?: (isAdded: boolean) => void;
  isBuyNow?: boolean;
}

const AddCartBadge = (props: AddCartBadgeProps) => {
  const { appTheme, translations } = useContext(AppContext);

  const {
    isBtn = false,
    itemDetails,
    isBtnText,
    btnTextColor,
    btnBackColor,
    onAction,
    isBuyNow = false,
  } = props;

  const { addCartBtnStyle, btnStyle } = styles;

  const cartDefault = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);

  const addOrRemoveCart = () => {
    let newCartList: CartProduct[] = cloneDeep(cartDefault.cartList) || [];
    let newCartProduct = cloneDeep(itemDetails as CartProduct);
    const index = newCartList.findIndex(
      (item: CartProduct) => item.id === itemDetails.id,
    );
    if (index === -1) {
      newCartProduct.quantity = 1;
      newCartList.push(newCartProduct);
      setIsAddedToCart(true);
      onAction && onAction(true);
      Toast.show(translations.PRODUCT_ADDED_TO_CART, Toast.SHORT);
    }

    dispatch(
      addOrRemoveFromCart({
        ...cartDefault,
        cartList: newCartList,
        totalCartProduct: newCartList.length,
      }),
    );

    if (isBuyNow) {
      navigateToNextScreen(navigation, { name: Route.CART_SCREEN });
    }
  };

  useEffect(
    () => {
      const index = cartDefault.cartList?.findIndex(
        (item: CartProduct) => item.id === itemDetails.id,
      );
      if (index !== -1) {
        setIsAddedToCart(true);
        onAction && onAction(true);
      } else {
        onAction && onAction(false);
        setIsAddedToCart(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cartDefault, isFocused],
  );

  return (
    <>
      {(isBtn && (
        <ButtonComponent
          title={isBtnText!}
          backColor={btnBackColor}
          textColor={btnTextColor}
          style={[btnStyle, { borderColor: appTheme.themeColor }]}
          onPress={addOrRemoveCart}
        />
      )) || (
        <Pressable
          onPress={addOrRemoveCart}
          style={[
            addCartBtnStyle,
            {
              backgroundColor:
                (isAddedToCart && appTheme.darkYellow) || appTheme.themeColor,
            },
          ]}>
          <Image
            resizeMode="contain"
            source={{
              uri: (isAddedToCart && AppImages.tick) || AppImages.icPlus,
            }}
            style={[
              getSize((isAddedToCart && 12) || 20),
              { tintColor: appTheme.tint },
            ]}
          />
        </Pressable>
      )}
    </>
  );
};

export { AddCartBadge };
