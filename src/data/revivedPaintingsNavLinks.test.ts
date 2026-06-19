import { describe, expect, it } from 'vitest';

import { ROUTES } from '@/constants';

import { revivedPaintingsNavLinks } from './revivedPaintingsNavLinks';

describe('revivedPaintingsNavLinks', () => {
  it('keeps the expected navigation order', () => {
    expect(revivedPaintingsNavLinks.map(({ label }) => label)).toEqual([
      'Главная',
      'Галос',
      'Контакты',
      'Каталог',
      'Аккаунт',
      'О проекте',
    ]);
  });

  it('contains unique routes', () => {
    const routes = revivedPaintingsNavLinks.map(({ route }) => route);

    expect(new Set(routes).size).toBe(routes.length);
  });

  it('keeps all revived paintings routes within the app shell', () => {
    expect(revivedPaintingsNavLinks.every(({ route }) => route.startsWith(ROUTES.DEFAULT))).toBe(
      true
    );
  });
});
