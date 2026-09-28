import Image from 'next/image';

export function ShippingNotice() {
  return (
    <section className="shipping-notice" aria-label="Produktion und Versand">
      <Image src="/shipping/dhl.svg" alt="DHL" width={132} height={29} unoptimized />
      <div>
        <h3>In 10 Minuten geprägt und versandfertig</h3>
        <p>Nach deiner Bestellung prägen wir deine Kennzeichen und bereiten sie für den Versand vor.</p>
        <p><strong>DHL-Abholung dreimal täglich an Werktagen.</strong></p>
        <p>Sobald die Sendungsnummer vorliegt, erhältst du sie per E-Mail. Den Status kannst du prüfen, sobald DHL die Sendung erfasst hat.</p>
      </div>
    </section>
  );
}
