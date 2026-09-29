import { describe, expect, it } from 'vitest';
import { configuredShippingRegion, configuredShippingState, deliveryDates, deliveryStartDate } from '@/lib/delivery-promise';

describe('zugesagte Lieferfrist', () => {
  it('nutzt das hinterlegte Versandbundesland', () => {
    expect(configuredShippingState()).toBe('NW');
    expect(configuredShippingRegion(configuredShippingState())).toBe('BASE');
  });
  it('zählt nach einer Freitagsbestellung erst ab Montag und vier Werktage', () => {
    expect(deliveryDates(new Date('2026-09-25T20:30:00Z'), new Date('2026-09-25T20:31:00Z'), 'BE', 'BE'))
      .toEqual({ start: '2026-09-26', deadline: '2026-10-01' });
  });

  it('beginnt erst nach der später bestätigten Zahlung', () => {
    const ordered = new Date('2026-09-25T16:00:00Z');
    const paid = new Date('2026-09-28T09:00:00Z');
    expect(deliveryStartDate(ordered, paid)).toBe('2026-09-29');
    expect(deliveryDates(ordered, paid, 'BE', 'BE').deadline).toBe('2026-10-02');
  });

  it('überspringt Ostern am Versand- und Zustellort', () => {
    expect(deliveryDates(new Date('2026-04-02T18:00:00Z'), new Date('2026-04-02T18:01:00Z'), 'BY', 'BE'))
      .toEqual({ start: '2026-04-03', deadline: '2026-04-10' });
  });

  it('berücksichtigt landesspezifische Feiertage beider Orte', () => {
    expect(deliveryDates(new Date('2027-10-29T18:00:00Z'), new Date('2027-10-29T18:01:00Z'), 'BY', 'BE'))
      .toEqual({ start: '2027-10-30', deadline: '2027-11-05' });
  });

  it('berücksichtigt lokale Feiertage in Augsburg', () => {
    const ordered = new Date('2028-08-07T12:00:00Z');
    expect(deliveryDates(ordered, ordered, 'BE', 'BY', 'BASE', 'A').deadline).toBe('2028-08-14');
  });
});
