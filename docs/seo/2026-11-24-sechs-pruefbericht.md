# Prüfbericht 24.11.2026 – sechster Durchlauf

## Teilerfolg, Mindestmenge nicht erreicht

Neu: 0 Blogartikel, 1 vollständiger Ratgeber. Neun weitere eigenständige neue Seiten in diesem Lauf nicht ausreichend validiert; Kandidatenabgleich im Briefing. Keine Behauptung einer vollständigen Themenerschöpfung. Neue OpenSEO-SERP-Abfragen waren wegen INSUFFICIENT_CREDITS nicht verfügbar. Weitere Themenrecherche bleibt offen, insbesondere amtliche Belege zu Ablastung; keine ungesicherten Texte zur Mengenfüllung. Vorläufe zählen nicht zur neuen Menge.

Neue URL: https://www.kennzeichen-lieferung.de/ratgeber/auslaendische-kennzeichen-deutschland

## Ausgeführte Prüfungen

- npm run build erfolgreich, Next16.3.5, 165 statische Routen. Nicht blockierende npm-Warnung zur bestehenden http-proxy-Umgebungsoption.
- npx oxlint config/blog.ts config/registration-guides.ts app/sitemap.ts scripts/editorial-smoke.mjs erfolgreich; git diff --check erfolgreich.
- Bestehender Editorial-Smoke mit Manifest 2026-11-24-sechs: 1 neue Route, 30 HTTP-Ziele, H1, Titel, Description, Canonical, Indexierbarkeit, BlogPosting/Breadcrumb, interne Links/Anker, Übersicht und unbekannte Blog-/Ratgeber-Slugs404 erfolgreich.
- Globaler bestehender SEO-Smoke:125 Seiten, Redirects, Checkout-Quelltext, Sitemap/Robots erfolgreich. Keine Bestellung/Zahlung ausgelöst.
- Zusätzlicher HTTP-Check: OG article/URL, Datum, genau1 Top-/Sidebar-Banner, vorhandene Bild-Altattribute und feste Dimensionen erfolgreich.
- Erzeugte Sitemap133 eindeutige URLs; gegenüber vorab per HTTP gesicherten132 URLs exakt+1/-0. Automatische config/guides-Einbindung bestätigt; app/sitemap.ts unverändert, keine erfundenen lastmod.
- 69 bisherige Blogobjekte und41 bisherige Ratgeberobjekte inhaltlich unverändert, ausschließlich passende Related-Verweise ergänzt. Legacy-Seiten unverändert.
- Responsiver Code gelesen: bestehende Einspaltenwechsel850px/600px, flexible Breiten, Banner/CTA; keine neue Layoutänderung. Keine visuelle Prüfung, kein Browser; daraus folgt kein Nachweis tatsächlicher Darstellung.
- Aktuelle Website: Bestelleinstieg HTTP200, Preis-/Versand-/Liefertext vorhanden; Produktcode Standard520mm9,80€/Schild. Neuer Ratgeber verspricht keine Preise/Expresszeiten oder nicht angebotene Produkte.
- Quellenprüfung FZV46/47, KraftStG3 und amtlicher Neu-Ulm-Hinweis; Besuch/Standort, Fristen und Sonderfälle getrennt. Versicherung/Zoll/Zulassung/Schilder getrennt.

## Technische Besonderheit

Erster lokaler Next-Start ohne Hostangabe scheiterte an uv_interface_addresses der Cloudumgebung. Wiederholung mit --hostname127.0.0.1 erfolgreich; alle oben genannten HTTP-Prüfungen anschließend vollständig ausgeführt. Keine Projekt-/Deploymentkonfiguration dafür geändert.

## Daten und Veröffentlichung

Korrekte GSC-Property erneut geprüft; Wochenanalyse23.11. wiederverwendet, nächster Vergleich ab30.11. Kein neuer Umsatznachweis. Kein verfügbares GSC-Sitemapverwaltungswerkzeug; keine Einreichung/Indexierung behauptet. OpenSEO dreimal INSUFFICIENT_CREDITS; keine Suchvolumina erfunden.

Stand vor Push: lokal geprüft, öffentliche Veröffentlichung noch nicht bestätigt. Main vor Veröffentlichung erneut abgleichen; Deploymentstatus und öffentliche Route/Sitemap danach per API/HTTP prüfen. Keine anderen Projekte/Automationen geändert.
