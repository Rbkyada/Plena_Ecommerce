import React, { useContext } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import AppImages from '@Theme/AppImages';
import { getSize } from '@Utils/Helper';
import { CustomText } from '@CommonComponent/CustomText';
import { AppContext } from '@AppContext';

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    columnGap: 18,
    marginHorizontal: 20,
    paddingVertical: 18,
    paddingHorizontal: 26,
    borderRadius: 28,
    marginBottom: 15,
  },
});

const SearchBar = () => {
  const { appTheme, translations } = useContext(AppContext);

  const { searchContainer } = styles;

  return (
    <View
      style={[searchContainer, { backgroundColor: appTheme.darkThemeColor }]}>
      <Image
        resizeMode="contain"
        style={getSize(18)}
        source={{ uri: AppImages.search }}
      />
      <CustomText style={{ color: appTheme.lightGrayText }}>
        {translations.SEARCH_PLACEHOLDER}
      </CustomText>
    </View>
  );
};

export { SearchBar };
