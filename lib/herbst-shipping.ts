import { HERBST_SHIPPING_CUTOFF_TIME } from '@/lib/config';
import Holidays from 'date-holidays';
import { SHIPPING_ORIGIN } from '@/config/shipping-origin';

export function showHerbstSameDayShipping(now: Date): boolean {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Berlin', year: 'numeric', month: '2-digit', day: '2-digit',
    weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(now);
  const weekday = parts.find((part) => part.type === 'weekday')?.value;
  const hour = Number(parts.find((part) => part.type === 'hour')?.value);
  const minute = Number(parts.find((part) => part.type === 'minute')?.value);
  const [cutoffHour, cutoffMinute] = HERBST_SHIPPING_CUTOFF_TIME.split(':').map(Number);
  const date = ['year', 'month', 'day'].map((type) => parts.find((part) => part.type === type)?.value).join('-');
  const holidays = new Holidays('DE', SHIPPING_ORIGIN.state);
  const publicHoliday = holidays.getHolidays(Number(date.slice(0, 4)))
    .some((holiday) => holiday.type === 'public' && holiday.date.slice(0, 10) === date);
  return weekday !== 'Sat' && weekday !== 'Sun' && !publicHoliday &&
    hour * 60 + minute < cutoffHour * 60 + cutoffMinute;
}
