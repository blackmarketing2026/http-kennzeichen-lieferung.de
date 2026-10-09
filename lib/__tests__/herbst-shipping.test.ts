import { describe, expect, it } from 'vitest';
import { showHerbstSameDayShipping } from '@/lib/herbst-shipping';

describe('Herbst same-day shipping notice', () => {
  it('shows before cutoff on a working day in Berlin', () => {
    expect(showHerbstSameDayShipping(new Date('2026-10-09T13:29:00Z'))).toBe(true);
  });

  it('hides at cutoff, on weekends, and on public holidays at the print location', () => {
    expect(showHerbstSameDayShipping(new Date('2026-10-09T13:30:00Z'))).toBe(false);
    expect(showHerbstSameDayShipping(new Date('2026-10-10T09:00:00Z'))).toBe(false);
    expect(showHerbstSameDayShipping(new Date('2026-12-25T09:00:00Z'))).toBe(false);
  });
});
