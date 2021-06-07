import { useMemo } from 'react';
import useUpdateOnResize from './useUpdateOnResize';

export enum DeviceOrientation {
  PORTRAIT,
  LANDSCAPE,
}

const useDeviceOrientation = () => {
  useUpdateOnResize();
  const { innerWidth, innerHeight } = window;

  const orientation = useMemo(
    () =>
      innerWidth <= innerHeight
        ? DeviceOrientation.PORTRAIT
        : DeviceOrientation.LANDSCAPE,
    [innerHeight, innerWidth]
  );

  return orientation;
};

export default useDeviceOrientation;
