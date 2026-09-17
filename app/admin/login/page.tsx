'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LockKeyhole, LoaderCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({})) as { error?: string };
        throw new Error(data.error ?? 'Anmeldung fehlgeschlagen.');
      }
      router.push('/admin');
      router.refresh();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Anmeldung fehlgeschlagen.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="admin-login-page">
      <form className="admin-login-form" onSubmit={handleSubmit}>
        <div className="admin-login-heading"><LockKeyhole /><h1>Admin-Login</h1></div>
        <label>
          Passwort
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
        </label>
        {error && <p className="admin-login-error" role="alert">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? <LoaderCircle className="spin" /> : 'Anmelden'}
        </button>
      </form>
    </main>
  );
}
