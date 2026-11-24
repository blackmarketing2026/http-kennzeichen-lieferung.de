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


## Blogsystem und redaktionelle Vorlagen (13.11.2026)

- Blog?bersicht `/blog`, Artikelvorlage `/blog/[slug]` und Artikel-Datenmodell `config/blog.ts` nutzen das bestehende Ratgeberdesign. Der Footer verlinkt den Blog; ?bersicht und ver?ffentlichte Artikel stehen automatisch in der Sitemap. Das Array ist zun?chst leer; es gibt keine ?ffentlichen Platzhalterartikel.
- F?r sp?tere Agenten: `docs/BLOG-VORLAGEN.md` beschreibt Blog- und Ratgebervorlagen, Inhaltsmodell, redaktionelle Anforderungen und Pr?fungen. Ratgeber weiterhin nach `docs/RATGEBER.md` pflegen. Inhalte sind dateibasiert und ben?tigen einen Build/Deployment.

## SEO-Content-Paket (13.11.2026)

- Acht Blogartikel in config/blog.ts und zwei Ratgeber in config/registration-guides.ts ergänzt. Themen, Quellen, GSC-Auswertung und vollständige Seitenliste unter docs/seo/2026-11-13-*.
- Vorhandene Vorlage, Banner und Preisquellen erhalten. Sichtbare Umlautfehler im Blog korrigiert; relatedLinks ergänzt. Neue Ratgeber haben individuelles reviewedAt; älteres globales Datum unverändert.
- Build, gezieltes Lint und beide HTTP-Smoke-Prüfungen erfolgreich; Sitemap 32 → 42 URLs ohne Löschung. Zwei alte Tabellen-Lintbefunde dokumentiert. Keine visuelle Browserprüfung gemäß Nutzerauftrag.
- Für nächste Läufe diese zehn Suchintentionen als vorhanden behandeln. Veröffentlichung separat anhand Commit-/Deploymentstatus und Live-HTTP bestätigen.

## SEO-Durchlauf 15.11.2026
- Neues Paket: 8 Blogs (E nachträglich, Elektroauto/Umweltplakette, H-Voraussetzungen, H-Saison, HU-Plakette lesen, digitale Entsiegelung, Wechselkennzeichen, Leasing-Wunschkennzeichen) und 2 Ratgeber (Saisonzeitraum ändern, Onlinezulassung/Schilder).
- Briefing, Manifest und Prüfbericht unter docs/seo/2026-11-15-*.md/json. Vor weiteren Artikeln Bestand abgleichen.
- Build, gezieltes Lint und beide HTTP-Smokes erfolgreich; Sitemap automatisch 42 auf 52 URLs, keine entfernten. Kein Browser. Produktionsbestätigung folgt nach Push.
- GSC-Wochenbriefing vom 13.11. weiterverwenden; nächste reguläre Analyse ab 20.11. Aktuelle Property erneut bestätigt. OpenSEO: drei neue SERPs vorhanden; neue Keywordmetriken wegen Providerfehler/Creditmangel nicht verfügbar. Keine Wiederholungen ohne Anlass.
- Aktuelle amtliche Quellen beachten: 35. BImSchV Anhang 3 Nr.11 enthält E-Kennzeichnungs-Ausnahme. BMV-i-Kfz-Seite und aktueller FZV-§31-Text nennen abweichende Tageszahlen; Artikel verweist auf das konkrete Enddatum des amtlichen Nachweises.
- Redaktioneller Smoke unterstützt SEO_SMOKE_DATE für das jeweilige datierte Manifest; Standard bleibt 2026-11-13.
- Produktionsabschluss bestätigt: Content-Commit 6e589bf088f30a495e7af01c5e8575ebdf3a1a00, Vercel success; Live-Smoke 10 Seiten/43 HTTP-Ziele bestanden. Öffentliche Sitemap 52 eindeutige URLs, +10/-0. OpenSEO-Protokoll ergänzt. Keine Indexierungszusage.

## SEO-Paket 16.11.2026
- Acht Blogs: Carbon/3D, O/Null, Beleuchtung, Verkauf/Übergabe, Umweltplakettenwechsel, Motorrad-/Versicherungskennzeichen, Namensänderung, Wunschkennzeichen nicht verfügbar. Zwei Ratgeber: freiwillige Umkennzeichnung und Anhänger grün/schwarz.
- Briefing/Manifest/Prüfbericht unter docs/seo/2026-11-16-*. Vor neuen Artikeln alle42 redaktionellen Seiten auf Überschneidung prüfen.
- Build, gezieltes Lint, Editorial-Smoke10/47 HTTP-Ziele und Gesamt-Smoke54 Seiten erfolgreich. Sitemap automatisch52→62, +10/-0; keine visuelle Prüfung. Live-Nachweis folgt nach Push.
- OpenSEO weiterhin INSUFFICIENT_CREDITS bei drei neuen SERPs; keine weiteren kostenpflichtigen Wiederholungen. Amtliche Quellen genutzt, keine Suchvolumina erfunden. GSC-Property korrekt, Wochenbriefing13.11. bis nächstem regulären Vergleich ab20.11. wiederverwenden.
- Live-Abschluss16.11. bestätigt: Content-Commit60af6cac97d0d8bf2867686eda935795359e78ba, Vercel success, öffentlicher Editorial-Smoke10/47 bestanden. Sitemap62 eindeutig, +10/-0. OpenSEO-Protokoll ergänzt; keine Indexierungszusage.

## SEO-Paket 23.11.2026
- Acht Blogs: eVB/Bestellcode, Länderzeichen im Ausland, Eurofeld-Sticker, Motorradwinkel, HU außerhalb Saison, 07 versus H, Anhänger100-Plakette, Schilder vorne/hinten. Zwei Ratgeber: Kombination auf anderes Fahrzeug übernehmen und EU/EWR-Gebrauchtwagen/deutsche Kennzeichen.
- Briefing vor Umsetzung, GSC-Rohdaten, Manifest und Prüfbericht unter docs/seo/2026-11-23-*. Bestand jetzt52 redaktionelle Seiten; vor Folgelauf Doppelintentionen abgleichen.
- Finale Wochenanalyse24.10.–20.11. gegen26.09.–23.10., drei Monate21.08.–20.11.:11 Seitenklicks gegenüber0,3386 gegenüber26 Seiten-Impressionen. Querydaten anonymisierungsbedingt nicht gleich. Nächste reguläre Wochenanalyse frühestens30.11.; keine Umsatzableitung.
- OpenSEO-SERP3/3 INSUFFICIENT_CREDITS; keine weiteren kostenpflichtigen Versuche. Amtliche Recherche ergänzt. Keine GSC-Sitemap-Verwaltung im verfügbaren Werkzeugumfang.
- Build, gezieltes Lint, Editorial-Smoke10/50 HTTP-Ziele und Gesamt-Smoke64 Seiten bestanden. Sitemap automatisch62→72, +10/-0. Alte Inhalte und Daten erhalten, gezielte Rücklinks ergänzt. Kein Browser. Veröffentlichungsnachweis folgt nach Push.
- Live-Abschluss23.11. bestätigt: Content-Commit ad5c38eec113a18cd25a128e0ef0c51273f0fb03, Vercel success, öffentlicher Editorial-Smoke10/50 bestanden. Sitemap72 eindeutig, +10/-0. OpenSEO-Rechercheprotokoll ergänzt. Keine Indexierungszusage.

## SEO-Durchlauf 23.11.2026 – Abend
- Weitere 6 Blogs und 4 Ratgeber nach Bestand von 52 redaktionellen Seiten erstellt; Gesamtbestand danach 62. Themen/Quellen im docs/seo/2026-11-23-abend-briefing.md, URLs im gleichnamigen new-pages-Manifest.
- Wochenanalyse vom Morgen wiederverwendet; neue OpenSEO-SERPs weiterhin INSUFFICIENT_CREDITS. Keine Volumenannahmen. Nächste Wochenanalyse frühestens 30.11.
- Build, gezieltes Lint, Editorial-Smoke (10/52 HTTP-Ziele), SEO-Smoke (74 Seiten) und Sitemapvergleich (72→82, +10/-0) bestanden. Keine Browserprüfung gemäß Auftrag.
- Push und Live-Nachweis werden im Abend-Prüfbericht ergänzt. Themen dieses Durchlaufs künftig nicht erneut anlegen.
- Produktionsnachweis Abend: Inhaltscommit ca251b04368631a306a703df9294c88aa7465c85, Vercel success. Alle zehn neuen Seiten und ihre internen Ziele per öffentlichem Editorial-Smoke bestanden; Live-Sitemap 82 eindeutige URLs (+10/-0). Alle 10 bestätigt live, keine Indexierungsbehauptung.

## SEO-Paket 24.11.2026
- 6 Blogs: Umlaute, FIN, rote06, ausländische E-Plakette, Abstellen nach Abmeldung, grünesTraktorkennzeichen. 4 Ratgeber: Ausfuhr, Drittlandimport, Vollgutachten21, Wohnmobilumbau. Manifest/Briefing/Prüfbericht unter docs/seo/2026-11-24-*.
- Bestand danach72 redaktionelle Seiten (inklusive2 Legacy), Sitemap92. Neue Inhalte künftig nicht doppeln; Leichtkraftradgröße/zweizeiligeGrundlagen bewusst wegen Bestand verworfen.
- GSC korrekt, Wochenanalyse23.11. wiederverwendet; nächste frühestens30.11. DreiSERPs INSUFFICIENT_CREDITS, amtliche Quellen ergänzt. Keine Volumenannahmen.
- Build/Lint/Editorial10Seiten49HTTP-Ziele/SEO84Seiten bestanden; Sitemap82→92+10/-0. Kein Browser. Live-Nachtrag folgt.
- §79(9)FZV aktuelle Anwendungsgrenze31.12.2026 für§11/Anlage3: neuerAuslands-E-Artikel nennt sie. Vor2027 erneut amtlichenStand prüfen, keine automatische Fortgeltung behaupten.
- Live-Abschluss24.11.: Content-Commit3c1748f5591c47c9b97b87e6d44b181ae32e9aa2, Vercel success, öffentlicher Editorial-Smoke10Seiten/49HTTP-Ziele bestanden. Live-Sitemap92 eindeutig,+10/-0. Alle10neuen Seiten live; keine Indexierungszusage.

## SEO 2026-11-24 – zweiter Durchlauf

Sechs neue Blogartikel und vier neue Ratgeber umgesetzt; Manifest `docs/seo/2026-11-24-zwei-new-pages.json`, vorgelagertes Briefing und Prüfbericht daneben. Themen: CoC, HU-Zweitschrift, verdeckende Ladung, Magnethalter, Umweltplakette 4/Euro 6, Halterrollen; Neuwagen, Bankbrief, Auslandswohnsitz, Selbstfahrervermietung. Nicht erneut als neue Themen planen. Build, gezieltes Lint, Editorial-Smoke (10 Seiten/50 HTTP-Ziele), globaler SEO-Smoke (94 Seiten), zusätzliche OG/Banner/Bild/Sitemap-Prüfung bestanden. Sitemap automatisch 92→102 (+10/-0). Keine Browserprüfung; kein visueller Nachweis. Drei OpenSEO-SERPs scheiterten an INSUFFICIENT_CREDITS. Wochenanalyse 23.11. wiederverwendet; nächste frühestens 30.11. Kein Umsatz-/Indexierungsnachweis. Veröffentlichung siehe Nachtrag im Prüfbericht.

Live bestätigt: Inhaltscommit `98ba65b2357de1e55e726a0a5a70684d4e7b3e7a`, Vercel success. Öffentlicher Editorial-Smoke 10 Seiten/50 HTTP-Ziele bestanden; zusätzliche OG/Banner/Bildprüfung bestanden. Öffentliche Sitemap 102 eindeutige URLs, +10/-0. Vollständiger Nachweis in `docs/seo/2026-11-24-zwei-report.md`. Alle zehn Seiten am 24.11.2026 ca. 01:15 Uhr Europe/Berlin live bestätigt.

## SEO 24.11.2026 – dritter Durchlauf

6 Blogs +4 Ratgeber erstellt; Manifest/Briefing/Prüfbericht `docs/seo/2026-11-24-drei-*`. Themen: ungestempelte Fahrten, HSN/TSN, AHK-Nachrüstung, digitaler Fahrzeugschein, Stempelplakette, Farbwechsel; Wiederzulassung, Schwerbehinderung, Taxi, LoF-Anhänger25km/h. Nicht erneut anlegen. Bestand danach92 redaktionelle Seiten. Build/Lint/Editorial10Seiten57HTTP-Ziele/SEO104Seiten und zusätzliche OG/Banner/Bildprüfung bestanden. Sitemap automatisch102→112 +10/-0. Vorhandene Inhalte/Datumswerte erhalten, Rücklinks ergänzt. Keine Browserprüfung. OpenSEO3SERPs INSUFFICIENT_CREDITS; Primärquellen ergänzt; Wochenanalyse23.11. wiederverwendet, nächste ab30.11. Kein Umsatz-/Indexierungsnachweis. Live-Nachtrag siehe Prüfbericht.

Live-Abschluss dritter Durchlauf24.11.: Inhaltscommit `b10be65351159de88e079533f032f435bd63127b`, Vercel success. Öffentlicher Editorial-Smoke10Seiten/57HTTP-Ziele sowie OG/Banner/Bildprüfung bestanden. Öffentliche Sitemap112 eindeutig,+10/-0. Alle10Seiten ca.02:12Uhr Europe/Berlin bestätigt live. Keine Indexierungszusage.

## SEO 24.11.2026 – vierter Durchlauf

Zehn neue Seiten vorbereitet und technisch geprüft: sechs Blogs (alte DIN-Kennzeichen, Versichererwechsel, ohne Führerschein, Auslandsverlust, Unfall, Zweitwohnsitz) und vier Ratgeber (Quad, Leichtkraftrad, Versicherungsstilllegung, Verwertung). Briefing/Manifest/Prüfbericht: `docs/seo/2026-11-24-vier-*`. Ausgangspunkt main9c25e24; Bestand nach Umsetzung 102 redaktionelle Seiten, Sitemap122. Build, Lint, lokaler Editorial-Smoke (10/52 HTTP-Ziele), globaler SEO-Smoke (114 Seiten) und Zusatzprüfungen bestanden. Veröffentlichung noch separat zu bestätigen. Wochen-GSC vom23.11. wiederverwendet; nächste ab30.11. OpenSEO-SERPs wegen INSUFFICIENT_CREDITS nicht verfügbar, amtliche Quellen verwendet. Keine Browserprüfung und keine Änderungen an anderen Projekten/Automationen.

Veröffentlichung bestätigt (24.11.2026, ca.03:15 Europe/Berlin): Inhaltscommit `aa12e1f8d20de8072a43781828e88f0f24c3c037`, Vercel success. Öffentlicher Editorial-Smoke 10 neue Seiten/52 HTTP-Ziele und Zusatzprüfung bestanden; Sitemap122, exakt+10/-0. Erste Prüfung während Deployment pending hatte404, nach success erfolgreich wiederholt. Alle zehn Seiten live, keine Google-Indexierung behauptet.

## SEO 24.11.2026 – fünfter Durchlauf

7 neue Blogs (digitaleVignette, Bewohnerparken, Zulassungsdienst, HU-Nachprüfung, Sicherheitscodes, Fahrtenbuchauflage, fremderBußgeldvorgang) und3 Ratgeber (Reifen/Felgen, LPG-Umbau, wiedergefundenesAuto). Briefing/Manifest/Report unter docs/seo/2026-11-24-fuenf-*. Basis cf72e53; danach112 redaktionelle Seiten, Sitemap132. Vereinszulassung als Doppelintention verworfen; Ablastung wegen weiterer Primärrecherche zurückgestellt. Build/Lint/lokaler Editorial10Seiten57HTTP-Ziele/globalSEO124Seiten/OG-Banner-Bild-Sitemapprüfung bestanden. GSC-Wochenbriefing23.11. wiederverwendet, nächste ab30.11.; neueSERPs INSUFFICIENT_CREDITS. Keine Browserprüfung. Öffentlicher Nachweis folgt im Report; Themen nicht erneut anlegen.

Live bestätigt24.11.2026 ca.04:13 Europe/Berlin: Inhaltscommit `c81bcd072c0963ff7ad9dbc0d748ac552f56e552`, Vercel success. Alle zehn neuen Seiten per öffentlichem Editorial-Smoke (57HTTP-Ziele) sowie zusätzlichem OG-/Banner-/Bildtest bestanden. Sitemap132 eindeutig,+10/-0. Keine Indexierungsbehauptung. Vollständiger Nachweis im fünften Prüfbericht.

## SEO 24.11.2026 – sechster Durchlauf (Teilerfolg)

Ein neuer Ratgeber: auslaendische-kennzeichen-deutschland, keine neuen Blogs. Zehner-Mindestmenge NICHT erreicht: neun weitere eigenständige Intentionen nicht ausreichend validiert; keine Synonymkopien. Kandidatenabgleich, Primärquellen und offene Recherche in docs/seo/2026-11-24-sechs-briefing.md. OpenSEO drei neue SERPs INSUFFICIENT_CREDITS; Wochen-GSC23.11. wiederverwendet. Build165 statische Routen, gezielter Lint, Editorial1/30HTTP, globalerSEO125 und zusätzliche Sitemap/OG/Banner/Bildprüfungen bestanden. Sitemap lokal133 (+1/-0). Kein Browser. Live-Nachweis folgt nach Veröffentlichung im Prüfbericht. Weitere Themen erst fundiert validieren; Ablastung bleibt ohne ausreichenden amtlichen Primärbeleg offen.

Live-Nachweis sechster Durchlauf 24.11.2026,05:08Berlin: Contentcommit4f9f92d7911099ac9306ab0e604320a30034f96e auf main, Vercelsuccess; öffentlicher Editorial1/30HTTP und Extra-Check bestanden. 1Ratgeber bestätigt live,0Blogs; Sitemap133 eindeutig,+1/-0. Mindestmenge10 bleibt unerfüllt, ausführlicher Bericht docs/seo/2026-11-24-sechs-pruefbericht.md.

## SEO 24.11.2026 – siebter Durchlauf (Teilerfolg)

1Blog kennzeichen-verkaufsfotos-unkenntlich +1Ratgeber fahrzeug-ablasten-fahrzeugpapiere. Mindest10 nicht erreicht,8 weitere nicht validiert; Briefing/Manifest/Prüfbericht docs/seo/2026-11-24-sieben-*. Ablastung nun eng anhand amtlicher Felddefinitionen/Nachweisanforderungen behandelt, keine unbestätigten2025-Pauschalregeln. Datenschutzblog auf amtlichem Händlerfall aufgebaut. OpenSEO3SERPs INSUFFICIENT_CREDITS; WochenGSC23.11.wiederverwendet. Build167,Lint,lokalerEditorial2/33HTTP,globalSEO127,Extra-OG/Banner/Bilder/Sitemap bestanden. Sitemap135(+2/-0),115redaktionelle Seiten. KeinBrowser; Live-Nachweis folgt. Fahrschul-/Parkkennzeichenthemen benötigen weitere Validierung, keine automatische Artikelanlage.

Live siebterDurchlauf24.11.,ca.06:07Berlin: c8d8e2700c47cf7d20cf3ca2cec9ae5b7eefe723 main,Vercelsuccess; öffentlicherEditorial2Seiten/33HTTP undExtra erfolgreich. Sitemap135,+2/-0; beide Seiten live. Mindest10 weiterhin unerfüllt. Vollständiger Nachweis im siebtenPrüfbericht.
