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
import {
  formatPrice,
  getPackagePrice,
  isValidPlate,
  PRODUCTS,
  SHIPPING_PRICE,
  type PlateType,
} from '@/config/products';
import { CONSENT_STORAGE_KEY, parseConsentRecord } from '@/lib/cookie-consent';
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

export function KennzeichenLandingPage() {
  const router = useRouter();
  const [plateType, setPlateType] = useState<PlateType>('standard');
  const [city, setCity] = useState('');
  const [letters, setLetters] = useState('');
  const [numbers, setNumbers] = useState('');
  const inputStarted = useRef(false);
  const validTracked = useRef(false);
  const quantity: 1 | 2 = plateType === 'motorcycle' ? 1 : 2;
  const plateValue = `${city} ${letters} ${numbers}`;
  const valid = useMemo(
    () => isValidPlate(plateValue, plateType),
    [plateValue, plateType],
  );
  const total = getPackagePrice(plateType, 'black', quantity) + SHIPPING_PRICE;
  const offerPrice = formatPrice(total);
  const product = PRODUCTS[plateType];

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
          Kennzeichen konfigurieren
        </a>
      </header>

      <section className={styles.hero} id="bestellen">
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>
            <span /> DIN-zertifiziert & schnell geprägt
          </p>
          <h1>
            Dein Kennzeichen.
            <br />
            <em>In 10 Minuten geprägt und versandfertig.</em>
          </h1>
          <p className={styles.heroOffer}>
            <span>Jetzt im Angebot</span>
            <del>14,99 €</del>
            <strong>{offerPrice}</strong>
            <small>inkl. DHL-Versand</small>
          </p>
          <p className={styles.lead}>
            Kennzeichen online konfigurieren, sicher bestellen und bequem
            liefern lassen. DHL holt an Werktagen dreimal täglich bei unserem
            Druckwerk ab.
          </p>
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
          </ul>
          <a className={styles.heroCta} href="#konfigurator">
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

        <div className={styles.orderCard} id="konfigurator">
          <div className={styles.cardTopline}>
            <span>Direkt konfigurieren</span>
            <strong>
              {quantity} {quantity === 1 ? 'Schild' : 'Schilder'} · inkl. Versand
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
              <strong className={styles.summaryPrice}>
                <del>14,99 €</del> {offerPrice}
              </strong>
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
                Weiter zur Bestellübersicht <ArrowRight />
              </>
            ) : (
              'Kennzeichen eingeben'
            )}
          </button>
          <p className={styles.checkoutNote}>
            <LockKeyhole /> {offerPrice} inkl. Versand · Zahlung im nächsten Schritt · kein Konto nötig
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
          <a href="#konfigurator">
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
          <p className={styles.includedPrice}>Jetzt im Angebot für {offerPrice} inkl. DHL-Versand</p>
        </div>
        <ul>
          <li>
            <CheckCircle2 />
            <span>
              <strong>{quantity === 1 ? 'Ein Kennzeichen' : 'Zwei Kennzeichen'}</strong>
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

        <a href="#konfigurator" className={styles.registrationCta}>
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
        <p className={styles.finalPrice}>Jetzt im Angebot: {offerPrice} inkl. DHL-Versand</p>
        <a href="#konfigurator">
          Jetzt Kennzeichen konfigurieren <ArrowRight />
        </a>
        <small>{quantity} {quantity === 1 ? 'Schild' : 'Schilder'} · DHL-Versand inklusive · Tracking per E-Mail</small>
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

      <div className={styles.mobileBar}>
        <div>
          <span>
            {quantity} {quantity === 1 ? 'Schild' : 'Schilder'} inkl. Versand
          </span>
          <strong>Jetzt {offerPrice}</strong>
        </div>
        <a href="#konfigurator">
          Konfigurieren <ArrowRight />
        </a>
      </div>

    </main>
  );
}
