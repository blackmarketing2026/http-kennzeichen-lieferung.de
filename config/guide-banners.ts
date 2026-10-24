export type GuideBanner = {
  eyebrow: string;
  title: string;
  text: string;
  button: string;
  /** Optional local asset path or HTTPS image URL; omit for the built-in product design. */
  image?: { src: string; alt: string; width: number; height: number };
};
export type GuideBannerSlots = { top: GuideBanner; sidebar: GuideBanner };

/** Edit copy or add an image here to replace banners across the entire guide section. */
export const guideBanners: GuideBannerSlots = {
  top: {
    eyebrow: 'DEINE KOMBINATION. DEINE SCHILDER.',
    title: 'Kennzeichen online bestellen. Einen Schritt weiter.',
    text: 'Kombination bestätigt? Wähle deine Schilder bequem online und lass sie dir nach Hause liefern.',
    button: 'Jetzt Kennzeichen bestellen',
  },
  sidebar: {
    eyebrow: 'BEREIT FÜR DEIN AUTO?',
    title: 'Die passenden Schilder. Direkt zu dir.',
    text: 'Auto, Motorrad oder Anhänger: Konfiguriere die passende Ausführung für deine bestätigte Kombination.',
    button: 'Kennzeichen bestellen',
  },
};

/** Optional per-article replacements, keyed by the guide slug. Both slots remain independently editable. */
export const guideBannerOverrides: Record<string, Partial<GuideBannerSlots>> = {};
export function getGuideBanners(slug?: string): GuideBannerSlots {
  return { ...guideBanners, ...(slug ? guideBannerOverrides[slug] : undefined) };
}
