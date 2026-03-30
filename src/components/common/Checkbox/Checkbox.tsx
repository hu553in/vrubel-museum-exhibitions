import cn from 'classnames';
import { useId } from 'react';
import './style.scss';

interface Props {
  label: string;
  value: boolean;
  toggle: () => unknown;
  className?: string;
}

function Checkbox(props: Props) {
  const { className = '', value, label, toggle } = props;
  const inputId = useId();

  const innerElementClassName = cn('checkbox__inner-element', {
    'checkbox__inner-element_checked': value,
  });

  return (
    <label
      className={cn('checkbox', {
        [className]: className.length > 0,
      })}
      htmlFor={inputId}
    >
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
}

export default Checkbox;
