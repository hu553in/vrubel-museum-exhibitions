import type { ChangeEvent, FocusEvent } from 'react';
import { useReducer, useState } from 'react';

function useAccountForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [rememberMe, toggleRememberMe] = useReducer(value => !value, false);

  const onEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setEmailError(false);
  };

  const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setPasswordError(false);
  };

  const validateEmail = (event: FocusEvent<HTMLInputElement>) => {
    setEmailError(!event.target.validity.valid);
  };

  const validatePassword = () => {
    setPasswordError(password.trim().length === 0);
  };

  return {
    email,
    password,
    passwordShown,
    emailError,
    passwordError,
    rememberMe,
    onEmailChange,
    onPasswordChange,
    validateEmail,
    validatePassword,
    toggleRememberMe,
    togglePasswordShown: () => {
      setPasswordShown(value => !value);
    },
  };
}

export default useAccountForm;
