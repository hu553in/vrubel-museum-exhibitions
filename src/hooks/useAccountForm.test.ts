import { act, renderHook } from '@testing-library/react';

import useAccountForm from './useAccountForm';

const createChangeEvent = (value: string) =>
  ({
    target: { value },
  }) as React.ChangeEvent<HTMLInputElement>;

const createBlurEvent = (valid: boolean) =>
  ({
    target: {
      validity: { valid },
    },
  }) as React.FocusEvent<HTMLInputElement>;

describe('useAccountForm', () => {
  it('starts with empty values and no errors', () => {
    const { result } = renderHook(() => useAccountForm());

    expect(result.current.email).toBe('');
    expect(result.current.password).toBe('');
    expect(result.current.passwordShown).toBe(false);
    expect(result.current.emailError).toBe(false);
    expect(result.current.passwordError).toBe(false);
    expect(result.current.rememberMe).toBe(false);
  });

  it('updates email and clears email error on change', () => {
    const { result } = renderHook(() => useAccountForm());

    act(() => {
      result.current.validateEmail(createBlurEvent(false));
    });

    expect(result.current.emailError).toBe(true);

    act(() => {
      result.current.onEmailChange(createChangeEvent('user@example.com'));
    });

    expect(result.current.email).toBe('user@example.com');
    expect(result.current.emailError).toBe(false);
  });

  it('updates password and clears password error on change', () => {
    const { result } = renderHook(() => useAccountForm());

    act(() => {
      result.current.validatePassword();
    });

    expect(result.current.passwordError).toBe(true);

    act(() => {
      result.current.onPasswordChange(createChangeEvent('secret'));
    });

    expect(result.current.password).toBe('secret');
    expect(result.current.passwordError).toBe(false);
  });

  it('marks email field invalid only when browser validity says so', () => {
    const { result } = renderHook(() => useAccountForm());

    act(() => {
      result.current.validateEmail(createBlurEvent(false));
    });

    expect(result.current.emailError).toBe(true);

    act(() => {
      result.current.validateEmail(createBlurEvent(true));
    });

    expect(result.current.emailError).toBe(false);
  });

  it('marks password as invalid when it is empty or whitespace-only', () => {
    const { result } = renderHook(() => useAccountForm());

    act(() => {
      result.current.onPasswordChange(createChangeEvent('   '));
      result.current.validatePassword();
    });

    expect(result.current.passwordError).toBe(true);
  });

  it('toggles password visibility and remember-me flag', () => {
    const { result } = renderHook(() => useAccountForm());

    act(() => {
      result.current.togglePasswordShown();
      result.current.toggleRememberMe();
    });

    expect(result.current.passwordShown).toBe(true);
    expect(result.current.rememberMe).toBe(true);
  });
});
