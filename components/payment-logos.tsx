import Image from 'next/image';
import { LockKeyhole } from 'lucide-react';

const PAYMENT_LOGOS = [
  ['google_pay', 'Google Pay'],
  ['amazon-pay', 'Amazon Pay'],
  ['apple_pay', 'Apple Pay'],
  ['visa', 'Visa'],
  ['american_express', 'American Express'],
  ['maestro', 'Maestro'],
  ['master', 'Mastercard'],
] as const;

export function PaymentLogos() {
  return (
    <div className="payment-logos">
      <p className="payment-logos-heading"><LockKeyhole size={16} aria-hidden="true" /> Sicher bezahlen mit Stripe</p>
      <ul className="payment-logos-list" aria-label="Zahlungsarten">
        {PAYMENT_LOGOS.map(([file, name]) => (
          <li key={file}><Image src={`/payments/${file}.svg`} alt={name} width={66} height={42} unoptimized /></li>
        ))}
      </ul>
      <p className="payment-logos-note">Die für dich verfügbaren Zahlungsarten werden im Checkout angezeigt.</p>
    </div>
  );
}
