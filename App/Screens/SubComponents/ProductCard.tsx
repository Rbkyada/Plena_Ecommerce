import React, { useContext } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CustomText, NetworkImage } from '@CommonComponent';
import { AppContext } from '@AppContext';
import { getRound, navigateToNextScreen } from '@Utils/Helper';
import { width } from '@Utils/Constant';
import { Route } from '@Routes/AppRoutes';
import { Product } from '@Utils/Interface';
import { FavoriteBtn } from '@SubComponents/FavoriteBtn';
import { useAppDispatch } from '@Stores';
import { getCurrentProductDetail } from '@Actions/ProductAction';
import { AddCartBadge } from '@SubComponents/index';

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    width: width * 0.45,
  },
  imgStyle: {
    height: 150,
    width: width * 0.45,
  },
  priceContainer: {
    paddingVertical: 10,
    padding: 13,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addCartBtnStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    ...getRound(24),
  },
  heartContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
    padding: 5,
    borderRadius: 12,
  },
  priceInnerView: {
    maxWidth: width * 0.32,
  },
});

interface ProductCardProps {
  itemDetails: Product;
}

const ProductCard = (props: ProductCardProps) => {
  const { appTheme } = useContext(AppContext);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const { thumbnail, price, title } = props?.itemDetails;

  const {
    cardContainer,
    imgStyle,
    priceContainer,
    heartContainer,
    priceInnerView,
  } = styles;

  const onCardPress = () => {
    dispatch(
      getCurrentProductDetail({ id: +props.itemDetails.id, isLoading: true }),
    );
    navigateToNextScreen(navigation, {
      name: Route.PRODUCT_DETAILS_SCREEN,
    });
  };

  return (
    <Pressable
      style={[cardContainer, { backgroundColor: appTheme.lightGrayBack }]}
      onPress={onCardPress}>
      <FavoriteBtn
        product={props.itemDetails}
        exStyle={[heartContainer, { backgroundColor: appTheme.lightOverlay }]}
      />
      <NetworkImage
        resizeMode="stretch"
        source={thumbnail}
        imageStyle={imgStyle}
      />
      <View style={priceContainer}>
        <View style={priceInnerView}>
          <CustomText large style={{ color: appTheme.text }}>
            {`$${price}`}
          </CustomText>
          <CustomText style={{ color: appTheme.subText }} numberOfLines={1}>
            {title}
          </CustomText>
        </View>
        <AddCartBadge itemDetails={props.itemDetails} />
      </View>
    </Pressable>
  );
};

export { ProductCard };
