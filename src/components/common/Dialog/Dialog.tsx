import * as DialogPrimitive from '@radix-ui/react-dialog';
import type { ReactNode, RefObject } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  panelClassName: string;
  overlayClassName: string;
  container?: Element | DocumentFragment | null;
  labelledBy?: string;
  describedBy?: string;
  initialFocusRef?: RefObject<HTMLElement | null>;
}

function Dialog(props: Props) {
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
    <DialogPrimitive.Root
      open={open}
      onOpenChange={nextOpen => {
        if (!nextOpen) {
          onClose();
        }
      }}
    >
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
}

export default Dialog;
