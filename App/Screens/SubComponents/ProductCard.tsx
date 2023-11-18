import React, { useContext } from 'react';
import { View, Pressable, Image, StyleSheet } from 'react-native';
import { CustomText, NetworkImage } from '@CommonComponent';
import { AppContext } from '@AppContext';
import { getRound, getSize } from '@Utils/Helper';
import { width } from '@Utils/Constant';
import AppImages from '@Theme/AppImages';

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  imgStyle: {
    height: 150,
    width: width * 0.45,
  },
  priceContainer: {
    padding: 15,
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
});

const ProductCard = () => {
  const { appTheme } = useContext(AppContext);

  const {
    cardContainer,
    imgStyle,
    priceContainer,
    addCartBtnStyle,
    heartContainer,
  } = styles;

  return (
    <View style={[cardContainer, { backgroundColor: appTheme.lightGrayBack }]}>
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
        source={'https://i.dummyjson.com/data/products/1/thumbnail.jpg'}
        imageStyle={imgStyle}
      />
      <View style={priceContainer}>
        <View>
          <CustomText large style={{ color: appTheme.text }}>
            $325
          </CustomText>
          <CustomText style={{ color: appTheme.subText }}>
            Clown Tang.H03
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
    </View>
  );
};

export { ProductCard };
