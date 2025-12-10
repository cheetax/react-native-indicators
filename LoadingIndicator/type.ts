import { SkPath } from '@shopify/react-native-skia';
import { MD3Theme, ThemeBase } from 'react-native-paper';
import { SharedValue } from 'react-native-reanimated';

export type PathType = {
  [Name: string]: string;
};

export type PathLoadingProps = {
  loading: SharedValue<number>;
  size: number;
  arr: number[]
  interpolatePath: SkPath[]
  color: string
};
export type Variant = 'small' | 'standart';

export type SizeType = {
  sizeElement: number;
  sizeContainer: number;
};
export type ColorsType = {
  element: string
  container: string
}
export type LoadingIndicatorProps = {
  variant: Variant;
  size?: SizeType;
  active: boolean;
  visibleContainer?: boolean
  theme?: MD3Theme
  colors?: ColorsType
};
export type SizeVariantType = {
  [Name in Variant]: SizeType;
};

