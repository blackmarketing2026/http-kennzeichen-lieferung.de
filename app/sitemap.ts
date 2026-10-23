import type { MetadataRoute } from 'next';
import { SEO_PRODUCT_SLUGS } from '@/config/seo-products';
import { guides } from '@/config/guides';
import { absoluteUrl } from '@/lib/seo';

const routes = [
  '/', '/kennzeichen-bestellen', '/autokennzeichen-express-lieferung', '/motorradkennzeichen-bestellen', '/landmaschinen-kennzeichen',
  '/autohaendlerpartner', '/din-74069', '/liefergarantie',
  '/ratgeber', ...SEO_PRODUCT_SLUGS.map(slug => `/${slug}`),
  ...guides.map(guide => `/ratgeber/${guide.slug}`),
  '/impressum', '/datenschutz', '/widerruf',
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(route => ({
    url: absoluteUrl(route),
    changeFrequency: route.startsWith('/ratgeber/') || ['/impressum', '/datenschutz', '/widerruf'].includes(route) ? 'yearly' : 'monthly',
    priority: route === '/' ? 1 : route.startsWith('/ratgeber/') ? 0.6 : ['/impressum', '/datenschutz', '/widerruf'].includes(route) ? 0.2 : 0.8,
  }));
}
