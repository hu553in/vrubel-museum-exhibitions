import { useCallback, useEffect, useMemo, useState } from 'react';

const createInitialLoadingState = (itemsCount: number) => Array(itemsCount).fill(true);

const useImageLoadingState = (itemsCount: number) => {
  const [loadingState, setLoadingState] = useState(() => createInitialLoadingState(itemsCount));

  useEffect(() => {
    setLoadingState(createInitialLoadingState(itemsCount));
  }, [itemsCount]);

  const loading = useMemo(() => loadingState.some(Boolean), [loadingState]);

  const markImageAsLoaded = useCallback((index: number) => {
    setLoadingState(previousLoadingState => {
      if (index < 0 || index >= previousLoadingState.length || !previousLoadingState[index]) {
        return previousLoadingState;
      }

      let nextLoadingState = [...previousLoadingState];
      nextLoadingState[index] = false;
      return nextLoadingState;
    });
  }, []);

  return {
    loading,
    markImageAsLoaded,
  };
};

export default useImageLoadingState;
