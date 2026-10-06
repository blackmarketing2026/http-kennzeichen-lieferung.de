import { CHECKOUT_NOTIFICATION_EMAIL, sendAbandonedCheckoutReminderEmail } from '@/lib/order-emails';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const secret = process.env.CRON_SECRET?.trim();
  const auth = request.headers.get('authorization');
  if (!secret || auth !== `Basic ${Buffer.from(`checkout-reminder:${secret}`).toString('base64')}`) {
    return Response.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const origin = new URL(request.url).origin;
  await sendAbandonedCheckoutReminderEmail({
    email: CHECKOUT_NOTIFICATION_EMAIL,
    firstName: 'Test',
    city: 'Berlin',
    plate: 'B AB 123',
    resumeUrl: `${origin}/checkout?plate=B+AB+123&type=standard&color=black&quantity=2`,
    test: true,
  }, origin);
  return Response.json({ sent: true, to: CHECKOUT_NOTIFICATION_EMAIL });
}
