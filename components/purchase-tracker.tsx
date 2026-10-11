'use client';

import { useEffect } from 'react';
import { CONSENT_CHANGED_EVENT, emitPurchaseEvent, type PurchaseEvent } from '@/lib/purchase-event';

export function PurchaseTracker({ purchase }: { purchase: PurchaseEvent }) {
  useEffect(() => {
    const emit = () => { emitPurchaseEvent(purchase); };
    emit();
    window.addEventListener(CONSENT_CHANGED_EVENT, emit);
    return () => window.removeEventListener(CONSENT_CHANGED_EVENT, emit);
  }, [purchase]);

  return null;
}
