const BERLIN_TIME_ZONE = 'Europe/Berlin';
const PICKUP_HOURS = [9, 12, 16] as const;
const PRODUCTION_TIME_MS = 10 * 60 * 1000;

type BerlinDateParts = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
};

export type PickupCountdown = {
  dayLabel: 'Heute' | 'Morgen';
  pickupTime: string;
  remaining: string;
};

const berlinDateFormatter = new Intl.DateTimeFormat('en-CA', {
  timeZone: BERLIN_TIME_ZONE,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hourCycle: 'h23',
});

function getBerlinDateParts(date: Date): BerlinDateParts {
  const parts = Object.fromEntries(
    berlinDateFormatter
      .formatToParts(date)
      .filter(({ type }) => type !== 'literal')
      .map(({ type, value }) => [type, Number(value)]),
  );

  return {
    year: parts.year,
    month: parts.month,
    day: parts.day,
    hour: parts.hour,
    minute: parts.minute,
    second: parts.second,
  };
}

function berlinWallTimeToDate(parts: BerlinDateParts): Date {
  const desiredWallTime = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second);
  let timestamp = desiredWallTime;

  for (let attempt = 0; attempt < 3; attempt += 1) {
    const observed = getBerlinDateParts(new Date(timestamp));
    const observedWallTime = Date.UTC(observed.year, observed.month - 1, observed.day, observed.hour, observed.minute, observed.second);
    timestamp += desiredWallTime - observedWallTime;
  }

  return new Date(timestamp);
}

function createPickupDate(nowParts: BerlinDateParts, hour: number, dayOffset = 0) {
  const calendarDate = new Date(Date.UTC(nowParts.year, nowParts.month - 1, nowParts.day + dayOffset));

  return berlinWallTimeToDate({
    year: calendarDate.getUTCFullYear(),
    month: calendarDate.getUTCMonth() + 1,
    day: calendarDate.getUTCDate(),
    hour,
    minute: 0,
    second: 0,
  });
}

export function getPickupCountdown(now: Date): PickupCountdown {
  const berlinNow = getBerlinDateParts(now);
  const todayPickups = PICKUP_HOURS.map((hour) => ({ hour, dayOffset: 0, date: createPickupDate(berlinNow, hour) }));
  const nextPickup = todayPickups.find(({ date }) => date.getTime() - now.getTime() >= PRODUCTION_TIME_MS)
    ?? { hour: PICKUP_HOURS[0], dayOffset: 1, date: createPickupDate(berlinNow, PICKUP_HOURS[0], 1) };
  const remainingSeconds = Math.max(0, Math.floor((nextPickup.date.getTime() - now.getTime()) / 1000));
  const hours = Math.floor(remainingSeconds / 3600);
  const minutes = Math.floor((remainingSeconds % 3600) / 60);
  const seconds = remainingSeconds % 60;

  return {
    dayLabel: nextPickup.dayOffset === 0 ? 'Heute' : 'Morgen',
    pickupTime: `${String(nextPickup.hour).padStart(2, '0')}:00 Uhr`,
    remaining: [hours, minutes, seconds].map((value) => String(value).padStart(2, '0')).join(':'),
  };
}
