import React, { useContext } from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';
import { getRound, getSize } from '@Utils/Helper';
import { AppContext } from '@AppContext';

const styles = StyleSheet.create({
  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    ...getRound(40),
  },
});

interface CardBtnProps {
  img: string;
  onBtnPress?: () => void;
}

const CartBtn = (props: CardBtnProps) => {
  const { appTheme } = useContext(AppContext);
  const { btnContainer } = styles;

  const { img, onBtnPress } = props;

  return (
    <Pressable
      onPress={onBtnPress}
      style={[btnContainer, { backgroundColor: appTheme.lightGrayBack }]}>
      <Image
        source={{ uri: img }}
        style={[getSize(24), { tintColor: appTheme.blackMat }]}
      />
    </Pressable>
  );
};

export { CartBtn };
