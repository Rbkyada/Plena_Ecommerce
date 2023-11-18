import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { RenderProductInFlat, SearchBar } from '@CommonComponent/index';
import { CustomText, Layout } from '@CommonComponent';
import { AppContext } from '@AppContext';
import { CartBadge } from '@CommonComponent/index';
import { fonts } from '@Utils/Constant';

const styles = StyleSheet.create({
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headingStyle: {
    marginHorizontal: 14,
  },
});

const Home = () => {
  const { appTheme, translations } = useContext(AppContext);

  const { nameContainer, headingStyle } = styles;

  return (
    <Layout padding={0}>
      <View style={{ backgroundColor: appTheme.themeColor }}>
        <View style={nameContainer}>
          <CustomText xxlarge style={[fonts.Medium, { color: appTheme.tint }]}>
            {translations.USER_NAME}
          </CustomText>
          <CartBadge />
        </View>
        <SearchBar />
      </View>
      <View>
        <CustomText size={30} style={headingStyle}>
          {translations.RECOMMENDED}
        </CustomText>
        <RenderProductInFlat />
      </View>
    </Layout>
  );
};

export default Home;
