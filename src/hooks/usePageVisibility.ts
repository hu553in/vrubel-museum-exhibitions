import { useEffect, useState } from 'react';

const getIsPageVisible = () =>
  typeof document === 'undefined' ? true : document.visibilityState !== 'hidden';

const usePageVisibility = () => {
  const [isVisible, setIsVisible] = useState(getIsPageVisible);

  useEffect(() => {
    if (typeof document === 'undefined') {
      return undefined;
    }

    const handleVisibilityChange = () => {
      setIsVisible(getIsPageVisible());
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return isVisible;
};

export default usePageVisibility;
