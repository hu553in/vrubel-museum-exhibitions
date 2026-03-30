import cn from 'classnames';
import './style.scss';

export interface Props {
  logo: string;
  onLogoLoad: () => unknown;
  onLogoError: () => unknown;
  name: string;
  address: string;
  busStops: string[];
  contacts: string[];
  className?: string;
}

function Building(props: Props) {
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

  return (
    <div
      className={cn('building', {
        [className]: className.length > 0,
      })}
    >
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
        {busStops.map(busStop => (
          <p key={busStop} className='building__bus-stop'>
            {busStop}
          </p>
        ))}
        <p className='building__contacts-label'>Контакты:</p>
        {contacts.map(contact => (
          <p key={contact} className='building__contact'>
            {contact}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Building;
