import { act, renderHook } from '@testing-library/react';

import useMediaLoadState from './useMediaLoadState';

describe('useMediaLoadState', () => {
  it('starts in loading state', () => {
    const { result } = renderHook(() => useMediaLoadState());

    expect(result.current.loading).toBe(true);
  });

  it('stops loading after successful load', () => {
    const { result } = renderHook(() => useMediaLoadState());

    act(() => {
      result.current.handleLoad();
    });

    expect(result.current.loading).toBe(false);
  });

  it('stops loading after error', () => {
    const { result } = renderHook(() => useMediaLoadState());

    act(() => {
      result.current.handleError();
    });

    expect(result.current.loading).toBe(false);
  });

  it('resets loading when resetKey changes', () => {
    const { result, rerender } = renderHook(({ resetKey }) => useMediaLoadState(resetKey), {
      initialProps: { resetKey: 'first' },
    });

    act(() => {
      result.current.handleLoad();
    });

    expect(result.current.loading).toBe(false);

    rerender({ resetKey: 'second' });

    expect(result.current.loading).toBe(true);
  });

  it('does not reset loading when resetKey stays the same', () => {
    const { result, rerender } = renderHook(({ resetKey }) => useMediaLoadState(resetKey), {
      initialProps: { resetKey: 'first' },
    });

    act(() => {
      result.current.handleLoad();
    });

    rerender({ resetKey: 'first' });

    expect(result.current.loading).toBe(false);
  });
});
