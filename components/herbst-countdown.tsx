'use client';

import { useEffect, useState } from 'react';
import { HERBST_PRICING } from '@/lib/pricing';
import { formatPrice } from '@/config/products';

export function HerbstCountdown({ compact = false }: { compact?: boolean }) {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const update = () => setRemaining(Math.max(0, Date.parse(HERBST_PRICING.changesAt) - Date.now()));
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  if (remaining === null || remaining === 0) return null;
  const days = Math.floor(remaining / 86_400_000);
  const hours = Math.floor(remaining / 3_600_000) % 24;
  const minutes = Math.floor(remaining / 60_000) % 60;
  return <span role="timer" aria-live="off">
    Herbst-Preise nur noch {days} T {String(hours).padStart(2, '0')} Std {String(minutes).padStart(2, '0')} Min
    {!compact && <> · Ab 1. November: Komplett-Set {formatPrice(HERBST_PRICING.completeAfterOfferCents / 100)} · Premium-Set {formatPrice(HERBST_PRICING.premiumAfterOfferCents / 100)}</>}
  </span>;
}
