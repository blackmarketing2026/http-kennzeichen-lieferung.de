import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Impressum | kennzeichen-lieferung.de',
  description: 'Anbieterkennzeichnung und Kontakt von kennzeichen-lieferung.de.',
};

export default function ImpressumPage() {
  return (
    <main className="legal-page">
      <div className="legal-container">
        <Link className="legal-back" href="/">← Zur Startseite</Link>
        <p className="legal-kicker">Rechtliches</p>
        <h1>Impressum</h1>
        <p className="legal-intro">Angaben zum Anbieter von kennzeichen-lieferung.de.</p>

        <section>
          <h2>Angaben gemäß § 5 DDG</h2>
          <address>
            Steven Jesse · Function Concept<br />
            c/o MDC Management#169<br />
            Welserstraße 3<br />
            87463 Dietmannsried<br />
            Deutschland
          </address>
        </section>

        <section>
          <h2>Kontakt</h2>
          <p>Telefon: <a href="tel:+491739344650">+49 173 9344650</a><br />
            E-Mail: <a href="mailto:support@function-concept.de">support@function-concept.de</a></p>
        </section>

        <section>
          <h2>Umsatzsteuer-ID</h2>
          <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:<br />DE369951271</p>
        </section>

        <section>
          <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
          <address>
            Steven Jesse · Function Concept<br />
            c/o MDC Management#169<br />
            Welserstraße 3<br />
            87463 Dietmannsried
          </address>
        </section>
      </div>
    </main>
  );
}
