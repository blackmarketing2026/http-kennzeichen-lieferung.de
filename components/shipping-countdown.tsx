'use client';

import { useEffect, useState } from 'react';
import { Truck } from 'lucide-react';
import {
  getPickupCountdown,
  type PickupCountdown,
} from '@/lib/pickup-countdown';
import styles from './checkout-extras.module.css';

export function ShippingCountdown() {
  const [countdown, setCountdown] = useState<PickupCountdown | null>(null);

  useEffect(() => {
    const update = () => setCountdown(getPickupCountdown(new Date()));
    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <aside
      className={styles.countdown}
      aria-label="Nächste mögliche Versandabholung"
    >
      <div className={styles.countdownHeading}>
        <Truck size={19} />
        <span>Nächste mögliche DHL-Abholung</span>
      </div>
      <div className={styles.countdownTime}>
        <strong
          role="timer"
          aria-live="off"
          aria-label="Zeit bis zur nächsten möglichen DHL-Abholung"
        >
          {countdown?.remaining ?? '--:--:--'}
        </strong>
        <span>
          {countdown
            ? `${countdown.dayLabel} um ${countdown.pickupTime}`
            : 'Abholzeit wird berechnet'}
        </span>
      </div>
      <p>
        Abholung um 9, 12 und 16 Uhr. Die 10 Minuten Produktionszeit sind bei
        der Auswahl der nächsten Abholung berücksichtigt.
      </p>
    </aside>
  );
}
