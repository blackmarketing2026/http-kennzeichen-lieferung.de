'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoaderCircle, Send } from 'lucide-react';
import { PRODUCTS, type PlateColor, type PlateType } from '@/config/products';

const PLATE_TYPES = Object.keys(PRODUCTS) as PlateType[];

type FormState = {
  plate: string;
  plateType: PlateType;
  color: PlateColor;
  quantity: 1 | 2 | 3;
  firstName: string;
  lastName: string;
  street: string;
  houseNumber: string;
  zipCode: string;
  city: string;
  email: string;
  phone: string;
};

const DEFAULT_STATE: FormState = {
  plate: '',
  plateType: 'standard',
  color: 'black',
  quantity: 1,
  firstName: '',
  lastName: '',
  street: '',
  houseNumber: '',
  zipCode: '',
  city: '',
  email: '',
  phone: '',
};

const SUBMIT_MESSAGES: Record<string, string> = {
  submitted: 'Bestellung wurde an den Hersteller übertragen.',
  failed: 'Übertragung an den Hersteller fehlgeschlagen.',
  uncertain: 'Übertragung unklar – bitte in der Liste prüfen (z. B. API deaktiviert).',
  skipped: 'Bestellung wurde nicht übertragen.',
};

type Result = { orderId: string; status: string; message: string } | { error: string };

export function ManualOrderForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(DEFAULT_STATE);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const plate = form.plate.toUpperCase().replace(/\s+/g, ' ').trim();
    const summary = `${plate} · ${PRODUCTS[form.plateType].label} · ${form.color === 'carbon' ? 'Carbon' : 'Schwarz'} · ${form.quantity}×
${form.firstName} ${form.lastName}, ${form.street} ${form.houseNumber}, ${form.zipCode} ${form.city}`;
    if (!window.confirm(`Diese Bestellung wird verbindlich und ohne Zahlung an den Hersteller gesendet:

${summary}

Fortfahren?`)) return;
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch('/api/admin/orders/manual', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, confirmed: true }),
      });
      const data = await response.json() as Result;
      setResult(data);
      if ('status' in data && data.status === 'submitted') setForm(DEFAULT_STATE);
      router.refresh();
    } catch {
      setResult({ error: 'Anfrage fehlgeschlagen.' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <details className="admin-test-order">
      <summary><Send /> Bestellung manuell an Hersteller senden (ohne Stripe)</summary>
      <p className="admin-muted">Legt eine Bestellung ohne Zahlung an und überträgt sie sofort an den Hersteller. Es werden keine E-Mails oder Rechnungen an den Kunden verschickt.</p>
      <form className="admin-test-order-form" onSubmit={handleSubmit}>
        <div className="admin-form-grid">
          <label>
            Kennzeichen
            <input value={form.plate} onChange={(e) => update('plate', e.target.value)} placeholder="z. B. HB SJ 1991" required />
          </label>
          <label>
            Typ
            <select value={form.plateType} onChange={(e) => update('plateType', e.target.value as PlateType)}>
              {PLATE_TYPES.map((type) => <option key={type} value={type}>{PRODUCTS[type].label}</option>)}
            </select>
          </label>
          <label>
            Farbe
            <select value={form.color} onChange={(e) => update('color', e.target.value as PlateColor)}>
              <option value="black">Schwarz</option>
              <option value="carbon">Carbon</option>
            </select>
          </label>
          <label>
            Menge
            <select value={form.quantity} onChange={(e) => update('quantity', Number(e.target.value) as 1 | 2 | 3)}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </label>
          <label>Vorname<input value={form.firstName} onChange={(e) => update('firstName', e.target.value)} required /></label>
          <label>Nachname<input value={form.lastName} onChange={(e) => update('lastName', e.target.value)} required /></label>
          <label>Straße<input value={form.street} onChange={(e) => update('street', e.target.value)} required /></label>
          <label>Hausnummer<input value={form.houseNumber} onChange={(e) => update('houseNumber', e.target.value)} required /></label>
          <label>PLZ<input value={form.zipCode} onChange={(e) => update('zipCode', e.target.value)} required /></label>
          <label>Stadt<input value={form.city} onChange={(e) => update('city', e.target.value)} required /></label>
          <label>E-Mail<input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} required /></label>
          <label>Telefon (optional)<input value={form.phone} onChange={(e) => update('phone', e.target.value)} /></label>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? <LoaderCircle className="spin" /> : 'An Hersteller senden'}
        </button>
        {result && 'error' in result && <p className="admin-login-error" role="alert">{result.error}</p>}
        {result && 'status' in result && (
          <p className={result.status === 'submitted' ? 'admin-test-order-success' : 'admin-login-error'}>
            {SUBMIT_MESSAGES[result.status] ?? result.status} {result.message}
          </p>
        )}
      </form>
    </details>
  );
}
