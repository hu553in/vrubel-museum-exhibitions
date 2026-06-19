import cn from 'classnames';
import { useId } from 'react';

import styles from './style.module.css';

interface Props {
  label: string;
  value: boolean;
  toggle: () => unknown;
  className?: string;
}

function Checkbox(props: Props) {
  const { className = '', value, label, toggle } = props;
  const inputId = useId();

  const innerElementClassName = cn(styles['innerElement'], value ? styles['checked'] : null);

  return (
    <label className={cn(styles['checkbox'], className)} htmlFor={inputId}>
      <input
        id={inputId}
        className={styles['input']}
        type='checkbox'
        checked={value}
        onChange={toggle}
      />
      <span className={innerElementClassName} />
      <span className={styles['label']}>{label}</span>
    </label>
  );
}

export default Checkbox;
