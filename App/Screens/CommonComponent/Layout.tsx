import React, { memo, useContext } from 'react';
import {
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet,
  View,
  SafeAreaView,
  RefreshControl,
  StyleProp,
  ViewStyle,
  TextStyle,
  ImageStyle,
  ScrollView,
} from 'react-native';
import { isIOS } from '@Utils/Constant';
import { AppContext } from '@AppContext';
import { NavigationBar } from '@CommonComponent';
import CommonStyle from '@Theme/CommonStyle';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  titleCenter?: boolean;
  titleTextStyle?: StyleProp<TextStyle>;
  rightComponent?: JSX.Element;
  titleNumberOfLines?: number;
  titleMaxLength?: number;
  padding?: number;
  submit?: {
    onSubmit?: () => void;
    isSubmitProcessing?: boolean;
    submitTitle?: string;
    submitBtnStyle?: StyleProp<ViewStyle>;
    onSubmitBtnType?: 'btn' | 'img' | 'text' | 'custom';
    customSubmitComponent?: JSX.Element;
    submitImage?: string;
    submitImageStyle?: StyleProp<ImageStyle>;
  };
  scrollable?: boolean;
  headerHide?: boolean;
  backgroundColor?: string;
  showBack?: boolean;
  refreshControl?: {
    refreshing: boolean;
    onRefresh: () => void;
  };
  navBarContainerStyle?: StyleProp<ViewStyle>;
  removeContainerView?: boolean;
  onSubmitBtnType?: 'btn' | 'text' | 'custom';
  statusBarColor?: string;
  statusBarStyle?: 'light-content' | 'dark-content';
}

const Layout = memo((props: LayoutProps) => {
  const { appTheme } = useContext(AppContext);
  const {
    children,
    title,
    titleCenter,
    titleTextStyle,
    titleNumberOfLines = 1,
    titleMaxLength,
    padding = 10,
    scrollable = false,
    backgroundColor,
    showBack = false,
    headerHide = false,
    refreshControl,
    navBarContainerStyle,
    submit,
    removeContainerView = false,
    onSubmitBtnType = 'btn',
    rightComponent,
    statusBarColor = appTheme.themeColor,
    statusBarStyle = 'light-content',
  } = props;

  return (
    <SafeAreaView
      style={[
        CommonStyle.flex1,
        { backgroundColor: backgroundColor ?? appTheme.background },
      ]}>
      <StatusBar backgroundColor={statusBarColor} barStyle={statusBarStyle} />
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.keyboardView}
        keyboardVerticalOffset={isIOS ? 0 : -500}>
        {!headerHide && (
          <NavigationBar
            title={title}
            titleCenter={titleCenter}
            titleTextStyle={titleTextStyle}
            titleNumberOfLines={titleNumberOfLines}
            titleMaxLength={titleMaxLength}
            backgroundColor={backgroundColor}
            showBack={showBack}
            exStyle={navBarContainerStyle}
            paddingHorizontal={padding}
            submit={submit}
            onSubmitBtnType={onSubmitBtnType}
            rightComponent={rightComponent}
          />
        )}
        {(scrollable && (
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always"
            contentContainerStyle={[styles.scrollContainer, { padding }]}
            refreshControl={
              (refreshControl && (
                <RefreshControl
                  refreshing={refreshControl.refreshing}
                  onRefresh={refreshControl.onRefresh}
                  tintColor={appTheme.themeColor}
                />
              )) ||
              undefined
            }>
            {children}
          </ScrollView>
        )) ||
          (removeContainerView && (
            <View style={{ padding }}>{children}</View>
          )) || (
            <View style={[CommonStyle.flex1, { padding }]}>{children}</View>
          )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContainer: { flexGrow: 1 },
});

export { Layout };
