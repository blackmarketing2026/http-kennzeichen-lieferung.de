import Image from 'next/image';

export function ShippingNotice() {
  return (
    <section className="shipping-notice" aria-label="Produktion und Versand">
      <Image src="/shipping/dhl.svg" alt="DHL" width={132} height={29} unoptimized />
      <div>
        <h3>In 10 Minuten versandfertig</h3>
        <p>Nach deiner Bestellung werden deine Kennzeichen innerhalb von 10 Minuten gedruckt und versandfertig gemacht.</p>
        <p>DHL holt die Kennzeichen dreimal am Tag ab und übernimmt den Versand.</p>
      </div>
    </section>
  );
}
