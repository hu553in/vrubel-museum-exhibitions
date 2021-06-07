import React, { useCallback, useMemo, useState } from 'react';
import Building from '../../components/Building/Building';
import Loading from '../../components/Loading/Loading';
import Map from '../../components/Map/Map';
import RoundedLinkButton from '../../components/RoundedLinkButton/RoundedLinkButton';
import buyTicket from './images/buy-ticket.webp';
import first from './images/first.svg';
import second from './images/second.svg';
import third from './images/third.svg';
import './style.scss';

const mapSrc =
  'https://yandex.ru/map-widget/v1/?um=constructor' +
  '%3A021a8201199b18188b6d329f8499960f6e90190e155c7c0b3fb9e1ddf5f4598a' +
  '&amp;source=constructor';

const Contacts: React.FC = () => {
  const [loadingArray, setLoadingArray] = useState(Array(3).fill(true));

  const loading = useMemo(
    () => loadingArray.reduce((carry, current) => carry || current, false),
    [loadingArray]
  );

  const uncheckLoadingArrayItem = useCallback((index: number) => {
    setLoadingArray(loadingArray => {
      let clonedLoadingArray = [...loadingArray];
      clonedLoadingArray[index] = false;
      return clonedLoadingArray;
    });
  }, []);

  const buildings = useMemo(
    () => [
      {
        logo: first,
        onLogoLoad: () => uncheckLoadingArrayItem(0),
        name: 'Генерал-губернаторский дворец',
        address: '644024, Омск, ул. Ленина, 23',
        busStops: ['«Площадь Ленина»', '«Краеведческий музей»'],
        contacts: ['+7 (3812) 31-36-77', '+7 (3812) 31-00-17'],
      },
      {
        logo: second,
        onLogoLoad: () => uncheckLoadingArrayItem(1),
        name: 'Врубелевский корпус',
        address: '644043, Омск, ул. Ленина, 3',
        busStops: [
          '«Площадь Победы»',
          '«Торговый Центр»',
          '«Драмтеатр»',
          '«Госпиталь»',
        ],
        contacts: ['+7 (3812) 24-15-64', '+7 (3812) 20-00-47'],
      },
      {
        logo: third,
        onLogoLoad: () => uncheckLoadingArrayItem(2),
        name: 'Центр «Эрмитаж-Сибирь»',
        address: '644099, Омск, ул. Музейная, 4',
        busStops: [
          '«Драмтеатр»',
          '«Любинский проспект»',
          '«Площадь Победы»',
          '«Госпиталь»',
        ],
        contacts: ['+7 (3812) 95-12-25', '+7 958-854-0590'],
      },
    ],
    [uncheckLoadingArrayItem]
  );

  return (
    <main className='contacts'>
      {loading && <Loading />}
      <p className='contacts__title'>Музей</p>
      <section className='contacts__buildings'>
        <Building className='contacts__building_first' {...buildings[0]!} />
        <Building className='contacts__building_second' {...buildings[1]!} />
        <Building className='contacts__building_third' {...buildings[2]!} />
      </section>
      <section className='contacts__schedule'>
        <p className='contacts__schedule-title'>Режим работы музея:</p>
        <p className='contacts__schedule-text'>
          10:00-19:00 (касса до 18:00), пн — выходной
        </p>
      </section>
      <Map src={mapSrc} wrapperClassName='contacts__map-wrapper' />
      <RoundedLinkButton
        className='contacts__buy-ticket-button'
        link='https://vrubel.ru/ticket/czentr-ermitazh-sibir'
        label='Купить билет'
        backgroundImage={buyTicket}
      />
    </main>
  );
};

export default Contacts;
