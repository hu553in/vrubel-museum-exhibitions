import { render, screen } from '@testing-library/react';

import Loading from './Loading';

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

  it('locks body scroll while mounted and restores it on unmount', () => {
    document.body.style.overflow = 'scroll';

    const { unmount } = render(<Loading />);

    expect(document.body.style.overflow).toBe('hidden');

    unmount();

    expect(document.body.style.overflow).toBe('scroll');
  });
});
