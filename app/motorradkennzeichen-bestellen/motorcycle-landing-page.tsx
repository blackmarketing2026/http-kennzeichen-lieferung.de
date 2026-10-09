'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, BadgeCheck, CheckCircle2, LockKeyhole, Truck } from 'lucide-react';
import { LicensePlate } from '@/components/license-plate';
import { PaymentLogos } from '@/components/payment-logos';
import { formatPrice, getMotorcyclePackage, isValidPlate, MOTORCYCLE_PACKAGES, type MotorcyclePackage, type PlateColor } from '@/config/products';
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
  const carbonCents = quantity === 2
    ? MOTORCYCLE_PACKAGES.motorrad_carbon_2.priceCents - MOTORCYCLE_PACKAGES.motorrad_2.priceCents
    : MOTORCYCLE_PACKAGES.motorrad_carbon_1.priceCents - MOTORCYCLE_PACKAGES.motorrad_1.priceCents;

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
    <section className={styles.hero}>
      <div className={styles.copy}>
        <p className={styles.kicker}>DIN 74069 · 180 × 200 mm</p>
        <h1>Motorrad-Kennzeichen bestellen. <em>Passend zu deiner Fahrt.</em></h1>
        <p className={styles.lead}>Deine Kombination auf einem zweizeiligen Motorrad-Schild. Wähle Standard oder Carbon-Optik und bei Bedarf ein Ersatzschild mit derselben Kombination.</p>
        <p className={styles.price}>Ab <strong>{formatPrice(MOTORCYCLE_PACKAGES.motorrad_1.priceCents / 100)}</strong> · versandkostenfrei</p>
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
        <div className={styles.finish} aria-label="Ausführung">
          <button type="button" aria-pressed={color === 'black'} onClick={() => setColor('black')}>Standard</button>
          <button type="button" aria-pressed={color === 'carbon'} onClick={() => setColor('carbon')}>Carbon (+{formatPrice(carbonCents / 100)})</button>
        </div>
        <div className={styles.packages} aria-label="Motorrad-Pakete">
          {packageEntries.map(([id, selected]) => <button key={id} type="button" aria-pressed={packageId === id} onClick={() => choosePackage(id)}>
            {id === 'motorrad_2' && <em>Meistgewählt</em>}
            <strong>{selected.label}</strong><span>{formatPrice(selected.priceCents / 100)} · Versand gratis</span>
            {id === 'motorrad_2' && <small>nur {formatPrice(extraCents / 100)} mehr</small>}
          </button>)}
        </div>
        {valid && packageId === 'motorrad_1' && <div className={styles.upsell}>
          <span>Für nur {formatPrice(extraCents / 100)} mehr: Ersatzschild dazu – falls dein Schild verbiegt oder beschädigt wird.</span>
          <button type="button" onClick={() => choosePackage('motorrad_2')}>Ersatzschild hinzufügen</button>
        </div>}
        <p className={styles.spareNote}>Das Ersatzschild trägt dieselbe Kombination. Wird dein Schild verbogen oder beschädigt, lässt du das Ersatzschild einfach bei der Zulassungsstelle stempeln – ohne neu zu bestellen.</p>
        <div className={styles.total}><span>{packageId ? MOTORCYCLE_PACKAGES[packageId].label : ''} · inkl. MwSt. und Versand</span><strong>{formatPrice((pricing?.totalCents ?? 0) / 100)}</strong></div>
        <button className={styles.orderButton} type="button" disabled={!valid || !pricing} onClick={checkout}>Weiter zur Lieferadresse <ArrowRight size={18} /></button>
        <p className={styles.secure}><LockKeyhole size={15} /> Sichere Zahlung über Stripe · kein Konto nötig</p>
        <PaymentLogos />
      </div>
    </section>
    <section className={styles.info}>
      <h2>Ein Schild für dein Motorrad. Ein Ersatz bei Beschädigung.</h2>
      <p>Alle vier Pakete enthalten die Prägung deiner Kombination und den DHL-Versand. Das Ersatzschild ist ein zweites, gleich geprägtes Schild; für den Einsatz muss es bei der Zulassungsstelle gestempelt werden.</p>
    </section>
  </main>;
}
