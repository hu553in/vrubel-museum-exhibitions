import { act, renderHook } from '@testing-library/react';

import useImageLoadingState from './useImageLoadingState';

describe('useImageLoadingState', () => {
  it('returns loading=true initially while at least one image is pending', () => {
    const { result } = renderHook(() => useImageLoadingState(3));

    expect(result.current.loading).toBe(true);
  });

  it('keeps loading=true until every tracked image is marked as loaded', () => {
    const { result } = renderHook(() => useImageLoadingState(3));

    act(() => {
      result.current.markImageAsLoaded(0);
    });

    expect(result.current.loading).toBe(true);

    act(() => {
      result.current.markImageAsLoaded(1);
    });

    expect(result.current.loading).toBe(true);

    act(() => {
      result.current.markImageAsLoaded(2);
    });

    expect(result.current.loading).toBe(false);
  });

  it('does not change loading after marking the same image as loaded twice', () => {
    const { result } = renderHook(() => useImageLoadingState(1));

    act(() => {
      result.current.markImageAsLoaded(0);
    });

    expect(result.current.loading).toBe(false);

    act(() => {
      result.current.markImageAsLoaded(0);
    });

    expect(result.current.loading).toBe(false);
  });

  it('returns loading=false when there are no tracked images', () => {
    const { result } = renderHook(() => useImageLoadingState(0));

    expect(result.current.loading).toBe(false);
  });

  it('ignores invalid indexes', () => {
    const { result } = renderHook(() => useImageLoadingState(2));

    act(() => {
      result.current.markImageAsLoaded(-1);
      result.current.markImageAsLoaded(2);
      result.current.markImageAsLoaded(99);
    });

    expect(result.current.loading).toBe(true);
  });

  it('resets loading state when tracked items count changes', () => {
    const { result, rerender } = renderHook(({ itemsCount }) => useImageLoadingState(itemsCount), {
      initialProps: { itemsCount: 1 },
    });

    act(() => {
      result.current.markImageAsLoaded(0);
    });

    expect(result.current.loading).toBe(false);

    rerender({ itemsCount: 2 });

    expect(result.current.loading).toBe(true);

    act(() => {
      result.current.markImageAsLoaded(0);
      result.current.markImageAsLoaded(1);
    });

    expect(result.current.loading).toBe(false);
  });

  it('returns loading=false after rerendering with zero tracked items', () => {
    const { result, rerender } = renderHook(({ itemsCount }) => useImageLoadingState(itemsCount), {
      initialProps: { itemsCount: 2 },
    });

    act(() => {
      result.current.markImageAsLoaded(0);
    });

    expect(result.current.loading).toBe(true);

    rerender({ itemsCount: 0 });

    expect(result.current.loading).toBe(false);
  });

  it('does not reset state when rerendered with the same tracked items count', () => {
    const { result, rerender } = renderHook(({ itemsCount }) => useImageLoadingState(itemsCount), {
      initialProps: { itemsCount: 1 },
    });

    act(() => {
      result.current.markImageAsLoaded(0);
    });

    expect(result.current.loading).toBe(false);

    rerender({ itemsCount: 1 });

    expect(result.current.loading).toBe(false);
  });
});
