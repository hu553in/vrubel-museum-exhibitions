import Loading from '@/components/common/Loading/Loading';
import calculateImageSizeByContainerAndNaturalSizes from '@/utils/calculateImageSizeByContainerAndNaturalSizes';
import getAppRootElement from '@/utils/getAppRootElement';
import { type Component, type ComponentClass, useEffect, useState } from 'react';
import type { MagnifierProps as ExternalMagnifierProps } from 'react-magnifier';
import ExternalMagnifier from 'react-magnifier';

interface Props {
  parentElement: HTMLElement | null;
  name: string;
  magnifier: string;
}

type MagnifierStateRef = Component & {
  img?: HTMLImageElement | null;
};

const TypedExternalMagnifier =
  ExternalMagnifier as unknown as ComponentClass<ExternalMagnifierProps>;

function Magnifier(props: Props) {
  const { name, magnifier, parentElement } = props;
  const [stateRef, setStateRef] = useState<MagnifierStateRef | null>(null);

  const { clientWidth: parentWidth, clientHeight: parentHeight } = parentElement ?? {
    clientWidth: 0,
    clientHeight: 0,
  };

  const { naturalWidth, naturalHeight } = stateRef?.img ?? {
    naturalWidth: 0,
    naturalHeight: 0,
  };

  const size =
    !parentWidth || !parentHeight || !naturalWidth || !naturalHeight
      ? { width: 0, height: 0 }
      : calculateImageSizeByContainerAndNaturalSizes(
          parentWidth,
          parentHeight,
          naturalWidth,
          naturalHeight
        );

  const [loadedMagnifier, setLoadedMagnifier] = useState<string | null>(null);
  const loading = Boolean(magnifier) && loadedMagnifier !== magnifier;

  useEffect(() => {
    const stopLoading = () => {
      setLoadedMagnifier(magnifier);
    };

    stateRef?.img?.addEventListener('error', stopLoading);
    stateRef?.img?.addEventListener('load', stopLoading);

    return () => {
      stateRef?.img?.removeEventListener('error', stopLoading);
      stateRef?.img?.removeEventListener('load', stopLoading);
    };
  }, [magnifier, stateRef?.img]);

  const rootElement = getAppRootElement();

  if (!rootElement) {
    return null;
  }

  return (
    <>
      {loading && <Loading />}
      {magnifier && (
        <TypedExternalMagnifier
          {...{
            src: magnifier,
            mgWidth: 200,
            mgHeight: 200,
            mgTouchOffsetX: 0,
            mgTouchOffsetY: 0,
            mgShowOverflow: false,
            ref: setStateRef,
            ...size,
            style: size,
            alt: name,
          }}
        />
      )}
    </>
  );
}

export default Magnifier;
