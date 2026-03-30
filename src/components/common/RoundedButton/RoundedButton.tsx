import cn from 'classnames';
import React, { useMemo } from 'react';
import './style.scss';

interface Props {
  backgroundImage: string;
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  href?: string;
  target?: React.HTMLAttributeAnchorTarget;
  rel?: string;
  disabled?: boolean;
}

const RoundedButton: React.FC<Props> = props => {
  const {
    backgroundImage,
    label,
    className = '',
    onClick,
    href,
    target,
    rel,
    disabled = false,
  } = props;

  const buttonStyle = useMemo(
    () => ({
      backgroundImage: `url(${backgroundImage})`,
    }),
    [backgroundImage]
  );

  const classNameToUse = useMemo(
    () =>
      cn('rounded-button', {
        [className]: className.length > 0,
      }),
    [className]
  );

  return href ? (
    <a className={classNameToUse} href={href} style={buttonStyle} target={target} rel={rel}>
      {label}
    </a>
  ) : (
    <button
      type='button'
      className={classNameToUse}
      style={buttonStyle}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default RoundedButton;
