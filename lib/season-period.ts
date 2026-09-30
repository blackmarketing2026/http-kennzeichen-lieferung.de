export const DEFAULT_SEASON_START_MONTH = 4;
export const DEFAULT_SEASON_END_MONTH = 10;

export function isValidSeasonPeriod(start: unknown, end: unknown): boolean {
  return Number.isInteger(start) && Number.isInteger(end) &&
    (start as number) >= 1 && (end as number) <= 12 &&
    (end as number) - (start as number) >= 1 &&
    (end as number) - (start as number) <= 10;
}

export function formatSeasonMonth(month: number) {
  return String(month).padStart(2, '0');
}
