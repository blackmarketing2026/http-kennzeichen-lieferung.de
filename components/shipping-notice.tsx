import Image from 'next/image';

export function ShippingNotice() {
  return (
    <section className="shipping-notice" aria-label="Produktion und Versand">
      <Image src="/shipping/dhl.svg" alt="DHL" width={132} height={29} unoptimized />
      <div>
        <h3>In 10 Minuten versandfertig</h3>
        <p>Nach deiner Bestellung machen wir deine Kennzeichen innerhalb von 10 Minuten versandfertig.</p>
        <p><strong>DHL-Abholung dreimal am Tag: um 9, 12 und 16 Uhr.</strong></p>
        <p>Sobald die Sendungsnummer vorliegt, erhältst du sie per E-Mail und kannst dein Paket live bei DHL verfolgen.</p>
      </div>
    </section>
  );
}
