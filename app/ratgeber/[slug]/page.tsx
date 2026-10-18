import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { guides } from '@/config/guides';
import { absoluteUrl, breadcrumbJsonLd, safeJsonLd } from '@/lib/seo';
import { formatPrice, PRODUCTS, SHIPPING_CENTS } from '@/config/products';
import styles from '../ratgeber.module.css';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return guides.map(guide => ({ slug: guide.slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides.find(item => item.slug === slug);
  if (!guide) return {};
  return { title: `${guide.title} | Ratgeber`, description: guide.teaser, alternates: { canonical: absoluteUrl(`/ratgeber/${guide.slug}`) } };
}

export default async function GuideArticle({ params }: Props) {
  const { slug } = await params;
  const guide = guides.find(item => item.slug === slug);
  if (!guide) notFound();
  const breadcrumbs = [{ name: 'Startseite', href: '/' }, { name: 'Ratgeber', href: '/ratgeber' }, { name: guide.title, href: `/ratgeber/${guide.slug}` }];
  return <main className={styles.page}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbJsonLd(breadcrumbs)) }} />
    <header className={styles.header}><Link href="/">← Zur Startseite</Link><Link href="/ratgeber">Alle Ratgeber</Link></header>
    <div className={styles.container}><nav className={styles.crumb} aria-label="Brotkrumennavigation"><Link href="/">Startseite</Link><span>/</span><Link href="/ratgeber">Ratgeber</Link><span>/</span><span>{guide.title}</span></nav><div className={styles.article}><article><div className={styles.articleIntro}><span>RATGEBER</span><h1>{guide.title}</h1><p>{guide.teaser}</p></div><div className={styles.body}>
      {guide.slug === 'wunschkennzeichen-reservieren' && <>
        <h2>Reservierung und Schilderkauf sind zwei Schritte</h2><p>Eine Wunschkombination wird von der zuständigen Zulassungsbehörde zugeteilt oder reserviert. Ein Kennzeichenshop prägt anschließend die Schilder mit dieser Kombination. Wenn du bei uns Buchstaben und Zahlen eingibst, prüfen wir damit weder die Verfügbarkeit noch reservieren wir sie bei einer Behörde. Auch die Zulassung und die amtlichen Plaketten sind nicht Teil der Schilderbestellung.</p>
        <h2>So gehst du vor</h2><ol><li><strong>Zuständige Stelle finden:</strong> Suche das offizielle Reservierungsangebot deiner Stadt oder deines Landkreises. Das <a href="https://verwaltung.bund.de/leistungsverzeichnis/de/leistung/99036009072003" target="_blank" rel="noopener noreferrer">Bundesportal zur Wunschkennzeichen-Reservierung</a> führt abhängig von der Region zum zuständigen Verfahren.</li><li><strong>Kombination prüfen und reservieren:</strong> Folge den Vorgaben der Behörde. Verfügbarkeit, Frist und mögliche Gebühren erfährst du dort; sie können regional unterschiedlich sein.</li><li><strong>Schilder bestellen:</strong> Übertrage die bestätigte Kombination exakt in unseren <Link href="/#konfigurator">Konfigurator</Link> und wähle Schildart, Menge und Oberfläche.</li><li><strong>Zulassung erledigen:</strong> Die Behörde prüft deine Unterlagen, teilt das Kennzeichen zu und bringt die amtlichen Plaketten im jeweiligen Verfahren an. Ein reserviertes Wunschkennzeichen allein ersetzt die Zulassung nicht.</li></ol>
        <h2>Welche Schilder passen zur Reservierung?</h2><p>Ein normales Auto- oder Anhängerkennzeichen findest du bei <Link href="/kennzeichen-bestellen">Autokennzeichen</Link> beziehungsweise <Link href="/anhaengerkennzeichen">Anhängerkennzeichen</Link>. Bei einem zugeteilten E-, H- oder Saisonkennzeichen wähle die entsprechende Ausführung: <Link href="/e-kennzeichen">E</Link>, <Link href="/h-kennzeichen">H</Link> oder <Link href="/saisonkennzeichen">Saison</Link>. Ein Motorrad benötigt eine andere Schildform; dafür gibt es die <Link href="/motorradkennzeichen-bestellen">Motorradseite</Link>.</p>
        <p className={styles.source}>Behördliche Quelle: <a href="https://verwaltung.bund.de/leistungsverzeichnis/de/leistung/99036009072003" target="_blank" rel="noopener noreferrer">Bundesportal – Wunschkennzeichen beantragen oder reservieren</a>.</p>
      </>}
      {guide.slug === 'kennzeichengroessen' && <>
        <h2>Diese Maße sind im Shop hinterlegt</h2><p>Die folgende Übersicht beschreibt die tatsächlich im aktuellen Konfigurator auswählbaren Schilder. Die Maße sind Produktmaße, keine Zusage, dass jede Größe für jedes Fahrzeug oder jede Kombination zugeteilt wird.</p>
        <table><thead><tr><th>Ausführung</th><th>Shopmaß</th><th>Wichtig bei der Auswahl</th></tr></thead><tbody><tr><td><Link href="/kennzeichen-bestellen">Auto</Link>, <Link href="/anhaengerkennzeichen">Anhänger</Link>, <Link href="/e-kennzeichen">E</Link>, <Link href="/h-kennzeichen">H</Link>, <Link href="/saisonkennzeichen">Saison</Link></td><td>520 × 110 mm</td><td>Einzeilig; Zusätze und Saisonfeld beanspruchen Platz.</td></tr><tr><td><Link href="/motorradkennzeichen-bestellen">Motorrad</Link></td><td>{PRODUCTS.motorcycle.size}</td><td>Zweizeilig; die mögliche Zeichenlänge ist begrenzt.</td></tr><tr><td><Link href="/landmaschinen-kennzeichen">Landmaschine</Link></td><td>{PRODUCTS.agriculture240.size} oder {PRODUCTS.agriculture255.size}</td><td>Zweizeilig; vor Bestellung die zugeteilte Form und Anbringungsfläche prüfen.</td></tr></tbody></table>
        <h2>Wie finde ich die richtige Größe?</h2><ol><li>Prüfe zuerst, welche Kennzeichenart und Kombination dir zugeteilt wurden. Die Form des Schildes richtet sich nicht allein nach deinem Wunsch.</li><li>Vergleiche die vorgesehene Anbringungsfläche am Fahrzeug oder Anhänger mit der angebotenen Schildform.</li><li>Wähle im Konfigurator die passende Produktart. Die Vorschau zeigt Zusätze wie E oder H und beim Saisonkennzeichen die Monate an.</li><li>Wenn deine Unterlagen eine andere Schildgröße vorsehen, bestelle nicht auf Verdacht. Frage bei der zuständigen Zulassungsbehörde nach.</li></ol>
        <h2>Kurze Kennzeichen und Sonderformate</h2><p>Der aktuelle Auto-Konfigurator bietet kein verkürztes einzeiliges Schild an. Die Fahrzeug-Zulassungsverordnung nennt zulässige Höchst- beziehungsweise Maßbereiche; daraus folgt kein Anspruch auf eine bestimmte kurze Kombination oder Schildgröße. Unser <Link href="/ratgeber/kennzeichen-online-bestellen">Bestellratgeber</Link> erklärt die weiteren Schritte.</p>
        <p className={styles.source}>Rechtsquelle für Maße und Ausgestaltung: <a href="https://www.gesetze-im-internet.de/fzv_2023/anlage_4.html" target="_blank" rel="noopener noreferrer">Anlage 4 FZV</a>; <a href="https://www.gesetze-im-internet.de/fzv_2023/__12.html" target="_blank" rel="noopener noreferrer">§ 12 FZV</a>.</p>
      </>}
      {guide.slug === 'kennzeichen-online-bestellen' && <>
        <h2>Was du vor der Bestellung brauchst</h2><p>Halte die bereits zugeteilte oder offiziell reservierte Zeichenkombination bereit: Ortskürzel, Erkennungsbuchstaben und Zahlen. Für E- oder H-Kennzeichen musst du die passende Schildart kennen; für Saisonkennzeichen zusätzlich die zugeteilten Monate. Prüfe außerdem, wie viele Schilder und welche Schildform du für dein Fahrzeug benötigst.</p>
        <h2>So läuft die Bestellung im Shop</h2><ol><li><strong>Produkt auswählen:</strong> Starte auf der <Link href="/">Startseite</Link> oder direkt bei <Link href="/kennzeichen-bestellen">Auto</Link>, <Link href="/motorradkennzeichen-bestellen">Motorrad</Link> oder einer anderen passenden Produktart.</li><li><strong>Kombination eingeben:</strong> Übertrage sie Zeichen für Zeichen. Bei E und H setzt die Vorschau den Zusatz automatisch; bei Saison wählst du den Zeitraum.</li><li><strong>Preis prüfen:</strong> Anzahl, Oberfläche und optionale Extras wirken sich auf die Summe aus. Der reguläre DHL-Versand beträgt laut aktueller Shopkonfiguration {formatPrice(SHIPPING_CENTS / 100)} pro Bestellung. Der genaue Gesamtpreis wird vor dem Bezahlen angezeigt.</li><li><strong>Adresse und Zahlung:</strong> Im Checkout gibst du Lieferdaten ein und wählst eine dort verfügbare Zahlungsart. Erst mit der bestätigten Zahlung wird die Bestellung ausgelöst.</li><li><strong>Schilder erhalten:</strong> Die geprägten Schilder werden verpackt und versandt. Die Sendungsverfolgung zeigt den Transportstatus, sobald DHL die Sendung erfasst hat.</li></ol>
        <h2>Was passiert mit Reservierung und Zulassung?</h2><p>Dieser Shop verkauft geprägte Schilder. Eine <Link href="/ratgeber/wunschkennzeichen-reservieren">Wunschkennzeichen-Reservierung</Link> erfolgt über die zuständige offizielle Stelle. Die Behörde entscheidet über die Zuteilung und die erforderliche Zulassung. Amtliche Plaketten gehören nicht zum Lieferumfang der hier angebotenen Schilder.</p>
        <h2>Wenn du bei der Schildform unsicher bist</h2><p>Vergleiche die angebotenen Maße im <Link href="/ratgeber/kennzeichengroessen">Größenratgeber</Link> mit deinen Fahrzeugunterlagen. Ein günstiger Preis oder eine passende Vorschau ersetzt nicht die Prüfung, welche Ausführung für dein Fahrzeug zugeteilt wurde.</p>
        <p className={styles.source}>Behördliche Grundlagen: <a href="https://www.gesetze-im-internet.de/fzv_2023/__12.html" target="_blank" rel="noopener noreferrer">§ 12 FZV</a> und <a href="https://verwaltung.bund.de/leistungsverzeichnis/de/leistung/99036009072003" target="_blank" rel="noopener noreferrer">Bundesportal zur Wunschkennzeichen-Reservierung</a>.</p>
      </>}
    </div></article><aside className={styles.aside}><h2>Passende nächste Schritte</h2><Link href="/#konfigurator">Zum Konfigurator</Link><Link href="/kennzeichen-bestellen">Autokennzeichen</Link><Link href="/motorradkennzeichen-bestellen">Motorradkennzeichen</Link><Link href="/ratgeber">Alle Ratgeber</Link></aside></div></div>
  </main>;
}
