import Link from 'next/link';
import { EmbeddedCheckout } from '@/components/embedded-checkout';
import { isValidPlate, PRODUCTS, type PlateColor, type PlateType } from '@/config/products';

const PLATE_TYPES = Object.keys(PRODUCTS) as PlateType[];

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function CheckoutPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const plate = first(params.plate)?.toUpperCase().replace(/\s+/g, ' ').trim() ?? '';
  const plateType = first(params.type) as PlateType;
  const plateColor = first(params.color) as PlateColor;
  const quantity = Number(first(params.quantity)) as 1 | 2 | 3;
  const isValid = PLATE_TYPES.includes(plateType) && ['black', 'carbon'].includes(plateColor) && [1, 2, 3].includes(quantity) && isValidPlate(plate, plateType);

  if (!isValid) {
    return <main className="invalid-checkout"><h1>Bestellung nicht vollständig.</h1><p>Bitte konfiguriere dein Kennzeichen erneut.</p><Link className="button" href="/#konfigurator">Zur Konfiguration</Link></main>;
  }

  return <EmbeddedCheckout selection={{ plate, plateType, plateColor, quantity }} />;
}
