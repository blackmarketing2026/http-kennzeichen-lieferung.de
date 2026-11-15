# Prüfbericht – 15. November 2026

## Umfang
8 neue Blogartikel und 2 neue Ratgeber; Titel und Routen in 2026-11-15-new-pages.json. 16 Blogs und 16 Ratgeber insgesamt. Bestehende Produktintentionen nicht durch Verkaufsartikel kopiert. H-Saison und Wechsel ausdrücklich als nicht angeboten beschrieben. Keine Preise, Garantien oder Liefertermine im neuen Fließtext erfunden. Quellen und Datenlücken im Briefing.

## Tatsächlich ausgeführte Prüfungen vor Veröffentlichung
- npm ci erfolgreich; Lockdatei unverändert. Next 16.3.5, installierte relevante API-Dokumentation gelesen.
- npm run build erfolgreich; nach Rückverlinkung erneut erfolgreich. TypeScript und statische Erzeugung abgeschlossen.
- npx oxlint config/blog.ts config/registration-guides.ts scripts/editorial-smoke.mjs scripts/seo-smoke.mjs erfolgreich. Kein globales Lint-Ergebnis behauptet; unveränderte Tabellenvorlage hatte bekannte Altbefunde.
- Redaktioneller HTTP-Smoke mit SEO_SMOKE_DATE=2026-11-15: 10 neue Seiten, 43 HTTP-Ziele erfolgreich. Genau eine H1, Titel, Description, Canonical, Indexierbarkeit, BlogPosting/BreadcrumbList, Abschnittsanker, interne Links, Bestelleinstiege, Übersichtsverlinkung und unbekannte Blog-/Ratgeber-Slugs mit 404 geprüft.
- Bestehender SEO-Smoke erfolgreich: 44 Seiten, Produktdaten, Redirects, Checkout-noindex, Sitemap, robots.txt.
- XML-Bestandsvergleich: vorher 42, nachher 52 eindeutige URLs, exakt das neue Zehnerpaket hinzugefügt, keine URL entfernt. app/sitemap.ts bindet beide Datenquellen bereits automatisch ein. Kein künstliches lastmod ergänzt.
- git diff --check erfolgreich.
- Responsive Umsetzung per Code geprüft: Artikelspalten unter 850px einspaltig, Karten unter 600px einspaltig; minmax(0,1fr), umbrechende Metadaten und Tabellenüberlauf vorhanden. Bestehende Banner mit aktuellen Produktpreisen und getrennten Zulassungshinweisen beibehalten. Keine zusätzlichen Bilder erforderlich. Keine visuelle Prüfung, Browseröffnung oder Screenshots; Codebefund ist kein visueller Nachweis.
- Rücklinks aus vorhandenem Lieferkontroll-Blog und Ersatzratgeber zum neuen Onlinezulassungsratgeber ergänzt. Bestehende Ratgeber zeigen neue zugeordnete Blogs automatisch. Bestehende Prüfdaten nicht pauschal aktualisiert.

## Shop- und Datenprüfung
HTTP 200 für Bestelleinstieg, E, H, Saison und Liefergarantie. Live-Quelltext bestätigt Standard ab 9,80 Euro, regulären Versand 4,90 Euro und Lieferangabe 1–4 Werktage nach Bestellung/Zahlung mit gesonderten Bedingungen. Diese Angaben nicht als zusätzliche redaktionelle Versprechen vervielfältigt. Code enthält getrennte E/H/Saison-Typen, keine H-Saison-/Wechsel-Ausführung. Keine Checkout-/Zahlungs-/Tracking-/Rechtstext-/Deploymentänderungen.
OpenSEO bestätigt am 15.11. weiterhin die ausgewählte Property https://www.kennzeichen-lieferung.de/ mit siteOwner, kein Reconnect nötig. Wochenanalyse vom 13.11. wiederverwendet. Neue Keywordvolumina fehlen wegen Providerfehler und anschließend unzureichenden Credits; drei SERP-Recherchen erfolgreich. Keine weiteren kostenpflichtigen Abrufe. Verfügbare OpenSEO-Werkzeuge enthalten keine GSC-Sitemap-Lese-/Einreichungsoperation; deshalb keine bestehende GSC-Sitemap-Einreichung bestätigt. robots.txt verweist auf die Sitemap. Keine Indexierung oder Verkäufe behauptet.

## Veröffentlichung
Dieser Bericht dokumentiert die Prüfung vor Übertragung auf main. Commitstatus und öffentliche Seiten werden nach Veröffentlichung separat bestätigt. Push allein ist kein Deploymentnachweis.

## Bestätigter Produktionsabschluss
Content-Commit https://github.com/blackmarketing2026/http-kennzeichen-lieferung.de/commit/6e589bf088f30a495e7af01c5e8575ebdf3a1a00 direkt auf main veröffentlicht, ohne Force-Push; vorheriger main unverändert und erwarteter SHA beim Update geprüft. Alle sieben übertragenen Dateien bytegleich mit lokal geprüftem Stand.
Vercel-Status success. Anschließend redaktioneller Smoke gegen https://www.kennzeichen-lieferung.de erfolgreich: alle 10 Seiten und insgesamt 43 HTTP-Ziele, erwartete Inhalte, Canonicals, Metadaten, strukturierte Daten, interne Links, Übersichten und 404. Öffentliche Sitemap erneut als XML geprüft: 52 eindeutige URLs, alle zehn neuen enthalten, keine bisherige entfernt. Keine Google-Indexierung behauptet. Rechercheprotokoll im zugehörigen OpenSEO-Projekt ergänzt.
