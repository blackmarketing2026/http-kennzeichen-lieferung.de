import Image from 'next/image';
import { ArrowRight, PackageCheck, Timer } from 'lucide-react';
import styles from './production-promo.module.css';

export function ProductionPromo() {
  return (
    <section className={styles.section} aria-labelledby="production-title">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}><Timer size={18} aria-hidden="true" /> DIREKT NACH DEINER BESTELLUNG</p>
          <h2 id="production-title">In 10 Minuten geprägt und versandfertig.</h2>
          <p className={styles.lead}>Deine Kennzeichen werden direkt geprägt, sicher im Karton verpackt und für die nächste DHL-Abholung vorbereitet.</p>
          <div className={styles.steps}>
            <span><strong>01</strong> Kennzeichen prägen</span>
            <span><strong>02</strong> Sicher verpacken</span>
            <span><strong>03</strong> Versandfertig</span>
          </div>
          <a className={styles.cta} href="#konfigurator">Jetzt Kennzeichen gestalten <ArrowRight size={19} aria-hidden="true" /></a>
        </div>
        <div className={styles.visual}>
          <Image src="/shipping/kennzeichen-versandkarton.webp" alt="Zwei beispielhafte Kennzeichen vor einem Versandkarton" width={1536} height={1024} sizes="(max-width: 900px) 100vw, 50vw" loading="lazy" />
          <span className={styles.badge}><PackageCheck size={20} aria-hidden="true" /> Bereit für den Versand</span>
        </div>
      </div>
    </section>
  );
}
