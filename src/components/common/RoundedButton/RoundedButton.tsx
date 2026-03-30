import cn from 'classnames';
import type { HTMLAttributeAnchorTarget, MouseEventHandler } from 'react';
import './style.scss';

interface Props {
  backgroundImage: string;
  label: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  href?: string;
  target?: HTMLAttributeAnchorTarget;
  rel?: string;
  disabled?: boolean;
}

function RoundedButton(props: Props) {
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

  return href ? (
    <a
      className={cn('rounded-button', {
        [className]: className.length > 0,
      })}
      href={href}
      style={{ backgroundImage: `url(${backgroundImage})` }}
      target={target}
      rel={rel}
    >
      {label}
    </a>
  ) : (
    <button
      type='button'
      className={cn('rounded-button', {
        [className]: className.length > 0,
      })}
      style={{ backgroundImage: `url(${backgroundImage})` }}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

export default RoundedButton;
