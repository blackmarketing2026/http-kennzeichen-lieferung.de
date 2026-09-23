import type { Metadata } from 'next';
import Link from 'next/link';
import { WithdrawalNotice } from '@/components/withdrawal-notice';

export const metadata: Metadata = {
  title: 'Widerruf und Rückgabe | kennzeichen-lieferung.de',
  description: 'Hinweise zum Widerruf bei individuell geprägten Kennzeichen und zu gesetzlichen Mängelrechten.',
};

export default function WiderrufPage() {
  return (
    <main className="legal-page">
      <div className="legal-container">
        <Link className="legal-back" href="/">← Zur Startseite</Link>
        <p className="legal-kicker">Rechtliches</p>
        <h1>Widerruf und Rückgabe</h1>
        <p className="legal-intro">Diese Informationen gelten für die individuell nach deiner Eingabe geprägten Kennzeichenschilder.</p>

        <WithdrawalNotice />

        <section>
          <h2>Kontakt bei Fragen oder Mängeln</h2>
          <p>Schreibe uns an <a href="mailto:support@function-concept.de">support@function-concept.de</a> oder rufe uns unter <a href="tel:+491739344650">+49 173 9344650</a> an.</p>
        </section>
      </div>
    </main>
  );
}
