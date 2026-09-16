'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowDown, ArrowRight, CarFront, Check, ChevronDown, CreditCard, LockKeyhole, PackageCheck, ShieldCheck, Sparkles } from 'lucide-react';
import { LicensePlate } from '@/components/license-plate';
import { formatPrice, PRODUCTS, SHIPPING_PRICE, type PlateType } from '@/config/products';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const PLATE_TYPES = Object.keys(PRODUCTS) as PlateType[];
const FAQS = [
  ['Ist die Bestellung eine Reservierung bei der Zulassungsstelle?', 'Nein. Du bestellst geprägte Kennzeichenschilder. Reservierung, Fahrzeugzulassung und amtliche Plaketten sind nicht enthalten.'],
  ['Welche Kennzeichenarten kann ich konfigurieren?', 'Das Grundgerüst zeigt Auto-, Motorrad-, E-, H- und Saisonkennzeichen. Das finale Sortiment und verfügbare Maße werden vor dem Shop-Start verbindlich festgelegt.'],
  ['Welche Größen gibt es?', 'Für Standard-Autokennzeichen ist aktuell 520 mm hinterlegt. Weitere ein- und zweizeilige Formate sind in der bereitgestellten Preisinformation vorgesehen.'],
  ['Wie schnell wird versendet?', 'Eine verbindliche Produktions-, Versand- oder Zustellfrist ist noch nicht hinterlegt. Deshalb zeigen wir hier bewusst keine erfundene Lieferzeit.'],
  ['Welche Zahlungsmethoden werden angeboten?', 'Im eingebetteten Stripe-Checkout werden die für diese Bestellung verfügbaren Zahlungsarten sicher direkt auf unserer Seite angezeigt.'],
];

function sanitizePlate(value: string) {
  return value.toUpperCase().replace(/[^A-ZÄÖÜ0-9\s-]/g, '').replace(/-/g, ' ').replace(/\s+/g, ' ').trimStart().slice(0, 12);
}

export default function Home() {
  const router = useRouter();
  const [plateType, setPlateType] = useState<PlateType>('standard');
  const [plateValue, setPlateValue] = useState('OL AB 123');
  const [quantity, setQuantity] = useState<1 | 2 | 3>(2);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const product = PRODUCTS[plateType];
  const plateSubtotal = product.prices[quantity] * quantity;
  const total = plateSubtotal + SHIPPING_PRICE;
  const status = useMemo(() => {
    const parts = plateValue.trim().split(/\s+/);
    return parts.length >= 3 && /[A-ZÄÖÜ]/.test(parts[0]) && /\d/.test(parts[2]);
  }, [plateValue]);

  useEffect(() => {
    const onScroll = () => document.documentElement.classList.toggle('is-scrolled', window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    setTilt({ x: ((event.clientY - rect.top) / rect.height - 0.5) * -5, y: ((event.clientX - rect.left) / rect.width - 0.5) * 7 });
  }

  function openCheckout() {
    setCartOpen(false);
    const params = new URLSearchParams({ plate: plateValue.trim(), type: plateType, quantity: String(quantity) });
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
        </nav>
        <div className="header-actions">
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
          <LicensePlate value={plateValue} type={plateType} className="cart-plate" />
          <div className="cart-order-line">
            <div><strong>{product.label}</strong><span>{product.size} · {quantity} {quantity === 1 ? 'Schild' : 'Schilder'}</span></div>
            <strong>{formatPrice(plateSubtotal)}</strong>
          </div>
          <div className="cart-order-line shipping"><span>DHL-Versandpaket</span><strong>{formatPrice(SHIPPING_PRICE)}</strong></div>
          <div className="cart-total"><span>Gesamt</span><strong>{formatPrice(total)}</strong></div>
          <button className="button button-wide" type="button" onClick={openCheckout}>Mit Stripe bezahlen <ArrowRight size={18} /></button>
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
          <span className="product-label">Live-Vorschau</span>
          <LicensePlate value={plateValue} type={plateType} className="hero-plate" style={{ transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }} />
          <div className="quick-entry">
            <label htmlFor="hero-plate-input">Deine Kombination</label>
            <div className="entry-row"><input id="hero-plate-input" value={plateValue} onChange={(event) => setPlateValue(sanitizePlate(event.target.value))} autoComplete="off" spellCheck={false} aria-describedby="plate-help" /><a className="button" href="#konfigurator">Weiter <ArrowRight size={18} /></a></div>
            <p id="plate-help">Beispiel: OL AB 123 · keine Verfügbarkeitsprüfung</p>
          </div>
        </div>
        <div className="hero-trust" aria-label="Vorteile"><span><ShieldCheck size={18} /> Sichere Bestellführung</span><span><Sparkles size={18} /> Live-Vorschau</span><span><PackageCheck size={18} /> Transparente Kosten</span></div>
      </section>

      <section className="config-section" id="konfigurator">
        <div className="section-heading"><p className="eyebrow"><span /> Dein Schild</p><h2>Welches Kennzeichen<br />brauchst du?</h2><p>Wähle zuerst die Art. Deine Eingabe bleibt beim Wechsel erhalten.</p></div>
        <div className="type-switcher" role="tablist" aria-label="Kennzeichenart">
          {PLATE_TYPES.map((type) => <button key={type} type="button" role="tab" aria-selected={plateType === type} className={plateType === type ? 'active' : ''} onClick={() => setPlateType(type)}>{PRODUCTS[type].label}</button>)}
        </div>
        <div className="configurator-grid">
          <div className="config-preview">
            <div className="preview-meta"><span>{product.shortLabel}</span><span>{product.size}</span></div>
            <LicensePlate value={plateValue} type={plateType} className="config-plate" />
            <div className={`scan-status ${status ? 'is-valid' : ''}`}><span className="scan-line" /><div><Check size={16} /> Format {status ? 'erkannt' : 'prüfen'}</div><div><Check size={16} /> Kombination übernommen</div><div><Check size={16} /> Vorschau erstellt</div></div>
          </div>
          <div className="config-controls">
            <div className="step-label"><b>01</b><span>Kombination eingeben</span></div>
            <label className="field-label" htmlFor="plate-input">Bereits reservierte oder zugeteilte Kombination</label>
            <input className="plate-input" id="plate-input" value={plateValue} onChange={(event) => setPlateValue(sanitizePlate(event.target.value))} autoComplete="off" spellCheck={false} />
            <p className="field-help">Wir prüfen das Schreibformat, nicht die behördliche Verfügbarkeit.</p>
            <div className="step-label second"><b>02</b><span>Anzahl prüfen</span></div>
            <div className="quantity-row"><div className="quantity-control" aria-label="Anzahl Kennzeichen">{([1, 2, 3] as const).map((number) => <button key={number} type="button" aria-pressed={quantity === number} onClick={() => setQuantity(number)}>{number}</button>)}</div><span>{quantity === 2 ? 'Vorne & hinten' : `${quantity} ${quantity === 1 ? 'Schild' : 'Schilder'}`}</span></div>
            <div className="price-card"><div><span>{quantity} × {product.label}, {product.size}</span><strong>{formatPrice(plateSubtotal)}</strong></div><div><span>DHL-Versandpaket</span><strong>{formatPrice(SHIPPING_PRICE)}</strong></div><div className="price-total"><span>Gesamt</span><strong>{formatPrice(total)}</strong></div><small>Preise gemäß bereitgestellter Preisinformation. Steuerangaben werden vor Veröffentlichung ergänzt.</small></div>
            <button className="button button-wide" type="button" onClick={openCheckout}>Jetzt bestellen <ArrowRight size={19} /></button>
            <p className="scope-note"><ShieldCheck size={17} /> Geprägte Schilder – ohne Reservierung, Zulassung oder amtliche Plaketten.</p>
          </div>
        </div>
      </section>

      <section className="process-band">
        <div className="process-sticky"><div><p className="eyebrow light"><span /> Von der Eingabe zum Versand</p><h2>Heute konfiguriert.<br />Klar geprüft.<br /><em>Bereit zum Prägen.</em></h2></div><LicensePlate value={plateValue} type={plateType} className="story-plate" /></div>
        <div className="process-cards"><article><span>01</span><h3>Hochwertige Prägung</h3><p>Deine Kombination steht im Mittelpunkt – groß, klar und vor dem nächsten Schritt kontrollierbar.</p></article><article><span>02</span><h3>Reflektierende Oberfläche</h3><p>Die digitale Vorschau vermittelt Material, Kontur und Lichtwirkung des späteren Schildes.</p></article><article><span>03</span><h3>Sorgfältig versendet</h3><p>Versandkosten werden separat und nachvollziehbar ausgewiesen. Lieferzeiten folgen nach operativer Freigabe.</p></article></div>
      </section>

      <section className="how-section" id="ablauf">
        <div className="section-heading centered"><p className="eyebrow"><span /> Einfach bis zum Schluss</p><h2>Drei Schritte.<br />Ein klares Ergebnis.</h2></div>
        <div className="steps"><article><b>1</b><div><h3>Kennzeichen eingeben</h3><p>Art, Kombination und Anzahl wählen. Du siehst jede Änderung sofort.</p></div></article><ArrowRight className="step-arrow" aria-hidden="true" /><article><b>2</b><div><h3>Auswahl prüfen</h3><p>Kombination, Ausführung, Größe, Anzahl und Gesamtpreis kontrollieren.</p></div></article><ArrowRight className="step-arrow" aria-hidden="true" /><article><b>3</b><div><h3>Sicher bezahlen</h3><p>Der Stripe-Checkout wird im nächsten Ausbauschritt angeschlossen.</p></div></article></div>
      </section>

      <section className="checkout-section" id="checkout">
        <div className="checkout-intro"><p className="eyebrow light"><span /> One-Page-Checkout</p><h2>Genau dieses<br />Kennzeichen.</h2><p>Deine Vorschau bleibt sichtbar, während du deine Bestellung abschließt.</p><LicensePlate value={plateValue} type={plateType} className="checkout-plate" /><div className="checkout-summary"><span>{product.label} · {product.size} · {quantity} ×</span><strong>{formatPrice(total)}</strong></div></div>
          <div className="checkout-form checkout-launch" aria-label="Checkout starten"><div className="form-heading"><span>Sicher bezahlen</span><em>Stripe Elements</em></div><div className="payment-placeholder"><CreditCard size={22} /><div><strong>Checkout auf unserer Seite</strong><span>Zahlungsdaten werden direkt und verschlüsselt von Stripe verarbeitet.</span></div></div><ul><li><Check size={17} /> Keine Weiterleitung zu stripe.com</li><li><Check size={17} /> Lieferadresse und Zahlung in einem Schritt</li><li><Check size={17} /> Servergeprüfter Gesamtbetrag</li></ul><button className="button button-wide" type="button" onClick={openCheckout}>Zum sicheren Checkout · {formatPrice(total)}</button><small>Mit dem Klick öffnet sich unsere eigene Checkout-Seite.</small></div>
      </section>

      <section className="faq-section" id="faq">
        <div className="section-heading"><p className="eyebrow"><span /> Gut zu wissen</p><h2>Fragen vor<br />der Bestellung.</h2></div>
        <div className="faq-list">{FAQS.map(([question, answer], index) => <details key={question} open={index === 0}><summary>{question}<ChevronDown size={20} /></summary><p>{answer}</p></details>)}</div>
      </section>

      <footer><div className="footer-brand"><span>kennzeichen-lieferung<span>.de</span></span><p>Modern. Sicher. Zuverlässig.</p></div><div className="footer-note">Grundgerüst · Rechtliche Angaben, Kontakt und finale Lieferinformationen werden vor Veröffentlichung ergänzt.</div><a href="#top" aria-label="Nach oben">Nach oben ↑</a></footer>
      <div className="mobile-bar"><div><span>{plateValue}</span><strong>{formatPrice(total)}</strong></div><button type="button" onClick={openCheckout}>Bestellen <ArrowRight size={17} /></button></div>
    </main>
  );
}
