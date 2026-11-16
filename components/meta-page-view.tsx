'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { CONSENT_CHANGED_EVENT } from '@/lib/cookie-consent';
import { trackMetaPageView } from '@/lib/meta-pixel';

export function MetaPageView() {
  const pathname = usePathname();

  useEffect(() => {
    trackMetaPageView();
  }, [pathname]);

  useEffect(() => {
    window.addEventListener(CONSENT_CHANGED_EVENT, trackMetaPageView);
    return () => window.removeEventListener(CONSENT_CHANGED_EVENT, trackMetaPageView);
  }, []);

  return null;
}
