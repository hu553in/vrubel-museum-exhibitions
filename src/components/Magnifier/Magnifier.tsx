import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import ExternalMagnifier from 'react-magnifier';
import useForceUpdate from '../../hooks/useForceUpdate';
import calculateImageSizeByContainerAndNaturalSizes from '../../utils/calculateImageSizeByContainerAndNaturalSizes';
import './style.scss';

interface Props {
  parentElement: HTMLElement | null;
  name: string;
  magnifier: string;
}

type MagnifierStateRef = HTMLElement & {
  img: HTMLImageElement;
};

const Magnifier: React.FC<Props> = props => {
  const { name, magnifier, parentElement } = props;
  const forceUpdate = useForceUpdate();

  const [
    magnifierStateRef,
    setMagnifierStateRef,
  ] = useState<MagnifierStateRef | null>(null);

  const magnifierCallbackRef = useCallback(
    node => setMagnifierStateRef(node),
    []
  );

  const {
    clientWidth: parentWidth,
    clientHeight: parentHeight,
  } = parentElement ?? {
    clientWidth: 0,
    clientHeight: 0,
  };

  const {
    naturalWidth: magnifierNaturalWidth,
    naturalHeight: magnifierNaturalHeight,
  } = magnifierStateRef?.img ?? {
    naturalWidth: 0,
    naturalHeight: 0,
  };

  const magnifierSize = useMemo(
    () =>
      !parentWidth ||
      !parentHeight ||
      !magnifierNaturalWidth ||
      !magnifierNaturalHeight
        ? { width: 0, height: 0 }
        : calculateImageSizeByContainerAndNaturalSizes(
            parentWidth,
            parentHeight,
            magnifierNaturalWidth,
            magnifierNaturalHeight
          ),
    [parentHeight, parentWidth, magnifierNaturalHeight, magnifierNaturalWidth]
  );

  const magnifierPresent = useMemo(() => !!magnifier, [magnifier]);
  const [magnifierLoading, setMagnifierLoading] = useState(magnifierPresent);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setMagnifierLoading(magnifierPresent), []);

  useEffect(() => {
    const onImageLoad = () => {
      forceUpdate();
      setMagnifierLoading(false);
    };

    magnifierStateRef?.img?.addEventListener('load', onImageLoad);

    return () =>
      magnifierStateRef?.img?.removeEventListener('load', onImageLoad);
  }, [forceUpdate, magnifierStateRef?.img]);

  const magnifierElement = useMemo(
    () =>
      magnifierPresent ? (
        <ExternalMagnifier
          src={magnifier!}
          mgWidth={200}
          mgHeight={200}
          mgTouchOffsetX={0}
          mgTouchOffsetY={0}
          mgShowOverflow={false}
          ref={magnifierCallbackRef}
          {...magnifierSize}
          // @ts-ignore
          style={magnifierSize}
          // @ts-ignore
          alt={name}
        />
      ) : null,
    [magnifierPresent, magnifier, magnifierCallbackRef, magnifierSize, name]
  );

  const rootElement = document.getElementById('root');
  if (!rootElement) return null;

  return (
    <>
      {magnifierLoading &&
        ReactDOM.createPortal(
          <div className='magnifier__loading' />,
          rootElement
        )}
      {magnifierElement}
    </>
  );
};

export default Magnifier;
