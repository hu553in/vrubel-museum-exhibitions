import './style.scss';

import Building, { type Props as BuildingProps } from '@/components/common/Building/Building';
import Loading from '@/components/common/Loading/Loading';
import Map from '@/components/common/Map/Map';
import RoundedButton from '@/components/common/RoundedButton/RoundedButton';
import { contactBuildings } from '@/data/contactBuildings';
import useImageLoadingState from '@/hooks/useImageLoadingState';

import buyTicket from './assets/images/buy-ticket.webp';

const mapSrc =
  'https://yandex.ru/map-widget/v1/?um=constructor' +
  '%3A021a8201199b18188b6d329f8499960f6e90190e155c7c0b3fb9e1ddf5f4598a' +
  '&amp;source=constructor';

type BuildingInfo = Omit<BuildingProps, 'className'>;

function Contacts() {
  const { loading, markImageAsLoaded } = useImageLoadingState(3);
  const createBuildingInfo = (
    building: (typeof contactBuildings)[number],
    index: number
  ): BuildingInfo => ({
    ...building,
    onLogoLoad: () => {
      markImageAsLoaded(index);
    },
    onLogoError: () => {
      markImageAsLoaded(index);
    },
  });
  const [firstBuilding, secondBuilding, thirdBuilding] = [
    createBuildingInfo(contactBuildings[0], 0),
    createBuildingInfo(contactBuildings[1], 1),
    createBuildingInfo(contactBuildings[2], 2),
  ] satisfies [BuildingInfo, BuildingInfo, BuildingInfo];

  return (
    <main className='contacts'>
      {loading && <Loading />}
      <p className='contacts__title'>Музей</p>
      <section className='contacts__buildings'>
        <Building className='contacts__building_first' {...firstBuilding} />
        <Building className='contacts__building_second' {...secondBuilding} />
        <Building className='contacts__building_third' {...thirdBuilding} />
      </section>
      <section className='contacts__schedule'>
        <p className='contacts__schedule-title'>Режим работы музея:</p>
        <p className='contacts__schedule-text'>10:00-19:00 (касса до 18:00), пн — выходной</p>
      </section>
      <Map src={mapSrc} wrapperClassName='contacts__map-wrapper' />
      <RoundedButton
        label='Купить билет'
        backgroundImage={buyTicket}
        className='contacts__buy-ticket-button-link'
        href='https://vrubel.ru/ticket/czentr-ermitazh-sibir'
      />
    </main>
  );
}

export default Contacts;
