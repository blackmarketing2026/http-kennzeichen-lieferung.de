'use client';

import { useEffect, useMemo, useState } from 'react';
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
  Leaf,
  LockKeyhole,
  MapPinCheck,
  PackageCheck,
  ShieldCheck,
  Tractor,
  Truck,
  UsersRound,
} from 'lucide-react';
import { LicensePlate } from '@/components/license-plate';
import { PaymentLogos } from '@/components/payment-logos';
import {
  formatPrice,
  getUnitPrice,
  isValidPlate,
  PRODUCTS,
  SHIPPING_PRICE,
  type PlateColor,
  type PlateType,
} from '@/config/products';
import {
  getPickupCountdown,
  type PickupCountdown,
} from '@/lib/pickup-countdown';
import styles from './page.module.css';

const FORMATS: Array<{
  type: Extract<PlateType, 'agriculture240' | 'agriculture255'>;
  productIdBlack: number;
  productIdGreen: number;
}> = [
  { type: 'agriculture240', productIdBlack: 62, productIdGreen: 111 },
  { type: 'agriculture255', productIdBlack: 63, productIdGreen: 112 },
];

const FAQS = [
  [
    'Sind die Kennzeichen ausschließlich für Traktoren?',
    'Nein. Der Produktkatalog führt sie als kleine, zweizeilige Kfz-Kennzeichen. Die Formate eignen sich je nach behördlicher Zuteilung unter anderem für Traktoren und andere Landmaschinen. Entscheidend sind deine Fahrzeugpapiere und die Vorgaben der Zulassungsstelle.',
  ],
  [
    'Darf ich ein grünes Kennzeichen bestellen?',
    'Du kannst die grüne Ausführung bestellen, wenn sie für dein Fahrzeug vorgesehen ist. Ein grünes Schild allein begründet keine Steuerbefreiung. Die Voraussetzungen und die Zuteilung prüft die zuständige Behörde.',
  ],
  [
    'Welches Format soll ich wählen?',
    'Zur Auswahl stehen 240 × 130 mm und 255 × 130 mm, jeweils zweizeilig mit verkleinerter Schrift. Prüfe vor der Bestellung deine Fahrzeugpapiere, den vorhandenen Kennzeichenhalter oder die Vorgabe deiner Zulassungsstelle.',
  ],
  [
    'Wie schnell wird mein Kennzeichen versendet?',
    'Nach der Bestellung wird dein Kennzeichen innerhalb von 10 Minuten druck- und versandfertig gemacht. DHL holt im Druckwerk dreimal werktäglich um 9, 12 und 16 Uhr ab.',
  ],
  [
    'Bekomme ich eine Sendungsverfolgung?',
    'Ja. Sobald die Tracking-ID erstellt wurde, erhältst du sie automatisch per E-Mail und kannst den Versandstatus live verfolgen.',
  ],
];

export function LandmaschinenLandingPage() {
  const router = useRouter();
  const [plateType, setPlateType] =
    useState<Extract<PlateType, 'agriculture240' | 'agriculture255'>>(
      'agriculture240',
    );
  const [plateColor, setPlateColor] =
    useState<Extract<PlateColor, 'black' | 'green'>>('green');
  const [city, setCity] = useState('');
  const [letters, setLetters] = useState('');
  const [numbers, setNumbers] = useState('');
  const [pickup, setPickup] = useState<PickupCountdown | null>(null);
  const plateValue = `${city} ${letters} ${numbers}`;
  const valid = useMemo(
    () => isValidPlate(plateValue, plateType),
    [plateValue, plateType],
  );
  const total = getUnitPrice(plateType, plateColor, 1) + SHIPPING_PRICE;
  const product = PRODUCTS[plateType];

  useEffect(() => {
    const update = () => setPickup(getPickupCountdown(new Date()));
    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, []);

  function updateCity(value: string) {
    setCity(
      value
        .toUpperCase()
        .replace(/[^A-ZÄÖÜ]/g, '')
        .slice(0, 3),
    );
  }

  function updateLetters(value: string) {
    setLetters(
      value
        .toUpperCase()
        .replace(/[^A-Z]/g, '')
        .slice(0, 2),
    );
  }

  function updateNumbers(value: string) {
    setNumbers(value.replace(/\D/g, '').replace(/^0+/, '').slice(0, 4));
  }

  function checkout() {
    if (!valid) return;
    const params = new URLSearchParams({
      plate: plateValue,
      type: plateType,
      quantity: '1',
      color: plateColor,
    });
    router.push(`/checkout?${params.toString()}`);
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.logo} aria-label="Startseite">
          <Image
            src="/kennzeichen-lieferung-logo.png"
            alt="kennzeichen-lieferung.de"
            width={2172}
            height={724}
            priority
          />
        </Link>
        <nav aria-label="Seitennavigation">
          <a href="#formate">Formate</a>
          <a href="#qualitaet">Qualität</a>
          <a href="#fragen">FAQ</a>
        </nav>
        <a href="#konfigurator" className={styles.headerCta}>
          Jetzt konfigurieren
        </a>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>
            <span /> Für Traktor &amp; Landmaschine
          </p>
          <h1>
            Landmaschinen-
            <br />
            <em>Kennzeichen.</em>
          </h1>
          <p className={styles.lead}>
            Kleine zweizeilige Kennzeichen in <strong>Schwarz oder Grün</strong>{' '}
            – DIN-zertifiziert und innerhalb von 10 Minuten versandfertig.
          </p>
          <ul>
            <li>
              <BadgeCheck /> Für TÜV und Zulassungsstelle geeignet
            </li>
            <li>
              <Factory /> Sofort nach Bestellung in die Fertigung
            </li>
            <li>
              <Truck /> Dreimal täglich DHL-Abholung mit Tracking
            </li>
          </ul>
          <div className={styles.customerProof}>
            <UsersRound />
            <span>
              <strong>Über 1.000 zufriedene Kunden</strong>
              haben bereits bei uns bestellt
            </span>
          </div>
        </div>

        <div className={styles.configurator} id="konfigurator">
          <div className={styles.configTopline}>
            <span>Traktor-Live-Vorschau</span>
            <strong>1 Schild · {formatPrice(total)}</strong>
          </div>
          <div className={styles.tractorStage}>
            <Image
              src="/landmaschinen/traktor-live-vorschau.png"
              alt="Grüner Traktor mit Live-Vorschau des Kennzeichens"
              width={1536}
              height={1024}
              priority
            />
            <LicensePlate
              value={plateValue}
              type={plateType}
              color={plateColor}
              className={styles.tractorPlate}
            />
            <span className={styles.liveBadge}>
              <i /> Live
            </span>
          </div>

          <div className={styles.fields}>
            <label>
              <span>Ort</span>
              <input
                aria-label="Ortskürzel"
                value={city}
                onChange={(event) => updateCity(event.target.value)}
                placeholder="OL"
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
                placeholder="SJ"
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
                placeholder="155"
                maxLength={4}
                inputMode="numeric"
                autoComplete="off"
              />
            </label>
          </div>
          <p className={`${styles.validation} ${valid ? styles.valid : ''}`}>
            {valid ? (
              <>
                <CheckCircle2 /> Kombination passt zum gewählten Format
              </>
            ) : (
              'Ortskürzel · Buchstaben · Zahlen eingeben'
            )}
          </p>

          <div className={styles.choices}>
            <fieldset>
              <legend>Größe</legend>
              <div className={styles.optionRow}>
                {FORMATS.map((format) => (
                  <button
                    key={format.type}
                    type="button"
                    className={plateType === format.type ? styles.selected : ''}
                    onClick={() => setPlateType(format.type)}
                  >
                    <strong>{PRODUCTS[format.type].size}</strong>
                    <span>Zweizeilig</span>
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend>Schriftfarbe</legend>
              <div className={styles.optionRow}>
                <button
                  type="button"
                  className={plateColor === 'black' ? styles.selected : ''}
                  onClick={() => setPlateColor('black')}
                >
                  <i className={styles.blackSwatch} />
                  <strong>Schwarz</strong>
                </button>
                <button
                  type="button"
                  className={plateColor === 'green' ? styles.selected : ''}
                  onClick={() => setPlateColor('green')}
                >
                  <i className={styles.greenSwatch} />
                  <strong>Grün</strong>
                </button>
              </div>
            </fieldset>
          </div>

          <div className={styles.orderSummary}>
            <span>
              1 × {product.size}, {plateColor === 'green' ? 'grün' : 'schwarz'}
            </span>
            <strong>{formatPrice(total)}</strong>
          </div>
          <button
            type="button"
            className={styles.orderButton}
            disabled={!valid}
            onClick={checkout}
          >
            {valid ? (
              <>
                Für {formatPrice(total)} bestellen <ArrowRight />
              </>
            ) : (
              'Kennzeichen eingeben'
            )}
          </button>
          <p className={styles.secureNote}>
            <LockKeyhole /> Sicherer Checkout · DHL-Versand inklusive
          </p>
          <div className={styles.payments}>
            <PaymentLogos />
          </div>
        </div>
      </section>

      <section className={styles.trustBar} aria-label="Produktvorteile">
        <div>
          <Clock3 />
          <span>
            <strong>10 Minuten</strong>bis versandfertig
          </span>
        </div>
        <div>
          <PackageCheck />
          <span>
            <strong>3× täglich</strong>DHL-Abholung
          </span>
        </div>
        <div>
          <ShieldCheck />
          <span>
            <strong>DIN-zertifiziert</strong>für die Zulassungsstelle
          </span>
        </div>
        <div>
          <MapPinCheck />
          <span>
            <strong>Mit Tracking</strong>automatisch per E-Mail
          </span>
        </div>
      </section>

      <section className={styles.formatSection} id="formate">
        <div className={styles.sectionHeading}>
          <p className={styles.kicker}>
            <span /> Zwei kompakte Formate
          </p>
          <h2>
            Passend für kleine
            <br />
            <em>Montageflächen.</em>
          </h2>
          <p>
            Beide Ausführungen sind zweizeilig und nutzen verkleinerte Schrift.
            Wähle die Größe passend zur behördlichen Zuteilung und zum
            Kennzeichenhalter deiner Landmaschine.
          </p>
        </div>
        <div className={styles.formatCards}>
          {FORMATS.map((format) => (
            <article key={format.type}>
              <span className={styles.formatIcon}>
                <Tractor />
              </span>
              <h3>{PRODUCTS[format.type].size}</h3>
              <p>Zweizeilig · verkleinerte Schrift</p>
              <dl>
                <div>
                  <dt>Schwarz</dt>
                  <dd>Produkt-ID {format.productIdBlack}</dd>
                </div>
                <div>
                  <dt>Grün</dt>
                  <dd>Produkt-ID {format.productIdGreen}</dd>
                </div>
              </dl>
              <button type="button" onClick={() => setPlateType(format.type)}>
                Format auswählen <ArrowRight />
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.greenInfo} id="qualitaet">
        <div className={styles.greenVisual}>
          <Leaf />
          <strong>GRÜN</strong>
          <span>als wählbare Schriftfarbe</span>
        </div>
        <div>
          <p className={styles.kicker}>
            <span /> Schwarz oder Grün
          </p>
          <h2>Du wählst die passende Ausführung.</h2>
          <p>
            Die grüne Schrift ist für Fahrzeuge vorgesehen, denen ein grünes
            Kennzeichen behördlich zugeteilt wird. Die Auswahl im Shop ersetzt
            weder die Prüfung einer Steuerbefreiung noch die Zuteilung durch die
            Zulassungsstelle.
          </p>
          <ul>
            <li>
              <Check /> Schwarze oder grüne Schrift direkt auswählbar
            </li>
            <li>
              <Check /> DIN-Norm-Stempel auf dem gefertigten Schild
            </li>
            <li>
              <Check /> Reflektierender Aluminiumrohling
            </li>
          </ul>
          <a href="#konfigurator">
            Kennzeichen konfigurieren <ArrowRight />
          </a>
        </div>
      </section>

      <section className={styles.production}>
        <div className={styles.productionCopy}>
          <p className={styles.kicker}>
            <span /> Direkt in die Fertigung
          </p>
          <h2>
            Bestellt. Geprägt.
            <br />
            <em>Von DHL abgeholt.</em>
          </h2>
          <p>
            Nach deiner Bestellung geht der Auftrag sofort ins Druckwerk. Dein
            Kennzeichen ist innerhalb von 10 Minuten druck- und versandfertig.
          </p>
        </div>
        <ol>
          <li>
            <b>1</b>
            <span>
              <strong>Auftrag geprüft</strong>Kombination, Größe und
              Schriftfarbe
            </span>
          </li>
          <li>
            <b>2</b>
            <span>
              <strong>In 10 Minuten gefertigt</strong>Geprägt und sicher
              verpackt
            </span>
          </li>
          <li>
            <b>3</b>
            <span>
              <strong>Dreimal täglich an DHL</strong>Abholung um 9, 12 und 16
              Uhr
            </span>
          </li>
        </ol>
        <div className={styles.pickupCard}>
          <Truck />
          <span>Nächste DHL-Abholung</span>
          <strong>
            {pickup
              ? `${pickup.dayLabel} um ${pickup.pickupTime}`
              : 'Wird berechnet'}
          </strong>
          <time>{pickup?.remaining ?? '--:--:--'}</time>
        </div>
      </section>

      <section className={styles.registration}>
        <div className={styles.sectionHeading}>
          <p className={styles.kicker}>
            <span /> Bereit für die Zulassungsstelle
          </p>
          <h2>In drei einfachen Schritten.</h2>
        </div>
        <div className={styles.steps}>
          <article>
            <b>01</b>
            <Tractor />
            <h3>Online bestellen</h3>
            <p>Kombination, Größe und Schriftfarbe auswählen.</p>
          </article>
          <article>
            <b>02</b>
            <PackageCheck />
            <h3>Kennzeichen erhalten</h3>
            <p>Per DHL inklusive Tracking zu dir geliefert.</p>
          </article>
          <article>
            <b>03</b>
            <MapPinCheck />
            <h3>Fahrzeug zulassen</h3>
            <p>Schilder und Unterlagen zur Zulassungsstelle mitnehmen.</p>
          </article>
        </div>
        <a href="#konfigurator" className={styles.stepsCta}>
          Jetzt konfigurieren <ArrowRight />
        </a>
      </section>

      <section className={styles.faq} id="fragen">
        <div className={styles.sectionHeading}>
          <p className={styles.kicker}>
            <span /> Vor der Bestellung
          </p>
          <h2>Häufige Fragen.</h2>
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
        <Tractor />
        <p>DIN-zertifiziert · in 10 Minuten versandfertig</p>
        <h2>
          Dein Landmaschinen-Kennzeichen.
          <br />
          Direkt online konfiguriert.
        </h2>
        <a href="#konfigurator">
          Jetzt für {formatPrice(total)} bestellen <ArrowRight />
        </a>
        <small>1 Schild · DHL-Versand inklusive · Tracking per E-Mail</small>
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
          <span>1 Schild inkl. Versand</span>
          <strong>{formatPrice(total)}</strong>
        </div>
        <a href="#konfigurator">
          Konfigurieren <ArrowRight />
        </a>
      </div>
    </main>
  );
}
