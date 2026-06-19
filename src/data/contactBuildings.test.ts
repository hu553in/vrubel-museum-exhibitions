import { describe, expect, it } from 'vitest';

import { contactBuildings } from './contactBuildings';

describe('contactBuildings', () => {
  it('contains the expected museum buildings', () => {
    expect(contactBuildings).toHaveLength(3);
    expect(contactBuildings.map(({ name }) => name)).toEqual([
      'Генерал-губернаторский дворец',
      'Врубелевский корпус',
      'Центр «Эрмитаж-Сибирь»',
    ]);
  });

  it('keeps non-empty address, contacts, and bus stops for every building', () => {
    expect(
      contactBuildings.every(
        ({ address, busStops, contacts }) =>
          address.trim().length > 0 && busStops.length > 0 && contacts.length > 0
      )
    ).toBe(true);
  });

  it('keeps building names unique', () => {
    const names = contactBuildings.map(({ name }) => name);

    expect(new Set(names).size).toBe(names.length);
  });
});
