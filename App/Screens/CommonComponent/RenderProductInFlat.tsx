import React, { useContext } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  StyleProp,
  ViewStyle,
  RefreshControl,
} from 'react-native';
import { AppContext } from '@AppContext';
import { ProductCard } from '@SubComponents/index';
import { Product } from '@Utils/Interface';
import { CustomText, Loading } from '@CommonComponent/index';
import { fonts, height } from '@Utils/Constant';

const styles = StyleSheet.create({
  flatColumn: {
    justifyContent: 'space-between',
    paddingHorizontal: 14,
  },
  flatStyle: {
    flexGrow: 0,
    paddingBottom: 330,
  },
  separatorStyle: {
    height: 15,
  },
  emptyTextStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: height / 1.6,
  },
  isLoadingStyle: {
    flex: 1,
    marginTop: height / 3.3,
  },
});

interface RenderProductInFlatProps {
  flatData?: Product[];
  horizontalFlat?: boolean;
  exSeparatorStyle?: StyleProp<ViewStyle>;
  footerStyle?: StyleProp<ViewStyle>;
  emptyStyle?: StyleProp<ViewStyle>;
  emptyText: string;
  isProcessing?: boolean;
  onRefresh?: () => void;
  onEndReached?: () => void;
}

const RenderProductInFlat = (props: RenderProductInFlatProps) => {
  const { appTheme } = useContext(AppContext);

  const {
    flatStyle,
    flatColumn,
    separatorStyle,
    emptyTextStyle,
    isLoadingStyle,
  } = styles;

  const {
    horizontalFlat = false,
    flatData,
    exSeparatorStyle,
    footerStyle,
    emptyStyle,
    emptyText,
    isProcessing = false,
    onRefresh,
    onEndReached,
  } = props;

  const renderItem = ({ item }: { item: Product }) => {
    return <ProductCard itemDetails={item} />;
  };

  const itemSeparator = () => {
    return <View style={[separatorStyle, exSeparatorStyle]} />;
  };

  const renderEmptyComponent = () => {
    return (
      <View style={[emptyTextStyle, emptyStyle]}>
        <CustomText style={[fonts.SemiBold, { color: appTheme.text }]}>
          {emptyText}
        </CustomText>
      </View>
    );
  };

  const refreshControl = () => (
    <RefreshControl
      refreshing={false}
      onRefresh={onRefresh}
      tintColor={appTheme.themeColor}
    />
  );

  return (
    <View>
      {(isProcessing && (
        <View style={isLoadingStyle}>
          <Loading />
        </View>
      )) || (
        <FlatList
          data={flatData}
          renderItem={renderItem}
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={horizontalFlat ? null : flatColumn}
          contentContainerStyle={flatStyle}
          ItemSeparatorComponent={itemSeparator}
          ListEmptyComponent={renderEmptyComponent}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={0.5}
          onEndReached={onEndReached}
          refreshControl={refreshControl()}
          ListFooterComponent={<View />}
          ListFooterComponentStyle={footerStyle}
        />
      )}
    </View>
  );
};

export { RenderProductInFlat };
