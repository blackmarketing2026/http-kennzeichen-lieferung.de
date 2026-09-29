import { Truck } from 'lucide-react';
import styles from './checkout-extras.module.css';

export function ShippingCountdown() {
  return (
    <aside className={styles.countdown} aria-label="Fertigung und DHL-Abholung">
      <div className={styles.countdownHeading}>
        <Truck size={19} />
        <span>Fertigung und DHL-Abholung</span>
      </div>
      <p>
        Innerhalb von 10 Minuten nach der Bestellung geprägt und versandfertig
        (außer an Sonn- und Feiertagen). DHL-Abholung dreimal täglich an
        Werktagen. Die tatsächliche Zustellung hängt vom Transport durch DHL ab.
      </p>
    </aside>
  );
}
