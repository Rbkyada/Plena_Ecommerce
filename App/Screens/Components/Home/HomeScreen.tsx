/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '@Stores/index';
import { RenderProductInFlat, SearchBar } from '@CommonComponent/index';
import { CustomText, Layout } from '@CommonComponent';
import { AppContext } from '@AppContext';
import { CartBadge } from '@CommonComponent/index';
import {
  ADS_BANNER,
  DELIVERY_TIME,
  SELECTED_USER_VALUE,
  USER_ADDRESS,
  fonts,
} from '@Utils/Constant';
import { getRecommendList } from '@Actions/ProductAction';
import { CategoryTitle } from '@CommonComponent/CategoryTitle';
import { AdsBanner } from '@CommonComponent/AdsBanner';
import { DropDownSheet } from '@SubComponents/DropDownSheet';
import CommonStyle from '@Theme/CommonStyle';

const styles = StyleSheet.create({
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  deliveryStyle: {
    width: 200,
  },
  timeStyle: {
    width: 120,
  },
});

const HomeScreen = () => {
  const { appTheme, translations } = useContext(AppContext);
  const dispatch = useAppDispatch();

  const { skip, data, isLoading } = useAppSelector(
    state => state.product.productList,
  );

  const { nameContainer, deliveryStyle, timeStyle } = styles;

  const [isFocusAddress, setIsFocusAddress] = useState(false);
  const [isFocusTime, setIsFocusTime] = useState(false);
  const [isSelectedAddress, setIsSelectedAddress] =
    useState(SELECTED_USER_VALUE);
  const [isSelectedPool, setIsSelectedPool] = useState(SELECTED_USER_VALUE);

  const onRefreshList = () => {
    dispatch(getRecommendList({ skip: 0, isLoading: false }));
  };

  const onEndReachedList = () => {
    dispatch(getRecommendList({ skip, isLoading: false }));
  };

  const renderRecommendedList = useMemo(() => {
    return (
      <RenderProductInFlat
        flatData={data}
        emptyText={translations.EMPTY_RECOMMENDED_TEXT}
        isProcessing={isLoading}
        onRefresh={onRefreshList}
        onEndReached={onEndReachedList}
        renderHeader={() => (
          <>
            <AdsBanner bannerData={ADS_BANNER} />
            <CategoryTitle title={translations.RECOMMENDED} />
          </>
        )}
      />
    );
  }, [data, isLoading]);

  return (
    <Layout padding={0} headerHide>
      <View style={{ backgroundColor: appTheme.themeColor }}>
        <View style={nameContainer}>
          <CustomText xxlarge style={[fonts.Medium, { color: appTheme.tint }]}>
            {translations.USER_NAME}
          </CustomText>
          <CartBadge />
        </View>
        <SearchBar />
        <View style={[CommonStyle.rowSpaceBetween]}>
          <DropDownSheet
            dataList={USER_ADDRESS}
            dropLabel={translations.DELIVERY_TO}
            onFocus={() => setIsFocusAddress(true)}
            onBlur={() => setIsFocusAddress(false)}
            placeholder={translations.SELECT_ADDRESS}
            value={isSelectedAddress}
            onSelectedChangeText={item => {
              setIsSelectedAddress(item.value);
            }}
            isFocus={isFocusAddress}
            dropContainerStyle={deliveryStyle}
          />
          <DropDownSheet
            dataList={DELIVERY_TIME}
            dropLabel={translations.WITH_IN}
            onFocus={() => setIsFocusTime(true)}
            onBlur={() => setIsFocusTime(false)}
            placeholder={translations.SELECT_DELIVERY_TIME}
            value={isSelectedPool}
            onSelectedChangeText={item => {
              setIsSelectedPool(item.value);
            }}
            isFocus={isFocusTime}
            dropContainerStyle={timeStyle}
          />
        </View>
      </View>
      {renderRecommendedList}
    </Layout>
  );
};

export { HomeScreen };
