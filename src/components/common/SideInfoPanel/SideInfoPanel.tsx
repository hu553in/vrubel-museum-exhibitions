import './style.scss';

import cn from 'classnames';

import Dialog from '@/components/common/Dialog/Dialog';
import useDialogAccessibility from '@/hooks/useDialogAccessibility';

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
  const { labelledBy: headerId, describedBy: subheaderId } = useDialogAccessibility(true);

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
      {...(subheaderId ? { describedBy: subheaderId } : {})}
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
