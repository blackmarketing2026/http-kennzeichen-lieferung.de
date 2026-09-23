'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ALL_OPTIONAL_ALLOWED,
  CONSENT_STORAGE_KEY,
  createConsentRecord,
  NO_OPTIONAL_ALLOWED,
  parseConsentRecord,
  type OptionalPreferences,
  type OptionalService,
} from '@/lib/cookie-consent';

const OPTIONAL_SERVICES: { key: OptionalService; name: string; purpose: string }[] = [
  { key: 'googleAnalytics', name: 'Google Analytics', purpose: 'Reichweitenmessung und Verbesserung der Website' },
  { key: 'microsoftClarity', name: 'Microsoft Clarity', purpose: 'Auswertung der Nutzung und Bedienbarkeit' },
  { key: 'metaPixel', name: 'Meta Pixel', purpose: 'Messung von Werbekampagnen' },
  { key: 'googleTagManager', name: 'Google Tag Manager', purpose: 'Verwaltung optionaler Analyse- und Marketing-Tags' },
];

export function CookieNotice() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [advanced, setAdvanced] = useState(false);
  const [preferences, setPreferences] = useState<OptionalPreferences>(NO_OPTIONAL_ALLOWED);

  useEffect(() => {
    const initialize = () => {
      let saved = null;
      try {
        saved = parseConsentRecord(window.localStorage.getItem(CONSENT_STORAGE_KEY));
      } catch {
        // Without browser storage, ask again on the next visit.
      }
      setPreferences(saved?.optional ?? NO_OPTIONAL_ALLOWED);
      setOpen(!saved);
    };
    const timer = window.setTimeout(initialize, 0);
    const reopen = () => {
      try {
        const saved = parseConsentRecord(window.localStorage.getItem(CONSENT_STORAGE_KEY));
        setPreferences(saved?.optional ?? NO_OPTIONAL_ALLOWED);
      } catch {
        setPreferences(NO_OPTIONAL_ALLOWED);
      }
      setAdvanced(true);
      setOpen(true);
    };
    window.addEventListener('open-cookie-settings', reopen);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('open-cookie-settings', reopen);
    };
  }, []);

  useEffect(() => {
    if (open && dialogRef.current && !dialogRef.current.open) dialogRef.current.showModal();
  }, [open]);

  function save(optional: OptionalPreferences) {
    const record = createConsentRecord(optional);
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
    } catch {
      // The choice still applies to this page view if browser storage is unavailable.
    }
    setPreferences(optional);
    setAdvanced(false);
    setOpen(false);
  }

  function toggle(key: OptionalService) {
    setPreferences((current) => ({ ...current, [key]: !current[key] }));
  }

  if (!open) return null;

  return (
    <dialog
      ref={dialogRef}
      className="cookie-dialog"
      aria-labelledby="cookie-dialog-title"
      aria-describedby="cookie-dialog-description"
      onCancel={(event) => event.preventDefault()}
    >
      <div className="cookie-dialog-header">
        <span className="cookie-dialog-kicker">Datenschutz & Cookies</span>
        <h2 id="cookie-dialog-title">Deine Privatsphäre zählt.</h2>
      </div>
      <p id="cookie-dialog-description" className="cookie-dialog-copy">
        Diese Webseite versucht, sich stetig zu verbessern, und bitte erlaube die Cookies. Das kostet dir kein Geld.
        Mit „Alles erlauben“ kannst du optionalen Analyse- und Marketingfunktionen zustimmen.
      </p>
      <p className="cookie-dialog-status">
        Derzeit sind Google Analytics, Microsoft Clarity, Meta Pixel und Google Tag Manager nicht aktiviert.
        Deine Auswahl speichert nur deine Einstellung; es werden keine optionalen Skripte geladen.
        Vor einer Aktivierung fragen wir erneut.
      </p>

      {advanced && (
        <div className="cookie-options" id="cookie-options">
          <h3>Einzelne Funktionen auswählen</h3>
          <div className="cookie-option">
            <div><strong>Technisch notwendig</strong><span>Anmeldung, Bestellung und Speicherung deiner Auswahl.</span></div>
            <span className="cookie-required">Immer aktiv</span>
          </div>
          {OPTIONAL_SERVICES.map((service) => (
            <label className="cookie-option" key={service.key}>
              <span><strong>{service.name}</strong><span>{service.purpose} · derzeit nicht aktiv</span></span>
              <input
                type="checkbox"
                checked={preferences[service.key]}
                onChange={() => toggle(service.key)}
                aria-label={`${service.name} erlauben`}
              />
            </label>
          ))}
          <p className="cookie-options-note">Alle optionalen Funktionen sind zunächst ausgeschaltet. Eine spätere technische Aktivierung erfordert eine neue Einwilligung.</p>
        </div>
      )}

      <div className="cookie-dialog-actions">
        <button type="button" className="cookie-action cookie-action-reject" onClick={() => save(NO_OPTIONAL_ALLOWED)}>Alles ablehnen</button>
        <button type="button" className="cookie-action cookie-action-accept" onClick={() => save(ALL_OPTIONAL_ALLOWED)}>Alles erlauben</button>
        {advanced ? (
          <button type="button" className="cookie-action cookie-action-secondary" onClick={() => save(preferences)}>Auswahl speichern</button>
        ) : (
          <button type="button" className="cookie-action cookie-action-secondary" onClick={() => setAdvanced(true)} aria-expanded={false} aria-controls="cookie-options">Erweitert</button>
        )}
      </div>
      <p className="cookie-dialog-footnote">Du kannst deine Auswahl jederzeit über „Cookie-Einstellungen“ im Footer ändern. <Link href="/datenschutz" onClick={() => setOpen(false)}>Datenschutzerklärung</Link></p>
    </dialog>
  );
}

export function CookieSettingsButton() {
  return <button className="cookie-settings-button" type="button" onClick={() => window.dispatchEvent(new Event('open-cookie-settings'))}>Cookie-Einstellungen</button>;
}
