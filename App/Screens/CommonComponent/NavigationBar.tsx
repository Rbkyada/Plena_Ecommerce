import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import {
  Image,
  ImageStyle,
  Pressable,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import AppImages from '@Theme/AppImages';
import CommonStyle from '@Theme/CommonStyle';
import { AppContext } from '@AppContext';
import { CustomText } from '@CommonComponent/CustomText';
import { ButtonComponent } from '@SubComponents';
import { width } from '@Utils/Constant';
import { getSize, getRound } from '@Utils/Helper';

interface NavigationBarProps {
  title?: string;
  titleNumberOfLines?: number;
  titleCenter?: boolean;
  titleTextStyle?: StyleProp<TextStyle>;
  onSubmitBtnType?: 'btn' | 'text' | 'custom';
  submitStyle?: StyleProp<ViewStyle> | StyleProp<TextStyle>;
  isProcessing?: boolean;
  titleMaxLength?: number;
  backgroundColor?: string;
  showBack?: boolean;
  exStyle?: StyleProp<ViewStyle>;
  paddingHorizontal?: number;
  rightComponent?: JSX.Element;
  rightImage?: string;
  submit?: {
    onSubmit?: () => void;
    isSubmitProcessing?: boolean;
    submitTitle?: string;
    submitBtnStyle?: StyleProp<ViewStyle> | StyleProp<TextStyle>;
    onSubmitBtnType?: 'btn' | 'img' | 'text' | 'custom';
    customSubmitComponent?: JSX.Element;
    submitImage?: string;
    submitImageStyle?: StyleProp<ImageStyle>;
  };
}

const NavigationBar = (props: NavigationBarProps) => {
  const { appTheme } = useContext(AppContext);
  const {
    title,
    titleMaxLength,
    titleNumberOfLines,
    titleTextStyle,
    backgroundColor,
    exStyle,
    titleCenter = false,
    showBack,
    paddingHorizontal = 0,
    submit,
    rightComponent,
  } = props;

  const {
    onSubmit,
    isSubmitProcessing = false,
    submitTitle = 'Submit',
    submitBtnStyle,
    onSubmitBtnType = 'btn',
    customSubmitComponent,
    submitImage,
    submitImageStyle,
  } = submit ?? {};

  const navigation = useNavigation();

  const renderTitle = () => (
    <CustomText
      xlarge
      numberOfLines={titleNumberOfLines}
      maxLength={titleMaxLength}
      style={[
        styles.title,
        !titleCenter && showBack && styles.marginLeft,
        !titleCenter && CommonStyle.flex1,
        titleTextStyle,
      ]}>
      {title ?? ''}
    </CustomText>
  );

  const renderSubmit = () => {
    if (onSubmit) {
      switch (onSubmitBtnType) {
        case 'btn':
          return (
            <ButtonComponent
              onPress={onSubmit}
              title={submitTitle}
              style={[
                styles.submit,
                titleCenter && CommonStyle.alignSelfEnd,
                submitBtnStyle,
              ]}
              isProcessing={isSubmitProcessing}
              borderRadius={5}
            />
          );
        case 'custom':
          return (
            <View style={[titleCenter && CommonStyle.alignSelfEnd]}>
              {customSubmitComponent}
            </View>
          );
        case 'text':
          return (
            <CustomText
              onPress={onSubmit}
              style={[
                titleCenter && CommonStyle.alignSelfEnd,
                submitBtnStyle as StyleProp<TextStyle>,
              ]}>
              {submitTitle}
            </CustomText>
          );
        case 'img':
          return (
            <Pressable
              style={[
                titleCenter && CommonStyle.alignSelfEnd,
                submitBtnStyle as StyleProp<ViewStyle>,
              ]}
              onPress={onSubmit}>
              <Image
                resizeMode="contain"
                source={{ uri: submitImage }}
                style={[getSize(25), submitImageStyle]}
              />
            </Pressable>
          );
        default:
          return null;
      }
    } else if (onSubmitBtnType === 'custom') {
      return (
        <View style={[titleCenter && CommonStyle.alignSelfEnd]}>
          {customSubmitComponent}
        </View>
      );
    }
  };

  return (
    <View
      style={[
        styles.container,
        { paddingHorizontal },
        { backgroundColor: backgroundColor ?? appTheme.background },
        exStyle,
      ]}>
      {(showBack && (
        <Pressable
          style={[styles.backBtn, { backgroundColor: appTheme.lightGrayBack }]}
          onPress={() => navigation.goBack()}>
          <Image
            source={{ uri: AppImages.icBack }}
            style={[styles.icBack, { tintColor: appTheme.text }]}
            resizeMode="contain"
          />
        </Pressable>
      )) ||
        null}
      {(titleCenter && (
        <View style={[styles.centerTitleView, { paddingHorizontal }]}>
          {renderTitle()}
        </View>
      )) ||
        renderTitle()}

      {(titleCenter && (
        <View style={[CommonStyle.flex1]}>{renderSubmit()}</View>
      )) ||
        renderSubmit()}
      {rightComponent && rightComponent}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  marginLeft: {
    marginLeft: 15,
  },
  title: { fontWeight: 'bold' },
  icBack: {
    height: 14,
    width: 14,
  },
  backBtn: {
    paddingVertical: 5,
    zIndex: 1,
    ...getRound(43),
    ...CommonStyle.center,
    marginLeft: 14,
  },
  submit: {
    paddingVertical: 7,
    paddingHorizontal: 15,
    minWidth: 50,
    zIndex: 1,
  },
  centerTitleView: {
    position: 'absolute',
    width,
    ...CommonStyle.center,
  },
  imgStyle: {
    ...getSize(25),
    marginRight: 20,
    marginLeft: 35,
  },
});

export { NavigationBar };
