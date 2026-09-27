'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  BadgeCheck,
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
} from 'lucide-react';
import { LicensePlate } from '@/components/license-plate';
import { PaymentLogos } from '@/components/payment-logos';
import {
  formatPrice,
  getUnitPrice,
  isValidPlate,
  PRODUCTS,
  SHIPPING_PRICE,
  type PlateType,
} from '@/config/products';
import { CONSENT_STORAGE_KEY, parseConsentRecord } from '@/lib/cookie-consent';
import {
  getPickupCountdown,
  type PickupCountdown,
} from '@/lib/pickup-countdown';
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
    'Sind die Kennzeichen bei der Zulassungsstelle verwendbar?',
    'Ja. Die Kennzeichenschilder sind DIN-zertifiziert und für die Siegelung bei deutschen Zulassungsstellen vorgesehen. Amtliche Plaketten werden ausschließlich von der Zulassungsstelle angebracht.',
  ],
  [
    'Sind die Kennzeichen für den TÜV zugelassen?',
    'Ja. Die Schilder sind nach DIN 74069 gefertigt und für TÜV und Zulassungsstelle zugelassen.',
  ],
  [
    'Wie schnell werden die Schilder versendet?',
    'Deine Kennzeichen werden innerhalb von 10 Minuten nach der Bestellung druck- und versandfertig gemacht. DHL holt im Druckwerk dreimal täglich um 9, 12 und 16 Uhr ab.',
  ],
  [
    'Bekomme ich eine Sendungsverfolgung?',
    'Ja. Sobald DHL die Sendung übernommen hat, erhältst du deine Trackingnummer per E-Mail.',
  ],
  [
    'Reserviert ihr auch mein Wunschkennzeichen?',
    'Nein. Du bestellst hier die geprägten Schilder. Reservierung und Zulassung erfolgen separat bei deiner zuständigen Zulassungsstelle.',
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

export function KennzeichenLandingPage() {
  const router = useRouter();
  const [plateType, setPlateType] = useState<PlateType>('standard');
  const [city, setCity] = useState('');
  const [letters, setLetters] = useState('');
  const [numbers, setNumbers] = useState('');
  const [pickup, setPickup] = useState<PickupCountdown | null>(null);
  const inputStarted = useRef(false);
  const validTracked = useRef(false);
  const quantity: 1 | 2 = plateType === 'motorcycle' ? 1 : 2;
  const plateValue = `${city} ${letters} ${numbers}`;
  const valid = useMemo(
    () => isValidPlate(plateValue, plateType),
    [plateValue, plateType],
  );
  const total =
    getUnitPrice(plateType, 'black', quantity) * quantity + SHIPPING_PRICE;
  const product = PRODUCTS[plateType];

  useEffect(() => {
    const update = () => setPickup(getPickupCountdown(new Date()));
    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, []);

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
      landing_page: 'kennzeichen-bestellen',
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
    if (!valid) return;
    trackEvent('begin_checkout', {
      currency: 'EUR',
      value: total,
      landing_page: 'kennzeichen-bestellen',
      items: [{ item_id: plateType, item_name: product.label, quantity }],
    });
    const params = new URLSearchParams({
      plate: plateValue,
      type: plateType,
      quantity: String(quantity),
      color: 'black',
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
        <a className={styles.headerCta} href="#konfigurator">
          Jetzt bestellen
        </a>
      </header>

      <section className={styles.hero} id="bestellen">
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>
            <span /> DIN-zertifiziert & schnell versendet
          </p>
          <h1>
            Deine Kennzeichen.
            <br />
            <em>Heute versandfertig.</em>
          </h1>
          <p className={styles.lead}>
            Zwei hochwertige Autokennzeichen für <strong>29,90 €</strong> –
            inklusive DHL-Versand und Tracking.
          </p>
          <ul className={styles.heroChecks}>
            <li>
              <BadgeCheck /> DIN-zertifiziert nach DIN 74069
            </li>
            <li>
              <ShieldCheck /> Für TÜV und Zulassungsstelle zugelassen
            </li>
            <li>
              <Clock3 /> In 10 Minuten druck- und versandfertig
            </li>
          </ul>
          <div className={styles.deliveryPulse}>
            <span className={styles.deliveryIcon}>
              <Truck />
            </span>
            <div>
              <small>Nächste DHL-Abholung</small>
              <strong>
                {pickup
                  ? `${pickup.dayLabel} um ${pickup.pickupTime}`
                  : 'Wird berechnet'}
              </strong>
            </div>
            <time>{pickup?.remaining ?? '--:--:--'}</time>
          </div>
        </div>

        <div className={styles.orderCard} id="konfigurator">
          <div className={styles.cardTopline}>
            <span>Direkt konfigurieren</span>
            <strong>
              {quantity} {quantity === 1 ? 'Schild' : 'Schilder'} ·{' '}
              {formatPrice(total)}
            </strong>
          </div>
          <LicensePlate
            value={plateValue}
            type={plateType}
            color="black"
            className={styles.plate}
          />

          <div className={styles.fields}>
            <label>
              <span>Ort</span>
              <input
                aria-label="Ortskürzel"
                value={city}
                onChange={(event) => updateCity(event.target.value)}
                placeholder="B"
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
                placeholder="1234"
                maxLength={4}
                inputMode="numeric"
                autoComplete="off"
              />
            </label>
          </div>
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
                          ? '04–10'
                          : 'Moto'}
                </span>
                <small>{PRODUCTS[type].shortLabel}</small>
              </button>
            ))}
          </div>

          <div className={styles.summary}>
            <div>
              <span>
                {quantity} × {product.label}, {product.size}
              </span>
              <strong>{formatPrice(total)}</strong>
            </div>
            <div>
              <span>DHL-Versand mit Tracking</span>
              <strong>Inklusive</strong>
            </div>
          </div>
          <button
            className={styles.orderButton}
            type="button"
            onClick={checkout}
            disabled={!valid}
          >
            {valid ? (
              <>
                Für {formatPrice(total)} bestellen <ArrowRight />
              </>
            ) : (
              'Kennzeichen eingeben'
            )}
          </button>
          <p className={styles.checkoutNote}>
            <LockKeyhole /> Sicherer Checkout · kein Konto nötig
          </p>
          <div className={styles.paymentWrap}>
            <PaymentLogos />
          </div>
        </div>
      </section>

      <section className={styles.proofBar} aria-label="Produktvorteile">
        <div>
          <Factory />
          <span>
            <strong>10 Minuten</strong>Bis zur Versandbereitschaft
          </span>
        </div>
        <div>
          <PackageCheck />
          <span>
            <strong>3× täglich</strong>DHL-Abholung im Druckwerk
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
            <strong>Mit Tracking</strong>Sendungsnummer per E-Mail
          </span>
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
              Transparenter Gesamtpreis und verschlüsselte Zahlung über Stripe –
              ohne Pflichtkonto.
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
              Minuten bis
              <br />
              versandfertig
            </span>
          </div>
          <div className={styles.pickupTimes}>
            <span>09:00</span>
            <span>12:00</span>
            <span>16:00</span>
          </div>
        </div>
        <div className={styles.shippingCopy}>
          <p className={styles.kicker}>
            <span /> Drei Chancen pro Werktag
          </p>
          <h2>
            Bestellt. Geprägt.
            <br />
            <em>Von DHL abgeholt.</em>
          </h2>
          <p>
            Direkt nach der Bestellung geht dein Auftrag ins Druckwerk.
            Innerhalb von 10 Minuten sind die Kennzeichen druck- und
            versandfertig.
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
                <strong>Innerhalb von 10 Minuten gefertigt</strong>
                <span>Deine Schilder werden geprägt und verpackt.</span>
              </div>
            </li>
            <li>
              <b>3</b>
              <div>
                <strong>Dreimal täglich an DHL</strong>
                <span>
                  Abholung um 9, 12 und 16 Uhr; Trackingnummer per E-Mail.
                </span>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className={styles.included}>
        <div>
          <p className={styles.kicker}>
            <span /> Ein Preis. Klarer Lieferumfang.
          </p>
          <h2>
            Alles drin für
            <br />
            <em>29,90 €.</em>
          </h2>
        </div>
        <ul>
          <li>
            <CheckCircle2 />
            <span>
              <strong>Zwei Autokennzeichen</strong>für vorne und hinten
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
              <strong>DHL-Versand inklusive</strong>mit Trackingnummer
            </span>
          </li>
          <li>
            <CheckCircle2 />
            <span>
              <strong>Mehrwertsteuer inklusive</strong>keine versteckten Kosten
            </span>
          </li>
        </ul>
        <a href="#konfigurator" className={styles.secondaryCta}>
          Kennzeichen konfigurieren <ArrowRight />
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
        <p>DIN-zertifiziert · in 10 Minuten versandfertig</p>
        <h2>
          Dein Kennzeichen wartet
          <br />
          auf deine Kombination.
        </h2>
        <a href="#konfigurator">
          Jetzt für 29,90 € bestellen <ArrowRight />
        </a>
        <small>2 Schilder · DHL-Versand inklusive · Tracking per E-Mail</small>
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
        <p>DIN-zertifizierte Kennzeichen. Schnell geprägt. Sicher geliefert.</p>
      </footer>

      <div className={styles.mobileBar}>
        <div>
          <span>
            {quantity} {quantity === 1 ? 'Schild' : 'Schilder'} inkl. Versand
          </span>
          <strong>{formatPrice(total)}</strong>
        </div>
        <a href="#konfigurator">
          Konfigurieren <ArrowRight />
        </a>
      </div>
    </main>
  );
}
