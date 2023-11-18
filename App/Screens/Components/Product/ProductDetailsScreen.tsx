import { StyleSheet, View } from 'react-native';
import React, { useCallback, useContext } from 'react';
import { Rating } from 'react-native-ratings';
import {
  CartBadge,
  CustomText,
  Layout,
  Loading,
  ProductSlider,
} from '@CommonComponent';
import { AppContext } from '@AppContext';
import { useAppSelector } from '@Stores';
import { fonts, width } from '@Utils/Constant';
import { FavoriteBtn } from '@SubComponents/FavoriteBtn';
import { ButtonComponent } from '@SubComponents';

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
  btnStyle: {
    borderWidth: 1,
    width: width * 0.44,
    borderRadius: 20,
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
});

const ProductDetailsScreen = () => {
  const { appTheme, translations } = useContext(AppContext);

  const { data, isLoading, isError } = useAppSelector(
    state => state.product.currentProduct,
  );

  const {
    titleContainer,
    favExStyle,
    productTitle,
    btnContainer,
    btnStyle,
    headingStyle,
    productDetailsStyle,
    ratingStyle,
    ratingOverlayStyle,
    ratingContainerStyle,
    cutOffStyle,
    priceContainer,
    cardBadgeStyle,
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
              <ButtonComponent
                title={translations.ADD_TO_CART}
                backColor="transparent"
                textColor={appTheme.themeColor}
                style={[btnStyle, { borderColor: appTheme.themeColor }]}
                onPress={() => {}}
              />
              <ButtonComponent
                title={translations.BUY_NOW}
                style={[btnStyle, { borderColor: appTheme.themeColor }]}
                onPress={() => {}}
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
  }, [data]);

  return (
    <Layout
      showBack
      padding={0}
      scrollable
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
