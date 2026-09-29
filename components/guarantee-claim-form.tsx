'use client';

import { useState, type SubmitEvent } from 'react';

export function GuaranteeClaimForm() {
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  async function submit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError('');
    try {
      const response = await fetch('/api/liefergarantie/antraege', { method: 'POST', body: new FormData(event.currentTarget) });
      const data = await response.json() as { error?: string };
      if (!response.ok) throw new Error(data.error || 'Der Antrag konnte nicht gesendet werden.');
      setDone(true);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Der Antrag konnte nicht gesendet werden.');
    } finally {
      setBusy(false);
    }
  }

  if (done) return <output className="guarantee-form-success">Dein Antrag ist eingegangen. Wir prüfen deine Bestellung und deinen Kaufbeleg und melden uns per E-Mail bei dir.</output>;

  return <form className="guarantee-form" onSubmit={submit} encType="multipart/form-data">
    <label>Bestellnummer<input name="orderId" type="text" required maxLength={36} autoComplete="off" /></label>
    <label>E-Mail-Adresse<input name="email" type="email" required autoComplete="email" /></label>
    <label>Datum des Ersatzkaufs<input name="replacementDate" type="date" required /></label>
    <label>Kaufbeleg (JPG, PNG oder PDF; maximal 10 MB)<input name="receipt" type="file" accept="image/jpeg,image/png,application/pdf,.jpg,.jpeg,.png,.pdf" required /></label>
    <label>Nachricht (optional)<textarea name="message" rows={4} maxLength={2000} /></label>
    {error && <p className="guarantee-form-error" role="alert">{error}</p>}
    <button className="button" type="submit" disabled={busy}>{busy ? 'Wird gesendet …' : 'Erstattung beantragen'}</button>
  </form>;
}
