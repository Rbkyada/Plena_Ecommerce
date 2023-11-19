import React, { useCallback, useContext, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Rating } from 'react-native-ratings';
import { useAppSelector } from '@Stores';
import {
  CartBadge,
  CustomText,
  Layout,
  Loading,
  ProductSlider,
} from '@CommonComponent';
import { AppContext } from '@AppContext';
import { fonts, width } from '@Utils/Constant';
import { FavoriteBtn } from '@SubComponents/FavoriteBtn';
import { AddCartBadge } from '@SubComponents/index';
import { getRound, getSize } from '@Utils/Helper';
import AppImages from '@Theme/AppImages';

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  favExStyle: {
    position: 'absolute',
    zIndex: 1,
    right: 10,
    top: 10,
    padding: 10,
    borderRadius: 20,
    width: 54,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productTitle: {
    ...fonts.SemiBold,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 17,
    marginVertical: 10,
  },
  headingStyle: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingVertical: 3,
  },
  productDetailsStyle: {
    paddingHorizontal: 20,
    textAlign: 'justify',
  },
  ratingContainerStyle: {
    position: 'relative',
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
    marginBottom: 10,
  },
  ratingStyle: {
    alignSelf: 'flex-start',
  },
  ratingOverlayStyle: {
    position: 'absolute',
    width: width * 0.4,
    height: 40,
    zIndex: 1,
  },
  priceContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
    marginTop: 15,
  },
  cutOffStyle: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
  },
  cardBadgeStyle: { marginRight: 20 },
  btnOuterView: {
    position: 'relative',
  },
  tickBadgeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    ...getRound(25),
    position: 'absolute',
    right: -3,
    top: 0,
  },
});

const ProductDetailsScreen = () => {
  const { appTheme, translations } = useContext(AppContext);

  const { data, isLoading, isError } = useAppSelector(
    state => state.product.currentProduct,
  );

  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);

  const {
    titleContainer,
    favExStyle,
    productTitle,
    btnContainer,
    headingStyle,
    productDetailsStyle,
    ratingStyle,
    ratingOverlayStyle,
    ratingContainerStyle,
    cutOffStyle,
    priceContainer,
    cardBadgeStyle,
    btnOuterView,
    tickBadgeContainer,
  } = styles;

  const LoadingContainer = useCallback(() => {
    return (
      <>
        <View style={titleContainer}>
          {(isError && (
            <CustomText style={[fonts.SemiBold, { color: appTheme.text }]}>
              {translations?.SOMETHING_WENT_WRONG}
            </CustomText>
          )) || <Loading />}
        </View>
      </>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isLoading]);

  const renderProduct = useCallback(() => {
    return (
      <>
        <View>
          <CustomText size={40} style={[productTitle, fonts.Light]}>
            {data?.title}
          </CustomText>
          <View style={ratingContainerStyle}>
            <View style={ratingOverlayStyle} />
            <Rating
              type="custom"
              ratingCount={5}
              fractions={1}
              startingValue={data?.rating}
              imageSize={20}
              style={ratingStyle}
            />
            <CustomText style={[fonts.Medium, { color: appTheme.reviewText }]}>
              {translations.REVIEW}
            </CustomText>
          </View>
          <View>
            <FavoriteBtn iconSize={23} product={data} exStyle={favExStyle} />
            <ProductSlider imgData={data?.images!} />
            <View style={priceContainer}>
              <CustomText
                large
                style={[fonts.SemiBold, { color: appTheme.themeColor }]}>
                {`$${data?.price}`}
              </CustomText>
              <View
                style={[cutOffStyle, { backgroundColor: appTheme.themeColor }]}>
                <CustomText
                  style={[
                    fonts.SemiBold,
                    { color: appTheme.tint },
                  ]}>{`${data?.discountPercentage} % OFF`}</CustomText>
              </View>
            </View>
            <View style={btnContainer}>
              <View style={btnOuterView}>
                <AddCartBadge
                  itemDetails={data}
                  isBtn
                  onAction={value => {
                    setIsAddedToCart(value);
                  }}
                  isBtnText={
                    (isAddedToCart && translations.ADDED_TO_CART) ||
                    translations.ADD_TO_CART
                  }
                  btnBackColor="transparent"
                  btnTextColor={appTheme.themeColor}
                />
                {isAddedToCart && (
                  <View
                    style={[
                      tickBadgeContainer,
                      { backgroundColor: appTheme.themeColor },
                    ]}>
                    <Image
                      resizeMode="contain"
                      source={{ uri: AppImages.tick }}
                      style={[getSize(10), { tintColor: appTheme.tint }]}
                    />
                  </View>
                )}
              </View>
              <AddCartBadge
                itemDetails={data}
                isBtn
                isBuyNow
                isBtnText={translations.BUY_NOW}
              />
            </View>
            <CustomText large style={[headingStyle, { color: appTheme.text }]}>
              {translations.DETAILS}
            </CustomText>
            <CustomText
              numberOfLines={6}
              style={[productDetailsStyle, { color: appTheme.lightGrayText }]}>
              {data?.description}
            </CustomText>
          </View>
        </View>
      </>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isAddedToCart]);

  return (
    <Layout
      showBack
      padding={0}
      scrollable
      statusBarColor={appTheme.tint}
      statusBarStyle="dark-content"
      onSubmitBtnType={'custom'}
      rightComponent={
        <CartBadge
          imgStyle={{ tintColor: appTheme.text }}
          exContainerStyle={cardBadgeStyle}
        />
      }>
      {((isLoading || isError) && LoadingContainer()) || renderProduct()}
    </Layout>
  );
};

export { ProductDetailsScreen };
