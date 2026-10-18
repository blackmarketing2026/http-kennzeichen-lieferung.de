export const SITE_URL = 'https://www.kennzeichen-lieferung.de';

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

export function safeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

export function breadcrumbJsonLd(items: { name: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem', position: index + 1, name: item.name, item: absoluteUrl(item.href),
    })),
  };
}
