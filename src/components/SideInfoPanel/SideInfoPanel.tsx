import cn from 'classnames';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import './style.scss';

interface Props {
  open: boolean;
  onClose: () => void;
  parentElement: HTMLElement;
  header: string;
  subheader: string;
  paragraphs: string[];
}

const SideInfoPanel: React.FC<Props> = props => {
  const { open, onClose, parentElement, header, subheader, paragraphs } = props;
  const [collapseButtonShown, setCollapseButtonShown] = useState(false);
  const [stateRef, setStateRef] = useState<HTMLElement | null>(null);
  const callbackRef = useCallback(node => setStateRef(node), []);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        if (stateRef) {
          stateRef.style.position = 'absolute';
        }

        setCollapseButtonShown(true);
      }, 250);

      document.documentElement.style.overflowY = 'hidden';
      parentElement.style.overflowY = 'hidden';
    } else {
      if (stateRef) {
        stateRef.style.removeProperty('position');
      }

      setCollapseButtonShown(false);
      document.documentElement.style.removeProperty('overflow-y');
      parentElement.style.overflowY = 'hidden';
    }

    return () => {
      if (stateRef) {
        stateRef.style.removeProperty('position');
      }

      setCollapseButtonShown(false);
      document.documentElement.style.removeProperty('overflow-y');
      parentElement.style.overflowY = 'hidden';
    };
  }, [open, parentElement.style, stateRef]);

  const paragraphElements = useMemo(
    () =>
      paragraphs.map((paragraph, index) => (
        <p className='side-info-panel__paragraph' key={`paragraph-${index}`}>
          {paragraph}
        </p>
      )),
    [paragraphs]
  );

  const classNameToUse = useMemo(
    () =>
      cn('side-info-panel', {
        'side-info-panel_open': open,
      }),
    [open]
  );

  return ReactDOM.createPortal(
    <>
      <aside className={classNameToUse} ref={callbackRef}>
        <p className='side-info-panel__header'>{header}</p>
        <p className='side-info-panel__subheader'>{subheader}</p>
        {paragraphElements}
      </aside>
      {open && (
        <>
          {collapseButtonShown && (
            <button
              className='side-info-panel__collapse-button'
              onClick={onClose}
            />
          )}
          <div className='side-info-panel-overlay' onClick={onClose} />
        </>
      )}
    </>,
    parentElement
  );
};

export default SideInfoPanel;
