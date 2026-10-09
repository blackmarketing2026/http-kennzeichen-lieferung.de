'use client';

import { EVB_PARTNER_URL } from '@/lib/config';
import { trackKennzeichenGtmEvent } from '@/lib/kennzeichen-gtm-events';

export function EvbPartnerBlock() {
  return (
    <aside className="evb-partner-block" aria-label="Anzeige: Kfz-Versicherung">
      <small>Anzeige</small>
      <h2>Nächster Schritt: deine eVB-Nummer</h2>
      <p>Für die Zulassung brauchst du eine eVB-Nummer. Vergleiche jetzt Kfz-Versicherungen und erhalte deine eVB direkt nach Abschluss.</p>
      <a href={EVB_PARTNER_URL} target="_blank" rel="sponsored noopener noreferrer" onClick={() => trackKennzeichenGtmEvent('evb_click')}>
        Kfz-Versicherung vergleichen
      </a>
    </aside>
  );
}
