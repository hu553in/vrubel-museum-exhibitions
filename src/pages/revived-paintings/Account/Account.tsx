import React, { useCallback, useEffect, useReducer, useState } from 'react';
import Checkbox from '../../../components/common/Checkbox/Checkbox';
import RoundedButton from '../../../components/common/RoundedButton/RoundedButton';
import SocialNetworkIcon, {
  SocialNetwork,
} from '../../../components/common/SocialNetworkIcon/SocialNetworkIcon';
import TextField from '../../../components/common/TextField/TextField';
import signIn from './assets/images/sign-in.webp';
import './style.scss';

const Account: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setEmail('');
    setPassword('');
  }, []);

  const [rememberMe, toggleRememberMe] = useReducer(value => !value, false);

  const onEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
    []
  );

  const onPasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value),
    []
  );

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
        <TextField
          type='email'
          placeholder='E-mail'
          value={email}
          onChange={onEmailChange}
        />
        <TextField
          className='account__sign-in-password-text-field'
          type='password'
          placeholder='Пароль'
          value={password}
          onChange={onPasswordChange}
        />
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
      />
    </main>
  );
};

export default Account;
