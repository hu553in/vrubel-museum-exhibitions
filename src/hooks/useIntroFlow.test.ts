import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import useIntroFlow from './useIntroFlow';

describe('useIntroFlow', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('starts in the initial intro state', () => {
    const { result } = renderHook(() => useIntroFlow());

    expect(result.current.shouldShowTriptihVideo).toBe(true);
    expect(result.current.shouldRedirectToGalos).toBe(false);
    expect(result.current.shouldNotFadeOutTriptihAndTitle).toBe(true);
  });

  it('transitions to fade-out and redirect after video end', () => {
    const { result } = renderHook(() => useIntroFlow());

    act(() => {
      result.current.onVideoEnded();
    });

    expect(result.current.shouldShowTriptihVideo).toBe(false);
    expect(result.current.shouldNotFadeOutTriptihAndTitle).toBe(true);
    expect(result.current.shouldRedirectToGalos).toBe(false);

    act(() => {
      vi.advanceTimersByTime(2750);
    });

    expect(result.current.shouldNotFadeOutTriptihAndTitle).toBe(false);
    expect(result.current.shouldRedirectToGalos).toBe(false);

    act(() => {
      vi.advanceTimersByTime(2250);
    });

    expect(result.current.shouldRedirectToGalos).toBe(true);
  });

  it('ignores repeated onVideoEnded calls after the flow has started', () => {
    const { result } = renderHook(() => useIntroFlow());

    act(() => {
      result.current.onVideoEnded();
      result.current.onVideoEnded();
      vi.runOnlyPendingTimers();
    });

    expect(result.current.shouldShowTriptihVideo).toBe(false);
    expect(result.current.shouldNotFadeOutTriptihAndTitle).toBe(false);
    expect(result.current.shouldRedirectToGalos).toBe(true);
  });

  it('handles Space key and ignores unrelated keys', () => {
    const { result } = renderHook(() => useIntroFlow());

    act(() => {
      result.current.handleWindowKeyDown(
        new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter' })
      );
    });

    expect(result.current.shouldShowTriptihVideo).toBe(true);

    act(() => {
      result.current.handleWindowKeyDown(new KeyboardEvent('keydown', { key: ' ', code: 'Space' }));
    });

    expect(result.current.shouldShowTriptihVideo).toBe(false);
  });

  it('clears all scheduled timers on unmount', () => {
    const clearTimeoutSpy = vi.spyOn(window, 'clearTimeout');
    const { result, unmount } = renderHook(() => useIntroFlow());

    act(() => {
      result.current.onVideoEnded();
    });

    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalledTimes(2);
  });
});
