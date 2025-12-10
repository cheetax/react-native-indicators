import { usePathInterpolation, rect, FitBox, Path } from '@shopify/react-native-skia';
import { PathLoadingProps } from './type'

export const PathLoading = (props: PathLoadingProps) => {

  const {
    loading,
    size,
    arr,
    interpolatePath,
    color
  } = props;

  const pathInterpolate = usePathInterpolation(
    loading,
    arr,
    interpolatePath

  );
  const rct = rect(0, 0, size, size);
  const src = rect(0, 0, 1024, 1024);
  return (
    <FitBox
      src={src}
      dst={rct}
    >
      <Path
        path={pathInterpolate}
        style="fill"
        color={color}
        strokeWidth={1} />
    </FitBox>
  );
};
