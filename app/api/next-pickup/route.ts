import { configuredShippingRegion, configuredShippingState, estimatedDeliveryDate } from '@/lib/delivery-promise';
import { configuredPickupTimes, getPickupCountdown } from '@/lib/pickup-countdown';

export const runtime = 'nodejs';

export async function GET() {
  const state = configuredShippingState();
  const region = configuredShippingRegion(state);
  const times = configuredPickupTimes();
  if (!state || !region || !times) return Response.json({ error: 'Abholort oder Abholzeiten nicht konfiguriert.' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  const now = new Date();
  const next = getPickupCountdown(now, times, state, region);
  return Response.json({ ...next, estimatedDeliveryDate: estimatedDeliveryDate(now, state, region) }, { headers: { 'Cache-Control': 'no-store' } });
}
