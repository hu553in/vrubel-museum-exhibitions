import facebookIcon from '@/assets/common/icons/social/facebook.svg';
import googlePlusIcon from '@/assets/common/icons/social/google-plus.svg';
import instagramIcon from '@/assets/common/icons/social/instagram.svg';
import okIcon from '@/assets/common/icons/social/ok.svg';
import tiktokIcon from '@/assets/common/icons/social/tiktok.svg';
import vkIcon from '@/assets/common/icons/social/vk.svg';
import youtubeIcon from '@/assets/common/icons/social/youtube.svg';
import cn from 'classnames';
import './style.scss';

export enum SocialNetwork {
  FACEBOOK = 'facebook',
  INSTAGRAM = 'instagram',
  OK = 'ok',
  TIKTOK = 'tiktok',
  VK = 'vk',
  YOUTUBE = 'youtube',
  GOOGLE_PLUS = 'googlePlus',
}

const socialNetworkIcons = {
  [SocialNetwork.FACEBOOK]: {
    src: facebookIcon,
    alt: 'Facebook',
  },
  [SocialNetwork.INSTAGRAM]: {
    src: instagramIcon,
    alt: 'Instagram',
  },
  [SocialNetwork.OK]: {
    src: okIcon,
    alt: 'Одноклассники',
  },
  [SocialNetwork.TIKTOK]: {
    src: tiktokIcon,
    alt: 'TikTok',
  },
  [SocialNetwork.VK]: {
    src: vkIcon,
    alt: 'VK',
  },
  [SocialNetwork.YOUTUBE]: {
    src: youtubeIcon,
    alt: 'YouTube',
  },
  [SocialNetwork.GOOGLE_PLUS]: {
    src: googlePlusIcon,
    alt: 'Google+',
  },
} as const satisfies Record<SocialNetwork, { src: string; alt: string }>;

export interface Props {
  socialNetwork: SocialNetwork;
  className?: string;
}

function SocialNetworkIcon(props: Props) {
  const { className = '', socialNetwork } = props;
  const icon = socialNetworkIcons[socialNetwork];

  return <img src={icon.src} alt={icon.alt} className={cn('social-network-icon', className)} />;
}

export default SocialNetworkIcon;
