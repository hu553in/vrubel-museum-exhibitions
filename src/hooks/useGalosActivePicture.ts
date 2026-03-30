import { useCallback, useState } from 'react';

interface GalosPictureIdentity {
  authorAndYear: string;
  id: string;
  name: string;
}

interface ActivePictureState {
  authorAndYear: string;
  name: string;
}

interface NavigateHashTarget {
  hash: string;
}

type NavigateToHash = (target: NavigateHashTarget) => Promise<void> | void;

const EMPTY_ACTIVE_PICTURE: ActivePictureState = {
  name: '',
  authorAndYear: '',
};

function useGalosActivePicture(navigate: NavigateToHash) {
  const [activePicture, setActivePicture] = useState(EMPTY_ACTIVE_PICTURE);

  const onPictureVisible = useCallback(
    (picture: GalosPictureIdentity) => {
      setActivePicture({
        name: picture.name,
        authorAndYear: picture.authorAndYear,
      });
      void navigate({ hash: `#${picture.id}` });
    },
    [navigate]
  );

  return {
    activePicture,
    onPictureVisible,
  };
}

export type { ActivePictureState, GalosPictureIdentity, NavigateToHash };
export default useGalosActivePicture;
