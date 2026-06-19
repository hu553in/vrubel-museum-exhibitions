import { ROUTES } from '@/constants';

export interface RevivedPaintingsNavLink {
  label: string;
  route: string;
}

export const revivedPaintingsNavLinks: readonly RevivedPaintingsNavLink[] = [
  { label: 'Главная', route: ROUTES.DEFAULT },
  { label: 'Галос', route: `${ROUTES.REVIVED_PAINTINGS}${ROUTES.GALOS}` },
  { label: 'Контакты', route: `${ROUTES.REVIVED_PAINTINGS}${ROUTES.CONTACTS}` },
  { label: 'Каталог', route: `${ROUTES.REVIVED_PAINTINGS}${ROUTES.CATALOGUE}` },
  { label: 'Аккаунт', route: `${ROUTES.REVIVED_PAINTINGS}${ROUTES.ACCOUNT}` },
  { label: 'О проекте', route: `${ROUTES.REVIVED_PAINTINGS}${ROUTES.ABOUT}` },
];
