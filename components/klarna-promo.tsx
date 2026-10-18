import Image from 'next/image';
import { ArrowRight, Check, LockKeyhole } from 'lucide-react';
import styles from './klarna-promo.module.css';

export function KlarnaPromo() {
  return (
    <section className={styles.section} aria-labelledby="klarna-promo-title">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <div className={styles.brand}>
            <Image src="/payments/klarna-mark.svg" alt="" width={52} height={52} unoptimized />
            <span>Klarna</span>
          </div>
          <p className={styles.eyebrow}>EINFACH BEZAHLEN</p>
          <h2 id="klarna-promo-title">Kennzeichen jetzt bestellen. Mit Klarna bezahlen.</h2>
          <p className={styles.intro}>Gestalte dein Kennzeichen und wähle Klarna im Checkout als Zahlungsart. Schnell und einfach bei deiner Bestellung.</p>
          <a className={styles.button} href="#konfigurator">Jetzt mit Klarna bestellen <ArrowRight size={19} aria-hidden="true" /></a>
          <p className={styles.security}><LockKeyhole size={16} aria-hidden="true" /> Sichere Zahlungsabwicklung im Checkout</p>
        </div>

        <div className={styles.showcase} aria-hidden="true">
          <div className={styles.logoCard}>
            <Image src="/payments/klarna-mark.svg" alt="" width={126} height={126} unoptimized />
          </div>
          <div className={styles.checkoutCard}>
            <span className={styles.checkoutLabel}>ZAHLUNGSART</span>
            <div className={styles.checkoutChoice}>
              <Image src="/payments/klarna-mark.svg" alt="" width={46} height={46} unoptimized />
              <strong>Klarna</strong>
              <span className={styles.check}><Check size={18} /></span>
            </div>
            <span className={styles.checkoutNote}>Im Checkout auswählen</span>
          </div>
        </div>
      </div>
    </section>
  );
}
