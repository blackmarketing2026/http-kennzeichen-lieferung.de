'use client';

import { useState } from 'react';
import { Mail, LoaderCircle } from 'lucide-react';
import '@/app/konto/konto.css';

export function LoginForm({ expiredNotice = false }: { expiredNotice?: boolean }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/konto/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? 'Der Login-Link konnte nicht versendet werden.');
      }
      setSent(true);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Der Login-Link konnte nicht versendet werden.');
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <main className="konto-login-page">
        <div className="konto-login-form">
          <div className="konto-login-heading"><Mail /><h1>E-Mail unterwegs</h1></div>
          <p className="konto-login-success">
            Wir haben dir einen Login-Link an <strong>{email}</strong> geschickt. Klicke auf den Link in der E-Mail, um dich anzumelden.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="konto-login-page">
      <form className="konto-login-form" onSubmit={handleSubmit}>
        <div className="konto-login-heading"><Mail /><h1>Mein Konto</h1></div>
        <p>Gib deine E-Mail-Adresse ein. Wir senden dir einen Login-Link, mit dem du dich ohne Passwort anmeldest.</p>
        {expiredNotice && <p className="konto-login-error" role="alert">Der Login-Link ist ungültig oder abgelaufen. Bitte fordere einen neuen an.</p>}
        <label>
          E-Mail-Adresse
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </label>
        {error && <p className="konto-login-error" role="alert">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? <LoaderCircle className="konto-spin" /> : 'Login-Link anfordern'}
        </button>
      </form>
    </main>
  );
}
