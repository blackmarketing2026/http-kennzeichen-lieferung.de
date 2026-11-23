# Prüfbericht 24.11.2026

## Umfang
6 neue Blogs,4 neue ausführliche Ratgeber; Manifest 2026-11-24-new-pages.json. Basis main2e972ff0f7599cc118bf9902078acb26d21eb59b, vor Push unverändert und ungeschützt, keine offenen PRs. Rücklinks in sechs Bestandsblogs und einem bestehenden Ratgeber ergänzt. Bestandsinhalte und Daten per Objektvergleich (abgesehen von verwandten Links) unverändert. Kein Eingriff in Shop, Checkout, Tracking, Rechtstexte oder Deploymentkonfiguration.

## Ausgeführte Prüfungen
- npm run build erfolgreich mit Next16.3.5, TypeScript und statischer Routenerzeugung. Installierte Next-Dokumentation vor Codeänderungen gelesen.
- npx oxlint config/blog.ts config/registration-guides.ts scripts/editorial-smoke.mjs scripts/seo-smoke.mjs: Exit0. git diff --check bestanden.
- Editorial-Smoke:10 neue Seiten und49 HTTP-Ziele bestanden. Je Seite HTTP200, erwarteter Titel, genau eine H1, Description, Canonical, indexierbar, BlogPosting/Breadcrumbs, Inhaltsanker, interne Links, Bestelleinstiege und Verlinkung aus der Übersicht. Unbekannte Blog-/Ratgeberslugs liefern404.
- Bestehender SEO-Smoke:84 Seiten, Redirects, Checkout-Routing, Sitemap und robots bestanden. Keine Bestellung oder Zahlung ausgeführt.
- Zusätzlicher Vergleich: Sitemap82→92, exakt die zehn Manifest-URLs hinzugefügt, null entfernt, keine Duplikate. app/sitemap.ts übernimmt die Configs automatisch und blieb unverändert; keine künstlichen lastmod-Änderungen.
- Alle neuen Seiten: OpenGraph article und richtige URL, Datum24.11.2026, genau ein oberer und ein seitlicher Bannerplatz, feste img-Abmessungen und Alt-Attribute vorhanden. Eindeutige Descriptions und gültige verwandte Ratgeber geprüft.
- Responsive Struktur nur anhand Code geprüft: gemeinsame Vorlage, minmax(0,1fr), einspaltiger Artikel unter850px, einspaltige Karten/Banner unter600px, skalierbare Bilder. Kein Browser, keine Simulation/Screenshots oder visuelle Kontrolle. Codeprüfung belegt keine tatsächliche visuelle Darstellung.
- Redaktionell: kurze Absätze, konkrete Verfahrensabgrenzung, Quellen am Artikel, keine hypothetischen Produkte als bestellbar dargestellt. Gesetzliche Aussagen gegen aktuelle amtliche Texte geprüft. Regionale Verfahrensbeispiele ausdrücklich als solche markiert. Neue Texte vermeiden eingefrorene Shoppreise und Liefergarantien. Keine neuen Bilder nötig.

## Daten und Grenzen
OpenSEO-Kontext und passende GSC-Bindung geprüft. Wochenanalyse23.11. wiederverwendet, nächste frühestens30.11. Drei gezielte neue SERPs INSUFFICIENT_CREDITS; amtliche Recherche ergänzt, keine erfundenen Suchvolumina. Keine belastbaren Umsatzdaten. GSC-Sitemapverwaltung nicht verfügbar, keine Einreichung/Indexierung bestätigt.

## Offene fachliche Wiedervorlage
Ausländische E-Plakette: §79(9) FZV nennt aktuell das Ende der Anwendung von§11/Anlage3 mit31.12.2026. Artikel nennt diese Grenze ausdrücklich. Vor Aussagen zu2027 erneut amtlichen Stand prüfen; auch vorhandene E-Themen dann auf Folgewirkungen prüfen. Keine neue Automation angelegt.

## Veröffentlichung
Push und öffentliche Produktionsprüfung stehen beim Inhaltscommit noch aus. Bestätigter Nachtrag folgt im selben Durchlauf nach HTTP-Kontrolle.

### Produktionsnachtrag, 24.11.2026, 00:12 MEZ
- Inhaltscommit 3c1748f5591c47c9b97b87e6d44b181ae32e9aa2 direkt auf main per Fast-Forward und erwarteter Ausgangs-SHA veröffentlicht. Kein Force-Push. Anschließend alle sechs Dateien per git fetch/show bytegenau mit geprüftem Stand verglichen.
- Vercel success: https://vercel.com/stefve/http-kennzeichen-lieferung-de/9R2KLApFxDdmqj95JJL3cmNen7Bs.
- Öffentlicher Editorial-Smoke erfolgreich: alle10 neuen URLs HTTP200 mit erwarteten Titeln, Canonicals, Metadaten, JSON-LD, internen Links, Übersichten und unbekannten Slugs404. Insgesamt49 HTTP-Ziele.
- Live-Sitemap92 eindeutige URLs: exakt10 neue kanonische Einträge, keine der82 vorherigen entfernt.
- Ergebnis:6 neue Blogs und4 neue Ratgeber, alle10 bestätigt live. Keine Google-Indexierung oder GSC-Sitemap-Einreichung bestätigt.
