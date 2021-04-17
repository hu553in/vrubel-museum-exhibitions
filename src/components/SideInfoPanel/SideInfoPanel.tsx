import cn from 'classnames';
import React, { useMemo } from 'react';
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
          <button
            className='side-info-panel__collapse-button'
            onClick={onClose}
          />
          <div className='side-info-panel-overlay' onClick={onClose} />
        </>
      )}
    </>,
    parentElement
  );
};

export default SideInfoPanel;
