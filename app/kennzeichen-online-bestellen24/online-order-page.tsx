'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Bike, CarFront, Check, ChevronRight, CircleHelp, Clock3, Factory, Leaf, LockKeyhole, Minus, PackageCheck, Plus, RefreshCw, ShieldCheck, ShoppingBag, Tractor, Truck, X, Zap } from 'lucide-react';
import { LicensePlate } from '@/components/license-plate';
import { PaymentLogos } from '@/components/payment-logos';
import { KlarnaPromo } from '@/components/klarna-promo';
import { DhlPickupPromo } from '@/components/dhl-pickup-promo';
import { ProductionPromo } from '@/components/production-promo';
import { formatPrice, isValidPlate, PRODUCTS, type PlateColor, type PlateType } from '@/config/products';
import { getCheckoutPricing } from '@/lib/checkout-pricing';
import { readCheckoutDraft, saveCheckoutDraft, type CheckoutSource } from '@/lib/checkout-draft';
import { DEFAULT_SEASON_END_MONTH, DEFAULT_SEASON_START_MONTH, isValidSeasonPeriod } from '@/lib/season-period';
import styles from './page.module.css';

type Vehicle = 'car' | 'motorcycle' | 'agriculture';
type Selection = { plate: string; type: PlateType; color: PlateColor; quantity: 1 | 2; seasonStart: number; seasonEnd: number };

const vehicles = [
  { id: 'car', label: 'Auto & Anhänger', icon: CarFront },
  { id: 'motorcycle', label: 'Motorrad', icon: Bike },
  { id: 'agriculture', label: 'Landmaschine', icon: Tractor },
] as const;
const carTypes = [
  { id: 'standard', label: 'Klassisch', detail: 'Für Auto & Anhänger' },
  { id: 'electric', label: 'E-Kennzeichen', detail: 'Mit E am Ende' },
  { id: 'historic', label: 'H-Kennzeichen', detail: 'Für Oldtimer' },
  { id: 'season', label: 'Saison', detail: 'Mit Saisonzeitraum' },
] as const;
const months = Array.from({ length: 12 }, (_, index) => index + 1);
const examplePhotos = [
  { src: '/references/beispiel-auto-einfahrt.jpg', alt: 'Blaues Auto mit Kennzeichen in einer Einfahrt' },
  { src: '/references/beispiel-auto-hinterhof.jpg', alt: 'Weißes Auto mit Kennzeichen in einem Hinterhof' },
  { src: '/references/beispiel-anhaenger-gartenladung.jpg', alt: 'Anhänger mit Kennzeichen und Gartenladung' },
  { src: '/references/beispiel-auto-regenparkplatz.jpg', alt: 'Rotes Auto mit Kennzeichen auf einem regennassen Parkplatz' },
  { src: '/references/beispiel-auto-tiefgarage.jpg', alt: 'Auto mit Kennzeichen in einer Tiefgarage' },
  { src: '/references/beispiel-wohnwagen-stellplatz.jpg', alt: 'Wohnwagen mit Kennzeichen auf einem Stellplatz' },
] as const;

export function OnlineOrderPage({ source = 'kennzeichen-online-bestellen24', showKlarnaPromo = false, showDhlPickupPromo = false, showProductionPromo = false }: { source?: CheckoutSource; showKlarnaPromo?: boolean; showDhlPickupPromo?: boolean; showProductionPromo?: boolean }) {
  const router = useRouter();
  const [vehicle, setVehicle] = useState<Vehicle>('car');
  const [type, setType] = useState<PlateType>('standard');
  const [color, setColor] = useState<PlateColor>('black');
  const [city, setCity] = useState('');
  const [letters, setLetters] = useState('');
  const [numbers, setNumbers] = useState('');
  const [quantity, setQuantity] = useState<1 | 2>(2);
  const [seasonStart, setSeasonStart] = useState(DEFAULT_SEASON_START_MONTH);
  const [seasonEnd, setSeasonEnd] = useState(DEFAULT_SEASON_END_MONTH);
  const [cart, setCart] = useState<Selection | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [attempted, setAttempted] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const draft = readCheckoutDraft(source);
      if (!draft) return;
      const [savedCity, savedLetters, savedNumbers] = draft.plate.split(' ');
      setCity(savedCity);
      setLetters(savedLetters);
      setNumbers(savedNumbers);
      setType(draft.plateType);
      setVehicle(draft.plateType === 'motorcycle' ? 'motorcycle' : draft.plateType === 'agriculture240' || draft.plateType === 'agriculture255' ? 'agriculture' : 'car');
      setColor(draft.plateColor);
      setQuantity(draft.quantity === 1 ? 1 : 2);
      setSeasonStart(draft.seasonStartMonth ?? DEFAULT_SEASON_START_MONTH);
      setSeasonEnd(draft.seasonEndMonth ?? DEFAULT_SEASON_END_MONTH);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [source]);

  const plate = `${city} ${letters} ${numbers}`.trim();
  const valid = isValidPlate(plate, type);
  const validSeason = type !== 'season' || isValidSeasonPeriod(seasonStart, seasonEnd);
  const preview = valid ? plate : `${city || 'B'} ${letters || 'AB'} ${numbers || '123'}`;
  const pricing = getCheckoutPricing(type, color, quantity, undefined);
  const cartPricing = cart ? getCheckoutPricing(cart.type, cart.color, cart.quantity, undefined) : null;
  const cartProduct = cart ? PRODUCTS[cart.type] : null;
  const categoryName = useMemo(() => vehicle === 'car' ? 'Auto & Anhänger' : vehicle === 'motorcycle' ? 'Motorrad' : 'Landmaschine', [vehicle]);

  function chooseVehicle(next: Vehicle) {
    setVehicle(next);
    setType(next === 'car' ? 'standard' : next === 'motorcycle' ? 'motorcycle' : 'agriculture240');
    setColor('black');
    setQuantity(next === 'agriculture' ? 1 : 2);
    setAttempted(false);
  }

  function chooseType(next: PlateType) {
    setType(next);
    setColor('black');
  }

  function randomPlate() {
    const codes = ['B', 'HH', 'M', 'K', 'EF', 'L'];
    const nextCity = type === 'agriculture240' ? ['B', 'M', 'K', 'L'][Math.floor(Math.random() * 4)] : codes[Math.floor(Math.random() * codes.length)];
    const nextLetters = String.fromCharCode(65 + Math.floor(Math.random() * 26), 65 + Math.floor(Math.random() * 26));
    const nextNumbers = String(100 + Math.floor(Math.random() * 900));
    setCity(nextCity);
    setLetters(nextLetters);
    setNumbers(nextNumbers);
  }

  function addToCart() {
    setAttempted(true);
    if (!valid || !validSeason || !pricing) return;
    setCart({ plate, type, color, quantity, seasonStart, seasonEnd });
    setCartOpen(true);
  }

  function changeCartQuantity(next: 1 | 2) {
    if (cart) setCart({ ...cart, quantity: next });
  }

  function checkout() {
    if (!cart || !cartPricing) return;
    saveCheckoutDraft(source, {
      plate: cart.plate,
      plateType: cart.type,
      plateColor: cart.color,
      quantity: cart.quantity,
      ...(cart.type === 'season' ? { seasonStartMonth: cart.seasonStart, seasonEndMonth: cart.seasonEnd } : {}),
    });
    const params = new URLSearchParams({ plate: cart.plate, type: cart.type, color: cart.color, quantity: String(cart.quantity), source });
    if (cart.type === 'season') {
      params.set('seasonStartMonth', String(cart.seasonStart));
      params.set('seasonEndMonth', String(cart.seasonEnd));
    }
    router.push(`/checkout?${params.toString()}`);
  }

  return <main className={styles.page}>
    <div className={styles.utility}><span><ShieldCheck size={16} /> DIN 74069 geprüfte Schilder</span><span><Factory size={16} /> Prägung in Deutschland</span><span><Truck size={16} /> DHL-Versand mit Sendungsverfolgung</span></div>
    <header className={styles.header}>
      <Link href="/" className={styles.brand} aria-label="kennzeichen-lieferung.de – Startseite"><Image src="/kennzeichen-lieferung-logo.png" alt="kennzeichen-lieferung.de" width={2172} height={724} priority /></Link>
      <nav aria-label="Seitennavigation"><a href="#konfigurator">Konfigurator</a><a href="#ablauf">So funktioniert&apos;s</a><a href="#fragen">Fragen & Antworten</a></nav>
      <button className={styles.cartTrigger} type="button" onClick={() => setCartOpen(true)} aria-label={`Warenkorb öffnen, ${cart ? cart.quantity : 0} Artikel`}><ShoppingBag size={21} /><span>{cart ? cart.quantity : 0}</span></button>
    </header>

    <section className={styles.hero}>
      <div className={styles.heroCopy}>
        <span className={styles.eyebrow}><span /> DEIN KENNZEICHEN. DEIN WEG.</span>
        <h1>Kennzeichen online bestellen<span>24</span></h1>
        <p className={styles.lead}>Wunschkombination eingeben, Ausführung wählen, Preis sehen. Dein Schild wird für dich geprägt und direkt zu dir geschickt.</p>
        <div className={styles.heroPoints}><span><Check size={17} /> Live-Vorschau</span><span><Check size={17} /> Preis vor dem Bezahlen</span><span><Check size={17} /> Sicherer Checkout</span></div>
        <a className={styles.heroCta} href="#konfigurator">Jetzt Schild gestalten <ArrowRight size={19} /></a>
        <p className={styles.heroFoot}>Ab {formatPrice(PRODUCTS.standard.prices[1])} pro Autoschild inkl. MwSt. · Versand wird im Konfigurator angezeigt</p>
      </div>
      <div className={styles.heroVisual}><Image src="/herbst-hero-auto.webp" alt="Auto mit deutschem Kennzeichen" fill sizes="(max-width: 900px) 100vw, 55vw" priority /><div className={styles.heroPhotoLabel}><span>01 / 03</span><strong>Vom Wunschkennzeichen zum fertigen Schild.</strong></div></div>
    </section>

    <section className={styles.shop} id="konfigurator" aria-labelledby="shop-heading">
      <div className={styles.sectionHeading}><div><span className={styles.overline}>IN WENIGEN SCHRITTEN</span><h2 id="shop-heading">Dein Schild. Genau wie du es brauchst.</h2></div><p>Alle Angaben kannst du vor dem Bezahlen noch einmal prüfen.</p></div>
      <div className={styles.shopGrid}>
        <div className={styles.formCard}>
          <div className={styles.step}><span className={styles.stepNumber}>01</span><div><h3>Für welches Fahrzeug?</h3><p>Wähle die passende Schildform.</p></div></div>
          <div className={styles.vehicleGrid}>{vehicles.map(({ id, label, icon: Icon }) => <button key={id} type="button" className={`${styles.vehicleButton} ${vehicle === id ? styles.selected : ''}`} onClick={() => chooseVehicle(id)} aria-pressed={vehicle === id}><Icon size={24} /><span>{label}</span>{vehicle === id && <Check size={16} className={styles.selectedCheck} />}</button>)}</div>

          <div className={styles.divider} />
          <div className={styles.step}><span className={styles.stepNumber}>02</span><div><h3>Deine Kombination</h3><p>Trage das Kennzeichen ein, das dir zugeteilt wurde oder das du reserviert hast.</p></div></div>
          <div className={styles.inputGrid}>
            <label>Zulassungsbezirk<input value={city} onChange={event => setCity(event.target.value.toLocaleUpperCase('de-DE').replace(/[^A-ZÄÖÜ]/g, '').slice(0, 3))} placeholder="B" autoComplete="off" maxLength={3} /></label>
            <label>Buchstaben<input value={letters} onChange={event => setLetters(event.target.value.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 2))} placeholder="AB" autoComplete="off" maxLength={2} /></label>
            <label>Zahlen<input value={numbers} onChange={event => setNumbers(event.target.value.replace(/\D/g, '').slice(0, 4))} placeholder="123" inputMode="numeric" autoComplete="off" maxLength={4} /></label>
          </div>
          <div className={styles.inputHelp}><span><CircleHelp size={15} /> Eine Kombination wird hier nicht reserviert.</span><button type="button" onClick={randomPlate}><RefreshCw size={15} /> Beispiel einsetzen</button></div>
          {attempted && !valid && <p className={styles.error} role="alert">Bitte gib eine gültige Kombination ein. Für diese Schildart kann die Zahl der Zeichen begrenzt sein.</p>}

          <div className={styles.divider} />
          <div className={styles.step}><span className={styles.stepNumber}>03</span><div><h3>Ausführung wählen</h3><p>{categoryName} · passende Varianten</p></div></div>
          {vehicle === 'car' && <div className={styles.typeGrid}>{carTypes.map(option => <button type="button" key={option.id} className={`${styles.typeButton} ${type === option.id ? styles.selected : ''}`} onClick={() => chooseType(option.id)} aria-pressed={type === option.id}><strong>{option.label}</strong><small>{option.detail}</small></button>)}</div>}
          {vehicle === 'agriculture' && <div className={styles.typeGrid}>{(['agriculture240', 'agriculture255'] as const).map(option => <button type="button" key={option} className={`${styles.typeButton} ${type === option ? styles.selected : ''}`} onClick={() => chooseType(option)} aria-pressed={type === option}><strong>{PRODUCTS[option].size}</strong><small>Zweizeilig</small></button>)}</div>}
          {vehicle === 'motorcycle' && <div className={styles.fixedFormat}><Bike size={20} /><div><strong>Motorradschild · 180 × 200 mm</strong><small>Zweizeiliges Format</small></div></div>}
          {type === 'season' && <div className={styles.seasonRow}><label>Von Monat<select value={seasonStart} onChange={event => setSeasonStart(Number(event.target.value))}>{months.map(month => <option key={month} value={month}>{String(month).padStart(2, '0')}</option>)}</select></label><label>Bis Monat<select value={seasonEnd} onChange={event => setSeasonEnd(Number(event.target.value))}>{months.map(month => <option key={month} value={month}>{String(month).padStart(2, '0')}</option>)}</select></label></div>}
          {attempted && !validSeason && <p className={styles.error} role="alert">Der Saisonzeitraum muss zwischen 2 und 11 aufeinanderfolgenden Monaten liegen.</p>}

          <div className={styles.divider} />
          <div className={styles.step}><span className={styles.stepNumber}>04</span><div><h3>Oberfläche & Menge</h3><p>Der Preis aktualisiert sich direkt.</p></div></div>
          <div className={styles.finishRow}><button type="button" className={`${styles.finishButton} ${color === 'black' ? styles.selected : ''}`} onClick={() => setColor('black')} aria-pressed={color === 'black'}><span className={styles.blackSwatch} /> Schwarz</button>{vehicle === 'agriculture' ? <button type="button" className={`${styles.finishButton} ${color === 'green' ? styles.selected : ''}`} onClick={() => setColor('green')} aria-pressed={color === 'green'}><span className={styles.greenSwatch} /> Grün</button> : <button type="button" className={`${styles.finishButton} ${color === 'carbon' ? styles.selected : ''}`} onClick={() => setColor('carbon')} aria-pressed={color === 'carbon'}><span className={styles.carbonSwatch} /> Carbon</button>}</div>
          <div className={styles.quantityRow}><span>Anzahl Schilder</span><div className={styles.counter}><button type="button" onClick={() => setQuantity(1)} disabled={quantity === 1} aria-label="Anzahl verringern"><Minus size={17} /></button><strong>{quantity}</strong><button type="button" onClick={() => setQuantity(2)} disabled={quantity === 2 || vehicle === 'agriculture'} aria-label="Anzahl erhöhen"><Plus size={17} /></button></div></div>
          <p className={styles.quantityHint}>{vehicle === 'agriculture' ? 'Landmaschinenschilder sind hier einzeln bestellbar.' : quantity === 2 ? 'Zwei Schilder mit derselben Kombination.' : 'Ein einzelnes Schild.'}</p>
        </div>

        <aside className={styles.summaryCard} aria-label="Bestellübersicht"><div className={styles.summaryTop}><span>DEINE VORSCHAU</span><span className={styles.liveDot}>Live</span></div><div className={styles.plateStage}><LicensePlate value={preview} type={type} color={color} seasonStartMonth={seasonStart} seasonEndMonth={seasonEnd} className={styles.plate} /></div><p className={styles.previewNote}>{valid ? 'Deine eingegebene Kombination' : 'Beispielvorschau – bitte Kombination eingeben'} · Amtliche Siegel sind nicht enthalten.</p><div className={styles.summaryLine}><span>Ausführung</span><strong>{PRODUCTS[type].shortLabel}</strong></div><div className={styles.summaryLine}><span>Format</span><strong>{PRODUCTS[type].size}</strong></div><div className={styles.summaryLine}><span>Anzahl</span><strong>{quantity} {quantity === 1 ? 'Schild' : 'Schilder'}</strong></div><div className={styles.summaryLine}><span>Versand</span><strong>{pricing?.shippingCents ? formatPrice(pricing.shippingCents / 100) : 'Inklusive'}</strong></div><div className={styles.total}><span>Gesamtpreis <small>inkl. 19 % MwSt.</small></span><strong>{pricing ? formatPrice(pricing.totalCents / 100) : '–'}</strong></div><button type="button" className={styles.addButton} onClick={addToCart}><ShoppingBag size={20} /> In den Warenkorb <ArrowRight size={19} /></button><p className={styles.secureNote}><LockKeyhole size={15} /> Bezahlen erst im nächsten Schritt</p></aside>
      </div>
    </section>

    <section className={styles.process} id="ablauf"><div className={styles.processHead}><span className={styles.overline}>SO EINFACH GEHT&apos;S</span><h2>Von der Idee bis zum Briefkasten.</h2></div><div className={styles.processGrid}><article><span>01</span><CarFront size={26} /><h3>Konfigurieren</h3><p>Fahrzeug, Kombination und Oberfläche auswählen. Die Vorschau zeigt dein Schild direkt an.</p></article><article><span>02</span><LockKeyhole size={26} /><h3>Sicher bestellen</h3><p>Im Warenkorb prüfst du den Gesamtpreis. Adresse und Zahlung folgen im geschützten Checkout.</p></article><article><span>03</span><PackageCheck size={26} /><h3>Liefern lassen</h3><p>Wir prägen dein Kennzeichen und schicken es mit DHL und Sendungsverfolgung zu dir.</p></article></div></section>
    {showKlarnaPromo && <KlarnaPromo />}
    <section className={styles.referenceGallery} aria-labelledby="beispielbilder-heading">
      <div className={styles.referenceHeading}><span className={styles.overline}>BEISPIEL-EINSENDUNGEN</span><h2 id="beispielbilder-heading">So könnten Einsendungen von Kunden aussehen.</h2><p>Illustrativ erstellte Bilder im Stil privater Kundenfotos von Autos, Anhängern und Wohnwagen. Es sind keine echten Kundeneinsendungen.</p></div>
      <div className={styles.referenceGrid}>{examplePhotos.map((photo) => <figure key={photo.src} className={styles.referenceCard}><Image src={photo.src} alt={photo.alt} width={1448} height={1086} sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw" loading="lazy" /></figure>)}</div>
    </section>
    {showProductionPromo && <ProductionPromo />}
    {showDhlPickupPromo && <DhlPickupPromo />}
    <section className={styles.assurance}><div><ShieldCheck size={30} /><strong>DIN 74069</strong><span>Geprüfte Kennzeichen</span></div><div><Clock3 size={30} /><strong>Direkt in Produktion</strong><span>Nach deiner Bestellung</span></div><div><Zap size={30} /><strong>Einfach bestellen</strong><span>Ohne Kundenkonto</span></div><div><Leaf size={30} /><strong>Transparent</strong><span>Preis und Versand im Blick</span></div></section>
    <section className={styles.faq} id="fragen"><div><span className={styles.overline}>GUT ZU WISSEN</span><h2>Fragen vor der Bestellung?</h2><p>Die wichtigsten Antworten auf einen Blick.</p></div><div className={styles.faqList}><details><summary>Wann kommen meine Kennzeichen an?<ChevronRight size={18} /></summary><p>Wir machen deine Kennzeichen in etwa 10 Minuten versandfertig und versenden an Versandtagen dreimal täglich. Häufig treffen sie schon am nächsten Werktag ein, oft innerhalb von zwei Werktagen. Bitte plane dennoch 3–4 Werktage ein, da die Zustellung vom Versanddienstleister abhängt.</p></details><details><summary>Reserviere ich mit der Bestellung mein Wunschkennzeichen?<ChevronRight size={18} /></summary><p>Nein. Die Kennzeichenkombination musst du vorab bei deiner Zulassungsstelle reservieren oder zugeteilt bekommen. Hier bestellst du das geprägte Schild.</p></details><details><summary>Sind diese Kennzeichen auch für die Zulassungsbehörde geeignet?<ChevronRight size={18} /></summary><p>Ja. Unsere Kennzeichenschilder erfüllen die DIN 74069 und sind für die Vorlage bei der Zulassungsbehörde geeignet. Wir arbeiten mit einem entsprechend zertifizierten Hersteller zusammen.</p></details><details><summary>Wann sehe ich die Versandkosten?<ChevronRight size={18} /></summary><p>Der Gesamtpreis inklusive Versand steht bereits neben deiner Vorschau und wird im Warenkorb und Checkout erneut angezeigt.</p></details><details><summary>Sind die amtlichen Siegel enthalten?<ChevronRight size={18} /></summary><p>Nein. Die Siegel erhältst du bei der Zulassungsstelle. Die Vorschau dient nur zur Orientierung.</p></details></div></section>
    <div className={styles.payment}><PaymentLogos /></div>

    {cartOpen && <div className={styles.overlay}><button type="button" className={styles.backdrop} onClick={() => setCartOpen(false)} aria-label="Warenkorb schließen" /><dialog open className={styles.drawer} aria-modal="true" aria-label="Warenkorb"><div className={styles.drawerHeader}><div><span className={styles.overline}>DEINE BESTELLUNG</span><h2>Warenkorb</h2></div><button type="button" onClick={() => setCartOpen(false)} aria-label="Warenkorb schließen"><X size={24} /></button></div>{cart && cartPricing && cartProduct ? <><div className={styles.cartItem}><div className={styles.cartPlate}><LicensePlate value={cart.plate} type={cart.type} color={cart.color} seasonStartMonth={cart.seasonStart} seasonEndMonth={cart.seasonEnd} /></div><div><strong>{cartProduct.label}</strong><span>{cart.plate}{cart.type === 'electric' ? 'E' : cart.type === 'historic' ? 'H' : ''}</span><small>{cartProduct.size} · {cart.color === 'carbon' ? 'Carbon' : cart.color === 'green' ? 'Grün' : 'Schwarz'}</small><div className={styles.cartActions}><div className={styles.counter}><button type="button" onClick={() => changeCartQuantity(1)} disabled={cart.quantity === 1} aria-label="Anzahl verringern"><Minus size={15} /></button><strong>{cart.quantity}</strong><button type="button" onClick={() => changeCartQuantity(2)} disabled={cart.quantity === 2 || cart.type === 'agriculture240' || cart.type === 'agriculture255'} aria-label="Anzahl erhöhen"><Plus size={15} /></button></div><button type="button" onClick={() => setCart(null)}>Entfernen</button></div></div></div><div className={styles.drawerBottom}><div><span>Zwischensumme</span><strong>{formatPrice((cartPricing.totalCents - cartPricing.shippingCents) / 100)}</strong></div><div><span>Versand</span><strong>{cartPricing.shippingCents ? formatPrice(cartPricing.shippingCents / 100) : 'Inklusive'}</strong></div><div className={styles.drawerTotal}><span>Gesamt inkl. MwSt.</span><strong>{formatPrice(cartPricing.totalCents / 100)}</strong></div><button type="button" className={styles.addButton} onClick={checkout}>Weiter zu Adresse & Zahlung <ArrowRight size={19} /></button><p><LockKeyhole size={15} /> Sicherer Checkout ohne Kundenkonto</p></div></> : <div className={styles.emptyCart}><ShoppingBag size={38} /><h3>Dein Warenkorb ist leer.</h3><p>Stelle dein Kennzeichen im Konfigurator zusammen.</p><button type="button" onClick={() => setCartOpen(false)}>Weiter konfigurieren</button></div>}</dialog></div>}
  </main>;
}
