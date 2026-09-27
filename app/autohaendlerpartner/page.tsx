import type { Metadata } from 'next';
import { AutohaendlerPartnerPage } from './autohaendler-partner-page';

export const metadata: Metadata = {
  title: 'Kennzeichen für Autohändler | Schnell online bestellen',
  description:
    'Autohändler bestellen Kennzeichen schnell und unkompliziert. Persönlichen Händlercode eingeben, exklusive Konditionen nutzen und DHL-Abholung live verfolgen.',
  alternates: {
    canonical: '/autohaendlerpartner',
  },
};

export default function Page() {
  return <AutohaendlerPartnerPage />;
}
