import { useEffect, useReducer } from 'react';

const useUpdateOnResize = () => {
  const forceUpdate = useReducer(val => !val, false)[1];

  useEffect(() => {
    window.addEventListener('resize', forceUpdate);
    return () => window.removeEventListener('resize', forceUpdate);
  }, [forceUpdate]);
};

export default useUpdateOnResize;
