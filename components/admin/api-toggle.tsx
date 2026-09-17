'use client';

import { useState } from 'react';
import { LoaderCircle } from 'lucide-react';

export function ApiToggle({ initialEnabled, credentialsConfigured }: { initialEnabled: boolean; credentialsConfigured: boolean }) {
  const [enabled, setEnabled] = useState(initialEnabled);
  const [loading, setLoading] = useState(false);

  async function toggle() {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled: !enabled }),
      });
      if (response.ok) setEnabled((value) => !value);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-api-toggle">
      <div>
        <strong>Kennzeichen-API</strong>
        <span>{credentialsConfigured ? 'Zugangsdaten hinterlegt' : 'Zugangsdaten fehlen (Umgebungsvariablen prüfen)'}</span>
      </div>
      <button
        type="button"
        className={enabled ? 'admin-toggle-on' : 'admin-toggle-off'}
        onClick={toggle}
        disabled={loading || !credentialsConfigured}
      >
        {loading ? <LoaderCircle className="spin" /> : enabled ? 'Aktiv – deaktivieren' : 'Inaktiv – aktivieren'}
      </button>
    </div>
  );
}
