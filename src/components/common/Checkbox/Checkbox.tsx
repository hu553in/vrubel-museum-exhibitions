import cn from 'classnames';
import React, { useId } from 'react';
import './style.scss';

interface Props {
  label: string;
  value: boolean;
  toggle: () => unknown;
  className?: string;
}

const Checkbox: React.FC<Props> = props => {
  const { className = '', value, label, toggle } = props;
  const inputId = useId();

  const classNameToUse = cn('checkbox', {
    [className]: className.length > 0,
  });

  const innerElementClassName = cn('checkbox__inner-element', {
    'checkbox__inner-element_checked': value,
  });

  return (
    <label className={classNameToUse} htmlFor={inputId}>
      <input
        id={inputId}
        className='checkbox__input'
        type='checkbox'
        checked={value}
        onChange={toggle}
      />
      <span className={innerElementClassName} />
      <span className='checkbox__label'>{label}</span>
    </label>
  );
};

export default Checkbox;
