import Image from 'next/image';
import { ArrowRight, Clock3, Sun, SunMedium, Sunset, Truck } from 'lucide-react';
import styles from './dhl-pickup-promo.module.css';

const pickups = [
  { label: 'Morgens', icon: Sun },
  { label: 'Mittags', icon: SunMedium },
  { label: 'Nachmittags', icon: Sunset },
] as const;

export function DhlPickupPromo() {
  return (
    <section className={styles.section} aria-labelledby="dhl-pickup-title">
      <div className={styles.inner}>
        <div className={styles.heading}>
          <div>
            <p className={styles.eyebrow}><Truck size={18} aria-hidden="true" /> VERSAND MIT DHL</p>
            <h2 id="dhl-pickup-title">Dreimal täglich abgeholt. Schnell auf dem Weg zu dir.</h2>
            <p className={styles.lead}>DHL holt deine Kennzeichen an Werktagen morgens, mittags und nachmittags bei uns ab.</p>
          </div>
          <Image className={styles.logo} src="/shipping/dhl.svg" alt="DHL" width={440} height={97} unoptimized />
        </div>

        <div className={styles.pickups} aria-label="DHL-Abholungen an Werktagen">
          {pickups.map(({ label, icon: Icon }, index) => (
            <div className={styles.pickup} key={label}>
              <span className={styles.icon}><Icon size={30} strokeWidth={1.9} aria-hidden="true" /></span>
              <span className={styles.number}>0{index + 1}</span>
              <strong>{label}</strong>
            </div>
          ))}
        </div>

        <div className={styles.bottom}>
          <p><Clock3 size={20} aria-hidden="true" /> Nach der Übergabe kannst du den Versandstatus über die DHL-Sendungsverfolgung prüfen.</p>
          <a href="#konfigurator">Jetzt Kennzeichen gestalten <ArrowRight size={19} aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  );
}
