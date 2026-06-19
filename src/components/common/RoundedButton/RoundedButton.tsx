import cn from 'classnames';
import type { HTMLAttributeAnchorTarget, MouseEventHandler } from 'react';

import { createBackgroundImageStyle } from '@/utils/backgroundImageStyle';

import styles from './style.module.css';

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
      className={cn(styles['roundedButton'], className)}
      href={href}
      style={createBackgroundImageStyle(backgroundImage)}
      target={target}
      rel={rel}
    >
      {label}
    </a>
  ) : (
    <button
      type='button'
      className={cn(styles['roundedButton'], className)}
      style={createBackgroundImageStyle(backgroundImage)}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

export default RoundedButton;
