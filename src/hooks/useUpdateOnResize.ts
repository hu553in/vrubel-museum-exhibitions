import { useEffect } from 'react';
import useForceUpdate from './useForceUpdate';

const useUpdateOnResize = () => {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    window.addEventListener('resize', forceUpdate);
    return () => window.removeEventListener('resize', forceUpdate);
  }, [forceUpdate]);
};

export default useUpdateOnResize;
