import cn from 'classnames';

import styles from './style.module.css';

export interface Props {
  logo: string;
  onLogoLoad: () => unknown;
  onLogoError: () => unknown;
  name: string;
  address: string;
  busStops: readonly string[];
  contacts: readonly string[];
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
    <div className={cn(styles['building'], className)}>
      <img
        className={styles['logo']}
        src={logo}
        alt={`Логотип ${name}`}
        onLoad={onLogoLoad}
        onError={onLogoError}
      />
      <h2 className={styles['name']}>{name}</h2>
      <div>
        <p className={styles['addressLabel']}>Адрес:</p>
        <p className={styles['address']}>{address}</p>
        <p className={styles['busStopsLabel']}>Остановки:</p>
        {busStops.map(busStop => (
          <p key={busStop} className={styles['busStop']}>
            {busStop}
          </p>
        ))}
        <p className={styles['contactsLabel']}>Контакты:</p>
        {contacts.map(contact => (
          <p key={contact} className={styles['contact']}>
            {contact}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Building;
