import cn from 'classnames';
import React, { useMemo } from 'react';
import './style.scss';

interface Props {
  logo: string;
  onLogoLoad: () => unknown;
  onLogoError: () => unknown;
  name: string;
  address: string;
  busStops: string[];
  contacts: string[];
  className?: string;
}

const Building: React.FC<Props> = props => {
  const {
    logo,
    onLogoLoad,
    onLogoError,
    name,
    address,
    busStops,
    contacts,
    className = '',
  } = props;

  const busStopElements = useMemo(
    () =>
      busStops.map((busStop, index) => (
        <p key={`bus-stop-${index}`} className='building__bus-stop'>
          {busStop}
        </p>
      )),
    [busStops]
  );

  const contactElements = useMemo(
    () =>
      contacts.map((contact, index) => (
        <p key={`contact-${index}`} className='building__contact'>
          {contact}
        </p>
      )),
    [contacts]
  );

  const classNameToUse = useMemo(
    () =>
      cn('building', {
        [className]: className.length > 0,
      }),
    [className]
  );

  return (
    <div className={classNameToUse}>
      <img
        className='building__logo'
        src={logo}
        alt='Логотип строения'
        onLoad={onLogoLoad}
        onError={onLogoError}
      />
      <p className='building__name'>{name}</p>
      <div>
        <p className='building__address-label'>Адрес:</p>
        <p className='building__address'>{address}</p>
        <p className='building__bus-stops-label'>Остановки:</p>
        {busStopElements}
        <p className='building__contacts-label'>Контакты:</p>
        {contactElements}
      </div>
    </div>
  );
};

export default Building;
