import { useEffect, useState } from 'react';
import { useAppSelector } from '@Stores';
import { BillingInfo } from '@Utils/Interface';
import { DELIVERY_CHARGES } from '@Utils/Constant';

export const useCartBillingHandler = () => {
  const { cartList } = useAppSelector(state => state.cart);

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

  return { billingInfo };
};
