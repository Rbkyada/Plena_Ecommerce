import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { View, FlatList, StyleSheet, Pressable } from 'react-native';
import { height, width } from '@Utils/Constant';
import { AppContext } from '@AppContext/index';
import { NetworkImage } from '@CommonComponent/index';

const styles = StyleSheet.create({
  imageStyle: {
    width: width,
    height: height * 0.42,
  },
  flatListContainer: {
    flexGrow: 0,
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    columnGap: 9,
    left: 10,
    bottom: 20,
  },
  dotStyle: {
    height: 4,
    borderRadius: 20,
    width: 20,
  },
  flatStyle: {
    alignSelf: 'center',
  },
});

interface ProductSliderProps {
  imgData: string[];
}

const ProductSlider = (props: ProductSliderProps) => {
  const { appTheme } = useContext(AppContext);

  const { imageStyle, flatListContainer, dotContainer, dotStyle, flatStyle } =
    styles;

  const { imgData } = props;

  const imgDataState = useMemo(() => imgData, [imgData]);
  const [currantIndex, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, []);

  const renderItem = ({ item }: any) => {
    return (
      <View style={imageStyle}>
        <NetworkImage
          resizeMode={'stretch'}
          source={item}
          imageStyle={imageStyle}
          containerStyle={imageStyle}
        />
      </View>
    );
  };

  const handleViewableItemsChanged = useRef(({ viewableItems }: any) => {
    setIndex(viewableItems[0]?.index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const renderDots = useCallback(() => {
    return (
      <View style={[dotContainer]}>
        {imgDataState?.map((item: string, i: number) => {
          const isSelected = currantIndex === i;
          return (
            <Pressable
              key={i}
              onPress={() => setIndex(i)}
              style={[
                dotStyle,
                {
                  backgroundColor:
                    (isSelected && appTheme.darkYellow) || appTheme.lightSlider,
                },
              ]}
            />
          );
        })}
      </View>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currantIndex]);

  return (
    <View
      style={[flatListContainer, { backgroundColor: appTheme.lightGrayBack }]}>
      <FlatList
        data={imgDataState}
        horizontal
        bounces={false}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        style={flatStyle}
        viewabilityConfig={viewConfig}
        onViewableItemsChanged={handleViewableItemsChanged}
        keyExtractor={(item: string, index: number) => index.toString()}
      />
      {renderDots()}
    </View>
  );
};

export { ProductSlider };
