'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  BadgeCheck,
  CarFront,
  Check,
  CheckCircle2,
  Clock3,
  Factory,
  LockKeyhole,
  MapPinCheck,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Truck,
  TriangleAlert,
} from 'lucide-react';
import { LicensePlate } from '@/components/license-plate';
import { PaymentLogos } from '@/components/payment-logos';
import { DeliveryGuarantee } from '@/components/delivery-guarantee';
import { HerbstCountdown } from '@/components/herbst-countdown';
import {
  formatPrice,
  FREE_SHIPPING_THRESHOLD,
  isValidPlate,
  PRODUCTS,
  SHIPPING_PRICE,
  type PlateColor,
  type PlateType,
} from '@/config/products';
import { CONSENT_STORAGE_KEY, parseConsentRecord } from '@/lib/cookie-consent';
import { readCheckoutDraft, saveCheckoutDraft } from '@/lib/checkout-draft';
import { getCheckoutPricing } from '@/lib/checkout-pricing';
import { HERBST_PRICING, getHerbstPackage, herbstIndividualComparisonCents, herbstSetPriceCents, type OfferProfile } from '@/lib/pricing';
import { trackKennzeichenGtmEvent } from '@/lib/kennzeichen-gtm-events';
import { DEFAULT_SEASON_END_MONTH, DEFAULT_SEASON_START_MONTH, formatSeasonMonth, isValidSeasonPeriod } from '@/lib/season-period';
import styles from './page.module.css';

const PLATE_TYPES: PlateType[] = [
  'standard',
  'electric',
  'historic',
  'season',
  'motorcycle',
];
const FAQS = [
  [
    'Wie schnell kommen meine Kennzeichen an?',
    'Deine Kennzeichen werden innerhalb von 10 Minuten geprägt und versandfertig gemacht. DHL holt an Werktagen dreimal täglich ab. Die tatsächliche Zustellung hängt vom Transport durch DHL ab; den aktuellen Status kannst du über die Sendungsverfolgung prüfen.',
  ],
  [
    'Sind die Kennzeichen bei der Anmeldung in der Stadt erlaubt?',
    'Ja. Unsere Kennzeichen sind nach DIN 74069 zertifiziert und tragen den vorgeschriebenen DIN-Norm-Stempel. Sie sind für den TÜV und die Zulassungsstelle zugelassen.',
  ],
  [
    'Bekomme ich eine Sendungsverfolgung?',
    'Ja. Sobald die Sendungsnummer vorliegt, bekommst du sie per E-Mail. Über den Link kannst du den Status prüfen, sobald DHL die Sendung erfasst hat.',
  ],
];

type AnalyticsWindow = Window & { dataLayer?: unknown[] };

function trackEvent(event: string, payload: Record<string, unknown>) {
  try {
    const consent = parseConsentRecord(
      window.localStorage.getItem(CONSENT_STORAGE_KEY),
    );
    const analyticsWindow = window as AnalyticsWindow;
    if (!consent?.optional.googleTagManager || !analyticsWindow.dataLayer)
      return;
    analyticsWindow.dataLayer.push({ event, ...payload });
  } catch {
    // Tracking stays optional and never blocks the order flow.
  }
}

export function KennzeichenLandingPage({ offer = 'standard' }: { offer?: OfferProfile }) {
  const isHerbst = offer === 'herbst';
  const source = isHerbst ? 'kennzeichen-bestellen-herbstangebot' : 'kennzeichen-bestellen';
  const router = useRouter();
  const [plateType, setPlateType] = useState<PlateType>('standard');
  const [carQuantity, setCarQuantity] = useState<1 | 2>(1);
  const [plateColor, setPlateColor] = useState<PlateColor>('black');
  const [bikeRackPlate, setBikeRackPlate] = useState(false);
  const [offerConfiguratorOpen, setOfferConfiguratorOpen] = useState(!isHerbst);
  const [offerNow, setOfferNow] = useState(() => new Date());
  const [city, setCity] = useState('');
  const [letters, setLetters] = useState('');
  const [numbers, setNumbers] = useState('');
  const [seasonStartMonth, setSeasonStartMonth] = useState(DEFAULT_SEASON_START_MONTH);
  const [seasonEndMonth, setSeasonEndMonth] = useState(DEFAULT_SEASON_END_MONTH);
  const inputStarted = useRef(false);
  const validTracked = useRef(false);
  const quantity: 1 | 2 = plateType === 'motorcycle' ? 1 : carQuantity;
  const plateValue = `${city} ${letters} ${numbers}`;
  const valid = useMemo(
    () => isValidPlate(plateValue, plateType),
    [plateValue, plateType],
  );
  const validSeason = plateType !== 'season' || isValidSeasonPeriod(seasonStartMonth, seasonEndMonth);
  const pricing = getCheckoutPricing(plateType, plateColor, quantity, undefined, { parkingPlate: false, bikeRackPlate: plateType !== 'motorcycle' && bikeRackPlate }, offer, offerNow);
  const subtotal = ((pricing?.subtotalCents ?? 0) - (pricing?.packageDiscountCents ?? 0)) / 100;
  const total = (pricing?.totalCents ?? 0) / 100;
  const shippingRemaining = isHerbst ? 0 : Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const product = PRODUCTS[plateType];
  const totalPlates = quantity + Number(bikeRackPlate && plateType !== 'motorcycle');
  const selectedOffer = isHerbst ? getHerbstPackage(plateType, plateColor, quantity, bikeRackPlate) : null;
  const selectedPackage = selectedOffer === 'basis' ? 'Basis'
    : selectedOffer === 'complete' ? 'Komplett-Set'
    : selectedOffer === 'premium' ? 'Premium-Set'
    : plateType !== 'standard' ? 'Individuell' : 'Einzelbestellung';
  const configuratorHref = isHerbst && !offerConfiguratorOpen ? '#angebote' : '#konfigurator';

  useEffect(() => {
    if (!isHerbst) return;
    const timer = window.setInterval(() => setOfferNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, [isHerbst]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const draft = readCheckoutDraft(source);
      if (!draft) return;
      if (isHerbst) setOfferConfiguratorOpen(true);
      const [savedCity, savedLetters, savedNumbers] = draft.plate.split(' ');
      setPlateType(draft.plateType);
      setCarQuantity(draft.quantity === 1 ? 1 : 2);
      setPlateColor(draft.plateColor);
      setBikeRackPlate(draft.bikeRackPlate === true);
      setCity(savedCity);
      setLetters(savedLetters);
      setNumbers(savedNumbers);
      setSeasonStartMonth(draft.seasonStartMonth ?? DEFAULT_SEASON_START_MONTH);
      setSeasonEndMonth(draft.seasonEndMonth ?? DEFAULT_SEASON_END_MONTH);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [source, isHerbst]);

  function selectPackage(kind: 'basis' | 'complete' | 'premium') {
    setPlateType('standard');
    setCarQuantity(2);
    setPlateColor(kind === 'premium' ? 'carbon' : 'black');
    setBikeRackPlate(kind !== 'basis');
    setOfferConfiguratorOpen(true);
    window.requestAnimationFrame(() => document.getElementById('konfigurator')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  }

  useEffect(() => {
    if (!valid || validTracked.current) return;
    validTracked.current = true;
    trackEvent('license_plate_valid', { plate_type: plateType });
  }, [valid, plateType]);

  function startInput(field: 'city' | 'letters' | 'numbers') {
    if (inputStarted.current) return;
    inputStarted.current = true;
    trackEvent('license_plate_input_started', {
      input_field: field,
      plate_type: plateType,
      landing_page: source,
    });
  }

  function updateCity(value: string) {
    startInput('city');
    setCity(
      value
        .toUpperCase()
        .replace(/[^A-ZÄÖÜ]/g, '')
        .slice(0, 3),
    );
  }

  function updateLetters(value: string) {
    startInput('letters');
    setLetters(
      value
        .toUpperCase()
        .replace(/[^A-Z]/g, '')
        .slice(0, 2),
    );
  }

  function updateNumbers(value: string) {
    startInput('numbers');
    setNumbers(value.replace(/\D/g, '').replace(/^0+/, '').slice(0, 4));
  }

  function checkout() {
    if (!valid || !validSeason) return;
    saveCheckoutDraft(source, {
      plate: plateValue,
      plateType,
      plateColor,
      quantity,
      bikeRackPlate: plateType !== 'motorcycle' && bikeRackPlate,
      ...(plateType === 'season' ? { seasonStartMonth, seasonEndMonth } : {}),
    });
    trackEvent('begin_checkout', {
      currency: 'EUR',
      value: total,
      landing_page: source,
      items: [{ item_id: plateType, item_name: product.label, quantity }],
    });
    trackKennzeichenGtmEvent('kennzeichen_eingabe');
    const params = new URLSearchParams({
      plate: plateValue,
      type: plateType,
      quantity: String(quantity),
      color: plateColor,
      ...(bikeRackPlate && plateType !== 'motorcycle' ? { bikeRackPlate: '1' } : {}),
      source,
      ...(isHerbst ? { offer: 'herbst' } : {}),
      ...(plateType === 'season' ? { seasonStartMonth: String(seasonStartMonth), seasonEndMonth: String(seasonEndMonth) } : {}),
    });
    router.push(`/checkout?${params.toString()}`);
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link
          href="/"
          className={styles.logo}
          aria-label="kennzeichen-lieferung.de Startseite"
        >
          <Image
            src="/kennzeichen-lieferung-logo.png"
            alt="kennzeichen-lieferung.de"
            width={2172}
            height={724}
            priority
          />
        </Link>
        <nav className={styles.nav} aria-label="Seitennavigation">
          <a href="#qualitaet">Qualität</a>
          <a href="#versand">Versand</a>
          <a href="#fragen">FAQ</a>
        </nav>
        <a className={styles.headerCta} href={configuratorHref}>
          Kennzeichen konfigurieren
        </a>
      </header>

      {isHerbst && <section className={styles.offerPackages} id="angebote" aria-labelledby="offer-packages-title">
        <p className={styles.kicker}><span /> Herbst-Angebot</p>
        <h2 id="offer-packages-title">Wähle dein Kennzeichen-Paket</h2>
        <p className={styles.offerCountdown}><HerbstCountdown /></p>
        <div className={styles.offerPackageGrid}>
          <button type="button" className={`${styles.offerPackageCard} ${offerConfiguratorOpen && selectedOffer === 'basis' ? styles.offerPackageSelected : ''}`} aria-pressed={offerConfiguratorOpen && selectedOffer === 'basis'} onClick={() => selectPackage('basis')}>
            <strong>Basis</strong><span>2 Kennzeichen</span>
            <b>{formatPrice((2 * HERBST_PRICING.standardPlateCents + HERBST_PRICING.shippingCents) / 100)}</b>
            <small>inkl. {formatPrice(HERBST_PRICING.shippingCents / 100)} Versand</small>
            <span>✓ Pünktlich-Garantie</span>
            <span className={styles.offerPackageChoice}>{offerConfiguratorOpen && selectedOffer === 'basis' ? '✓ Ausgewählt' : 'Angebot auswählen →'}</span>
          </button>
          <button type="button" className={`${styles.offerPackageCard} ${styles.offerPackagePopular} ${offerConfiguratorOpen && selectedOffer === 'complete' ? styles.offerPackageSelected : ''}`} aria-pressed={offerConfiguratorOpen && selectedOffer === 'complete'} onClick={() => selectPackage('complete')}>
            <em>Beliebt</em><strong>Komplett-Set</strong><span>3 Kennzeichen inkl. Fahrradträger</span>
            <small>Einzeln {formatPrice(herbstIndividualComparisonCents('black') / 100)} → im Set</small>
            <b>{formatPrice(herbstSetPriceCents('black', offerNow) / 100)}</b>
            <span>Du sparst {formatPrice((herbstIndividualComparisonCents('black') - herbstSetPriceCents('black', offerNow)) / 100)}</span>
            <span>✓ Versandkostenfrei · Gratis: Checkliste für die Zulassung · Pünktlich-Garantie</span>
            <span className={styles.offerPackageChoice}>{offerConfiguratorOpen && selectedOffer === 'complete' ? '✓ Ausgewählt' : 'Angebot auswählen →'}</span>
          </button>
          <button type="button" className={`${styles.offerPackageCard} ${offerConfiguratorOpen && selectedOffer === 'premium' ? styles.offerPackageSelected : ''}`} aria-pressed={offerConfiguratorOpen && selectedOffer === 'premium'} onClick={() => selectPackage('premium')}>
            <strong>Premium-Set</strong><span>3 Carbon-Kennzeichen inkl. Fahrradträger</span>
            <small>Einzeln {formatPrice(herbstIndividualComparisonCents('carbon') / 100)} → im Set</small>
            <b>{formatPrice(herbstSetPriceCents('carbon', offerNow) / 100)}</b>
            <span>Du sparst {formatPrice((herbstIndividualComparisonCents('carbon') - herbstSetPriceCents('carbon', offerNow)) / 100)}</span>
            <span>✓ Versandkostenfrei · Gratis-Checkliste · Pünktlich-Garantie</span>
            <span className={styles.offerPackageChoice}>{offerConfiguratorOpen && selectedOffer === 'premium' ? '✓ Ausgewählt' : 'Angebot auswählen →'}</span>
          </button>
        </div>
      </section>}

      <section className={styles.hero} id="bestellen">
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>
            <span /> DIN-zertifiziert & schnell geprägt
          </p>
          {isHerbst ? <h1>Kennzeichen pünktlich zur Zulassung – oder Geld zurück.</h1> : <h1>
            Kennzeichen bestellen.
            <br />
            <em>Schnell geprägt, sicher geliefert.</em>
          </h1>}
          {isHerbst ? <p className={styles.heroOffer}><strong>3 Kennzeichen für {formatPrice(herbstSetPriceCents('black', offerNow) / 100)}</strong><small>inkl. Fahrradträger-Schild · versandkostenfrei</small></p> : <p className={styles.heroOffer}>
            <span>Kennzeichen ab</span>
            <strong>6,90 €</strong>
            <small>pro Schild · inkl. 19 % MwSt.</small>
          </p>}
          {isHerbst ? <p className={styles.lead}>DIN-zertifiziert · in 10 Minuten geprägt · 3× täglich DHL-Abholung</p> : <p className={styles.lead}>
            Wähle deine Kombination, gib deine Lieferadresse ein und bezahle
            sicher online. Deine DIN-zertifizierten Schilder werden in 10
            Minuten geprägt und für den DHL-Versand vorbereitet.
          </p>}
          <ul className={styles.heroChecks}>
            <li>
              <Clock3 /> In 10 Minuten geprägt und versandfertig
            </li>
            <li>
              <Truck /> Dreimal täglich DHL-Abholung an Werktagen
            </li>
            <li>
              <MapPinCheck /> Sendungsverfolgung per E-Mail
            </li>
            <li>
              <ShieldCheck /> Unsere {isHerbst ? 'Pünktlich-Garantie' : 'Liefergarantie'} ist inklusive
            </li>
          </ul>
          <a className={styles.heroCta} href={configuratorHref}>
            Kennzeichen konfigurieren <ArrowRight />
          </a>
          <div className={styles.deliveryInfo}>
            <span className={styles.deliveryIcon}>
              <Truck />
            </span>
            <div>
              <small>Fertigung und Übergabe</small>
              <strong>DHL-Abholung dreimal täglich an Werktagen</strong>
            </div>
          </div>
        </div>

        {isHerbst && !offerConfiguratorOpen ? <div className={styles.offerConfiguratorPrompt} id="konfigurator">
          <span>Schritt 1 von 2</span>
          <h2>Wähle zuerst dein Angebot</h2>
          <p>Danach öffnet sich hier dein Konfigurator mit der passenden Anzahl und Ausführung.</p>
          <a href="#angebote">Angebote auswählen <ArrowRight size={18} /></a>
        </div> : <div className={styles.orderCard} id="konfigurator">
          <div className={styles.cardTopline}>
            <span>Schritt 1: Kennzeichen wählen</span>
            <strong>
              {isHerbst ? totalPlates : quantity} {(isHerbst ? totalPlates : quantity) === 1 ? 'Schild' : 'Schilder'} · {formatPrice(total)} gesamt
            </strong>
          </div>
          {isHerbst && <p className={styles.offerSelectionSummary} aria-live="polite">✓ Deine Auswahl: <strong>{selectedPackage}</strong></p>}
          <div className={styles.livePreviewLabel}>
            <span className={styles.livePreviewDot} aria-hidden="true" />
            Live-Vorschau deiner Kombination
          </div>
          <LicensePlate
            value={plateValue}
            type={plateType}
            color={plateColor}
            seasonStartMonth={seasonStartMonth}
            seasonEndMonth={seasonEndMonth}
            className={styles.plate}
          />
          {plateType !== 'motorcycle' && <p className={styles.previewNote}>Amtliche Siegel dienen nur der Vorschau und sind nicht im Lieferumfang.</p>}

          <div className={styles.fields}>
            <label>
              <span>Ort</span>
              <input
                aria-label="Ortskürzel"
                value={city}
                onChange={(event) => updateCity(event.target.value)}
                placeholder="H"
                maxLength={3}
                autoComplete="off"
              />
            </label>
            <label>
              <span>Buchstaben</span>
              <input
                aria-label="Erkennungsbuchstaben"
                value={letters}
                onChange={(event) => updateLetters(event.target.value)}
                placeholder="AB"
                maxLength={2}
                autoComplete="off"
              />
            </label>
            <label>
              <span>Zahlen</span>
              <input
                aria-label="Erkennungsnummer"
                value={numbers}
                onChange={(event) => updateNumbers(event.target.value)}
                placeholder="123"
                maxLength={4}
                inputMode="numeric"
                autoComplete="off"
              />
            </label>
          </div>

          {plateType !== 'motorcycle' && !selectedOffer && (
            <div className={styles.quantityChoice}>
              <span>Menge</span>
              <div>
                {([1, 2] as const).map((count) => (
                  <button key={count} type="button" aria-pressed={carQuantity === count} onClick={() => setCarQuantity(count)}>{count} {count === 1 ? 'Schild' : 'Schilder'}</button>
                ))}
              </div>
            </div>
          )}
          {plateType !== 'motorcycle' && !selectedOffer && (
            <div className={styles.finishChoice} aria-label="Ausführung">
              <button type="button" aria-pressed={plateColor === 'black'} onClick={() => setPlateColor('black')}>Standard</button>
              <button type="button" aria-pressed={plateColor === 'carbon'} onClick={() => setPlateColor('carbon')}>Carbon-Optik <b>Beliebt</b><small>+5,00 € pro Schild</small></button>
            </div>
          )}
          <p
            className={`${styles.validation} ${valid ? styles.valid : ''}`}
            aria-live="polite"
          >
            {valid ? (
              <>
                <CheckCircle2 /> Kombination ist bereit
              </>
            ) : (
              'Ortskürzel · Buchstaben · Zahlen eingeben'
            )}
          </p>

          <div className={styles.typeGrid} aria-label="Kennzeichenart">
            {PLATE_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                className={plateType === type ? styles.selectedType : ''}
                aria-pressed={plateType === type}
                onClick={() => setPlateType(type)}
              >
                <span>
                  {type === 'standard'
                    ? 'Auto'
                    : type === 'electric'
                      ? 'E'
                      : type === 'historic'
                        ? 'H'
                        : type === 'season'
                          ? `${formatSeasonMonth(seasonStartMonth)}–${formatSeasonMonth(seasonEndMonth)}`
                          : 'Moto'}
                </span>
                <small>{PRODUCTS[type].shortLabel}</small>
              </button>
            ))}
          </div>

          {plateType === 'season' && (
            <div className={styles.seasonFields}>
              <span>Saisonzeitraum</span>
              <div>
                <label>
                  Von
                  <select value={seasonStartMonth} onChange={(event) => setSeasonStartMonth(Number(event.target.value))}>
                    {Array.from({ length: 12 }, (_, index) => index + 1).map((month) => (
                      <option key={month} value={month}>{formatSeasonMonth(month)}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Bis
                  <select value={seasonEndMonth} onChange={(event) => setSeasonEndMonth(Number(event.target.value))}>
                    {Array.from({ length: 12 }, (_, index) => index + 1).map((month) => (
                      <option key={month} value={month}>{formatSeasonMonth(month)}</option>
                    ))}
                  </select>
                </label>
              </div>
              {!validSeason && <small role="alert">Bitte wähle 2 bis 11 aufeinanderfolgende Monate innerhalb eines Jahres.</small>}
            </div>
          )}

          {selectedOffer ? <div className={styles.offerOrderSummary} aria-live="polite">
            <div className={styles.offerOrderSummaryHeading}>
              <span>{selectedPackage}</span>
              <strong>{formatPrice(total)}</strong>
            </div>
            <ul>
              <li>{totalPlates} {plateColor === 'carbon' ? 'Carbon-Kennzeichen' : 'Standard-Kennzeichen'}{bikeRackPlate ? ' inkl. Fahrradträger-Schild' : ''}</li>
              <li>{pricing?.shippingCents === 0 ? 'DHL-Versand inklusive' : `DHL-Versand inkl. ${formatPrice((pricing?.shippingCents ?? 0) / 100)}`}</li>
              {bikeRackPlate && <li>Checkliste für die Zulassung gratis per E-Mail</li>}
            </ul>
            <small>Endpreis inkl. 19 % MwSt. und Versand</small>
            <a href="#angebote">Anderes Paket wählen</a>
          </div> : <div className={styles.summary}>
            <div>
              <span className={styles.platePrice}>
                {quantity} {quantity === 1 ? 'Schild' : 'Schilder'}: {formatPrice((quantity * (pricing?.unitPriceCents ?? 0) - (pricing?.packageDiscountCents ?? 0)) / 100)}
              </span>
              <strong className={styles.summaryPrice}>
                Gesamt: {formatPrice(total)}
              </strong>
            </div>
            <div>
              <span>DHL-Versand mit Tracking</span>
              <strong>{pricing?.shippingCents === 0 ? 'Kostenlos' : formatPrice(SHIPPING_PRICE)}</strong>
            </div>
            {bikeRackPlate && plateType !== 'motorcycle' && <div><span>3. Schild für Fahrradträger</span><strong>{formatPrice((pricing?.bikeRackExtraPriceCents ?? 0) / 100)}</strong></div>}
          </div>}
          {!selectedOffer && <p className={styles.livePriceNote}>{isHerbst ? 'inkl. 19 % MwSt. und Versand · ab 3 Schildern versandkostenfrei' : 'inkl. MwSt., zzgl. 3,90 € Versand – versandkostenfrei ab 19 €'}</p>}
          {!selectedOffer && <p className={styles.shippingProgress} aria-live="polite">{isHerbst ? pricing?.shippingCents === 0 ? 'Versandkostenfrei ✓' : `${formatPrice(HERBST_PRICING.shippingCents / 100)} Versand` : shippingRemaining > 0 ? `Noch ${formatPrice(shippingRemaining)} bis zum kostenlosen Versand` : 'Versandkostenfrei ✓'}</p>}
          <DeliveryGuarantee label={isHerbst ? 'Pünktlich-Garantie' : undefined} />
          {selectedOffer === 'complete' && <label className={styles.carbonUpgrade}>
            <input type="checkbox" checked={false} onChange={() => setPlateColor('carbon')} />
            <span>Auf Carbon upgraden: +{formatPrice((herbstSetPriceCents('carbon', offerNow) - herbstSetPriceCents('black', offerNow)) / 100)} (statt +{formatPrice(3 * (HERBST_PRICING.carbonPlateCents - HERBST_PRICING.standardPlateCents) / 100)} einzeln)</span>
          </label>}
          {plateType !== 'motorcycle' && !selectedOffer && <label className={styles.extraCheck}><input type="checkbox" checked={bikeRackPlate} onChange={(event) => setBikeRackPlate(event.target.checked)} /><span>3. Schild für Fahrradträger (gleiche Kombination) <strong>+{isHerbst ? formatPrice((pricing?.bikeRackExtraPriceCents ?? 0) / 100) : formatPrice(4.9 + (plateColor === 'carbon' ? 5 : 0))}</strong></span></label>}
          {isHerbst && <p className={styles.offerCountdown}><HerbstCountdown compact /></p>}
          <button
            className={styles.orderButton}
            type="button"
            onClick={checkout}
            disabled={!valid || !validSeason}
          >
            {valid ? (
              <>
                Weiter zur Lieferadresse <ArrowRight />
              </>
            ) : (
              'Kennzeichen eingeben'
            )}
          </button>
          <p className={styles.checkoutNote}>
            <LockKeyhole /> {formatPrice(total)} inkl. MwSt. und Versand · Adresse und Zahlung folgen · kein Konto nötig
          </p>
          <div className={styles.paymentWrap}>
            <PaymentLogos />
          </div>
        </div>}
      </section>

      <section className={styles.orderProcess} aria-labelledby="bestellablauf">
        <p className={styles.kicker}><span /> So läuft deine Bestellung</p>
        <h2 id="bestellablauf">In drei Schritten zu deinen Kennzeichen</h2>
        <div className={styles.orderProcessGrid}>
          <article><b>01</b><strong>Kennzeichen wählen</strong><p>Kombination und Kennzeichenart eingeben. Du siehst dein Schild und den Endpreis direkt in der Vorschau.</p></article>
          <article><b>02</b><strong>Lieferadresse eingeben</strong><p>Trage die Adresse ein, prüfe deine Bestellung und ergänze bei Bedarf Zubehör.</p></article>
          <article><b>03</b><strong>Sicher bezahlen</strong><p>Wähle deine Zahlungsart. Wir prägen dein Kennzeichen und versenden es mit DHL und Sendungsverfolgung.</p></article>
        </div>
        <Link href="/liefergarantie">Mehr über unsere {isHerbst ? 'Pünktlich-Garantie' : 'Liefergarantie'} erfahren <ArrowRight size={17} /></Link>
      </section>

      <section className={styles.proofBar} aria-label="Produktvorteile">
        <div>
          <Factory />
          <span>
            <strong>10 Minuten</strong>Geprägt und versandfertig
          </span>
        </div>
        <div>
          <PackageCheck />
          <span>
            <strong>3× an Werktagen</strong>DHL-Abholung im Druckwerk
          </span>
        </div>
        <div>
          <BadgeCheck />
          <span>
            <strong>DIN-zertifiziert</strong>Für deutsche Kennzeichen
          </span>
        </div>
        <div>
          <MapPinCheck />
          <span>
            <strong>Mit Tracking</strong>Sendungsverfolgung per E-Mail
          </span>
        </div>
      </section>

      <section className={styles.klarnaBanner} aria-labelledby="klarna-bestellen-title">
        <div className={styles.klarnaBannerInner}>
          <div className={styles.klarnaBrand}>
            <Image
              src="/payments/klarna-mark.svg"
              alt=""
              width={48}
              height={48}
              unoptimized
            />
            <span>Klarna</span>
          </div>
          <div className={styles.klarnaCopy}>
            <h2 id="klarna-bestellen-title">
              Kennzeichen jetzt konfigurieren, bestellen und später bezahlen.
            </h2>
            <p>Wähle Klarna als Zahlungsart im Checkout.</p>
          </div>
          <a className={styles.klarnaButton} href={configuratorHref}>
            Jetzt konfigurieren <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className={styles.buyerWarning} aria-labelledby="kaufhinweis">
        <div className={styles.warningIcon}>
          <TriangleAlert />
        </div>
        <div className={styles.warningCopy}>
          <p className={styles.kicker}>
            <span /> Wichtig vor dem Kauf
          </p>
          <h2 id="kaufhinweis">
            Vorsicht bei vermeintlich
            <br />
            <em>günstigeren Angeboten.</em>
          </h2>
          <p>
            Nicht jedes günstige Kennzeichen ist automatisch für die
            Zulassungsstelle geeignet. Achte vor dem Kauf darauf, dass das
            Schild der DIN 74069 entspricht und den vorgeschriebenen
            DIN-Norm-Stempel trägt. Reine Dekoschilder oder nicht normgerechte
            Schilder können bei der Zulassung abgelehnt werden.
          </p>
        </div>
        <div className={styles.warningChecklist}>
          <small>Bei uns immer inklusive</small>
          <strong>
            <CheckCircle2 /> DIN-zertifiziert nach DIN 74069
          </strong>
          <strong>
            <CheckCircle2 /> Mit DIN-Norm-Stempel
          </strong>
          <strong>
            <CheckCircle2 /> Für TÜV und Zulassungsstelle
          </strong>
          <a href={configuratorHref}>
            Normgerechte Kennzeichen bestellen <ArrowRight />
          </a>
        </div>
      </section>

      <section className={styles.quality} id="qualitaet">
        <div className={styles.sectionHeading}>
          <p className={styles.kicker}>
            <span /> Ohne Fragezeichen zur Zulassung
          </p>
          <h2>
            Ein Schild, das hält,
            <br />
            was es verspricht.
          </h2>
          <p>
            Deine Kennzeichen werden für den echten Einsatz gefertigt – nicht
            als Dekoschild und nicht als unverbindliche Vorschau.
          </p>
        </div>
        <div className={styles.qualityGrid}>
          <article className={styles.qualityMain}>
            <span className={styles.cardNumber}>01</span>
            <ShieldCheck />
            <h3>DIN-zertifiziert</h3>
            <p>
              Reflektierender Kennzeichenrohling, vorgeschriebene Maße und das
              passende Schriftbild nach DIN 74069.
            </p>
            <ul>
              <li>
                <Check /> Für die Siegelung vorgesehen
              </li>
              <li>
                <Check /> Für TÜV und Zulassungsstelle zugelassen
              </li>
              <li>
                <Check /> Witterungsbeständige Aluminium-Ausführung
              </li>
            </ul>
          </article>
          <article>
            <span className={styles.cardNumber}>02</span>
            <Sparkles />
            <h3>Sauber geprägt</h3>
            <p>
              Deine Kombination wird klar, dauerhaft und gut lesbar in das
              Kennzeichen geprägt.
            </p>
          </article>
          <article>
            <span className={styles.cardNumber}>03</span>
            <LockKeyhole />
            <h3>Sicher bestellt</h3>
            <p>
              Den Gesamtpreis siehst du im Checkout vor der verschlüsselten
              Zahlung über Stripe – ohne Pflichtkonto.
            </p>
          </article>
        </div>
      </section>

      <section className={styles.shipping} id="versand">
        <div className={styles.shippingVisual}>
          <Image
            src="/shipping/dhl.svg"
            alt="DHL"
            width={164}
            height={36}
            unoptimized
          />
          <div className={styles.clockFace}>
            <strong>10</strong>
            <span>
              Minuten
              <br />
              geprägt &amp;
              <br />
              versandfertig
            </span>
          </div>
          <div className={styles.pickupLabel}>
            <span>DHL-Abholung: 3× an Werktagen</span>
          </div>
        </div>
        <div className={styles.shippingCopy}>
          <p className={styles.kicker}>
            <span /> Fertigung und DHL-Versand
          </p>
          <h2>
            Schnell gefertigt.
            <br />
            <em>Mit DHL auf dem Weg zu dir.</em>
          </h2>
          <p>
            Nach deiner Bestellung werden deine Kennzeichen geprägt und für den
            Versand vorbereitet. DHL holt an Werktagen dreimal täglich ab.
            Sobald deine Sendung auf dem Weg ist, kannst du ihren Status über
            die Sendungsverfolgung prüfen.
          </p>
          <ol>
            <li>
              <b>1</b>
              <div>
                <strong>Bestellung geprüft</strong>
                <span>Kombination und Ausführung werden übernommen.</span>
              </div>
            </li>
            <li>
              <b>2</b>
              <div>
                <strong>In 10 Minuten geprägt und versandfertig</strong>
                <span>Deine Schilder werden geprägt und für DHL vorbereitet.</span>
              </div>
            </li>
            <li>
              <b>3</b>
              <div>
                <strong>An DHL übergeben</strong>
                <span>DHL holt an Werktagen dreimal täglich ab. Den Sendungsstatus kannst du über den Link in deiner E-Mail prüfen.</span>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className={styles.customerReference} aria-labelledby="kundenreferenz-titel">
        <div className={styles.customerReferenceCopy}>
          <p className={styles.kicker}>
            <span /> Kundenreferenz
          </p>
          <h2 id="kundenreferenz-titel">Bestellung am nächsten Tag erhalten.</h2>
          <p>
            Frisch geprägt, sicher verpackt und schon am nächsten Tag beim
            Kunden: Dieses Foto zeigt eine einzelne Bestellung nach der
            Zustellung. Die zugesagte Lieferzeit innerhalb Deutschlands beträgt
            1–4 Werktage nach Bestellung und erfolgreicher Zahlung.
          </p>
        </div>
        <figure className={styles.customerReferencePhoto}>
          <Image
            src="/references/kennzeichen-kundenfoto-naechster-tag.jpg"
            alt="Kundenfoto eines gelieferten Kennzeichens auf der Versandverpackung"
            width={1080}
            height={1920}
            sizes="(max-width: 820px) 100vw, 420px"
          />
          <figcaption>Foto einer Kundenbestellung</figcaption>
        </figure>
      </section>

      <section className={styles.included}>
        <div>
          <p className={styles.kicker}>
            <span /> Dein Paket. Klarer Lieferumfang.
          </p>
          <h2>
            Alles dabei.
            <br />
            <em>Direkt zu dir.</em>
          </h2>
          <p className={styles.includedPrice}>{isHerbst ? `Komplett-Set für ${formatPrice(herbstSetPriceCents('black', offerNow) / 100)} · inkl. MwSt. und Versand` : 'Kennzeichen ab 6,90 € pro Schild · inkl. MwSt.'}</p>
        </div>
        <ul>
          <li>
            <CheckCircle2 />
            <span>
              <strong>{isHerbst && totalPlates === 3 ? 'Drei Kennzeichen' : quantity === 1 ? 'Ein Kennzeichen' : 'Zwei Kennzeichen'}</strong>
              {plateType === 'motorcycle' ? 'für dein Motorrad' : 'für dein Fahrzeug'}
            </span>
          </li>
          <li>
            <CheckCircle2 />
            <span>
              <strong>DIN-zertifizierte Fertigung</strong>für TÜV und
              Zulassungsstelle
            </span>
          </li>
          <li>
            <CheckCircle2 />
            <span>
              <strong>DHL-Versand mit Tracking</strong>{isHerbst ? '3,90 € bei weniger als 3 Schildern, ab 3 Schildern kostenlos' : '3,90 € pro Bestellung, kostenlos ab 19 € Warenwert'}
            </span>
          </li>
          <li>
            <CheckCircle2 />
            <span>
              <strong>Mehrwertsteuer inklusive</strong>keine versteckten Kosten
            </span>
          </li>
        </ul>
        <a href={configuratorHref} className={styles.secondaryCta}>
          Kennzeichen konfigurieren <ArrowRight />
        </a>
      </section>

      <section
        className={styles.registrationSteps}
        aria-labelledby="zulassungsbereit"
      >
        <div className={styles.registrationHeading}>
          <p className={styles.kicker}>
            <span /> In drei einfachen Schritten
          </p>
          <h2 id="zulassungsbereit">
            Bereit für die
            <br />
            <em>Zulassungsstelle.</em>
          </h2>
          <p>
            Bestelle deine DIN-zertifizierten Kennzeichen bequem online und
            spare dir das Warten beim Schilderdienst vor Ort.
          </p>
        </div>

        <div className={styles.registrationGrid}>
          <article>
            <span className={styles.registrationNumber}>01</span>
            <span className={styles.registrationIcon}>
              <CarFront />
            </span>
            <h3>Kennzeichen online bestellen</h3>
            <p>
              Wunschkombination eingeben, Kennzeichenart auswählen und sicher
              online bestellen.
            </p>
          </article>
          <article>
            <span className={styles.registrationNumber}>02</span>
            <span className={styles.registrationIcon}>
              <PackageCheck />
            </span>
            <h3>Kennzeichen erhalten</h3>
            <p>
              Nach der Übergabe an DHL kannst du den Transport verfolgen. Die
              Zustellung übernimmt DHL.
            </p>
          </article>
          <article>
            <span className={styles.registrationNumber}>03</span>
            <span className={styles.registrationIcon}>
              <MapPinCheck />
            </span>
            <h3>Zur Zulassungsstelle fahren</h3>
            <p>
              Nimm deine Kennzeichen und Unterlagen mit. Die amtlichen Plaketten
              werden bei der Zulassung angebracht.
            </p>
          </article>
        </div>

        <a href={configuratorHref} className={styles.registrationCta}>
          Kennzeichen jetzt konfigurieren <ArrowRight />
        </a>
      </section>

      <section className={styles.faq} id="fragen">
        <div className={styles.sectionHeading}>
          <p className={styles.kicker}>
            <span /> Vor der Bestellung
          </p>
          <h2>
            Die wichtigsten
            <br />
            Antworten.
          </h2>
        </div>
        <div className={styles.faqList}>
          {FAQS.map(([question, answer], index) => (
            <details key={question} open={index === 0}>
              <summary>
                {question}
                <span>+</span>
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className={styles.finalCta}>
        <BadgeCheck />
        <p>DIN-zertifiziert · in 10 Minuten geprägt und versandfertig</p>
        <h2>
          Dein Kennzeichen wartet
          <br />
          auf deine Kombination.
        </h2>
        <p className={styles.finalPrice}>{isHerbst ? `3 Kennzeichen im Komplett-Set für ${formatPrice(herbstSetPriceCents('black', offerNow) / 100)}` : 'Kennzeichen ab 6,90 € pro Schild'}</p>
        <a href={configuratorHref}>
          Jetzt Kennzeichen konfigurieren <ArrowRight />
        </a>
        <small>{isHerbst ? 'inkl. 19 % MwSt. · ab 3 Schildern versandkostenfrei · Tracking per E-Mail' : 'inkl. 19 % MwSt. · 3,90 € Versand, kostenlos ab 19 € Warenwert · Tracking per E-Mail'}</small>
      </section>

      <footer className={styles.footer}>
        <Link href="/" className={styles.footerLogo}>
          <Image
            src="/kennzeichen-lieferung-logo-transparent.png"
            alt="kennzeichen-lieferung.de"
            width={2172}
            height={724}
          />
        </Link>
        <p>DIN-zertifizierte Kennzeichen. In 10 Minuten geprägt und versandfertig.</p>
      </footer>

      {(!isHerbst || offerConfiguratorOpen) && <div className={styles.mobileBar}>
        <div>
          <span>
            {isHerbst ? selectedPackage : `${quantity} ${quantity === 1 ? 'Schild' : 'Schilder'}`} · Gesamt inkl. Versand
          </span>
          <strong>{isHerbst ? formatPrice(total) : `Jetzt ${formatPrice(total)}`}</strong>
        </div>
        {isHerbst ? <button type="button" onClick={() => valid && validSeason ? checkout() : document.getElementById('konfigurator')?.scrollIntoView({ behavior: 'smooth' })}>
          Jetzt bestellen <ArrowRight />
        </button> : <a href="#konfigurator">
          Konfigurieren <ArrowRight />
        </a>}
      </div>}

    </main>
  );
}
