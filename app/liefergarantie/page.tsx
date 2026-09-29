import type { Metadata } from 'next';
import Link from 'next/link';
import { GuaranteeClaimForm } from '@/components/guarantee-claim-form';
import { DELIVERY_EXPLANATION, DELIVERY_PROMISE_TEXT } from '@/lib/delivery-promise';

export const metadata: Metadata = {
  title: 'Liefergarantie | Kennzeichen-Lieferung',
  description: 'Bedingungen und Antrag für die zusätzliche Liefergarantie.',
};

export default function GuaranteePage() {
  return <main className="legal-page guarantee-page"><div className="legal-container">
    <Link className="legal-back" href="/kennzeichen-bestellen">← Zurück zum Kennzeichen</Link>
    <p className="legal-kicker">Lieferung</p>
    <h1>Unsere Liefergarantie</h1>
    <p className="legal-intro">Du brauchst deine Kennzeichen rechtzeitig für die Zulassung. Wenn unsere Lieferung die zugesagte Lieferfrist überschreitet und du deshalb vor Ort Ersatzkennzeichen kaufen musst, erstatten wir dir den bei uns gezahlten Kaufpreis für die betroffenen Kennzeichen.</p>
    <Link className="button guarantee-cta" href="#erstattung-beantragen">Erstattung beantragen</Link>
    <section><h2>Lieferzeit</h2><p><strong>{DELIVERY_PROMISE_TEXT}</strong></p><p>{DELIVERY_EXPLANATION}</p></section>
    <section><h2>Wann gilt die Liefergarantie?</h2><ul>
      <li>Die bei deiner Bestellung zugesagte Lieferfrist wurde überschritten.</li>
      <li>Du hast wegen dieser Verzögerung Ersatzkennzeichen mit derselben Kennzeichenkombination bei einem Schilderdienst oder einer Zulassungsstelle gekauft.</li>
      <li>Der Ersatzkauf erfolgte nach Ablauf unserer Lieferfrist und bevor unsere Kennzeichen bei dir angekommen sind.</li>
      <li>Du reichst einen lesbaren Kaufbeleg mit Händler, Datum, Anzahl und Betrag ein.</li>
    </ul></section>
    <section><h2>Was erstatten wir?</h2><p>Wir erstatten den bei uns tatsächlich gezahlten Kaufpreis für die betroffenen Kennzeichen. Zubehör und zusätzliche Leistungen sind nicht Bestandteil dieser freiwilligen Liefergarantie. Die Kosten des Ersatzkaufs werden im Rahmen dieser Garantie nicht übernommen. Die Erstattung erfolgt auf die ursprüngliche Zahlungsart.</p></section>
    <section><h2>Wann greift die zusätzliche Garantie nicht?</h2><p>Die zusätzliche Liefergarantie gilt nicht, wenn die Verzögerung durch eine von dir falsch oder unvollständig angegebene Lieferadresse, eine von dir veranlasste Umleitung der Sendung oder die verweigerte Annahme verursacht wurde.</p></section>
    <aside className="guarantee-rights">Diese Liefergarantie ist eine zusätzliche freiwillige Leistung. Deine gesetzlichen Rechte, insbesondere bei verspäteter oder ausbleibender Lieferung, bleiben unberührt. Die Voraussetzungen dieser Garantie gelten ausschließlich für die zusätzliche Garantieleistung.</aside>
    <section id="erstattung-beantragen"><h2>Erstattung beantragen</h2><GuaranteeClaimForm /><p>Informationen zur Verarbeitung deiner Angaben findest du in unserer <Link href="/datenschutz">Datenschutzerklärung</Link>.</p></section>
  </div></main>;
}
