import Dialog from '@/components/common/Dialog/Dialog';
import cn from 'classnames';
import { useId } from 'react';
import './style.scss';

interface Props {
  open: boolean;
  onClose: () => void;
  parentElement: HTMLElement;
  header: string;
  subheader: string;
  paragraphs: string[];
}

function SideInfoPanel(props: Props) {
  const { open, onClose, parentElement, header, subheader, paragraphs } = props;
  const headerId = useId();
  const subheaderId = useId();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      container={parentElement}
      panelClassName={cn('side-info-panel', {
        'side-info-panel_open': open,
      })}
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
      {paragraphs.map(paragraph => (
        <p className='side-info-panel__paragraph' key={paragraph}>
          {paragraph}
        </p>
      ))}
      <button
        type='button'
        aria-label='Закрыть панель с информацией о картине'
        className='side-info-panel__collapse-button'
        onClick={onClose}
      />
    </Dialog>
  );
}

export default SideInfoPanel;
