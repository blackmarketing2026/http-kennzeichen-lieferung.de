import Link from 'next/link';
import { ArrowRight, Truck } from 'lucide-react';
import { formatPrice, PRODUCTS, SHIPPING_CENTS } from '@/config/products';
import type { GuideBanner as BannerContent } from '@/config/guide-banners';
import styles from '@/app/ratgeber/ratgeber.module.css';

export function GuideBanner({ content, position }: { content: BannerContent; position: 'top' | 'sidebar' }) {
  return <section className={`${styles.banner} ${position === 'sidebar' ? styles.bannerSidebar : styles.bannerTop}`} aria-label="Werbung für unsere Kennzeichenbestellung" data-banner-slot={position}>
    <span className={styles.adLabel}>Anzeige · kennzeichen-lieferung.de</span>
    {content.image ? <Link href="/kennzeichen-bestellen" className={styles.bannerImage}>
      {/* Standard img also supports externally hosted campaign creatives without Next image host configuration. */}
      <img src={content.image.src} alt={content.image.alt} width={content.image.width} height={content.image.height} loading={position === 'top' ? 'eager' : 'lazy'} />
    </Link> : <div className={styles.bannerPlate} aria-hidden="true"><span>D</span><strong>DE IN 123</strong></div>}
    <div className={styles.bannerCopy}><span className={styles.bannerEyebrow}>{content.eyebrow}</span><h2>{content.title}</h2><p>{content.text}</p>
      <p className={styles.bannerPrice}>Autokennzeichen ab <strong>{formatPrice(PRODUCTS.standard.prices[1])}</strong> pro Schild</p>
      <small>inkl. MwSt., zzgl. {formatPrice(SHIPPING_CENTS / 100)} Versand pro Bestellung</small>
      <Link className={styles.bannerButton} href="/kennzeichen-bestellen">{content.button}<ArrowRight size={18} aria-hidden="true" /></Link>
      <span className={styles.bannerDelivery}><Truck size={15} aria-hidden="true" /> Lieferung per DHL</span>
      <small>Geprägte Schilder. Reservierung, Zulassung und amtliche Plaketten sind nicht enthalten.</small>
    </div>
  </section>;
}
