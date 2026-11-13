# Blog- und Ratgebervorlagen

## Ziel und Aufbau

Der Blog liegt unter `/blog`, ver?ffentlichte Beitr?ge unter `/blog/<slug>`. Die ?bersicht (`app/blog/page.tsx`) und die Artikelvorlage (`app/blog/[slug]/page.tsx`) ?bernehmen das bew?hrte Ratgeberdesign aus `app/ratgeber/ratgeber.module.css`: Logo und Navigation, Breadcrumbs, Einleitung, Werbebanner, Karten beziehungsweise Artikel mit Inhaltsverzeichnis, Seitenleiste und passendem n?chsten Schritt. Die ?bersicht zeigt bei fehlenden Artikeln einen ehrlichen Leerzustand. Der Footer verlinkt den Blog.

Die Vorlagen sind Code, keine ?ffentlichen Musterseiten mit Platzhaltertext. Pflege erfolgt in Projektdateien; es gibt kein Admin-CMS. Nur ver?ffentlichungsreife Artikel in `config/blog.ts` eintragen: Sie erscheinen automatisch in der ?bersicht, als Route und in `app/sitemap.ts`. F?r ?nderungen ist ein neuer Build beziehungsweise ein Deployment n?tig. Keine Entw?rfe oder Beispieltexte im Array ver?ffentlichen.

## Vorlage f?r einen neuen Blogartikel

Diesen Eintrag innerhalb von `blogArticles` in `config/blog.ts` anhand recherchierter Inhalte ausf?llen:

```ts
{
  slug: 'eindeutiger-kurzer-slug',
  title: 'Konkreter Artikeltitel',
  description: 'Ein pr?gnanter Teaser und die Meta-Beschreibung.',
  category: 'Passende Kategorie',
  publishedAt: '2026-11-13', // tats?chliches Ver?ffentlichungsdatum
  // updatedAt: '2026-11-13', // nur nach tats?chlicher ?berarbeitung
  intro: ['Hilfreicher Einstieg in das Thema.'],
  takeaway: 'Die wichtigste Antwort in wenigen S?tzen.',
  sections: [
    { id: 'erster-abschnitt', title: 'Aussagekr?ftige Zwischen?berschrift', paragraphs: ['Recherchierter Inhalt.'], items: ['Optionaler Listenpunkt'] },
    { id: 'zweiter-abschnitt', title: 'Weitere Zwischen?berschrift', paragraphs: ['Weiterer Inhalt.'] },
  ],
  sources: [{ label: 'Bezeichnung der Originalquelle', href: 'https://example.com/' }],
  relatedGuideSlugs: ['auto-anmelden-unterlagen'],
}
```

Beispieldaten nicht unver?ndert ver?ffentlichen. `sources`, `relatedGuideSlugs`, `updatedAt` und `items` sind optional. Pro Artikel eindeutige stabile Slugs und Abschnitts-IDs verwenden; echte ISO-Daten eintragen. Nur vorhandene Ratgeber-Slugs verlinken. Aussagen zu Recht, Preisen und Fristen anhand aktueller, m?glichst amtlicher Quellen pr?fen, regionale Unterschiede beachten und Quellen passend verlinken. Kennzeichenschilder, Reservierung, Zulassung und amtliche Plaketten klar unterscheiden. Keine erfundenen Fakten oder Ver?ffentlichungsdaten. Lesezeit wird aus dem Artikeltext berechnet. Canonical, Open Graph, Breadcrumb- und BlogPosting-Daten werden automatisch erzeugt.

## Ratgebervorlagen

Bestehende ?bersicht: `app/ratgeber/page.tsx`; Artikelvorlage: `app/ratgeber/[slug]/page.tsx`. Neue ausf?hrliche Zulassungsratgeber nach dem bestehenden Datentyp in `config/registration-guides.ts` erg?nzen. `config/guides.ts` ?bernimmt sie in ?bersicht, Routen und Sitemap. Artikel bestehen dort aus Einleitung, Kernaussage, Inhaltsverzeichnis, Abschnitten, optionalen Listen und Tabellen, FAQ, Quellen, verwandten Artikeln und Bestelleinstieg. Die Konfiguration der beiden Werbepl?tze und weitere Hinweise stehen in `docs/RATGEBER.md`. Das dortige gemeinsame Pr?fdatum nur nach Pr?fung aller davon betroffenen Inhalte ?ndern. Bestehende URLs und Inhalte nicht durch Blogkopien duplizieren; Blog und Ratgeber sinnvoll miteinander verlinken.

## Pr?fung vor Abschluss

`npm run build` ausf?hren; ?bersicht und Artikel auf Desktop und Mobilger?ten pr?fen. Pr?fen: Footer-Link, leere beziehungsweise bef?llte ?bersicht, Artikelroute, unbekannter Slug (404), H1, Canonical, strukturierte Daten und Sitemap. Bei neuen Inhalten sachliche Quellen und interne Links pr?fen. Keine Ver?ffentlichung oder Push ohne passenden Auftrag.
