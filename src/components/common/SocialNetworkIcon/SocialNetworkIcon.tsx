import cn from 'classnames';

import { type SocialNetwork, socialNetworkIcons } from './socialNetworks';
import styles from './style.module.css';

interface Props {
  socialNetwork: SocialNetwork;
  className?: string;
}

function SocialNetworkIcon(props: Props) {
  const { className = '', socialNetwork } = props;
  const icon = socialNetworkIcons[socialNetwork];

  return (
    <img src={icon.src} alt={icon.alt} className={cn(styles['socialNetworkIcon'], className)} />
  );
}

export default SocialNetworkIcon;
