'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { preconnect } from 'react-dom';
import Image from 'next/image';
import Link from 'next/link';
import {
  AddressElement,
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import {
  ArrowLeft,
  CheckCircle2,
  LoaderCircle,
  LockKeyhole,
} from 'lucide-react';
import { PaymentLogos } from '@/components/payment-logos';
import { ShippingNotice } from '@/components/shipping-notice';
import { DeliveryGuarantee } from '@/components/delivery-guarantee';
import { GERMAN_STATES, HOLIDAY_REGIONS, type GermanState } from '@/lib/delivery-promise';
import { LicensePlate } from '@/components/license-plate';
import { CHECKOUT_UPSELLS_ENABLED } from '@/config/checkout-features';
import {
  BIKE_RACK_PLATE_PRICE,
  formatPrice,
  getPackagePrice,
  isAgriculturePlate,
  isSinglePlateProduct,
  PARKING_PLATE_PRICE,
  plateColorLabel,
  PRODUCTS,
  SHIPPING_PRICE,
  type PlateColor,
  type PlateType,
} from '@/config/products';
import type { CheckoutExtras, CheckoutPricing } from '@/lib/checkout-pricing';
import { ShippingCountdown } from '@/components/shipping-countdown';
import { ComplianceNotice } from '@/components/compliance-notice';
import {
  ExtrasUpsellPopup,
  type UpsellKind,
} from '@/components/parking-upsell';
import { readAttribution } from '@/lib/attribution';
import styles from './checkout-extras.module.css';

type CheckoutSelection = {
  plate: string;
  plateType: PlateType;
  plateColor: PlateColor;
  quantity: 1 | 2 | 3;
};
type ActiveSelection = Omit<CheckoutSelection, 'quantity'> & {
  quantity: number;
};
type PaymentIntentResponse = {
  error?: string;
  clientSecret?: string;
  paymentIntentId?: string;
  publishableKey?: string;
  pricing?: CheckoutPricing;
};

type PurchaseWindow = Window & {
  dataLayer?: unknown[];
  kl_transaction_id?: string;
  kl_value?: number;
  kl_currency?: string;
};

/** Exposes the completed purchase for Google tag: flat globals for the "Extract data from your
 * page" rules (JavaScript variable kl_transaction_id / kl_value / kl_currency) plus a GA4
 * `purchase` dataLayer event for GTM. Nothing is sent anywhere unless GTM was consented to. */
function trackPurchase(
  transactionId: string,
  pricing: CheckoutPricing,
  selection: ActiveSelection,
) {
  const w = window as PurchaseWindow;
  const value = pricing.totalCents / 100;
  w.kl_transaction_id = transactionId;
  w.kl_value = value;
  w.kl_currency = 'EUR';
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ ecommerce: null });
  w.dataLayer.push({
    event: 'purchase',
    ecommerce: {
      transaction_id: transactionId,
      value,
      currency: 'EUR',
      shipping: pricing.shippingCents / 100,
      items: [
        {
          item_id: selection.plateType,
          item_name: PRODUCTS[selection.plateType].label,
          quantity: selection.quantity,
        },
      ],
    },
  });
}

function PaymentForm({
  selection,
  extras,
  pricing,
  getCartId,
  paymentIntentId,
  onApplyPromo,
  onChangeExtra,
}: {
  selection: ActiveSelection;
  extras: CheckoutExtras;
  pricing: CheckoutPricing;
  getCartId: () => string;
  paymentIntentId: string;
  onApplyPromo: (code: string) => Promise<CheckoutPricing>;
  onChangeExtra: (extras: CheckoutExtras) => Promise<CheckoutPricing>;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState('');
  const [deliveryState, setDeliveryState] = useState<GermanState | ''>('');
  const [holidayRegion, setHolidayRegion] = useState('');
  const [isPaying, setIsPaying] = useState(false);
  const [message, setMessage] = useState('');
  const [succeeded, setSucceeded] = useState(false);
  const [promoInput, setPromoInput] = useState(pricing.promoCode ?? '');
  const [promoMessage, setPromoMessage] = useState(
    pricing.promoCode ? 'Händlercode angewendet.' : '',
  );
  const [promoError, setPromoError] = useState(false);
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const [promoReady, setPromoReady] = useState(true);
  const [isUpdatingExtra, setIsUpdatingExtra] = useState(false);
  const changingExtra = useRef(false);

  async function changeExtra(kind: UpsellKind, selected: boolean) {
    if (!elements || isPaying || isApplyingPromo || changingExtra.current)
      return false;
    changingExtra.current = true;
    setIsUpdatingExtra(true);
    setMessage('');
    try {
      await onChangeExtra({
        ...extras,
        [kind === 'parking' ? 'parkingPlate' : 'bikeRackPlate']: selected,
      });
      const update = await elements.fetchUpdates();
      if (update.error) throw new Error(update.error.message);
      setPromoReady(true);
      return true;
    } catch (error) {
      // A request may have reached Stripe even if its response was lost. Block
      // payment until a subsequent successful update synchronizes the amount.
      setPromoReady(false);
      setMessage(
        error instanceof Error
          ? error.message
          : 'Die Bestellung konnte nicht aktualisiert werden.',
      );
      return false;
    } finally {
      changingExtra.current = false;
      setIsUpdatingExtra(false);
    }
  }

  async function applyPromo(code: string) {
    if (!elements || isApplyingPromo || isPaying || changingExtra.current)
      return;
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
      setPromoMessage(
        updatedPricing.promoCode
          ? 'Rabattcode angewendet.'
          : 'Rabattcode entfernt.',
      );
    } catch (error) {
      const status =
        error instanceof Error && 'status' in error ? Number(error.status) : 0;
      if (intentUpdated || status !== 400) setPromoReady(false);
      setPromoError(true);
      setPromoMessage(
        error instanceof Error
          ? error.message
          : 'Rabattcode konnte nicht geprüft werden.',
      );
    } finally {
      setIsApplyingPromo(false);
    }
  }

  async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    if (
      !stripe ||
      !elements ||
      isPaying ||
      isApplyingPromo ||
      changingExtra.current ||
      !promoReady
    )
      return;
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
    if (!deliveryState) {
      setMessage('Bitte wähle das Bundesland deiner Lieferadresse.');
      setIsPaying(false);
      return;
    }
    const region = HOLIDAY_REGIONS[deliveryState] ? holidayRegion : 'BASE';
    if (!region) {
      setMessage('Bitte wähle die Feiertagsregion deiner Lieferadresse.');
      setIsPaying(false);
      return;
    }
    try {
      const saved = await fetch('/api/checkout-delivery-region', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartId: getCartId(), paymentIntentId, deliveryState, region }),
      });
      if (!saved.ok) throw new Error('Die Lieferregion konnte nicht gespeichert werden. Bitte versuche es erneut.');
    } catch (cause) {
      setMessage(cause instanceof Error ? cause.message : 'Die Lieferregion konnte nicht gespeichert werden.');
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
          address: {
            ...addressValue.value.address,
            state: deliveryState,
            line2: addressValue.value.address.line2 || undefined,
          },
        },
      },
    });

    if (error) {
      setMessage(
        error.message ?? 'Die Zahlung konnte nicht abgeschlossen werden.',
      );
      setIsPaying(false);
      return;
    }

    if (paymentIntent?.status === 'succeeded') {
      trackPurchase(paymentIntent.id, pricing, selection);
      setSucceeded(true);
    } else if (paymentIntent?.status === 'processing') {
      setMessage(
        'Die Zahlung wird verarbeitet. Den endgültigen Status siehst du in Kürze in deiner Bestätigung.',
      );
    } else {
      setMessage(
        'Die Zahlung wurde noch nicht abgeschlossen. Bitte versuche es erneut.',
      );
    }
    setIsPaying(false);
  }

  if (succeeded) {
    return (
      <div className="real-payment-success">
        <span>
          <CheckCircle2 />
        </span>
        <p>ZAHLUNG ERFOLGREICH</p>
        <h2>Bestellung eingegangen.</h2>
        <p>
          Deine Zahlung wurde bestätigt. Die Bestellung ist in Stripe mit deiner
          Kennzeichenkombination hinterlegt.
        </p>
        <ShippingNotice />
        <div>
          <span>
            {selection.plate} · {selection.quantity} ×{' '}
            {PRODUCTS[selection.plateType].label}
          </span>
          <strong>{formatPrice(pricing.totalCents / 100)}</strong>
        </div>
        <Link className="button" href="/">
          Zurück zur Startseite
        </Link>
      </div>
    );
  }

  return (
    <form className="real-payment-form" onSubmit={handleSubmit}>
      <section className="checkout-flow-step">
        <div className="checkout-step-heading">
          <span>Schritt 3 von 5</span>
          <h2>Adresse</h2>
          <p>Wohin dürfen wir deine Kennzeichen schicken?</p>
        </div>
      <label className="checkout-email">
        E-Mail-Adresse
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          required
        />
      </label>
      <div className="stripe-element-group">
        <span>Lieferadresse</span>
        <AddressElement
          options={{
            mode: 'shipping',
            allowedCountries: ['DE'],
            fields: { phone: 'auto' },
            defaultValues: { address: { country: 'DE' } },
          }}
        />
      </div>
      <label className="checkout-email">Bundesland der Lieferadresse
        <select value={deliveryState} onChange={(event) => { setDeliveryState(event.target.value as GermanState | ''); setHolidayRegion(''); }} required>
          <option value="">Bitte auswählen</option>
          {Object.entries(GERMAN_STATES).map(([code, name]) => <option key={code} value={code}>{name}</option>)}
        </select>
      </label>
      {deliveryState && HOLIDAY_REGIONS[deliveryState] && <label className="checkout-email">Feiertagsregion der Lieferadresse
        <select value={holidayRegion} onChange={(event) => setHolidayRegion(event.target.value)} required>
          <option value="">Bitte auswählen</option>
          {Object.entries(HOLIDAY_REGIONS[deliveryState]).map(([code, name]) => <option key={code} value={code}>{name}</option>)}
        </select>
      </label>}
      </section>
      <section className="checkout-flow-step">
        <div className="checkout-step-heading">
          <span>Schritt 4 von 5</span>
          <h2>Zahlung &amp; Details</h2>
          <p>Wähle deine Zahlungsart und löse bei Bedarf einen Rabattcode ein.</p>
        </div>
      <div className="stripe-element-group">
        <span>Zahlungsart</span>
        <PaymentElement options={{ layout: 'tabs' }} />
      </div>
      <aside className={styles.paymentNotice} aria-label="Hinweis zu Zahlung und Fertigung">
        <strong>Warum kein PayPal?</strong>
        <p>
          Wir bieten PayPal nicht an, weil unser Bestellablauf auf den
          garantierten Kennzeichendruck innerhalb von 10 Minuten ausgelegt ist.
          Dein Kennzeichen ist innerhalb von 10 Minuten nach der Bestellung
          geprägt und versandfertig – außer an Sonn- und Feiertagen. Dadurch
          ist eine schnellere Zustellung als bei herkömmlicher Abwicklung
          möglich; die tatsächliche Lieferzeit hängt von DHL ab.
        </p>
      </aside>
      <p className="checkout-account-hint">
        Du bestellst als Gast – kein Konto nötig. Schon Kunde?{' '}
        <Link href="/konto/login">Melde dich an</Link>, um Bestellungen und
        Rechnungen später einzusehen.
      </p>
      {CHECKOUT_UPSELLS_ENABLED && !isSinglePlateProduct(selection.plateType) && (
        <section className={styles.optionalExtras} aria-label="Zusatzkennzeichen">
          <div>
            <strong>Zusatzkennzeichen (optional)</strong>
            <p>Für Parkplatz oder Fahrradträger. Nur hinzufügen, wenn du ein weiteres Schild brauchst.</p>
          </div>
          <ExtrasUpsellPopup
            plate={selection.plate}
            plateType={selection.plateType}
            plateColor={selection.plateColor}
            priceCents={Math.round(PARKING_PLATE_PRICE * 100)}
            selected={{
              parking: extras.parkingPlate,
              bikeRack: extras.bikeRackPlate,
            }}
            busy={isUpdatingExtra}
            disabled={!stripe || !elements || isPaying || isApplyingPromo}
            onChange={changeExtra}
          />
        </section>
      )}
      <div className="checkout-promo">
        <label htmlFor="checkout-promo-code">Rabattcode</label>
        <div className="checkout-promo-row">
          <input
            id="checkout-promo-code"
            type="text"
            value={promoInput}
            onChange={(event) => setPromoInput(event.target.value)}
            placeholder="Code eingeben"
            autoComplete="off"
            maxLength={64}
          />
          <button
            type="button"
            onClick={() => applyPromo(promoInput)}
            disabled={
              !promoInput.trim() ||
              isApplyingPromo ||
              isPaying ||
              isUpdatingExtra
            }
          >
            {isApplyingPromo ? 'Prüfe …' : 'Einlösen'}
          </button>
        </div>
        {pricing.promoCode && (
          <button
            className="checkout-promo-remove"
            type="button"
            onClick={() => applyPromo('')}
            disabled={isApplyingPromo || isPaying || isUpdatingExtra}
          >
            Rabattcode entfernen
          </button>
        )}
        {promoMessage && (
          <output
            className={
              promoError
                ? 'checkout-promo-message is-error'
                : 'checkout-promo-message'
            }
          >
            {promoMessage}
          </output>
        )}
      </div>
      </section>
      <section className="checkout-flow-step checkout-final-step">
        <div className="checkout-step-heading">
          <span>Schritt 5 von 5</span>
          <h2>Prüfen &amp; bezahlen</h2>
        </div>
      {message && (
        <p className="checkout-error" role="alert">
          {message}
        </p>
      )}
      <ShippingCountdown />
      <div className="checkout-final-total">
        <span>Gesamtbetrag inkl. DHL-Versand</span>
        <strong>{formatPrice(pricing.totalCents / 100)}</strong>
      </div>
      <button
        className="stripe-pay-button"
        type="submit"
        disabled={
          !stripe ||
          isPaying ||
          isApplyingPromo ||
          isUpdatingExtra ||
          !promoReady
        }
      >
        {isPaying ? (
          <>
            <LoaderCircle className="spin" /> Zahlung wird verarbeitet
          </>
        ) : (
          <>
            <LockKeyhole /> Jetzt {formatPrice(pricing.totalCents / 100)}{' '}
            bezahlen
          </>
        )}
      </button>
      <PaymentLogos />
      <p className="stripe-secure">
        <LockKeyhole /> Verschlüsselte Zahlung direkt über Stripe Elements
      </p>
      </section>
    </form>
  );
}

export function EmbeddedCheckout({
  selection: initialSelection,
  initialPromoCode = '',
  returnPath,
}: {
  selection: CheckoutSelection;
  initialPromoCode?: string;
  returnPath?: string;
}) {
  preconnect('https://js.stripe.com', { crossOrigin: 'anonymous' });
  const baseQuantity = (
    isSinglePlateProduct(initialSelection.plateType) ? 1 : 2
  ) as 1 | 2;
  const [extras, setExtras] = useState<CheckoutExtras>({
    parkingPlate: initialSelection.quantity === 3,
    bikeRackPlate: false,
  });
  const quantity =
    baseQuantity + Number(extras.parkingPlate) + Number(extras.bikeRackPlate);
  const selection: ActiveSelection = { ...initialSelection, quantity };
  const [clientSecret, setClientSecret] = useState('');
  const [paymentIntentId, setPaymentIntentId] = useState('');
  const [publishableKey, setPublishableKey] = useState('');
  const [pricing, setPricing] = useState<CheckoutPricing | null>(null);
  const [error, setError] = useState('');
  const [requestAttempt, setRequestAttempt] = useState(0);
  const cartId = useRef<string | null>(null);
  const product = PRODUCTS[selection.plateType];
  const subtotal =
    getPackagePrice(selection.plateType, selection.plateColor, baseQuantity) +
    (extras.parkingPlate ? PARKING_PLATE_PRICE : 0) +
    (extras.bikeRackPlate ? BIKE_RACK_PLATE_PRICE : 0);
  const total = subtotal + SHIPPING_PRICE;

  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    let timedOut = false;
    const timeout = window.setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, 20000);
    cartId.current ??= crypto.randomUUID();
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        plate: initialSelection.plate,
        plateType: initialSelection.plateType,
        color: initialSelection.plateColor,
        quantity: baseQuantity,
        parkingPlate: initialSelection.quantity === 3,
        bikeRackPlate: false,
        cartId: cartId.current,
        promoCode: initialPromoCode || undefined,
        attribution: readAttribution(),
      }),
      signal: controller.signal,
    })
      .then(async (response) => {
        const data = (await response.json()) as PaymentIntentResponse;
        if (!response.ok)
          throw new Error(
            data.error ?? 'Checkout konnte nicht geladen werden.',
          );
        if (
          !data.clientSecret ||
          !data.paymentIntentId ||
          !data.publishableKey ||
          !data.pricing
        )
          throw new Error('Stripe hat unvollständige Zahlungsdaten geliefert.');
        setClientSecret(data.clientSecret);
        setPaymentIntentId(data.paymentIntentId);
        setPublishableKey(data.publishableKey);
        setPricing(data.pricing);
      })
      .catch((requestError) => {
        if (!active) return;
        if (timedOut) {
          setError('Die Verbindung dauert zu lange. Bitte versuche es erneut.');
        } else if (requestError.name !== 'AbortError') {
          setError(requestError.message);
        }
      })
      .finally(() => window.clearTimeout(timeout));
    return () => {
      active = false;
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [
    baseQuantity,
    initialSelection.plate,
    initialSelection.plateType,
    initialSelection.plateColor,
    initialSelection.quantity,
    initialPromoCode,
    requestAttempt,
  ]);

  async function updateCheckout(
    code: string,
    nextExtras = extras,
  ): Promise<CheckoutPricing> {
    if (!cartId.current || !paymentIntentId)
      throw new Error('Checkout ist noch nicht bereit.');
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        plate: selection.plate,
        plateType: selection.plateType,
        color: selection.plateColor,
        quantity: baseQuantity,
        parkingPlate: nextExtras.parkingPlate,
        bikeRackPlate: nextExtras.bikeRackPlate,
        cartId: cartId.current,
        paymentIntentId,
        promoCode: code,
      }),
    });
    const data = (await response.json()) as PaymentIntentResponse;
    if (!response.ok) {
      const requestError = new Error(
        data.error ?? 'Rabattcode konnte nicht geprüft werden.',
      ) as Error & { status: number };
      requestError.status = response.status;
      throw requestError;
    }
    if (
      !data.pricing ||
      data.paymentIntentId !== paymentIntentId ||
      data.clientSecret !== clientSecret
    ) {
      throw new Error('Zahlungsdaten konnten nicht aktualisiert werden.');
    }
    setPricing(data.pricing);
    setExtras(nextExtras);
    return data.pricing;
  }

  const stripePromise = useMemo(
    () => (publishableKey ? loadStripe(publishableKey) : null),
    [publishableKey],
  );
  const backHref =
    returnPath ??
    (isAgriculturePlate(selection.plateType)
      ? '/landmaschinen-kennzeichen#konfigurator'
      : '/#konfigurator');

  return (
    <main className="real-checkout-page">
      <section className="checkout-order-panel">
        <Link
          className="checkout-back"
          href={backHref}
        >
          <ArrowLeft /> Konfiguration ändern
        </Link>
        <Link className="checkout-logo" href="/">
          <Image
            src="/kennzeichen-lieferung-logo.png"
            alt="kennzeichen-lieferung.de"
            width={2172}
            height={724}
            priority
          />
        </Link>
        <div className="checkout-flow-step">
          <div className="checkout-order-copy">
            <span>Schritt 1 von 5</span>
            <h1>Kennzeichen</h1>
            <p>Prüfe deine Kombination und Ausführung.</p>
          </div>
        <div className="real-order-line">
          <div>
            <strong>
              {baseQuantity} × {product.label}
            </strong>
            <span>
              {selection.plate} · {product.size} ·{' '}
              {plateColorLabel(selection.plateColor)}
            </span>
          </div>
          <strong>
            {formatPrice(
              getPackagePrice(
                selection.plateType,
                selection.plateColor,
                baseQuantity,
              ),
            )}
          </strong>
        </div>
        </div>
        <div className="checkout-flow-step">
          <div className="checkout-step-heading">
            <span>Schritt 2 von 5</span>
            <h2>Vorschau</h2>
          </div>
          <LicensePlate
            value={selection.plate}
            type={selection.plateType}
            color={selection.plateColor}
            className="real-checkout-plate"
          />
        {extras.parkingPlate && (
          <div className="real-order-line">
            <span>1 × Parkplatz-Kennzeichen</span>
            <strong>{formatPrice(PARKING_PLATE_PRICE)}</strong>
          </div>
        )}
        {extras.bikeRackPlate && (
          <div className="real-order-line">
            <span>1 × Fahrradträger-Kennzeichen</span>
            <strong>{formatPrice(BIKE_RACK_PLATE_PRICE)}</strong>
          </div>
        )}
        <div className="real-order-line">
          <span>DHL-Versand</span>
          <strong>Inklusive</strong>
        </div>
        {pricing && pricing.discountCents > pricing.packageDiscountCents && (
          <div className="real-order-line real-order-discount">
            <span>Rabatt ({pricing.promoCode})</span>
            <strong>−{formatPrice((pricing.discountCents - pricing.packageDiscountCents) / 100)}</strong>
          </div>
        )}
        <div className="real-order-total">
          <span>Gesamt</span>
          <strong>
            {formatPrice(pricing ? pricing.totalCents / 100 : total)}
          </strong>
        </div>
        <p className="checkout-scope">
          Du bestellst geprägte Schilder. Reservierung, Zulassung und amtliche
          Plaketten sind nicht enthalten.
        </p>
        <ComplianceNotice variant="compact" />
        <DeliveryGuarantee />
        </div>
      </section>
      <section className="checkout-payment-panel">
        {error ? (
          <div className="checkout-load-error">
            <h2>Checkout nicht verfügbar</h2>
            <p>{error}</p>
            <button
              className="button"
              type="button"
              onClick={() => {
                setError('');
                setRequestAttempt((attempt) => attempt + 1);
              }}
            >
              Erneut versuchen
            </button>
            <Link className="button" href="/">
              Zurück zur Konfiguration
            </Link>
          </div>
        ) : clientSecret && stripePromise && pricing ? (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
              locale: 'de',
              appearance: {
                theme: 'stripe',
                variables: {
                  colorPrimary: '#0069d9',
                  colorText: '#061622',
                  borderRadius: '6px',
                  fontFamily: 'Arial, sans-serif',
                },
              },
            }}
          >
            <PaymentForm
              selection={selection}
              extras={extras}
              pricing={pricing}
              getCartId={() => cartId.current ?? ''}
              paymentIntentId={paymentIntentId}
              onApplyPromo={(code) => updateCheckout(code)}
              onChangeExtra={(nextExtras) =>
                updateCheckout(pricing.promoCode ?? '', nextExtras)
              }
            />
          </Elements>
        ) : (
          <div className="checkout-loading">
            <LoaderCircle className="spin" />
            <strong>Sicherer Checkout wird vorbereitet</strong>
            <span>Der Gesamtbetrag wird serverseitig geprüft.</span>
          </div>
        )}
      </section>
    </main>
  );
}
