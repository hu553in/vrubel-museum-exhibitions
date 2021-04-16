import cn from 'classnames';
import React, { useMemo } from 'react';
import './style.scss';

interface Props {
  className?: string;
  src: string;
}

const Map: React.FC<Props> = props => {
  const { className = '', src } = props;

  const classNameToUse = useMemo(
    () =>
      cn('map', {
        [className]: className.length > 0,
      }),
    [className]
  );

  return (
    <iframe title='map' src={src} className={classNameToUse} frameBorder='0' />
  );
};

export default Map;
