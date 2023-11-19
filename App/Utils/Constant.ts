import { Platform, Dimensions } from 'react-native';

export const isIOS = Platform.OS === 'ios';

export const { height, width } = Dimensions.get('window');

export const aspectRatio = height / width;
export const isiPad = aspectRatio < 1.6;

// Custom Fonts
export const fonts = {
  Regular: { fontFamily: 'Manrope-Regular' },
  Light: { fontFamily: 'Manrope-Light' },
  Medium: { fontFamily: 'Manrope-Medium' },
  SemiBold: { fontFamily: 'Manrope-SemiBold' },
  Bold: { fontFamily: 'Manrope-Bold' },
};

// Font Sizes
export const fontSizes = {
  xsmall: 10,
  small: 12,
  medium: 14,
  large: 16,
  xlarge: 18,
  xxlarge: 25,
  xxxlarge: 32,
};

export const alertData = {
  updateVersion: {
    title: 'New updates available',
    subTitle: 'To continue to use the BoilerPlate,\nyou must update your app.',
  },
};

export const DELIVERY_CHARGES = 2;
