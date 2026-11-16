# Prüfbericht – 16. November 2026

## Paket und fachliche Prüfung
8 neue Blogs, 2 neue Ratgeber, keine Übersichten zur Mindestmenge gerechnet. Titel und Routen im datierten Manifest. Gesamtbestand danach24 Blogs und18 Ratgeber. Bestehende Suchintentionen/Produktseiten anhand der Daten und bisherigen Briefings abgeglichen. Quellen und Abgrenzungen vor Umsetzung im Briefing dokumentiert; Artikel enthalten passende Primärquellen.
Wichtige Angebotsgrenzen: Carbon-Optik auf Aluminium, keine 3D-Kunststoffschilder; keine Versicherungskennzeichen/Leuchten; grüne Schrift nur in vorhandenen Landmaschinenformaten, keine grüne520-mm-Anhängerausführung. Keine erfundenen Tests, Garantien, Rabatte oder Zertifikate. Namensänderung, Beleuchtungsdefekt und unveränderte Kombination nicht als pauschaler Neukaufanlass dargestellt.

## Ausgeführte Prüfungen
- npm ci erfolgreich, Lockdatei unverändert. Next16.3.5, lokale relevante Dokumentation gelesen.
- npm run build erfolgreich, nach finaler Slug-Korrektur erneut erfolgreich; TypeScript und statische Erzeugung abgeschlossen.
- npx oxlint config/blog.ts config/registration-guides.ts scripts/editorial-smoke.mjs scripts/seo-smoke.mjs erfolgreich. Kein globales Lint-Ergebnis behauptet; unveränderte Ratgebervorlage nicht umgebaut.
- Editorial-Smoke mit SEO_SMOKE_DATE=2026-11-16 erfolgreich: 10 neue Seiten/47 HTTP-Ziele. 200, eine H1, erwartete Titel, individuelle Description, Canonical, Indexierbarkeit, BlogPosting/BreadcrumbList, Abschnittsanker, interne Links, Bestelleinstiege, Übersichten und unbekannte Slugs404.
- Bestehender SEO-Smoke erfolgreich: 54 Seiten, Produktmarkierungen, Redirects, Checkout-noindex, Sitemap/robots.
- Zusätzliche HTTP-Prüfung für alle zehn: Open-Graph-Artikeltyp und URL, Datum16.11., beide Banner und einzigartige Descriptions erfolgreich.
- Sitemap als XML verglichen:52 vorher,62 nachher, zehn erwartete neue URLs, keine entfernten, keine Duplikate. Automatische Einbindung aus config/blog.ts und config/guides.ts verifiziert. app/sitemap.ts unverändert, kein erfundenes lastmod.
- git diff --check erfolgreich. Bestehende Texte erhalten; passende Rücklinks aus Herstellungs- und Bestellfehler-Blog ergänzt. Ratgeber verlinken zugeordnete neue Blogs automatisch. Alte Prüfdaten nicht pauschal erneuert.
- Responsive Umsetzung anhand tatsächlichem Code: einspaltige Artikel unter850px, Karten unter600px, minmax(0,1fr), umbrechende Inhalte und Tabellenüberlauf. Bestehende Schildillustrationen ohne amtliche Siegel, Logo mit festen Maßen, keine zusätzlichen Bilddateien nötig. Keine visuelle Prüfung, Browseröffnung oder Screenshots; Codeprüfung belegt keine tatsächliche visuelle Darstellung.

## Shop und Datenzugriff
Live-HTTP200 für Bestelleinstieg, Anhänger, Carbon, Motorrad und Liefergarantie. Quelltext bestätigt Standardpreis ab9,80 Euro, regulären Versand4,90 Euro, Lieferangabe1–4 Werktage nach Bestellung/Zahlung mit gesonderten Bedingungen. Neue Texte vervielfältigen keine festen Liefer-/Preiszusagen. Banner ziehen aktuelle Werte aus Produktkonfiguration. Keine Änderungen an Shop, Konfigurator, Checkout, Zahlungen, Tracking, Rechtstexten oder Deployment.
OpenSEO-Kontext/Protokoll gelesen. Passende GSC-Property erneut bestätigt; Wochenanalyse13.11. wiederverwendet, nächste reguläre Analyse ab20.11. Drei neue SERP-Anfragen scheiterten mit INSUFFICIENT_CREDITS, keine Wiederholung und keine erfundenen Volumina. Amtliche Webrecherche als dokumentierte Ergänzung. Kein Kauf von Credits oder Trackern.
Verfügbare OpenSEO-Werkzeuge bieten keine GSC-Sitemap-Lese-/Einreichungsoperation. Deshalb keine bestehende Einreichung oder Google-Indexierung bestätigt. robots.txt-Sitemapverweis geprüft. Klicks nicht als Käufe interpretiert, keine Umsatzdaten verfügbar.

## Veröffentlichung
Vor Übertragung aktuelles main fe74c044a9e576d75fe0a788e5e71e9f915d1ee8 erneut abgeglichen. Nach Push werden Deploymentstatus und öffentliche Seiten/Sitemap separat geprüft; dieser Abschnitt ist noch kein Live-Nachweis.

## Bestätigter Abschluss
Content-Commit https://github.com/blackmarketing2026/http-kennzeichen-lieferung.de/commit/60af6cac97d0d8bf2867686eda935795359e78ba direkt auf main veröffentlicht; erwarteter Vorgänger beim Update geprüft, kein Force-Push. Alle sechs übertragenen Dateien bytegleich mit lokal geprüftem Stand.
Vercel meldet success. Anschließender redaktioneller Smoke auf der öffentlichen Domain erfolgreich:10 neue Seiten,47 HTTP-Ziele, erwartete Inhalte, Metadaten, Canonicals, strukturierte Daten, Links, Übersichten und404. Live-Sitemap als XML geprüft:62 eindeutige URLs, alle zehn neuen enthalten, keine bisherigen entfernt. OpenSEO-Rechercheprotokoll ergänzt. Keine GSC-Einreichung/Google-Indexierung behauptet.
