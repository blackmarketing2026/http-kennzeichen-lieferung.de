'use client';

import { useEffect, useRef, useState } from 'react';
import { Clock3 } from 'lucide-react';

type Pickup = { pickupAt: string; pickupTime: string; dayOffset: number };

export function ShippingCountdown() {
  const [pickup, setPickup] = useState<Pickup | null>(null);
  const [now, setNow] = useState(0);
  const [refresh, setRefresh] = useState(0);
  const refreshing = useRef(false);

  useEffect(() => {
    let active = true;
    fetch('/api/next-pickup', { cache: 'no-store' })
      .then(async (response) => response.ok ? await response.json() as Pickup : null)
      .then((value) => { if (active) setPickup(value); })
      .catch(() => { if (active) setPickup(null); })
      .finally(() => { refreshing.current = false; });
    return () => { active = false; };
  }, [refresh]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      const current = Date.now();
      setNow(current);
      if (pickup && current >= Date.parse(pickup.pickupAt) && !refreshing.current) {
        refreshing.current = true;
        setRefresh((count) => count + 1);
      }
    }, 1000);
    return () => window.clearInterval(timer);
  }, [pickup]);

  const target = pickup ? Date.parse(pickup.pickupAt) : 0;
  if (!pickup || !now || now >= target) return <p className="shipping-pickup-note"><Clock3 size={16} aria-hidden="true" /> DHL-Abholung an Werktagen</p>;

  const remaining = Math.ceil((target - now) / 1000);
  const hours = Math.floor(remaining / 3600);
  const minutes = Math.floor((remaining % 3600) / 60);
  const seconds = remaining % 60;
  const time = [hours, minutes, seconds].map((number) => String(number).padStart(2, '0')).join(':');
  const date = new Intl.DateTimeFormat('de-DE', {
    timeZone: 'Europe/Berlin', weekday: 'short', day: '2-digit', month: '2-digit',
  }).format(new Date(target));
  return <p className="shipping-pickup-note"><Clock3 size={16} aria-hidden="true" /> Nächste geplante DHL-Abholung: {date}, {pickup.pickupTime} Uhr · <strong>Noch {time}</strong></p>;
}
