'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Check,
  CheckCircle2,
  KeyRound,
  LockKeyhole,
  PackageCheck,
  ShieldCheck,
  Tag,
  Truck,
  Zap,
} from 'lucide-react';
import { LicensePlate } from '@/components/license-plate';
import { PaymentLogos } from '@/components/payment-logos';
import {
  formatPrice,
  getPackagePrice,
  isSinglePlateProduct,
  isValidPlate,
  PRODUCTS,
  SHIPPING_PRICE,
  type PlateType,
} from '@/config/products';
import {
  getPickupCountdown,
  type PickupCountdown,
} from '@/lib/pickup-countdown';
import styles from './page.module.css';

const DEALER_TYPES: PlateType[] = [
  'standard',
  'electric',
  'historic',
  'season',
  'motorcycle',
];

const FAQS = [
  [
    'Wie funktionieren die Händlerkonditionen?',
    'Du erhältst von uns einen persönlichen Promo-Code. Gib ihn im Händler-Konfigurator ein; die hinterlegte Kondition wird im Checkout geprüft und direkt auf den Gesamtbetrag angewendet.',
  ],
  [
    'Wie schnell werden die Kennzeichen produziert?',
    'Der Auftrag geht nach der Bestellung direkt in die Fertigung. Die Kennzeichen sind innerhalb von 10 Minuten druck- und versandfertig.',
  ],
  [
    'Wann holt DHL die Sendungen ab?',
    'DHL holt werktäglich dreimal im Druckwerk ab: um 9, 12 und 16 Uhr. Der Live-Countdown zeigt dir die nächste mögliche Abholung.',
  ],
  [
    'Sind die Kennzeichen für die Zulassungsstelle geeignet?',
    'Ja. Die Kennzeichen sind nach DIN 74069 gefertigt und für TÜV und Zulassungsstelle geeignet. Amtliche Plaketten bringt ausschließlich die Zulassungsstelle an.',
  ],
];

export function AutohaendlerPartnerPage() {
  const router = useRouter();
  const [plateType, setPlateType] = useState<PlateType>('standard');
  const [city, setCity] = useState('');
  const [letters, setLetters] = useState('');
  const [numbers, setNumbers] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [pickup, setPickup] = useState<PickupCountdown | null>(null);
  const plateValue = `${city} ${letters} ${numbers}`;
  const valid = useMemo(
    () => isValidPlate(plateValue, plateType),
    [plateValue, plateType],
  );
  const quantity: 1 | 2 = isSinglePlateProduct(plateType) ? 1 : 2;
  const total = getPackagePrice(plateType, 'black', quantity) + SHIPPING_PRICE;

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
      quantity: String(quantity),
      color: 'black',
      source: 'autohaendlerpartner',
    });
    if (promoCode.trim()) params.set('promo', promoCode.trim().toUpperCase());
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
        <span className={styles.partnerLabel}>
          <Building2 /> Autohändler-Partner
        </span>
        <a href="#bestellen" className={styles.headerCta}>
          Direkt bestellen
        </a>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>
            <span /> Kennzeichen-Service für Autohändler
          </p>
          <h1>
            Kennzeichen bestellen.
            <br />
            <em>Ohne Umwege.</em>
          </h1>
          <p className={styles.lead}>
            Kombination eingeben, Händlercode verwenden und direkt bestellen.
            Dein Auftrag geht sofort in die Fertigung.
          </p>
          <div className={styles.heroPoints}>
            <span>
              <Check /> Persönliche Partnerkonditionen
            </span>
            <span>
              <Check /> In 10 Minuten versandfertig
            </span>
            <span>
              <Check /> Kein Händlerkonto erforderlich
            </span>
          </div>

          <div className={styles.heroCountdown} aria-live="polite">
            <span className={styles.countdownIcon}>
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

        <div className={styles.orderCard} id="bestellen">
          <div className={styles.cardHeading}>
            <div>
              <small>Schnellbestellung</small>
              <strong>Kennzeichen konfigurieren</strong>
            </div>
            <span>
              {quantity} {quantity === 1 ? 'Schild' : 'Schilder'} ·{' '}
              {formatPrice(total)}
            </span>
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
          <p className={`${styles.validation} ${valid ? styles.valid : ''}`}>
            {valid ? (
              <>
                <CheckCircle2 /> Kombination ist bereit
              </>
            ) : (
              'Ortskürzel · Buchstaben · Zahlen eingeben'
            )}
          </p>

          <div className={styles.typeGrid} aria-label="Kennzeichenart">
            {DEALER_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                className={plateType === type ? styles.selected : ''}
                onClick={() => setPlateType(type)}
              >
                <strong>
                  {type === 'standard'
                    ? 'A'
                    : type === 'electric'
                      ? 'E'
                      : type === 'historic'
                        ? 'H'
                        : type === 'season'
                          ? '04–10'
                          : 'M'}
                </strong>
                <span>{PRODUCTS[type].shortLabel}</span>
              </button>
            ))}
          </div>

          <label className={styles.promoField}>
            <span>
              <KeyRound /> Persönlicher Händlercode
            </span>
            <div>
              <input
                value={promoCode}
                onChange={(event) =>
                  setPromoCode(
                    event.target.value
                      .toUpperCase()
                      .replace(/[^A-Z0-9_-]/g, '')
                      .slice(0, 64),
                  )
                }
                placeholder="PROMO-CODE EINGEBEN"
                autoComplete="off"
              />
              <Tag />
            </div>
            <small>
              Deine exklusive Kondition wird im Checkout geprüft und angezeigt.
            </small>
          </label>

          <div className={styles.summary}>
            <span>
              {quantity} × {PRODUCTS[plateType].label} · Versand inklusive
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
                Zum Händler-Checkout <ArrowRight />
              </>
            ) : (
              'Kennzeichen eingeben'
            )}
          </button>
          <p className={styles.secureNote}>
            <LockKeyhole /> Sicher über Stripe · Bestellung als Gast möglich
          </p>
          <div className={styles.payments}>
            <PaymentLogos />
          </div>
        </div>
      </section>

      <section className={styles.trustBar} aria-label="Händlervorteile">
        <div>
          <Zap />
          <span>
            <strong>Direkt in die Fertigung</strong>ohne unnötige
            Zwischenschritte
          </span>
        </div>
        <div>
          <BadgeCheck />
          <span>
            <strong>DIN-zertifiziert</strong>für TÜV und Zulassungsstelle
          </span>
        </div>
        <div>
          <PackageCheck />
          <span>
            <strong>DHL mit Tracking</strong>dreimal täglich abgeholt
          </span>
        </div>
        <div>
          <ShieldCheck />
          <span>
            <strong>Partnerkonditionen</strong>per persönlichem Promo-Code
          </span>
        </div>
      </section>

      <section className={styles.shippingSection}>
        <div className={styles.sectionCopy}>
          <p className={styles.kicker}>
            <span /> Planbar im Händleralltag
          </p>
          <h2>
            Drei DHL-Abholungen.
            <br />
            <em>Jeden Werktag.</em>
          </h2>
          <p>
            Bestellungen gehen sofort ins Druckwerk und sind innerhalb von 10
            Minuten versandfertig. Der Countdown zeigt dir die nächste mögliche
            Übergabe an DHL.
          </p>
        </div>
        <div className={styles.shippingPanel}>
          <div className={styles.bigCountdown}>
            <small>Nächste Abholung in</small>
            <time>{pickup?.remaining ?? '--:--:--'}</time>
            <strong>
              {pickup
                ? `${pickup.dayLabel} · ${pickup.pickupTime} Uhr`
                : 'Wird berechnet'}
            </strong>
          </div>
          <div className={styles.pickupTimes}>
            <span>
              <b>09:00</b>Frühe Tour
            </span>
            <span>
              <b>12:00</b>Mittagstour
            </span>
            <span>
              <b>16:00</b>Nachmittagstour
            </span>
          </div>
        </div>
      </section>

      <section className={styles.workflow}>
        <div className={styles.workflowHeading}>
          <p className={styles.kicker}>
            <span /> Weniger Aufwand
          </p>
          <h2>Bestellt in drei kurzen Schritten.</h2>
        </div>
        <div className={styles.steps}>
          <article>
            <b>01</b>
            <h3>Kombination eingeben</h3>
            <p>Kennzeichenart wählen und Eingabe direkt prüfen.</p>
          </article>
          <article>
            <b>02</b>
            <h3>Händlercode verwenden</h3>
            <p>
              Persönlichen Code eingeben und Kondition im Checkout erhalten.
            </p>
          </article>
          <article>
            <b>03</b>
            <h3>Sicher bestellen</h3>
            <p>Lieferadresse und Zahlung abschließen – fertig.</p>
          </article>
        </div>
        <a href="#bestellen">
          Händlerbestellung starten <ArrowRight />
        </a>
      </section>

      <section className={styles.faq}>
        <div className={styles.workflowHeading}>
          <p className={styles.kicker}>
            <span /> Kurz erklärt
          </p>
          <h2>Häufige Händlerfragen.</h2>
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
        <Building2 />
        <p>Exklusiv für Autohändler-Partner</p>
        <h2>Bereit für die nächste Zulassung?</h2>
        <a href="#bestellen">
          Kennzeichen konfigurieren <ArrowRight />
        </a>
      </section>

      <footer className={styles.footer}>
        <Link href="/">
          <Image
            src="/kennzeichen-lieferung-logo-transparent.png"
            alt="kennzeichen-lieferung.de"
            width={2172}
            height={724}
          />
        </Link>
        <p>DIN-zertifiziert. Schnell produziert. Planbar geliefert.</p>
      </footer>

      <div className={styles.mobileBar}>
        <div>
          <span>Nächste DHL-Abholung</span>
          <strong>{pickup?.remaining ?? '--:--:--'}</strong>
        </div>
        <a href="#bestellen">
          Bestellen <ArrowRight />
        </a>
      </div>
    </main>
  );
}
