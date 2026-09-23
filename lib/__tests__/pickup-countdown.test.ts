import { describe, expect, it } from 'vitest';
import { getPickupCountdown } from '@/lib/pickup-countdown';

describe('getPickupCountdown', () => {
  it('uses the next pickup when production still fits', () => {
    expect(getPickupCountdown(new Date('2026-09-23T06:00:00Z'))).toEqual({
      dayLabel: 'Heute',
      pickupTime: '09:00 Uhr',
      remaining: '01:00:00',
    });
  });

  it('skips a pickup when less than ten production minutes remain', () => {
    expect(getPickupCountdown(new Date('2026-09-23T06:55:00Z'))).toEqual({
      dayLabel: 'Heute',
      pickupTime: '12:00 Uhr',
      remaining: '03:05:00',
    });
  });

  it('selects the following morning after the last pickup', () => {
    expect(getPickupCountdown(new Date('2026-09-23T14:10:00Z'))).toEqual({
      dayLabel: 'Morgen',
      pickupTime: '09:00 Uhr',
      remaining: '16:50:00',
    });
  });

  it('accounts for the daylight-saving time change in Germany', () => {
    expect(getPickupCountdown(new Date('2026-10-24T14:00:00Z'))).toEqual({
      dayLabel: 'Morgen',
      pickupTime: '09:00 Uhr',
      remaining: '18:00:00',
    });
  });
});
