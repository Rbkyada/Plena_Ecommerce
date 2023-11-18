import { SafeAreaView } from 'react-native';
import React, { useContext } from 'react';
import { CustomText } from '@CommonComponent';
import CommonStyle from '@Theme/CommonStyle';
import { AppContext } from '@AppContext';

const CategoryScreen = () => {
  const { appTheme } = useContext(AppContext);
  return (
    <SafeAreaView
      style={[
        CommonStyle.flexContainer,
        CommonStyle.center,
        { backgroundColor: appTheme.background },
      ]}>
      <CustomText>CategoryScreen</CustomText>
    </SafeAreaView>
  );
};

export { CategoryScreen };
