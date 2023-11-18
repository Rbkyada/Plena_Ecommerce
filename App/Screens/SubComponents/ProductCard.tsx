import React, { useContext } from 'react';
import { View, Pressable, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CustomText, NetworkImage } from '@CommonComponent';
import { AppContext } from '@AppContext';
import { getRound, getSize, navigateToNextScreen } from '@Utils/Helper';
import { width } from '@Utils/Constant';
import AppImages from '@Theme/AppImages';
import { Route } from '@Routes/AppRoutes';
import { Product } from '@Utils/Interface';

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

  const { thumbnail, price, title } = props?.itemDetails;

  const {
    cardContainer,
    imgStyle,
    priceContainer,
    addCartBtnStyle,
    heartContainer,
    priceInnerView,
  } = styles;

  const onCardPress = () => {
    navigateToNextScreen(navigation, {
      name: Route.PRODUCT_DETAILS_SCREEN,
    });
  };

  return (
    <Pressable
      style={[cardContainer, { backgroundColor: appTheme.lightGrayBack }]}
      onPress={onCardPress}>
      <Pressable
        style={[heartContainer, { backgroundColor: appTheme.lightOverlay }]}>
        <Image
          resizeMode="contain"
          source={{ uri: AppImages.icFavorite }}
          style={[getSize(20), { tintColor: appTheme.text }]}
        />
      </Pressable>
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
        <Pressable
          style={[addCartBtnStyle, { backgroundColor: appTheme.themeColor }]}>
          <Image
            resizeMode="contain"
            source={{ uri: AppImages.icPlus }}
            style={[getSize(20), { tintColor: appTheme.tint }]}
          />
        </Pressable>
      </View>
    </Pressable>
  );
};

export { ProductCard };
