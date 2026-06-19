import { act, renderHook } from '@testing-library/react';
import { vi } from 'vitest';

import usePageVisibility from './usePageVisibility';

const setDocumentVisibilityState = (visibilityState: DocumentVisibilityState) => {
  Object.defineProperty(document, 'visibilityState', {
    configurable: true,
    value: visibilityState,
  });
};

describe('usePageVisibility', () => {
  afterEach(() => {
    setDocumentVisibilityState('visible');
  });

  it('returns true when page is initially visible', () => {
    setDocumentVisibilityState('visible');

    const { result } = renderHook(() => usePageVisibility());

    expect(result.current).toBe(true);
  });

  it('returns false when page is initially hidden', () => {
    setDocumentVisibilityState('hidden');

    const { result } = renderHook(() => usePageVisibility());

    expect(result.current).toBe(false);
  });

  it('updates value after visibilitychange events', () => {
    setDocumentVisibilityState('visible');

    const { result } = renderHook(() => usePageVisibility());

    expect(result.current).toBe(true);

    act(() => {
      setDocumentVisibilityState('hidden');
      document.dispatchEvent(new Event('visibilitychange'));
    });

    expect(result.current).toBe(false);

    act(() => {
      setDocumentVisibilityState('visible');
      document.dispatchEvent(new Event('visibilitychange'));
    });

    expect(result.current).toBe(true);
  });

  it('treats non-hidden visibility states as visible', () => {
    setDocumentVisibilityState('prerender' as unknown as DocumentVisibilityState);

    const { result } = renderHook(() => usePageVisibility());

    expect(result.current).toBe(true);
  });

  it('removes the visibilitychange listener on unmount', () => {
    const addEventListenerSpy = vi.spyOn(document, 'addEventListener');
    const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');

    const { unmount } = renderHook(() => usePageVisibility());

    const handler = addEventListenerSpy.mock.calls.find(
      ([eventName]: [string | EventListenerObject, ...unknown[]]) =>
        eventName === 'visibilitychange'
    )?.[1] as EventListener;

    expect(typeof handler).toBe('function');

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('visibilitychange', handler);

    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });
});
