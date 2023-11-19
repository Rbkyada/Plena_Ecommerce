import React, { memo, useContext } from 'react';
import { Image } from 'react-native';
import { getSize } from '@Utils/Helper';
import { AppContext } from '@AppContext';

interface TabIconProps {
  focused: boolean;
  tabIcon: string;
}

const TabIcon = memo((props: TabIconProps) => {
  const { appTheme } = useContext(AppContext);
  const { focused, tabIcon } = props;
  return (
    <Image
      resizeMode="contain"
      style={[
        getSize(24),
        { tintColor: (focused && appTheme.tabIconFill) || appTheme.text },
      ]}
      source={{ uri: tabIcon }}
    />
  );
});

export { TabIcon };
