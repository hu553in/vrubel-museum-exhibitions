import * as DialogPrimitive from '@radix-ui/react-dialog';
import React from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  panelClassName: string;
  overlayClassName: string;
  container?: Element | DocumentFragment | null;
  labelledBy?: string;
  describedBy?: string;
  initialFocusRef?: React.RefObject<HTMLElement | null>;
}

const Dialog: React.FC<Props> = props => {
  const {
    open,
    onClose,
    children,
    panelClassName,
    overlayClassName,
    container,
    labelledBy,
    describedBy,
    initialFocusRef,
  } = props;

  return (
    <DialogPrimitive.Root open={open} onOpenChange={nextOpen => !nextOpen && onClose()}>
      <DialogPrimitive.Portal container={container}>
        <DialogPrimitive.Overlay className={overlayClassName} />
        <DialogPrimitive.Content
          asChild
          aria-labelledby={labelledBy}
          aria-describedby={describedBy}
          onOpenAutoFocus={event => {
            if (!initialFocusRef?.current) {
              return;
            }

            event.preventDefault();
            initialFocusRef.current.focus();
          }}
        >
          <aside className={panelClassName}>{children}</aside>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default Dialog;
