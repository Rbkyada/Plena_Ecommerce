import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { AppContext } from '@AppContext';
import { CustomText } from '@CommonComponent/CustomText';
import { height } from '@Utils/Constant';
import { useCartBillingHandler } from '@Hooks/use-cartbilling-handler';

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

  const { billingContainer, billingRowStyle, billingOuterView } = styles;

  const { billingInfo } = useCartBillingHandler();

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
