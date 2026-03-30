import './style.scss';

import cn from 'classnames';
import type { ChangeEventHandler, FocusEventHandler } from 'react';

type Type = 'text' | 'email' | 'password';

interface Props {
  id?: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  className?: string;
  placeholder?: string;
  name?: string;
  autoComplete?: string;
  ariaLabel?: string;
  required?: boolean;
  type?: Type;
  error?: boolean;
}

function TextField(props: Props) {
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

  return (
    <input
      onChange={onChange}
      onBlur={onBlur}
      id={id}
      className={cn('text-field', {
        'text-field_error': error,
        [className]: className.length > 0,
      })}
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
}

export default TextField;
