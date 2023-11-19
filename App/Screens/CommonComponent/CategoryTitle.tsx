import React, { memo } from 'react';
import { StyleProp, StyleSheet, TextStyle } from 'react-native';
import { CustomText } from '@CommonComponent/CustomText';

const styles = StyleSheet.create({
  titleStyle: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
});

interface CategoryTitleProps {
  title: string;
  exTextStyle?: StyleProp<TextStyle>;
}

const CategoryTitle = memo((props: CategoryTitleProps) => {
  const { exTextStyle, title } = props;
  const { titleStyle } = styles;

  return (
    <CustomText size={30} style={[titleStyle, exTextStyle]}>
      {title}
    </CustomText>
  );
});

export { CategoryTitle };
