import Link from 'next/link';
import { ArrowRight, Bike, CarFront, CircleParking, Leaf, Truck, Waves } from 'lucide-react';
import styles from './product-directory.module.css';

const products = [
  { href: '/kennzeichen-bestellen', name: 'Autokennzeichen', detail: 'Einzeilige Schilder für dein Auto', icon: CarFront },
  { href: '/motorradkennzeichen-bestellen', name: 'Motorradkennzeichen', detail: 'Zweizeilig, 180 × 200 mm', icon: Bike },
  { href: '/anhaengerkennzeichen', name: 'Anhängerkennzeichen', detail: 'Passend zur zugeteilten Kombination', icon: Truck },
  { href: '/fahrradtraeger-kennzeichen', name: 'Fahrradträger-Schild', detail: 'Zusatzschild mit gleicher Kombination', icon: CircleParking },
  { href: '/e-kennzeichen', name: 'E-Kennzeichen', detail: 'Mit E-Zusatz am Ende', icon: Leaf },
  { href: '/saisonkennzeichen', name: 'Saisonkennzeichen', detail: 'Mit gewähltem Betriebszeitraum', icon: Waves },
] as const;

export function ProductDirectory() {
  return <section className={styles.section} aria-labelledby="product-directory-title"><div className={styles.inner}><div className={styles.heading}><span>UNSERE SCHILDER</span><h2 id="product-directory-title">Das passende Kennzeichen für deinen nächsten Schritt.</h2><p>Wähle die Ausführung, die zu deiner zugeteilten Kombination passt. Preis und Versand siehst du vor dem Bezahlen.</p></div><div className={styles.grid}>{products.map(({ href, name, detail, icon: Icon }) => <Link key={href} href={href}><Icon size={25} aria-hidden="true" /><strong>{name}</strong><span>{detail}</span><ArrowRight className={styles.arrow} size={18} aria-hidden="true" /></Link>)}</div><p className={styles.more}>Weitere Varianten: <Link href="/h-kennzeichen">H-Kennzeichen</Link>, <Link href="/carbon-kennzeichen">Carbon-Optik</Link> und <Link href="/kennzeichenhalter">Kennzeichenhalter</Link>. <Link href="/ratgeber">Zum Ratgeber →</Link></p></div></section>;
}
