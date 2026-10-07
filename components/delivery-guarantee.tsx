import Link from 'next/link';
import { Truck } from 'lucide-react';
import { ShippingCountdown } from '@/components/shipping-countdown';

export function DeliveryGuarantee({ label = 'Liefergarantie' }: { label?: string }) {
  return <div className="delivery-summary">
    <p><Truck size={17} aria-hidden="true" /> <span>Lieferung: 1–4 Werktage nach Bestellung und Zahlung.</span> <Link href="/liefergarantie">{label}</Link></p>
    <ShippingCountdown />
  </div>;
}
