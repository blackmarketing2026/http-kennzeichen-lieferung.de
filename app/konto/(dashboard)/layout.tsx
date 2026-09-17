import { LogoutButton } from '@/components/konto/logout-button';
import '@/app/konto/konto.css';

export default function KontoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="konto-shell">
      <header className="konto-header">
        <span className="konto-brand">Mein Konto · Kennzeichen-Lieferung</span>
        <LogoutButton />
      </header>
      <main className="konto-main">{children}</main>
    </div>
  );
}
