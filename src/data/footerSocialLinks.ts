import { SocialNetwork } from '@/components/common/SocialNetworkIcon/socialNetworks';

export interface FooterSocialLink {
  href: string;
  socialNetwork: SocialNetwork;
  ariaLabel: string;
}

export const footerSocialLinks: readonly FooterSocialLink[] = [
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
