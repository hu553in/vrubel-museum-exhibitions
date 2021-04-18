import cn from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
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

  useEffect(() => {
    if (open) {
      setTimeout(() => setCollapseButtonShown(true), 250);

      document.documentElement.style.overflowY = 'hidden';
      const rootElement = document.getElementById('root');

      if (rootElement) {
        rootElement.style.overflowY = 'hidden';
      }
    } else {
      setCollapseButtonShown(false);

      document.documentElement.style.removeProperty('overflow-y');
      const rootElement = document.getElementById('root');

      if (rootElement) {
        rootElement.style.removeProperty('overflow-y');
      }
    }

    return () => {
      setCollapseButtonShown(false);

      document.documentElement.style.removeProperty('overflow-y');
      const rootElement = document.getElementById('root');

      if (rootElement) {
        rootElement.style.removeProperty('overflow-y');
      }
    };
  }, [open]);

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
      <aside className={classNameToUse}>
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
