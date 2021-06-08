import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Building from '../../../components/common/Building/Building';
import Loading from '../../../components/common/Loading/Loading';
import Map from '../../../components/common/Map/Map';
import RoundedButton from '../../../components/common/RoundedButton/RoundedButton';
import buyTicket from './assets/images/buy-ticket.webp';
import first from './assets/images/first.svg';
import second from './assets/images/second.svg';
import third from './assets/images/third.svg';
import './style.scss';

const initialLoadingArray = Array(3).fill(true);

const mapSrc =
  'https://yandex.ru/map-widget/v1/?um=constructor' +
  '%3A021a8201199b18188b6d329f8499960f6e90190e155c7c0b3fb9e1ddf5f4598a' +
  '&amp;source=constructor';

const Contacts: React.FC = () => {
  const [loadingArray, setLoadingArray] = useState(initialLoadingArray);

  useEffect(() => {
    setLoadingArray(initialLoadingArray);
  }, []);

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
        onLogoError: () => uncheckLoadingArrayItem(0),
        name: 'Генерал-губернаторский дворец',
        address: '644024, Омск, ул. Ленина, 23',
        busStops: ['«Площадь Ленина»', '«Краеведческий музей»'],
        contacts: ['+7 (3812) 31-36-77', '+7 (3812) 31-00-17'],
      },
      {
        logo: second,
        onLogoLoad: () => uncheckLoadingArrayItem(1),
        onLogoError: () => uncheckLoadingArrayItem(1),
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
        onLogoError: () => uncheckLoadingArrayItem(2),
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
      <a
        href='https://vrubel.ru/ticket/czentr-ermitazh-sibir'
        className='contacts__buy-ticket-button-link'
      >
        <RoundedButton label='Купить билет' backgroundImage={buyTicket} />
      </a>
    </main>
  );
};

export default Contacts;
