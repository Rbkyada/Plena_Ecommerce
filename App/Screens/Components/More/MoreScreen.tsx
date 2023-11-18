import { SafeAreaView } from 'react-native';
import React, { useContext } from 'react';
import CommonStyle from '@Theme/CommonStyle';
import { AppContext } from '@AppContext';
import { CustomText } from '@CommonComponent/index';

const MoreScreen = () => {
  const { appTheme } = useContext(AppContext);

  return (
    <SafeAreaView
      style={[
        CommonStyle.flexContainer,
        CommonStyle.center,
        { backgroundColor: appTheme.background },
      ]}>
      <CustomText>MoreScreen</CustomText>
    </SafeAreaView>
  );
};

export { MoreScreen };
