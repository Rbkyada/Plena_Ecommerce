import React, { useContext } from 'react';
import { Layout, RenderProductInFlat } from '@CommonComponent';
import { useAppSelector } from '@Stores';
import { AppContext } from '@AppContext';
import { CategoryTitle } from '@CommonComponent/CategoryTitle';

const FavoriteScreen = () => {
  const { translations } = useContext(AppContext);

  const { favorites } = useAppSelector(state => state.user);
  return (
    <Layout headerHide padding={0}>
      <CategoryTitle title={translations.FAVORITES} />
      <RenderProductInFlat
        flatData={favorites}
        emptyText={translations.EMPTY_RECOMMENDED_TEXT}
      />
    </Layout>
  );
};

export { FavoriteScreen };
