# SEO-Prüfbericht – 23.11.2026

## Umfang und redaktionelle Prüfung

Acht neue Blogartikel, zwei neue Ratgeber. Vollständige Titel/Routen in `2026-11-23-new-pages.json`; Rechercheplan vor Umsetzung in `2026-11-23-briefing.md`, finale GSC-Daten separat. Bestehender Bestand 24 Blogs/18 Ratgeber, neu 32/20. Sieben bestehende Blogs und ein Ratgeber erhalten passende Rücklinks; zusätzliche Blogverweise aus Ratgebern entstehen automatisch durch relatedGuideSlugs. Alle bisherigen Artikeltexte, Quellen und Daten per Objektvergleich erhalten; nur Linklisten erweitert.

Eigenständige Fragen statt Synonymseiten: Übernahme auf anderes Fahrzeug versus Mitnahme am selben Fahrzeug; EU/EWR-Herkunftsdokumente versus allgemeine Anmeldeliste; eVB-Code versus Kombination; Auslands-Länderkennung; Gestaltung Eurofeld; Motorrad-Heckumbau; konkrete Saison-HU-Frist; Fahrtzweck07/H; 100-Plakette versus Kennzeichen; Zuordnung vorn/hinten. Pro Blog etwa400–470 Textwörter, Ratgeber deutlich ausführlicher mit FAQ. Keine Wortzahl als Veröffentlichungsziel, sondern abgeschlossene Antworten mit konkreten Prüfschritten.

Fakten gegen die im Briefing und an den Seiten genannten Primärquellen geprüft. Keine Reservierungszusage für Folgefahrzeug; München als örtliches Beispiel, auswärtige Mitnahme nach Abmeldung differenziert. EU-Import-HU nicht pauschal immer neu; Abmeldung im Herkunftsland getrennt. Saison-HU nur bei tatsächlicher Fälligkeit außerhalb Saison. Motorradwinkel gegenüber Senkrechten und fahrzeugbezogene Umbauprüfung. Keine roten07-Schilder, amtlichen100-Plaketten oder Versicherung als Shopprodukte. Unnötiger Neukauf bei vertauschten intakten Schildern und unverändertem Saisonzeitraum ausdrücklich vermieden.

## Technische Prüfungen

- npm ci erfolgreich, Lockdatei unverändert. Installierte Next16.3.5-Dokumentation vor Änderungen gelesen.
- npm run build erfolgreich: Kompilierung, TypeScript und statische Routenerzeugung. Nach kleiner Wortkorrektur final erneut erfolgreich.
- Gezieltes oxlint für beide Content-Konfigurationen und vorhandene SEO-Smokes erfolgreich. Kein globales Lint-Ergebnis behauptet.
- Vorhandener Editorial-Smoke mit Datum2026-11-23: zehn neue Seiten,50 HTTP-Ziele erfolgreich. Status200, Titel, eineH1, Description, Canonical, indexierbar, BlogPosting/BreadcrumbList, Abschnittsanker, interne Links, CTA, Übersichten, unbekannte Slugs404.
- Bestehender SEO-Smoke:64 Seiten, Redirects, Checkout-noindex, Sitemap und robots erfolgreich.
- Zusätzliche HTTP-Prüfung: individuelle Descriptions, OG-Artikeltyp und finale OG-URL, Datum23.11., beide Banner genau einmal pro Seite, Bildabmessungen und Alt-Attribute vorhanden.
- Sitemap als XML verglichen:62 vorher,72 nachher, genau zehn erwartete neue kanonische URLs, keine entfernten, keine Duplikate. app/sitemap.ts bindet Konfigurationen automatisch ein und bleibt unverändert. Kein erfundenes lastmod hinzugefügt.
- git diff --check erfolgreich. Automatischer Objektvergleich bestätigt Erhalt aller bisherigen redaktionellen Inhalte und Links.
- Responsive Code gelesen: unter850px einspaltiger Artikel mit nachfolgender Sidebar, unter600px einspaltige Karten/Banner; minmax(0,1fr), min-width0 und umbrechende Überschriften. Keine neue Tabelle oder Bilddatei. Vorhandenes schematisches Schildmotiv ohne amtliche Siegel; Bilder mit festen Größen, Bannerpreise aus Produktkonfiguration.

Keine Browseröffnung, visuelle Desktop-/Mobilprüfung, Simulation oder Screenshots. Die Code- und HTTP-Prüfungen sind kein Nachweis der tatsächlichen visuellen Darstellung. Keine Änderungen an Shop, Konfigurator, Checkout, Zahlungen, Tracking, Rechtstexten oder Deploymentkonfiguration.

## Daten und Grenzen

Wochenanalyse der passenden GSC-Property erneuert: finale24.10.–20.11. gegen26.09.–23.10., ergänzend21.08.–20.11. Seitenzeilen elfKlicks gegenüber null,3386 gegen26 Impressionen. Sehr kleine Basis, keine Prozentsteigerung aus null, keine kausale Wirkung oder Umsatzbehauptung. Query-Anonymisierung und API-Grenzen dokumentiert, hasMore überall false. Nächste Wochenanalyse frühestens30.11., zwischenzeitlich dieses Briefing nutzen.

Drei gezielte OpenSEO-SERP-Anfragen scheiterten an INSUFFICIENT_CREDITS. Keine Wiederholung, kein zusätzlicher Tracker, keine erfundenen Suchvolumina. Bestehende Recherche plus amtliche Webquellen genutzt. Einige EUR-Lex-Konsolidierungsabrufe zeigten Botprüfung; keine Browserumgehung. Relevanter veröffentlichter Normtext und aktuelle FZV-Verweise wurden geprüft.

Öffentlicher Quelltext des Bestell- und Motorradkonfigurators sowie aktuelle Produktkonfiguration geprüft. Preise9,80/4,90Euro und Lieferhinweis1–4Werktage nach Bestellung/Zahlung stimmen für geprüfte Standardauswahl. Keine Bestellung, Zahlung oder Versandzusage getestet. /versand liefert404 und wird nicht verlinkt; vorhandene /liefergarantie verwendet. Neue Artikel vervielfältigen keine Preis-/Rabattzusagen.

Verfügbare OpenSEO-Werkzeuge bieten keine GSC-Sitemap-Lese-/Einreichungsoperation. Property-Anbindung geprüft, Einreichungsstatus nicht verifizierbar. Keine angebliche Google-Indexierung oder Einreichung.

## Veröffentlichung

Veröffentlichung erst nach abschließendem main-Abgleich; danach Deploymentstatus und öffentliche HTTP-Seiten/Sitemap separat prüfen. Dieser Abschnitt ist noch kein Live-Nachweis.
