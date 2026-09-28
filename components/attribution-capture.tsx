'use client';

import { useEffect } from 'react';
import { captureAttribution } from '@/lib/attribution';

/** Stores UTM parameters of the landing page so the checkout can report where the visitor came from. */
export function AttributionCapture() {
  useEffect(() => captureAttribution(), []);
  return null;
}
