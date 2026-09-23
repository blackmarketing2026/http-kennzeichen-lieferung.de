import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Datenschutz | kennzeichen-lieferung.de',
  description: 'Informationen zur Verarbeitung personenbezogener Daten auf kennzeichen-lieferung.de.',
};

export default function DatenschutzPage() {
  return (
    <main className="legal-page">
      <div className="legal-container">
        <Link className="legal-back" href="/">← Zur Startseite</Link>
        <p className="legal-kicker">Rechtliches</p>
        <h1>Datenschutzerklärung</h1>
        <p className="legal-intro">Hier erfahren Sie, welche Daten beim Besuch dieser Website, bei einer Bestellung und bei der Nutzung des Kundenkontos verarbeitet werden.</p>
        <p className="legal-updated">Stand: 23. September 2026</p>

        <section>
          <h2>1. Verantwortlicher</h2>
          <address>
            Steven Jesse · Function Concept<br />
            c/o MDC Management#169<br />
            Welserstraße 3<br />
            87463 Dietmannsried<br />
            Deutschland
          </address>
          <p>Telefon: <a href="tel:+491739344650">+49 173 9344650</a><br />
            E-Mail: <a href="mailto:support@function-concept.de">support@function-concept.de</a></p>
        </section>

        <section>
          <h2>2. Aufruf der Website und Hosting</h2>
          <p>Die Website wird über Vercel bereitgestellt. Beim Aufruf werden technisch erforderliche Verbindungsdaten verarbeitet. Dazu können IP-Adresse, Zeitpunkt, aufgerufene Seite, Browser- und Geräteinformationen sowie technische Fehlerdaten gehören. Die Verarbeitung dient der Auslieferung, Stabilität und Sicherheit der Website (Art. 6 Abs. 1 lit. f DSGVO). Protokolldaten werden nur so lange aufbewahrt, wie dies für diese Zwecke und nach den Einstellungen des Hosting-Anbieters erforderlich ist.</p>
          <p>Die Domain wird über ALL-INKL.COM verwaltet. Bei der technischen Auflösung der Domain können Verbindungsdaten durch beteiligte DNS-Dienste verarbeitet werden. Weitere Informationen: <a href="https://vercel.com/legal/privacy-notice" target="_blank" rel="noreferrer">Datenschutzhinweise von Vercel</a> und <a href="https://all-inkl.com/datenschutzinformationen" target="_blank" rel="noreferrer">Datenschutzinformationen von ALL-INKL.COM</a>.</p>
        </section>

        <section>
          <h2>3. Technisch notwendige Speicherung</h2>
          <p>Für die Anmeldung im Kundenkonto setzen wir das technisch notwendige Cookie <code>customer_session</code> mit einer Laufzeit von höchstens 30 Tagen. Im nicht öffentlichen Administrationsbereich wird ein Sitzungscookie für höchstens 12 Stunden verwendet. Ihre Auswahl im Cookie-Dialog speichern wir im lokalen Browserspeicher unter <code>kl_cookie_consent_v2</code> für höchstens 180 Tage. Sie können die Auswahl jederzeit über „Cookie-Einstellungen“ im Footer ändern oder widerrufen. Diese Speicherungen sind für die jeweiligen Funktionen erforderlich (§ 25 Abs. 2 TDDDG); die Verarbeitung personenbezogener Daten beruht je nach Funktion auf Art. 6 Abs. 1 lit. b oder lit. f DSGVO.</p>
          <p>Die Zahlungsabwicklung über Stripe kann außerdem für die sichere Durchführung der Zahlung technisch erforderliche Speicherungen vornehmen. Details dazu finden Sie in den <a href="https://stripe.com/de/privacy" target="_blank" rel="noreferrer">Datenschutzhinweisen von Stripe</a>.</p>
        </section>

        <section>
          <h2>4. Bestellung, Zahlung und Versand</h2>
          <p>Wenn Sie Kennzeichen bestellen, verarbeiten wir die eingegebene Kennzeichenkombination, Produkt- und Bestelldaten, Ihren Namen, Ihre E-Mail-Adresse, Liefer- und Rechnungsanschrift, Zahlungsstatus sowie gegebenenfalls eine Sendungsnummer. Diese Angaben sind für Bestellung, Zahlung, Herstellung, Lieferung und Kundenkommunikation erforderlich (Art. 6 Abs. 1 lit. b DSGVO). Für Rechnungen und gesetzliche Nachweispflichten verarbeiten wir erforderliche Daten auch nach Art. 6 Abs. 1 lit. c DSGVO.</p>
          <p>Zahlungsdaten werden im eingebetteten Checkout unmittelbar durch Stripe verarbeitet; vollständige Kartendaten speichern wir nicht selbst. Für die Herstellung übermitteln wir die erforderlichen Bestell- und Adressdaten an unseren Präge- und Versanddienstleister. Für die Paketzustellung erhält DHL die erforderlichen Versanddaten. Eine vorhandene Sendungsnummer teilen wir Ihnen per E-Mail mit. Die E-Mails werden über unseren eingesetzten E-Mail-Dienstleister versendet.</p>
          <p>Ohne die für den Vertrag erforderlichen Angaben können wir eine Bestellung nicht ausführen. Bestell- und Rechnungsdaten werden entsprechend den anwendbaren handels- und steuerrechtlichen Aufbewahrungsfristen gespeichert; danach werden sie gelöscht, soweit keine andere Rechtsgrundlage eine weitere Speicherung erfordert.</p>
        </section>

        <section>
          <h2>5. Kundenkonto und Kontakt</h2>
          <p>Für das freiwillige Kundenkonto verarbeiten wir Ihre E-Mail-Adresse, einen zeitlich begrenzten Anmeldelink, eine Sitzung sowie die Ihrem Konto zugeordneten Bestellungen und Rechnungen. Der Anmeldelink ist 15 Minuten gültig. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO. Bei einer Kontaktaufnahme per E-Mail verarbeiten wir Ihre Angaben zur Bearbeitung der Anfrage (Art. 6 Abs. 1 lit. b oder lit. f DSGVO). Die Daten werden gelöscht, sobald der Zweck entfällt und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.</p>
        </section>

        <section>
          <h2>6. Analyse und Marketing</h2>
          <p>Google Tag Manager, Google Analytics, Meta/Facebook Pixel und Microsoft Clarity sind auf dieser Website derzeit technisch nicht aktiviert. Auch bei Auswahl von „Alles erlauben“ werden momentan keine Analyse- oder Marketing-Skripte geladen. Die im Cookie-Dialog gewählten Optionen werden nur als Einstellung gespeichert. Eine spätere technische Aktivierung erfolgt erst nach einer erneuten, auf die tatsächlich eingesetzten Dienste bezogenen Einwilligung; dazu werden dieser Hinweis und die Einwilligungsauswahl zuvor angepasst (Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG).</p>
          <p>Die vorgesehenen Dienste dienen der technischen Verwaltung von Tags (Google Tag Manager), der Reichweitenmessung (Google Analytics), der Auswertung der Websitenutzung (Microsoft Clarity) und der Messung von Werbekampagnen (Meta Pixel). Bei einer späteren Aktivierung können Nutzungsereignisse, Geräte- und Browserdaten, Online-Kennungen und gegebenenfalls IP-Adressen an die jeweiligen Anbieter übertragen werden. Informationen der Anbieter: <a href="https://policies.google.com/privacy?hl=de" target="_blank" rel="noreferrer">Google</a>, <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noreferrer">Meta</a> und <a href="https://privacy.microsoft.com/de-de/privacystatement" target="_blank" rel="noreferrer">Microsoft</a>.</p>
          <p>Die auf dieser Website verwendeten Schriftdateien werden lokal ausgeliefert. Beim Seitenaufruf wird dafür keine Verbindung zu Google Fonts hergestellt.</p>
        </section>

        <section>
          <h2>7. Dienstleister und Drittlandübermittlungen</h2>
          <p>Für Hosting, Domainverwaltung, Zahlungsabwicklung, E-Mail, Herstellung und Versand setzen wir die oben genannten oder beschriebenen Dienstleister ein. GitHub verwenden wir für die Verwaltung des Quellcodes; durch den bloßen Besuch dieser Website werden keine Besucherdaten an GitHub übermittelt.</p>
          <p>Einige Dienstleister können Daten außerhalb des Europäischen Wirtschaftsraums verarbeiten. Soweit dies geschieht, erfolgt die Übermittlung nach den Vorgaben der Art. 44 ff. DSGVO, etwa auf Grundlage eines Angemessenheitsbeschlusses oder geeigneter Garantien. Die für den konkreten Anbieter geltenden Einzelheiten ergeben sich aus dessen Datenschutzhinweisen und Vertragsunterlagen.</p>
        </section>

        <section>
          <h2>8. Ihre Rechte</h2>
          <p>Sie haben nach Maßgabe der DSGVO das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung und Datenübertragbarkeit. Sie können einer Verarbeitung auf Grundlage berechtigter Interessen widersprechen. Eine erteilte Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen. Bitte wenden Sie sich dazu an <a href="mailto:support@function-concept.de">support@function-concept.de</a>.</p>
          <p>Sie können sich außerdem bei einer Datenschutzaufsichtsbehörde beschweren. Für private Unternehmen mit Sitz in Bayern ist das <a href="https://www.lda.bayern.de/" target="_blank" rel="noreferrer">Bayerische Landesamt für Datenschutzaufsicht</a> zuständig. Eine ausschließlich automatisierte Entscheidung mit rechtlicher oder ähnlich erheblicher Wirkung findet auf dieser Website nicht statt.</p>
        </section>

        <section>
          <h2>9. Änderungen</h2>
          <p>Wir aktualisieren diese Datenschutzerklärung, wenn sich Funktionen, eingesetzte Dienstleister oder rechtliche Anforderungen ändern. Die jeweils aktuelle Fassung ist auf dieser Seite abrufbar.</p>
        </section>
      </div>
    </main>
  );
}
