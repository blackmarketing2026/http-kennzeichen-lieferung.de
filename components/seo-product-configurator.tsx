'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, LockKeyhole } from 'lucide-react';
import { LicensePlate } from '@/components/license-plate';
import { formatPrice, isValidPlate, PRODUCTS, SHIPPING_CENTS, type PlateColor, type PlateType } from '@/config/products';
import { ADDONS } from '@/config/addons';
import { getCheckoutPricing } from '@/lib/checkout-pricing';
import { saveCheckoutDraft } from '@/lib/checkout-draft';
import { DEFAULT_SEASON_END_MONTH, DEFAULT_SEASON_START_MONTH, isValidSeasonPeriod } from '@/lib/season-period';
import type { SeoProduct } from '@/config/seo-products';
import styles from './seo-product-configurator.module.css';

export function SeoProductConfigurator({ product }: { product: SeoProduct }) {
  const router = useRouter();
  const [type, setType] = useState<PlateType>(product.type);
  const [color, setColor] = useState<PlateColor>(product.color);
  const [quantity, setQuantity] = useState<1 | 2>(product.quantity);
  const [city, setCity] = useState('');
  const [letters, setLetters] = useState('');
  const [numbers, setNumbers] = useState('');
  const [seasonStart, setSeasonStart] = useState(DEFAULT_SEASON_START_MONTH);
  const [seasonEnd, setSeasonEnd] = useState(DEFAULT_SEASON_END_MONTH);
  const plate = `${city} ${letters} ${numbers}`;
  const valid = isValidPlate(plate, type) && (type !== 'season' || isValidSeasonPeriod(seasonStart, seasonEnd));
  const pricing = getCheckoutPricing(type, color, quantity, undefined, { parkingPlate: false, bikeRackPlate: product.bikeRack === true });
  const example = `${city || 'EF'} ${letters || 'QX'} ${numbers || '527'}`;

  function chooseType(next: PlateType) {
    setType(next);
    if (next === 'motorcycle') setQuantity(1);
  }

  function continueToCheckout() {
    if (!valid || !pricing) return;
    saveCheckoutDraft(product.slug, { plate, plateType: type, plateColor: color, quantity, bikeRackPlate: product.bikeRack === true, ...(type === 'season' ? { seasonStartMonth: seasonStart, seasonEndMonth: seasonEnd } : {}) });
    const params = new URLSearchParams({ plate, type, color, quantity: String(quantity), source: product.slug });
    if (product.bikeRack) params.set('bikeRackPlate', '1');
    if (type === 'season') { params.set('seasonStartMonth', String(seasonStart)); params.set('seasonEndMonth', String(seasonEnd)); }
    router.push(`/checkout?${params.toString()}`);
  }

  return <div className={styles.card} id="konfigurator">
    <div className={styles.top}><span>DEINE AUSWAHL</span><strong>{product.selectionTitle}</strong><p>{product.selection}</p></div>
    <div className={styles.preview}><LicensePlate value={example} type={type} color={color} seasonStartMonth={seasonStart} seasonEndMonth={seasonEnd} /><small>Beispielvorschau · amtliche Plaketten sind nicht enthalten</small></div>
    {product.slug === 'carbon-kennzeichen' && <label className={styles.selectLabel}>Schildart<select value={type} onChange={event => chooseType(event.target.value as PlateType)}><option value="standard">Auto</option><option value="electric">E-Kennzeichen</option><option value="historic">H-Kennzeichen</option><option value="season">Saisonkennzeichen</option><option value="motorcycle">Motorradkennzeichen</option></select></label>}
    <div className={styles.inputs}>
      <label>Zulassungsbezirk<input value={city} onChange={event => setCity(event.target.value.toLocaleUpperCase('de-DE').replace(/[^A-ZÄÖÜ]/g, '').slice(0, 3))} placeholder="EF" maxLength={3} autoComplete="off" /></label>
      <label>Buchstaben<input value={letters} onChange={event => setLetters(event.target.value.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 2))} placeholder="QX" maxLength={2} autoComplete="off" /></label>
      <label>Zahlen<input value={numbers} onChange={event => setNumbers(event.target.value.replace(/\D/g, '').replace(/^0+/, '').slice(0, 4))} placeholder="527" maxLength={4} inputMode="numeric" autoComplete="off" /></label>
    </div>
    <p className={styles.hint}>Bitte nur eine bereits zugeteilte oder reservierte Kombination eingeben. Hier findet keine Reservierung statt.</p>
    {type === 'season' && <div className={styles.season}><label>Von Monat<select value={seasonStart} onChange={event => setSeasonStart(Number(event.target.value))}>{Array.from({ length: 12 }, (_, index) => <option key={index} value={index + 1}>{String(index + 1).padStart(2, '0')}</option>)}</select></label><label>Bis Monat<select value={seasonEnd} onChange={event => setSeasonEnd(Number(event.target.value))}>{Array.from({ length: 12 }, (_, index) => <option key={index} value={index + 1}>{String(index + 1).padStart(2, '0')}</option>)}</select></label></div>}
    {!product.bikeRack && !product.holderAddon && <div className={styles.choices}><span>Anzahl Schilder</span><div><button type="button" aria-pressed={quantity === 1} onClick={() => setQuantity(1)}>1 Schild</button><button type="button" aria-pressed={quantity === 2} onClick={() => setQuantity(2)}>2 Schilder</button></div></div>}
    {!product.holderAddon && <div className={styles.choices}><span>Oberfläche</span><div><button type="button" aria-pressed={color === 'black'} onClick={() => setColor('black')}>Standard</button><button type="button" aria-pressed={color === 'carbon'} onClick={() => setColor('carbon')}>Carbon-Optik</button></div></div>}
    <div className={styles.price}><div><span>{quantity} {quantity === 1 ? 'Schild' : 'Schilder'}</span><strong>{pricing ? formatPrice((pricing.subtotalCents - pricing.bikeRackExtraPriceCents - pricing.packageDiscountCents) / 100) : '–'}</strong></div>{product.bikeRack && <div><span>1 Fahrradträger-Schild</span><strong>{pricing ? formatPrice(pricing.bikeRackExtraPriceCents / 100) : '–'}</strong></div>}<div><span>DHL-Versand</span><strong>{formatPrice(SHIPPING_CENTS / 100)}</strong></div>{product.holderAddon && <p>Halter-Set: +{formatPrice(ADDONS.holderScrews.priceCents / 100)} bei Auswahl im Checkout</p>}<div className={styles.total}><span>Gesamt inkl. MwSt.</span><strong>{pricing ? formatPrice(pricing.totalCents / 100) : '–'}</strong></div></div>
    <button type="button" className={styles.submit} onClick={continueToCheckout} disabled={!valid || !pricing}>{product.holderAddon ? 'Weiter zum Checkout und Halter wählen' : 'Weiter zu Adresse & Zahlung'} <ArrowRight size={18} /></button>
    <p className={styles.secure}><LockKeyhole size={15} /> Noch keine Zahlung · Preis vor dem Bezahlen prüfen</p>
    {type === 'motorcycle' && <p className={styles.hint}>Motorradformat: {PRODUCTS.motorcycle.size}. Zwei Schilder enthalten ein Ersatzschild mit derselben Kombination.</p>}
  </div>;
}
