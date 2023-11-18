import React, { useContext, useEffect, useState } from 'react';
import { Image, ImageStyle, Pressable, StyleProp } from 'react-native';
import { AppContext } from '@AppContext';
import { getSize } from '@Utils/Helper';
import AppImages from '@Theme/AppImages';
import { useAppDispatch, useAppSelector } from '@Stores';
import { Product } from '@Utils/Interface';
import { addRemoveFromFavorite } from '@Actions/UserActions';
import { useIsFocused } from '@react-navigation/native';

interface FavoriteBtnProps {
  exStyle?: StyleProp<ImageStyle>;
  product: Product;
  iconSize?: number;
}

const FavoriteBtn = (props: FavoriteBtnProps) => {
  const { appTheme } = useContext(AppContext);
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();

  const { favorites } = useAppSelector(state => state.user);
  const { exStyle, iconSize = 20 } = props;

  const [isFav, setIsFav] = useState(false);

  const addOrRemoveFavorite = () => {
    let newFav: Product[] = favorites || [];
    let isSelect =
      favorites?.findIndex(item => item.id === props?.product.id) > -1;
    if (isSelect) {
      newFav = newFav.filter(item => item.id !== props?.product.id);
    } else {
      newFav.push(props?.product);
      setIsFav(true);
    }
    setIsFav(!isSelect);
    dispatch(
      addRemoveFromFavorite({
        favorites: newFav,
      }),
    );
  };

  useEffect(() => {
    let isSelect =
      favorites?.findIndex(item => item.id === props?.product.id) > -1;
    setIsFav(isSelect);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favorites, isFocused]);

  return (
    <Pressable
      style={[{ backgroundColor: appTheme.lightOverlay }, exStyle]}
      onPress={addOrRemoveFavorite}>
      <Image
        resizeMode="contain"
        source={{
          uri: (isFav && AppImages.icHeartActive) || AppImages.icHeartInactive,
        }}
        style={[
          getSize(iconSize),
          { tintColor: (isFav && appTheme.fillHeart) || appTheme.text },
        ]}
      />
    </Pressable>
  );
};

export { FavoriteBtn };
