# Ratgeber und Werbebanner pflegen

Die Ratgeberübersicht liegt unter `/ratgeber`, jeder Artikel unter `/ratgeber/<slug>`.
Die zehn Zulassungsthemen werden in `config/registration-guides.ts` gepflegt. Der vorhandene Größenratgeber wurde auf seiner bisherigen URL erweitert, um doppelte Inhalte zu vermeiden. Die beiden übrigen bisherigen Artikel bleiben erhalten.

## Inhalte

Jeder Artikel hat Einleitung, Kernaussage, gegliederte Abschnitte, optionale Tabellen und Checklisten, FAQ, Quellen, verwandte Artikel und einen Bestelleinstieg. Die Texte folgen AIDA: konkreter Einstieg, hilfreiche Erklärung, greifbarer Nutzen und passende Handlungsaufforderung. Lesezeiten werden mit 200 Wörtern pro Minute aus dem eigentlichen Text berechnet. Ändere das redaktionelle Prüfdatum nur nach einer erneuten Inhaltsprüfung.

Artikel erscheinen über `config/guides.ts` automatisch in Übersicht, statischen Routen und Sitemap. Slugs bleiben bei Textänderungen stabil.

## Zwei unabhängige Bannerplätze

In `config/guide-banners.ts` stehen `guideBanners.top` und `guideBanners.sidebar`. Die Konfiguration gilt für Übersicht und alle Artikel. Texte, Überschrift und Button lassen sich dort ändern. Der Bestelllink bleibt `/kennzeichen-bestellen`.

Für ein eigenes Motiv die Datei beispielsweise unter `public/ratgeber/banner-oben.webp` ablegen und im betreffenden Banner ergänzen:

```ts
image: {
  src: '/ratgeber/banner-oben.webp',
  alt: 'Deine Kennzeichenschilder bequem online bestellen',
  width: 1200,
  height: 400,
},
```

`image` ersetzt das eingebaute Schildmotiv. Das gesamte eigene Motiv ist ebenfalls mit der Bestellung verlinkt. Hochformatige Motive eignen sich für rechts, Querformate für oben. Bildmaße entsprechen den Originalmaßen. Ohne `image` erscheint die eingebaute Produktgestaltung. Lokale Dateien sind vorzuziehen; HTTPS-Bildadressen werden ebenfalls unterstützt.

Für einen einzelnen Artikel kann `guideBannerOverrides` die Slots unabhängig ersetzen:

```ts
export const guideBannerOverrides: Record<string, Partial<GuideBannerSlots>> = {
  'auto-anmelden-unterlagen': {
    top: {
      ...guideBanners.top,
      title: 'Unterlagen bereit? Jetzt die Schilder bestellen.',
      image: {
        src: '/ratgeber/banner-oben.webp',
        alt: 'Kennzeichen online bestellen',
        width: 1200,
        height: 400,
      },
    },
  },
};
```

Dies ist eine Pflege über Projektdateien; es wird kein zusätzliches Admin-CMS eingeführt. Bannerpreise und Versandkosten kommen aus derselben Produktkonfiguration wie der Shop. Preisangaben innerhalb eigener Bildmotive müssen redaktionell aktuell gehalten werden. Die rechte Spalte ist bei ausreichender Desktophöhe sticky; auf kleinen Bildschirmen wird sie unter dem Inhalt angezeigt.

## Fachliche Grundlage

Amtliche Quellen sind am jeweiligen Artikel verlinkt. Kennzeichenbestellung ist von Reservierung, Zulassung, Versicherung und amtlichen Plaketten getrennt. Der Artikel über Kurzzeitkennzeichen verkauft die spätere reguläre Schilderbestellung; der Shopkonfigurator wird nicht als Anbieter von Kurzzeitkennzeichen dargestellt.

Die zehn geprüften Themen sind Unterlagen, Kosten, Vollmacht, SEPA, HU, Fahrzeugpapiere, Kennzeichenmitnahme, Kurzzeitkennzeichen, Zulassungshindernisse und Größen. Aktueller redaktioneller Stand: 24.10.2026.
