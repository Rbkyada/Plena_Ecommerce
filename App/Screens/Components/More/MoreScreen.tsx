import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native';
import CommonStyle from '@Theme/CommonStyle';
import { AppContext } from '@AppContext';
import { CustomText } from '@CommonComponent/index';
import { fonts } from '@Utils/Constant';

const MoreScreen = () => {
  const { appTheme } = useContext(AppContext);

  return (
    <SafeAreaView
      style={[
        CommonStyle.flexContainer,
        CommonStyle.center,
        { backgroundColor: appTheme.background },
      ]}>
      <CustomText style={[fonts.SemiBold]}>More Details</CustomText>
    </SafeAreaView>
  );
};

export { MoreScreen };
