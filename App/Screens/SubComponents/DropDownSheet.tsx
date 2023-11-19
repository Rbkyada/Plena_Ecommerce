import React, { memo, useContext } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { fonts, isIOS } from '@Utils/Constant';
import { CustomText } from '@CommonComponent/index';
import { AppContext } from '@AppContext';

const styles = StyleSheet.create({
  dropContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    marginBottom: 10,
  },
  dropDown: {
    borderRadius: 10,
    paddingLeft: 15,
    width: '100%',
    height: 40,
    overflow: 'hidden',
  },
  dropContactStyle: {
    marginTop: isIOS ? 2 : 3,
  },
  fontStyle: {
    fontSize: 14,
  },
  labelStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 17,
    paddingVertical: 13,
    columnGap: 10,
  },
  errorTxt: {
    ...fonts.Bold,
    margin: 5,
  },
  dropTitleStyle: {
    ...fonts.SemiBold,
    marginBottom: 3,
    marginLeft: 17,
    marginTop: 7,
    zIndex: 1,
    transform: [{ translateY: 12 }],
  },
  iconStyle: {
    marginRight: 15,
  },
  textPropsStyle: {
    marginLeft: 4,
    flexShrink: 1,
    ...fonts.Medium,
    numberOfLines: 1,
    marginTop: 10,
  },
  labelInStyle: {
    flexShrink: 1,
  },
});

interface DropDownProps {
  dataList: {
    label: string;
    value: string;
  }[];
  isFocus: boolean;
  search?: boolean;
  value: string;
  searchPlaceholder?: string;
  onFocus: () => void;
  onBlur: () => void;
  onSelectedChangeText: (item: {
    label: string;
    value: string;
    id?: string;
  }) => void;
  error?: string;
  disabled?: boolean;
  valueField?: 'value' | 'label' | 'id';
  placeholder: string;
  dropLabel?: string;
  dropDownStyle?: StyleProp<ViewStyle>;
  dropContainerStyle?: StyleProp<ViewStyle>;
}

const DropDownSheet = memo((props: DropDownProps) => {
  const { appTheme } = useContext(AppContext);

  const {
    dropContainer,
    dropContactStyle,
    dropDown,
    fontStyle,
    labelStyle,
    errorTxt,
    dropTitleStyle,
    textPropsStyle,
    labelInStyle,
  } = styles;

  const {
    dataList,
    isFocus = false,
    search = false,
    value,
    onFocus,
    onBlur,
    onSelectedChangeText,
    error,
    disabled = false,
    valueField = 'value',
    placeholder,
    dropLabel,
    dropDownStyle,
    dropContainerStyle,
  } = props;

  return (
    <View>
      {dropLabel && (
        <CustomText style={[dropTitleStyle, { color: appTheme.gray }]}>
          {dropLabel}
        </CustomText>
      )}
      <View style={[dropContainer, dropContainerStyle]}>
        <Dropdown
          testID="drop"
          data={dataList}
          labelField="label"
          valueField={valueField}
          disable={disabled}
          containerStyle={[
            dropContactStyle,
            { backgroundColor: appTheme.background },
          ]}
          search={search}
          maxHeight={250}
          searchPlaceholder={placeholder}
          activeColor={appTheme.background}
          onChange={(item: { label: string; value: string; id?: string }) => {
            onSelectedChangeText(item);
          }}
          value={value}
          placeholder={placeholder}
          placeholderStyle={[fontStyle, { color: appTheme.background }]}
          style={[
            dropDown,
            { backgroundColor: appTheme.themeColor },
            dropDownStyle,
          ]}
          selectedTextStyle={[fontStyle, { color: appTheme.background }]}
          inputSearchStyle={[
            fontStyle,
            { backgroundColor: appTheme.tint, color: appTheme.lightText },
          ]}
          itemContainerStyle={{
            backgroundColor: appTheme.tint,
          }}
          selectedTextProps={{
            style: {
              color: appTheme.tint,
              ...textPropsStyle,
            },
          }}
          renderItem={(item: any, selected) => {
            return (
              <View
                style={[
                  labelStyle,
                  {
                    backgroundColor:
                      (selected && appTheme.lightGrayBack) || appTheme.tint,
                  },
                ]}>
                <CustomText
                  style={[labelInStyle, { color: appTheme.themeColor }]}>
                  {item.label}
                </CustomText>
              </View>
            );
          }}
          iconStyle={{
            ...styles.iconStyle,
            tintColor: appTheme.tint,
            transform: [{ rotate: (isFocus && '0deg') || '0deg' }],
          }}
          fontFamily={fonts.Bold.fontFamily}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </View>
      {(error && (
        <CustomText
          small
          style={[errorTxt, { color: appTheme.red }]}>{`${error}`}</CustomText>
      )) ||
        null}
    </View>
  );
});

export { DropDownSheet };
