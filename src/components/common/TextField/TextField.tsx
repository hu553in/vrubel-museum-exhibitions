import cn from 'classnames';
import React from 'react';
import './style.scss';

type Type = 'text' | 'email' | 'password';

interface Props {
  id?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  className?: string;
  placeholder?: string;
  name?: string;
  autoComplete?: string;
  ariaLabel?: string;
  required?: boolean;
  type?: Type;
  error?: boolean;
}

const TextField: React.FC<Props> = props => {
  const {
    type = 'text',
    id,
    value,
    onChange,
    onBlur,
    placeholder,
    className = '',
    name,
    autoComplete,
    ariaLabel,
    required = false,
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
      id={id}
      className={classNameToUse}
      placeholder={placeholder}
      value={value}
      name={name}
      autoComplete={autoComplete}
      required={required}
      type={type}
      aria-label={ariaLabel}
      aria-invalid={error}
    />
  );
};

export default TextField;
