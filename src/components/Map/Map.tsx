import cn from 'classnames';
import React, { useMemo } from 'react';
import './style.scss';

interface Props {
  wrapperClassName?: string;
  className?: string;
  src: string;
}

const Map: React.FC<Props> = props => {
  const { className = '', wrapperClassName = '', src } = props;

  const wrapperClassNameToUse = useMemo(
    () =>
      cn('map-wrapper', {
        [wrapperClassName]: wrapperClassName.length > 0,
      }),
    [wrapperClassName]
  );

  const classNameToUse = useMemo(
    () =>
      cn('map', {
        [className]: className.length > 0,
      }),
    [className]
  );

  return (
    <div className={wrapperClassNameToUse}>
      <iframe
        title='map'
        src={src}
        loading='lazy'
        className={classNameToUse}
        frameBorder='0'
      />
    </div>
  );
};

export default Map;
