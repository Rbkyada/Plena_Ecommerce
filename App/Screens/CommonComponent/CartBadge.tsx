import React, { useContext } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { getRound, getSize } from '@Utils/Helper';
import AppImages from '@Theme/AppImages';
import { AppContext } from '@AppContext';
import { CustomText } from '@CommonComponent';
import { fonts } from '@Utils/Constant';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 24,
  },
  badge: {
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -8,
    right: -8,
    zIndex: 1,
    ...getRound(22),
  },
});

const CartBadge = () => {
  const { appTheme } = useContext(AppContext);

  const { container, badge } = styles;

  return (
    <View style={container}>
      <View style={[badge, { backgroundColor: appTheme.darkYellow }]}>
        <CustomText style={[fonts.Light, { color: appTheme.tint }]}>
          3
        </CustomText>
      </View>
      <Image
        resizeMode="contain"
        source={{ uri: AppImages.icBag }}
        style={getSize(24)}
      />
    </View>
  );
};

export { CartBadge };
