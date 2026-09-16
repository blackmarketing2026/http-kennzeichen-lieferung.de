'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AddressElement, Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { ArrowLeft, CheckCircle2, LoaderCircle, LockKeyhole } from 'lucide-react';
import { LicensePlate } from '@/components/license-plate';
import { formatPrice, getUnitPrice, PRODUCTS, SHIPPING_PRICE, type PlateColor, type PlateType } from '@/config/products';

type CheckoutSelection = { plate: string; plateType: PlateType; plateColor: PlateColor; quantity: 1 | 2 | 3 };

function PaymentForm({ selection }: { selection: CheckoutSelection }) {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState('');
  const [isPaying, setIsPaying] = useState(false);
  const [message, setMessage] = useState('');
  const [succeeded, setSucceeded] = useState(false);
  const total = getUnitPrice(selection.plateType, selection.plateColor, selection.quantity) * selection.quantity + SHIPPING_PRICE;

  async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!stripe || !elements || isPaying) return;
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

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
      confirmParams: {
        receipt_email: email,
        payment_method_data: { billing_details: { email } },
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
        <div><span>{selection.plate} · {selection.quantity} × {PRODUCTS[selection.plateType].label}</span><strong>{formatPrice(total)}</strong></div>
        <Link className="button" href="/">Zurück zur Startseite</Link>
      </div>
    );
  }

  return (
    <form className="real-payment-form" onSubmit={handleSubmit}>
      <div className="secure-checkout-heading"><div><span>Sicherer Checkout</span><strong>Zahlungs- und Lieferdaten</strong></div><LockKeyhole /></div>
      <label className="checkout-email">E-Mail-Adresse<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required /></label>
      <div className="stripe-element-group"><span>Lieferadresse</span><AddressElement options={{ mode: 'shipping', allowedCountries: ['DE'], defaultValues: { address: { country: 'DE' } } }} /></div>
      <div className="stripe-element-group"><span>Zahlungsart</span><PaymentElement options={{ layout: 'tabs' }} /></div>
      {message && <p className="checkout-error" role="alert">{message}</p>}
      <button className="stripe-pay-button" type="submit" disabled={!stripe || isPaying}>
        {isPaying ? <><LoaderCircle className="spin" /> Zahlung wird verarbeitet</> : <><LockKeyhole /> Jetzt {formatPrice(total)} bezahlen</>}
      </button>
      <p className="stripe-secure"><LockKeyhole /> Verschlüsselte Zahlung direkt über Stripe Elements</p>
    </form>
  );
}

export function EmbeddedCheckout({ selection }: { selection: CheckoutSelection }) {
  const [clientSecret, setClientSecret] = useState('');
  const [publishableKey, setPublishableKey] = useState('');
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
        const data = await response.json() as { error?: string; clientSecret?: string; publishableKey?: string };
        if (!response.ok) throw new Error(data.error ?? 'Checkout konnte nicht geladen werden.');
        if (!data.clientSecret || !data.publishableKey) throw new Error('Stripe hat unvollständige Zahlungsdaten geliefert.');
        setClientSecret(data.clientSecret);
        setPublishableKey(data.publishableKey);
      })
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') setError(requestError.message);
      });
    return () => controller.abort();
  }, [selection.plate, selection.plateType, selection.plateColor, selection.quantity]);

  const stripePromise = useMemo(() => publishableKey ? loadStripe(publishableKey) : null, [publishableKey]);

  return (
    <main className="real-checkout-page">
      <section className="checkout-order-panel">
        <Link className="checkout-back" href="/"><ArrowLeft /> Konfiguration ändern</Link>
        <Link className="checkout-logo" href="/"><Image src="/kennzeichen-lieferung-logo.png" alt="kennzeichen-lieferung.de" width={2172} height={724} priority /></Link>
        <div className="checkout-order-copy"><span>Deine Bestellung</span><h1>Genau dieses<br />Kennzeichen.</h1></div>
        <LicensePlate value={selection.plate} type={selection.plateType} color={selection.plateColor} className="real-checkout-plate" />
        <div className="real-order-line"><div><strong>{selection.quantity} × {product.label}</strong><span>{selection.plate} · {product.size} · {selection.plateColor === 'carbon' ? 'Carbon' : 'Schwarz'}</span></div><strong>{formatPrice(subtotal)}</strong></div>
        <div className="real-order-line"><span>DHL-Versandpaket</span><strong>{formatPrice(SHIPPING_PRICE)}</strong></div>
        <div className="real-order-total"><span>Gesamt</span><strong>{formatPrice(total)}</strong></div>
        <p className="checkout-scope">Du bestellst geprägte Schilder. Reservierung, Zulassung und amtliche Plaketten sind nicht enthalten.</p>
      </section>
      <section className="checkout-payment-panel">
        {error ? (
          <div className="checkout-load-error"><h2>Checkout nicht verfügbar</h2><p>{error}</p><Link className="button" href="/">Zurück zur Konfiguration</Link></div>
        ) : clientSecret && stripePromise ? (
          <Elements stripe={stripePromise} options={{
            clientSecret,
            locale: 'de',
            appearance: { theme: 'stripe', variables: { colorPrimary: '#0069d9', colorText: '#061622', borderRadius: '6px', fontFamily: 'Arial, sans-serif' } },
          }}>
            <PaymentForm selection={selection} />
          </Elements>
        ) : (
          <div className="checkout-loading"><LoaderCircle className="spin" /><strong>Sicherer Checkout wird vorbereitet</strong><span>Der Gesamtbetrag wird serverseitig geprüft.</span></div>
        )}
      </section>
    </main>
  );
}
