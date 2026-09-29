import { describe, expect, it } from 'vitest';
import { configuredPickupTimes, getPickupCountdown } from '@/lib/pickup-countdown';

const times = [540, 720, 960];

describe('next planned DHL pickup', () => {
  it('uses the pickup times already held in the project', () => {
    expect(configuredPickupTimes()).toEqual([540, 720, 960]);
  });

  it('uses the next configured pickup without an artificial order deadline', () => {
    expect(getPickupCountdown(new Date('2026-09-23T06:55:00Z'), times, 'BE', 'BASE'))
      .toMatchObject({ pickupAt: '2026-09-23T07:00:00.000Z', pickupTime: '09:00', dayOffset: 0 });
  });

  it('moves after the last pickup to the next business day', () => {
    expect(getPickupCountdown(new Date('2026-09-25T14:10:00Z'), times, 'BE', 'BASE'))
      .toMatchObject({ pickupAt: '2026-09-28T07:00:00.000Z', pickupTime: '09:00', dayOffset: 3 });
  });

  it('skips a public holiday at the printing location', () => {
    expect(getPickupCountdown(new Date('2028-08-07T15:00:00Z'), times, 'BY', 'A'))
      .toMatchObject({ pickupAt: '2028-08-09T07:00:00.000Z', pickupTime: '09:00', dayOffset: 2 });
  });

  it('accounts for the daylight saving switch on a weekend', () => {
    expect(getPickupCountdown(new Date('2026-10-24T14:00:00Z'), times, 'BE', 'BASE'))
      .toMatchObject({ pickupAt: '2026-10-26T08:00:00.000Z', pickupTime: '09:00', dayOffset: 2 });
  });
});
