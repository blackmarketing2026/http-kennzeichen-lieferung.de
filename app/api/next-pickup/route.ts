import { configuredShippingRegion, configuredShippingState } from '@/lib/delivery-promise';
import { configuredPickupTimes, getPickupCountdown } from '@/lib/pickup-countdown';

export const runtime = 'nodejs';

export async function GET() {
  const state = configuredShippingState();
  const region = configuredShippingRegion(state);
  const times = configuredPickupTimes();
  if (!state || !region || !times) return Response.json({ error: 'Abholort oder Abholzeiten nicht konfiguriert.' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  const next = getPickupCountdown(new Date(), times, state, region);
  return Response.json(next, { headers: { 'Cache-Control': 'no-store' } });
}
