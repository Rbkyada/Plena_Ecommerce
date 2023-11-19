import React, { useContext } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { CustomText, Layout } from '@CommonComponent';
import { AppContext } from '@AppContext';
import { fonts, height, width } from '@Utils/Constant';
import { ButtonComponent } from '@SubComponents';
import { useAppSelector } from '@Stores';
import { CartProduct } from '@Utils/Interface';
import { ProductActionCard } from '@CommonComponent/ProductActionCard';
import { CartBillingComponent } from '@CommonComponent/CartBillingComponent';

const styles = StyleSheet.create({
  emptyCartText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.7,
  },
  btnStyle: {
    width: width * 0.9,
    borderRadius: 20,
  },
  btnContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  flatStyle: {
    flexGrow: 0,
    paddingHorizontal: 22,
    paddingVertical: 10,
    paddingTop: 20,
  },
  separatorStyle: {
    height: 2,
    marginVertical: 10,
  },
  billingContainer: {
    margin: 20,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
});

const CartScreen = () => {
  const { appTheme, translations } = useContext(AppContext);
  const { cartList, totalCartProduct } = useAppSelector(state => state.cart);

  const { btnStyle, btnContainer, emptyCartText, flatStyle, separatorStyle } =
    styles;

  const renderItem = ({ item }: { item: CartProduct }) => {
    return <ProductActionCard item={item} />;
  };

  const renderEmptyCart = () => {
    return (
      <View style={emptyCartText}>
        <CustomText large>{translations.EMPTY_CART_TEXT}</CustomText>
      </View>
    );
  };

  const itemSeparator = () => {
    return (
      <View
        style={[separatorStyle, { backgroundColor: appTheme.lightGrayBack }]}
      />
    );
  };

  return (
    <>
      <Layout
        padding={0}
        title={`${translations.SHOPPING_CART} (${totalCartProduct})`}
        showBack
        scrollable
        titleTextStyle={[fonts.Light]}>
        <View>
          <FlatList
            data={cartList}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            contentContainerStyle={flatStyle}
            ListEmptyComponent={renderEmptyCart}
            ItemSeparatorComponent={itemSeparator}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        {cartList?.length! > 0 && <CartBillingComponent />}
      </Layout>
      {cartList?.length! > 0 && (
        <ButtonComponent
          title={translations.PROCEED_TO_CHECKOUT}
          onPress={() => {}}
          outerStyle={btnContainer}
          style={btnStyle}
        />
      )}
    </>
  );
};

export { CartScreen };
