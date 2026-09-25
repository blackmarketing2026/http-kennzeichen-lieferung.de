'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowDown, ArrowRight, CarFront, Check, ChevronDown, Clock3, CreditCard, LockKeyhole, PackageCheck, ShieldCheck, Sparkles, User } from 'lucide-react';
import { PaymentLogos } from '@/components/payment-logos';
import { ShippingNotice } from '@/components/shipping-notice';
import { LicensePlate, LicensePlateEditor } from '@/components/license-plate';
import { formatPrice, getUnitPrice, isValidPlate, PRODUCTS, SHIPPING_PRICE, type PlateColor, type PlateType } from '@/config/products';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { getPickupCountdown, type PickupCountdown } from '@/lib/pickup-countdown';
import { ComplianceNotice } from '@/components/compliance-notice';

const BASE_PLATE_TYPES = ['standard', 'motorcycle', 'season'] as const;
const MOBILE_PLATE_TYPES = ['standard', 'motorcycle', 'electric', 'historic', 'season'] as const;
const FAQS = [
  ['Ist die Bestellung eine Reservierung bei der Zulassungsstelle?', 'Nein. Du bestellst geprägte Kennzeichenschilder. Reservierung, Fahrzeugzulassung und amtliche Plaketten sind nicht enthalten.'],
  ['Welche Kennzeichenarten kann ich konfigurieren?', 'Du kannst Auto-, Motorrad-, E-, H- und Saisonkennzeichen konfigurieren. Beim Motorrad erhältst du ein Schild, bei den anderen Varianten zwei Schilder.'],
  ['Welche Größen gibt es?', 'Für Standard-Autokennzeichen ist aktuell 520 mm hinterlegt. Weitere ein- und zweizeilige Formate sind in der bereitgestellten Preisinformation vorgesehen.'],
  ['Was kosten die Kennzeichen?', 'Ein Motorradkennzeichen kostet 24,90 € für ein Schild. Auto-, E-, H- und Saisonkennzeichen kosten 29,90 € für zwei Schilder. Der DHL-Versand innerhalb Deutschlands ist kostenlos.'],
  ['Wie schnell wird versendet?', 'Wir machen deine Kennzeichen innerhalb von 10 Minuten nach deiner Bestellung versandfertig. DHL holt unsere Pakete dreimal am Tag ab: um 9, 12 und 16 Uhr. Sobald die Sendungsnummer vorliegt, erhältst du sie per E-Mail und kannst dein Paket live bei DHL verfolgen.'],
  ['Welche Zahlungsmethoden werden angeboten?', 'Im eingebetteten Stripe-Checkout werden die für diese Bestellung verfügbaren Zahlungsarten sicher direkt auf unserer Seite angezeigt.'],
];

type PlateEditorProps = {
  city: string;
  letters: string;
  numbers: string;
  suffix: string;
  color: PlateColor;
  isMotorcycle: boolean;
  isSeason: boolean;
  isValid: boolean;
  onCityChange: (value: string) => void;
  onLettersChange: (value: string) => void;
  onNumbersChange: (value: string) => void;
};

function PlateEditor({ city, letters, numbers, suffix, color, isMotorcycle, isSeason, isValid, onCityChange, onLettersChange, onNumbersChange }: PlateEditorProps) {
  const type: PlateType = isMotorcycle ? 'motorcycle' : isSeason ? 'season' : suffix === 'E' ? 'electric' : suffix === 'H' ? 'historic' : 'standard';
  return (
    <div className={`plate-editor-shell ${isValid ? 'is-valid' : 'is-invalid'}`}>
      <LicensePlateEditor city={city} letters={letters} numbers={numbers} type={type} color={color} onCityChange={onCityChange} onLettersChange={onLettersChange} onNumbersChange={onNumbersChange} />
      <div className="plate-editor-feedback"><span className="live-dot" />{isValid ? 'Kombination ist bereit' : 'Bitte Kombination vervollständigen oder kürzen'}<em>{city.length + letters.length + numbers.length + suffix.length} Zeichen</em></div>
    </div>
  );
}

export default function Home() {
  const router = useRouter();
  const [plateType, setPlateType] = useState<PlateType>('standard');
  const [cityCode, setCityCode] = useState('OL');
  const [serialLetters, setSerialLetters] = useState('AB');
  const [serialNumbers, setSerialNumbers] = useState('123');
  const plateColor: PlateColor = 'black';
  const quantity: 1 | 2 = plateType === 'motorcycle' ? 1 : 2;
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [pickupCountdown, setPickupCountdown] = useState<PickupCountdown | null>(null);
  const product = PRODUCTS[plateType];
  const plateValue = `${cityCode} ${serialLetters} ${serialNumbers}`;
  const plateSubtotal = getUnitPrice(plateType, plateColor, quantity) * quantity;
  const total = plateSubtotal + SHIPPING_PRICE;
  const status = useMemo(() => isValidPlate(plateValue, plateType), [plateValue, plateType]);
  const suffix = plateType === 'electric' ? 'E' : plateType === 'historic' ? 'H' : '';

  function updateCity(value: string) {
    setCityCode(value.toUpperCase().replace(/[^A-ZÄÖÜ]/g, '').slice(0, 3));
  }

  function updateLetters(value: string) {
    setSerialLetters(value.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 2));
  }

  function updateNumbers(value: string) {
    setSerialNumbers(value.replace(/\D/g, '').replace(/^0+/, '').slice(0, 4));
  }

  function chooseSuffix(nextSuffix: '' | 'E' | 'H') {
    setPlateType(nextSuffix === 'E' ? 'electric' : nextSuffix === 'H' ? 'historic' : 'standard');
  }

  useEffect(() => {
    const onScroll = () => document.documentElement.classList.toggle('is-scrolled', window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const updatePickupCountdown = () => setPickupCountdown(getPickupCountdown(new Date()));
    updatePickupCountdown();
    const interval = window.setInterval(updatePickupCountdown, 1000);
    return () => window.clearInterval(interval);
  }, []);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    setTilt({ x: ((event.clientY - rect.top) / rect.height - 0.5) * -5, y: ((event.clientX - rect.left) / rect.width - 0.5) * 7 });
  }

  function openCheckout() {
    if (!status) return;
    setCartOpen(false);
    const params = new URLSearchParams({ plate: plateValue, type: plateType, quantity: String(quantity), color: plateColor });
    router.push(`/checkout?${params.toString()}`);
  }

  return (
    <main>
      <header className="site-header">
        <a href="#top" className="brand" aria-label="kennzeichen-lieferung.de Startseite"><span className="brand-crop"><Image src="/kennzeichen-lieferung-logo.png" alt="kennzeichen-lieferung.de" width={2172} height={724} priority /></span></a>
        <nav className={menuOpen ? 'nav-open' : ''} aria-label="Hauptnavigation">
          <a href="#konfigurator" onClick={() => setMenuOpen(false)}>Kennzeichen bestellen</a>
          <a href="#ablauf" onClick={() => setMenuOpen(false)}>So funktioniert&apos;s</a>
          <a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a>
          <Link href="/konto/login" onClick={() => setMenuOpen(false)}>Mein Konto</Link>
        </nav>
        <div className="header-actions">
          <Link className="account-link" href="/konto/login" aria-label="Mein Konto"><User aria-hidden="true" /></Link>
          <button className="car-cart" type="button" aria-label={`Bestellung öffnen, ${quantity} Kennzeichen`} onClick={() => setCartOpen(true)}>
            <CarFront aria-hidden="true" />
            <span className="cart-badge">{quantity}</span>
          </button>
          <button className="menu-button" type="button" aria-label="Menü öffnen" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
        </div>
      </header>

      <Dialog open={cartOpen} onOpenChange={setCartOpen}>
        <DialogContent className="cart-dialog">
          <DialogHeader>
            <p className="dialog-kicker">Deine Bestellung</p>
            <DialogTitle>Bereit für die Straße.</DialogTitle>
            <DialogDescription>Prüfe dein Kennzeichen, bevor du zum sicheren Checkout gehst.</DialogDescription>
          </DialogHeader>
          <LicensePlate value={plateValue} type={plateType} color={plateColor} className="cart-plate" />
          <div className="cart-order-line">
            <div><strong>{product.label}</strong><span>{product.size} · Schwarz · {quantity} {quantity === 1 ? 'Schild' : 'Schilder'}</span></div>
            <strong>{formatPrice(plateSubtotal)}</strong>
          </div>
          <div className="cart-order-line shipping"><span>DHL-Versand</span><strong>Kostenlos</strong></div>
          <div className="cart-total"><span>Gesamt</span><strong>{formatPrice(total)}</strong></div>
          <button className="button button-wide" type="button" onClick={openCheckout}>Mit Stripe bezahlen <ArrowRight size={18} /></button>
          <PaymentLogos />
          <p className="demo-disclaimer"><LockKeyhole size={15} /> Sicher eingebettet mit Stripe – ohne Weiterleitung.</p>
        </DialogContent>
      </Dialog>

      <section className="hero" id="top">
        <div className="ambient ambient-one" /><div className="ambient ambient-two" />
        <div className="hero-copy reveal">
          <p className="eyebrow"><span /> Kennzeichen live konfigurieren</p>
          <h1>Dein Kennzeichen.<br /><em>Deine Kombination.</em></h1>
          <p className="hero-intro">Wunschkombination eingeben, Ausführung wählen und dein Schild direkt vor dir entstehen sehen.</p>
          <a href="#konfigurator" className="text-link">Jetzt ausprobieren <ArrowDown size={18} /></a>
        </div>
        <div className="hero-product" onPointerMove={handlePointerMove} onPointerLeave={() => setTilt({ x: 0, y: 0 })}>
          <div className="mobile-config-progress" aria-label="Bestellschritte"><span className="active"><b>1</b>Kennzeichen</span><span><b>2</b>Typ</span><span><b>3</b>Bestellen</span></div>
          <span className="product-label"><span className="live-dot" /> Live-Vorschau</span>
          <LicensePlate value={plateValue} type={plateType} color={plateColor} className="hero-plate" style={{ transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }} />
          <div className="quick-entry">
            <label htmlFor="hero-city-input"><span className="mobile-step-number">1</span> Deine Kombination</label>
            <div className="entry-row"><div className="plate-fields compact"><input id="hero-city-input" aria-label="Ortskürzel" value={cityCode} onChange={(event) => updateCity(event.target.value)} maxLength={3} /><input aria-label="Buchstaben" value={serialLetters} onChange={(event) => updateLetters(event.target.value)} maxLength={2} /><input aria-label="Zahlen" value={serialNumbers} onChange={(event) => updateNumbers(event.target.value)} inputMode="numeric" maxLength={4} /></div><a className="button desktop-continue" href="#konfigurator">Weiter <ArrowRight size={18} /></a></div>
            <p id="plate-help">Ort · Buchstaben · Zahlen am Ende</p>
            <div className="mobile-type-picker">
              <div className="mobile-picker-heading"><span><b>2</b> Fahrzeug &amp; Typ</span><small>Bitte auswählen</small></div>
              <div className="mobile-type-grid" aria-label="Fahrzeug und Kennzeichenart">
                {MOBILE_PLATE_TYPES.map((type) => <button key={type} type="button" aria-pressed={plateType === type} className={plateType === type ? 'active' : ''} onClick={() => setPlateType(type)}><strong>{type === 'electric' ? 'E' : type === 'historic' ? 'H' : type === 'season' ? '04–10' : type === 'motorcycle' ? 'M' : 'A'}</strong><span>{PRODUCTS[type].label}</span><i /></button>)}
              </div>
              <div className="mobile-order-summary"><div><span>{quantity} {quantity === 1 ? 'Schild' : 'Schilder'} · Kostenloser Versand</span><strong>{formatPrice(total)}</strong></div><button className="button button-wide" type="button" onClick={openCheckout} disabled={!status}>Jetzt bestellen <ArrowRight size={19} /></button></div>
            </div>
            <div className="hero-pickup" aria-live="polite" aria-atomic="true"><div><Clock3 size={17} aria-hidden="true" /><span>Nächste DHL-Abholung</span></div><strong>{pickupCountdown?.remaining ?? '--:--:--'}</strong><small>{pickupCountdown ? `${pickupCountdown.dayLabel} um ${pickupCountdown.pickupTime}` : 'Wird berechnet'}</small></div>
            <div className="hero-payments"><PaymentLogos /></div>
          </div>
        </div>
        <div className="hero-trust" aria-label="Vorteile"><span><ShieldCheck size={18} /> Sichere Bestellführung</span><span><Sparkles size={18} /> In 10 Minuten versandfertig</span><span><PackageCheck size={18} /> DHL-Abholung: 9, 12 &amp; 16 Uhr</span></div>
      </section>

      <section className="config-section" id="konfigurator">
        <div className="section-heading"><p className="eyebrow"><span /> Dein Schild</p><h2>Welches Kennzeichen<br />brauchst du?</h2><p>Wähle zuerst die Art. Deine Eingabe bleibt beim Wechsel erhalten.</p></div>
        <div className="type-switcher" role="tablist" aria-label="Kennzeichenart">
          {BASE_PLATE_TYPES.map((type) => <button key={type} type="button" role="tab" aria-selected={plateType === type || (type === 'standard' && (plateType === 'electric' || plateType === 'historic'))} className={plateType === type || (type === 'standard' && (plateType === 'electric' || plateType === 'historic')) ? 'active' : ''} onClick={() => setPlateType(type)}>{PRODUCTS[type].label}</button>)}
        </div>
        <div className="configurator-grid">
          <div className="config-preview">
            <div className="preview-meta"><span>{product.shortLabel}</span><span>{product.size}</span></div>
            <LicensePlate value={plateValue} type={plateType} color={plateColor} className="config-plate" />
            <div className={`scan-status ${status ? 'is-valid' : ''}`}><span className="scan-line" /><div><Check size={16} /> Format {status ? 'erkannt' : 'prüfen'}</div><div><Check size={16} /> Kombination übernommen</div><div><Check size={16} /> Vorschau erstellt</div></div>
          </div>
          <div className="config-controls">
            <div className="step-label"><b>01</b><span>Kombination eingeben</span></div>
            <p className="control-intro">Klicke direkt in das Kennzeichen und gib deine zugeteilte Kombination ein.</p>
            <PlateEditor city={cityCode} letters={serialLetters} numbers={serialNumbers} suffix={suffix} color={plateColor} isMotorcycle={plateType === 'motorcycle'} isSeason={plateType === 'season'} isValid={status} onCityChange={updateCity} onLettersChange={updateLetters} onNumbersChange={updateNumbers} />
            <p className={`field-help ${status ? '' : 'is-error'}`}>{status ? 'Zahlen stehen immer am Ende. Die behördliche Verfügbarkeit wird nicht geprüft.' : `Die Kombination ist zu lang oder unvollständig${suffix ? ` – vor dem ${suffix} sind maximal 7 Zeichen erlaubt` : ''}.`}</p>
            <div className="step-label second"><b>02</b><span>Zusatz wählen</span></div>
            <div className="option-group addon-options" aria-label="Kennzeichenzusatz"><button type="button" className={!suffix && plateType === 'standard' ? 'active' : ''} disabled={plateType === 'motorcycle' || plateType === 'season'} onClick={() => chooseSuffix('')}><strong>–</strong><span>Ohne Zusatz</span><i /></button><button type="button" className={suffix === 'E' ? 'active' : ''} disabled={plateType === 'motorcycle' || plateType === 'season'} onClick={() => chooseSuffix('E')}><strong>E</strong><span>Elektro</span><i /></button><button type="button" className={suffix === 'H' ? 'active' : ''} disabled={plateType === 'motorcycle' || plateType === 'season'} onClick={() => chooseSuffix('H')}><strong>H</strong><span>Historisch</span><i /></button></div>
            {(plateType === 'motorcycle' || plateType === 'season') && <p className="field-help">E- und H-Zusatz sind in dieser Konfiguration nur beim Auto auswählbar.</p>}
            <div className="step-label second"><b>03</b><span>Lieferumfang</span></div>
            <div className="quantity-row"><strong className="quantity-fixed">{quantity} {quantity === 1 ? 'Schild' : 'Schilder'}</strong><span>{quantity === 2 ? 'Für vorne und hinten' : 'Für dein Motorrad'}</span></div>
            <div className="price-card"><div><span>{quantity} × {product.label}, {product.size}, Schwarz</span><strong>{formatPrice(plateSubtotal)}</strong></div><div><span>DHL-Versand</span><strong>Kostenlos</strong></div><div className="price-total"><span>Gesamt</span><strong>{formatPrice(total)}</strong></div><small>Alle Preise inklusive gesetzlicher Mehrwertsteuer und kostenlosem DHL-Versand innerhalb Deutschlands.</small></div>
            <button className="button button-wide" type="button" onClick={openCheckout} disabled={!status}>Jetzt bestellen <ArrowRight size={19} /></button>
            <PaymentLogos />
            <ShippingNotice />
            <ComplianceNotice />
            <p className="scope-note"><ShieldCheck size={17} /> Geprägte Schilder – ohne Reservierung, Zulassung oder amtliche Plaketten.</p>
          </div>
        </div>
      </section>

      <section className="process-band">
        <div className="process-sticky"><div><p className="eyebrow light"><span /> Von der Eingabe zum Versand</p><h2>Heute konfiguriert.<br />Klar geprüft.<br /><em>Bereit zum Prägen.</em></h2></div><LicensePlate value={plateValue} type={plateType} color={plateColor} className="story-plate" /></div>
        <div className="process-cards"><article><span>01</span><h3>Hochwertige Prägung</h3><p>Deine Kombination steht im Mittelpunkt – groß, klar und vor dem nächsten Schritt kontrollierbar.</p></article><article><span>02</span><h3>Reflektierende Oberfläche</h3><p>Die digitale Vorschau vermittelt Material, Kontur und Lichtwirkung des späteren Schildes.</p></article><article><span>03</span><h3>Schnell versandfertig</h3><p>Innerhalb von 10 Minuten nach deiner Bestellung ist dein Paket versandfertig. DHL holt bei uns dreimal am Tag ab: um 9, 12 und 16 Uhr.</p></article></div>
      </section>

      <section className="how-section" id="ablauf">
        <div className="section-heading centered"><p className="eyebrow"><span /> Einfach bis zum Schluss</p><h2>Drei Schritte.<br />Ein klares Ergebnis.</h2></div>
        <div className="steps">
          <article><b>01</b><div><h3>Kennzeichen eingeben</h3><p>Art und Kombination wählen. Du siehst jede Änderung sofort.</p></div></article>
          <ArrowRight className="step-arrow" aria-hidden="true" />
          <article><b>02</b><div><h3>Auswahl prüfen</h3><p>Kombination, Ausführung, Lieferumfang und Gesamtpreis kontrollieren.</p></div></article>
          <ArrowRight className="step-arrow" aria-hidden="true" />
          <article><b>03</b><div><h3>Sicher bezahlen</h3><p>Zahlung und Lieferadresse direkt in unserem eingebetteten Stripe-Checkout abschließen.</p></div></article>
          <div className="pickup-countdown" aria-live="polite" aria-atomic="true">
            <span><Clock3 size={16} aria-hidden="true" /> Nächste mögliche DHL-Abholung</span>
            <strong>{pickupCountdown?.remaining ?? '--:--:--'}</strong>
            <small>{pickupCountdown ? `${pickupCountdown.dayLabel} um ${pickupCountdown.pickupTime}` : 'Abholzeit wird berechnet'}<br />10 Min. Produktionszeit berücksichtigt</small>
          </div>
        </div>
      </section>

      <section className="checkout-section" id="checkout">
        <div className="checkout-intro"><p className="eyebrow light"><span /> One-Page-Checkout</p><h2>Genau dieses<br />Kennzeichen.</h2><p>Deine Vorschau bleibt sichtbar, während du deine Bestellung abschließt.</p><LicensePlate value={plateValue} type={plateType} color={plateColor} className="checkout-plate" /><div className="checkout-summary"><span>{product.label} · Schwarz · {quantity} ×</span><strong>{formatPrice(total)}</strong></div></div>
          <div className="checkout-form checkout-launch" aria-label="Checkout starten"><div className="form-heading"><span>Sicher bezahlen</span><em>Stripe Elements</em></div><div className="payment-placeholder"><CreditCard size={22} /><div><strong>Checkout auf unserer Seite</strong><span>Zahlungsdaten werden direkt und verschlüsselt von Stripe verarbeitet.</span></div></div><ul><li><Check size={17} /> Keine Weiterleitung zu stripe.com</li><li><Check size={17} /> Lieferadresse und Zahlung in einem Schritt</li><li><Check size={17} /> Servergeprüfter Gesamtbetrag</li></ul><button className="button button-wide" type="button" onClick={openCheckout} disabled={!status}>Zum sicheren Checkout · {formatPrice(total)}</button><small>Mit dem Klick öffnet sich unsere eigene Checkout-Seite.</small><PaymentLogos /></div>
      </section>

      <section className="faq-section" id="faq">
        <div className="section-heading"><p className="eyebrow"><span /> Gut zu wissen</p><h2>Fragen vor<br />der Bestellung.</h2></div>
        <div className="faq-list">{FAQS.map(([question, answer], index) => <details key={question} open={index === 0}><summary>{question}<ChevronDown size={20} /></summary><p>{answer}</p></details>)}</div>
      </section>

      <section className="delivery-promise" aria-labelledby="delivery-promise-title">
        <div className="delivery-promise-card">
          <Image src="/shipping/dhl.svg" alt="DHL" width={132} height={29} unoptimized />
          <p className="eyebrow"><span /> Schnell bei dir</p>
          <h2 id="delivery-promise-title">Gedruckt in 10 Minuten.<br /><em>Dreimal täglich von DHL abgeholt.</em></h2>
          <p>Nach deiner Bestellung ist dein Kennzeichen innerhalb von 10 Minuten gedruckt und versandfertig. DHL holt unsere Pakete täglich um 9, 12 und 16 Uhr ab.</p>
          <p>Sobald die Sendungsnummer vorliegt, bekommst du sie per E-Mail. Über den DHL-Link kannst du dein Paket live verfolgen.</p>
          <p className="delivery-promise-highlight">So schaffen wir mit normalem Versand besonders gute Voraussetzungen für eine schnelle Zustellung.</p>
          <small>Die Zustellzeit hängt vom Versandverlauf und dem Zielort ab.</small>
        </div>
      </section>

      <footer>
        <ComplianceNotice variant="footer" />
        <div className="footer-brand"><span>kennzeichen-lieferung<span>.de</span></span><p>Modern. Sicher. Zuverlässig.</p></div>
        <div className="footer-note">Ein Angebot von Function Concept. Angaben zum Betreiber und zur Verarbeitung Ihrer Daten finden Sie im Impressum und in der Datenschutzerklärung.</div>
        <div className="footer-links"><Link href="/konto/login">Mein Konto</Link><a href="#top" aria-label="Nach oben">Nach oben ↑</a></div>
      </footer>
      <div className="mobile-bar"><div><span>{plateValue}{suffix && ` ${suffix}`}</span><strong>{formatPrice(total)}</strong></div><button type="button" onClick={openCheckout} disabled={!status}>Bestellen <ArrowRight size={17} /></button></div>
    </main>
  );
}
