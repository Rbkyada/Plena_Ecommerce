import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '@Stores/index';
import { RenderProductInFlat, SearchBar } from '@CommonComponent/index';
import { CustomText, Layout } from '@CommonComponent';
import { AppContext } from '@AppContext';
import { CartBadge } from '@CommonComponent/index';
import { fonts } from '@Utils/Constant';
import { getRecommendList } from '@Actions/ProductAction';

const styles = StyleSheet.create({
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headingStyle: {
    marginHorizontal: 14,
    paddingVertical: 10,
  },
});

const HomeScreen = () => {
  const { appTheme, translations } = useContext(AppContext);
  const dispatch = useAppDispatch();

  const { skip, data, isLoading } = useAppSelector(
    state => state.product.productList,
  );

  const { nameContainer, headingStyle } = styles;

  const onRefreshList = () => {
    dispatch(getRecommendList({ skip: 0, isLoading: false }));
  };

  const onEndReachedList = () => {
    dispatch(getRecommendList({ skip, isLoading: false }));
  };

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
      </View>
      <View>
        <CustomText size={30} style={headingStyle}>
          {translations.RECOMMENDED}
        </CustomText>
        <RenderProductInFlat
          flatData={data}
          emptyText={translations.EMPTY_RECOMMENDED_TEXT}
          isProcessing={isLoading}
          onRefresh={onRefreshList}
          onEndReached={onEndReachedList}
        />
      </View>
    </Layout>
  );
};

export { HomeScreen };
