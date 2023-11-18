import React, { useContext } from 'react';
import { View, FlatList, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { AppContext } from '@AppContext';
import { ProductCard } from '@SubComponents/index';

const styles = StyleSheet.create({
  flatColumn: {
    justifyContent: 'space-between',
    paddingHorizontal: 14,
  },
  flatStyle: {
    flexGrow: 0,
    paddingBottom: 250,
  },
  separatorStyle: {
    height: 15,
  },
});

interface RenderProductInFlatProps {
  horizontalFlat?: boolean;
  exSeparatorStyle?: StyleProp<ViewStyle>;
  footerStyle?: StyleProp<ViewStyle>;
}

const RenderProductInFlat = (props: RenderProductInFlatProps) => {
  const { appTheme } = useContext(AppContext);

  const { flatStyle, flatColumn, separatorStyle } = styles;

  const { horizontalFlat = false } = props;

  const renderItem = () => {
    return <ProductCard />;
  };

  const itemSeparator = () => {
    return <View style={[separatorStyle, props.exSeparatorStyle]} />;
  };

  return (
    <View>
      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]}
        renderItem={renderItem}
        numColumns={2}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={horizontalFlat ? null : flatColumn}
        contentContainerStyle={flatStyle}
        ItemSeparatorComponent={itemSeparator}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={<View />}
        ListFooterComponentStyle={props.footerStyle}
      />
    </View>
  );
};

export { RenderProductInFlat };
