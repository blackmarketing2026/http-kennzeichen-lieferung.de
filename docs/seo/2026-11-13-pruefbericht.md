# Prüfbericht – 13. November 2026

## Ergebnis vor Veröffentlichung
10 neue Seiten: 8 Blogs und 2 Ratgeber, vollständige URL-/Titelliste in 2026-11-13-new-pages.json. Keine vorhandenen Artikel ersetzt. Neue sachliche Inhalte anhand der im Briefing und in den Artikeln verlinkten Quellen geprüft. Verlust/Diebstahl zusammengefasst; Beschädigung getrennt. Kein fester Preis, Liefertermin, amtliche Plakette oder isolierter Zusatzschildverkauf versprochen.

## Ausgeführte Prüfungen
- npm ci erfolgreich, Lockdatei unverändert. Installierte Version Next.js 16.3.5; relevante lokale Dokumentation gelesen.
- npm run build erfolgreich, einschließlich TypeScript und statischer Erzeugung aller 10 neuen Routen.
- Gezieltes oxlint auf Blogdaten, Ratgeberdaten, beiden Blogseiten und beiden Smoke-Skripten erfolgreich.
- Gesamte berührte Ratgebervorlage: zwei schon auf main vorhandene Lintbefunde am unveränderten Tabellencontainer (prefer-tag-over-role / no-noninteractive-tabindex). Nicht als neuer Fehler ausgegeben, nicht sachfremd umgebaut. Kein globales Lint-Erfolgsergebnis behauptet.
- scripts/editorial-smoke.mjs gegen Cloud-Produktionsserver erfolgreich: 10 neue Seiten, 37 HTTP-Ziele, Status 200, genau eine H1, Titel, Description, Canonical, Indexierbarkeit, BlogPosting und BreadcrumbList, Inhaltsverzeichnis-Anker, interne Links, Bestelleinstiege, Übersichtslinks und 404 bei unbekannten Slugs.
- scripts/seo-smoke.mjs erfolgreich: 34 Seiten einschließlich vorhandener Produktseiten, Redirects, Checkout-noindex, Sitemap und robots.txt. Veraltete feste Ratgeberliste im Test durch aktuelle redaktionelle Daten ersetzt; Expressseite ergänzt.
- Sitemap als XML geparst. Live-Bestand vor Änderung 32 URLs, erzeugter Stand 42: genau zehn neue, keine entfernten und keine doppelten URLs. app/sitemap.ts selbst benötigt keine Änderung, weil Datenmodell automatisch eingebunden wird.
- git diff --check erfolgreich. Keine Checkout-, Zahlungs-, Preis-, Tracking-, Rechtstext- oder Deploymentänderungen.
- Responsive CSS per Code geprüft: einspaltige Artikel unter 850px, einspaltige Karten unter 600px, umbrechende Navigation/Metadaten, minmax(0,1fr), Tabellenüberlauf. Bestehende Bannerillustrationen und Logo weiterverwendet, keine neuen Bilddateien nötig. Keine visuelle Prüfung, kein Browser, keine Screenshots.

## Kleine Vorlagenkorrekturen
Sichtbare beschädigte Umlaute in Blogvorlagen korrigiert. Optionale relatedLinks für passende redaktionelle/Produktlinks; Ratgeber verlinken zu zugeordneten Blogs. Optionales reviewedAt für neue Ratgeber, gemeinsames altes Prüfdatum nicht verändert. HTML und strukturierte Daten nutzen dasselbe individuelle Datum.

## Cloud-Laufzeit
Erster Serverstart ohne expliziten Host meldete uv_interface_addresses-Fehler; mit 127.0.0.1 erfolgreich. Separate Befehlsumgebungen teilen keinen Loopback; Tests deshalb mit Server im selben Prozesskontext ausgeführt. Diese Umgebungsprobleme wurden behoben und sind keine Produktfehler.

## Veröffentlichungsprüfung
Zum Zeitpunkt dieses Berichts lokal geprüft und zur Veröffentlichung vorbereitet. Nach Übertragung auf main werden Commitstatus, neue Live-Seiten und öffentliche Sitemap per HTTP/API geprüft. Ein Push allein wird nicht als Deployment oder Indexierung ausgegeben. Keine GSC-Sitemap-Einreichung durchgeführt: verfügbare OpenSEO-Funktionen bieten dafür keine passende Operation. robots.txt verweist auf die Sitemap; GSC-Property durch erfolgreichen Leistungsabruf bestätigt.
