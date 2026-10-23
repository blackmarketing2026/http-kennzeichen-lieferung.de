'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, LockKeyhole } from 'lucide-react';
import { LicensePlate } from '@/components/license-plate';
import { PaymentLogos } from '@/components/payment-logos';
import { formatPrice, isValidPlate, type PlateColor } from '@/config/products';
import { getCheckoutPricing } from '@/lib/checkout-pricing';
import { readCheckoutDraft, saveCheckoutDraft } from '@/lib/checkout-draft';
import { trackKennzeichenGtmEvent } from '@/lib/kennzeichen-gtm-events';
import styles from './page.module.css';

const SOURCE = 'autokennzeichen-express-lieferung';

export function ExpressConfigurator() {
  const router = useRouter();
  const [city, setCity] = useState('');
  const [letters, setLetters] = useState('');
  const [numbers, setNumbers] = useState('');
  const [quantity, setQuantity] = useState<1 | 2>(2);
  const [color, setColor] = useState<PlateColor>('black');
  const plate = `${city} ${letters} ${numbers}`;
  const valid = useMemo(() => isValidPlate(plate, 'standard'), [plate]);
  const pricing = getCheckoutPricing('standard', color, quantity, undefined);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const draft = readCheckoutDraft(SOURCE);
      if (!draft || draft.plateType !== 'standard') return;
      const [savedCity, savedLetters, savedNumbers] = draft.plate.split(' ');
      setCity(savedCity); setLetters(savedLetters); setNumbers(savedNumbers);
      setQuantity(draft.quantity === 1 ? 1 : 2);
      setColor(draft.plateColor);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  function checkout() {
    if (!valid || !pricing) return;
    saveCheckoutDraft(SOURCE, { plate, plateType: 'standard', plateColor: color, quantity });
    trackKennzeichenGtmEvent('kennzeichen_eingabe', { landing_page: SOURCE, plate_type: 'standard' });
    router.push(`/checkout?${new URLSearchParams({ plate, type: 'standard', quantity: String(quantity), color, source: SOURCE }).toString()}`);
  }

  return <div className={styles.configurator} id="konfigurator">
    <div className={styles.configHeader}><span>Deine Autokennzeichen</span><strong>{formatPrice((pricing?.totalCents ?? 0) / 100)}</strong></div>
    <p className={styles.configIntro}>Kennzeichen eingeben und Preis sofort sehen</p>
    <div className={styles.fields}>
      <label>Ort<input aria-label="Ortskürzel" value={city} onChange={event => setCity(event.target.value.toUpperCase().replace(/[^A-ZÄÖÜ]/g, '').slice(0, 3))} placeholder="B" maxLength={3} autoComplete="off" /></label>
      <label>Buchstaben<input aria-label="Erkennungsbuchstaben" value={letters} onChange={event => setLetters(event.target.value.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 2))} placeholder="AB" maxLength={2} autoComplete="off" /></label>
      <label>Zahlen<input aria-label="Erkennungsnummer" value={numbers} onChange={event => setNumbers(event.target.value.replace(/\D/g, '').replace(/^0+/, '').slice(0, 4))} placeholder="123" maxLength={4} inputMode="numeric" autoComplete="off" /></label>
    </div>
    <div className={styles.preview}><LicensePlate value={plate} type="standard" color={color} /></div>
    <p className={styles.hint}>{valid ? '✓ Kombination bereit' : 'Bitte Ort, Buchstaben und Zahlen eingeben.'}</p>
    <div className={styles.choices}><span>Anzahl</span><div><button type="button" aria-pressed={quantity === 1} onClick={() => setQuantity(1)}>1 Schild</button><button type="button" aria-pressed={quantity === 2} onClick={() => setQuantity(2)}>2 Schilder</button></div></div>
    <div className={styles.choices}><span>Ausführung</span><div><button type="button" aria-pressed={color === 'black'} onClick={() => setColor('black')}>Standard</button><button type="button" aria-pressed={color === 'carbon'} onClick={() => setColor('carbon')}>Carbon-Optik</button></div></div>
    <div className={styles.total}><span>Inkl. MwSt. und Versand</span><strong>{formatPrice((pricing?.totalCents ?? 0) / 100)}</strong></div>
    <button className={styles.orderButton} type="button" disabled={!valid || !pricing} onClick={checkout}>Weiter zur Lieferadresse <ArrowRight size={18} /></button>
    <p className={styles.secure}><LockKeyhole size={15} /> Sichere Zahlung · kein Konto nötig</p><PaymentLogos />
  </div>;
}
