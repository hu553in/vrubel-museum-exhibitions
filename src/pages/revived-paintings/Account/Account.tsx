import Checkbox from '@/components/common/Checkbox/Checkbox';
import RoundedButton from '@/components/common/RoundedButton/RoundedButton';
import SocialNetworkIcon, {
  SocialNetwork,
} from '@/components/common/SocialNetworkIcon/SocialNetworkIcon';
import TextField from '@/components/common/TextField/TextField';
import type { ChangeEvent, FocusEvent } from 'react';
import { useReducer, useState } from 'react';
import signIn from './assets/images/sign-in.webp';
import './style.scss';

function Account() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [rememberMe, toggleRememberMe] = useReducer(value => !value, false);

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError(false);
  };

  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError(false);
  };

  const validateEmail = (e: FocusEvent<HTMLInputElement>) => {
    setEmailError(!e.target.validity.valid);
  };

  const validatePassword = () => {
    setPasswordError(password.trim().length === 0);
  };

  return (
    <main className='account'>
      <p className='account__title'>Аккаунт</p>
      <section className='account__social-sign-in'>
        <p className='account__social-sign-in-label'>
          Войти, используя аккаунты в социальных сетях:
        </p>
        <section className='account__social-sign-in-links'>
          <span className='account__social-sign-in-link'>
            <SocialNetworkIcon socialNetwork={SocialNetwork.FACEBOOK} />
          </span>
          <span className='account__social-sign-in-link'>
            <SocialNetworkIcon socialNetwork={SocialNetwork.GOOGLE_PLUS} />
          </span>
          <span className='account__social-sign-in-link'>
            <SocialNetworkIcon socialNetwork={SocialNetwork.VK} />
          </span>
        </section>
      </section>
      <form className='account__sign-in-form'>
        <label className='account__field-label' htmlFor='account-email'>
          Email
        </label>
        <TextField
          id='account-email'
          type='email'
          placeholder='Email'
          name='email'
          autoComplete='email'
          required
          value={email}
          onChange={onEmailChange}
          onBlur={validateEmail}
          error={emailError}
        />
        <div className='account__sign-in-password-field-wrapper'>
          <label className='account__field-label' htmlFor='account-password'>
            Пароль
          </label>
          <TextField
            id='account-password'
            className='account__sign-in-password-text-field'
            type={passwordShown ? 'text' : 'password'}
            placeholder='Пароль'
            name='password'
            autoComplete='current-password'
            required
            value={password}
            onChange={onPasswordChange}
            onBlur={validatePassword}
            error={passwordError}
          />
          <button
            type='button'
            className='account__sign-in-password-toggle'
            aria-label={passwordShown ? 'Скрыть пароль' : 'Показать пароль'}
            aria-pressed={passwordShown}
            onClick={() => {
              setPasswordShown(value => !value);
            }}
          >
            {passwordShown ? 'Скрыть' : 'Показать'}
          </button>
        </div>
        <Checkbox
          toggle={toggleRememberMe}
          value={rememberMe}
          className='account__sign-in-remember-me-checkbox'
          label='Запомнить меня'
        />
      </form>
      <section className='account__sign-in-links'>
        <span className='account__sign-in-link'>Забыли пароль?</span>
        <span className='account__sign-in-link'>Регистрация</span>
      </section>
      <RoundedButton
        backgroundImage={signIn}
        label='Войти'
        className='account__sign-in-button'
        disabled
      />
    </main>
  );
}

export default Account;
