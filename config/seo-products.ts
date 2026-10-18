import { CARBON_SURCHARGE, formatPrice, SHIPPING_CENTS, type PlateColor, type PlateType } from '@/config/products';
import type { CheckoutSource } from '@/lib/checkout-draft';

export type SeoProduct = {
  slug: CheckoutSource;
  title: string;
  description: string;
  h1: string;
  eyebrow: string;
  intro: string;
  detailTitle: string;
  detail: string[];
  selectionTitle: string;
  selection: string;
  type: PlateType;
  color: PlateColor;
  quantity: 1 | 2;
  bikeRack?: boolean;
  holderAddon?: boolean;
  image: string;
  imageAlt: string;
  specs: string[];
  faqs: { question: string; answer: string }[];
  related: { href: string; label: string }[];
};

export const SEO_PRODUCTS: Record<string, SeoProduct> = {
  'fahrradtraeger-kennzeichen': {
    slug: 'fahrradtraeger-kennzeichen', title: 'Fahrradträger-Kennzeichen bestellen | Wiederholungskennzeichen',
    description: 'Wiederholungskennzeichen für den Fahrradträger zusammen mit deinem Autoschild bestellen. Gleiche Kombination, Preis und Versand vor dem Bezahlen prüfen.',
    h1: 'Fahrradträger-Kennzeichen bestellen', eyebrow: 'DAS DRITTE SCHILD',
    intro: 'Wenn der Fahrradträger das hintere Kennzeichen verdeckt, brauchst du ein Schild mit derselben Kombination am Träger. Bei uns fügst du es zu einer Bestellung mit zwei regulären Kennzeichen hinzu.',
    detailTitle: 'Gleiche Kombination, eigener Platz am Träger',
    detail: ['Das Wiederholungskennzeichen trägt die Kombination deines Fahrzeugs. Gib sie einmal ein; die Zusatzoption übernimmt sie für das dritte Schild.', 'Das Fahrradträger-Schild ist hier ein Zusatzprodukt zur Kennzeichenbestellung und wird nicht als einzelner Artikel verkauft. Prüfe vor dem Kauf, welche Halterung dein Träger benötigt.'],
    selectionTitle: 'Zwei Autoschilder plus Fahrradträger-Schild', selection: 'Die Zusatzoption ist bereits ausgewählt. Im Checkout kannst du sie prüfen und ändern.',
    type: 'standard', color: 'black', quantity: 2, bikeRack: true, image: '/bike-rack-plate.webp', imageAlt: 'Beispiel eines Kennzeichens am Fahrradträger',
    specs: ['Einzeiliges Schild: 520 × 110 mm', 'Reflektierender Aluminiumrohling', 'Gleiche Kombination wie am Zugfahrzeug', 'Nur als Zusatz zur Kennzeichenbestellung'],
    faqs: [
      { question: 'Kann ich nur das Fahrradträger-Kennzeichen bestellen?', answer: 'Im aktuellen Shop ist es eine Zusatzoption zu regulären Kennzeichen. Die vorausgewählte Bestellung enthält zwei Autoschilder und ein gleich geprägtes Schild für den Träger.' },
      { question: 'Braucht das Wiederholungskennzeichen eine Stempelplakette?', answer: 'Nein. § 12 Abs. 10 FZV verlangt bei verdecktem hinterem Kennzeichen eine Wiederholung am Fahrzeug oder Ladungsträger; eine Abstempelung des Wiederholungskennzeichens ist nicht erforderlich.' },
    ],
    related: [{ href: '/kennzeichen-bestellen', label: 'Autokennzeichen' }, { href: '/ratgeber/kennzeichengroessen', label: 'Größenratgeber' }],
  },
  anhaengerkennzeichen: {
    slug: 'anhaengerkennzeichen', title: 'Anhängerkennzeichen bestellen | Kennzeichen für Anhänger',
    description: 'Kennzeichen für deinen Anhänger mit zugeteilter Kombination bestellen. 520 × 110 mm, Anzahl und Versandkosten direkt prüfen.',
    h1: 'Anhängerkennzeichen online bestellen', eyebrow: 'FÜR DEINEN ANHÄNGER',
    intro: 'Für einen Anhänger mit eigener Kennzeichenkombination kannst du hier ein geprägtes Schild bestellen. Du gibst die zugeteilte Kombination ein und wählst die benötigte Anzahl.',
    detailTitle: 'Vor der Bestellung die Kombination prüfen',
    detail: ['Für Anhänger mit eigenem Kennzeichen wählst du hier das einzeilige Standardschild. Der Shop reserviert keine Kombination und übernimmt keine Zulassung.', 'Prüfe am Anhänger die vorgesehene Schildgröße und gleiche die Zeichen mit deinen Unterlagen ab. Für Sonderfälle mit anderer Schildform ist dieser Konfigurator nicht ausgelegt.'],
    selectionTitle: 'Ein Schild für den Anhänger', selection: 'Ein Standardschild ist vorausgewählt. Bei Bedarf kannst du die Menge ändern.',
    type: 'standard', color: 'black', quantity: 1, image: '/references/beispiel-anhaenger-gartenladung.jpg', imageAlt: 'Anhänger mit Kennzeichen als illustrative Fahrzeugaufnahme',
    specs: ['Einzeiliges Schild: 520 × 110 mm', 'Schwarze Schrift auf reflektierendem Aluminiumrohling', 'Ein oder zwei Schilder wählbar'],
    faqs: [
      { question: 'Ist für jeden Anhänger dieses Schild richtig?', answer: 'Nein. Anhänger können unterschiedliche Kennzeichensituationen haben. Bestelle dieses Schild nur, wenn dir die passende Kombination und Schildform feststehen.' },
      { question: 'Ist die Zulassung enthalten?', answer: 'Nein. Du kaufst ein geprägtes Schild. Zuteilung, Zulassung und amtliche Plaketten erfolgen getrennt über die zuständige Behörde.' },
    ],
    related: [{ href: '/fahrradtraeger-kennzeichen', label: 'Fahrradträger-Kennzeichen' }, { href: '/ratgeber/wunschkennzeichen-reservieren', label: 'Kombination reservieren' }],
  },
  'e-kennzeichen': {
    slug: 'e-kennzeichen', title: 'E-Kennzeichen bestellen | Schild für Elektrofahrzeuge',
    description: `E-Kennzeichen mit E-Zusatz prägen lassen. Kombination, Menge, Preis und ${formatPrice(SHIPPING_CENTS / 100)} DHL-Versand im Konfigurator prüfen.`,
    h1: 'E-Kennzeichen für dein Elektrofahrzeug', eyebrow: 'MIT E AM ENDE',
    intro: 'Ist deinem Fahrzeug ein E-Kennzeichen zugeteilt, prägen wir die passende Kombination mit E-Zusatz auf ein einzeiliges Schild. Die behördliche Berechtigung oder Zuteilung prüft der Shop nicht.',
    detailTitle: 'Der E-Zusatz gehört zur zugeteilten Kombination',
    detail: ['Im Konfigurator gibst du Ortskürzel, Buchstaben und Zahlen ohne das abschließende E ein. Die Vorschau und Bestellung ergänzen den Zusatz automatisch.', 'Das E benötigt Platz auf dem Schild. Bei längeren Kombinationen kann die Eingabe begrenzt sein; maßgeblich ist die Zuteilung deiner Zulassungsbehörde.'],
    selectionTitle: 'E-Ausführung vorausgewählt', selection: 'Du kannst ein oder zwei Schilder mit derselben Kombination bestellen.',
    type: 'electric', color: 'black', quantity: 2, image: '/shipping/kennzeichen-versandkarton.webp', imageAlt: 'Geprägte Kennzeichen vor einem Versandkarton als Produktillustration',
    specs: ['Einzeiliges Schild: 520 × 110 mm', 'Reflektierender Aluminiumrohling', 'E-Zusatz am Ende', 'Standard oder Carbon-Optik wählbar'],
    faqs: [
      { question: 'Beantrage ich hier das E-Kennzeichen?', answer: 'Nein. Wir prägen die Schilder. Ob und welche Kombination deinem Fahrzeug zugeteilt wird, entscheidet die Zulassungsbehörde.' },
      { question: 'Muss ich das E in das Eingabefeld schreiben?', answer: 'Nein. Wähle E-Kennzeichen und gib nur die Grundkombination ein. Das E wird in Vorschau und Bestellung ergänzt.' },
    ],
    related: [{ href: '/autokennzeichen', label: 'Autokennzeichen' }, { href: '/ratgeber/kennzeichengroessen', label: 'Kennzeichengrößen' }],
  },
  'h-kennzeichen': {
    slug: 'h-kennzeichen', title: 'H-Kennzeichen bestellen | Oldtimer-Schild prägen lassen',
    description: 'H-Kennzeichen mit zugeteilter Kombination konfigurieren. Ein oder zwei Schilder, Preis und Versand vor dem Checkout sehen.',
    h1: 'H-Kennzeichen für deinen Oldtimer', eyebrow: 'MIT H-ZUSATZ',
    intro: 'Für einen Oldtimer mit zugeteiltem H-Kennzeichen bestellst du hier die geprägten Schilder. Das H wird hinter der Erkennungsnummer dargestellt; die Oldtimer-Einstufung selbst erfolgt nicht im Shop.',
    detailTitle: 'Erst die Zuteilung, dann das passende Schild',
    detail: ['Trage die amtlich zugeteilte Grundkombination ein. Der Konfigurator setzt das H automatisch an das Ende.', 'Ein H-Kennzeichen beansprucht mehr Platz als die Grundkombination. Vergleiche vor dem Bestellen die Zeichenfolge und die gewünschte Schildform mit deinen Unterlagen.'],
    selectionTitle: 'H-Ausführung vorausgewählt', selection: 'Menge und Oberfläche kannst du vor dem Checkout anpassen.',
    type: 'historic', color: 'black', quantity: 2, image: '/shipping/kennzeichen-versandkarton.webp', imageAlt: 'Geprägte Kennzeichen und Versandkarton als illustrative Produktaufnahme',
    specs: ['Einzeiliges Schild: 520 × 110 mm', 'Reflektierender Aluminiumrohling', 'H-Zusatz am Ende', 'Ein oder zwei Schilder wählbar'],
    faqs: [
      { question: 'Ist eine Oldtimer-Begutachtung enthalten?', answer: 'Nein. Der Shop verkauft geprägte Kennzeichenschilder; Begutachtung und behördliche Zuteilung sind getrennte Schritte.' },
      { question: 'Gebe ich das H selbst ein?', answer: 'Nein. Wähle H-Kennzeichen und gib die Grundkombination ohne H ein. Die Vorschau ergänzt den Zusatz.' },
    ],
    related: [{ href: '/saisonkennzeichen', label: 'Saisonkennzeichen' }, { href: '/ratgeber/kennzeichen-online-bestellen', label: 'Bestellablauf' }],
  },
  saisonkennzeichen: {
    slug: 'saisonkennzeichen', title: 'Saisonkennzeichen bestellen | Zeitraum und Schild konfigurieren',
    description: 'Saisonkennzeichen mit zugeteiltem Betriebszeitraum konfigurieren. Monate, Anzahl, Preis und Versand vor dem Bezahlen prüfen.',
    h1: 'Saisonkennzeichen passend zu deinem Zeitraum', eyebrow: 'MONATE DIREKT WÄHLEN',
    intro: 'Du hast eine Saisonkombination zugeteilt bekommen? Gib Ortskürzel, Buchstaben, Zahlen und den festgelegten Betriebszeitraum ein. Die Monatsangabe erscheint direkt in der Vorschau.',
    detailTitle: 'Der Zeitraum muss zu deinen Fahrzeugpapieren passen',
    detail: ['Wähle Start- und Endmonat so, wie sie behördlich festgelegt wurden. Der Konfigurator erlaubt einen zusammenhängenden Zeitraum von zwei bis elf Monaten.', 'Saisonangabe und Zeichenfolge benötigen Platz auf dem Schild. Bei Unklarheiten zur Kombination oder zum Zeitraum hilft die zuständige Zulassungsbehörde.'],
    selectionTitle: 'Saisonformat vorausgewählt', selection: 'Die Monate stellst du direkt im Bestellformular ein.',
    type: 'season', color: 'black', quantity: 2, image: '/shipping/kennzeichen-versandkarton.webp', imageAlt: 'Geprägte Kennzeichenschilder neben einem Versandkarton',
    specs: ['Einzeiliges Schild: 520 × 110 mm', 'Reflektierender Aluminiumrohling', 'Saisonzeitraum: zwei bis elf Monate im Konfigurator', 'Ein oder zwei Schilder wählbar'],
    faqs: [
      { question: 'Kann ich die Saisonmonate frei festlegen?', answer: 'Du kannst die Monate im Formular wählen. Sie müssen aber mit dem zugeteilten Betriebszeitraum übereinstimmen; der Shop ändert keine Zulassungsdaten.' },
      { question: 'Reserviert die Eingabe meine Kombination?', answer: 'Nein. Die Eingabe dient nur der Prägung des Schildes.' },
    ],
    related: [{ href: '/h-kennzeichen', label: 'H-Kennzeichen' }, { href: '/ratgeber/wunschkennzeichen-reservieren', label: 'Reservierung verstehen' }],
  },
  'carbon-kennzeichen': {
    slug: 'carbon-kennzeichen', title: 'Carbon-Kennzeichen bestellen | Carbon-Optik konfigurieren',
    description: 'Kennzeichen mit Carbon-Optik bestellen. Aufpreis pro Schild, Anzahl und Versand werden im Konfigurator aus Shopdaten berechnet.',
    h1: 'Kennzeichen mit Carbon-Optik', eyebrow: 'DIE BESONDERE OBERFLÄCHE',
    intro: 'Du möchtest statt der Standardausführung eine Carbon-Optik? Wähle die passende Kennzeichenart und prüfe den Aufpreis direkt im Konfigurator. Die Optik ersetzt keine amtliche Zuteilung.',
    detailTitle: 'Oberfläche wählen, Kombination beibehalten',
    detail: ['Die Carbon-Optik ist für die einzeiligen Schilder und Motorradkennzeichen im Shop auswählbar. Die Zeichenfolge und Schildart bleiben dieselben wie bei der Standardausführung.', `Der Aufpreis beträgt laut zentraler Preiskonfiguration ${formatPrice(CARBON_SURCHARGE)} pro Schild. Prüfe die konkrete Gesamtsumme einschließlich möglicher Paketpreise und Versand im Formular.`],
    selectionTitle: 'Carbon-Optik vorausgewählt', selection: 'Standard, E-, H- und Saisonformat sind im Formular wählbar; für Motorräder gibt es eigene Pakete.',
    type: 'standard', color: 'carbon', quantity: 1, image: '/carbon-weave.webp', imageAlt: 'Nahaufnahme einer Carbon-Struktur als Oberflächenillustration',
    specs: [`Carbon-Optik: ${formatPrice(CARBON_SURCHARGE)} Aufpreis pro einzeiligem Schild`, 'Reflektierender Aluminiumrohling', 'Einzeiliges Schild: 520 × 110 mm', 'Motorrad-Carbon als eigenes Paket erhältlich'],
    faqs: [
      { question: 'Ist Carbon eine andere Kennzeichenart?', answer: 'Nein. Carbon bezeichnet hier die angebotene Optik. Schildart und zugeteilte Zeichenfolge wählst du separat.' },
      { question: 'Was kostet die Carbon-Ausführung insgesamt?', answer: 'Der Konfigurator berechnet die Summe aus gewählter Schildart, Anzahl, Carbon-Aufpreis und Versand. Bei einigen Zwei-Schild-Paketen greift ein Paketpreis.' },
    ],
    related: [{ href: '/kennzeichen-bestellen', label: 'Standardkennzeichen' }, { href: '/motorradkennzeichen-bestellen', label: 'Motorradkennzeichen' }],
  },
  kennzeichenhalter: {
    slug: 'kennzeichenhalter', title: 'Kennzeichenhalter und Schrauben | Zusatz zur Bestellung',
    description: 'Kennzeichenhalter mit Schrauben als Zusatz zur Kennzeichenbestellung auswählen. Verfügbarkeit und Preis im Checkout prüfen.',
    h1: 'Kennzeichenhalter mit Schrauben', eyebrow: 'PRAKTISCHES ZUBEHÖR',
    intro: 'Passend zur Bestellung einzeiliger Kennzeichen kannst du ein Set mit Haltern und Schrauben ergänzen. Es wird im Checkout als Zusatz angeboten, nicht als einzelner Artikel in diesem Shop.',
    detailTitle: 'Zusatzartikel für einzeilige Schilder',
    detail: ['Das hinterlegte Set enthält zwei Halter für 520 × 110 mm und Standardschrauben. Für Motorrad- und Landmaschinenschilder ist es im Checkout nicht verfügbar.', 'Konfiguriere zunächst deine Kennzeichen. Nach der Lieferadresse kannst du den Halter im Bereich „Extras zu deiner Bestellung“ hinzufügen; der Gesamtpreis aktualisiert sich vor der Zahlung.'],
    selectionTitle: 'Zuerst Kennzeichen konfigurieren', selection: 'Den Halter wählst du anschließend als Zusatz im Checkout aus.',
    type: 'standard', color: 'black', quantity: 2, holderAddon: true, image: '/shipping/kennzeichenhalter-set.webp', imageAlt: 'Illustrative Produktaufnahme mit zwei Kennzeichenhaltern und Schrauben',
    specs: ['Zwei Halter für 520 × 110 mm', 'Standardschrauben im Set', 'Material im Shopkatalog nicht näher angegeben', 'Nur als Zusatz zu passenden Kennzeichen'],
    faqs: [
      { question: 'Kann ich die Halter einzeln bestellen?', answer: 'Im aktuellen Shop nicht. Sie sind eine Zusatzoption zu einer Kennzeichenbestellung.' },
      { question: 'Passen die Halter für Motorradkennzeichen?', answer: 'Nein. Das angebotene Set ist für einzeilige 520 × 110 mm Schilder hinterlegt.' },
    ],
    related: [{ href: '/kennzeichen-bestellen', label: 'Autokennzeichen' }, { href: '/ratgeber/kennzeichengroessen', label: 'Kennzeichengrößen' }],
  },
};

export const SEO_PRODUCT_SLUGS = Object.keys(SEO_PRODUCTS);
