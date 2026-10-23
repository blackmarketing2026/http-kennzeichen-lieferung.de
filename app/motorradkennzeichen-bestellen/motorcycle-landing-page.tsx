'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, BadgeCheck, CheckCircle2, LockKeyhole, Truck } from 'lucide-react';
import { LicensePlate } from '@/components/license-plate';
import { PaymentLogos } from '@/components/payment-logos';
import { SeoBreadcrumbs } from '@/components/seo-breadcrumbs';
import { formatPrice, getMotorcyclePackage, isValidPlate, MOTORCYCLE_PACKAGES, SHIPPING_CENTS, type MotorcyclePackage, type PlateColor } from '@/config/products';
import { getCheckoutPricing } from '@/lib/checkout-pricing';
import { readCheckoutDraft, saveCheckoutDraft } from '@/lib/checkout-draft';
import { trackKennzeichenGtmEvent } from '@/lib/kennzeichen-gtm-events';
import styles from './page.module.css';

const SOURCE = 'motorradkennzeichen-bestellen';
const packageEntries = Object.entries(MOTORCYCLE_PACKAGES) as [MotorcyclePackage, typeof MOTORCYCLE_PACKAGES[MotorcyclePackage]][];

export function MotorcycleLandingPage() {
  const router = useRouter();
  const [city, setCity] = useState('');
  const [letters, setLetters] = useState('');
  const [numbers, setNumbers] = useState('');
  const [color, setColor] = useState<PlateColor>('black');
  const [quantity, setQuantity] = useState<1 | 2>(1);
  const started = useRef(false);
  const plate = `${city} ${letters} ${numbers}`;
  const valid = useMemo(() => isValidPlate(plate, 'motorcycle'), [plate]);
  const packageId = getMotorcyclePackage(color, quantity);
  const pricing = getCheckoutPricing('motorcycle', color, quantity, undefined);
  const extraCents = MOTORCYCLE_PACKAGES.motorrad_2.priceCents - MOTORCYCLE_PACKAGES.motorrad_1.priceCents;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const draft = readCheckoutDraft(SOURCE);
      if (!draft || draft.plateType !== 'motorcycle') return;
      const [savedCity, savedLetters, savedNumbers] = draft.plate.split(' ');
      setCity(savedCity); setLetters(savedLetters); setNumbers(savedNumbers);
      setColor(draft.plateColor); setQuantity(draft.quantity === 2 ? 2 : 1);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  function startInput() {
    if (started.current) return;
    started.current = true;
    trackKennzeichenGtmEvent('kennzeichen_eingabe', { landing_page: SOURCE, plate_type: 'motorcycle' });
  }

  function choosePackage(id: MotorcyclePackage) {
    const selected = MOTORCYCLE_PACKAGES[id];
    setColor(selected.color);
    setQuantity(selected.quantity);
  }

  function checkout() {
    if (!valid || !packageId || !pricing) return;
    saveCheckoutDraft(SOURCE, { plate, plateType: 'motorcycle', plateColor: color, quantity });
    router.push(`/checkout?${new URLSearchParams({ plate, type: 'motorcycle', quantity: String(quantity), color, source: SOURCE }).toString()}`);
  }

  return <main className={styles.page}>
    <header className={styles.header}>
      <Link href="/" aria-label="kennzeichen-lieferung.de Startseite"><Image src="/kennzeichen-lieferung-logo.png" alt="kennzeichen-lieferung.de" width={2172} height={724} priority /></Link>
      <a href="#konfigurator">Motorrad-Schild konfigurieren <ArrowRight size={16} /></a>
    </header>
    <SeoBreadcrumbs current="Motorradkennzeichen bestellen" />
    <section className={styles.hero}>
      <div className={styles.copy}>
        <p className={styles.kicker}>DIN 74069 · 180 × 200 mm</p>
        <h1>Motorradkennzeichen bestellen. <em>Direkt online konfigurieren.</em></h1>
        <p className={styles.lead}>Bestelle dein Motorrad-Kennzeichen mit der bereits zugeteilten Kombination: zweizeilig in 180 × 200 mm, als Standard-Schild oder in Carbon-Optik. Die Vorschau zeigt dir deine Eingabe vor dem Checkout.</p>
        <p className={styles.price}>Ab <strong>{formatPrice(MOTORCYCLE_PACKAGES.motorrad_1.priceCents / 100)}</strong> · zzgl. {formatPrice(SHIPPING_CENTS / 100)} Versand</p>
        <ul>
          <li><BadgeCheck size={18} /> DIN-zertifiziert für die Zulassungsstelle</li>
          <li><Truck size={18} /> DHL-Versand mit Sendungsverfolgung</li>
          <li><CheckCircle2 size={18} /> In 10 Minuten geprägt und versandfertig</li>
        </ul>
      </div>
      <div className={styles.card} id="konfigurator">
        <div className={styles.cardHeading}><span>Dein Motorrad-Kennzeichen</span><strong>{formatPrice((pricing?.totalCents ?? 0) / 100)}</strong></div>
        <div className={styles.fields}>
          <label>Ort<input aria-label="Ortskürzel" value={city} onChange={(event) => { startInput(); setCity(event.target.value.toUpperCase().replace(/[^A-ZÄÖÜ]/g, '').slice(0, 3)); }} placeholder="B" maxLength={3} autoComplete="off" /></label>
          <label>Buchstaben<input aria-label="Erkennungsbuchstaben" value={letters} onChange={(event) => { startInput(); setLetters(event.target.value.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 2)); }} placeholder="AB" maxLength={2} autoComplete="off" /></label>
          <label>Zahlen<input aria-label="Erkennungsnummer" value={numbers} onChange={(event) => { startInput(); setNumbers(event.target.value.replace(/\D/g, '').replace(/^0+/, '').slice(0, 4)); }} placeholder="123" maxLength={4} inputMode="numeric" autoComplete="off" /></label>
        </div>
        <div className={styles.preview}><span>Live-Vorschau · 180 × 200 mm, zweizeilig</span><LicensePlate value={plate} type="motorcycle" color={color} /></div>
        <p className={`${styles.validation} ${valid ? styles.valid : ''}`}>{valid ? '✓ Kombination ist bereit' : 'Bitte Ort, Buchstaben und Zahlen eingeben.'}</p>
        <p className={styles.packageHeading}>Ausführung und Anzahl wählen</p>
        <div className={styles.packages} aria-label="Motorrad-Pakete">
          {packageEntries.map(([id, selected]) => <button key={id} type="button" aria-pressed={packageId === id} onClick={() => choosePackage(id)}>
            {id === 'motorrad_2' && <em>Meistgewählt</em>}
            <strong>{selected.label}</strong><span>{formatPrice(selected.priceCents / 100)} · zzgl. {formatPrice(SHIPPING_CENTS / 100)} Versand</span>
            {id === 'motorrad_2' && <small>nur {formatPrice(extraCents / 100)} mehr</small>}
          </button>)}
        </div>
        {valid && packageId === 'motorrad_1' && <div className={styles.upsell}>
          <span>Für nur {formatPrice(extraCents / 100)} mehr: Ersatzschild dazu – falls dein Schild verbiegt oder beschädigt wird.</span>
          <button type="button" onClick={() => choosePackage('motorrad_2')}>Ersatzschild hinzufügen</button>
        </div>}
        <p className={styles.spareNote}>Ein Ersatzschild trägt dieselbe Kombination. Amtliche Plaketten sind nicht enthalten; die Verwendung eines Ersatzschilds klärst du mit deiner Zulassungsstelle.</p>
        <div className={styles.total}><span>{packageId ? MOTORCYCLE_PACKAGES[packageId].label : ''} · inkl. MwSt. und Versand</span><strong>{formatPrice((pricing?.totalCents ?? 0) / 100)}</strong></div>
        <button className={styles.orderButton} type="button" disabled={!valid || !pricing} onClick={checkout}>Weiter zur Lieferadresse <ArrowRight size={18} /></button>
        <p className={styles.secure}><LockKeyhole size={15} /> Sichere Zahlung über Stripe · kein Konto nötig</p>
        <PaymentLogos />
      </div>
    </section>
    <section className={styles.info}>
      <div className={styles.infoInner}>
        <p className={styles.kicker}>So funktioniert die Bestellung</p>
        <h2>Dein Motorrad-Kennzeichen in drei Schritten</h2>
        <div className={styles.steps}>
          <article><span>01</span><h3>Kombination eingeben</h3><p>Übertrage das zugeteilte Ortskürzel, die Buchstaben und Zahlen. Prüfe die zweizeilige Vorschau sorgfältig.</p></article>
          <article><span>02</span><h3>Schild auswählen</h3><p>Wähle Standard oder Carbon-Optik und entscheide, ob du ein zweites Schild mit derselben Kombination möchtest.</p></article>
          <article><span>03</span><h3>Bestellung abschließen</h3><p>Im Checkout gibst du Lieferadresse und Zahlungsdaten ein. Dort siehst du den Gesamtpreis vor der Zahlung.</p></article>
        </div>
      </div>
    </section>
    <section className={styles.faq}><div className={styles.faqInner}><p className={styles.kicker}>Gut zu wissen</p><h2>Häufige Fragen zum Motorradkennzeichen</h2><details><summary>Welche Größe kann ich hier bestellen?</summary><p>Der Konfigurator bietet ein zweizeiliges Motorradkennzeichen in 180 × 200 mm. Prüfe vor der Bestellung, welche Schildform und Zeichenfolge dir zugeteilt wurden.</p></details><details><summary>Kann ich ein Motorradkennzeichen mit Carbon-Optik bestellen?</summary><p>Ja. Wähle im Konfigurator das Carbon-Schild oder das Paket mit einem zweiten Carbon-Schild. Der jeweilige Preis steht direkt bei der Auswahl.</p></details><details><summary>Ist das Ersatzschild anders beschriftet?</summary><p>Nein. Beide Schilder eines Pakets tragen dieselbe Kombination. Amtliche Plaketten sind nicht im Lieferumfang.</p></details><details><summary>Wird meine Kombination hier reserviert?</summary><p>Nein. Die Eingabe dient nur der Schilderbestellung. Informationen zur Reservierung findest du im <Link href="/ratgeber/wunschkennzeichen-reservieren">Ratgeber</Link>.</p></details><div className={styles.related}><Link href="/ratgeber/kennzeichengroessen">Kennzeichengrößen vergleichen →</Link><Link href="/carbon-kennzeichen">Carbon-Optik ansehen →</Link></div></div></section>
  </main>;
}
