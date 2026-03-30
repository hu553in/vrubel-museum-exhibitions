import cn from 'classnames';
import React from 'react';
import './style.scss';

type Type = 'text' | 'email' | 'password';

interface Props {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  className?: string;
  placeholder?: string;
  type?: Type;
  error?: boolean;
}

const TextField: React.FC<Props> = props => {
  const {
    type = 'text',
    value,
    onChange,
    onBlur,
    placeholder,
    className = '',
    error = false,
  } = props;

  const classNameToUse = cn('text-field', {
    'text-field_error': error,
    [className]: className.length > 0,
  });

  return (
    <input
      onChange={onChange}
      onBlur={onBlur}
      className={classNameToUse}
      placeholder={placeholder}
      value={value}
      type={type}
      aria-invalid={error}
    />
  );
};

export default TextField;
