import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { AppContext } from '@AppContext';
import { useAppSelector } from '@Stores';
import { CustomText } from '@CommonComponent/CustomText';
import { BillingInfo } from '@Utils/Interface';
import { DELIVERY_CHARGES, height } from '@Utils/Constant';

const styles = StyleSheet.create({
  billingOuterView: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: height * 0.1,
  },
  billingContainer: {
    margin: 20,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  billingRowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
});

const CartBillingComponent = () => {
  const { appTheme, translations } = useContext(AppContext);
  const { cartList } = useAppSelector(state => state.cart);

  const { billingContainer, billingRowStyle, billingOuterView } = styles;

  const [billingInfo, setBillingInfo] = useState<BillingInfo>({
    payable: 0,
    delivery: 0,
    total: 0,
  });

  useEffect(() => {
    let billing: BillingInfo = {
      payable: 0,
      delivery: 0,
      total: 0,
    };

    cartList &&
      cartList?.forEach(item => {
        billing.payable += item.price * item.quantity;
      });

    billing.delivery = DELIVERY_CHARGES;
    billing.total = billing.payable + billing.delivery;
    setBillingInfo(billing);
  }, [cartList]);

  const renderBillingInfo = (title: string, value: string) => {
    return (
      <View style={billingRowStyle}>
        <CustomText>{title}</CustomText>
        <CustomText>{value}</CustomText>
      </View>
    );
  };

  return (
    <View style={billingOuterView}>
      <View
        style={[billingContainer, { backgroundColor: appTheme.lightGrayBack }]}>
        {renderBillingInfo(translations.SUB_TOTAL, `$${billingInfo?.payable}`)}
        {renderBillingInfo(
          translations.DELIVERY_CHARGES,
          `$${billingInfo?.delivery}`,
        )}
        {renderBillingInfo(translations.TOTAL, `$${billingInfo?.total}`)}
      </View>
    </View>
  );
};

export { CartBillingComponent };
