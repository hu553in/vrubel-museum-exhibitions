import cn from 'classnames';
import React from 'react';
import './style.scss';

interface Props {
  label: string;
  value: boolean;
  toggle: () => unknown;
  className?: string;
}

const Checkbox: React.FC<Props> = props => {
  const { className = '', value, label, toggle } = props;

  const classNameToUse = cn('checkbox', {
    [className]: className.length > 0,
  });

  const innerElementClassName = cn('checkbox__inner-element', {
    'checkbox__inner-element_checked': value,
  });

  return (
    <span className={classNameToUse} onClick={toggle}>
      <span className={innerElementClassName} />
      <span className='checkbox__label'>{label}</span>
    </span>
  );
};

export default Checkbox;
