import Building, { type Props as BuildingProps } from '@/components/common/Building/Building';
import Loading from '@/components/common/Loading/Loading';
import Map from '@/components/common/Map/Map';
import RoundedButton from '@/components/common/RoundedButton/RoundedButton';
import { contactBuildings } from '@/data/contactBuildings';
import useImageLoadingState from '@/hooks/useImageLoadingState';

import buyTicket from './assets/images/buy-ticket.webp';
import styles from './style.module.css';

const mapSrc =
  'https://yandex.ru/map-widget/v1/?um=constructor' +
  '%3A021a8201199b18188b6d329f8499960f6e90190e155c7c0b3fb9e1ddf5f4598a' +
  '&amp;source=constructor';

type BuildingInfo = Omit<BuildingProps, 'className'>;

function Contacts() {
  const { loading, getImageLoadHandlers } = useImageLoadingState(3);
  const createBuildingInfo = (
    building: (typeof contactBuildings)[number],
    index: number
  ): BuildingInfo => {
    const { onLoad, onError } = getImageLoadHandlers(index);

    return {
      ...building,
      onLogoLoad: onLoad,
      onLogoError: onError,
    };
  };
  const [firstBuilding, secondBuilding, thirdBuilding] = [
    createBuildingInfo(contactBuildings[0], 0),
    createBuildingInfo(contactBuildings[1], 1),
    createBuildingInfo(contactBuildings[2], 2),
  ] satisfies [BuildingInfo, BuildingInfo, BuildingInfo];

  return (
    <main className='pageMain' id='main-content'>
      {loading && <Loading />}
      <h1 className='pageTitle'>Музей</h1>
      <section className={styles['buildings']}>
        <Building {...firstBuilding} />
        <Building className={styles['buildingSecond'] ?? ''} {...secondBuilding} />
        <Building className={styles['buildingThird'] ?? ''} {...thirdBuilding} />
      </section>
      <section className={styles['schedule']}>
        <h2 className={styles['scheduleTitle']}>Режим работы музея:</h2>
        <p className={styles['scheduleText']}>10:00-19:00 (касса до 18:00), пн — выходной</p>
      </section>
      <Map src={mapSrc} wrapperClassName={styles['mapWrapper'] ?? ''} />
      <RoundedButton
        label='Купить билет'
        backgroundImage={buyTicket}
        className={styles['buyTicketButtonLink'] ?? ''}
        href='https://vrubel.ru/ticket/czentr-ermitazh-sibir'
      />
    </main>
  );
}

export default Contacts;
