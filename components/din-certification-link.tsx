import Image from 'next/image';
import Link from 'next/link';

export function DinCertificationLink() {
  return (
    <Link className="din-certification-link" href="/din-74069" aria-label="Mehr über Kennzeichen nach DIN 74069 und das DIN-Prüfzeichen erfahren">
      <Image
        src="/din-geprueft-2m-186997-18.webp"
        alt="DIN GEPRÜFT, Registernummer 2M 186997 18"
        width={974}
        height={1030}
      />
      <span>
        <strong>Kennzeichen nach DIN 74069</strong>
        <small>Registernummer 2M 186997 18 · Mehr erfahren →</small>
      </span>
    </Link>
  );
}
