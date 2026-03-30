import { useEffect, useState } from 'react';

const createInitialLoadingState = (itemsCount: number): boolean[] =>
  Array.from({ length: itemsCount }, () => true);

const useImageLoadingState = (itemsCount: number) => {
  const [loadingState, setLoadingState] = useState<boolean[]>(() =>
    createInitialLoadingState(itemsCount)
  );

  useEffect(() => {
    setLoadingState(createInitialLoadingState(itemsCount));
  }, [itemsCount]);

  const markImageAsLoaded = (index: number) => {
    setLoadingState(previousLoadingState => {
      if (index < 0 || index >= previousLoadingState.length || !previousLoadingState[index]) {
        return previousLoadingState;
      }

      const nextLoadingState = [...previousLoadingState];
      nextLoadingState[index] = false;
      return nextLoadingState;
    });
  };

  return {
    loading: loadingState.some(Boolean),
    markImageAsLoaded,
  };
};

export default useImageLoadingState;
