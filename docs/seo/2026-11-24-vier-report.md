# SEO-Prüfbericht – 24.11.2026, vierter Durchlauf

## Ergebnis vor Veröffentlichung

Sechs neue Blogartikel und vier neue Ratgeber umgesetzt; zehn eigenständige Seiten laut `2026-11-24-vier-new-pages.json`. Basis: main `9c25e24bc8856fc9dcbbb388056f571c1e03ba8b`. Keine offenen PRs; Branch ungeschützt. Das Briefing wurde vor der Umsetzung gespeichert.

Themen: alte DIN-Kennzeichen, Versichererwechsel, Zulassung ohne Führerschein, Kennzeichenverlust im Ausland, Kennzeichen nach Unfall, Zweitwohnsitz, Quad, Leichtkraftrad, fehlende Haftpflichtversicherung und Fahrzeugverwertung. Der Bestandsabgleich umfasst 92 vorhandene redaktionelle Seiten. Abgrenzungen zur vorhandenen Verlust-, Ersatz-, Versicherungskennzeichen-, Wiederzulassungs- und Entsorgungsinformation stehen im Briefing. Keine konkurrierenden Kopien kaufnaher Produktseiten.

## Daten und Recherche

OpenSEO-Projektkontext und Rechercheprotokoll gelesen; richtige Search-Console-Property `https://www.kennzeichen-lieferung.de/` mit siteOwner geprüft. Keine Umstellung. Wochenanalyse vom 23.11. wiederverwendet: letzte finale 28 Tage 24.10.–20.11. gegen 26.09.–23.10.; Seitenklicks 11/0, Seiten-Impressionen 3386/26. Ergänzende drei Monate und Suchanfragen stehen im datierten Bericht und `2026-11-23-gsc.json`. Anonymisierte Suchanfragen und Datenverzögerung beachten. Nächste reguläre Wochenanalyse frühestens 30.11. Keine Umsatz-/Kaufdaten verfügbar.

Drei gezielte OpenSEO-SERP-Abfragen zu alten DIN-Kennzeichen, Quad und Verlust im Ausland wurden mit `INSUFFICIENT_CREDITS` abgelehnt. Keine erfundenen Suchvolumina und keine zusätzlichen Tracker. Aktuelle amtliche Primärquellen ergänzen die vorhandene Recherche: FZV §§ 2, 3, 4, 5, 6, 12, 16, 17, 49, 51, 75, 79 und Anlage 4; Altfahrzeug-Verordnung; Berlin LABO und Serviceportal; Landkreis Schweinfurt; Auswärtiges Amt (Länderbeispiel Slowenien); Umweltbundesamt. Quellen direkt in den Seiten und im Briefing.

Sachliche Leitplanken: Bestandsschutz ist keine pauschale Retro-Neuprägeerlaubnis. Ein Versichererwechsel allein verlangt keine neuen Schilder. Volljähriger Halter und berechtigter Fahrer sind unterschiedliche Rollen. Polizeiprotokolle erlauben keine pauschale internationale Rückfahrt. Unfallbedingter Schilderersatz bestätigt keine Verkehrssicherheit. Hauptwohnung bestimmt grundsätzlich die örtliche Zuständigkeit. Quad-Klasse und Kennzeichnung sind vor dem Kauf zu klären. Leichtkrafträder benötigen trotz Zulassungsfreiheit eine amtliche Zuteilung. Ein Versicherungsnachweis hebt eine bereits erfolgte Außerbetriebsetzung nicht automatisch auf. Verwertung erfordert einen eigenen Nachweisweg; die Sieben-Jahres-Regel enthält die Ausnahme einer zwischenzeitlichen Wiederzulassung im Ausland.

Produktcode und öffentliche Bestellseite per HTTP abgeglichen: Standard 9,80 Euro, Versand 4,90 Euro, dortige Lieferangabe 1–4 Werktage. Keine Bestellung ausgelöst. Neue Artikel enthalten keine festgeschriebenen Preis- oder Liefergarantien. Keine Retro-, Versicherungs- oder nicht angebotenen Sonderkennzeichen als kaufbar dargestellt. Landmaschinenangebote werden nicht als schwarze Leichtkraftradschilder verkauft.

## Ausgeführte Qualitätsprüfung

- AGENTS.md, CLAUDE.md, Vorlagen, memory.md und frühere Briefings gelesen; relevante installierte Next.js-16.3.5-Dokumentation vor Codeänderungen gelesen.
- Vorhandene Datenmodelle, Routen, Gestaltung und automatische Metadaten/Canonicals/Open Graph/BlogPosting/Lesezeit erhalten. Individuelle Titel und Descriptions; Veröffentlichungs-/Prüfdatum 24.11.2026.
- Passende Rücklinks aus vier bestehenden Blogs; vier Blog-Ratgeber-Zuordnungen und vier Ratgeberlinks ergänzt. Automatische Rückverlinkung der Ratgeber zu zugeordneten Blogs erhalten.
- 90 vorhandene Einträge in beiden Inhaltsdateien maschinell verglichen: Texte, Titel und Datumswerte unverändert; alle bisherigen Links erhalten. Zwei Legacy-Ratgeber unverändert. Neue Blogtexte ca. 344–376 Wörter, Ratgeber ca. 455–482 Wörter ohne FAQ/Quellen; Umfang nach Informationsbedarf.
- `npm run build`: Exit 0, TypeScript und statische Generierung bestanden (154 statische Seiten).
- `npx oxlint config/blog.ts config/registration-guides.ts scripts/editorial-smoke.mjs scripts/seo-smoke.mjs`: Exit 0.
- `git diff --check`: bestanden.
- Produktionsserver in der Cloud lokal gestartet. `SEO_SMOKE_DATE=2026-11-24-vier node scripts/editorial-smoke.mjs` mit lokalem Origin: zehn neue Seiten, 52 HTTP-Ziele bestanden. Genau eine H1, Titel, Description, Canonical, Indexierbarkeit, BlogPosting/Breadcrumb-JSON-LD, Inhaltsanker, Bestelllinks, interne Links und Übersichtseinträge geprüft. Unbekannte Blog-/Ratgeber-Slugs liefern HTTP 404.
- `node scripts/seo-smoke.mjs` mit lokalem Origin: 114 Seiten, Redirects, Checkout-Metadaten, Sitemap und robots bestanden. Kein Checkout-Abschluss.
- Zusätzlicher HTTP-/Quelltexttest: OG-Typ und -URL, Datum, je ein oberer und seitlicher Bannerslot, Alt-Texte und feste Bildabmessungen auf allen zehn Seiten bestanden.
- Erzeugte Sitemap gegen öffentliche Ausgangssitemap geprüft: 112 → 122 eindeutige URLs, exakt zehn neue kanonische Seiten, keine Entfernung und keine Duplikate. Automatische Einbindung in `app/sitemap.ts` verifiziert; Datei unverändert. Keine künstlichen lastmod-Aktualisierungen.
- Responsive Umsetzung anhand des Codes geprüft: minmax-Raster, Einspaltigkeit unter 850 px, mobile Banner unter 600 px, flexible Bildhöhe und Inhaltsstruktur. Vorhandenes Logo mit festen Abmessungen und bestehende Codegrafik verwendet; keine neuen Rasterbilder nötig.
- Keine visuelle Prüfung, kein Browser, keine Simulation, keine Screenshots. Codeprüfung ist kein Nachweis der tatsächlichen visuellen Darstellung.

Ein erster isolierter Import-Check wurde versehentlich aus dem übergeordneten Arbeitsordner aufgerufen und scheiterte am Dateipfad. Im richtigen Repository ausgeführt und bestanden. Keine Produkt- oder Buildstörung. npm meldete die vorhandene unbekannte Umgebungsoption `http-proxy`; Build und Prüfungen endeten erfolgreich.

Shoplogik, Konfigurator, Checkout, Zahlungen, Tracking, Rechtstexte, Deploymentkonfiguration und andere Projekte/Automationen unverändert. Keine verfügbare Search-Console-Sitemap-Verwaltungsfunktion; keine Einreichung oder Google-Indexierung behauptet.

## Veröffentlichung

Alle Vorprüfungen bestanden. Push, Deploymentstatus und öffentliche HTTP-Prüfung werden nach Durchführung hier ergänzt. Dieser Zwischenstand bestätigt noch keine Veröffentlichung.

### Bestätigt live – 24.11.2026, ca. 03:15 Uhr Europe/Berlin

Inhaltscommit: https://github.com/blackmarketing2026/http-kennzeichen-lieferung.de/commit/aa12e1f8d20de8072a43781828e88f0f24c3c037 . Vor Push main erneut geprüft: unverändert und ungeschützt. Ref mit erwartetem Vorgänger aktualisiert, kein Force-Push. Nach Fetch alle sechs übertragenen Dateien bytegleich mit dem geprüften lokalen Stand.

Vercel meldet `success`: https://vercel.com/stefve/http-kennzeichen-lieferung-de/AoHEwws7tXpJWehFETTVynKczqWc . Ein erster öffentlicher Abruf während `pending` lieferte noch 404. Nach erfolgreichem Deployment vollständig wiederholt: Editorial-Smoke mit zehn neuen Seiten und 52 HTTP-Zielen bestanden. Erwartete Inhalte, H1, Metadaten, Canonicals, JSON-LD, interne Links, Übersichtseinträge und unbekannte Slugs geprüft. Zusätzlicher öffentlicher HTTP-/Quelltexttest für OG, Datum, Bannerslots und Bildabmessungen bestanden.

Öffentliche Sitemap https://www.kennzeichen-lieferung.de/sitemap.xml bestätigt: 122 eindeutige URLs, exakt zehn neue kanonische Seiten und keine Entfernung gegenüber 112 Ausgangs-URLs. Alle zehn neuen Seiten live. Keine Aussage über Google-Indexierung, Sitemap-Einreichung oder neue Käufe. Dieser Nachtrag ändert nur Dokumentation und Projektgedächtnis.
