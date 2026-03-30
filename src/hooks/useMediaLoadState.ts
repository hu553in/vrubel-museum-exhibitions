import { useEffect, useState } from 'react';

function useMediaLoadState(resetKey?: string) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
  }, [resetKey]);

  return {
    loading,
    handleLoad: () => {
      setLoading(false);
    },
    handleError: () => {
      setLoading(false);
    },
  };
}

export default useMediaLoadState;
