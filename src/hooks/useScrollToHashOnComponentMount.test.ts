import { renderHook } from '@testing-library/react';
import { vi } from 'vitest';
import useScrollToHashOnComponentMount from './useScrollToHashOnComponentMount';

describe('useScrollToHashOnComponentMount', () => {
  const originalHash = window.location.hash;
  const originalRequestAnimationFrame = window.requestAnimationFrame;

  afterEach(() => {
    window.history.replaceState(
      null,
      '',
      `${window.location.pathname}${window.location.search}${originalHash}`
    );
    window.requestAnimationFrame = originalRequestAnimationFrame;
    document.body.innerHTML = '';
    vi.restoreAllMocks();
  });

  it('does nothing when location hash is empty', () => {
    window.history.replaceState(null, '', window.location.pathname);
    const requestAnimationFrameSpy = vi.fn();
    window.requestAnimationFrame = requestAnimationFrameSpy;

    renderHook(() => {
      useScrollToHashOnComponentMount();
    });

    expect(requestAnimationFrameSpy).not.toHaveBeenCalled();
  });

  it('does nothing when target element is missing', () => {
    window.history.replaceState(null, '', `${window.location.pathname}#missing`);
    const requestAnimationFrameSpy = vi.fn();
    window.requestAnimationFrame = requestAnimationFrameSpy;

    renderHook(() => {
      useScrollToHashOnComponentMount();
    });

    expect(requestAnimationFrameSpy).not.toHaveBeenCalled();
  });

  it('requests animation frame and scrolls the element into view when hash target exists', () => {
    window.history.replaceState(null, '', `${window.location.pathname}#target`);
    const scrollIntoViewSpy = vi.fn();
    const requestAnimationFrameSpy = vi.fn((callback: FrameRequestCallback) => {
      callback(0);
      return 1;
    });

    window.requestAnimationFrame = requestAnimationFrameSpy;

    const element = document.createElement('div');
    element.id = 'target';
    element.scrollIntoView = scrollIntoViewSpy;
    document.body.appendChild(element);

    renderHook(() => {
      useScrollToHashOnComponentMount();
    });

    expect(requestAnimationFrameSpy).toHaveBeenCalledTimes(1);
    expect(scrollIntoViewSpy).toHaveBeenCalledTimes(1);
  });
});
