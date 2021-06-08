import cn from 'classnames';
import React from 'react';
import './style.scss';

type Type = 'text' | 'email' | 'password';

interface Props {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
  placeholder?: string;
  type?: Type;
}

const TextField: React.FC<Props> = props => {
  const { type = 'text', value, onChange, placeholder, className = '' } = props;

  const classNameToUse = cn('text-field', {
    [className]: className.length > 0,
  });

  return (
    <input
      onChange={onChange}
      className={classNameToUse}
      placeholder={placeholder}
      value={value}
      type={type}
    />
  );
};

export default TextField;
