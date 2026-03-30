import Dialog from '@/components/common/Dialog/Dialog';
import cn from 'classnames';
import React, { useId, useMemo } from 'react';
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
  const headerId = useId();
  const subheaderId = useId();

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

  return (
    <Dialog
      open={open}
      onClose={onClose}
      container={parentElement}
      panelClassName={classNameToUse}
      overlayClassName='side-info-panel-overlay'
      labelledBy={headerId}
      describedBy={subheaderId}
    >
      <p className='side-info-panel__header' id={headerId}>
        {header}
      </p>
      <p className='side-info-panel__subheader' id={subheaderId}>
        {subheader}
      </p>
      {paragraphElements}
      <button
        type='button'
        aria-label='Закрыть панель с информацией о картине'
        className='side-info-panel__collapse-button'
        onClick={onClose}
      />
    </Dialog>
  );
};

export default SideInfoPanel;
