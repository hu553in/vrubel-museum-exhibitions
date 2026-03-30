import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { vi } from 'vitest';

import Dialog from './Dialog';

describe('Dialog', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div><div id="dialog-container"></div>';
  });

  it('renders into the provided container and forwards a11y labelling props', () => {
    const container = document.getElementById('dialog-container');

    render(
      <Dialog
        open
        onClose={vi.fn()}
        panelClassName='dialog-panel'
        overlayClassName='dialog-overlay'
        container={container}
        labelledBy='dialog-title'
        describedBy='dialog-description'
      >
        <h2 id='dialog-title'>Dialog title</h2>
        <p id='dialog-description'>Dialog description</p>
      </Dialog>
    );

    const dialog = screen.getByRole('dialog', { name: 'Dialog title' });

    expect(container).toContainElement(dialog);
    expect(dialog).toHaveAttribute('aria-describedby', 'dialog-description');
    expect(container?.querySelector('.dialog-overlay')).toBeInTheDocument();
    expect(container?.querySelector('.dialog-panel')).toBe(dialog);
  });

  it('calls onClose when the user dismisses the dialog with Escape', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();

    render(
      <Dialog
        open
        onClose={onClose}
        panelClassName='dialog-panel'
        overlayClassName='dialog-overlay'
      >
        <div>Dialog body</div>
      </Dialog>
    );

    await user.keyboard('{Escape}');

    await waitFor(() => {
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  it('moves focus to initialFocusRef when provided', async () => {
    const focusRef = createRef<HTMLButtonElement>();

    render(
      <Dialog
        open
        onClose={vi.fn()}
        panelClassName='dialog-panel'
        overlayClassName='dialog-overlay'
        initialFocusRef={focusRef}
      >
        <button ref={focusRef} type='button'>
          Focus target
        </button>
      </Dialog>
    );

    await waitFor(() => {
      expect(focusRef.current).toHaveFocus();
    });
  });
});
