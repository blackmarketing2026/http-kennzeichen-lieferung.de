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
import { loadStripe, type StripeElements } from '@stripe/stripe-js';
import {
  ArrowLeft,
  ArrowRight,
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
  CARBON_SURCHARGE,
  FREE_SHIPPING_THRESHOLD,
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
import { getHerbstPackage, type HerbstPackage, type OfferProfile } from '@/lib/pricing';
import { getCheckoutPricing } from '@/lib/checkout-pricing';
import { saveCheckoutDraft } from '@/lib/checkout-draft';
import {
  ExtrasUpsellPopup,
  type UpsellKind,
} from '@/components/parking-upsell';
import { readAttribution } from '@/lib/attribution';
import { trackKennzeichenGtmEvent } from '@/lib/kennzeichen-gtm-events';
import styles from './checkout-extras.module.css';
import { DinCertificationLink } from '@/components/din-certification-link';
import { formatSeasonMonth } from '@/lib/season-period';

type CheckoutSelection = {
  plate: string;
  plateType: PlateType;
  plateColor: PlateColor;
  quantity: 1 | 2 | 3;
  bikeRackPlate?: boolean;
  seasonStartMonth?: number;
  seasonEndMonth?: number;
};
type ActiveSelection = Omit<CheckoutSelection, 'quantity'> & {
  quantity: number;
};
const HERBST_PACKAGE_OPTIONS: { id: HerbstPackage; label: string; color: PlateColor; bikeRackPlate: boolean; description: string }[] = [
  { id: 'basis', label: 'Basis', color: 'black', bikeRackPlate: false, description: '2 Standard-Kennzeichen' },
  { id: 'complete', label: 'Komplett-Set', color: 'black', bikeRackPlate: true, description: '2 Standard-Kennzeichen + 1 zusätzliches Kennzeichen für Fahrradträger oder Parkplatz' },
  { id: 'premium', label: 'Premium-Set', color: 'carbon', bikeRackPlate: true, description: '2 Carbon-Kennzeichen + 1 zusätzliches Kennzeichen für Fahrradträger oder Parkplatz' },
];
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
  onStepChange,
  onElementsChange,
  onFormBusyChange,
  isUpdatingPackage,
  checkoutSyncReady,
  trackKennzeichenFunnel,
}: {
  selection: ActiveSelection;
  extras: CheckoutExtras;
  pricing: CheckoutPricing;
  getCartId: () => string;
  paymentIntentId: string;
  onApplyPromo: (code: string) => Promise<CheckoutPricing>;
  onChangeExtra: (extras: CheckoutExtras) => Promise<CheckoutPricing>;
  onStepChange: (step: 'address' | 'payment') => void;
  onElementsChange: (elements: StripeElements | null) => void;
  onFormBusyChange: (busy: boolean) => void;
  isUpdatingPackage: boolean;
  checkoutSyncReady: boolean;
  trackKennzeichenFunnel: boolean;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState('');
  const [step, setStep] = useState<'address' | 'payment'>('address');
  const [shippingAddress, setShippingAddress] = useState<{
    name: string;
    phone?: string;
    address: { city: string; country: string; line1: string; line2?: string; postal_code: string; state?: string };
  } | null>(null);
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

  useEffect(() => {
    onElementsChange(elements);
    return () => onElementsChange(null);
  }, [elements, onElementsChange]);

  useEffect(() => {
    onFormBusyChange(isPaying || isApplyingPromo || isUpdatingExtra);
    return () => onFormBusyChange(false);
  }, [isPaying, isApplyingPromo, isUpdatingExtra, onFormBusyChange]);

  async function continueToPayment() {
    setMessage('');
    if (isUpdatingPackage || !checkoutSyncReady) {
      setMessage('Bitte warte, bis dein Paket und der Zahlbetrag aktualisiert wurden.');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setMessage('Bitte gib eine gültige E-Mail-Adresse ein.');
      return;
    }
    const addressValue = await elements?.getElement(AddressElement)?.getValue();
    if (!addressValue?.complete) {
      setMessage('Bitte vervollständige deine Lieferadresse.');
      return;
    }
    if (!deliveryState || (HOLIDAY_REGIONS[deliveryState] && !holidayRegion)) {
      setMessage('Bitte wähle Bundesland und gegebenenfalls die Feiertagsregion.');
      return;
    }
    const address = addressValue.value.address;
    setShippingAddress({
      name: addressValue.value.name,
      phone: addressValue.value.phone || undefined,
      address: {
        city: address.city,
        country: address.country,
        line1: address.line1,
        line2: address.line2 || undefined,
        postal_code: address.postal_code,
        state: deliveryState,
      },
    });
    try {
      await fetch('/api/checkout-address-added', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cartId: getCartId(),
          paymentIntentId,
          email,
          reminderConsent: false,
          address: {
            name: addressValue.value.name,
            line1: address.line1,
            city: address.city,
            postalCode: address.postal_code,
            country: address.country,
          },
        }),
      });
    } catch {
      // The internal hint must not prevent the customer from paying.
    }
    setStep('payment');
    onStepChange('payment');
    if (trackKennzeichenFunnel) trackKennzeichenGtmEvent('kennzeichen_adresse');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function changeExtra(kind: UpsellKind, selected: boolean) {
    if (!elements || isPaying || isApplyingPromo || isUpdatingPackage || !checkoutSyncReady || changingExtra.current)
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
    if (!elements || isApplyingPromo || isPaying || isUpdatingPackage || !checkoutSyncReady || changingExtra.current)
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
      !promoReady || isUpdatingPackage || !checkoutSyncReady || step !== 'payment' || !shippingAddress
    )
      return;
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setMessage('Bitte gib eine gültige E-Mail-Adresse ein.');
      return;
    }

    if (trackKennzeichenFunnel) {
      trackKennzeichenGtmEvent('kennzeichen_zahlen', {
        currency: 'EUR',
        value: pricing.totalCents / 100,
      });
    }

    setIsPaying(true);
    setMessage('');
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setMessage(submitError.message ?? 'Bitte prüfe deine Angaben.');
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
        return_url: `${window.location.origin}/checkout/zahlung`,
        receipt_email: email,
        payment_method_data: { billing_details: { email } },
        shipping: shippingAddress,
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
      <section className="checkout-flow-step" hidden={step !== 'address'}>
        <div className="checkout-step-heading">
          <span>Schritt 2 von 3</span>
          <h2>Wohin dürfen wir liefern?</h2>
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
      {CHECKOUT_UPSELLS_ENABLED && !isSinglePlateProduct(selection.plateType) && (
        <section className={styles.optionalExtras} aria-label="Zusatzkennzeichen">
          <div><strong>Passendes Zubehör (optional)</strong><p>Ein weiteres Kennzeichen für Parkplatz oder Fahrradträger.</p></div>
          <ExtrasUpsellPopup
            plate={selection.plate}
            plateType={selection.plateType}
            plateColor={selection.plateColor}
            priceCents={Math.round(PARKING_PLATE_PRICE * 100)}
            selected={{ parking: extras.parkingPlate, bikeRack: extras.bikeRackPlate }}
            busy={isUpdatingExtra}
            disabled={!stripe || !elements || isPaying || isApplyingPromo || isUpdatingPackage || !checkoutSyncReady}
            onChange={changeExtra}
          />
        </section>
      )}
      {message && step === 'address' && <p className="checkout-error" role="alert">{message}</p>}
      <button className="checkout-continue" type="button" onClick={continueToPayment} disabled={!elements || isUpdatingExtra || isApplyingPromo || isUpdatingPackage || !checkoutSyncReady}>
        Weiter zur Zahlung <ArrowRight size={18} />
      </button>
      </section>
      <section className="checkout-flow-step" hidden={step !== 'payment'}>
        <div className="checkout-step-heading">
          <span>Schritt 3 von 3</span>
          <h2>Zahlungsart wählen</h2>
          <p>Prüfe deine Lieferadresse und schließe die Bestellung sicher ab.</p>
        </div>
      {shippingAddress && <div className="checkout-address-review">
        <div><strong>Lieferadresse</strong><button type="button" onClick={() => { setStep('address'); onStepChange('address'); setMessage(''); }}>Ändern</button></div>
        <p>{shippingAddress.name}<br />{shippingAddress.address.line1}{shippingAddress.address.line2 && <><br />{shippingAddress.address.line2}</>}<br />{shippingAddress.address.postal_code} {shippingAddress.address.city}<br />{email}</p>
      </div>}
      <div className="checkout-shipping-method"><span>Lieferung mit DHL</span><strong>Inklusive</strong></div>
      <div className="stripe-element-group">
        <span>Zahlungsart</span>
        {step === 'payment' && <PaymentElement options={{ layout: 'tabs' }} />}
      </div>
      <p className="checkout-account-hint">
        Du bestellst als Gast – kein Konto nötig. Schon Kunde?{' '}
        <Link href="/konto/login">Melde dich an</Link>, um Bestellungen und
        Rechnungen später einzusehen.
      </p>
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
              isUpdatingExtra || isUpdatingPackage || !checkoutSyncReady
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
            disabled={isApplyingPromo || isPaying || isUpdatingExtra || isUpdatingPackage || !checkoutSyncReady}
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
      <section className="checkout-flow-step checkout-final-step" hidden={step !== 'payment'}>
        <div className="checkout-step-heading">
          <h2>Bestellung abschließen</h2>
        </div>
      {message && (
        <p className="checkout-error" role="alert">
          {message}
        </p>
      )}
      <div className="checkout-final-total">
        <span>Gesamtbetrag inkl. DHL-Versand</span>
        <strong className="checkout-live-price" key={pricing.totalCents}>{formatPrice(pricing.totalCents / 100)}</strong>
      </div>
      <button
        className="stripe-pay-button"
        type="submit"
        disabled={
          !stripe ||
          isPaying ||
          isApplyingPromo ||
          isUpdatingExtra ||
          !promoReady ||
          isUpdatingPackage ||
          !checkoutSyncReady
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
  offer = 'standard',
}: {
  selection: CheckoutSelection;
  initialPromoCode?: string;
  returnPath?: string;
  offer?: OfferProfile;
}) {
  preconnect('https://js.stripe.com', { crossOrigin: 'anonymous' });
  const baseQuantity = (
    initialSelection.quantity === 3 ? 2 : initialSelection.quantity
  ) as 1 | 2;
  const [extras, setExtras] = useState<CheckoutExtras>({
    parkingPlate: initialSelection.quantity === 3,
    bikeRackPlate: initialSelection.bikeRackPlate === true,
  });
  const [selectedColor, setSelectedColor] = useState<PlateColor>(initialSelection.plateColor);
  const quantity =
    baseQuantity + Number(extras.parkingPlate) + Number(extras.bikeRackPlate);
  const selection: ActiveSelection = { ...initialSelection, plateColor: selectedColor, quantity };
  const [clientSecret, setClientSecret] = useState('');
  const [paymentIntentId, setPaymentIntentId] = useState('');
  const [publishableKey, setPublishableKey] = useState('');
  const [pricing, setPricing] = useState<CheckoutPricing | null>(null);
  const [error, setError] = useState('');
  const [checkoutStep, setCheckoutStep] = useState<'address' | 'payment'>('address');
  const [requestAttempt, setRequestAttempt] = useState(0);
  const [paymentElements, setPaymentElements] = useState<StripeElements | null>(null);
  const [formBusy, setFormBusy] = useState(false);
  const [isUpdatingPackage, setIsUpdatingPackage] = useState(false);
  const [checkoutSyncReady, setCheckoutSyncReady] = useState(true);
  const [packageError, setPackageError] = useState('');
  const [packagePickerOpen, setPackagePickerOpen] = useState(false);
  const cartId = useRef<string | null>(null);
  const product = PRODUCTS[selection.plateType];
  const subtotal =
    getPackagePrice(selection.plateType, selection.plateColor, baseQuantity) +
    (extras.parkingPlate ? PARKING_PLATE_PRICE : 0) +
    (extras.bikeRackPlate ? BIKE_RACK_PLATE_PRICE + (selection.plateColor === 'carbon' ? CARBON_SURCHARGE : 0) : 0);
  const total = subtotal + (subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_PRICE);
  const offerEstimate = offer === 'herbst'
    ? getCheckoutPricing(selection.plateType, selection.plateColor, baseQuantity, undefined, extras, offer)
    : null;
  const offerBreakdown = offer === 'herbst' ? pricing ?? offerEstimate : null;
  const herbstPackage = offer === 'herbst'
    ? getHerbstPackage(selection.plateType, selection.plateColor, baseQuantity, extras.bikeRackPlate, extras.parkingPlate)
    : null;
  const herbstPackageName = herbstPackage === 'basis' ? 'Basis'
    : herbstPackage === 'complete' ? 'Komplett-Set'
    : herbstPackage === 'premium' ? 'Premium-Set' : null;

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
        seasonStartMonth: initialSelection.seasonStartMonth,
        seasonEndMonth: initialSelection.seasonEndMonth,
        color: initialSelection.plateColor,
        quantity: baseQuantity,
        parkingPlate: initialSelection.quantity === 3,
        bikeRackPlate: initialSelection.bikeRackPlate === true,
        cartId: cartId.current,
        promoCode: initialPromoCode || undefined,
        offer,
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
    initialSelection.seasonStartMonth,
    initialSelection.seasonEndMonth,
    initialSelection.plateColor,
    initialSelection.quantity,
    initialSelection.bikeRackPlate,
    initialPromoCode,
    offer,
    requestAttempt,
  ]);

  async function updateCheckout(
    code: string,
    nextExtras = extras,
    nextColor = selectedColor,
  ): Promise<CheckoutPricing> {
    if (!cartId.current || !paymentIntentId)
      throw new Error('Checkout ist noch nicht bereit.');
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        plate: selection.plate,
        plateType: selection.plateType,
        seasonStartMonth: selection.seasonStartMonth,
        seasonEndMonth: selection.seasonEndMonth,
        color: nextColor,
        quantity: baseQuantity,
        parkingPlate: nextExtras.parkingPlate,
        bikeRackPlate: nextExtras.bikeRackPlate,
        cartId: cartId.current,
        paymentIntentId,
        promoCode: code,
        offer,
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
    setSelectedColor(nextColor);
    return data.pricing;
  }

  async function changePackage(nextPackage: HerbstPackage) {
    if (!pricing || !paymentElements || isUpdatingPackage || formBusy || (nextPackage === herbstPackage && checkoutSyncReady)) return;
    const option = HERBST_PACKAGE_OPTIONS.find((item) => item.id === nextPackage);
    if (!option) return;
    const nextExtras = { ...extras, parkingPlate: false, bikeRackPlate: option.bikeRackPlate };
    setIsUpdatingPackage(true);
    setPackageError('');
    let intentUpdated = false;
    try {
      await updateCheckout(pricing.promoCode ?? '', nextExtras, option.color);
      intentUpdated = true;
      const update = await paymentElements.fetchUpdates();
      if (update.error) throw new Error('Der Zahlbetrag konnte nicht synchronisiert werden. Bitte wähle das Paket erneut.');
      setCheckoutSyncReady(true);
      setPackagePickerOpen(false);
      saveCheckoutDraft('kennzeichen-bestellen-herbstangebot', {
        plate: selection.plate,
        plateType: selection.plateType,
        plateColor: option.color,
        quantity: baseQuantity,
        bikeRackPlate: option.bikeRackPlate,
        promoCode: pricing.promoCode ?? undefined,
      });
    } catch (cause) {
      if (intentUpdated) setCheckoutSyncReady(false);
      setPackageError(cause instanceof Error ? cause.message : 'Das Paket konnte nicht aktualisiert werden.');
    } finally {
      setIsUpdatingPackage(false);
    }
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
      <header className="checkout-header">
        <Link className="checkout-logo" href="/">
          <Image src="/kennzeichen-lieferung-logo.png" alt="kennzeichen-lieferung.de" width={2172} height={724} priority />
        </Link>
        <span><LockKeyhole size={15} /> Sicher bestellen</span>
      </header>
      <nav className="checkout-progress" aria-label="Bestellschritte">
        <span className="is-complete"><b><CheckCircle2 size={17} /></b>Kennzeichen</span>
        <span className={checkoutStep === 'address' ? 'is-current' : 'is-complete'}><b>{checkoutStep === 'address' ? '2' : <CheckCircle2 size={17} />}</b>Lieferadresse</span>
        <span className={checkoutStep === 'payment' ? 'is-current' : ''}><b>3</b>Zahlung</span>
      </nav>
      <section className="checkout-order-panel">
        <Link
          className="checkout-back"
          href={backHref}
        >
          <ArrowLeft /> Konfiguration ändern
        </Link>
        <div className="checkout-flow-step">
          <div className="checkout-order-copy">
            <span>Deine Bestellung</span>
            <h1>{herbstPackage ? 'Dein Paket im Überblick' : 'Kennzeichen im Überblick'}</h1>
          </div>
        {herbstPackage ? <div className="checkout-package-line">
          <div>
            <strong>{herbstPackageName}</strong>
            <span>{selection.plate} · 2 {selection.plateColor === 'carbon' ? 'Carbon-' : 'Standard-'}Kennzeichen{extras.bikeRackPlate && ' + 1 Kennzeichen für Fahrradträger oder Parkplatz'}</span>
          </div>
          <strong>{formatPrice(((offerBreakdown?.subtotalCents ?? 0) + (offerBreakdown?.shippingCents ?? 0)) / 100)}</strong>
        </div> : <div className="real-order-line">
          <div>
            <strong>
              {baseQuantity} × {product.label}
            </strong>
            <span>
              {selection.plate} · {product.size} ·{' '}
              {plateColorLabel(selection.plateColor)}
              {selection.plateType === 'season' && ` · ${formatSeasonMonth(selection.seasonStartMonth ?? 4)}–${formatSeasonMonth(selection.seasonEndMonth ?? 10)}`}
            </span>
          </div>
          <strong>
            {formatPrice(
              offerBreakdown ? (offerBreakdown.unitPriceCents * baseQuantity - offerBreakdown.packageDiscountCents) / 100 : getPackagePrice(
                selection.plateType,
                selection.plateColor,
                baseQuantity,
              ),
            )}
          </strong>
        </div>}
        {herbstPackage && <div className="checkout-package-change">
          <button type="button" className={styles.packageToggle} aria-expanded={packagePickerOpen} aria-controls="checkout-package-options" onClick={() => setPackagePickerOpen((open) => !open)}>
            {packagePickerOpen ? 'Paketauswahl schließen' : 'Paket ändern'}
            <ArrowRight size={16} aria-hidden="true" />
          </button>
          {packagePickerOpen && <fieldset id="checkout-package-options" className={styles.packageOptions}>
            <legend>Wähle dein Paket</legend>
            {HERBST_PACKAGE_OPTIONS.map((option) => {
              const optionPricing = getCheckoutPricing('standard', option.color, 2, undefined, { parkingPlate: false, bikeRackPlate: option.bikeRackPlate }, 'herbst');
              return <button key={option.id} type="button" className={`${styles.packageOption} ${herbstPackage === option.id ? styles.packageOptionSelected : ''}`} aria-pressed={herbstPackage === option.id} disabled={!paymentElements || isUpdatingPackage || formBusy} onClick={() => changePackage(option.id)}>
                <span className={styles.packageOptionText}><strong>{option.label}</strong><small>{option.description}</small></span>
                <span className={styles.packageOptionPrice}><b>{optionPricing ? formatPrice(optionPricing.totalCents / 100) : ''}</b>{herbstPackage === option.id && <CheckCircle2 size={16} aria-label="Ausgewählt" />}</span>
              </button>;
            })}
          </fieldset>}
          {isUpdatingPackage && <output className="checkout-package-message"><LoaderCircle className="spin" size={15} /> Paket und Zahlbetrag werden aktualisiert …</output>}
          {packageError && <p className="checkout-package-error" role="alert">{packageError}</p>}
        </div>}
        </div>
        <div className="checkout-flow-step checkout-preview-block">
          <div className="checkout-step-heading">
            <span>Dein Kennzeichen</span>
          </div>
          <p className="checkout-live-label"><span aria-hidden="true" /> Live-Vorschau deiner Konfiguration</p>
          <LicensePlate
            value={selection.plate}
            type={selection.plateType}
            seasonStartMonth={selection.seasonStartMonth}
            seasonEndMonth={selection.seasonEndMonth}
            color={selection.plateColor}
            className="real-checkout-plate"
          />
          {selection.plateType !== 'motorcycle' && !isAgriculturePlate(selection.plateType) && (
            <p className="checkout-preview-note">Amtliche Siegel dienen nur der Vorschau und sind nicht im Lieferumfang.</p>
          )}
        {herbstPackage && <div className="checkout-package-includes">
          <strong>Im Paket enthalten</strong>
          <ul>
            <li>{baseQuantity} Kennzeichen für dein Fahrzeug · {plateColorLabel(selection.plateColor)}</li>
            {extras.bikeRackPlate && <li>1 zusätzliches Kennzeichen für Fahrradträger oder Parkplatz · {plateColorLabel(selection.plateColor)}</li>}
            <li>{herbstPackage === 'basis' ? 'DHL-Versand inklusive' : 'DHL-Versand kostenfrei'}</li>
            {extras.bikeRackPlate && <li>Checkliste für die Zulassung per E-Mail</li>}
          </ul>
          <small>Ein Paketpreis inkl. 19 % MwSt. und Versand</small>
        </div>}
        {!herbstPackage && extras.parkingPlate && (
          <div className="real-order-line">
            <span>1 × Parkplatz-Kennzeichen</span>
            <strong>{formatPrice(PARKING_PLATE_PRICE)}</strong>
          </div>
        )}
        {!herbstPackage && extras.bikeRackPlate && (
          <div className="real-order-line">
            <span>1 × Fahrradträger-Kennzeichen</span>
            <strong>{formatPrice(offerBreakdown ? offerBreakdown.bikeRackExtraPriceCents / 100 : BIKE_RACK_PLATE_PRICE + (selection.plateColor === 'carbon' ? CARBON_SURCHARGE : 0))}</strong>
          </div>
        )}
        {!herbstPackage && <div className="real-order-line">
          <span>DHL-Versand</span>
          <strong>{pricing?.shippingCents === 0 || (!pricing && (offerEstimate ? offerEstimate.shippingCents === 0 : subtotal >= FREE_SHIPPING_THRESHOLD)) ? 'Kostenlos' : formatPrice(SHIPPING_PRICE)}</strong>
        </div>}
        {pricing && pricing.discountCents > pricing.packageDiscountCents && (
          <div className="real-order-line real-order-discount">
            <span>Rabatt ({pricing.promoCode})</span>
            <strong>−{formatPrice((pricing.discountCents - pricing.packageDiscountCents) / 100)}</strong>
          </div>
        )}
        <div className="real-order-total">
          <span>Gesamt</span>
          <strong className="checkout-live-price" key={pricing?.totalCents ?? offerEstimate?.totalCents ?? total}>
            {formatPrice(pricing ? pricing.totalCents / 100 : offerEstimate ? offerEstimate.totalCents / 100 : total)}
          </strong>
        </div>
        <p className="checkout-scope">
          Du bestellst geprägte Schilder. Reservierung, Zulassung und amtliche
          Plaketten sind nicht enthalten.
        </p>
        <DinCertificationLink />
        <DeliveryGuarantee label={offer === 'herbst' ? 'Pünktlich-Garantie' : undefined} />
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
              onStepChange={setCheckoutStep}
              onElementsChange={setPaymentElements}
              onFormBusyChange={setFormBusy}
              isUpdatingPackage={isUpdatingPackage}
              checkoutSyncReady={checkoutSyncReady}
              trackKennzeichenFunnel={returnPath?.startsWith('/kennzeichen-bestellen') === true}
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
