import Loading from '@/components/common/Loading/Loading';
import SocialNetworkIcon, {
  SocialNetwork,
} from '@/components/common/SocialNetworkIcon/SocialNetworkIcon';
import { ROUTES } from '@/constants';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from './assets/images/logo.svg';
import './style.scss';

const navBarLinks = [
  { label: 'Главная', route: ROUTES.DEFAULT },
  { label: 'Галос', route: `${ROUTES.REVIVED_PAINTINGS}${ROUTES.GALOS}` },
  { label: 'Контакты', route: `${ROUTES.REVIVED_PAINTINGS}${ROUTES.CONTACTS}` },
  { label: 'Каталог', route: `${ROUTES.REVIVED_PAINTINGS}${ROUTES.CATALOGUE}` },
  { label: 'Аккаунт', route: `${ROUTES.REVIVED_PAINTINGS}${ROUTES.ACCOUNT}` },
  { label: 'О проекте', route: `${ROUTES.REVIVED_PAINTINGS}${ROUTES.ABOUT}` },
];

const socialLinks: {
  href: string;
  socialNetwork: SocialNetwork;
  ariaLabel: string;
}[] = [
  {
    href: 'https://vk.com/club7412186',
    socialNetwork: SocialNetwork.VK,
    ariaLabel: 'Страница музея в VK',
  },
  {
    href: 'https://www.facebook.com/Омский-областной-музей-изобразительных-искусств-имени-МА-Врубеля-358420747675784/',
    socialNetwork: SocialNetwork.FACEBOOK,
    ariaLabel: 'Страница музея в Facebook',
  },
  {
    href: 'https://www.instagram.com/vrubelmuseum',
    socialNetwork: SocialNetwork.INSTAGRAM,
    ariaLabel: 'Страница музея в Instagram',
  },
  {
    href: 'https://www.tiktok.com/@vrubelmuseum',
    socialNetwork: SocialNetwork.TIKTOK,
    ariaLabel: 'Страница музея в TikTok',
  },
  {
    href: 'https://ok.ru/muzeyimeni',
    socialNetwork: SocialNetwork.OK,
    ariaLabel: 'Страница музея в Одноклассниках',
  },
  {
    href: 'https://www.youtube.com/channel/UCP91mcNT5-iftKg7vLx3G9w',
    socialNetwork: SocialNetwork.YOUTUBE,
    ariaLabel: 'Канал музея на YouTube',
  },
];

function Footer() {
  const [loading, setLoading] = useState(true);

  return (
    <footer className='footer'>
      {loading && <Loading />}
      <a className='footer__logo' href='https://vrubel.ru' aria-label='Официальный сайт музея'>
        <img
          src={logo}
          alt='Логотип музея'
          onLoad={() => {
            setLoading(false);
          }}
          onError={() => {
            setLoading(false);
          }}
        />
      </a>
      <nav className='footer__nav-bar'>
        {navBarLinks.map(navBarLink => (
          <NavLink key={navBarLink.route} className='footer__nav-bar-link' to={navBarLink.route}>
            {navBarLink.label}
          </NavLink>
        ))}
      </nav>
      <nav className='footer__social-links'>
        {socialLinks.map(socialLink => (
          <a
            key={socialLink.href}
            className='footer__social-link'
            href={socialLink.href}
            aria-label={socialLink.ariaLabel}
          >
            <SocialNetworkIcon socialNetwork={socialLink.socialNetwork} />
          </a>
        ))}
      </nav>
      <div className='footer__copyright'>
        <span className='footer__copyright-text'>
          © Омский областной музей изобразительных искусств имени М. А. Врубеля
        </span>
        <a className='footer__copyright-link' href='https://vrubel.ru'>
          vrubel.ru
        </a>
      </div>
      <a
        className='footer__personal-data-processing-policy-link'
        href={`${import.meta.env.BASE_URL}personal_data_processing_policy.pdf`}
      >
        Политика обработки персональных данных
      </a>
    </footer>
  );
}

export default Footer;
