'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoaderCircle, TriangleAlert } from 'lucide-react';
import type { Gender } from '@/lib/kennzeichen-api';
import { generateTestExternalId } from '@/lib/kennzeichen-test-order';

type FormState = {
  productVariantId: string;
  productName: string;
  sku: string;
  quantity: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  street: string;
  houseNumber: string;
  zipCode: string;
  city: string;
  phone: string;
  plateCity: string;
  plateMiddle: string;
  plateEnd: string;
};

const DEFAULT_STATE: FormState = {
  productVariantId: '2',
  productName: 'KFZ-Kennzeichen 520x110mm - einzeilig',
  sku: 'UD44520',
  quantity: '1',
  email: 'test@kennzeichen-lieferung.de',
  firstName: 'Max',
  lastName: 'Mustermann',
  gender: 'UNSPECIFIED',
  street: 'Musterstraße',
  houseNumber: '12',
  zipCode: '26135',
  city: 'Oldenburg',
  phone: '',
  plateCity: 'OL',
  plateMiddle: 'FC',
  plateEnd: '105',
};

type PreviewResult = { mode: 'preview'; payload: unknown };
type SubmitSuccess = {
  mode: 'submit'; ok: true; status: number; externalId: string;
  manufacturerOrderId: number; deliveryIds: number[]; costNetValue: string; response: unknown;
};
type SubmitFailure = {
  mode: 'submit'; ok: false; status: number | null; error: string;
  externalId: string; sentPayload: unknown; timestamp: string;
};
type ErrorResult = { error: string };
type Result = PreviewResult | SubmitSuccess | SubmitFailure | ErrorResult;

export function KennzeichenTestForm({ credentialsConfigured }: { credentialsConfigured: boolean }) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(DEFAULT_STATE);
  const [externalId, setExternalId] = useState(generateTestExternalId);
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState<'preview' | 'submit' | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function send(mode: 'preview' | 'submit') {
    setLoading(mode);
    setResult(null);
    try {
      const response = await fetch('/api/admin/kennzeichen-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode,
          externalId,
          confirmed: mode === 'submit' ? confirmed : undefined,
          productVariantId: Number(form.productVariantId),
          productName: form.productName,
          sku: form.sku,
          quantity: Number(form.quantity),
          email: form.email,
          firstName: form.firstName,
          lastName: form.lastName,
          gender: form.gender,
          street: form.street,
          houseNumber: form.houseNumber,
          zipCode: form.zipCode,
          city: form.city,
          phone: form.phone,
          plateCity: form.plateCity,
          plateMiddle: form.plateMiddle,
          plateEnd: form.plateEnd,
        }),
      });
      const data = (await response.json()) as Result;
      setResult(data);
      if (mode === 'submit' && 'ok' in data && data.ok) {
        setExternalId(generateTestExternalId());
        setConfirmed(false);
        router.refresh();
      }
    } catch {
      setResult({ error: 'Anfrage fehlgeschlagen.' });
    } finally {
      setLoading(null);
    }
  }

  const canSubmit = confirmed && credentialsConfigured && loading === null;

  return (
    <div className="admin-kennzeichen-test">
      <p className="admin-warning-banner">
        <TriangleAlert />
        Achtung: Verwende die Funktion nur mit einem freigegebenen Testzugang. Ein erfolgreicher API-Aufruf kann einen
        Produktions- und Versandauftrag auslösen.
      </p>

      <div className="admin-kennzeichen-test-id-row">
        <label>
          Externe Bestellnummer
          <input value={externalId} readOnly />
        </label>
        <button type="button" className="admin-secondary-button" onClick={() => setExternalId(generateTestExternalId())}>
          Neu generieren
        </button>
      </div>

      <div className="admin-form-grid">
        <label>Produktvarianten-ID<input value={form.productVariantId} onChange={(e) => update('productVariantId', e.target.value)} required /></label>
        <label>Produktname<input value={form.productName} onChange={(e) => update('productName', e.target.value)} required /></label>
        <label>SKU<input value={form.sku} onChange={(e) => update('sku', e.target.value)} required /></label>
        <label>Menge<input type="number" min={1} value={form.quantity} onChange={(e) => update('quantity', e.target.value)} required /></label>
        <label>E-Mail<input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} required /></label>

        <label>Vorname<input value={form.firstName} onChange={(e) => update('firstName', e.target.value)} required /></label>
        <label>Nachname<input value={form.lastName} onChange={(e) => update('lastName', e.target.value)} required /></label>
        <label>
          Anrede
          <select value={form.gender} onChange={(e) => update('gender', e.target.value as Gender)}>
            <option value="UNSPECIFIED">Unbestimmt</option>
            <option value="FEMALE">Weiblich</option>
            <option value="MALE">Männlich</option>
          </select>
        </label>
        <label>Straße<input value={form.street} onChange={(e) => update('street', e.target.value)} required /></label>
        <label>Hausnummer<input value={form.houseNumber} onChange={(e) => update('houseNumber', e.target.value)} required /></label>
        <label>PLZ<input value={form.zipCode} onChange={(e) => update('zipCode', e.target.value)} required /></label>
        <label>Ort<input value={form.city} onChange={(e) => update('city', e.target.value)} required /></label>
        <label>Land<input value="DE" disabled /></label>
        <label>Telefon (optional)<input value={form.phone} onChange={(e) => update('phone', e.target.value)} /></label>

        <label>Ortskürzel<input value={form.plateCity} onChange={(e) => update('plateCity', e.target.value.toUpperCase())} placeholder="OL" required /></label>
        <label>Buchstaben<input value={form.plateMiddle} onChange={(e) => update('plateMiddle', e.target.value.toUpperCase())} placeholder="FC" required /></label>
        <label>Zahlen<input value={form.plateEnd} onChange={(e) => update('plateEnd', e.target.value)} placeholder="105" required /></label>
      </div>

      <div className="admin-kennzeichen-test-actions">
        <button type="button" onClick={() => send('preview')} disabled={loading !== null}>
          {loading === 'preview' ? <LoaderCircle className="spin" /> : 'Anfrage prüfen'}
        </button>

        <label className="admin-checkbox-row">
          <input type="checkbox" checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} />
          Ich bestätige, dass dieser API-Aufruf möglicherweise einen echten und kostenpflichtigen Auftrag auslöst.
        </label>

        <button type="button" className="admin-danger-button" onClick={() => send('submit')} disabled={!canSubmit}>
          {loading === 'submit' ? <LoaderCircle className="spin" /> : 'Testbestellung verbindlich abschicken'}
        </button>
      </div>

      {result && 'error' in result && <p className="admin-login-error" role="alert">{result.error}</p>}

      {result && 'mode' in result && result.mode === 'preview' && (
        <div className="admin-json-preview">
          <strong>Vorschau (noch nicht gesendet)</strong>
          <pre>{JSON.stringify(result.payload, null, 2)}</pre>
        </div>
      )}

      {result && 'mode' in result && result.mode === 'submit' && result.ok && (
        <div className="admin-result-panel admin-result-success">
          <strong>Erfolgreich · HTTP {result.status}</strong>
          <dl>
            <dt>Externe Bestellnummer</dt><dd>{result.externalId}</dd>
            <dt>Hersteller-Bestell-ID</dt><dd>{result.manufacturerOrderId}</dd>
            <dt>Delivery-ID(s)</dt><dd>{result.deliveryIds.join(', ')}</dd>
            <dt>Nettokosten</dt><dd>{result.costNetValue}</dd>
          </dl>
          <pre>{JSON.stringify(result.response, null, 2)}</pre>
        </div>
      )}

      {result && 'mode' in result && result.mode === 'submit' && !result.ok && (
        <div className="admin-result-panel admin-result-error">
          <strong>Fehlgeschlagen{result.status ? ` · HTTP ${result.status}` : ''}</strong>
          <p>{result.error}</p>
          <p className="admin-muted">Zeitpunkt: {new Date(result.timestamp).toLocaleString('de-DE')}</p>
          <pre>{JSON.stringify(result.sentPayload, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
