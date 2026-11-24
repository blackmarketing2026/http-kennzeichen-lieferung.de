# SEO-Prüfbericht – 24.11.2026, fünfter Durchlauf

## Umfang und Recherche

Basis main `cf72e538675657d12df711fec092a97cadcca369`. Keine offenen PRs, Branch ungeschützt. Anweisungen, Vorlagen und Projektgedächtnis gelesen; relevante installierte Next.js-16.3.5-Dokumentation vor Änderungen gelesen. Das datierte Briefing wurde vor der Umsetzung gespeichert.

Sieben neue Blogs und drei neue Ratgeber laut `2026-11-24-fuenf-new-pages.json`. Bestandsabgleich mit 102 redaktionellen Seiten und bisherigen Briefings. Vereinszulassung wegen Überschneidung verworfen, Ablastung wegen noch nicht ausreichend geklärter Primärbelege zurückgestellt. Die zehn gewählten Themen behandeln unterschiedliche konkrete Aufgaben: digitale Maut, Bewohnerparken, beauftragter Zulassungsdienst, HU-Nachprüfung, Sicherheitscodeweitergabe, behördliches Fahrtenbuch, fremder Bußgeldvorgang, Rad-Reifen-Abnahme, LPG-Umbau und Wiederfund des ganzen Fahrzeugs.

OpenSEO-Kontext mit zehn bisherigen Rechercheeinträgen gelesen. Die korrekte GSC-Property `https://www.kennzeichen-lieferung.de/` ist als siteOwner verbunden; keine Umstellung. Wochenanalyse23.11. wiederverwendet, nächste frühestens30.11. Finale28Tage24.10.–20.11. gegen26.09.–23.10.: Seitenklicks11/0, Seiten-Impressionen3386/26. Zusätzliche drei Monate und anonymisierungsbedingt unvollständige Querydaten im gespeicherten Wochenbericht/JSON. Keine Conversion- oder Umsatzableitung.

Drei neue OpenSEO-SERPs für Deutschland/deutsch (Vignette, Wiederfund, Ablastung) mit INSUFFICIENT_CREDITS abgelehnt. Keine Suchvolumina erfunden, keine zusätzlichen Tracker. Aktuelle amtliche Rechtsnormen und Behördeninformationen sowie Betreiber- und Prüforganisations-Primärquellen recherchiert. Alle Links im Briefing und in den Seiten. FZV§16-Einzelabruf zeitweise Timeout; aktueller amtlicher Berliner Wiederzulassungsnachweis ergänzend genutzt.

Faktenprüfung: ASFINAG nur als österreichisches Betreiberbeispiel; kein pauschales Umbuchungsrecht. Bewohnerparken kommunal getrennt von Zulassung. Zulassungsdienst-Leistungsumfang vertraglich abstimmen, keine erfundenen Preise. Nachprüfungsfrist ist keine allgemeine Weiterfahrerlaubnis. Teil-II-Sicherheitscode nicht für bloße Schilderbestellung freilegen. Fahrtenbuchauflage nicht mit steuerlichem Fahrtenbuch verwechseln. Fremder Bescheid beweist nicht automatisch Missbrauch; OWiG§67 und Frist beachten. ABE-Auflagen und Kombination technischer Änderungen prüfen. LPG-GSP und Eintragung unterscheiden. Polizeilicher Wiederfund ist keine technische oder zulassungsrechtliche Freigabe.

Aktuelle Produktkonfiguration und öffentliche Bestellseite per HTTP200 abgeglichen: Standard9,80Euro, Versand4,90Euro und Angabe1–4Werktage bestätigt. Artikel enthalten keine statischen Preis-/Lieferzusagen. Kein Verkauf von Mautprodukten, Zulassungsdiensten, technischen Prüfungen oder amtlichen Plaketten zugesagt. Keine Bestellung oder Zahlung ausgelöst.

## Umsetzung und Bestandswahrung

Vorhandene Blog-/Ratgebermodelle, Templates, Banner und Codegrafiken verwendet. Datum24.11.2026, eigene Titel/Descriptions, kurze Absätze und Checklisten; Ratgeber mit FAQ. Automatische Canonicals, Open Graph, BlogPosting/Breadcrumbs und Lesezeit erhalten. Keine neuen Rasterbilder nötig.

Sieben Rücklinks aus bestehenden Blogs, vier Blog-Ratgeber-Zuordnungen und drei Ratgeberlinks ergänzt. Automatische Gegenlinks zu zugeordneten Blogs bleiben aktiv. Maschineller Vergleich aller100 bisherigen Einträge in den beiden Datenfiles: Texte, Titel und Datumswerte unverändert, alle bisherigen Links erhalten. Zwei Legacy-Ratgeber unverändert. Neue Blogtexte ca.340–354Wörter, Ratgeber428–443Wörter ohne FAQ/Quellen.

Responsive Code geprüft: minmax-Raster, Einspaltigkeit unter850px, mobile Banner unter600px, flexible Bildhöhen, Inhaltsverzeichnis und feste Logoabmessungen2172×724. Keine Browseröffnung, keine Simulation und keine visuelle Prüfung. Codeprüfung ist kein Nachweis tatsächlicher Darstellung.

Shop, Konfigurator, Checkout, Zahlungen, Tracking, Rechtstexte und Deploymentkonfiguration unverändert. Andere Projekte und Automationen unverändert. GSC-Sitemap-Verwaltungsfunktion nicht verfügbar; keine Einreichung oder Google-Indexierung behauptet.

## Technische Ausführung

Der erste reine Bestandsimport von config/guides.ts scheiterte an dessen erweiterungslosem TS-Import unter Node. Der direkte Import der eigentlichen Inhaltsdateien funktionierte; kein Anwendungsfehler und keine Codeänderung nötig. Beim Lesen der Next-Dokumentation wurde eine zunächst angenommene .mdx-Endung anhand der tatsächlich installierten .md-Dateien korrigiert. npm meldet die vorhandene unbekannte Umgebungsoption http-proxy.

Build-, Smoke- und Veröffentlichungsnachweise werden nach tatsächlicher Ausführung ergänzt.

### Vor Veröffentlichung bestanden

- `npm run build`: Exit0, TypeScript und statische Generierung von164 Seiten erfolgreich.
- `npx oxlint config/blog.ts config/registration-guides.ts scripts/editorial-smoke.mjs scripts/seo-smoke.mjs`: Exit0.
- `git diff --check`: bestanden.
- Lokaler Produktionsserver ausschließlich in der Cloud: Editorial-Smoke mit Manifest2026-11-24-fuenf bestanden, zehn neue Seiten und57 HTTP-Ziele. Genau eineH1, erwarteter Titel, Description, Canonical, Indexierbarkeit, BlogPosting/Breadcrumb-JSON-LD, Inhaltsanker, interneLinks, Bestelleinstiege und Übersichtseinträge geprüft. Unbekannte Blog-/Ratgeber-Slugs liefern404.
- Globaler SEO-Smoke:124 Seiten, Redirects, Checkout-Metadaten, Sitemap und robots bestanden; kein Checkout-Abschluss.
- Zusätzlicher HTTP-/Quelltexttest für alle zehn Seiten: OG-Typ/URL, Datum, je ein Top-/Sidebar-Bannerslot und feste Bildmaße/Alt-Texte bestanden.
- Sitemap gegen öffentliche Ausgangssitemap:122→132 eindeutige URLs, exakt+10/-0. Automatische Einbindung in app/sitemap.ts verifiziert; Datei unverändert, keine künstlichen lastmod-Aktualisierungen.

Push und bestätigtes Deployment werden im folgenden Nachtrag dokumentiert. Dieser Abschnitt allein bestätigt noch keine öffentliche Veröffentlichung.
