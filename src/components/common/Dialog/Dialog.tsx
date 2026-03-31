import * as DialogPrimitive from '@radix-ui/react-dialog';
import { type ReactNode, type RefObject, useId } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title: string;
  description?: string;
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
    title,
    description,
    panelClassName,
    overlayClassName,
    container,
    labelledBy,
    describedBy,
    initialFocusRef,
  } = props;
  const hiddenTitleId = useId();
  const hiddenDescriptionId = useId();
  const dialogLabelledBy = labelledBy ?? hiddenTitleId;
  const dialogDescribedBy = describedBy ?? (description ? hiddenDescriptionId : undefined);

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
          aria-labelledby={dialogLabelledBy}
          aria-describedby={dialogDescribedBy}
          onOpenAutoFocus={event => {
            if (!initialFocusRef?.current) {
              return;
            }

            event.preventDefault();
            initialFocusRef.current.focus();
          }}
        >
          <aside className={panelClassName}>
            <DialogPrimitive.Title
              className='srOnly'
              {...(!labelledBy ? { id: hiddenTitleId } : {})}
            >
              {title}
            </DialogPrimitive.Title>
            {description ? (
              <DialogPrimitive.Description
                className='srOnly'
                {...(!describedBy ? { id: hiddenDescriptionId } : {})}
              >
                {description}
              </DialogPrimitive.Description>
            ) : null}
            {children}
          </aside>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export default Dialog;
