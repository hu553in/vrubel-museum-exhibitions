import Checkbox from '@/components/common/Checkbox/Checkbox';
import RoundedButton from '@/components/common/RoundedButton/RoundedButton';
import SocialNetworkIcon from '@/components/common/SocialNetworkIcon/SocialNetworkIcon';
import { SocialNetwork } from '@/components/common/SocialNetworkIcon/socialNetworks';
import TextField from '@/components/common/TextField/TextField';
import useAccountForm from '@/hooks/useAccountForm';

import signIn from './assets/images/sign-in.webp';
import styles from './style.module.css';

function Account() {
  const {
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
    togglePasswordShown,
  } = useAccountForm();

  return (
    <main className={styles['account']} id='main-content'>
      <h1 className={styles['title']}>Аккаунт</h1>
      <section>
        <p className={styles['socialSignInLabel']}>Войти, используя аккаунты в социальных сетях:</p>
        <section className={styles['socialSignInLinks']}>
          <span className={styles['socialSignInLink']}>
            <SocialNetworkIcon
              socialNetwork={SocialNetwork.FACEBOOK}
              className={styles['socialSignInIcon'] ?? ''}
            />
          </span>
          <span className={styles['socialSignInLink']}>
            <SocialNetworkIcon
              socialNetwork={SocialNetwork.GOOGLE_PLUS}
              className={styles['socialSignInIcon'] ?? ''}
            />
          </span>
          <span className={styles['socialSignInLink']}>
            <SocialNetworkIcon
              socialNetwork={SocialNetwork.VK}
              className={styles['socialSignInIcon'] ?? ''}
            />
          </span>
        </section>
      </section>
      <form className={styles['signInForm']}>
        <label className='srOnly' htmlFor='account-email'>
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
        <div className={styles['signInPasswordFieldWrapper']}>
          <label className='srOnly' htmlFor='account-password'>
            Пароль
          </label>
          <TextField
            id='account-password'
            className={styles['signInPasswordTextField'] ?? ''}
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
            className={styles['signInPasswordToggle']}
            aria-label={passwordShown ? 'Скрыть пароль' : 'Показать пароль'}
            aria-pressed={passwordShown}
            onClick={togglePasswordShown}
          >
            {passwordShown ? 'Скрыть' : 'Показать'}
          </button>
        </div>
        <Checkbox
          toggle={toggleRememberMe}
          value={rememberMe}
          className={styles['signInRememberMeCheckbox'] ?? ''}
          label='Запомнить меня'
        />
      </form>
      <section className={styles['signInLinks']}>
        <span className={styles['signInLink']}>Забыли пароль?</span>
        <span className={styles['signInLink']}>Регистрация</span>
      </section>
      <RoundedButton
        backgroundImage={signIn}
        label='Войти'
        className={styles['signInButton'] ?? ''}
        disabled
      />
    </main>
  );
}

export default Account;
