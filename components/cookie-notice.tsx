'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'kl_cookie_notice_necessary_v1';
const SIX_MONTHS_MS = 180 * 24 * 60 * 60 * 1000;

export function CookieNotice() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const showIfNeeded = () => {
      try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        const expires = saved ? Number(saved) : 0;
        setOpen(!Number.isFinite(expires) || expires < Date.now());
      } catch {
        setOpen(true);
      }
    };
    const timer = window.setTimeout(showIfNeeded, 0);
    const reopen = () => setOpen(true);
    window.addEventListener('open-cookie-settings', reopen);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('open-cookie-settings', reopen);
    };
  }, []);

  function acknowledge() {
    try {
      window.localStorage.setItem(STORAGE_KEY, String(Date.now() + SIX_MONTHS_MS));
    } catch {
      // The notice can still be closed if browser storage is unavailable.
    }
    setOpen(false);
  }

  if (!open) return null;

  return (
    <aside className="cookie-notice" aria-label="Hinweis zu Cookies und Datenschutz">
      <div>
        <strong>Deine Privatsphäre</strong>
        <p>Diese Website verwendet derzeit nur technisch notwendige Speicherungen, etwa für die Anmeldung und deine Entscheidung zu diesem Hinweis. Google Analytics, Google Tag Manager, Meta Pixel und Microsoft Clarity sind noch nicht aktiviert. Vor einer Aktivierung fragen wir nach deiner Einwilligung.</p>
        <Link href="/datenschutz">Mehr zum Datenschutz</Link>
      </div>
      <button type="button" onClick={acknowledge}>Verstanden</button>
    </aside>
  );
}

export function CookieSettingsButton() {
  return <button className="cookie-settings-button" type="button" onClick={() => window.dispatchEvent(new Event('open-cookie-settings'))}>Cookie-Hinweis</button>;
}
