import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native';
import { CustomText } from '@CommonComponent';
import CommonStyle from '@Theme/CommonStyle';
import { AppContext } from '@AppContext';
import { fonts } from '@Utils/Constant';

const CategoryScreen = () => {
  const { appTheme } = useContext(AppContext);
  return (
    <SafeAreaView
      style={[
        CommonStyle.flexContainer,
        CommonStyle.center,
        { backgroundColor: appTheme.background },
      ]}>
      <CustomText style={[fonts.SemiBold]}>Category</CustomText>
    </SafeAreaView>
  );
};

export { CategoryScreen };
