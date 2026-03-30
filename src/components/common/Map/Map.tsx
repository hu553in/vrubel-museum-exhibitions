import cn from 'classnames';
import './style.scss';

interface Props {
  wrapperClassName?: string;
  className?: string;
  src: string;
}

function Map(props: Props) {
  const { className = '', wrapperClassName = '', src } = props;

  return (
    <div
      className={cn('map-wrapper', {
        [wrapperClassName]: wrapperClassName.length > 0,
      })}
    >
      <iframe
        title='Интерактивная карта музея'
        src={src}
        loading='lazy'
        className={cn('map', {
          [className]: className.length > 0,
        })}
        style={{ border: 0 }}
      />
    </div>
  );
}

export default Map;
