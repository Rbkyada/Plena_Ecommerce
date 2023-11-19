import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Layout, RenderProductInFlat } from '@CommonComponent';
import { useAppSelector } from '@Stores';
import { AppContext } from '@AppContext';
import { CategoryTitle } from '@CommonComponent/CategoryTitle';
import { height } from '@Utils/Constant';

const styles = StyleSheet.create({
  emptyCartText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.8,
  },
});

const FavoriteScreen = () => {
  const { translations } = useContext(AppContext);
  const { favorites } = useAppSelector(state => state.user);

  const { emptyCartText } = styles;

  return (
    <Layout headerHide padding={0}>
      <CategoryTitle title={translations.FAVORITES} />
      <RenderProductInFlat
        flatData={favorites}
        emptyText={translations.EMPTY_FAVORITES_TEXT}
        emptyStyle={emptyCartText}
      />
    </Layout>
  );
};

export { FavoriteScreen };
