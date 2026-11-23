# Prüfbericht – weiterer Durchlauf 23.11.2026

## Ergebnis vor Veröffentlichung
6 neue Blogartikel und 4 neue Ratgeber. Manifest: 2026-11-23-abend-new-pages.json. Ausgangspunkt main 7220ecae0ce55f32f6851f89b5d3d829a5885f6f. Eigenständige Themen und Quellen siehe datiertes Briefing. Bestehende Artikeltexte und Daten per Objektvergleich unverändert; lediglich passende Rücklinks in fünf vorhandenen Blogartikeln ergänzt. Produktseiten, Shoplogik, Tracking, Rechtstexte und Deploymentkonfiguration unverändert.

## Tatsächlich ausgeführte Prüfungen
- npm run build: erfolgreich mit Next 16.3.5 einschließlich TypeScript und statischer Erzeugung. Erster Versuch scheiterte an einem node_modules-Symlink außerhalb des Turbopack-Projektwurzelverzeichnisses. Lokale Kopie derselben installierten Abhängigkeiten behob die Cloud-Arbeitsumgebung; Wiederholung erfolgreich, keine Konfigurationsänderung.
- Gezieltes oxlint für beide Inhaltsdateien und beide vorhandenen Smoke-Skripte: Exit 0. git diff --check: bestanden.
- Editorial-Smoke: 10 neue Seiten, 52 HTTP-Ziele bestanden; Übersichten, H1, individuelle Description, Canonical, Indexierbarkeit, BlogPosting, Breadcrumbs, Anker, interne Links, Bestelleinstieg und unbekannte Slugs (404).
- Bestehender SEO-Smoke: 74 Seiten, Redirects, Checkout-Routing, Sitemap und robots bestanden. Keine Bestellung oder Zahlung ausgelöst.
- Zusätzlicher Sitemapvergleich: 72 auf 82 eindeutige URLs, genau die zehn neuen kanonischen URLs hinzugefügt, keine bisherigen entfernt. Automatische Einbindung in app/sitemap.ts über vorhandene Configs; keine Änderungen an Sitemapcode oder lastmod.
- Open Graph article/url und feste Bildabmessungen samt Alt-Attributen auf allen neuen Routen geprüft. Keine neuen Rasterbilder benötigt.
- Responsive Struktur anhand bestehendem Code: minmax(0,1fr), min-width:0, einspaltiger Artikel unter 850px, Karten/Banner unter 600px einspaltig, skalierbare Bilder. Keine visuelle Prüfung, Browseröffnung oder Simulation. Dies belegt keine tatsächliche visuelle Darstellung.
- Faktenprüfung: FZV und amtliche regionale Quellen, lokale Beispiele als solche benannt. Schilderkauf von Zulassung, Versicherung und Plaketten getrennt. Keine Preise oder Verfügbarkeitsgarantien in redaktionellen Texten eingefroren.

## Daten und Grenzen
Wochenanalyse vom heutigen früheren Durchlauf wiederverwendet; nächste Analyse frühestens 30.11.2026. Richtige GSC-Property geprüft. Drei gezielte OpenSEO-SERPs scheiterten mit INSUFFICIENT_CREDITS; ergänzende amtliche Recherche verwendet, keine erfundenen Volumina. GSC-Sitemapverwaltung über vorhandene Werkzeuge nicht verfügbar. Keine Einreichung oder Google-Indexierung bestätigt. Keine Umsatzdaten ausgewertet.

## Veröffentlichung
Vor Push aktuellen main erneut geprüft: unverändert, ungeschützt. Veröffentlichung und öffentliche HTTP-Prüfung stehen zum Zeitpunkt dieses Inhaltscommits noch aus; Nachtrag folgt nach erfolgreicher Kontrolle.

### Bestätigter Produktionsnachtrag, 23.11.2026, ca. 23:13 MEZ
- Inhaltscommit ca251b04368631a306a703df9294c88aa7465c85 direkt per Fast-Forward mit erwarteter main-SHA veröffentlicht, kein Force-Push. Alle sechs übertragenen Dateien anschließend per git fetch/git show bytegenau mit dem geprüften Arbeitsstand verglichen.
- Vercel-Commitstatus success: https://vercel.com/stefve/http-kennzeichen-lieferung-de/DhMtJKU8hJ8iohmczpTu4hXEd6Fm.
- Öffentlicher Editorial-Smoke gegen https://www.kennzeichen-lieferung.de erfolgreich: alle zehn neuen URLs HTTP 200 mit erwartetem Titel/Inhalt, Canonical, Metadaten, JSON-LD, internen Links, Übersichtsverlinkung und 404 für unbekannte Slugs. Insgesamt 52 HTTP-Ziele geprüft.
- Öffentliche Sitemap bestätigt: 82 eindeutige URLs; exakt zehn neue Einträge, keine der 72 vorherigen URLs entfernt.
- Somit 6 neue Blogs und 4 neue Ratgeber, alle 10 bestätigt live. Keine Google-Indexierung oder GSC-Sitemap-Einreichung behauptet.
