'use client';

import { useEffect, useRef, useState } from 'react';

type WebhookEventRow = {
  id: number;
  dedupe_key: string;
  event_type: string | null;
  signature_valid: 0 | 1;
  raw: unknown;
  processed_at: string | null;
  created_at: string;
};

const POLL_INTERVAL_MS = 10000;

/** Polls for webhook events newer than the last one it has seen and prepends only those —
 * the list keeps growing for as long as the page stays open, like a live log tail, instead of
 * being replaced on every refresh. */
export function LiveWebhookLog({ initialEvents }: { initialEvents: WebhookEventRow[] }) {
  const [events, setEvents] = useState(initialEvents);
  const maxIdRef = useRef(initialEvents.reduce((max, event) => Math.max(max, event.id), 0));

  useEffect(() => {
    const poll = async () => {
      try {
        const response = await fetch(`/api/admin/logs/webhooks?after=${maxIdRef.current}`, { cache: 'no-store' });
        if (!response.ok) return;
        const data = (await response.json()) as { rows: WebhookEventRow[] };
        if (data.rows.length === 0) return;
        maxIdRef.current = data.rows.reduce((max, event) => Math.max(max, event.id), maxIdRef.current);
        setEvents((prev) => [...[...data.rows].reverse(), ...prev]);
      } catch {
        // Transient network error — just try again on the next tick.
      }
    };
    const id = setInterval(poll, POLL_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <table className="admin-table">
      <thead>
        <tr>
          <th>Zeitpunkt</th>
          <th>Event-Typ</th>
          <th>Signatur gültig</th>
          <th>Verarbeitet</th>
          <th>Dedupe-Key</th>
          <th>Rohdaten (Payload)</th>
        </tr>
      </thead>
      <tbody>
        {events.map((event) => (
          <tr key={event.id} className={!event.signature_valid ? 'admin-log-error' : undefined}>
            <td>{new Date(event.created_at).toLocaleString('de-DE')}</td>
            <td>{event.event_type ?? '–'}</td>
            <td>{event.signature_valid ? 'Ja' : 'Nein'}</td>
            <td>{event.processed_at ? new Date(event.processed_at).toLocaleString('de-DE') : '–'}</td>
            <td><span className="admin-muted">{event.dedupe_key}</span></td>
            <td><pre style={{ whiteSpace: 'pre-wrap', margin: 0, fontSize: 11 }}>{JSON.stringify(event.raw, null, 2)}</pre></td>
          </tr>
        ))}
        {events.length === 0 && (
          <tr><td colSpan={6} className="admin-empty-row">Noch keine eingehenden Webhooks.</td></tr>
        )}
      </tbody>
    </table>
  );
}
