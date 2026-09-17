'use client';

import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export function LogoutButton() {
  const router = useRouter();
  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }
  return (
    <button type="button" className="admin-logout-button" onClick={logout}>
      <LogOut /> Abmelden
    </button>
  );
}
