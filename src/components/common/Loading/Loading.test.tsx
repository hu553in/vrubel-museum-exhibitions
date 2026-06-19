import { render, screen } from '@testing-library/react';

import Loading from './Loading';

function LoadingPair({ first, second }: { first: boolean; second: boolean }) {
  return (
    <>
      {first && <Loading />}
      {second && <Loading />}
    </>
  );
}

describe('Loading', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div>';
  });

  it('renders through the shared portal into the app root', () => {
    render(<Loading />);

    const status = screen.getByRole('status');

    expect(document.getElementById('root')).toContainElement(status);
    expect(status).toHaveTextContent('Загрузка');
  });

  it('exposes polite busy status semantics for assistive technologies', () => {
    render(<Loading />);

    const status = screen.getByRole('status');

    expect(status).toHaveAttribute('aria-live', 'polite');
    expect(status).toHaveAttribute('aria-busy', 'true');
  });

  it('preserves existing body overflow inline style across mount and unmount in jsdom', () => {
    document.body.style.overflow = 'scroll';

    const { unmount } = render(<Loading />);

    expect(document.body.style.overflow).toBe('scroll');

    unmount();

    expect(document.body.style.overflow).toBe('scroll');
  });

  it('allows multiple loading overlays to mount and unmount independently', () => {
    document.body.style.overflow = 'scroll';

    const { rerender } = render(<LoadingPair first second />);

    expect(screen.getAllByRole('status')).toHaveLength(2);
    expect(document.body.style.overflow).toBe('scroll');

    rerender(<LoadingPair first={false} second />);

    expect(screen.getAllByRole('status')).toHaveLength(1);
    expect(document.body.style.overflow).toBe('scroll');

    rerender(<LoadingPair first={false} second={false} />);

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe('scroll');
  });
});
