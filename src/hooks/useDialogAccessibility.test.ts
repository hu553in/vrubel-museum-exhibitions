import { renderHook } from '@testing-library/react';

import useDialogAccessibility from './useDialogAccessibility';

describe('useDialogAccessibility', () => {
  it('returns a labelledBy id and omits describedBy by default', () => {
    const { result } = renderHook(() => useDialogAccessibility());

    expect(result.current.labelledBy).toBeTruthy();
    expect(result.current.describedBy).toBeUndefined();
  });

  it('returns both ids when description is requested', () => {
    const { result } = renderHook(() => useDialogAccessibility(true));

    expect(result.current.labelledBy).toBeTruthy();
    expect(result.current.describedBy).toBeTruthy();
  });

  it('keeps returned ids stable across rerenders', () => {
    const { result, rerender } = renderHook(() => useDialogAccessibility(true));

    const initialIds = { ...result.current };

    rerender();

    expect(result.current).toEqual(initialIds);
  });
});
