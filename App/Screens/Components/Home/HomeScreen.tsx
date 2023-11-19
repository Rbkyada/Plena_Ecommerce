import React, { useContext, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '@Stores/index';
import { RenderProductInFlat, SearchBar } from '@CommonComponent/index';
import { CustomText, Layout } from '@CommonComponent';
import { AppContext } from '@AppContext';
import { CartBadge } from '@CommonComponent/index';
import { fonts } from '@Utils/Constant';
import { getRecommendList } from '@Actions/ProductAction';
import { CategoryTitle } from '@CommonComponent/CategoryTitle';

const styles = StyleSheet.create({
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});

const HomeScreen = () => {
  const { appTheme, translations } = useContext(AppContext);
  const dispatch = useAppDispatch();

  const { skip, data, isLoading } = useAppSelector(
    state => state.product.productList,
  );

  const { nameContainer } = styles;

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
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      </View>
      <View>
        <CategoryTitle title={translations.RECOMMENDED} />
        {renderRecommendedList}
      </View>
    </Layout>
  );
};

export { HomeScreen };
