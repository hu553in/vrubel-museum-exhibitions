import React, { useMemo } from 'react';
import './style.scss';

interface Props {
  backgroundImage: string;
  label: string;
  link: string;
  className?: string;
}

const RoundedLinkButton: React.FC<Props> = props => {
  const { backgroundImage, label, link, className } = props;

  const buttonStyle = useMemo(
    () => ({
      backgroundImage: `url(${backgroundImage})`,
    }),
    [backgroundImage]
  );

  return (
    <a className={className} href={link}>
      <button className='rounded-link-button__button' style={buttonStyle}>
        {label}
      </button>
    </a>
  );
};

export default RoundedLinkButton;
