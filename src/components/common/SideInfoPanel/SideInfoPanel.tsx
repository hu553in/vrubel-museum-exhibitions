import cn from 'classnames';

import Dialog from '@/components/common/Dialog/Dialog';
import useDialogAccessibility from '@/hooks/useDialogAccessibility';

import styles from './style.module.css';

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
      title={header}
      description={subheader}
      panelClassName={cn(styles['sideInfoPanel'], open ? styles['open'] : null)}
      overlayClassName={styles['overlay'] ?? ''}
      labelledBy={headerId}
      {...(subheaderId ? { describedBy: subheaderId } : {})}
    >
      <p className={styles['header']} id={headerId}>
        {header}
      </p>
      <p className={styles['subheader']} id={subheaderId}>
        {subheader}
      </p>
      {paragraphs.map(paragraph => (
        <p className={styles['paragraph']} key={paragraph}>
          {paragraph}
        </p>
      ))}
      <button
        type='button'
        aria-label='Закрыть панель с информацией о картине'
        className={styles['collapseButton']}
        onClick={onClose}
      />
    </Dialog>
  );
}

export default SideInfoPanel;
