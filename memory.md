# SEO-Ausbau im lokalen Shop (18.10.2026)

## Projektprüfung

- `AGENTS.md` gelesen und die einschlägige Dokumentation der installierten Next.js-Version 16.3.5 zu App-Routing, Metadaten, `sitemap.ts`, `robots.ts`, JSON-LD, Bildern und CSS geprüft.
- Im Repository gibt es keine Root-`README.md`, keine `DESIGN.md`/`design.md` und vor dieser Arbeit keine `memory.md`. Das bestehende Design in `app/globals.css`, den Landingpages und ihren CSS-Modulen ist die gestalterische Grundlage.
- Vorhandene Seiten, Navigation, Footer, Konfiguratoren, Checkout, Tracking, Produkt- und Add-on-Konfiguration geprüft. Zentrale Quellen sind `config/products.ts`, `config/addons.ts`, `lib/checkout-pricing.ts`, `lib/checkout-draft.ts` und `components/embedded-checkout.tsx`.
- Unbeteiligte ungetrackte Dateien (JPEG, `PDF/`, Rechnung, `transfer/`, SVG) wurden nicht verändert.

## Umgesetzte Seiten

- Bestehende kanonische Produktseiten `/kennzeichen-bestellen` (Autokennzeichen) und `/motorradkennzeichen-bestellen` weiterverwendet; Metadaten, Breadcrumb-Markup, Product/Offer-Daten und interne Links verbessert. Motorradseite erhielt produktspezifische FAQ. `/landmaschinen-kennzeichen` erhielt Breadcrumbs und Product/Offer-Daten.
- `/autokennzeichen` leitet permanent auf `/kennzeichen-bestellen` weiter; `/motorradkennzeichen` auf `/motorradkennzeichen-bestellen`. Dadurch entstehen keine indexierbaren Synonym-Duplikate.
- Neue Produktseiten über `app/[productSlug]/page.tsx` und eigene Inhalte in `config/seo-products.ts`: `/fahrradtraeger-kennzeichen`, `/anhaengerkennzeichen`, `/e-kennzeichen`, `/h-kennzeichen`, `/saisonkennzeichen`, `/carbon-kennzeichen`, `/kennzeichenhalter`.
- Gemeinsamer Produktkonfigurator `components/seo-product-configurator.tsx` mit produktbezogener Voreinstellung, Live-Vorschau, Menge, Oberfläche, Saisonmonaten und Preisen aus `getCheckoutPricing`. Die Übergabe nutzt den bestehenden Checkout; neue Rücksprungquellen wurden in `lib/checkout-draft.ts` ergänzt. Fahrradträger-Seite bestellt transparent zwei reguläre Auto-Schilder plus ein gleich geprägtes Zusatzschild. Halter sind nur im Checkout als Zusatz zu passenden Schildern wählbar.
- Ratgeberübersicht `/ratgeber` und drei Artikel: `/ratgeber/wunschkennzeichen-reservieren`, `/ratgeber/kennzeichengroessen`, `/ratgeber/kennzeichen-online-bestellen`. Sie unterscheiden Reservierung, Schildkauf und Zulassung und verweisen für behördliche Grundlagen auf Bundesportal und FZV.
- Startseite um eine Produktübersicht ergänzt. Navigation und Footer verlinken Produktseiten und Ratgeber.

## Technisches SEO

- Absolute Canonicals, `metadataBase`, BreadcrumbList- und Product/Offer-JSON-LD auf Produktseiten; Ratgeber haben BreadcrumbList ohne Product-Markup. Keine erfundenen Bewertungen im Markup.
- `app/sitemap.ts` enthält kanonische indexierbare URLs; `app/robots.ts` verweist darauf und lässt Produkt-/Ratgeberseiten zugänglich.
- Checkout und Zahlungsrückkehr sind per Robots-Metadaten `noindex`; die alte nahezu gleiche `/kennzeichen-online-bestellen24`-Seite ist `noindex` mit Canonical `/`. Angebotsroute bleibt unverändert.
- `scripts/seo-smoke.mjs` prüft lokale URLs, H1, Canonicals, strukturierte Daten, Weiterleitungen, Checkout-`noindex`, Sitemap und robots.

## Bilder und Quellen

- Vorhandene Produktmotive genutzt; `bike-rack-plate.png` und `carbon-weave.png` als kleine WebP-Versionen für die neuen Seiten optimiert. Die präzise Vorschau stammt aus der bestehenden `LicensePlate`-Komponente statt aus generierten Plakettenbildern.
- Für die Halter-Seite mit dem integrierten ImageGen-Werkzeug eine illustrative Produktaufnahme erzeugt und als `public/shipping/kennzeichenhalter-set.webp` abgelegt. Prompt: zwei schwarze Kennzeichenhalter für 520 × 110 mm mit Standardschrauben auf hellem neutralem Tisch, ohne Marke, Beschriftung, Fahrzeug oder Menschen. Die Seite kennzeichnet das Foto als illustrative Aufnahme.
- Offizielle Quellen für behördliche Aussagen: Bundesportal zur Wunschkennzeichen-Reservierung (`https://verwaltung.bund.de/leistungsverzeichnis/de/leistung/99036009072003`), § 12 FZV (`https://www.gesetze-im-internet.de/fzv_2023/__12.html`) und Anlage 4 FZV (`https://www.gesetze-im-internet.de/fzv_2023/anlage_4.html`). Regional unterschiedliche Gebühren/Fristen wurden nicht behauptet.

## Zurückgestellte Produkte

- `/kurze-kennzeichen`: kein entsprechendes kurzes einzeiliges Schild in `config/products.ts` oder im Konfigurator; die Motorrad- und Landmaschinenformate sind keine allgemeine Kurzschild-Option.
- `/umweltplakette`: `EMISSION_STICKER_PRICE` existiert in der Preislogik, aber im aktuellen sichtbaren Checkout/Konfigurator gibt es keine auswählbare Umweltplakette. Daher keine kaufbare Produktseite oder künstliche Bestellbarkeit angelegt.

## Prüfungen und Veröffentlichungsstatus

- Nach den letzten Änderungen: `npm run build` erfolgreich, einschließlich TypeScript-Prüfung und statischer Generierung aller neuen Produkt- und Ratgeberrouten. `npm test`: 22 Testdateien und 144 Tests erfolgreich. Gezieltes `npm run lint -- ...` auf allen bearbeiteten TypeScript-/TSX-Dateien erfolgreich.
- Das projektweite `npm run lint` scheitert weiterhin an bestehenden Befunden in nicht bearbeiteten Dateien unter `components/ui/` und `hooks/use-mobile.ts` (vor allem Accessibility-Regeln und EffectSetState). Diese Dateien wurden für den SEO-Ausbau nicht geändert. `git diff --check` meldete keine Whitespace-Fehler; lediglich Hinweise zur künftigen LF/CRLF-Umwandlung.
- Lokale Browserprüfung bestätigte E-Kennzeichen und Fahrradträger-Zusatzschild einschließlich korrekter Checkout-Summe und Rücksprunglink. Mobile DOM-Prüfung bei schmalem Viewport zeigte keinen horizontalen Überlauf.
- `scripts/seo-smoke.mjs` nach dem finalen Build gegen den lokalen Produktionsserver erfolgreich: 14 Seiten, Weiterleitungen, Checkout-noindex, Sitemap und robots.txt.
- Keine echte Bestellung oder Zahlung ausgelöst. Keine Veröffentlichung, kein Deployment und kein Push für diesen SEO-Ausbau.

## Sitemap-Ergänzung (18.10.2026)

- Die vorhandene Next.js-Sitemap `app/sitemap.ts` um die öffentlichen Seiten `/din-74069`, `/liefergarantie`, `/impressum`, `/datenschutz` und `/widerruf` ergänzt. Sie enthält nun 21 eindeutige kanonische URLs. Weiterleitungen, Checkout und die `noindex`-Landingpages bleiben ausgeschlossen.
- `robots.txt` verweist weiterhin auf `https://www.kennzeichen-lieferung.de/sitemap.xml`. Den lokalen SEO-Smoke-Test um die vollständige URL-Liste, Duplikatprüfung und Ausschlüsse erweitert.
- `npm run build`, gezieltes Linting der Sitemap und `node scripts/seo-smoke.mjs` gegen den lokalen Produktionsserver erfolgreich. Nicht gepusht oder veröffentlicht.

## Google Search Console (18.10.2026)

- Den vom Nutzer bereitgestellten Google-Site-Verification-Wert über `verification.google` in der zentralen Next.js-Metadata in `app/layout.tsx` ergänzt. Der erzeugte HTML-Head der lokalen Startseite enthält den exakten Meta-Tag.
- Build und gezieltes Linting erfolgreich. Auf ausdrücklichen Wunsch des Nutzers werden die zuvor lokal gebliebenen Shop-/SEO-Änderungen samt Sitemap und Verifizierung jetzt auf `main` gepusht; die vorigen Aussagen „nicht gepusht“ dokumentieren den damaligen Stand.
