import React, { memo, useContext, useRef, useState } from 'react';
import { View, StyleSheet, Pressable, Animated } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { width } from '@Utils/Constant';
import { NetworkImage } from '@CommonComponent/index';
import CommonStyle from '@Theme/CommonStyle';
import { AppContext } from '@AppContext/index';

export const bannerImgHeight = width * 0.346511;

const styles = StyleSheet.create({
  paddingHorizontal: {
    paddingHorizontal: 1,
  },
  carouselContainer: {
    marginTop: 10,
    overflow: 'hidden',
  },
  imgStyle: {
    width: width - 40,
    height: bannerImgHeight,
    borderRadius: 10,
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dotStyle: {
    height: 6,
    borderRadius: 5,
    margin: 5,
  },
  flatStyle: {
    alignSelf: 'center',
  },
  pressContainer: {
    width: width - 40,
    alignSelf: 'center',
  },
});

interface AdsBannerProps {
  bannerData: string[];
}

const AdsBanner = memo((props: AdsBannerProps) => {
  const { appTheme } = useContext(AppContext);

  let scrollX = useRef(new Animated.Value(0)).current;

  const [currantIndex, setCurrantIndex] = useState(0);

  const { bannerData } = props;

  const {
    carouselContainer,
    paddingHorizontal,
    imgStyle,
    dotContainer,
    dotStyle,
    pressContainer,
  } = styles;

  if (!bannerData?.length) {
    return null;
  }

  return (
    <View style={paddingHorizontal}>
      <View
        style={[carouselContainer, { backgroundColor: appTheme.background }]}>
        <Carousel
          loop
          width={width}
          height={bannerImgHeight}
          autoPlay
          data={bannerData}
          onProgressChange={_ => {
            scrollX.setValue(-_);
          }}
          scrollAnimationDuration={4000}
          style={CommonStyle.center}
          onSnapToItem={index => {
            setCurrantIndex(index);
          }}
          renderItem={({ item }: { item: string }) => {
            return (
              <Pressable style={pressContainer} onPress={() => {}}>
                <NetworkImage
                  resizeMode={'cover'}
                  source={item}
                  imageStyle={imgStyle}
                  containerStyle={imgStyle}
                />
              </Pressable>
            );
          }}
        />
      </View>

      <View style={[dotContainer]}>
        {bannerData?.map((item: any, i: number) => {
          const isSelected = currantIndex === i;
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [6, 18, 6],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={i}
              style={[
                dotStyle,
                {
                  width: dotWidth,
                  backgroundColor:
                    (isSelected && appTheme.themeColor) ||
                    appTheme.lightGrayBack,
                },
              ]}
            />
          );
        })}
      </View>
    </View>
  );
});

export { AdsBanner };
