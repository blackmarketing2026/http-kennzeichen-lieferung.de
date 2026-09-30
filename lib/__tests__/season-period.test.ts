import { describe, expect, it } from 'vitest';
import { formatSeasonMonth, isValidSeasonPeriod } from '@/lib/season-period';

describe('Saisonzeitraum', () => {
  it('accepts periods of 2 to 11 months', () => {
    expect(isValidSeasonPeriod(4, 10)).toBe(true);
    expect(isValidSeasonPeriod(1, 2)).toBe(true);
    expect(isValidSeasonPeriod(2, 12)).toBe(true);
  });

  it.each([[1, 1], [1, 12], [10, 4], [0, 4], [4, 13], [2.5, 5]])('rejects invalid months %s to %s', (start, end) => {
    expect(isValidSeasonPeriod(start, end)).toBe(false);
  });

  it('formats the stamped month with two digits', () => {
    expect(formatSeasonMonth(4)).toBe('04');
  });
});
