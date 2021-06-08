import cn from 'classnames';
import React, { useMemo } from 'react';
import './style.scss';

interface Props {
  backgroundImage: string;
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

const RoundedButton: React.FC<Props> = props => {
  const { backgroundImage, label, className = '', onClick } = props;

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

  return (
    <button className={classNameToUse} style={buttonStyle} onClick={onClick}>
      {label}
    </button>
  );
};

export default RoundedButton;
