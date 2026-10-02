import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Kennzeichen nach DIN 74069 | kennzeichen-lieferung.de',
  description: 'Informationen zu Kennzeichenschildern nach DIN 74069, dem DIN-Prüfzeichen und der Registernummer unseres Herstellers.',
};

export default function Din74069Page() {
  return (
    <main className="legal-page din-page">
      <div className="legal-container">
        <Link className="legal-back" href="/">← Zurück zur Startseite</Link>
        <p className="legal-kicker">Geprüfte Qualität für dein Fahrzeug</p>
        <h1>Kennzeichen nach DIN 74069</h1>
        <p className="legal-intro">Bei kennzeichen-lieferung.de erhältst du Kennzeichenschilder nach DIN 74069. Wir arbeiten mit einem Hersteller zusammen, dessen Zertifizierung die entsprechenden Kennzeichenschilder umfasst.</p>

        <div className="din-page-seal">
          <Image
            src="/din-geprueft-2m-186997-18.webp"
            alt="DIN GEPRÜFT, Registernummer 2M 186997 18"
            width={974}
            height={1030}
            priority
          />
          <p>DIN-Prüf- und Überwachungszeichen mit der Registernummer unseres Herstellers</p>
        </div>

        <section>
          <h2>Was bedeutet DIN 74069?</h2>
          <p>Die DIN 74069 beschreibt technische Anforderungen und Prüfungen für Kennzeichenschilder. Dazu gehören unter anderem die reflektierende Oberfläche, die Beschriftung und die Widerstandsfähigkeit gegenüber Witterungseinflüssen.</p>
          <p>So werden wichtige Eigenschaften der Schilder nach festgelegten Kriterien geprüft.</p>
        </section>

        <section>
          <h2>Was bedeutet das DIN-Prüfzeichen?</h2>
          <p>Das DIN-Prüf- und Überwachungszeichen wird von DIN CERTCO nach bestandener Prüfung zusammen mit einer zugehörigen Registernummer vergeben.</p>
          <p>Die Kennzeichnung auf dem Schild stellt den Bezug zur entsprechenden Zertifizierung her.</p>
        </section>

        <section>
          <h2>Angaben zu unserem Hersteller</h2>
          <p><strong>Prüfgrundlage:</strong> DIN 74069<br /><strong>Registernummer unseres Herstellers:</strong> 2M 186997 18</p>
          <p>Die Zertifizierung bezieht sich auf die im Herstellerzertifikat aufgeführten Kennzeichenschilder und Ausführungen. Unser Shop vertreibt diese Produkte.</p>
        </section>

        <section>
          <h2>Kann ich die Kennzeichen für die Zulassung verwenden?</h2>
          <p>Die Normkonformität ist eine Voraussetzung für die Verwendung als amtliches Kennzeichenschild. Zusätzlich müssen beispielsweise Kennzeichenkombination und Schildgröße zu deiner Zulassung passen.</p>
          <p>Deine Bestellung umfasst die Herstellung und Lieferung der Schilder. Die Reservierung deiner Wunschkombination und die Fahrzeugzulassung erledigst du separat bei der zuständigen Zulassungsstelle.</p>
        </section>

        <section>
          <h2>Noch Fragen zur Qualität?</h2>
          <p>Du möchtest mehr über die Kennzeichnung oder eine bestimmte Kennzeichenvariante erfahren? <a href="mailto:support@function-concept.de">Schreib uns gerne</a> – wir helfen dir bei der Auswahl.</p>
          <Link className="button din-page-cta" href="/#konfigurator">Kennzeichen konfigurieren</Link>
        </section>
      </div>
    </main>
  );
}
