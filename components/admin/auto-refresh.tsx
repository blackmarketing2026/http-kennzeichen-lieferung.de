'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/** Silently re-fetches the current server component data on an interval, so a page like the
 * admin logs stays live without the user needing to hit reload. */
export function AutoRefresh({ intervalMs = 60000 }: { intervalMs?: number }) {
  const router = useRouter();

  useEffect(() => {
    const id = setInterval(() => router.refresh(), intervalMs);
    return () => clearInterval(id);
  }, [router, intervalMs]);

  return null;
}
