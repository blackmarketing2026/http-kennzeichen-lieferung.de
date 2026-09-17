'use client';

import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export function LogoutButton() {
  const router = useRouter();
  async function logout() {
    await fetch('/api/konto/logout', { method: 'POST' });
    router.push('/konto/login');
    router.refresh();
  }
  return (
    <button type="button" className="konto-logout-button" onClick={logout}>
      <LogOut /> Abmelden
    </button>
  );
}
