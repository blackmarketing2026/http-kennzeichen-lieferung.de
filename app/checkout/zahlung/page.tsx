import Link from 'next/link';
import { CheckCircle2, Clock3, CircleAlert } from 'lucide-react';
import Stripe from 'stripe';
import { EvbPartnerBlock } from '@/components/evb-partner-block';
import { PurchaseTracker } from '@/components/purchase-tracker';
import type { PurchaseEvent } from '@/lib/purchase-event';

export const runtime = 'nodejs';

export default async function PaymentReturnPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const paymentIntentId = typeof params.payment_intent === 'string' ? params.payment_intent : '';
  const clientSecret = typeof params.payment_intent_client_secret === 'string' ? params.payment_intent_client_secret : '';
  const secretKey = process.env.stripe_live?.trim();
  let status: Stripe.PaymentIntent.Status | null = null;
  let isHerbstOrder = false;
  let purchase: PurchaseEvent | null = null;

  if (paymentIntentId.startsWith('pi_') && clientSecret.startsWith(`${paymentIntentId}_secret_`) && secretKey?.startsWith('sk_')) {
    try {
      const intent = await new Stripe(secretKey).paymentIntents.retrieve(paymentIntentId);
      if (intent.client_secret === clientSecret) {
        status = intent.status;
        isHerbstOrder = intent.metadata.offer === 'herbst';
        if (intent.status === 'succeeded' && intent.amount_received > 0) {
          purchase = {
            transactionId: intent.id,
            valueCents: intent.amount_received,
            currency: intent.currency,
            shippingCents: Number(intent.metadata.shipping_cents || 0),
            itemId: intent.metadata.plate_type || intent.metadata.kennzeichenart || 'kennzeichen',
            itemName: intent.metadata.kennzeichenart || 'Kennzeichen',
            quantity: Number(intent.metadata.anzahl || 1),
          };
        }
      }
    } catch {
      // Keep the generic message if Stripe cannot verify the return parameters.
    }
  }

  const succeeded = status === 'succeeded';
  const processing = status === 'processing';
  const Icon = succeeded ? CheckCircle2 : processing ? Clock3 : CircleAlert;

  return (
    <main className={`payment-return-page ${succeeded ? 'is-success' : processing ? 'is-processing' : 'is-unconfirmed'}`}>
      {purchase && <PurchaseTracker purchase={purchase} />}
      <section className="real-payment-success">
        <span><Icon aria-hidden="true" /></span>
        <p>{succeeded ? 'ZAHLUNG ERFOLGREICH' : processing ? 'ZAHLUNG WIRD VERARBEITET' : 'ZAHLUNGSSTATUS OFFEN'}</p>
        <h1>{succeeded ? 'Bestellung eingegangen.' : processing ? 'Deine Zahlung wird geprüft.' : 'Zahlung nicht bestätigt.'}</h1>
        <p>
          {succeeded
            ? 'Deine Zahlung wurde bestätigt. Du erhältst die Bestellbestätigung per E-Mail.'
            : processing
              ? 'Sobald die Zahlung bestätigt ist, erhältst du deine Bestellbestätigung per E-Mail.'
              : 'Wir konnten die Zahlung nicht bestätigen. Bitte prüfe die Zahlungsart oder beginne die Bestellung erneut.'}
        </p>
        <Link className="button" href="/">Zur Startseite</Link>
        {succeeded && isHerbstOrder && <EvbPartnerBlock />}
      </section>
    </main>
  );
}
