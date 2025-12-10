import { Canvas, SkPath, Skia } from '@shopify/react-native-skia';
import { useEffect, useState } from 'react';
import { LayoutChangeEvent, StyleSheet, Text, View, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming, interpolate, Easing, withSequence, WithTimingConfig, useAnimatedReaction } from 'react-native-reanimated';
import { PathLoading } from './PathLoading';
import { LoadingIndicatorProps, SizeVariantType } from './type'; import { PathType } from './type';
import pathJson from './path.json'
import { useTheme } from 'react-native-paper';



const ARR = [1, 2, 3, 4, 5, 6, 7, 8]
const DURATION = 7000 / ARR.length - 1

const SizeVariant: SizeVariantType = {
  small: { sizeElement: 20, sizeContainer: 24 },
  standart: { sizeElement: 38, sizeContainer: 48 }
}

const config: WithTimingConfig = {
  duration: DURATION,
  easing: Easing.in(Easing.exp)
}
export const path: PathType = {
  path1: pathJson.path1,
  path2: pathJson.path2,
  path3: pathJson.path3,
  path4: pathJson.path4,
  path5: pathJson.path5,
  path6: pathJson.path6,
  path7: pathJson.path7,
  path8: pathJson.path1
};

const interpolatePath: SkPath[] = ARR.map((item, index) => Skia.Path.MakeFromSVGString(path['path' + (item)])!)

export default function LoadingIndicator(props: LoadingIndicatorProps) {

  const theme = props.theme || useTheme()!

  const {
    active = false,
    variant = 'standart',
    visibleContainer = false,
    colors = {
      element: props.visibleContainer ? theme.colors.onPrimaryContainer : theme.colors.primary,
      container: theme.colors.primaryContainer
    }
  } = props

  const size = props.size || SizeVariant[variant]

  const loading = useSharedValue(ARR[0]);
  const rotate = useSharedValue(1);
  const [sizeElement] = useState(size.sizeElement)
  const [sizeContainer] = useState(size.sizeContainer)

  useEffect(() => {
    loading.value = active
      ? withRepeat(
        withSequence(
          withTiming(2, config),
          withTiming(3, config),
          withTiming(4, config),
          withTiming(5, config),
          withTiming(6, config),
          withTiming(7, config),
          withTiming(8, config),
        ), -1, false)
      : 0
    rotate.value = active
      ? withRepeat(
        withSequence(
          withTiming(2, { duration: DURATION, easing: Easing.back(2) }),
        ), -1, false)
      : 0
  }, [active])

  const onLayout = (event: LayoutChangeEvent) => {
  }

  const animatedCanvasStyle = useAnimatedStyle(
    () => {
      const deg = [0, 180]
      const rotateStyle = interpolate(
        rotate.value,
        [1, 2],
        deg
      ) + 'deg'

      return {
        transform: [{ rotate: rotateStyle }]
      }
    }
  )

  const styleContainer: ViewStyle = visibleContainer
    ? {
      borderRadius: sizeContainer / 2,
      backgroundColor: colors.container
    }
    : {}
  return (
    active
    && <View style={[styles.container, styleContainer, { width: sizeContainer, height: sizeContainer }]} onLayout={onLayout} >
      <View
        style={{

        }}
      />
      <Animated.View
        style={[animatedCanvasStyle,
          {
            height: sizeElement,
            width: sizeElement,
          }
        ]}
      >
        <Canvas
          style={[{
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignSelf: 'center'
          }]}
        >
          <PathLoading
            loading={loading}
            size={sizeElement}
            arr={ARR}
            interpolatePath={interpolatePath}
            color={colors.element}
          />
        </Canvas>
      </Animated.View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
