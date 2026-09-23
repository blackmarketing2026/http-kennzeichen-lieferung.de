'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AddressElement, Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { ArrowLeft, CheckCircle2, LoaderCircle, LockKeyhole } from 'lucide-react';
import { PaymentLogos } from '@/components/payment-logos';
import { ShippingNotice } from '@/components/shipping-notice';
import { LicensePlate } from '@/components/license-plate';
import { formatPrice, getUnitPrice, PRODUCTS, SHIPPING_PRICE, type PlateColor, type PlateType } from '@/config/products';
import type { CheckoutPricing } from '@/lib/checkout-pricing';
import { WithdrawalNotice } from '@/components/withdrawal-notice';

type CheckoutSelection = { plate: string; plateType: PlateType; plateColor: PlateColor; quantity: 1 | 2 | 3 };
type PaymentIntentResponse = { error?: string; clientSecret?: string; paymentIntentId?: string; publishableKey?: string; pricing?: CheckoutPricing };

function PaymentForm({ selection, pricing, onApplyPromo }: {
  selection: CheckoutSelection;
  pricing: CheckoutPricing;
  onApplyPromo: (code: string) => Promise<CheckoutPricing>;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState('');
  const [isPaying, setIsPaying] = useState(false);
  const [message, setMessage] = useState('');
  const [succeeded, setSucceeded] = useState(false);
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState('');
  const [promoError, setPromoError] = useState(false);
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const [promoReady, setPromoReady] = useState(true);

  async function applyPromo(code: string) {
    if (!elements || isApplyingPromo || isPaying) return;
    setIsApplyingPromo(true);
    setPromoMessage('');
    setPromoError(false);
    let intentUpdated = false;
    try {
      const updatedPricing = await onApplyPromo(code);
      intentUpdated = true;
      const update = await elements.fetchUpdates();
      if (update.error) throw new Error(update.error.message);
      setPromoInput(updatedPricing.promoCode ?? '');
      setPromoReady(true);
      setPromoMessage(updatedPricing.promoCode ? 'Rabattcode angewendet.' : 'Rabattcode entfernt.');
    } catch (error) {
      const status = error instanceof Error && 'status' in error ? Number(error.status) : 0;
      if (intentUpdated || status !== 400) setPromoReady(false);
      setPromoError(true);
      setPromoMessage(error instanceof Error ? error.message : 'Rabattcode konnte nicht geprüft werden.');
    } finally {
      setIsApplyingPromo(false);
    }
  }

  async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!stripe || !elements || isPaying || isApplyingPromo || !promoReady) return;
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setMessage('Bitte gib eine gültige E-Mail-Adresse ein.');
      return;
    }

    setIsPaying(true);
    setMessage('');
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setMessage(submitError.message ?? 'Bitte prüfe deine Angaben.');
      setIsPaying(false);
      return;
    }

    const addressElement = elements.getElement(AddressElement);
    const addressValue = await addressElement?.getValue();
    if (!addressValue?.complete) {
      setMessage('Bitte prüfe deine Lieferadresse.');
      setIsPaying(false);
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
      confirmParams: {
        receipt_email: email,
        payment_method_data: { billing_details: { email } },
        shipping: {
          name: addressValue.value.name,
          phone: addressValue.value.phone || undefined,
          address: { ...addressValue.value.address, line2: addressValue.value.address.line2 || undefined },
        },
      },
    });

    if (error) {
      setMessage(error.message ?? 'Die Zahlung konnte nicht abgeschlossen werden.');
      setIsPaying(false);
      return;
    }

    if (paymentIntent?.status === 'succeeded') {
      setSucceeded(true);
    } else if (paymentIntent?.status === 'processing') {
      setMessage('Die Zahlung wird verarbeitet. Den endgültigen Status siehst du in Kürze in deiner Bestätigung.');
    } else {
      setMessage('Die Zahlung wurde noch nicht abgeschlossen. Bitte versuche es erneut.');
    }
    setIsPaying(false);
  }

  if (succeeded) {
    return (
      <div className="real-payment-success">
        <span><CheckCircle2 /></span>
        <p>ZAHLUNG ERFOLGREICH</p>
        <h2>Bestellung eingegangen.</h2>
        <p>Deine Zahlung wurde bestätigt. Die Bestellung ist in Stripe mit deiner Kennzeichenkombination hinterlegt.</p>
        <ShippingNotice />
        <div><span>{selection.plate} · {selection.quantity} × {PRODUCTS[selection.plateType].label}</span><strong>{formatPrice(pricing.totalCents / 100)}</strong></div>
        <Link className="button" href="/">Zurück zur Startseite</Link>
      </div>
    );
  }

  return (
    <form className="real-payment-form" onSubmit={handleSubmit}>
      <div className="secure-checkout-heading"><div><span>Sicherer Checkout</span><strong>Zahlungs- und Lieferdaten</strong></div><LockKeyhole /></div>
      <p className="checkout-account-hint">Du bestellst als Gast – kein Konto nötig. Schon Kunde? <Link href="/konto/login">Melde dich an</Link>, um Bestellungen und Rechnungen später einzusehen.</p>
      <div className="checkout-promo">
        <label htmlFor="checkout-promo-code">Rabattcode</label>
        <div className="checkout-promo-row">
          <input id="checkout-promo-code" type="text" value={promoInput} onChange={(event) => setPromoInput(event.target.value)} placeholder="Code eingeben" autoComplete="off" maxLength={64} />
          <button type="button" onClick={() => applyPromo(promoInput)} disabled={!promoInput.trim() || isApplyingPromo || isPaying}>{isApplyingPromo ? 'Prüfe …' : 'Einlösen'}</button>
        </div>
        {pricing.promoCode && <button className="checkout-promo-remove" type="button" onClick={() => applyPromo('')} disabled={isApplyingPromo || isPaying}>Rabattcode entfernen</button>}
        {promoMessage && <output className={promoError ? 'checkout-promo-message is-error' : 'checkout-promo-message'}>{promoMessage}</output>}
      </div>
      <label className="checkout-email">E-Mail-Adresse<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required /></label>
      <div className="stripe-element-group"><span>Lieferadresse</span><AddressElement options={{ mode: 'shipping', allowedCountries: ['DE'], fields: { phone: 'auto' }, defaultValues: { address: { country: 'DE' } } }} /></div>
      <div className="stripe-element-group"><span>Zahlungsart</span><PaymentElement options={{ layout: 'tabs' }} /></div>
      {message && <p className="checkout-error" role="alert">{message}</p>}
      <WithdrawalNotice />
      <button className="stripe-pay-button" type="submit" disabled={!stripe || isPaying || isApplyingPromo || !promoReady}>
        {isPaying ? <><LoaderCircle className="spin" /> Zahlung wird verarbeitet</> : <><LockKeyhole /> Jetzt {formatPrice(pricing.totalCents / 100)} bezahlen</>}
      </button>
      <PaymentLogos />
      <p className="stripe-secure"><LockKeyhole /> Verschlüsselte Zahlung direkt über Stripe Elements</p>
    </form>
  );
}

export function EmbeddedCheckout({ selection }: { selection: CheckoutSelection }) {
  const [clientSecret, setClientSecret] = useState('');
  const [paymentIntentId, setPaymentIntentId] = useState('');
  const [publishableKey, setPublishableKey] = useState('');
  const [pricing, setPricing] = useState<CheckoutPricing | null>(null);
  const [error, setError] = useState('');
  const cartId = useRef<string | null>(null);
  const product = PRODUCTS[selection.plateType];
  const subtotal = getUnitPrice(selection.plateType, selection.plateColor, selection.quantity) * selection.quantity;
  const total = subtotal + SHIPPING_PRICE;

  useEffect(() => {
    const controller = new AbortController();
    cartId.current ??= crypto.randomUUID();
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plate: selection.plate, plateType: selection.plateType, color: selection.plateColor, quantity: selection.quantity, cartId: cartId.current }),
      signal: controller.signal,
    })
      .then(async (response) => {
        const data = await response.json() as PaymentIntentResponse;
        if (!response.ok) throw new Error(data.error ?? 'Checkout konnte nicht geladen werden.');
        if (!data.clientSecret || !data.paymentIntentId || !data.publishableKey || !data.pricing) throw new Error('Stripe hat unvollständige Zahlungsdaten geliefert.');
        setClientSecret(data.clientSecret);
        setPaymentIntentId(data.paymentIntentId);
        setPublishableKey(data.publishableKey);
        setPricing(data.pricing);
      })
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') setError(requestError.message);
      });
    return () => controller.abort();
  }, [selection.plate, selection.plateType, selection.plateColor, selection.quantity]);

  async function applyPromoCode(code: string): Promise<CheckoutPricing> {
    if (!cartId.current || !paymentIntentId) throw new Error('Checkout ist noch nicht bereit.');
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        plate: selection.plate,
        plateType: selection.plateType,
        color: selection.plateColor,
        quantity: selection.quantity,
        cartId: cartId.current,
        paymentIntentId,
        promoCode: code,
      }),
    });
    const data = await response.json() as PaymentIntentResponse;
    if (!response.ok) {
      const requestError = new Error(data.error ?? 'Rabattcode konnte nicht geprüft werden.') as Error & { status: number };
      requestError.status = response.status;
      throw requestError;
    }
    if (!data.pricing || data.paymentIntentId !== paymentIntentId || data.clientSecret !== clientSecret) {
      throw new Error('Zahlungsdaten konnten nicht aktualisiert werden.');
    }
    setPricing(data.pricing);
    return data.pricing;
  }

  const stripePromise = useMemo(() => publishableKey ? loadStripe(publishableKey) : null, [publishableKey]);

  return (
    <main className="real-checkout-page">
      <section className="checkout-order-panel">
        <Link className="checkout-back" href="/"><ArrowLeft /> Konfiguration ändern</Link>
        <Link className="checkout-logo" href="/"><Image src="/kennzeichen-lieferung-logo.png" alt="kennzeichen-lieferung.de" width={2172} height={724} priority /></Link>
        <div className="checkout-order-copy"><span>Deine Bestellung</span><h1>Genau dieses<br />Kennzeichen.</h1></div>
        <LicensePlate value={selection.plate} type={selection.plateType} color={selection.plateColor} className="real-checkout-plate" />
        <div className="real-order-line"><div><strong>{selection.quantity} × {product.label}</strong><span>{selection.plate} · {product.size} · Schwarz</span></div><strong>{formatPrice((pricing?.subtotalCents ?? Math.round(subtotal * 100)) / 100)}</strong></div>
        <div className="real-order-line"><span>DHL-Versand</span><strong>Inklusive</strong></div>
        {pricing && pricing.discountCents > 0 && <div className="real-order-line real-order-discount"><span>Rabatt ({pricing.promoCode})</span><strong>−{formatPrice(pricing.discountCents / 100)}</strong></div>}
        <div className="real-order-total"><span>Gesamt</span><strong>{formatPrice(pricing ? pricing.totalCents / 100 : total)}</strong></div>
        <p className="checkout-scope">Du bestellst geprägte Schilder. Reservierung, Zulassung und amtliche Plaketten sind nicht enthalten.</p>
      </section>
      <section className="checkout-payment-panel">
        {error ? (
          <div className="checkout-load-error"><h2>Checkout nicht verfügbar</h2><p>{error}</p><Link className="button" href="/">Zurück zur Konfiguration</Link></div>
        ) : clientSecret && stripePromise && pricing ? (
          <Elements stripe={stripePromise} options={{
            clientSecret,
            locale: 'de',
            appearance: { theme: 'stripe', variables: { colorPrimary: '#0069d9', colorText: '#061622', borderRadius: '6px', fontFamily: 'Arial, sans-serif' } },
          }}>
            <PaymentForm selection={selection} pricing={pricing} onApplyPromo={applyPromoCode} />
          </Elements>
        ) : (
          <div className="checkout-loading"><LoaderCircle className="spin" /><strong>Sicherer Checkout wird vorbereitet</strong><span>Der Gesamtbetrag wird serverseitig geprüft.</span></div>
        )}
      </section>
    </main>
  );
}
