import cn from 'classnames';

import styles from './style.module.css';

interface Props {
  wrapperClassName?: string;
  className?: string;
  src: string;
}

function Map(props: Props) {
  const { className = '', wrapperClassName = '', src } = props;

  return (
    <div className={cn(styles['mapWrapper'], wrapperClassName)}>
      <iframe
        title='Интерактивная карта музея'
        src={src}
        loading='lazy'
        className={cn(styles['map'], className)}
        style={{ border: 0 }}
      />
    </div>
  );
}

export default Map;
