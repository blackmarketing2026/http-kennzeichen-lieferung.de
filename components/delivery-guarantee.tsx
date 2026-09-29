import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import { DELIVERY_EXPLANATION, DELIVERY_PROMISE_TEXT } from '@/lib/delivery-promise';

export function DeliveryGuarantee() {
  return <div className="delivery-guarantee">
    <p className="delivery-guarantee-time"><strong>{DELIVERY_PROMISE_TEXT}</strong></p>
    <p className="delivery-guarantee-explanation">{DELIVERY_EXPLANATION}</p>
    <aside className="delivery-guarantee-box">
      <ShieldCheck size={24} aria-hidden="true" />
      <div>
        <strong>Liefergarantie bei verspäteter Zustellung</strong>
        <p>Kommen deine Kennzeichen nach Ablauf unserer Lieferfrist an und musst du deshalb vorher vor Ort Ersatz kaufen, erstatten wir dir den bei uns gezahlten Kennzeichen-Kaufpreis gegen Beleg.</p>
        <Link href="/liefergarantie">Bedingungen der Liefergarantie ansehen</Link>
      </div>
    </aside>
  </div>;
}
