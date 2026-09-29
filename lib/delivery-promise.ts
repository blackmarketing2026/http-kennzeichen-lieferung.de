import Holidays from 'date-holidays';
import { SHIPPING_ORIGIN } from '@/config/shipping-origin';

export const DELIVERY_PROMISE_TEXT = 'Lieferung innerhalb Deutschlands: 1–4 Werktage nach Bestellung und erfolgreicher Zahlung.';
export const DELIVERY_EXPLANATION = 'Die Lieferfrist beginnt am Tag nach Eingang der Bestellung und erfolgreicher Zahlung. Als Werktage zählen Montag bis Freitag, ausgenommen gesetzliche Feiertage.';
export const GUARANTEE_TERMS_VERSION = '2026-09-29-v1';

export const GERMAN_STATES = {
  BW: 'Baden-Württemberg', BY: 'Bayern', BE: 'Berlin', BB: 'Brandenburg', HB: 'Bremen',
  HH: 'Hamburg', HE: 'Hessen', MV: 'Mecklenburg-Vorpommern', NI: 'Niedersachsen',
  NW: 'Nordrhein-Westfalen', RP: 'Rheinland-Pfalz', SL: 'Saarland', SN: 'Sachsen',
  ST: 'Sachsen-Anhalt', SH: 'Schleswig-Holstein', TH: 'Thüringen',
} as const;
export type GermanState = keyof typeof GERMAN_STATES;
export const HOLIDAY_REGIONS: Partial<Record<GermanState, Record<string, string>>> = {
  BY: { A: 'Stadt Augsburg', KATH: 'Überwiegend katholische Gemeinde', EVANG: 'Überwiegend evangelische Gemeinde', BASE: 'Andere Gemeinde' },
  SN: { BZ: 'Landkreis Bautzen', BASE: 'Anderer Landkreis' },
  TH: { EIC: 'Landkreis Eichsfeld', UH: 'Unstrut-Hainich-Kreis', WAK: 'Wartburgkreis', BASE: 'Anderer Landkreis' },
};

export function validHolidayRegion(state: GermanState, value: string | null | undefined): value is string {
  if (!value) return false;
  const regions = HOLIDAY_REGIONS[state];
  return regions ? Object.hasOwn(regions, value) : value === 'BASE';
}

export function validGermanState(value: string | null | undefined): value is GermanState {
  return Boolean(value && Object.hasOwn(GERMAN_STATES, value));
}

export function configuredShippingState(): GermanState | null {
  return SHIPPING_ORIGIN.state;
}

export function configuredShippingRegion(state: GermanState | null): string | null {
  return state === SHIPPING_ORIGIN.state ? SHIPPING_ORIGIN.holidayRegion : null;
}

export function berlinDate(date: Date): string {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Berlin', year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(date);
  const get = (part: string) => parts.find((item) => item.type === part)!.value;
  return `${get('year')}-${get('month')}-${get('day')}`;
}

function nextDate(date: string): string {
  const next = new Date(`${date}T12:00:00Z`);
  next.setUTCDate(next.getUTCDate() + 1);
  return next.toISOString().slice(0, 10);
}

export function deliveryStartDate(orderedAt: Date, paidAt: Date): string {
  return nextDate(berlinDate(orderedAt > paidAt ? orderedAt : paidAt));
}

export function deliveryDates(orderedAt: Date, paidAt: Date, origin: GermanState, destination: GermanState, originRegion = 'BASE', destinationRegion = 'BASE') {
  const start = deliveryStartDate(orderedAt, paidAt);
  if (!validHolidayRegion(origin, originRegion) || !validHolidayRegion(destination, destinationRegion)) throw new Error('Feiertagsregion fehlt.');
  const originHolidays = originRegion === 'BASE' ? new Holidays('DE', origin) : new Holidays('DE', origin, originRegion);
  const destinationHolidays = destinationRegion === 'BASE' ? new Holidays('DE', destination) : new Holidays('DE', destination, destinationRegion);
  const cache = new Map<number, Set<string>>();
  const publicHolidays = (year: number) => {
    let dates = cache.get(year);
    if (!dates) {
      dates = new Set([...originHolidays.getHolidays(year), ...destinationHolidays.getHolidays(year)]
        .filter((holiday) => holiday.type === 'public')
        .map((holiday) => holiday.date.slice(0, 10)));
      cache.set(year, dates);
    }
    return dates;
  };
  let day = start;
  let counted = 0;
  while (counted < 4) {
    const weekday = new Date(`${day}T12:00:00Z`).getUTCDay();
    if (weekday !== 0 && weekday !== 6 && !publicHolidays(Number(day.slice(0, 4))).has(day)) counted++;
    if (counted < 4) day = nextDate(day);
  }
  return { start, deadline: day };
}
