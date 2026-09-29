import Holidays from 'date-holidays';
import { SHIPPING_ORIGIN } from '@/config/shipping-origin';
import { type GermanState, validHolidayRegion } from '@/lib/delivery-promise';

const formatter = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/Berlin', year: 'numeric', month: '2-digit', day: '2-digit',
  hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23',
});

function berlinParts(date: Date) {
  const parts = Object.fromEntries(formatter.formatToParts(date)
    .filter((part) => part.type !== 'literal').map((part) => [part.type, Number(part.value)]));
  return parts as Record<'year' | 'month' | 'day' | 'hour' | 'minute' | 'second', number>;
}

function berlinWallTimeToDate(year: number, month: number, day: number, hour: number, minute: number): Date {
  const desired = Date.UTC(year, month - 1, day, hour, minute);
  let timestamp = desired;
  for (let attempt = 0; attempt < 3; attempt++) {
    const actual = berlinParts(new Date(timestamp));
    timestamp += desired - Date.UTC(actual.year, actual.month - 1, actual.day, actual.hour, actual.minute, actual.second);
  }
  return new Date(timestamp);
}

export function configuredPickupTimes(): number[] | null {
  return [...SHIPPING_ORIGIN.pickupTimes];
}

/** Planned pickup at the configured printing location, independent of whether a new order can still catch it. */
export function getPickupCountdown(now: Date, times: number[], state: GermanState, region: string) {
  if (!validHolidayRegion(state, region) || !times.length || times.some((time) => !Number.isInteger(time) || time < 0 || time >= 1440)) {
    throw new Error('Ungültiger DHL-Abholplan.');
  }
  const holidays = region === 'BASE' ? new Holidays('DE', state) : new Holidays('DE', state, region);
  const holidayCache = new Map<number, Set<string>>();
  const parts = berlinParts(now);
  for (let offset = 0; offset < 15; offset++) {
    const calendar = new Date(Date.UTC(parts.year, parts.month - 1, parts.day + offset, 12));
    const weekday = calendar.getUTCDay();
    if (weekday === 0 || weekday === 6) continue;
    const year = calendar.getUTCFullYear();
    let holidayDates = holidayCache.get(year);
    if (!holidayDates) {
      holidayDates = new Set(holidays.getHolidays(year).filter((holiday) => holiday.type === 'public').map((holiday) => holiday.date.slice(0, 10)));
      holidayCache.set(year, holidayDates);
    }
    if (holidayDates.has(calendar.toISOString().slice(0, 10))) continue;
    for (const time of [...times].sort((a, b) => a - b)) {
      const pickup = berlinWallTimeToDate(year, calendar.getUTCMonth() + 1, calendar.getUTCDate(), Math.floor(time / 60), time % 60);
      if (pickup > now) return { pickupAt: pickup.toISOString(), pickupTime: `${String(Math.floor(time / 60)).padStart(2, '0')}:${String(time % 60).padStart(2, '0')}`, dayOffset: offset };
    }
  }
  throw new Error('Keine DHL-Abholung im hinterlegten Zeitraum gefunden.');
}
