import first from '@/pages/revived-paintings/Contacts/assets/images/first.svg';
import second from '@/pages/revived-paintings/Contacts/assets/images/second.svg';
import third from '@/pages/revived-paintings/Contacts/assets/images/third.svg';

export interface ContactBuildingInfo {
  logo: string;
  name: string;
  address: string;
  busStops: readonly string[];
  contacts: readonly string[];
}

export const contactBuildings = [
  {
    logo: first,
    name: 'Генерал-губернаторский дворец',
    address: '644024, Омск, ул. Ленина, 23',
    busStops: ['«Площадь Ленина»', '«Краеведческий музей»'],
    contacts: ['+7 (3812) 31-36-77', '+7 (3812) 31-00-17'],
  },
  {
    logo: second,
    name: 'Врубелевский корпус',
    address: '644043, Омск, ул. Ленина, 3',
    busStops: ['«Площадь Победы»', '«Торговый Центр»', '«Драмтеатр»', '«Госпиталь»'],
    contacts: ['+7 (3812) 24-15-64', '+7 (3812) 20-00-47'],
  },
  {
    logo: third,
    name: 'Центр «Эрмитаж-Сибирь»',
    address: '644099, Омск, ул. Музейная, 4',
    busStops: ['«Драмтеатр»', '«Любинский проспект»', '«Площадь Победы»', '«Госпиталь»'],
    contacts: ['+7 (3812) 95-12-25', '+7 958-854-0590'],
  },
] satisfies readonly [ContactBuildingInfo, ContactBuildingInfo, ContactBuildingInfo];
