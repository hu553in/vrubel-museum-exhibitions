import Loading from '@/components/common/Loading/Loading';
import useForceUpdate from '@/hooks/useForceUpdate';
import calculateImageSizeByContainerAndNaturalSizes from '@/utils/calculateImageSizeByContainerAndNaturalSizes';
import getAppRootElement from '@/utils/getAppRootElement';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ExternalMagnifier, { MagnifierProps as ExternalMagnifierProps } from 'react-magnifier';

interface Props {
  parentElement: HTMLElement | null;
  name: string;
  magnifier: string;
}

type MagnifierStateRef = React.Component & {
  img?: HTMLImageElement | null;
};

const TypedExternalMagnifier =
  ExternalMagnifier as unknown as React.ComponentClass<ExternalMagnifierProps>;

const Magnifier: React.FC<Props> = props => {
  const { name, magnifier, parentElement } = props;
  const forceUpdate = useForceUpdate();
  const [stateRef, setStateRef] = useState<MagnifierStateRef | null>(null);
  const callbackRef = useCallback((node: MagnifierStateRef | null) => setStateRef(node), []);

  const { clientWidth: parentWidth, clientHeight: parentHeight } = parentElement ?? {
    clientWidth: 0,
    clientHeight: 0,
  };

  const { naturalWidth, naturalHeight } = stateRef?.img ?? {
    naturalWidth: 0,
    naturalHeight: 0,
  };

  const size = useMemo(
    () =>
      !parentWidth || !parentHeight || !naturalWidth || !naturalHeight
        ? { width: 0, height: 0 }
        : calculateImageSizeByContainerAndNaturalSizes(
            parentWidth,
            parentHeight,
            naturalWidth,
            naturalHeight
          ),
    [parentHeight, parentWidth, naturalHeight, naturalWidth]
  );

  const magnifierPresent = useMemo(() => !!magnifier, [magnifier]);
  const [loading, setLoading] = useState(magnifierPresent);

  useEffect(() => setLoading(magnifierPresent), [magnifierPresent]);

  useEffect(() => {
    const stopLoading = () => {
      forceUpdate();
      setLoading(false);
    };

    stateRef?.img?.addEventListener('error', stopLoading);
    stateRef?.img?.addEventListener('load', stopLoading);

    return () => {
      stateRef?.img?.removeEventListener('error', stopLoading);
      stateRef?.img?.removeEventListener('load', stopLoading);
    };
  }, [forceUpdate, stateRef?.img]);

  const rootElement = getAppRootElement();

  if (!rootElement) {
    return null;
  }

  return (
    <>
      {loading && <Loading />}
      {magnifierPresent && (
        <TypedExternalMagnifier
          {...{
            src: magnifier!,
            mgWidth: 200,
            mgHeight: 200,
            mgTouchOffsetX: 0,
            mgTouchOffsetY: 0,
            mgShowOverflow: false,
            ref: callbackRef,
            ...size,
            style: size,
            alt: name,
          }}
        />
      )}
    </>
  );
};

export default Magnifier;
