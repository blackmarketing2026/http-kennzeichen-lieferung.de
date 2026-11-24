# SEO-Prüfbericht – 24. November 2026, dritter Durchlauf

## Ergebnis vor Veröffentlichung

Sechs neue Blogartikel und vier ausführliche Ratgeber umgesetzt. Titel und endgültige Pfade stehen in `2026-11-24-drei-new-pages.json`. Vor Umsetzung gespeichertes Briefing: `2026-11-24-drei-briefing.md`. Ausgangspunkt main `3df6b4b37c68e529fbcd7d5a6582ca2c5e5b244a`, keine offenen PRs, Branch ungeschützt.

Themen: ungestempelte Zulassungsfahrten; HSN/TSN; Kupplungsnachrüstung; digitaler Fahrzeugschein nach Änderungen; beschädigte Stempelplakette; Fahrzeugfarbe und Papiere; Wiederzulassung nach langer Standzeit; Schwerbehinderung; Taxifahrzeuge; landwirtschaftliche Anhänger bis 25 km/h. Sportanhänger und allgemeine Kennzeichenmitnahme wegen Überschneidung verworfen. Keine zweite allgemeine Kaufseite. Schilderkauf bleibt von Zulassung, Versicherung, Genehmigungen und amtlichen Plaketten getrennt. Kein pauschaler Schilderneukauf empfohlen.

## Daten und Recherche

OpenSEO-Kontext und acht Rechercheeinträge gelesen. Ausgewählte GSC-Property https://www.kennzeichen-lieferung.de/ als siteOwner bestätigt. Keine andere Property genutzt oder geändert. Die Wochenanalyse vom 23.11. mit finalen 28-Tage-Vergleichen und zusätzlichem Dreimonatsfenster wiederverwendet; nächste Analyse frühestens 30.11. Keine Umsatz-/Conversiondaten verfügbar.

Drei neue OpenSEO-SERPs lieferten INSUFFICIENT_CREDITS. Keine Wiederholungsserie, keine Suchvolumina erfunden, keine zusätzlichen Tracker. Qualitative Themenlücken anhand des vollständigen Bestands und aktueller amtlicher Primärquellen geprüft. Auswahl ist kein quantitativ belegtes Rankingversprechen.

FZV §§3,4,10,12,13,15,16,29, Anlage6; KraftStG §3a; StVZO §19/AnlageVIII; BOKraft §42 aktuell geöffnet. Behördenbeispiele Berlin, Zoll-Portal und BMV mit Quellen im Briefing und direkt am Inhalt. BMV-Direktabrufe hatten Timeouts; amtliche aktuelle FAQ waren über den Suchabruf lesbar. Keine Browserumgehung. VWFS nur für die Feldübersicht verwendet; dortige pauschale Papierpflicht nicht übernommen, da die aktuelle BMV-Auskunft den offiziellen digitalen Inlandsnachweis beschreibt.

Wesentliche Faktenabgrenzungen: Nicht jede Wunschreservierung erlaubt eine ungestempelte Fahrt. Keine grüne Schrift wegen Schwerbehindertenvergünstigung. Sieben Jahre Stilllegung bedeuten nicht automatisch Vollgutachten; Onlineverfahren hat eigene Grenze. Landwirtschaftliche Zulassungsfreiheit hängt an allen gesetzlichen Voraussetzungen. Taxi ist nicht Selbstfahrervermietung. Kupplungsfreigabe gilt nur mit eingehaltenen Bedingungen. Beschädigte Siegel werden nicht privat repariert.

Aktueller Produktcode und öffentliche Bestellseite HTTP200 abgeglichen: 9,80 Euro Standard, 4,90 Euro Versand, 1–4 Werktage nach Bestellung/Zahlung im Quelltext bestätigt. Neue Artikel ohne festgeschriebene Preis-/Lieferzusagen. Grüne Produkte nur in den tatsächlich angebotenen Landmaschinenformaten; kein grünes520-mm-Angebot erfunden. Keine Bestellung ausgelöst.

## Umsetzung und ausgeführte Prüfungen

- AGENTS.md, CLAUDE.md, Vorlagen, Projektgedächtnis und frühere Briefings gelesen. Relevante installierte Next.js-16.3.5-Dokumentation vor Codeänderungen gelesen.
- Vorhandene Modelle, Design, Blog-/Ratgebertemplates und automatische Metadaten/Canonicals/OG/BlogPosting/Lesezeit beibehalten. Veröffentlichungstag 24.11.2026, bestehende globale Prüfdaten unverändert.
- Sechs Rücklinks aus bestehenden Blogs; drei zusätzliche Blog→Ratgeber-Zuordnungen sowie ein Ratgeberlink aus Firmenzulassung ergänzt. Bestehende 80 Einträge in den beiden Content-Dateien maschinell verglichen: Texte, Titel und Datumswerte erhalten, vorherige Links erhalten. Zwei Legacy-Ratgeber unverändert.
- `npm run build`: Exit0, TypeScript und statische Generierung bestanden.
- `npx oxlint config/blog.ts config/registration-guides.ts scripts/editorial-smoke.mjs scripts/seo-smoke.mjs`: Exit0.
- `git diff --check`: bestanden.
- Produktionsserver lokal ohne Browser: `SEO_SMOKE_DATE=2026-11-24-drei node scripts/editorial-smoke.mjs` mit lokalem Origin bestanden: 10 neue Seiten, 57 HTTP-Ziele. Prüft erwartete Titel, genau eine H1, Description, Canonical, Indexierbarkeit, BlogPosting/Breadcrumb-JSON-LD, Inhaltsanker, interneLinks, Übersichtseinträge und HTTP404 unbekannter Slugs.
- `node scripts/seo-smoke.mjs` mit lokalem Origin bestanden: 104 Seiten, Redirects, Checkout-Metadaten, Sitemap und robots. Kein Checkout-Abschluss.
- Zusätzlicher HTTP-/Quelltexttest aller zehn Seiten: OG-Typ/URL, Datum, genau ein oberer und ein seitlicher Bannerslot, Alt-Texte und feste Bildabmessungen bestanden.
- Öffentliche Ausgangssitemap102 URLs gegen erzeugte Sitemap112 URLs: exakt +10 neue kanonische Pfade, keine Entfernung, keine Duplikate. `app/sitemap.ts` bindet Inhalte automatisch ein und wurde nicht geändert. Keine künstlichen lastmod-Aktualisierungen.
- Responsive Code geprüft: minmax-Raster, Einspaltigkeit unter850px, mobile Banner unter600px, flexible Bildhöhe, Inhaltsverzeichnis, kurze Absätze und Checklisten. Vorhandenes Logo mit festen Abmessungen, vorhandene Codegrafik; keine neuen Rasterbilder erforderlich.
- Keine visuelle Prüfung, keine Browseröffnung/Simulation/Screenshots. Codeprüfung ist kein visueller Nachweis. Ausschließlich Cloud.

Shoplogik, Konfigurator, Checkout, Zahlungen, Tracking, Rechtstexte und Deploymentkonfiguration unverändert. Keine anderen Projekte oder Automationen verändert. Keine verfügbare Search-Console-Sitemap-Verwaltungsfunktion; keine Einreichung/Indexierung behauptet.

## Veröffentlichung

Alle Vorprüfungen bestanden. Push, Deploymentstatus und öffentliche HTTP-Nachweise folgen als datierter Nachtrag. Dieser Abschnitt allein bestätigt noch keine Veröffentlichung.
