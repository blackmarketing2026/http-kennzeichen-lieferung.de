/** Dispatch state and the existing daily pickup schedule. Keep the exact works address private. */
export const SHIPPING_ORIGIN = {
  state: 'NW',
  holidayRegion: 'BASE',
  pickupTimes: [9 * 60, 12 * 60, 16 * 60],
} as const;
