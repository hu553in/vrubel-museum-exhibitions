import { useEffect } from 'react';

const useScrollToHashOnComponentMount = () => {
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const element = document.getElementById(id);

      if (element) {
        window.requestAnimationFrame(() => element!.scrollIntoView());
      }
    }
  }, []);
};

export default useScrollToHashOnComponentMount;
