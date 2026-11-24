# SEO-Durchlauf 24. November 2026 – zweiter Durchlauf

## Umsetzung

Sechs neue Blogartikel und vier neue ausführliche Ratgeber. Die vollständige Liste mit Titeln steht in `2026-11-24-zwei-new-pages.json`. Ausgangspunkt: aktueller main `4bf87fd6e8d16ff1d5de1fb67a2268a3c7037a9d`; keine offenen PRs. Das Briefing wurde vor der Umsetzung gespeichert.

Themen: CoC-Ersatz, HU-Zweitschrift, verdeckendes Transportgut, Magnetbefestigung, Schadstoffgruppe versus Eurostufe, Beteiligte bei der Zulassung, Neuwagen-Erstzulassung, Bankbrief-Versand, fehlender deutscher Wohnsitz und Selbstfahrervermietung. Keine zweite allgemeine Kaufseite. Bestehende Leasing-, Firmen-, HU- und Montageartikel werden durch konkrete Verfahren ergänzt. Sechs bestehende Blogartikel erhielten passende Rücklinks; bestehende Texte und Datumswerte blieben unverändert.

Alle neuen Seiten verwenden die vorhandenen Blog-/Ratgebermodelle, dynamische Produktbanner, kanonische URL-Erzeugung, Open Graph, BlogPosting und Lesezeitberechnung. Keine Modell- oder Designänderung. Keine zusätzlichen Rasterbilder nötig. Das gemeinsame Logo hat feste Abmessungen; die vorhandene Kennzeichengrafik entsteht aus Code. Shop, Checkout, Tracking, Rechtstexte, Deployment und Automationen unverändert.

## Quellen und Faktenprüfung

Die Quellen stehen direkt an den Artikeln und im vorgelagerten Briefing. Rechtsaussagen anhand aktueller FZV, StVZO, StVO und 35. BImSchV geprüft. Berliner Verwaltungsseiten sind ausdrücklich örtliche Beispiele. Volkswagen und TÜV NORD dienen als originäre Nachweis-/Ersatzdokumentquellen. Keine festen Verwaltungsgebühren oder Bearbeitungszeiten versprochen.

Besondere Abgrenzungen: Papierverlust ist keine abgelaufene HU; CoC ist nicht Teil II. Bei Wohnsitz im Ausland sind die Ausnahmen in § 6 Absatz 2 und die Zuständigkeit nach § 75 zu beachten. Bei Selbstfahrervermietung sind Anzeige und HU nicht ohne Vertragsausnahmen zu verallgemeinern. Magnetbefestigung erhält keine pauschale Zulassungszusage. Kein Eigentumsrecht wird aus Fahrzeugbrief oder Schilderbesitz abgeleitet. Kennzeichenschilder enthalten keine Zulassung, Versicherung oder amtlichen Plaketten.

Aktueller Produktcode und öffentliche Bestellseite wurden abgeglichen. Standardpreis 9,80 Euro pro Schild, Versand 4,90 Euro und angezeigte Lieferzeit 1–4 Werktage nach Bestellung/Zahlung; diese Werte werden nicht in die neuen Artikel einbetoniert. Keine Magnetprodukte oder Dokumentendienste als bestellbar dargestellt. Keine Kauftransaktion durchgeführt.

## Datenbasis und Grenzen

OpenSEO-Projekt `7147efdf-79a6-41e0-83b2-469616549334`, Markt Deutschland/deutsch. Kontext und sieben vorhandene Rechercheprotokolle gelesen. Die verbundene Search-Console-Property ist `https://www.kennzeichen-lieferung.de/` (siteOwner); keine fremde Property verwendet oder umgestellt.

Wochenanalyse vom 23.11. wiederverwendet: letzte finale 28 Tage 24.10.–20.11. gegenüber 26.09.–23.10.; Seitenklicks 11 gegenüber 0, Impressionen 3386 gegenüber 26. Vorhandener Dreimonatsvergleich berücksichtigt; anonymisierte Suchanfragen und Datenverzögerung begrenzen die Aussage. Nächste Wochenanalyse frühestens 30.11.2026. Keine Umsatz-/Kaufdaten verfügbar.

Drei gezielte zusätzliche SERP-Abfragen (Bankbrief, HU-Bericht, Selbstfahrervermietung) lieferten `INSUFFICIENT_CREDITS`. Keine Suchvolumina erfunden, keine weiteren kostenpflichtigen Versuche oder Tracker. Auswahl daher auf vorhandenem Kontext, Bestandsabgleich und qualitativer Primärquellenrecherche begründet. Keine verfügbare API zur Prüfung/Einreichung der Search-Console-Sitemap; keine Einreichungs- oder Indexierungsbehauptung.

## Tatsächlich ausgeführte Prüfungen

- Installierte Next.js-16.3.5-Dokumentation zu generateStaticParams, generateMetadata und Sitemap vor Codeänderungen gelesen.
- `npm run build`: bestanden, einschließlich TypeScript und statischer Seitenerzeugung; finaler Build nach Linkkorrekturen und Rücklinks.
- `npx oxlint config/blog.ts config/registration-guides.ts scripts/editorial-smoke.mjs scripts/seo-smoke.mjs`: Exit 0.
- `git diff --check`: bestanden.
- Datenvergleich gegen Ausgangscommit: alle 70 bisherigen Einträge in den beiden Content-Dateien erhalten, vorhandene Texte/Datumswerte unverändert; ausschließlich sechs Rücklink-Ergänzungen. Zwei weitere ältere Ratgeber unverändert.
- Lokaler Produktionsserver, `SEO_SMOKE_DATE=2026-11-24-zwei node scripts/editorial-smoke.mjs`: zehn neue Seiten und 50 HTTP-Ziele bestanden. H1, Titel, Description, Canonical, Indexierbarkeit, BlogPosting/Breadcrumb-JSON-LD, Anker, interne Links, Übersichtseinträge und unbekannte Slugs mit HTTP 404 geprüft.
- `node scripts/seo-smoke.mjs`: 94 Seiten sowie Redirects, Checkout-Metadaten, Sitemap und robots bestanden. Keine Bestellung ausgelöst.
- Zusätzliche HTTP-/Quelltextprüfungen: Open-Graph-Typ/URL, Datum 24.11.2026, je genau ein oberer und seitlicher Bannerslot, Alt-Texte und feste Bildabmessungen auf allen zehn Seiten bestanden.
- Sitemap: automatisch durch bestehende `app/sitemap.ts` erweitert. Gegen öffentliche Ausgangssitemap exakt 92 → 102 URLs, +10 neue kanonische Seiten, keine entfernten URLs, keine Duplikate. Keine manuellen doppelten Einträge und keine künstlichen lastmod-Aktualisierungen.
- Responsive Code: gemeinsames Raster mit minmax(0,1fr), einspaltiger Wechsel bei 850px, mobile Banner bei 600px, begrenzte Bildbreiten und flexible Höhen. Kurze Absätze, Listen, Inhaltsverzeichnis und Bestelllinks geprüft. Dies ist kein Nachweis tatsächlicher visueller Darstellung.
- Ausdrücklich keine Browseröffnung, Browser-Simulation, Screenshots oder Viewport-Prüfung. Keine Benutzer-PC-Nutzung.

## Veröffentlichung

Vorbereitete Inhalte vollständig lokal geprüft. Push und öffentliches Deployment werden im folgenden Nachtrag mit tatsächlichem Status und Commit dokumentiert. Zum Zeitpunkt dieses Abschnitts noch keine Live-Bestätigung.

### Live-Nachweis am 24.11.2026, ca. 01:15 Uhr Europe/Berlin

Inhaltscommit: https://github.com/blackmarketing2026/http-kennzeichen-lieferung.de/commit/98ba65b2357de1e55e726a0a5a70684d4e7b3e7a . Direkt auf unverändertem, ungeschütztem main veröffentlicht; erwarteter Vorgänger geprüft, kein Force-Push. Alle sechs Remote-Dateien nach Fetch bytegleich mit dem geprüften lokalen Stand.

Vercel-Status für diesen Commit: `success`, Deployment https://vercel.com/stefve/http-kennzeichen-lieferung-de/2UPqijphTSB1EjyVcGj2X1N3tZbu . Öffentlicher Editorial-Smoke erfolgreich: zehn neue Seiten, 50 HTTP-Ziele, erwartete Inhalte, Metadaten, JSON-LD, Links, Übersichten und echte 404 für unbekannte Slugs. Zusätzlicher öffentlicher Node-HTTP-Test bestätigt OG, Datum, Bannerslots und Bildabmessungen. Ein zunächst gestarteter Python-HTTP-Abruf hing und wurde abgebrochen; die gleichen Prüfungen wurden anschließend mit Node erfolgreich ausgeführt.

Öffentliche Sitemap https://www.kennzeichen-lieferung.de/sitemap.xml enthält 102 eindeutige URLs, exakt die zehn neuen Seiten zusätzlich zum Ausgangsbestand, keine entfernte URL. Alle zehn Seiten bestätigt live. Keine Aussage über Google-Indexierung oder erzielte Bestellungen. Dieser Nachtrag ändert nur Dokumentation und Projektgedächtnis.
