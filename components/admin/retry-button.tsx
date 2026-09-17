'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoaderCircle, RefreshCw } from 'lucide-react';

export function RetryButton({ orderId }: { orderId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function retry() {
    setLoading(true);
    try {
      await fetch(`/api/admin/orders/${orderId}/retry`, { method: 'POST' });
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button type="button" className="admin-retry-button" onClick={retry} disabled={loading}>
      {loading ? <LoaderCircle className="spin" /> : <RefreshCw />} Erneut an Hersteller senden
    </button>
  );
}
