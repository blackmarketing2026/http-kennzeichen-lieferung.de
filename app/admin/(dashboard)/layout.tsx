import Link from 'next/link';
import { LogoutButton } from '@/components/admin/logout-button';
import '@/app/admin/admin.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-shell">
      <header className="admin-header">
        <span className="admin-brand">Kennzeichen-Lieferung Admin</span>
        <nav className="admin-nav">
          <Link href="/admin">Bestellungen</Link>
          <Link href="/admin/logs">API-Logs</Link>
          <Link href="/admin/integrations/kennzeichen">Kennzeichen API-Test</Link>
        </nav>
        <LogoutButton />
      </header>
      <main className="admin-main">{children}</main>
    </div>
  );
}
