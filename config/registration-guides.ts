export type GuideSection = {
  id: string;
  title: string;
  paragraphs: string[];
  items?: string[];
  table?: { headers: string[]; rows: string[][] };
};
export type RegistrationGuide = {
  slug: string;
  title: string;
  teaser: string;
  category: string;
  reviewedAt?: string;
  intro: string[];
  takeaway: string;
  sections: GuideSection[];
  faq: { question: string; answer: string }[];
  sources: { label: string; href: string }[];
  related: string[];
  cta: string;
};
const fzv = (section: string) => `https://www.gesetze-im-internet.de/fzv_2023/${section}.html`;
const registration = { label: 'Service Berlin: Erstzulassung – Voraussetzungen und Unterlagen', href: 'https://service.berlin.de/dienstleistung/120882/' };
const tax = { label: 'Zoll: Zahlung der Kfz-Steuer und SEPA-Mandat', href: 'https://www.zoll.de/DE/Privatpersonen/Kraftfahrzeugsteuer/Zahlung-der-Kfz-Steuer/zahlung-der-kfz-steuer_node.html' };
const shortTerm = { label: 'Service Berlin: Kurzzeitkennzeichen beantragen', href: 'https://service.berlin.de/dienstleistung/121479/' };

export const registrationGuides: RegistrationGuide[] = [
{
  "slug": "auslaendische-kennzeichen-deutschland",
  "title": "Ausländische Kennzeichen in Deutschland: Wann ist eine deutsche Zulassung nötig?",
  "teaser": "Besuch oder regelmäßiger Standort? Warum ein ausländisches Kennzeichen nicht pauschal ein Jahr Nutzung nach einem Umzug erlaubt und wann du deutsche Schilder einplanst.",
  "category": "Zulassung vorbereiten",
  "reviewedAt": "2026-11-24",
  "intro": [
    "Du kommst mit einem im Ausland zugelassenen Auto nach Deutschland. Bei einem Besuch ist die Ausgangslage anders als bei einem dauerhaft hier genutzten Fahrzeug. Kläre zuerst die Zulassungspflicht, bevor du deutsche Kennzeichenschilder bestellst."
  ],
  "takeaway": "Die vorübergehende Nutzung nach § 46 FZV setzt insbesondere voraus, dass kein regelmäßiger Standort in Deutschland begründet ist. Die Ein-Jahres-Regel ist deshalb keine allgemeine Schonfrist nach jedem Umzug.",
  "sections": [
    {
      "id": "standort",
      "title": "1. Besuch und regelmäßigen Standort unterscheiden",
      "paragraphs": [
        "Für Fahrzeuge aus EU-/EWR-Staaten und aus Drittstaaten nennt § 46 FZV unterschiedliche Dokumentenvoraussetzungen. Gemeinsam ist dem gewöhnlichen Fall: Das Fahrzeug nimmt nur vorübergehend teil und hat keinen regelmäßigen Standort in Deutschland.",
        "Wenn das Auto dauerhaft von Deutschland aus genutzt werden soll, kläre die deutsche Zulassung frühzeitig mit der zuständigen Behörde. Das Landratsamt Neu-Ulm erläutert ebenfalls, dass ein regelmäßiger Standort grundsätzlich die deutsche Zulassung erforderlich macht. Ein ausländischer Haltereintrag allein beantwortet diese Standortfrage nicht."
      ]
    },
    {
      "id": "zeitraum",
      "title": "2. Die Jahresfrist nicht isoliert betrachten",
      "paragraphs": [
        "§ 46 Absatz 7 beschreibt die vorübergehende Teilnahme grundsätzlich als Zeitraum bis zu einem Jahr. Bei einer Zulassungsbescheinigung beginnt die Frist mit dem Grenzübertritt; bei dem dort genannten internationalen Zulassungsschein mit dessen Ausstellung. Die übrigen Voraussetzungen müssen trotzdem erfüllt sein.",
        "Für bestimmte Fälle der Arbeitnehmerfreizügigkeit, Niederlassungs- oder Dienstleistungsfreiheit nach EU-Recht kann die vorübergehende Teilnahme im Einzelfall länger dauern, höchstens drei Jahre. Das ist keine automatische Verlängerung für jedes ausländische Fahrzeug. Lass den konkreten Fall prüfen, statt eine kurze Auslandsfahrt als sicheren Neustart der Frist anzusehen."
      ]
    },
    {
      "id": "nachweise",
      "title": "3. Ausländische Papiere und Kennzeichnung prüfen",
      "paragraphs": [
        "Die ausländische Zulassungsbescheinigung muss gültig sein und die nach § 46 erforderlichen Angaben enthalten. Abhängig von ihrer Ausgestaltung kann eine vorgeschriebene Übersetzung nötig sein. Die geforderten Dokumente sind mitzuführen und auf Verlangen zur Prüfung auszuhändigen.",
        "§ 47 FZV regelt die heimischen Kennzeichen und das Unterscheidungszeichen des Zulassungsstaates. Montiere nicht eigenmächtig deutsche Schilder mit einer ausländischen Kombination. Auch für vorübergehend eingesetzte ausländische Fahrzeuge verlangt § 46 Betriebs- und Verkehrssicherheit."
      ]
    },
    {
      "id": "weitere-pflichten",
      "title": "4. Versicherung und Steuer separat klären",
      "paragraphs": [
        "Lass den Versicherungsschutz für die tatsächliche Nutzung in Deutschland bestätigen. Eine ausländische Zulassungsbescheinigung allein ersetzt diese Klärung nicht. Bei einem geänderten Nutzungsort solltest du nicht auf Bedingungen vertrauen, die nur für eine kurze Reise gedacht waren.",
        "Zulassungsrecht und Kraftfahrzeugsteuer sind verschiedene Prüfungen. § 3 Nummer 13 KraftStG enthält eine Befreiung für bestimmte vorübergehend eingeführte ausländische Fahrzeuge, die unter anderem bei regelmäßigem Standort im Inland entfällt. Daneben bestehen weitere gesetzliche Fallgruppen. Kläre deinen Fall mit dem zuständigen Hauptzollamt; bei Drittlandfahrzeugen sind zusätzlich Einfuhr- und Zollfragen zu beachten."
      ]
    },
    {
      "id": "deutsche-zulassung",
      "title": "5. Den passenden deutschen Zulassungsweg vorbereiten",
      "paragraphs": [
        "Wenn eine deutsche Zulassung erforderlich ist, richtet sich der Nachweisweg unter anderem nach Herkunft, Genehmigung und bisherigen Fahrzeugpapieren. Die vorhandenen Ratgeber für EU-/EWR-Gebrauchtwagen und Drittlandimporte erklären diese unterschiedlichen Unterlagenwege.",
        "Halte Einreisedatum, geplante Nutzung, Fahrzeug-Identifizierungsnummer und vorhandene Dokumente bereit. Kläre mit der Behörde, was noch fehlt und ob das Fahrzeug bis zum Abschluss weiter benutzt werden darf. Eine Schilderbestellung oder Terminbestätigung schafft für sich genommen keine zusätzliche Fahrtberechtigung."
      ]
    },
    {
      "id": "schilder",
      "title": "6. Deutsche Schilder erst mit geklärter Kombination bestellen",
      "paragraphs": [
        "Prüfe die für den deutschen Vorgang verwendbare Kombination und das passende Format. Die bisherige ausländische Nummer ist keine automatische deutsche Wunschkennzeichenreservierung. Bei begrenztem Einbauraum muss die zulässige Ausführung vor der Bestellung feststehen.",
        "Der Shop liefert angebotene deutsche Kennzeichenschilder. Er erledigt weder die ausländische Abmeldung noch die deutsche Zulassung, Versicherung oder amtliche Abstempelung. Bestelle nur die bestätigte Kombination und plane diese weiteren Schritte getrennt."
      ],
      "items": [
        "Besuch oder regelmäßiger Standort geklärt?",
        "Frist und mögliche besondere Fallgruppe geprüft?",
        "Gültige Fahrzeugpapiere und gegebenenfalls Übersetzung vorhanden?",
        "Versicherung, Steuer und bei Bedarf Zoll abgestimmt?",
        "Deutsche Zulassung und Kombination vor dem Schilderkauf vorbereitet?"
      ]
    }
  ],
  "faq": [
    {
      "question": "Darf ich nach einem Umzug immer noch ein Jahr mit ausländischen Kennzeichen fahren?",
      "answer": "Nein. Die vorübergehende Teilnahme setzt grundsätzlich voraus, dass kein regelmäßiger Standort in Deutschland begründet wurde. Die Zeitgrenze ist keine allgemeine Schonfrist nach einem Umzug."
    },
    {
      "question": "Beginnt die Frist durch einen kurzen Grenzübertritt sicher neu?",
      "answer": "Darauf solltest du dich nicht verlassen. Eine Reise beseitigt nicht automatisch einen regelmäßigen Standort. Kläre die tatsächliche Nutzung mit der zuständigen Behörde."
    },
    {
      "question": "Muss jedes fremdsprachige Fahrzeugdokument übersetzt werden?",
      "answer": "Nicht pauschal. § 46 Absatz 5 knüpft die Übersetzung an die Sprache und die dort genannten Anforderungen an das Dokument. Prüfe die konkrete Bescheinigung."
    },
    {
      "question": "Kann ich die ausländische Nummer einfach auf ein deutsches Schild prägen lassen?",
      "answer": "Eine Prägung ersetzt keine deutsche Kennzeichenzuteilung. Bestelle erst die für den deutschen Zulassungsvorgang bestätigte Kombination."
    }
  ],
  "sources": [
    {
      "label": "FZV § 46: vorübergehende Teilnahme und Standort",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__46.html"
    },
    {
      "label": "FZV § 47: ausländische Kennzeichen und Länderzeichen",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__47.html"
    },
    {
      "label": "KraftStG § 3: Steuerbefreiungen und Grenzen",
      "href": "https://www.gesetze-im-internet.de/kraftstg/__3.html"
    },
    {
      "label": "Landratsamt Neu-Ulm: Importzulassung und regelmäßiger Standort",
      "href": "https://www.landkreis-nu.de/de/Service-Verwaltung/Unsere-Fachbereiche/Verkehr/Dienstleistungen/Dienstleistung?id=2639&item=service&view=publish"
    }
  ],
  "related": [
    "eu-import-deutsche-kennzeichen",
    "drittland-import-zulassung",
    "auto-zulassen-ohne-deutschen-wohnsitz",
    "kennzeichengroessen"
  ],
  "cta": "Die deutsche Zulassung ist vorbereitet und die Kombination bestätigt? Konfiguriere die passenden angebotenen Schilder."
},
{
  "slug": "reifen-felgen-eintragen",
  "title": "Reifen und Felgen eintragen: Von der Genehmigung zu den Fahrzeugpapieren",
  "teaser": "CoC, Teilegenehmigung und Änderungsabnahme unterscheiden. Eine andere Rad-Reifen-Kombination bedeutet nicht automatisch neue Kennzeichenschilder.",
  "category": "Zulassung vorbereiten",
  "reviewedAt": "2026-11-24",
  "intro": [
    "Du möchtest andere Felgen oder Reifen montieren. Bevor du einen Termin bei der Zulassungsstelle planst, muss die technische Zulässigkeit der konkreten Kombination geklärt sein. Ein passender Lochkreis oder ein Online-Konfigurator reicht dafür allein nicht."
  ],
  "takeaway": "Prüfe Fahrzeugzuordnung und Auflagen der Genehmigung. Technische Abnahme, Änderung der Fahrzeugpapiere und Kennzeichenprägung sind drei unterschiedliche Vorgänge.",
  "sections": [
    {
      "id": "bestand",
      "title": "1. Fahrzeugdaten und bisherige Genehmigung zusammentragen",
      "paragraphs": [
        "Lege Zulassungsbescheinigung Teil I, vorhandene CoC-Unterlagen und Nachweise früherer Umbauten bereit. Notiere die vollständigen Bezeichnungen der gewünschten Räder und Reifen. Ein Modellname ohne Variante kann für die Prüfung zu ungenau sein.",
        "TÜV SÜD erläutert, dass in Teil I häufig nur eine zulässige Reifengröße für Vorder- und Hinterachse vermerkt ist. Weitere genehmigte Kombinationen können sich aus den CoC-Unterlagen ergeben. Das Fehlen einer Größe im Fahrzeugschein allein beweist deshalb noch nicht, dass sie unzulässig ist."
      ]
    },
    {
      "id": "genehmigung",
      "title": "2. Den Verwendungsbereich und alle Auflagen lesen",
      "paragraphs": [
        "Bei Zubehörteilen prüfst du den Nachweis für genau dein Fahrzeug. Eine ABE ist kein allgemeiner Freibrief für jede Montage. Sie kann Auflagen, Einschränkungen oder eine erforderliche Abnahme enthalten. § 19 StVZO beschreibt die Bedeutung solcher Genehmigungen und Bedingungen.",
        "Vergleiche Fahrzeugtyp, Ausführung und Reifenkombination mit dem Dokument. Frage bei Abweichungen vor dem Kauf nach. Die Genehmigungsnummer auf einem Teil ersetzt nicht die Prüfung, ob der konkrete Verwendungsfall erfasst ist."
      ]
    },
    {
      "id": "kombination",
      "title": "3. Weitere Umbauten in die Prüfung einbeziehen",
      "paragraphs": [
        "Ein bereits geändertes Fahrwerk, Spurplatten oder andere Umbauten können für die Bewertung der neuen Kombination wichtig sein. Lege deshalb alle vorhandenen Nachweise vor. Zwei einzeln beworbene Teile sind nicht automatisch gemeinsam für dein Fahrzeug freigegeben.",
        "Stimme mit einer geeigneten Prüfstelle ab, ob eine Änderungsabnahme oder ein anderer Nachweis erforderlich ist. Die Ferndiagnose anhand eines Produktfotos reicht dafür nicht. Dieser Ratgeber ersetzt keine technische Freigabe des konkreten Fahrzeugs."
      ]
    },
    {
      "id": "papiere",
      "title": "4. Abnahme und Berichtigung der Papiere unterscheiden",
      "paragraphs": [
        "Nach einer erforderlichen Abnahme liest du den Nachweis vollständig. Prüfe insbesondere, ob eine unverzügliche Berichtigung der Fahrzeugpapiere vorgeschrieben ist oder welche Unterlagen bis dahin mitzuführen sind. § 15 FZV und § 19 StVZO unterscheiden entsprechende Fälle.",
        "Die Prüfstelle und die Zulassungsbehörde haben unterschiedliche Aufgaben. Eine technische Bescheinigung ist nicht automatisch eine bereits geänderte Zulassungsbescheinigung. Vereinbare den nötigen Behördentermin mit den geforderten Originalunterlagen."
      ]
    },
    {
      "id": "kennzeichen",
      "title": "5. Nur einen tatsächlichen Schilderbedarf bestellen",
      "paragraphs": [
        "Eine Änderung der Rad-Reifen-Kombination allein erfordert normalerweise keine neue Kennzeichenkombination. Behalte die Schilderfrage deshalb vom technischen Nachweis getrennt. Ein neuer Fahrzeugschein bedeutet nicht automatisch neue Bleche.",
        "Falls gleichzeitig eine Umkennzeichnung, ein Halterwechsel oder ein Ersatz beschädigter Schilder erfolgt, bestellst du für diesen gesonderten Anlass die bestätigte Ausführung. Der Shop liefert keine Abnahme, Teilegenehmigung oder amtlichen Plaketten."
      ],
      "items": [
        "Fahrzeugdaten und CoC vorhanden?",
        "Konkrete Teilezuordnung und Auflagen geprüft?",
        "Weitere Umbauten angegeben?",
        "Abnahme und Papierberichtigung abgeschlossen beziehungsweise richtig eingeplant?",
        "Schilder nur bei tatsächlichem zusätzlichem Bedarf bestellt?"
      ]
    }
  ],
  "faq": [
    {
      "question": "Muss jede andere Reifengröße eingetragen werden?",
      "answer": "Nicht automatisch. Prüfe zunächst die vorhandene Fahrzeuggenehmigung und die Nachweise für die konkrete Kombination."
    },
    {
      "question": "Ist mit einer ABE jede Montage ohne weitere Prüfung erlaubt?",
      "answer": "Nein. Verwendungsbereich und Auflagen sind entscheidend; eine Abnahme kann vorgeschrieben sein."
    },
    {
      "question": "Brauche ich wegen neuer Felgen neue Kennzeichen?",
      "answer": "Allein dadurch normalerweise nicht. Eine zusätzliche Umkennzeichnung oder beschädigte Platte ist getrennt zu behandeln."
    }
  ],
  "sources": [
    {
      "label": "StVZO § 19: Betriebserlaubnis und Änderungen",
      "href": "https://www.gesetze-im-internet.de/stvzo_2012/__19.html"
    },
    {
      "label": "FZV § 15: Mitteilungspflichten",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__15.html"
    },
    {
      "label": "TÜV SÜD: Kriterien beim Reifenkauf",
      "href": "https://www.tuvsud.com/de-de/presse-und-medien/2026/oktober/kriterien-reifenkauf"
    },
    {
      "label": "Service Berlin: technische Änderungen melden",
      "href": "https://service.berlin.de/dienstleistung/120904/"
    }
  ],
  "related": [
    "vollgutachten-21-zulassung",
    "fahrzeugschein-fahrzeugbrief-unterschied",
    "kennzeichen-beschaedigt-ersetzen"
  ],
  "cta": "Ein zusätzlicher Schilderwechsel ist tatsächlich nötig? Konfiguriere die bestätigte Kombination im passenden Format."
},
{
  "slug": "autogas-umbau-fahrzeugpapiere",
  "title": "Autogas nachgerüstet: LPG-Anlage prüfen und Fahrzeugpapiere ändern",
  "teaser": "Systemgenehmigung, Gassystemeinbauprüfung und behördliche Eintragung richtig einplanen. Der LPG-Umbau ist kein automatischer Kennzeichenwechsel.",
  "category": "Zulassung vorbereiten",
  "reviewedAt": "2026-11-24",
  "intro": [
    "Nach der Autogas-Nachrüstung ist die Werkstattarbeit nicht der einzige Schritt. Für den Betrieb und die Fahrzeugpapiere müssen die passenden technischen Nachweise vorliegen. Kläre diesen Ablauf möglichst schon vor dem Einbau."
  ],
  "takeaway": "Die Gassystemeinbauprüfung und die Meldung geänderter Fahrzeugdaten erfüllen unterschiedliche Aufgaben. Eine neue Kennzeichenplatte kann keinen dieser Nachweise ersetzen.",
  "sections": [
    {
      "id": "system",
      "title": "1. Genehmigung und Verwendungsbereich vor dem Einbau klären",
      "paragraphs": [
        "§ 41a StVZO regelt Druckgasanlagen und ihre genehmigten Ausrüstungen beziehungsweise Nachrüstsysteme. Lass dir erläutern, welche Genehmigung für das konkrete Fahrzeug und System verwendet wird. Eine allgemeine Werbeaussage zur LPG-Eignung genügt dafür nicht.",
        "Vereinbare mit der Fachwerkstatt, welche Unterlagen du nach dem Einbau erhältst und welche weiteren Prüfungen nötig sind. Bewahre die Informationen zur sicheren Verwendung und Wartung auf. Dieser Artikel betrifft den behördlichen Ablauf, keine Anleitung zum eigenen Einbau."
      ]
    },
    {
      "id": "gsp",
      "title": "2. Die vorgeschriebene Einbauprüfung durchführen lassen",
      "paragraphs": [
        "Nach § 41a Absatz 5 ist nach dem Einbau eine Gassystemeinbauprüfung nach Anlage XVII erforderlich. Sie darf nur von den dafür vorgesehenen berechtigten Personen durchgeführt werden. Eine Werkstattrechnung allein ist kein Ersatz für den erforderlichen Prüfnachweis.",
        "Die Vorschrift unterscheidet außerdem verschiedene Ausrüstungsfälle. Für Ausrüstungen nach Absatz 3 verlangt sie nach der Einbauprüfung zusätzlich eine Begutachtung nach § 21 zur Erlangung einer neuen Betriebserlaubnis. Lass die Einordnung deines Systems fachlich bestimmen, statt jede Nachrüstung pauschal gleich zu behandeln."
      ]
    },
    {
      "id": "meldung",
      "title": "3. Die Änderung der Kraftstoffart unverzüglich melden",
      "paragraphs": [
        "§ 15 Absatz 1 FZV nennt Änderungen der Kraftstoffart oder Energiequelle ausdrücklich als unverzüglich mitzuteilende Änderung. Dabei sind für diesen Fall grundsätzlich Teil I und Teil II der Zulassungsbescheinigung vorzulegen.",
        "Stimme den Dokumentenweg rechtzeitig ab, wenn Teil II bei einer finanzierenden Bank liegt. Kläre zusätzlich mit der Zulassungsstelle, welche technischen Bescheinigungen sie benötigt. Der Behördengang ergänzt die Prüfung; er ersetzt sie nicht."
      ]
    },
    {
      "id": "abgleich",
      "title": "4. Neue Angaben und weitere Folgen kontrollieren",
      "paragraphs": [
        "Prüfe nach der Bearbeitung, ob die geänderten Fahrzeugdaten mit den technischen Nachweisen übereinstimmen. Informiere deinen Versicherer über den Umbau und kläre die benötigten Angaben. Leite aus dem Einbau keine pauschale Steuer- oder Versicherungsersparnis ab.",
        "Auch Umweltplakette und mögliche Verkehrsbeschränkungen dürfen nicht anhand des Kraftstoffnamens allein beurteilt werden. Maßgeblich bleiben die tatsächlich bestätigten Fahrzeug- und Emissionsdaten. Lass Unklarheiten anhand der Unterlagen auflösen."
      ]
    },
    {
      "id": "nummer",
      "title": "5. Bestehende Kennzeichen und Prüfunterlagen auseinanderhalten",
      "paragraphs": [
        "Ein LPG-Umbau allein erfordert normalerweise keine neue Kombination. Vorhandene lesbare und passende Schilder werden nicht allein wegen geänderter Papiere unbrauchbar. Erledige deshalb keine vorschnelle Neubestellung.",
        "Wenn zusätzlich eine freiwillige Umkennzeichnung oder ein beschädigtes Schild ansteht, kläre diesen Vorgang separat. Bestellt wird die bestätigte Kombination. Der Schilderversand umfasst weder eine Gassystemprüfung noch Fahrzeugzulassung oder amtliche Plaketten."
      ],
      "items": [
        "Passendes genehmigtes System und Nachweisweg vereinbart?",
        "Gassystemeinbauprüfung dokumentiert?",
        "Gegebenenfalls zusätzliche Begutachtung geklärt?",
        "Kraftstoffänderung mit erforderlichen Papieren gemeldet?",
        "Schilderbedarf unabhängig vom Umbau geprüft?"
      ]
    }
  ],
  "faq": [
    {
      "question": "Reicht die Rechnung des Umrüsters für den Behördenvorgang?",
      "answer": "Nicht allein. Die erforderlichen technischen Prüf- und Genehmigungsnachweise müssen zum konkreten Umbau vorliegen."
    },
    {
      "question": "Kann ich die Kraftstoffänderung bis zum nächsten beliebigen Termin aufschieben?",
      "answer": "§ 15 Absatz 1 FZV verlangt für diese Änderung eine unverzügliche Mitteilung. Stimme den Vorgang rechtzeitig ab."
    },
    {
      "question": "Erhalte ich für LPG automatisch andere Kennzeichen?",
      "answer": "Nein. Der Kraftstoffwechsel allein ist keine automatische neue Kennzeichenzuteilung."
    }
  ],
  "sources": [
    {
      "label": "StVZO § 41a: Gassystemeinbauprüfung und Genehmigung",
      "href": "https://www.gesetze-im-internet.de/stvzo_2012/__41a.html"
    },
    {
      "label": "FZV § 15: Kraftstoffart und benötigte Papiere",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__15.html"
    },
    {
      "label": "Service Berlin: technische Änderungen melden",
      "href": "https://service.berlin.de/dienstleistung/120904/"
    }
  ],
  "related": [
    "vollgutachten-21-zulassung",
    "fahrzeugbrief-bank-zulassung",
    "kennzeichen-freiwillig-aendern"
  ],
  "cta": "Zusätzlich zum Umbau benötigst du neue Schilder? Bestelle erst nach Bestätigung von Kombination und Ausführung."
},
{
  "slug": "auto-nach-diebstahl-wiedergefunden",
  "title": "Gestohlenes Auto wiedergefunden: Zulassung und Kennzeichen vor der Abholung klären",
  "teaser": "Polizeiliche Freigabe, Versicherung, Fahrzeugzustand und Zulassungsstatus prüfen. Wiederfinden bedeutet nicht automatisch, sofort weiterfahren zu dürfen.",
  "category": "Zulassung vorbereiten",
  "reviewedAt": "2026-11-24",
  "intro": [
    "Die Polizei hat dein gestohlenes Auto gefunden oder du entdeckst es selbst. Vor der Rückkehr in den Straßenverkehr sind mehrere Stellen zu beteiligen. Die vorhandenen Kennzeichen beantworten weder die Freigabe noch den aktuellen Zulassungsstatus."
  ],
  "takeaway": "Stimme den Wiederfund mit der Polizei ab. Prüfe danach Berechtigung zur Übernahme, Versicherung, Zulassung und technischen Zustand. Neue Schilder sind erst nach dieser Klärung sinnvoll.",
  "sections": [
    {
      "id": "polizei",
      "title": "1. Den Wiederfund melden und die Herausgabe abstimmen",
      "paragraphs": [
        "Die Polizei Bremerhaven weist darauf hin, dass du bei eigenem Wiederfinden eines als gestohlen gemeldeten Fahrzeugs sofort die Polizei kontaktieren sollst. Fahre nicht einfach mit einem Ersatzschlüssel los. Das Fahrzeug kann noch für Ermittlungen oder Untersuchungen benötigt werden.",
        "Kläre Ansprechpartner, Vorgangsnummer, Standort und den vorgesehenen Herausgabeweg. Lass dir sagen, welche Identitäts- und Berechtigungsnachweise benötigt werden. Eine bloße Standortmitteilung ist nicht automatisch die Freigabe zur Mitnahme."
      ]
    },
    {
      "id": "berechtigung",
      "title": "2. Versicherung und Verfügungsberechtigung klären",
      "paragraphs": [
        "Informiere den Versicherer über den Wiederfund. Falls bereits eine Entschädigung erfolgt ist, müssen die daraus folgenden Rechte und die weitere Abwicklung anhand des konkreten Vertrags geklärt werden. Behaupte nicht allein aus der früheren Haltereigenschaft, dass du das Fahrzeug uneingeschränkt übernehmen darfst.",
        "Bei Leasing oder Finanzierung können weitere Vertragspartner beteiligt sein. Vereinbare, wer die Herausgabe organisiert und welche Unterlagen bereitgestellt werden. Dieser Ablauf ist von einer neuen Versicherungsbestätigung für die Zulassung zu unterscheiden."
      ]
    },
    {
      "id": "status",
      "title": "3. Tatsächlichen Zulassungsstatus feststellen",
      "paragraphs": [
        "Frage bei der Zulassungsstelle nach, ob das Auto noch zugelassen oder inzwischen außer Betrieb gesetzt ist. Eine Diebstahlsanzeige, eine Versicherungsbearbeitung und eine behördliche Außerbetriebsetzung sind nicht derselbe Vorgang.",
        "Bei bereits erfolgter Außerbetriebsetzung ist das passende Wiederzulassungsverfahren zu prüfen. Berlin nennt dafür beispielsweise Fahrzeugpapiere, Versicherungsnachweis und erforderlichen HU-Nachweis. Welche Unterlagen in deinem Sonderfall vorliegen oder ersetzt werden müssen, klärst du mit der zuständigen Stelle."
      ]
    },
    {
      "id": "zustand",
      "title": "4. Papiere, Schilder und Fahrzeugzustand kontrollieren",
      "paragraphs": [
        "Prüfe, ob Dokumente oder Kennzeichenschilder fehlen, verändert oder ausgetauscht wurden. Vergleiche die Fahrzeug-Identifizierungsnummer mit den Unterlagen. Melde Abweichungen der Polizei und der Zulassungsstelle, statt fremde oder ungeklärte Schilder einfach weiterzuverwenden.",
        "Lass mögliche Schäden und die Verkehrssicherheit fachlich beurteilen. Eine polizeiliche Herausgabe ist keine technische Untersuchung. Plane einen geeigneten Transport, wenn die Voraussetzungen für eine Fahrt nicht geklärt sind. Bei fehlenden Papieren oder Schildern gelten die jeweiligen Ersatzverfahren zusätzlich."
      ]
    },
    {
      "id": "bestellung",
      "title": "5. Bestätigte Kombination und tatsächlichen Bedarf verwenden",
      "paragraphs": [
        "Frage, welche Kombination im weiteren Verfahren verwendet werden darf. Vorhandene Bleche beweisen keine fortbestehende Zuteilung. Wenn neue Schilder nötig sind, bestellst du erst nach Bestätigung von Nummer, Format und Stückzahl.",
        "Behalte Polizeivorgang, Versicherungsunterlagen und Behördennachweise geordnet zusammen. Prüfe vor der ersten Fahrt, ob alle notwendigen Schritte abgeschlossen sind. Der Schilderkauf ersetzt weder eine Freigabe noch Versicherungsschutz, Wiederzulassung oder amtliche Plaketten."
      ],
      "items": [
        "Wiederfund gemeldet und Herausgabe abgestimmt?",
        "Berechtigung und Versicherungsabwicklung geklärt?",
        "Zulassungsstatus und gegebenenfalls Wiederzulassung geprüft?",
        "Fahrzeug, Dokumente und Schilder kontrolliert?",
        "Fahrt oder Transport erst nach Klärung organisiert?"
      ]
    }
  ],
  "faq": [
    {
      "question": "Darf ich ein selbst wiedergefundenes Auto einfach mitnehmen?",
      "answer": "Kontaktiere zuerst die Polizei und stimme die Herausgabe ab. Das Fahrzeug kann noch für Ermittlungen benötigt werden."
    },
    {
      "question": "Ist das Fahrzeug mit dem Wiederfund automatisch wieder zugelassen?",
      "answer": "Nein. Kläre den tatsächlichen Status. Eine bereits erfolgte Außerbetriebsetzung erfordert gegebenenfalls eine Wiederzulassung."
    },
    {
      "question": "Kann ich sofort die alte Nummer nachprägen lassen?",
      "answer": "Bestelle erst, wenn die Zulassungsstelle die verwendbare Kombination bestätigt hat. Fehlende oder manipulierte Schilder sind gesondert zu melden."
    }
  ],
  "sources": [
    {
      "label": "Polizei Bremerhaven: entwendetes Fahrzeug und Wiederfund",
      "href": "https://www.polizei.bremerhaven.de/faq-entwendetes-kfz.html"
    },
    {
      "label": "Polizei Berlin: umgesetzte und sichergestellte Fahrzeuge",
      "href": "https://www.berlin.de/polizei/service/auto-fahrrad-bus/auto-wiederfinden/"
    },
    {
      "label": "Service Berlin: Wiederzulassung ohne Halterwechsel",
      "href": "https://service.berlin.de/dienstleistung/120905/"
    },
    {
      "label": "FZV § 16: Wiederzulassung",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__16.html"
    }
  ],
  "related": [
    "auto-wiederzulassen-lange-standzeit",
    "fahrzeugpapiere-verloren",
    "kennzeichen-verloren-gestohlen"
  ],
  "cta": "Der weitere Zulassungsvorgang und die Kombination sind bestätigt? Konfiguriere die tatsächlich benötigten Schilder."
},
{
  "slug": "quad-zulassung-kennzeichen",
  "title": "Quad zulassen: Fahrzeugklasse und Kennzeichenschilder zuerst klären",
  "teaser": "Welche Papiere, Kennzeichen und Formate ein Quad benötigt, hängt von seiner Einstufung ab. Prüfe den konkreten Fahrzeugtyp vor dem Schilderkauf.",
  "category": "Zulassung vorbereiten",
  "reviewedAt": "2026-11-24",
  "intro": [
    "Ein Quad sieht nach Freizeitfahrzeug aus, kann in den Papieren aber unterschiedlich eingestuft sein. Deshalb ist die Produktbezeichnung im Verkaufsangebot keine zuverlässige Grundlage für die Kennzeichenbestellung. Beginne mit den Genehmigungsunterlagen."
  ],
  "takeaway": "Fahrzeugklasse und Genehmigung bestimmen das Verfahren. Ein amtlich zu kennzeichnendes Quad ist nicht allein wegen seines Lenkers ein Motorrad und benötigt nicht automatisch Motorradschilder.",
  "sections": [
    {
      "id": "klasse",
      "title": "1. Die amtliche Fahrzeugklasse feststellen",
      "paragraphs": [
        "Lies die Fahrzeugpapiere beziehungsweise die CoC- oder Genehmigungsunterlagen. Bei vorhandener Zulassungsbescheinigung ist insbesondere die Fahrzeugklasse im Feld J wichtig. Notiere außerdem, ob das Fahrzeug bereits zugelassen war und ob es technische Änderungen gibt.",
        "Ein leichtes vierrädriges Kraftfahrzeug kann einem anderen Verfahren unterliegen als ein zulassungspflichtiges schweres Quad. §§ 3 und 4 FZV unterscheiden Zulassungsfreiheit, Genehmigung und Kennzeichnung. Ein ausschließlich für das Gelände angebotenes Fahrzeug erhält durch den Kauf von Schildern keine Straßenzulassung."
      ]
    },
    {
      "id": "verfahren",
      "title": "2. Versicherungskennzeichen und amtliche Zuteilung unterscheiden",
      "paragraphs": [
        "Kläre anhand der Einstufung, ob ein Versicherungskennzeichen vorgesehen ist oder eine amtliche Kennzeichenzuteilung benötigt wird. Bestelle nicht vorsorglich ein normales Kfz-Schild, wenn die Fahrzeugklasse einen anderen Kennzeichentyp verlangt.",
        "Für den zulassungspflichtigen Fall bereitest du den passenden Antrag mit Identitäts-, Fahrzeug- und Versicherungsnachweisen vor. Bei einem Import oder fehlenden Genehmigungsunterlagen muss zunächst der Nachweisweg geklärt werden. Eine eVB ersetzt keine Betriebserlaubnis."
      ]
    },
    {
      "id": "lof",
      "title": "3. Eine LoF-Einstufung nicht als Rundum-Freigabe verstehen",
      "paragraphs": [
        "Steht eine land- oder forstwirtschaftliche Einstufung in den Unterlagen, prüfe die tatsächlich eingetragene Fahrzeugart und den vorgesehenen Einsatz. Der Begriff LoF in einer Anzeige belegt weder eine fertige Umrüstung noch einen Anspruch auf grüne Schrift.",
        "Steuerliche Voraussetzungen und Kennzeichenausführung sind gesondert zu klären. Auch die Bezeichnung als Zugmaschine erlaubt nicht automatisch jedes kleine Schildformat. Lass die konkrete Ausführung anhand der Papiere bestätigen, statt nach dem Aussehen anderer Quads zu bestellen."
      ]
    },
    {
      "id": "formate",
      "title": "4. Anzahl und Format vor der Prägung bestätigen",
      "paragraphs": [
        "§ 12 Absatz 5 FZV sieht grundsätzlich Kennzeichen vorn und hinten vor; die dort genannte Ausnahme für Krafträder ist nicht einfach auf vierrädrige Quads übertragbar. Bei einem amtlich zu kennzeichnenden Quad musst du deshalb den Bedarf an zwei Schildern berücksichtigen.",
        "Der Landkreis Schweinfurt weist in seiner Quad-Information ausdrücklich auf zwei Kennzeichen und die Abgrenzung zu Motorrad- und verkleinerten Leichtkraftradschildern hin. Nutze dies als Behördenbeispiel und stimme dein Format mit der zuständigen Stelle ab. Anlage 4 FZV regelt die unterschiedlichen Abmessungen und Verwendungsfälle."
      ]
    },
    {
      "id": "bestellung",
      "title": "5. Nur ein geeignetes angebotenes Schild auswählen",
      "paragraphs": [
        "Prüfe die Befestigungsflächen, ohne daraus allein die rechtliche Zulässigkeit eines Formats abzuleiten. Ein Standard-Schild mit 520 Millimetern Breite kommt nur infrage, wenn es für deinen Fall zulässig ist und montiert werden kann. Ein benötigtes Sonderformat ist nicht automatisch im Shop verfügbar.",
        "Die hier angebotenen Motorrad- oder Landmaschinenformate sind keine pauschale Quad-Lösung. Bestelle erst nach Bestätigung von Kombination, Stückzahl, Farbe und Format. Amtliche Plaketten und die Zulassung kommen weiterhin von der zuständigen Stelle."
      ],
      "items": [
        "Fahrzeugklasse und Genehmigung aus Originalunterlagen geprüft?",
        "Versicherungskennzeichen oder amtliche Zuteilung unterschieden?",
        "LoF- und Steuerfragen gegebenenfalls separat geklärt?",
        "Zwei Schilder und zulässiges Format bestätigt?",
        "Nur tatsächlich passendes Shop-Angebot gewählt?"
      ]
    }
  ],
  "faq": [
    {
      "question": "Kann jedes Quad mit einem Motorradkennzeichen fahren?",
      "answer": "Nein. Die äußere Ähnlichkeit entscheidet nicht über Kennzeichenart und Format. Maßgeblich sind Fahrzeugklasse, Genehmigung und die gesetzlichen Formatvorgaben."
    },
    {
      "question": "Reicht bei einem amtlich gekennzeichneten Quad ein Schild hinten?",
      "answer": "Die Ausnahme für Krafträder ist nicht pauschal auf vierrädrige Quads übertragbar. Kläre die erforderliche Kennzeichnung vorn und hinten nach § 12 FZV."
    },
    {
      "question": "Bedeutet LoF automatisch grüne Kennzeichen?",
      "answer": "Nein. Einstufung, tatsächliche Nutzung und steuerliche Voraussetzungen müssen getrennt geprüft werden. Eine Verkaufsbezeichnung genügt nicht."
    }
  ],
  "sources": [
    {
      "label": "FZV § 3: Zulassung und Ausnahmen",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__3.html"
    },
    {
      "label": "FZV § 4: Voraussetzungen zulassungsfreier Fahrzeuge",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__4.html"
    },
    {
      "label": "FZV § 12: Anbringung von Kennzeichen",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__12.html"
    },
    {
      "label": "FZV Anlage 4: Kennzeichenformate",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/anlage_4.html"
    },
    {
      "label": "Landkreis Schweinfurt: Kennzeichen für ein Quad",
      "href": "https://www.landkreis-schweinfurt.de/landratsamt/serviceleistungen-informationen/details/detail/zuteilung-von-kennzeichen-fuer-ein-quad-1464"
    }
  ],
  "related": [
    "kennzeichengroessen",
    "eu-import-deutsche-kennzeichen",
    "auto-anmelden-unterlagen"
  ],
  "cta": "Kombination, Anzahl und Format sind bestätigt? Prüfe, ob die angebotenen Schilder zu deinem Quad passen."
},
{
  "slug": "leichtkraftrad-kennzeichen-zuteilung",
  "title": "Leichtkraftrad anmelden: Warum die 125er ein amtliches Kennzeichen braucht",
  "teaser": "Zulassungsfrei bedeutet beim Leichtkraftrad nicht ohne Behörde: Genehmigung, Versicherungsnachweis und Kennzeichenzuteilung richtig vorbereiten.",
  "category": "Zulassung vorbereiten",
  "reviewedAt": "2026-11-24",
  "intro": [
    "Du möchtest eine 125er anmelden und liest, dass Leichtkrafträder zulassungsfrei sind. Trotzdem brauchst du für ein entsprechend eingestuftes Fahrzeug ein amtliches Kennzeichen. Die Begriffe beschreiben unterschiedliche rechtliche Anforderungen."
  ],
  "takeaway": "Leichtkrafträder sind nach § 3 FZV vom normalen Zulassungsverfahren ausgenommen. § 4 FZV verlangt dennoch Genehmigung und amtliche Kennzeichenzuteilung. Ein jährliches Versicherungskennzeichen ersetzt das nicht.",
  "sections": [
    {
      "id": "einstufung",
      "title": "1. Leichtkraftrad-Einstufung aus den Papieren prüfen",
      "paragraphs": [
        "Verlasse dich nicht allein auf die Verkaufsbezeichnung 125er. Prüfe die amtlichen Fahrzeug- und Genehmigungsdaten. § 2 FZV definiert die Fahrzeugarten; Hubraum allein beantwortet nicht alle Merkmale der Einstufung.",
        "Bei Umbauten oder unklaren Papieren klärst du die Genehmigung zuerst. Die Wahl eines kleineren Schildes kann eine unpassende Fahrzeugklasse nicht korrigieren. Für den bloßen Vergleich zwischen Motorrad- und Versicherungskennzeichen gibt es bereits einen eigenen Blogartikel."
      ]
    },
    {
      "id": "genehmigung",
      "title": "2. Genehmigung und Fahrzeugunterlagen bereitlegen",
      "paragraphs": [
        "§ 4 Absatz 1 FZV setzt für diese zulassungsfreien Fahrzeuge einen genehmigten Typ oder eine Fahrzeug-Einzelgenehmigung voraus. Sammle vorhandene CoC-, Betriebserlaubnis- und Fahrzeugunterlagen, statt aus einer alten Schildnummer auf eine vollständige Genehmigung zu schließen.",
        "Für die Kennzeichenzuteilung verweist § 4 Absatz 2 auf Zulassungsvorschriften, nimmt aber die Vorschriften über die Zulassungsbescheinigung Teil II aus. Ein fehlender Teil II ist bei diesem Verfahren deshalb nicht automatisch ein verlorener Fahrzeugbrief. Kläre mit der Behörde, welche vorhandenen Dokumente in deinem Fall vorzulegen sind."
      ]
    },
    {
      "id": "antrag",
      "title": "3. Halter und Versicherungsnachweis passend vorbereiten",
      "paragraphs": [
        "Bereite den Identitätsnachweis und die für das Verfahren erforderliche Versicherungsbestätigung vor. Erkläre dem Versicherer die genaue Fahrzeugklasse und den geplanten Vorgang. Eine eVB ist ein Nachweis für die Behörde, keine auf das Schild zu prägende Kombination.",
        "Bei Vertretung müssen die verlangte Vollmacht und Nachweise passen. Soll das Fahrzeug auf einen Minderjährigen geführt werden, sind die besonderen persönlichen Voraussetzungen zusätzlich zu prüfen. Der verlinkte Minderjährigenratgeber behandelt diesen Fall gesondert."
      ]
    },
    {
      "id": "format",
      "title": "4. Das zulässige Schildformat nicht aus dem Halter ableiten",
      "paragraphs": [
        "Anlage 4 FZV lässt verkleinerte zweizeilige Kennzeichen bis 255 × 130 Millimeter unter anderem für Leichtkrafträder zu. Daraus folgt nicht, dass jedes unter einer anderen Shop-Kategorie angebotene Schild dieser Größe für deine Bestellung geeignet ist. Schriftfarbe und Ausführung müssen ebenfalls passen.",
        "Prüfe daher Format und Kombination mit der Zulassungsstelle. Das aktuelle Landmaschinenangebot dieses Shops ist keine automatische Bestellung eines schwarzen Leichtkraftradkennzeichens. Auch ein vorhandener Motorradhalter bestätigt keine behördliche Formatfreigabe. Fehlt die benötigte Ausführung im Sortiment, wähle nicht ersatzweise ein unpassendes Produkt."
      ]
    },
    {
      "id": "montage",
      "title": "5. Zuteilung, Abstempelung und Montage abschließen",
      "paragraphs": [
        "Bei Krafträdern wird das Kennzeichen nach § 12 Absatz 5 hinten angebracht. Bestelle die bestätigte Kombination im passenden angebotenen Format und prüfe die Prägung nach Erhalt. Ein frisches Schild allein schließt das behördliche Verfahren noch nicht ab.",
        "Kläre die erforderliche Abstempelung und Fahrzeugunterlagen, bevor du losfährst. Montiere das Schild sicher und lesbar. Zulassungsfreiheit ist weder eine Befreiung von allen technischen Anforderungen noch eine allgemeine Erlaubnis zur Fahrt mit beliebigen oder ungestempelten Schildern."
      ],
      "items": [
        "Amtliche Fahrzeugklasse geprüft?",
        "Genehmigungsunterlagen und vorhandene Papiere zusammengestellt?",
        "Halter, Versicherung und gegebenenfalls Vertretung geklärt?",
        "Zulässiges und tatsächlich angebotenes Format bestätigt?",
        "Zuteilung, Plakette und Montage vor Nutzung abgeschlossen?"
      ]
    }
  ],
  "faq": [
    {
      "question": "Warum brauche ich trotz Zulassungsfreiheit eine Behörde?",
      "answer": "§ 4 Absatz 2 FZV verlangt für Leichtkrafträder eine amtliche Kennzeichenzuteilung. Die Ausnahme vom normalen Zulassungsverfahren beseitigt diese Pflicht nicht."
    },
    {
      "question": "Kann ich stattdessen ein jährliches Versicherungskennzeichen nehmen?",
      "answer": "Nicht für ein als Leichtkraftrad eingestuftes Fahrzeug. Maßgeblich ist die amtliche Klasse, nicht der Wunsch nach einem einfacheren Verfahren."
    },
    {
      "question": "Muss ich einen verlorenen Teil II ersetzen lassen?",
      "answer": "Nicht allein deshalb, weil kein Teil II vorhanden ist. § 4 Absatz 2 nimmt dessen Vorschriften aus. Kläre zunächst, welche Fahrzeugdokumente tatsächlich ausgestellt und erforderlich sind."
    }
  ],
  "sources": [
    {
      "label": "FZV § 2: Fahrzeugarten",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__2.html"
    },
    {
      "label": "FZV § 3: Zulassungsfreiheit",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__3.html"
    },
    {
      "label": "FZV § 4: Genehmigung und Kennzeichenzuteilung",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__4.html"
    },
    {
      "label": "FZV § 12: Anbringung",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__12.html"
    },
    {
      "label": "FZV Anlage 4: verkleinerte zweizeilige Kennzeichen",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/anlage_4.html"
    }
  ],
  "related": [
    "kennzeichengroessen",
    "fahrzeug-auf-minderjaehrige-zulassen",
    "auto-anmelden-vollmacht"
  ],
  "cta": "Die passende Ausführung ist bestätigt? Prüfe vor der Bestellung, ob dein benötigtes Schild im Sortiment angeboten wird."
},
{
  "slug": "versicherung-fehlt-stilllegung",
  "title": "Stilllegung wegen fehlender Versicherung: Nachweis und Zulassungsstatus klären",
  "teaser": "Behördenbrief, Versicherungsbestätigung und Wiederzulassung unterscheiden. Neue Schilder beheben keine fehlende Haftpflichtversicherung.",
  "category": "Zulassung vorbereiten",
  "reviewedAt": "2026-11-24",
  "intro": [
    "Die Zulassungsstelle meldet fehlenden Versicherungsschutz oder das Auto wurde bereits außer Betrieb gesetzt. Jetzt musst du zwei Fragen beantworten: Besteht tatsächlich Haftpflichtschutz und welchen Status hat das Fahrzeug bei der Behörde?"
  ],
  "takeaway": "Kläre Versicherung und behördlichen Status sofort. Eine Zahlung, neue eVB oder Schildbestellung hebt eine bereits erfolgte Außerbetriebsetzung nicht automatisch auf.",
  "sections": [
    {
      "id": "status",
      "title": "1. Den konkreten Stand des Verfahrens feststellen",
      "paragraphs": [
        "Lies das Schreiben vollständig. Notiere Aktenzeichen, Fahrzeugdaten, geforderte Handlung und genannte Frist. Unterscheide eine Aufforderung zum Nachweis von einer bereits angeordneten oder vollzogenen Außerbetriebsetzung. Eine allgemeine Internetauskunft ersetzt diesen Bescheid nicht.",
        "§ 51 Absatz 3 FZV verpflichtet den Halter bei fehlender vorgeschriebener Haftpflichtversicherung zur unverzüglichen Außerbetriebsetzung. Absatz 4 regelt das behördliche Einschreiten. Gehe deshalb nicht davon aus, dass montierte Schilder oder eine äußerlich intakte Plakette eine ungeklärte Weiterfahrt erlauben."
      ]
    },
    {
      "id": "versicherer",
      "title": "2. Tatsächlichen Schutz und mögliche Datenfehler klären",
      "paragraphs": [
        "Kontaktiere den Versicherer mit Kennzeichen, Fahrzeug-Identifizierungsnummer und Vertragsdaten. Frage konkret, ob und seit wann Haftpflichtschutz besteht. Ein Zahlungsbeleg allein beantwortet nicht sicher, ob der Vertrag aktiv ist oder der erforderliche Nachweis richtig übermittelt wurde.",
        "Prüfe auch mögliche Zuordnungsfehler, etwa ein falsches Zeichen im Kennzeichen oder abweichende Halterdaten. Bei einem Versichererwechsel sollten alter und neuer Vertrag zeitlich sauber zugeordnet sein. Lass notwendige Korrekturen über den vorgesehenen Meldeweg veranlassen."
      ]
    },
    {
      "id": "nachweis",
      "title": "3. Den Nachweis bei der Behörde zuordnen lassen",
      "paragraphs": [
        "§ 49 FZV regelt die Versicherungsbestätigung gegenüber der Zulassungsbehörde. Kläre mit Versicherer und Behörde, welcher Nachweis für deinen aktuellen Verfahrensstand benötigt wird. Eine eVB für einen anderen Vorgang ist nicht ohne Weiteres die passende Lösung.",
        "Gib das Aktenzeichen an und frage nach, ob der eingegangene Nachweis richtig zugeordnet wurde. Bewahre Bestätigungen auf. Behaupte nicht allein aus einer zugesandten Versicherungs-E-Mail, dass eine behördliche Maßnahme bereits erledigt ist."
      ]
    },
    {
      "id": "wiederzulassung",
      "title": "4. Nach einer Außerbetriebsetzung das neue Verfahren klären",
      "paragraphs": [
        "Ist das Fahrzeug bereits außer Betrieb gesetzt, prüfe die Wiederzulassung nach § 16 FZV. Dazu gehören die für deinen Fall erforderlichen Fahrzeugunterlagen und Nachweise. Zwischenzeitlich fällige Untersuchungen können ebenfalls relevant werden.",
        "Eine nachträglich bestätigte Versicherung lässt ein bereits abgemeldetes Fahrzeug nicht einfach wieder zugelassen sein. Kläre den Abschluss des Verfahrens vor der Nutzung. Organisiere erforderliche Wege so, dass keine unversicherte oder sonst unzulässige Fahrt entsteht; übernimm keine fremden Kennzeichen als Übergangslösung."
      ]
    },
    {
      "id": "schilder",
      "title": "5. Erst danach über neue Schilder entscheiden",
      "paragraphs": [
        "Prüfe, ob die bisherige Kombination erneut verwendet werden kann und ob die vorhandenen Schilder geeignet sind. Eine frühere Nummer ist nicht allein durch den Besitz der Bleche dauerhaft gesichert. Der tatsächliche Verfahrensausgang bestimmt den Bedarf.",
        "Wenn neue Schilder erforderlich sind, bestellst du nur die bestätigte Kombination im passenden Format. Die Lieferung ersetzt weder Versicherungsdeckung noch Wiederzulassung oder amtliche Plaketten. Bei einem reinen laufenden Versichererwechsel ohne diesen Problemfall hilft stattdessen der verlinkte Blogbeitrag."
      ],
      "items": [
        "Bescheid, Frist und aktueller Zulassungsstatus verstanden?",
        "Haftpflichtschutz und elektronische Meldung geprüft?",
        "Nachweis behördlich zugeordnet?",
        "Gegebenenfalls Wiederzulassung abgeschlossen?",
        "Kombination und tatsächlicher Ersatzbedarf bestätigt?"
      ]
    }
  ],
  "faq": [
    {
      "question": "Reicht es, den offenen Versicherungsbeitrag zu bezahlen?",
      "answer": "Eine Zahlung allein bestätigt weder wirksamen Schutz noch den behördlichen Status. Kläre beides mit Versicherer und Zulassungsstelle."
    },
    {
      "question": "Ist das Auto mit einer neuen eVB sofort wieder zugelassen?",
      "answer": "Nein. Bei bereits erfolgter Außerbetriebsetzung ist das passende Wiederzulassungsverfahren erforderlich."
    },
    {
      "question": "Brauche ich zwingend neue Kennzeichenschilder?",
      "answer": "Nicht in jedem Fall. Die erneute Verwendbarkeit der Kombination und der Zustand der vorhandenen Schilder müssen zuerst geklärt werden."
    }
  ],
  "sources": [
    {
      "label": "FZV § 51: fehlender Haftpflichtversicherungsschutz",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__51.html"
    },
    {
      "label": "FZV § 49: Versicherungsnachweis",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__49.html"
    },
    {
      "label": "FZV § 16: Wiederzulassung",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__16.html"
    }
  ],
  "related": [
    "auto-wiederzulassen-lange-standzeit",
    "zulassung-abgelehnt-gruende",
    "auto-anmelden-unterlagen"
  ],
  "cta": "Versicherung und Zulassungsverfahren sind geklärt und neue Schilder nötig? Bestelle die bestätigte Kombination."
},
{
  "slug": "auto-verwerten-abmelden",
  "title": "Auto verwerten und abmelden: Verwertungsnachweis und Kennzeichen ordnen",
  "teaser": "Anerkannten Verwerter wählen, Nachweis sichern und Außerbetriebsetzung klären. Die Übergabe des Autos ersetzt nicht automatisch die behördliche Abmeldung.",
  "category": "Zulassung vorbereiten",
  "reviewedAt": "2026-11-24",
  "intro": [
    "Das Fahrzeug soll endgültig verwertet werden. Jetzt geht es um mehr als die alten Kennzeichenschilder: Der Verbleib des Autos, der Verwertungsnachweis und die Meldung bei der Zulassungsstelle müssen zusammenpassen."
  ],
  "takeaway": "Lass die Verwertung durch eine anerkannte Stelle dokumentieren und kläre die Außerbetriebsetzung ausdrücklich. Für das zu verwertende Auto ist ein Schilderneukauf normalerweise nicht sinnvoll.",
  "sections": [
    {
      "id": "annahme",
      "title": "1. Eine anerkannte Annahme- oder Verwertungsstelle wählen",
      "paragraphs": [
        "Die Altfahrzeug-Verordnung regelt die Überlassung von Altfahrzeugen an anerkannte Stellen. Das Umweltbundesamt empfiehlt die fachgerechte Entsorgung über diesen Weg. Eine beliebige Abholung mit dem Versprechen, alles zu erledigen, ist kein ausreichender Nachweis.",
        "Frage vor der Übergabe, welche anerkannte Stelle die Verwertung übernimmt und wie du den Verwertungsnachweis erhältst. Halte Fahrzeug-Identifizierungsnummer, Übergabedatum und Ansprechpartner fest. Stimme auch die sichere Abholung ab, wenn das Fahrzeug nicht mehr gefahren werden darf oder kann."
      ]
    },
    {
      "id": "nachweis",
      "title": "2. Verwertungsnachweis und Fahrzeugklasse zusammen prüfen",
      "paragraphs": [
        "§ 17 FZV betrifft bei der Verwertung insbesondere Fahrzeuge der Klassen M1, N1 und L5e. Prüfe die Klasse in den Fahrzeugunterlagen. Übertrage den beschriebenen Ablauf nicht ungeprüft auf jede andere Fahrzeugart.",
        "Für die erfassten Fälle ist der Verwertungsnachweis im Zusammenhang mit der unverzüglichen Außerbetriebsetzung vorzulegen. Verlange die Dokumentation und bewahre einen geeigneten Nachweis über die Übergabe und den erledigten Vorgang auf. Ein Kaufvertrag oder eine Quittung ist nicht ohne Weiteres dasselbe wie der gesetzliche Verwertungsnachweis."
      ]
    },
    {
      "id": "abmeldung",
      "title": "3. Zuständigkeit für die Abmeldung ausdrücklich vereinbaren",
      "paragraphs": [
        "Kläre schriftlich, ob du selbst oder eine beauftragte Person die behördliche Außerbetriebsetzung erledigt. Frage nach den dafür benötigten Unterlagen, Vollmachten und Kennzeichen. Die Übergabe der Schlüssel belegt noch nicht, dass das Fahrzeug bei der Behörde abgemeldet wurde.",
        "§ 17 regelt auch die Vorlage der Zulassungsbescheinigungen Teil I und Teil II und deren Behandlung durch die Behörde. Gib Unterlagen deshalb nicht unkoordiniert an verschiedene Stellen. Lass dir den Abschluss des Vorgangs bestätigen, bevor du die Sache als erledigt ablegst."
      ]
    },
    {
      "id": "bereits-abgemeldet",
      "title": "4. Bereits abgemeldete Fahrzeuge nicht übersehen",
      "paragraphs": [
        "Ein Auto kann schon länger außer Betrieb sein und erst später verwertet werden. § 17 enthält auch für bereits außer Betrieb gesetzte Fahrzeuge eine Nachweispflicht, wenn die Verwertung innerhalb von sieben Jahren erfolgt und das Fahrzeug zuvor nicht im Ausland wieder zugelassen wurde.",
        "Das ist ein eigener Prüfschritt und kein Anlass, das Auto für die Verwertung erneut anzumelden. Bei unklarer Stilllegungsdauer oder fehlenden Papieren frage nach dem richtigen Nachweisverfahren. Leite aus der genannten Frist keine pauschale Entsorgungsfreiheit für ältere Fahrzeuge ab."
      ]
    },
    {
      "id": "nummer",
      "title": "5. Eine gewünschte Nummer für das Folgeauto separat klären",
      "paragraphs": [
        "Möchtest du die bisherige Kombination an einem anderen Auto nutzen, frage vorab nach Reservierung und möglicher Übernahme. Eine Reservierung für die Wiederzulassung desselben Fahrzeugs ist nicht automatisch eine gesicherte Zuteilung für ein Folgefahrzeug.",
        "Neue Schilder bestellst du erst für den bestätigten nächsten Vorgang. Was nach Entstempelung mit einzelnen alten Platten geschehen kann, behandelt der bestehende Blog zur Kennzeichenentsorgung. Fahrzeugverwertung und Blechentsorgung bleiben unterschiedliche Aufgaben."
      ],
      "items": [
        "Anerkannte Stelle und Übergabeweg geprüft?",
        "Verwertungsnachweis mit richtigen Fahrzeugdaten erhalten?",
        "Abmeldung und Dokumentenweg klar vereinbart?",
        "Behördlichen Abschluss bestätigt bekommen?",
        "Eventuelle Nummernübernahme für das Folgeauto separat geklärt?"
      ]
    }
  ],
  "faq": [
    {
      "question": "Ist das Auto mit Übergabe an den Verwerter automatisch abgemeldet?",
      "answer": "Das solltest du nicht voraussetzen. Vereinbare, wer die Außerbetriebsetzung erledigt, und sichere die Bestätigung des behördlichen Abschlusses."
    },
    {
      "question": "Brauche ich auch bei einem schon abgemeldeten Auto einen Nachweis?",
      "answer": "§ 17 FZV regelt die Nachweispflicht auch bei bereits außer Betrieb gesetzten Fahrzeugen innerhalb der dort genannten Sieben-Jahres-Frist. Kläre den konkreten Fall."
    },
    {
      "question": "Soll ich vor der Verwertung neue Kennzeichen kaufen?",
      "answer": "Für das zu verwertende Fahrzeug ist das normalerweise nicht sinnvoll. Ein Bedarf kann erst für ein anderes, behördlich bestätigtes Zulassungsvorhaben entstehen."
    }
  ],
  "sources": [
    {
      "label": "FZV § 17: Außerbetriebsetzung zur Verwertung",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__17.html"
    },
    {
      "label": "Altfahrzeug-Verordnung § 4: Überlassung und Nachweise",
      "href": "https://www.gesetze-im-internet.de/altfahrzeugv/__4.html"
    },
    {
      "label": "Umweltbundesamt: Altauto fachgerecht entsorgen",
      "href": "https://www.umweltbundesamt.de/umwelttipps-fuer-den-alltag/altauto-fachgerecht-entsorgen"
    },
    {
      "label": "FZV § 16: Außerbetriebsetzung und Reservierung",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__16.html"
    }
  ],
  "related": [
    "kennzeichen-fahrzeugwechsel-uebernehmen",
    "auto-anmelden-vollmacht",
    "auto-wiederzulassen-lange-standzeit"
  ],
  "cta": "Ein Folgefahrzeug erhält eine bestätigte Kombination? Konfiguriere dafür die tatsächlich benötigten Schilder."
},
{
  "slug": "auto-wiederzulassen-lange-standzeit",
  "title": "Auto nach langer Standzeit wieder zulassen: Papiere, HU und Kennzeichen",
  "teaser": "Ein stillgelegtes Fahrzeug reaktivieren: Welche Nachweise wichtig sind und warum mehr als sieben Jahre nicht automatisch ein Vollgutachten bedeuten.",
  "category": "Zulassung vorbereiten",
  "reviewedAt": "2026-11-24",
  "intro": [
    "Das Auto stand mehrere Jahre in der Garage und soll wieder fahren. Beginne mit den Fahrzeugpapieren und dem technischen Zustand. Alte Schilder allein belegen weder eine aktuelle Zuteilung noch die Voraussetzungen für die Wiederzulassung."
  ],
  "takeaway": "Bei der Wiederzulassung müssen Genehmigungsnachweis, Fahrzeugdaten und erforderliche Untersuchungen geklärt sein. Ein Vollgutachten ist nicht allein wegen einer langen Standzeit automatisch vorgeschrieben.",
  "sections": [
    {
      "id": "bestand",
      "title": "1. Vorhandene Unterlagen und Fahrzeugzustand erfassen",
      "paragraphs": [
        "Suche Teil I und Teil II der Zulassungsbescheinigung sowie vorhandene Genehmigungs- und Prüfunterlagen zusammen. Notiere, wann das Fahrzeug außer Betrieb gesetzt wurde und ob seitdem technische Änderungen erfolgt sind.",
        "Prüfe mit einer geeigneten Werkstatt, welche Arbeiten vor der Wiederinbetriebnahme erforderlich sind. Eine alte gültig wirkende Plakette ersetzt keine Zustandsprüfung. Plane den Transport zur Werkstatt oder Prüfstelle so, dass du keine ungeklärte Fahrt mit einem abgemeldeten Fahrzeug beginnst."
      ]
    },
    {
      "id": "hu",
      "title": "2. Zwischenzeitlich fällige Untersuchung nachholen",
      "paragraphs": [
        "Nach § 16 Absatz 2 FZV ist vor der Wiederzulassung eine HU erforderlich, wenn zwischenzeitlich nach den maßgeblichen Fristen eine Untersuchung hätte stattfinden müssen. Entsprechendes gilt gegebenenfalls für eine Sicherheitsprüfung.",
        "Kläre daher die tatsächliche Fälligkeit statt nur das Jahr der Abmeldung zu betrachten. Wenn lediglich der Bericht fehlt, ist zunächst der Nachweisweg zu prüfen. Der vorhandene Ratgeber zur fehlenden HU und der Blog zur Zweitschrift behandeln diese unterschiedlichen Fälle."
      ]
    },
    {
      "id": "daten",
      "title": "3. Lange Stilllegung und Vollgutachten nicht gleichsetzen",
      "paragraphs": [
        "§ 16 Absatz 2 nennt eine bestimmte Kombination von Voraussetzungen für die Anwendung des § 21 StVZO: Die Fahrzeug- und Halterdaten sind bereits im Zentralen Fahrzeugregister gelöscht und der Genehmigungsnachweis des unveränderten Fahrzeugs kann nicht anderweitig erbracht werden.",
        "Daraus folgt kein pauschales Vollgutachten nach jeder mehrjährigen Standzeit. Lege die vorhandenen Originalunterlagen vor und lasse den benötigten Nachweis feststellen. Bei Umbauten kann unabhängig von der Standzeit eine technische Begutachtung erforderlich sein."
      ]
    },
    {
      "id": "verfahren",
      "title": "4. Antrag und möglichen Online-Weg vorbereiten",
      "paragraphs": [
        "§ 16 verlangt grundsätzlich Teil I und Teil II. Bei Wiederzulassung auf denselben Halter unter Beibehaltung des bisherigen Kennzeichens ist Teil II nach der dortigen Ausnahme nicht erforderlich. Kläre zusätzlich Versicherungsnachweis und weitere Antragsunterlagen.",
        "Für die internetbasierte Wiederzulassung setzt § 29 Absatz 2 FZV voraus, dass das Fahrzeug nicht länger als sieben Jahre außer Betrieb war. Diese Online-Grenze ist von der Frage nach einem Vollgutachten zu unterscheiden. Auch innerhalb der Frist müssen die übrigen Voraussetzungen des Portals erfüllt sein."
      ]
    },
    {
      "id": "schilder",
      "title": "5. Kombination und tatsächlichen Ersatzbedarf prüfen",
      "paragraphs": [
        "Prüfe mit der Behörde, ob die bisherige Kombination erneut zugeteilt werden kann oder eine neue nötig ist. Vorhandene Schilder im Regal sichern die Nummer nicht dauerhaft. Eine Reservierung bei Abmeldung nach § 16 Absatz 1 ist zeitlich begrenzt.",
        "Erst nach Bestätigung wählst du passende Schilder oder verwendest geeignete vorhandene Platten im vorgesehenen Verfahren weiter. Die Prägung ersetzt keine Wiederzulassung und keine amtlichen Plaketten. Eine Fahrt mit ungestempelten Schildern setzt die gesonderten Bedingungen des § 12 Absatz 4 voraus."
      ],
      "items": [
        "Stilllegungsdatum und vollständige Unterlagen erfasst?",
        "Technischer Zustand und HU geklärt?",
        "Genehmigungsnachweis beziehungsweise Begutachtung abgestimmt?",
        "Zuteilung und Schildzustand vor Bestellung geprüft?"
      ]
    }
  ],
  "faq": [
    {
      "question": "Brauche ich nach sieben Jahren immer ein Vollgutachten?",
      "answer": "Nein. § 16 Absatz 2 knüpft dies an weitere Voraussetzungen, insbesondere gelöschte Registerdaten und einen nicht anderweitig erbringbaren Genehmigungsnachweis."
    },
    {
      "question": "Kann ich nach mehr als sieben Jahren online wiederzulassen?",
      "answer": "§ 29 Absatz 2 lässt die internetbasierte Wiederzulassung nur zu, wenn die Außerbetriebsetzung nicht länger als sieben Jahre zurückliegt. Kläre andernfalls den behördlichen Weg."
    },
    {
      "question": "Reichen meine alten Schilder aus?",
      "answer": "Nicht allein. Die Kombination muss erneut verwendbar sein und die Schilder müssen zum bestätigten Vorgang passen."
    }
  ],
  "sources": [
    {
      "label": "FZV § 16: Wiederzulassung und Nachweise",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__16.html"
    },
    {
      "label": "FZV § 29: internetbasierte Wiederzulassung",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__29.html"
    },
    {
      "label": "FZV § 12 Absatz 4: Zulassungsfahrten",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__12.html"
    }
  ],
  "related": [
    "vollgutachten-21-zulassung",
    "auto-ohne-tuev-anmelden",
    "auto-online-zulassen-kennzeichen",
    "versicherung-fehlt-stilllegung",
    "auto-verwerten-abmelden",
    "auto-nach-diebstahl-wiedergefunden"
  ],
  "cta": "Kombination und Ausführung sind bestätigt? Bestelle nur die Schilder, die für die Wiederzulassung tatsächlich benötigt werden."
},
{
  "slug": "auto-zulassen-schwerbehinderung",
  "title": "Auto bei Schwerbehinderung zulassen: Antrag, Steuer und Kennzeichen trennen",
  "teaser": "Halterangaben, Steuervergünstigung und Schilderfarbe richtig vorbereiten: Nicht jeder Schwerbehindertenausweis begründet dieselben Ansprüche.",
  "category": "Zulassung vorbereiten",
  "reviewedAt": "2026-11-24",
  "intro": [
    "Ein Fahrzeug soll auf eine schwerbehinderte Person zugelassen werden. Kläre den Zulassungsantrag und eine mögliche Steuervergünstigung als getrennte Schritte. Eine Bestellung grüner Kennzeichenschilder ist dafür nicht der richtige Ausgangspunkt."
  ],
  "takeaway": "Die Steuervergünstigung nach § 3a KraftStG hängt von den Voraussetzungen des Einzelfalls ab und muss beantragt werden. Fahrzeuge dieser Personengruppe sind nach § 10 FZV ausdrücklich von der grünen Kennzeichnung ausgenommen.",
  "sections": [
    {
      "id": "halter",
      "title": "1. Die vorgesehenen Halterdaten klären",
      "paragraphs": [
        "§ 3a KraftStG setzt für die dort geregelten Vergünstigungen voraus, dass das Fahrzeug auf die begünstigte Person zugelassen ist. Eine Zulassung auf Angehörige erfüllt diese Voraussetzung nicht allein deshalb, weil sie die Person regelmäßig fahren.",
        "Bereite den normalen Zulassungsvorgang mit den korrekten Identitäts- und Fahrzeugunterlagen vor. Erfolgt der Antrag durch eine andere Person, kläre deren Vollmacht. Bei Minderjährigen sind zusätzlich die besonderen Zulassungsvoraussetzungen und Vertretungsnachweise zu beachten."
      ]
    },
    {
      "id": "merkmale",
      "title": "2. Befreiung und Ermäßigung unterscheiden",
      "paragraphs": [
        "§ 3a Absatz 1 nennt für die Steuerbefreiung die Merkzeichen H, Bl oder aG. Für die Ermäßigung um 50 Prozent gelten andere Voraussetzungen nach Absatz 2. Die Zollverwaltung erläutert hierfür unter anderem G oder Gl sowie die Abgrenzung zur unentgeltlichen Beförderung im öffentlichen Personenverkehr.",
        "Der Grad der Behinderung allein sagt deshalb noch nicht, welche Vergünstigung zusteht. Prüfe Ausweis, Merkzeichen und gegebenenfalls Beiblatt. Die Steuerermäßigung nach Absatz 2 wird nicht gleichzeitig mit der dort genannten unentgeltlichen Beförderung gewährt. Lass die konkrete Zuordnung vom zuständigen Hauptzollamt klären."
      ]
    },
    {
      "id": "antrag",
      "title": "3. Den Steuerantrag gesondert stellen",
      "paragraphs": [
        "Die Vergünstigung steht nach § 3a Absatz 3 nur für ein Fahrzeug und auf Antrag zu. Das Zoll-Portal beschreibt den digitalen Antragsweg und die verlangten Nachweise. Eine Zulassung oder Schilderrechnung stellt diesen Antrag nicht automatisch für dich.",
        "Stimme den Antrag auf die tatsächliche Fahrzeugzulassung ab und halte den Schwerbehindertenausweis bereit. Bei einer Ermäßigung kann das Beiblatt wichtig sein. Beachte die aktuelle Anleitung des Zolls und prüfe, welche Unterlagen bei der Zulassung zusätzlich verlangt werden."
      ]
    },
    {
      "id": "nutzung",
      "title": "4. Die Nutzungsvorgaben im Alltag beachten",
      "paragraphs": [
        "§ 3a Absatz 3 begrenzt die begünstigte Nutzung. Genannt sind unter anderem Güterbeförderung mit Ausnahme von Handgepäck, entgeltliche Personenbeförderung mit der gesetzlichen Ausnahme sowie Fahrten anderer Personen ohne Zusammenhang mit Fortbewegung oder Haushaltsführung der begünstigten Person.",
        "Das Fahrzeug wird damit nicht pauschal zum steuerbegünstigten Zweitwagen für beliebige Familienfahrten. Kläre einen geplanten Einsatz, der von den Voraussetzungen abweicht, vorab mit dem Hauptzollamt. Parkberechtigungen und andere Nachteilsausgleiche sind wiederum eigene Verfahren."
      ]
    },
    {
      "id": "schilder",
      "title": "5. Keine grünen Schilder wegen Schwerbehinderung bestellen",
      "paragraphs": [
        "§ 10 Absatz 2 Nummer 5 FZV nimmt Fahrzeuge von schwerbehinderten Personen im Sinne des § 3a Absatz 1 und 2 ausdrücklich von der grünen Kennzeichnung aus. Die Steuervergünstigung wird deshalb nicht durch grüne Schrift sichtbar gemacht.",
        "Bestelle die von der Zulassungsstelle bestätigte Kombination und Ausführung. Eine Sonderkennzeichnung oder amtliche Plakette entsteht nicht durch einen frei gewählten Aufdruck. Die Schilderlieferung enthält weder einen Steuerbescheid noch eine Parkberechtigung."
      ],
      "items": [
        "Zulassung auf die richtige Person vorbereitet?",
        "Merkzeichen und Art der Vergünstigung geprüft?",
        "Antrag und Nachweise beim Zoll abgestimmt?",
        "Nutzungsvorgaben und bestätigte Schildausführung beachtet?"
      ]
    }
  ],
  "faq": [
    {
      "question": "Bekomme ich wegen Schwerbehinderung ein grünes Kennzeichen?",
      "answer": "Nicht aufgrund der Vergünstigung nach § 3a Absatz 1 oder 2 KraftStG. Diese Fahrzeuge sind nach § 10 FZV von grünen Kennzeichen ausgenommen."
    },
    {
      "question": "Reicht ein bestimmter Grad der Behinderung allein?",
      "answer": "Nein. Die gesetzlichen Voraussetzungen, insbesondere die passenden Nachweise und Merkzeichen, sind entscheidend."
    },
    {
      "question": "Ist die Steuervergünstigung automatisch eine Parkerlaubnis?",
      "answer": "Nein. Steuerliche Behandlung, Fahrzeugzulassung und besondere Parkberechtigungen sind getrennt zu prüfen."
    }
  ],
  "sources": [
    {
      "label": "KraftStG § 3a: Voraussetzungen und Nutzung",
      "href": "https://www.gesetze-im-internet.de/kraftstg/__3a.html"
    },
    {
      "label": "FZV § 10 Absatz 2: Ausnahme von grünen Kennzeichen",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__10.html"
    },
    {
      "label": "Zoll-Portal: Steuervergünstigung beantragen",
      "href": "https://www.help.zoll-portal.de/DE/Hilfe/Dienstleistungen/kraftfahrzeugsteuer/Kraftfahrzeugsteuer/Steuerverguenstigungen/steuerverguenstigung-beantragen/steuerverguenstigung-beantragen-node.html"
    }
  ],
  "related": [
    "fahrzeug-auf-minderjaehrige-zulassen",
    "auto-anmelden-vollmacht",
    "sepa-mandat-kfz-steuer"
  ],
  "cta": "Die Zulassung ist vorbereitet und die Kombination bestätigt? Prüfe die passende Schildausführung im Konfigurator."
},
{
  "slug": "taxi-zulassung-vorbereiten",
  "title": "Taxi zulassen: Fahrzeug, Genehmigung und Kennzeichen vorbereiten",
  "teaser": "Ein Fahrzeug im Taxibetrieb einsetzen: Genehmigungsunterlagen, Verwendungsanzeige, Versicherung und Untersuchungen vor dem Start abstimmen.",
  "category": "Zulassung vorbereiten",
  "reviewedAt": "2026-11-24",
  "intro": [
    "Ein neues Auto soll in deinen Taxibetrieb aufgenommen werden. Die Zulassung auf den Unternehmensnamen ist dafür nur ein Teil des Ablaufs. Personenbeförderungsrechtliche Genehmigung, Fahrzeugverwendung und technische Nachweise müssen zusammenpassen."
  ],
  "takeaway": "Kläre den Fahrzeugeinsatz zuerst mit Genehmigungs- und Zulassungsbehörde. Die Verwendung zur Personenbeförderung ist gesondert anzuzeigen. Ein Taxi-Kennzeichenschild allein berechtigt nicht zur gewerblichen Beförderung.",
  "sections": [
    {
      "id": "genehmigung",
      "title": "1. Genehmigung und Fahrzeugzulassung auseinanderhalten",
      "paragraphs": [
        "Die Berechtigung zum Taxiverkehr entsteht nicht durch einen gewöhnlichen Kfz-Zulassungsantrag. Frage die zuständige Genehmigungsbehörde, welche Unterlagen für den Einsatz des konkreten Fahrzeugs in deinem Betrieb vorliegen müssen. Das gilt auch bei einem Fahrzeugwechsel.",
        "Berlin nennt für den dortigen Zulassungsvorgang beispielsweise einen Genehmigungsnachweis und Gewerbeunterlagen. Das ist ein örtliches Beispiel, keine Zusage für die Erteilung einer neuen Konzession. Prüfe die aktuellen Bedingungen an deinem Betriebssitz, bevor du Fahrzeugübergabe und Einsatztermin festlegst."
      ]
    },
    {
      "id": "verwendung",
      "title": "2. Die tatsächliche Verwendung anzeigen",
      "paragraphs": [
        "§ 15 Absatz 3 FZV verlangt bei den dort erfassten Personenbeförderungen die Anzeige vor Beginn und nach Ende der Verwendung sowie die Vorlage von Teil I zur Eintragung. Die Nutzung muss deshalb auch bei einem bereits zugelassenen Pkw korrekt behandelt werden.",
        "Verwechsle diesen Einsatz nicht mit der gewerblichen Vermietung ohne Fahrer. Für Selbstfahrervermietfahrzeuge gibt es eigene Regeln und einen gesonderten Ratgeber. Beschreibe der Behörde konkret, wie das Fahrzeug eingesetzt wird, statt lediglich Mietwagen oder Firmenwagen zu sagen."
      ]
    },
    {
      "id": "versicherung",
      "title": "3. Versicherung und Unternehmensunterlagen abstimmen",
      "paragraphs": [
        "Der Versicherungsnachweis muss zur vorgesehenen Verwendung passen. Die Berliner Unterlagenliste verlangt ausdrücklich eine für Taxi beziehungsweise die betreffende Beförderungsart ausgestellte eVB. Kläre dies mit deinem Versicherer vor dem Antrag.",
        "Prüfe außerdem die korrekten Unternehmensdaten und die Vertretungsberechtigung. Beauftragt ein Mitarbeiter den Vorgang, muss die erforderliche Vollmacht passen. Bei finanzierten Fahrzeugen kann der Dokumentenweg für Teil II zusätzlich abzustimmen sein."
      ]
    },
    {
      "id": "untersuchung",
      "title": "4. HU und BOKraft-Nachweise rechtzeitig planen",
      "paragraphs": [
        "Anlage VIII Nummer 2.1.2.2 StVZO sieht für die dort genannten Pkw zur Personenbeförderung einen HU-Abstand von zwölf Monaten vor. Die normale Drei-Jahres-Frist eines neuen privaten Pkw lässt sich deshalb nicht einfach auf das Taxi übertragen.",
        "§ 42 BOKraft verlangt grundsätzlich vor der ersten Inbetriebnahme in einem Unternehmen eine außerordentliche Hauptuntersuchung. Die Vorschrift regelt für fabrikneue Fahrzeuge eine mögliche Beschränkung ihres Umfangs. Stimme die nötigen Prüfungen und die Vorlage des Berichts mit Prüfstelle und Genehmigungsbehörde ab; eine vorhandene normale HU beantwortet nicht automatisch alle Anforderungen."
      ]
    },
    {
      "id": "kennzeichen",
      "title": "5. Kombination, Schilder und Einsatzfreigabe abgleichen",
      "paragraphs": [
        "Prüfe, ob die bestehende Kombination weitergeführt werden kann oder eine neue Zuteilung erforderlich ist. Eine Verwendungseintragung allein bedeutet nicht in jedem Fall einen Schilderneukauf. Bei einem neu aufgenommenen Fahrzeug ist die behördliche Bestätigung maßgeblich.",
        "Für die Prägung wählst du die passende angebotene Ausführung und bestätigte Kombination. Der Shop liefert keine Konzession, technische Abnahme oder amtlichen Plaketten. Plane den tatsächlichen Einsatz erst, wenn die erforderlichen betrieblichen und behördlichen Schritte abgeschlossen sind."
      ],
      "items": [
        "Genehmigungsstatus und konkretes Fahrzeug abgestimmt?",
        "Verwendung korrekt angezeigt?",
        "eVB und Vertretungsunterlagen passend?",
        "HU-/BOKraft-Nachweise und Schilderbedarf geklärt?"
      ]
    }
  ],
  "faq": [
    {
      "question": "Reicht die Zulassung auf meine Firma für den Taxibetrieb?",
      "answer": "Nein. Genehmigung, Verwendungseintragung, Versicherung und erforderliche technische Nachweise sind zusätzlich zu klären."
    },
    {
      "question": "Gilt für ein neues Taxi automatisch drei Jahre bis zur ersten HU?",
      "answer": "Die allgemeine Frist für neue private Pkw ist nicht übertragbar. Prüfe die besonderen Untersuchungsregeln für Personenbeförderung und BOKraft."
    },
    {
      "question": "Kann ich ein spezielles Taxi-Kennzeichen als Genehmigung kaufen?",
      "answer": "Nein. Eine Schildprägung ersetzt keine Berechtigung zum Taxiverkehr. Bestellt wird die behördlich bestätigte Kombination."
    }
  ],
  "sources": [
    {
      "label": "FZV § 15 Absatz 3: Anzeige der Personenbeförderung",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__15.html"
    },
    {
      "label": "StVZO Anlage VIII: HU-Fristen",
      "href": "https://www.gesetze-im-internet.de/stvzo_2012/anlage_viii.html"
    },
    {
      "label": "BOKraft § 42: außerordentliche Hauptuntersuchung",
      "href": "https://www.gesetze-im-internet.de/bokraft_1975/__42.html"
    },
    {
      "label": "Berlin: Zulassung von Fahrzeugen zur Personenbeförderung",
      "href": "https://service.berlin.de/dienstleistung/326033/"
    }
  ],
  "related": [
    "auto-auf-firma-zulassen",
    "neuwagen-erstzulassung",
    "selbstfahrervermietfahrzeug-zulassen"
  ],
  "cta": "Neue Schilder werden tatsächlich benötigt? Konfiguriere die bestätigte Kombination für das Fahrzeug."
},
{
  "slug": "landwirtschaftlicher-anhaenger-folgekennzeichen",
  "title": "Landwirtschaftlicher Anhänger bis 25 km/h: Wann passt ein Folgekennzeichen?",
  "teaser": "Die Zulassungsfreiheit hängt von Betrieb, Zweck, Zugfahrzeug und Geschwindigkeit ab. So prüfst du die Voraussetzungen vor der Schilderbestellung.",
  "category": "Zulassung vorbereiten",
  "reviewedAt": "2026-11-24",
  "intro": [
    "Ein alter Anhänger trägt ein 25-km/h-Schild und soll hinter dem Traktor fahren. Die Zahl allein macht ihn nicht zulassungsfrei. Entscheidend ist, ob alle Voraussetzungen der land- oder forstwirtschaftlichen Ausnahme erfüllt sind."
  ],
  "takeaway": "§ 3 FZV beschreibt eine zweckgebundene Ausnahme. Bei einem darunter fallenden Anhänger verlangt § 12 Absatz 9 hinten ein Kennzeichen, das der Halter des Zugfahrzeugs für eines seiner Zugfahrzeuge verwenden darf. Eine Abstempelung ist dafür nicht erforderlich.",
  "sections": [
    {
      "id": "ausnahme",
      "title": "1. Alle Voraussetzungen gemeinsam prüfen",
      "paragraphs": [
        "§ 3 Absatz 3 Satz 1 Nummer 2 Buchstabe a betrifft Anhänger in land- oder forstwirtschaftlichen Betrieben. Sie müssen ausschließlich für land- oder forstwirtschaftliche Zwecke verwendet und mit höchstens 25 km/h hinter Zugmaschinen oder selbstfahrenden Arbeitsmaschinen mitgeführt werden.",
        "Zusätzlich ist die vorgeschriebene Kennzeichnung für höchstens 25 km/h erforderlich. Ein entsprechender Aufkleber ersetzt jedoch weder den passenden Betrieb noch den Verwendungszweck. Eine private Möbelbeförderung fällt nicht allein deshalb darunter, weil ein Traktor zieht."
      ]
    },
    {
      "id": "genehmigung",
      "title": "2. Zulassungsfrei heißt nicht ohne Fahrzeugnachweis",
      "paragraphs": [
        "§ 4 Absatz 1 FZV verlangt auch für diese zulassungsfreien Anhänger einen genehmigten Typ oder eine Fahrzeug-Einzelgenehmigung. Prüfe daher die vorhandenen Fahrzeugunterlagen. Ein lange benutzter Anhänger ohne nachvollziehbare Dokumente ist nicht automatisch ausreichend nachgewiesen.",
        "Wenn keine Zulassungsbescheinigung Teil I ausgestellt wurde, regelt § 4 Absatz 5 die mitzuführenden Genehmigungsnachweise. Frage bei fehlenden Unterlagen nach dem richtigen Ersatz- oder Prüfverfahren. Ein neues Folgekennzeichen kann fehlende Fahrzeugpapiere nicht ersetzen."
      ]
    },
    {
      "id": "nummer",
      "title": "3. Die richtige Kombination für das Folgeschild wählen",
      "paragraphs": [
        "§ 12 Absatz 9 verlangt an der Rückseite eine Kombination, die der Halter des Zugfahrzeugs für eines seiner Zugfahrzeuge verwenden darf. Die Vorschrift verlangt damit nicht pauschal die Nummer genau des gerade vorgespannten Traktors. Maßgeblich bleibt aber die gesetzlich bestimmte Halter- und Zugfahrzeugzuordnung.",
        "Verwende keine beliebige alte Nummer aus dem Betrieb oder ein Schild von einer fremden Person, ohne diese Voraussetzung zu prüfen. Für dieses Kennzeichen ist keine Abstempelung erforderlich. Das unterscheidet es von einem eigenen amtlich zugeteilten Anhängerkennzeichen."
      ]
    },
    {
      "id": "wechsel",
      "title": "4. Andere Einsätze gesondert bewerten",
      "paragraphs": [
        "Soll der Anhänger schneller fahren, hinter einem anderen Fahrzeugtyp eingesetzt oder für andere Zwecke genutzt werden, ist die Ausnahme neu zu prüfen. Ein vorhandenes Folgeschild erlaubt nicht automatisch die geänderte Nutzung.",
        "Kläre dann Zulassung, technische Anforderungen, Versicherung und steuerliche Behandlung mit den zuständigen Stellen. Die Schriftfarbe allein entscheidet nicht über Zulassungsfreiheit. Der bestehende Ratgeber zu grünen und schwarzen Anhängerkennzeichen erläutert diese eigene Frage."
      ]
    },
    {
      "id": "bestellung",
      "title": "5. Schriftfarbe und Format vor dem Kauf bestätigen",
      "paragraphs": [
        "Lass die Kombination und die passende Ausführung anhand des konkreten Falls bestätigen. Prüfe Befestigungsfläche und zulässiges Format. Das Folgeschild muss ordentlich angebracht und lesbar sein; ein handgeschriebener Zettel ist keine geeignete Schilderbestellung.",
        "Im aktuellen Shop sind grüne Landmaschinenformate 240 × 130 und 255 × 130 Millimeter angeboten. Ein grünes 520-mm-Schild steht hier nicht zur Auswahl. Bestelle nur, wenn ein angebotenes Format tatsächlich zu deinem Anhänger passt. Die Lieferung umfasst keine Fahrzeug-Einzelgenehmigung oder technische Freigabe."
      ],
      "items": [
        "Land-/forstwirtschaftlicher Betrieb und ausschließlicher Zweck gegeben?",
        "Zugfahrzeug, Höchstgeschwindigkeit und Kennzeichnung passend?",
        "Genehmigungsunterlagen vorhanden?",
        "Kombination, Farbe und geeignetes angebotenes Format bestätigt?"
      ]
    }
  ],
  "faq": [
    {
      "question": "Macht ein 25-km/h-Schild jeden Anhänger zulassungsfrei?",
      "answer": "Nein. Die Ausnahme setzt zusätzlich den passenden Betrieb, den ausschließlichen Zweck und die vorgesehenen Zugfahrzeuge voraus."
    },
    {
      "question": "Muss das Folgeschild genau die Nummer des vorgespannten Traktors tragen?",
      "answer": "§ 12 Absatz 9 erlaubt ein Kennzeichen, das der Halter des Zugfahrzeugs für eines seiner Zugfahrzeuge verwenden darf. Prüfe diese Zuordnung im konkreten Fall."
    },
    {
      "question": "Braucht dieses Folgeschild einen Zulassungsstempel?",
      "answer": "Für den beschriebenen Fall ist nach § 12 Absatz 9 keine Abstempelung erforderlich. Das ersetzt nicht die übrigen Voraussetzungen des Anhängerbetriebs."
    }
  ],
  "sources": [
    {
      "label": "FZV § 3 Absatz 3: Ausnahme für landwirtschaftliche Anhänger",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__3.html"
    },
    {
      "label": "FZV § 4: Genehmigung und mitzuführende Nachweise",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__4.html"
    },
    {
      "label": "FZV § 12 Absatz 9: Kennzeichnung bestimmter Anhänger",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__12.html"
    }
  ],
  "related": [
    "anhaenger-gruenes-schwarzes-kennzeichen",
    "kennzeichengroessen",
    "auto-anmelden-unterlagen"
  ],
  "cta": "Alle Voraussetzungen und das Format sind geklärt? Prüfe die angebotenen Landmaschinen-Schilder für deine bestätigte Kombination."
},
{
  "slug": "neuwagen-erstzulassung",
  "title": "Neuwagen erstmals zulassen: Von den Fahrzeugpapieren zu den Kennzeichen",
  "teaser": "Welche Nachweise für ein bisher nicht zugelassenes Auto wichtig sind und wann du die Kennzeichenschilder bestellen kannst.",
  "category": "Zulassung vorbereiten",
  "reviewedAt": "2026-11-24",
  "intro": [
    "Dein neues Auto steht beim Händler. Bevor du Schilder bestellst, kläre, wer die Erstzulassung übernimmt und welche Originalunterlagen beziehungsweise elektronischen Nachweise bereits vorliegen."
  ],
  "takeaway": "Ein Neuwagen braucht einen passenden Genehmigungsnachweis und einen vollständigen Zulassungsantrag. Schilderprägung und behördliche Zulassung sind getrennte Schritte.",
  "sections": [
    {
      "id": "vorgang",
      "title": "1. Erstzulassung oder bereits zugelassenes Fahrzeug?",
      "paragraphs": [
        "Entscheidend ist nicht allein die Bezeichnung Neuwagen im Verkauf. Ein Fahrzeug mit Tageszulassung war bereits zugelassen. Für diesen Fall passt ein Ablauf zur Umschreibung besser als eine Anleitung für die erstmalige Zulassung.",
        "Frage den Händler ausdrücklich nach dem bisherigen Zulassungsstatus. Vereinbare außerdem, ob er den Antrag stellt, einen Dienstleister beauftragt oder nur die Fahrzeugunterlagen bereitstellt. So vermeidest du doppelte Reservierungen und Schilderbestellungen."
      ]
    },
    {
      "id": "nachweise",
      "title": "2. Fahrzeugpapiere und Genehmigung zusammenstellen",
      "paragraphs": [
        "§ 6 Absatz 4 FZV regelt den Nachweis der Genehmigung. Bei einem Fahrzeug mit EU-Typgenehmigung ist insbesondere die Übereinstimmungsbescheinigung, das CoC, relevant. Die Vorschrift sieht auch den behördlichen Abruf der CoC-Daten aus den genannten Datenbanken vor.",
        "Prüfe mit Händler und Behörde, welcher Nachweis für dein Fahrzeug verfügbar ist. Lege eine bereits ausgestellte Zulassungsbescheinigung Teil II vor. Ist sie noch nicht vorhanden, ist ihre Ausfertigung nach § 6 Absatz 3 mit zu beantragen. Ein Kaufvertrag ersetzt nicht automatisch diese Fahrzeugnachweise."
      ]
    },
    {
      "id": "halter",
      "title": "3. Antrag auf den vorgesehenen Halter vorbereiten",
      "paragraphs": [
        "Bereite Identitätsnachweise, den passenden Versicherungsnachweis und die für die Kfz-Steuer verlangten Angaben vor. Prüfe die aktuelle Unterlagenliste deiner zuständigen Zulassungsstelle. Bei Vertretung kommen Vollmacht und die dort verlangten Ausweiskopien oder Originalnachweise hinzu.",
        "Wenn Teil II bei einer finanzierenden Bank liegt, organisiere den Dokumentenversand frühzeitig. Eine Versandbestätigung ist noch kein Nachweis, dass die Unterlage der Behörde für deinen Termin vorliegt. Stimmen Halter und Versicherungsnehmer nicht überein, kläre die eVB mit dem Versicherer."
      ]
    },
    {
      "id": "termin",
      "title": "4. Zulassungsweg und Untersuchungspflichten klären",
      "paragraphs": [
        "Ob die Online-Zulassung möglich ist, hängt unter anderem von den Fahrzeugdokumenten, verfügbaren Daten und den Voraussetzungen des zuständigen Portals ab. Ein neu gekauftes Fahrzeug ist nicht allein deshalb automatisch online zulassungsfähig. Nutze für den konkreten Ablauf den verlinkten Online-Ratgeber.",
        "Bei gewöhnlichen neuen Pkw beträgt die erste HU-Frist grundsätzlich 36 Monate. Für besondere Nutzungen und andere Fahrzeugarten gelten abweichende Fristen. Übertrage die Drei-Jahres-Angabe deshalb nicht ungeprüft auf beispielsweise gewerblich vermietete Fahrzeuge."
      ]
    },
    {
      "id": "schilder",
      "title": "5. Bestätigte Kombination prägen lassen",
      "paragraphs": [
        "Kläre die Kombination, die benötigte Ausführung und die Abmessungen. Wenn der Händler bereits Schilder bestellt, brauchst du keine zweite Bestellung. Übernimm eine bestätigte Reservierung sorgfältig und prüfe gegebenenfalls zusätzliche Zeichen wie E oder den Saisonzeitraum.",
        "Die angebotenen Schilder kannst du anschließend im Konfigurator zusammenstellen. Die Lieferung enthält keine behördliche Zulassung und keine amtlichen Stempel- oder HU-Plaketten. Plane die Fahrzeugabholung erst auf Grundlage des tatsächlich abgeschlossenen Zulassungsvorgangs."
      ],
      "items": [
        "Bisherigen Zulassungsstatus bestätigt?",
        "CoC beziehungsweise abrufbare Genehmigungsdaten geklärt?",
        "Teil II und Halterunterlagen vollständig?",
        "Zuständigkeit für Reservierung und Schilderkauf vereinbart?"
      ]
    }
  ],
  "faq": [
    {
      "question": "Ist eine Tageszulassung eine Erstzulassung auf mich?",
      "answer": "Das Fahrzeug war bereits zugelassen. Kläre die dafür erforderliche Umschreibung statt von einem bisher unzugelassenen Neufahrzeug auszugehen."
    },
    {
      "question": "Brauche ich zwingend ein neues Papier-CoC?",
      "answer": "Nicht in jedem Fall. § 6 Absatz 4 FZV sieht auch einen behördlichen Datenabruf vor. Frage, ob dieser für dein Fahrzeug verfügbar ist."
    },
    {
      "question": "Darf ich mit den gelieferten Schildern sofort losfahren?",
      "answer": "Die Schilderlieferung allein erlaubt keine Fahrt. Zulassung, Kennzeichnung und Versicherung müssen zum tatsächlichen Fahrzeugstatus passen."
    }
  ],
  "sources": [
    {
      "label": "FZV § 6: Zulassungsantrag und Genehmigungsnachweise",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__6.html"
    },
    {
      "label": "StVZO Anlage VIII: Untersuchungsfristen",
      "href": "https://www.gesetze-im-internet.de/stvzo_2012/anlage_viii.html"
    },
    {
      "label": "Berlin: Erstzulassung eines fabrikneuen Fahrzeugs",
      "href": "https://service.berlin.de/dienstleistung/120882/"
    }
  ],
  "related": [
    "auto-anmelden-unterlagen",
    "auto-online-zulassen-kennzeichen",
    "fahrzeugbrief-bank-zulassung"
  ],
  "cta": "Kombination und Ausführung stehen fest? Prüfe die angebotenen Schilder im Konfigurator."
},
{
  "slug": "fahrzeugbrief-bank-zulassung",
  "title": "Fahrzeugbrief bei der Bank: Zulassung und Dokumentenversand abstimmen",
  "teaser": "So koordinierst du Teil II zwischen Bank und Zulassungsstelle, ohne Versandbestätigung, Dokumenteneingang und Zulassung zu verwechseln.",
  "category": "Zulassung vorbereiten",
  "reviewedAt": "2026-11-24",
  "intro": [
    "Die Zulassungsbescheinigung Teil II liegt bei der Bank. Das ist bei einer Finanzierung nicht ungewöhnlich, erfordert aber einen abgestimmten Dokumentenweg, wenn dein Zulassungsvorgang diese Unterlage benötigt."
  ],
  "takeaway": "Kläre zuerst, ob Teil II für den konkreten Antrag erforderlich ist. Falls ja, stimmen Bank und Zulassungsstelle Versandziel, Zuordnung und Rückgabe ab. Buche den Abschluss des Vorgangs nicht allein aufgrund einer Versandmeldung.",
  "sections": [
    {
      "id": "bedarf",
      "title": "1. Den Vorgang genau benennen",
      "paragraphs": [
        "Sag der Zulassungsstelle, ob es um Erstzulassung, Halterwechsel oder eine andere Änderung geht. Nicht jede Änderung erfordert dieselben Unterlagen. Bei einer bloßen Änderung der Anschrift sieht § 15 Absatz 1 FZV beispielsweise keine Vorlage von Teil II vor.",
        "Fordere daher nicht vorsorglich für jeden Verwaltungsschritt den Fahrzeugbrief an. Lass dir die aktuelle Unterlagenliste für deinen Fall geben und teile sie der Bank mit. Die Zustimmung zu einem bestimmten Vorgang kann zusätzlich von den vertraglichen Vereinbarungen abhängen."
      ]
    },
    {
      "id": "versand",
      "title": "2. Den Dokumentenweg mit der Bank vereinbaren",
      "paragraphs": [
        "Frage nach dem vorgesehenen Verfahren zur Übersendung an die zuständige Behörde. Übermittle die bestätigte Empfängeradresse und die Angaben, mit denen dein Antrag dem Fahrzeug zugeordnet werden kann. Dazu können FIN, Dokumentennummer oder ein Aktenzeichen gehören.",
        "Vermeide selbst gewählte Abkürzungen beim Behördennamen. Kläre, wer die Anforderung auslösen darf und ob weitere Unterlagen benötigt werden. Bearbeitungs- und Postlaufzeiten musst du beim beteiligten Institut erfragen; eine allgemeingültige Zahl an Tagen wäre hier unzuverlässig."
      ]
    },
    {
      "id": "eingang",
      "title": "3. Versand und tatsächlichen Eingang unterscheiden",
      "paragraphs": [
        "Eine Nachricht der Bank über den Versand sagt noch nicht, dass die Zulassungsstelle die Unterlage bereits bearbeiten kann. Frage nach dem vorgesehenen Weg zur Eingangsbestätigung, bevor du einen zeitkritischen Termin fest einplanst.",
        "Berlin bietet dafür beispielsweise eine eigene Statusabfrage für übersandte Zulassungsbescheinigungen Teil II an. Diese örtliche Möglichkeit ist keine bundesweite Zusage. Nutze nur den offiziellen Dienst deiner Behörde und die dort verlangten Fahrzeug- oder Dokumentendaten."
      ]
    },
    {
      "id": "rueckgabe",
      "title": "4. Rückgabe und digitale Verfahren vorher klären",
      "paragraphs": [
        "Vereinbare, an wen Teil II nach der Bearbeitung zurückgehen soll. § 14 Absatz 7 FZV regelt die Aushändigung an den Vorlegenden oder die von ihm bestimmte Person. Die Behörde entscheidet dabei keine privatrechtlichen Streitigkeiten.",
        "Bei einem Online-Verfahren solltest du nicht einfach von einem frei verfügbaren Sicherheitscode ausgehen. Prüfe mit Bank und Portal, ob dein konkreter Vorgang auf diesem Weg möglich ist. Lege keine Sicherheitsfelder ohne geklärten Zweck frei und melde ein bei der Bank verwahrtes Dokument nicht als verloren."
      ]
    },
    {
      "id": "bestellung",
      "title": "5. Schilder nach dem abgestimmten Ablauf bestellen",
      "paragraphs": [
        "Prüfe die Gültigkeit einer Wunschreservierung und ob die geplante Kombination zum Antrag passt. Bestehende Schilder müssen nicht allein deshalb ersetzt werden, weil Teil II bei einer Bank liegt. Entscheidend ist der tatsächliche Zulassungsvorgang.",
        "Brauchst du neue Kennzeichenschilder, bestellst du die bestätigte Kombination und passende Ausführung. Der Schilderanbieter beschafft keinen Fahrzeugbrief bei der Bank. Plane Dokumentenweg, behördlichen Termin und Lieferung als getrennte Aufgaben."
      ],
      "items": [
        "Benötigt dieser Vorgang Teil II?",
        "Sind Versandadresse und Zuordnung bestätigt?",
        "Ist der Eingang nach dem örtlichen Verfahren geprüft?",
        "Sind Rückgabe und tatsächlicher Schilderbedarf geklärt?"
      ]
    }
  ],
  "faq": [
    {
      "question": "Muss mir die Bank den Fahrzeugbrief persönlich zusenden?",
      "answer": "Das solltest du nicht voraussetzen. Häufig wird der Dokumentenweg direkt zur Behörde abgestimmt. Maßgeblich sind der konkrete Vorgang und die Vereinbarung mit der Bank."
    },
    {
      "question": "Ist ein Fahrzeugbrief bei der Bank verloren?",
      "answer": "Nein. Ein bekanntes Verwahrungsverhältnis ist kein Dokumentenverlust. Organisiere den vorgesehenen Versand statt ein Verlustverfahren zu beginnen."
    },
    {
      "question": "Kann ich schon Kennzeichen bestellen?",
      "answer": "Erst wenn Kombination, Ausführung und Zuständigkeit geklärt sind. Eine Schilderbestellung beschleunigt den Dokumentenversand nicht."
    }
  ],
  "sources": [
    {
      "label": "FZV § 6: Antrag und Teil II",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__6.html"
    },
    {
      "label": "FZV § 14 Absatz 7: Aushändigung",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__14.html"
    },
    {
      "label": "FZV § 15: Änderung von Halterdaten",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__15.html"
    },
    {
      "label": "Berlin: Eingang der Zulassungsbescheinigung Teil II prüfen",
      "href": "https://service.berlin.de/dienstleistung/329048/"
    }
  ],
  "related": [
    "fahrzeugschein-fahrzeugbrief-unterschied",
    "auto-anmelden-vollmacht",
    "auto-online-zulassen-kennzeichen"
  ],
  "cta": "Falls neue Schilder erforderlich sind, übernimm die bestätigte Kombination sorgfältig in den Konfigurator."
},
{
  "slug": "auto-zulassen-ohne-deutschen-wohnsitz",
  "title": "Auto ohne deutschen Wohnsitz zulassen: Standort und Zuständigkeit klären",
  "teaser": "Was bei fehlendem Wohnsitz in Deutschland zu prüfen ist: regelmäßiger Fahrzeugstandort, zuständige Behörde und mögliche Empfangsbevollmächtigung.",
  "category": "Zulassung vorbereiten",
  "reviewedAt": "2026-11-24",
  "intro": [
    "Du wohnst außerhalb Deutschlands, das Fahrzeug soll aber regelmäßig hier stehen. Kläre die Zuständigkeit und den konkreten Zulassungsweg vor einer Kennzeichenreservierung. Eine deutsche Lieferadresse allein beantwortet diese Fragen nicht."
  ],
  "takeaway": "Die FZV enthält Regeln für Halter ohne inländischen Wohnsitz oder Sitz. Entscheidend sind der konkrete Fall und der regelmäßige Fahrzeugstandort. Eine Empfangsbevollmächtigung ist nicht in jeder Konstellation automatisch erforderlich.",
  "sections": [
    {
      "id": "standort",
      "title": "1. Die tatsächliche Situation beschreiben",
      "paragraphs": [
        "§ 6 Absatz 2 FZV betrifft Halter ohne Wohnsitz, gewöhnlichen Aufenthalt, Sitz oder Geschäftsleitung im Inland, wenn das Fahrzeug seinen regelmäßigen Standort in Deutschland hat. Eine reine Durchreise oder eine geplante dauerhafte Ausfuhr ist davon zu unterscheiden.",
        "Notiere deine tatsächliche Anschrift und den vorgesehenen regelmäßigen Standort des Fahrzeugs. Kläre mit der Behörde, welche Nachweise sie hierfür benötigt. Verwende keine fremde Anschrift als angeblichen Wohnsitz. Dieser Ratgeber beurteilt keine etwaigen Zulassungspflichten deines Wohnsitzstaates."
      ]
    },
    {
      "id": "empfang",
      "title": "2. Empfangsbevollmächtigung mit ihren Ausnahmen prüfen",
      "paragraphs": [
        "Nach § 6 Absatz 2 kann die Zulassungsbehörde in der beschriebenen Situation die Benennung eines Empfangsbevollmächtigten im Inland verlangen. Die Vorschrift enthält jedoch Ausnahmen. Dazu gehören bestimmte Fälle mit Wohnsitz oder Sitz in EU- beziehungsweise EWR-Staaten, wenn die vorgesehene Zustellung möglich ist.",
        "Auch für Vertragsstaaten des dort genannten Europäischen Übereinkommens über die Zustellung von Schriftstücken in Verwaltungssachen ist eine Ausnahme geregelt. Lass deshalb prüfen, welche Regel auf deinen Staat und deinen Fall zutrifft. Die Aussage, jeder Halter im Ausland brauche zwingend eine deutsche Empfangsperson, wäre zu pauschal."
      ]
    },
    {
      "id": "behoerde",
      "title": "3. Die zuständige Zulassungsstelle bestimmen",
      "paragraphs": [
        "§ 75 Absatz 2 FZV regelt die örtliche Zuständigkeit. Bei fehlendem inländischem Wohnsitz oder Aufenthalt kann der Ort des Empfangsbevollmächtigten maßgeblich sein. Für die Ausnahmefälle nach § 6 Absatz 2 Satz 2 stellt die Vorschrift auf den regelmäßigen Standort des Fahrzeugs ab.",
        "Kontaktiere die danach in Betracht kommende Behörde und schildere die Situation vollständig. Lass dir ihre Zuständigkeit bestätigen, bevor du ein Ortskürzel reservierst. Ein bequem erreichbarer Schilderladen oder die Adresse eines Bekannten legt den Zulassungsbezirk nicht automatisch fest."
      ]
    },
    {
      "id": "unterlagen",
      "title": "4. Empfang und Vertretung auseinanderhalten",
      "paragraphs": [
        "Ein Empfangsbevollmächtigter nimmt behördliche Schriftstücke im vorgesehenen Umfang entgegen. Daraus folgt nicht automatisch eine Vollmacht, den Zulassungsantrag für dich zu stellen. Wer den Termin übernimmt, benötigt die dafür verlangte Vertretungsberechtigung.",
        "Frage nach den konkreten Identitäts-, Fahrzeug-, Versicherungs- und Steuerunterlagen. Stimme den Versicherungsnachweis auf die tatsächlichen Halterdaten und die Nutzung ab. Eine bloße Paketannahme für Kennzeichenschilder erfüllt keine behördliche Empfangsbevollmächtigung."
      ]
    },
    {
      "id": "schilder",
      "title": "5. Erst danach die passende Kombination bestellen",
      "paragraphs": [
        "Wenn Zuständigkeit und Verfahren geklärt sind, kannst du die behördlich bestätigte Kombination für die Schilderprägung verwenden. Prüfe Format, Ausführung und Stückzahl. Die Bestellung ersetzt keinen Nachweis des Fahrzeugstandorts.",
        "Soll das Auto stattdessen dauerhaft ins Ausland gebracht werden, prüfe den separaten Ratgeber zum Ausfuhrkennzeichen und die zuständigen Stellen. Leite aus einer deutschen Schilderlieferung keine Fahrerlaubnis für ein unzugelassenes Fahrzeug ab."
      ],
      "items": [
        "Tatsächlicher Halterwohnsitz und Fahrzeugstandort geklärt?",
        "Zuständige Behörde bestätigt?",
        "Empfangsbevollmächtigung samt Ausnahmen geprüft?",
        "Vertretung und Fahrzeugunterlagen vorbereitet?"
      ]
    }
  ],
  "faq": [
    {
      "question": "Reicht die Adresse eines Freundes für eine deutsche Zulassung?",
      "answer": "Nicht automatisch. Tatsächliche Verhältnisse, Fahrzeugstandort und die gesetzlichen Zuständigkeitsregeln sind maßgeblich."
    },
    {
      "question": "Brauche ich immer einen Empfangsbevollmächtigten?",
      "answer": "Nein. § 6 Absatz 2 FZV enthält Ausnahmen. Lass die Regel für deinen Wohnsitzstaat und die mögliche Zustellung prüfen."
    },
    {
      "question": "Ist der Empfangsbevollmächtigte zugleich mein Vertreter beim Termin?",
      "answer": "Nicht automatisch. Empfang behördlicher Schriftstücke und Vertretung beim Zulassungsantrag sind getrennte Aufgaben."
    }
  ],
  "sources": [
    {
      "label": "FZV § 6 Absatz 2: Halter ohne inländischen Wohnsitz",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__6.html"
    },
    {
      "label": "FZV § 75 Absatz 2: örtliche Zuständigkeit",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__75.html"
    }
  ],
  "related": [
    "auto-anmelden-vollmacht",
    "auto-anmelden-unterlagen",
    "ausfuhrkennzeichen-ablauf",
    "auslaendische-kennzeichen-deutschland"
  ],
  "cta": "Zuständigkeit und Kombination sind bestätigt? Wähle die passende angebotene Schildausführung."
},
{
  "slug": "selbstfahrervermietfahrzeug-zulassen",
  "title": "Selbstfahrervermietfahrzeug: Nutzung, Versicherung und Zulassung vorbereiten",
  "teaser": "Ein Auto gewerblich ohne Fahrer vermieten: Anzeige der Nutzung, Versicherungsnachweis und HU-Fristen vor dem Einsatz klären.",
  "category": "Zulassung vorbereiten",
  "reviewedAt": "2026-11-24",
  "intro": [
    "Du möchtest ein Fahrzeug gewerblich an Kunden vermieten, die selbst fahren. Bereite die Nutzungsangaben und Nachweise vor dem ersten Einsatz vor. Eine Zulassung auf den Firmennamen allein beschreibt diese Verwendung noch nicht vollständig."
  ],
  "takeaway": "Die gewerbliche Vermietung ohne Fahrer ist eine besondere Nutzung. Kläre Anzeige, Versicherung und Untersuchungsfristen. Ein spezielles Schilderdesign ersetzt keinen dieser Schritte.",
  "sections": [
    {
      "id": "nutzung",
      "title": "1. Vermietung ohne Fahrer richtig einordnen",
      "paragraphs": [
        "Hier geht es um gewerbliche Vermietung ohne Gestellung eines Fahrers. Ein Fahrzeug mit Chauffeur im Personenbeförderungsgewerbe ist ein anderer Fall. Ebenso solltest du eine gelegentliche private Überlassung nicht ohne Prüfung als gewerbliche Vermietung einordnen.",
        "Beschreibe der Zulassungsstelle und dem Versicherer, wer das Fahrzeug fahren soll, auf wen es zugelassen bleibt und wie lange die Mietverträge laufen. Diese Angaben sind relevant; die Bezeichnung Firmenwagen allein reicht für die Prüfung nicht aus."
      ]
    },
    {
      "id": "meldung",
      "title": "2. Die Nutzung im richtigen Verfahren angeben",
      "paragraphs": [
        "Bei der Zulassung ist die beabsichtigte gewerbliche Vermietung ohne Fahrer nach § 6 Absatz 5 FZV anzugeben. Beginnt diese Nutzung bei einem bereits zugelassenen Fahrzeug, regelt § 15 Absatz 3 die unverzügliche Anzeige bei der Zulassungsbehörde.",
        "Die Vorschrift enthält Ausnahmen, unter anderem bei Zulassung auf den Mieter oder bei einer Mietdauer von mindestens einem Jahr. Wird eine solche vereinbarte Dauer später verkürzt, ist die dort geregelte Anzeige zu beachten. Prüfe deshalb deinen tatsächlichen Vertrag statt jedes Mietfahrzeug gleich zu behandeln."
      ]
    },
    {
      "id": "versicherung",
      "title": "3. Versicherungsnachweis und Papiere abstimmen",
      "paragraphs": [
        "Informiere den Versicherer ausdrücklich über die gewerbliche Vermietung ohne Fahrer. Frage nach dem für den Vorgang passenden Versicherungsnachweis. Eine vorhandene eVB für eine andere Nutzung solltest du nicht ungeprüft weiterverwenden.",
        "Die Berliner Behörde beschreibt für Beginn und Ende dieser Nutzung ein eigenes Änderungsverfahren einschließlich passender Versicherungsbestätigung. Das ist ein örtliches Beispiel; deine zuständige Behörde nennt die verbindliche Unterlagenliste für deinen Vorgang. Liegt Teil II bei einer Bank, kläre zusätzlich die benötigten Dokumente und den Versandweg."
      ]
    },
    {
      "id": "hu",
      "title": "4. Die passende HU-Frist feststellen",
      "paragraphs": [
        "Anlage VIII Nummer 2.2 StVZO sieht grundsätzlich zwölf Monate vor, wenn untersuchungspflichtige Fahrzeuge gewerblich ohne Fahrer vermietet werden und nicht auf den Mieter zugelassen sind. Daraus darfst du aber kein ausnahmsloses Jährlich-Gebot für jede Vertragsgestaltung ableiten.",
        "Bei einer Mindestmietdauer von einem Jahr an denselben Mieter nennt die Vorschrift besondere Fristen, darunter 36 Monate für die dort genannten erstmalig in Verkehr gekommenen Pkw. Für andere Fahrzeuge und spätere Änderungen gelten die jeweiligen Regelungen. Lass die konkrete Fälligkeit anhand von Fahrzeugart, Erstzulassung und Vertrag feststellen."
      ]
    },
    {
      "id": "schilder",
      "title": "5. Tatsächlichen Kennzeichenbedarf prüfen",
      "paragraphs": [
        "Die Nutzungsänderung bedeutet nicht automatisch, dass die bisherige Kombination ersetzt werden muss. Frage im Verfahren, ob vorhandene Schilder und Ausführung weitergeführt werden können. Ein gewöhnliches Kennzeichenschild wird nicht durch einen Aufdruck zum Nachweis der Vermietberechtigung.",
        "Sind neue Schilder erforderlich, bestellst du die bestätigte Kombination im passenden angebotenen Format. Der Shop liefert keine Vermietgenehmigung, Versicherung oder amtlichen Plaketten. Halte die bestätigte HU-Fälligkeit und spätere Änderungen der Nutzung in deiner Fahrzeugorganisation fest."
      ],
      "items": [
        "Nutzung und Mietdauer vollständig beschrieben?",
        "Anzeige oder Ausnahme mit der Behörde geklärt?",
        "Versicherungsnachweis passend vorbereitet?",
        "HU-Fälligkeit und tatsächlicher Schilderbedarf geprüft?"
      ]
    }
  ],
  "faq": [
    {
      "question": "Ist jedes Firmenauto ein Selbstfahrervermietfahrzeug?",
      "answer": "Nein. Maßgeblich ist hier die gewerbliche Vermietung ohne Fahrer. Die Zulassung auf eine Firma allein reicht dafür nicht."
    },
    {
      "question": "Muss jedes vermietete Fahrzeug jährlich zur HU?",
      "answer": "Nicht ausnahmslos. Anlage VIII Nummer 2.2 StVZO enthält Regeln und Ausnahmen, die insbesondere Vertragsdauer und Zulassung auf den Mieter berücksichtigen."
    },
    {
      "question": "Brauche ich besondere Vermietkennzeichen?",
      "answer": "Die Nutzungsangabe wird nicht durch ein besonderes Schilderdesign ersetzt. Kläre im Vorgang, ob deine bestehende Kombination weitergeführt werden kann."
    }
  ],
  "sources": [
    {
      "label": "FZV § 6 Absatz 5: Angabe der Vermietung",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__6.html"
    },
    {
      "label": "FZV § 15 Absatz 3: Anzeige und Ausnahmen",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__15.html"
    },
    {
      "label": "StVZO Anlage VIII Nummer 2.2: Untersuchungsfristen",
      "href": "https://www.gesetze-im-internet.de/stvzo_2012/anlage_viii.html"
    },
    {
      "label": "Berlin: Selbstfahrervermietfahrzeug-Nutzung ändern",
      "href": "https://service.berlin.de/dienstleistung/326039/"
    }
  ],
  "related": [
    "auto-auf-firma-zulassen",
    "auto-ohne-tuev-anmelden",
    "fahrzeugbrief-bank-zulassung"
  ],
  "cta": "Neue Schilder tatsächlich nötig? Prüfe die bestätigte Kombination und Ausführung vor der Bestellung."
},
{
  "slug": "ausfuhrkennzeichen-ablauf",
  "title": "Ausfuhrkennzeichen: Ablauf für die dauerhafte Überführung ins Ausland",
  "teaser": "Versicherung, HU, Unterlagen und Befristung beim Ausfuhrkennzeichen einordnen. Der Shop bietet reguläre Schilder, keine Ausfuhrkennzeichen.",
  "category": "Zulassung vorbereiten",
  "reviewedAt": "2026-11-24",
  "intro": [
    "Ein Fahrzeug soll dauerhaft in ein anderes Land gebracht werden. Dann reicht es nicht, für die Fahrt irgendein Kennzeichenschild anzuschrauben. Das Ausfuhrverfahren verbindet die befristete Zulassung mit einer dafür passenden Versicherung und einer besonderen Kennzeichenausführung."
  ],
  "takeaway": "Kläre vor der Fahrt das Ausfuhrverfahren, den Versicherungszeitraum und die HU. Unser Shop bietet keine Ausfuhrkennzeichen an. Reguläre deutsche Schilder sind dafür kein Ersatz.",
  "sections": [
    {
      "id": "zweck",
      "title": "1. Export und normale Auslandsreise unterscheiden",
      "paragraphs": [
        "§ 45 FZV behandelt die dauerhafte Verbringung bestimmter nicht zugelassener Fahrzeuge ins Ausland, bei Kraftfahrzeugen auf eigener Achse und bei Anhängern hinter einem Kraftfahrzeug. Eine Urlaubsfahrt mit einem weiterhin regulär zugelassenen Auto ist ein anderer Fall.",
        "Auch die Beförderung als Ladung ist von einer Fahrt des Fahrzeugs selbst zu unterscheiden. Beschreibe der zuständigen Stelle deshalb, wie und wohin das Fahrzeug gelangen soll. Plane Transitländer mit ein und kläre dortige Anforderungen, statt eine pauschale Anerkennung aller Kennzeichenarten anzunehmen."
      ]
    },
    {
      "id": "versicherung",
      "title": "2. Versicherung und HU auf den Zeitraum abstimmen",
      "paragraphs": [
        "Die FZV verlangt für diesen Vorgang einen besonderen Versicherungsnachweis. Die Zulassung ist an die nachgewiesene Versicherungsdauer gebunden und auf höchstens ein Jahr begrenzt. Die Behörde kann den Zeitraum im Einzelfall weiter beschränken.",
        "Der nächste HU-Termin muss die Anforderungen des § 45 erfüllen. Läuft die Untersuchung vor dem vorgesehenen Zulassungsende ab, ist eine Untersuchung erforderlich. Vereinbare deshalb keine lange Exportgültigkeit, ohne die HU-Unterlagen vorher zu prüfen."
      ]
    },
    {
      "id": "unterlagen",
      "title": "3. Die örtliche Unterlagenliste prüfen",
      "paragraphs": [
        "Halte Fahrzeugpapiere, Identitätsnachweis, Versicherungsunterlagen und den HU-Nachweis bereit. Bei einem noch zugelassenen Fahrzeug sind auch die bisherigen Schilder ein Thema. Frage die Zulassungsstelle nach den konkreten Steuer-, Vertretungs- und gegebenenfalls Empfangsbevollmächtigungsunterlagen.",
        "Berlin verlangt beispielsweise in bestimmten Fällen eine Fahrzeugvorführung, etwa wenn das Fahrzeug zuvor nicht im Bundesgebiet zugelassen war oder zuletzt ein Ausfuhrkennzeichen hatte. Das ist ein örtliches Verfahrensbeispiel; kläre die Vorführung und den Termin bei deiner zuständigen Stelle. Eine vorherige separate Abmeldung wird in der Berliner Beschreibung nicht pauschal verlangt."
      ]
    },
    {
      "id": "ablaufdatum",
      "title": "4. Das Ablaufdatum ernst nehmen",
      "paragraphs": [
        "Das Ausfuhrkennzeichen enthält ein Ablaufdatum. Die Zulassungsbescheinigung Teil I wird auf die Ausfuhr beschränkt und erhält ebenfalls die Befristung. Nach Ablauf darf das Fahrzeug auf öffentlichen Straßen nicht weiter in Betrieb gesetzt werden.",
        "Ein späterer Rückflug, eine verschobene Übergabe oder ein noch lesbares Schild verlängern die Gültigkeit nicht. Stimme Transport, behördlichen Termin und Versicherung so ab, dass zwischen Ausstellung und Fahrt ein realistischer Zeitplan liegt."
      ]
    },
    {
      "id": "sortiment",
      "title": "5. Die richtige Leistung beauftragen",
      "paragraphs": [
        "Für das Ausfuhrverfahren brauchst du einen Anbieter für die tatsächlich vorgesehene besondere Schildausführung. Ein normales Schild mit der bisherigen deutschen Kombination erfüllt diesen Zweck nicht. Rote Händlerkennzeichen und Kurzzeitkennzeichen sind ebenfalls keine pauschal austauschbaren Alternativen.",
        "Hier kannst du reguläre angebotene deutsche Kennzeichenschilder für eine entsprechende Zuteilung bestellen. Der Shop vermittelt in diesem Vorgang weder Ausfuhrversicherung noch Exportzulassung und bietet keine Ausfuhrschilder an."
      ],
      "items": [
        "Dauerhaften Export und Transportart klären.",
        "Versicherung und HU mit dem gewünschten Zeitraum abgleichen.",
        "Örtliche Unterlagen und mögliche Vorführung bestätigen.",
        "Ausfuhrkennzeichen über das passende Verfahren beschaffen."
      ]
    }
  ],
  "faq": [
    {
      "question": "Kann ich einfach normale deutsche Schilder für den Export bestellen?",
      "answer": "Nein. Eine reguläre Prägung ersetzt weder die erforderliche Ausfuhrzulassung noch deren besondere Schildausführung."
    },
    {
      "question": "Gilt ein Ausfuhrkennzeichen immer ein Jahr?",
      "answer": "Nein. Ein Jahr ist die gesetzliche Obergrenze. Versicherungsdauer und behördliche Entscheidung bestimmen die tatsächliche Befristung."
    },
    {
      "question": "Verkauft dieser Shop Ausfuhrkennzeichen?",
      "answer": "Nein. Der Bestelleinstieg führt zu den regulär angebotenen deutschen Schildern, nicht zu Ausfuhrkennzeichen."
    }
  ],
  "sources": [
    {
      "label": "FZV § 45: Ausfuhrverfahren",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__45.html"
    },
    {
      "label": "Berlin: Ausfuhrkennzeichen beantragen",
      "href": "https://service.berlin.de/dienstleistung/121476/"
    }
  ],
  "related": [
    "kurzzeitkennzeichen-fahrzeugueberfuehrung",
    "eu-import-deutsche-kennzeichen"
  ],
  "cta": "Du benötigst stattdessen Schilder für eine reguläre deutsche Zulassung? Prüfe die bestätigte Kombination und die angebotene Ausführung im Konfigurator. Ausfuhrschilder sind dort nicht erhältlich."
},
{
  "slug": "drittland-import-zulassung",
  "title": "Auto aus einem Drittland importiert: Deutsche Zulassung vorbereiten",
  "teaser": "Herkunftspapiere, Zollunterlagen, technische Genehmigung und passende Schilder für einen Gebrauchtwagen außerhalb von EU und EWR vorbereiten.",
  "category": "Zulassung vorbereiten",
  "reviewedAt": "2026-11-24",
  "intro": [
    "Bei einem gebrauchten Importauto aus einem Drittland kommen zu den üblichen Zulassungsunterlagen weitere Fragen hinzu. Wo war es zugelassen? Welche technische Genehmigung liegt vor? Welche Einfuhrunterlagen werden benötigt? Diese Punkte sollten vor der Bestellung deutscher Schilder geklärt sein."
  ],
  "takeaway": "Beginne mit Herkunfts- und Genehmigungsnachweisen. Ein ausländischer Fahrzeugschein oder eine bestellte deutsche Kennzeichenplatte allein reichen nicht für die Zulassung. Dieser Ablauf betrifft Gebrauchtfahrzeuge aus Staaten außerhalb von EU und EWR.",
  "sections": [
    {
      "id": "herkunft",
      "title": "1. Herkunft und Dokumente sauber zuordnen",
      "paragraphs": [
        "Sammle die ausländischen Fahrzeugpapiere und deinen Nachweis über den Erwerb beziehungsweise die Verfügungsberechtigung. Vergleiche die Fahrzeug-Identifizierungsnummer in den Unterlagen mit dem Fahrzeug. Kläre fehlende oder widersprüchliche Dokumente vor dem Zulassungstermin.",
        "Der bestehende EU/EWR-Ratgeber behandelt einen anderen Ausgangsfall. Übertrage seine vereinfachte Vorbereitung nicht ungeprüft auf einen Drittlandimport. Ein Fahrzeugmodell, das auch in Deutschland verkauft wurde, muss nicht dieselbe genehmigte Ausführung haben."
      ]
    },
    {
      "id": "einfuhr",
      "title": "2. Einfuhrunterlagen getrennt von der Zulassung klären",
      "paragraphs": [
        "Die Berliner Unterlagenliste nennt eine Zollunbedenklichkeitsbescheinigung. Liegt diese dort nicht vor, wird nach der veröffentlichten Beschreibung das Hauptzollamt über die Einfuhr informiert. Das ist keine Zusage, dass fehlende Zollformalitäten bedeutungslos wären.",
        "Kläre deinen Einfuhrfall unmittelbar mit der zuständigen Zollstelle und der Zulassungsbehörde. Wir nennen hier keine pauschalen Abgabensätze: Herkunft, Verfahren und mögliche Besonderheiten müssen für das konkrete Fahrzeug geprüft werden. Eine Schilderrechnung ersetzt keinen Einfuhrnachweis."
      ]
    },
    {
      "id": "technik",
      "title": "3. Den anerkannten Genehmigungsnachweis feststellen",
      "paragraphs": [
        "Nach der Berliner Verfahrensbeschreibung kommen ein Gutachten nach § 21 StVZO mit technischem Datenblatt oder unter bestimmten Voraussetzungen CoC beziehungsweise Herstellerdaten infrage. Ein CoC genügt dort nicht automatisch: Die Anerkennung der EG-Typgenehmigungsnummer muss aus den Drittstaatspapieren hervorgehen.",
        "Lass die zuständige Stelle und eine geeignete Prüforganisation vorab beurteilen, welcher Nachweis für dein Fahrzeug benötigt wird. Ein §-21-Gutachten und eine eventuell erforderliche Ausnahmegenehmigung sind unterschiedliche Schritte. Bestelle keine Umbauten nach einer allgemeinen Internetliste, bevor der tatsächliche Prüfbedarf feststeht."
      ]
    },
    {
      "id": "termin",
      "title": "4. HU und Zulassungsantrag vorbereiten",
      "paragraphs": [
        "Für die Terminvorbereitung nennt das amtliche Beispiel außerdem eine gültige HU, eVB, Identitätsunterlagen und gegebenenfalls SEPA-Mandat oder Vollmacht. Die Behörde benötigt die geforderten Originalunterlagen; stimme die konkrete Liste und mögliche Übersetzungen vorher ab.",
        "Plane genügend Zeit für fehlende Nachweise. Ein reserviertes Wunschkennzeichen verpflichtet die Behörde nicht, ungeklärte technische oder dokumentarische Fragen zu übergehen. Vereinbare die Schilderbestellung deshalb passend zum tatsächlichen Fortschritt des Verfahrens."
      ]
    },
    {
      "id": "schilder",
      "title": "5. Deutsche Kombination und Montagefläche abgleichen",
      "paragraphs": [
        "Bei Importfahrzeugen kann die vorhandene Kennzeichenaussparung von den üblichen deutschen Maßen abweichen. Eine kleine Aussparung allein ist keine Erlaubnis, ein beliebiges verkleinertes Schild zu verwenden. Kläre die zulässige Form mit der Behörde und gegebenenfalls im technischen Verfahren.",
        "Wenn Kombination, Ausführung und Maße feststehen, vergleiche sie mit dem Angebot. Der reguläre Autokonfigurator bietet 520-mm-Schilder. Benötigst du ein nicht angebotenes Sonderformat, bestelle nicht ersatzweise eine ungefähr passende Platte. Zulassung und amtliche Plaketten bleiben vom Schilderkauf getrennt."
      ]
    }
  ],
  "faq": [
    {
      "question": "Braucht jeder Drittlandimport zwingend ein Vollgutachten?",
      "answer": "Das hängt vom vorhandenen Genehmigungsnachweis und dem konkreten Fahrzeug ab. Die örtliche Behörde und eine geeignete Prüfstelle klären, welcher Nachweis anerkannt wird."
    },
    {
      "question": "Ist die ausländische Kombination auf deutschen Schildern ausreichend?",
      "answer": "Nein. Für die deutsche Zulassung ist die deutsche behördliche Zuteilung maßgeblich. Eine bloße Nachprägung der ausländischen Zeichen ersetzt sie nicht."
    },
    {
      "question": "Kann ich vor der technischen Prüfung bestellen?",
      "answer": "Sinnvoll ist die Bestellung erst, wenn Kombination und zulässiges Format feststehen. Bei ungeklärter Genehmigung besteht das Risiko einer unpassenden Prägung."
    }
  ],
  "sources": [
    {
      "label": "Berlin: Zulassung eines Drittland-Gebrauchtfahrzeugs",
      "href": "https://service.berlin.de/dienstleistung/324197/"
    },
    {
      "label": "StVZO § 21: Einzelbetriebserlaubnis",
      "href": "https://www.gesetze-im-internet.de/stvzo_2012/__21.html"
    },
    {
      "label": "FZV Anlage 4: Formate",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/anlage_4.html"
    }
  ],
  "related": [
    "eu-import-deutsche-kennzeichen",
    "vollgutachten-21-zulassung",
    "kennzeichengroessen",
    "auslaendische-kennzeichen-deutschland"
  ],
  "cta": "Unterlagen, Zuteilung und passendes Format sind bestätigt? Bestelle jetzt die dafür angebotenen deutschen Kennzeichenschilder."
},
{
  "slug": "vollgutachten-21-zulassung",
  "title": "Vollgutachten nach § 21: Vom technischen Nachweis zur Zulassung",
  "teaser": "Wann ein Gutachten nach § 21 StVZO relevant ist, was die Behörde entscheidet und wann die Kennzeichenbestellung in den Ablauf passt.",
  "category": "Zulassung vorbereiten",
  "reviewedAt": "2026-11-24",
  "intro": [
    "Du hörst bei einem Import, Umbau oder besonderen Fahrzeug vom Vollgutachten. Damit ist noch nicht gesagt, dass du bereits eine Betriebserlaubnis oder eine Zulassung hast. Technische Begutachtung, behördliche Entscheidung und Schilderprägung erfüllen unterschiedliche Aufgaben."
  ],
  "takeaway": "Kläre zuerst, ob das §-21-Verfahren für dein Fahrzeug erforderlich ist. Das Gutachten liefert den technischen Nachweis; die zuständige Behörde erteilt die Betriebserlaubnis. Die Kennzeichenbestellung ersetzt keinen dieser Schritte.",
  "sections": [
    {
      "id": "anwendung",
      "title": "1. Den konkreten Anlass prüfen lassen",
      "paragraphs": [
        "§ 21 StVZO behandelt Fahrzeuge, die nicht zu einem genehmigten Typ gehören. Außerdem ist das Verfahren bei bestimmten Änderungen relevant, durch die eine frühere Betriebserlaubnis nach § 19 Absatz 2 erloschen ist. Nicht jeder Zubehöranbau führt automatisch zu diesem Ergebnis.",
        "Liegt bereits eine passende Typgenehmigung oder Einzelbetriebserlaubnis vor, darf eine Begutachtung nach § 21 Absatz 1a nicht einfach ohne den dort vorgesehenen Anlass verlangt werden. Eine lange Standzeit allein solltest du deshalb nicht mit einem zwingenden Vollgutachten gleichsetzen. Lass den vorhandenen Genehmigungsstand prüfen."
      ]
    },
    {
      "id": "vorbereitung",
      "title": "2. Unterlagen vor der Begutachtung zusammenstellen",
      "paragraphs": [
        "Bereite vorhandene Fahrzeugpapiere, technische Daten und Nachweise zu Änderungen vor. Bei einem Import helfen die vollständigen Herkunftsunterlagen, bei einem Umbau die Dokumente der verbauten Teile. Beschreibe der Prüfstelle, was tatsächlich am Fahrzeug geändert wurde.",
        "Kläre vor der Anfahrt, ob die gewählte Stelle die benötigte Begutachtung für deine Fahrzeugklasse durchführen kann. Die Vorschrift nennt amtlich anerkannte Sachverständige beziehungsweise entsprechend benannte Technische Dienste. Eine normale HU-Buchung ist nicht automatisch der richtige Termin."
      ]
    },
    {
      "id": "gutachten",
      "title": "3. Was im Gutachten stehen muss",
      "paragraphs": [
        "Das Gutachten enthält die technische Beschreibung in dem Umfang, der für die Zulassungsbescheinigungen benötigt wird. Hinzu kommen die technischen Vorschriften, auf deren Grundlage eine Betriebserlaubnis erteilt werden kann. Bei erloschener Betriebserlaubnis werden auch die dafür maßgeblichen Änderungen dargestellt.",
        "Der Sachverständige oder Technische Dienst bestätigt die zutreffende Beschreibung und den vorschriftsmäßigen Zustand. Fehlende Nachweise oder notwendige Arbeiten können zusätzliche Schritte auslösen. Ein vorab gebuchter Zulassungstermin verkürzt diese Prüfung nicht."
      ]
    },
    {
      "id": "behoerde",
      "title": "4. Gutachten und behördliche Erlaubnis unterscheiden",
      "paragraphs": [
        "Das Gutachten wird der nach Landesrecht zuständigen Behörde für den Antrag auf Betriebserlaubnis vorgelegt. Die Behörde überträgt die erforderlichen Angaben in die Fahrzeugdokumente. Falls zusätzlich eine Ausnahme nötig ist, muss auch diese Entscheidung geklärt werden.",
        "Frage nach, welche Unterlagen außer dem technischen Gutachten für die anschließende Zulassung fehlen. Versicherung, Identitätsnachweise, HU und steuerliche Angaben sind eigenständige Punkte des konkreten Vorgangs. Ein Gutachten ist kein universeller Ersatz für den gesamten Zulassungsantrag."
      ]
    },
    {
      "id": "bestellen",
      "title": "5. Kennzeichen erst auf bestätigter Grundlage bestellen",
      "paragraphs": [
        "Kläre die Kombination und die zulässige Schildform, bevor du prägen lässt. Das ist besonders wichtig, wenn sich Fahrzeugart, Montagefläche oder benötigte Ausführung geändert haben. Eine technische Besonderheit lässt sich nicht durch Abschneiden oder Verformen des Kennzeichens lösen.",
        "Bei einer bestehenden Zulassung und unveränderter Kombination sind neue Schilder nicht allein wegen eines Gutachtens automatisch erforderlich. Wenn tatsächlich neue Schilder gebraucht werden, vergleiche die bestätigten Angaben mit dem verfügbaren Shopprodukt. Amtliche Plaketten gehören nicht zum Lieferumfang."
      ],
      "items": [
        "Anlass und Genehmigungsstand klären.",
        "Geeignete Prüfstelle und Unterlagen abstimmen.",
        "Gutachten und mögliche weitere Entscheidungen abschließen.",
        "Zulassung und tatsächlichen Schilderbedarf prüfen."
      ]
    }
  ],
  "faq": [
    {
      "question": "Ist das Vollgutachten bereits die Betriebserlaubnis?",
      "answer": "Nein. Es ist der technische Nachweis für die behördliche Entscheidung. Die Betriebserlaubnis wird von der zuständigen Behörde erteilt."
    },
    {
      "question": "Brauche ich nach jedem Umbau ein Vollgutachten?",
      "answer": "Nein. Die Art der Änderung, vorhandene Genehmigungen und die Voraussetzungen des § 19 StVZO sind entscheidend. Kläre das vor dem Umbau mit einer geeigneten Prüfstelle."
    },
    {
      "question": "Muss ich danach immer neue Kennzeichen kaufen?",
      "answer": "Nein. Nur ein tatsächlicher Wechsel der Kombination oder Ausführung beziehungsweise ein Ersatzbedarf macht neue Schilder erforderlich."
    }
  ],
  "sources": [
    {
      "label": "StVZO § 21: Verfahren und Gutachten",
      "href": "https://www.gesetze-im-internet.de/stvzo_2012/__21.html"
    },
    {
      "label": "StVZO § 19: Wirksamkeit der Betriebserlaubnis",
      "href": "https://www.gesetze-im-internet.de/stvzo_2012/__19.html"
    },
    {
      "label": "FZV § 12: Kennzeichenausführung",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__12.html"
    }
  ],
  "related": [
    "drittland-import-zulassung",
    "wohnmobil-umbau-zulassung",
    "zulassung-abgelehnt-gruende",
    "reifen-felgen-eintragen",
    "autogas-umbau-fahrzeugpapiere"
  ],
  "cta": "Dein Verfahren ist geklärt und neue Schilder sind erforderlich? Wähle die bestätigte Kombination im passenden angebotenen Format."
},
{
  "slug": "wohnmobil-umbau-zulassung",
  "title": "Zum Wohnmobil umgebaut: Fahrzeugpapiere und Kennzeichen richtig einplanen",
  "teaser": "Vom geplanten Ausbau über die Begutachtung bis zur Änderung der Fahrzeugpapiere: Wann neue Kennzeichenschilder nötig sind und wann nicht.",
  "category": "Zulassung vorbereiten",
  "reviewedAt": "2026-11-24",
  "intro": [
    "Aus einem Transporter soll ein Wohnmobil werden. Die entscheidende Frage ist zunächst die genehmigte Fahrzeugart. Ein fertiger Innenausbau oder eine passende Versicherung allein ersetzen die technische und behördliche Klärung nicht."
  ],
  "takeaway": "Stimme den Ausbau vorab mit einer geeigneten Prüfstelle ab. Ändert sich die genehmigte Fahrzeugart, sind Betriebserlaubnis und Fahrzeugpapiere zu klären. Neue Kennzeichenschilder werden dadurch nicht automatisch erforderlich.",
  "sections": [
    {
      "id": "planung",
      "title": "1. Vor dem Ausbau die Prüfbarkeit klären",
      "paragraphs": [
        "Zeige der Prüfstelle deine Ausbauplanung und die vorhandenen Fahrzeugpapiere. Besprich insbesondere Sitzplätze, Befestigungen, Gewichte und die geplante Nutzung. Nachträgliche Änderungen an einem fertigen Ausbau können deutlich aufwendiger sein als eine rechtzeitige Abstimmung.",
        "Dieser Ratgeber ist keine Bauanleitung für Gas-, Elektro- oder Sitzanlagen. Lass solche Anforderungen für das konkrete Fahrzeug fachlich prüfen. Eine vermeintlich erfolgreiche Lösung bei einem anderen Transporter ist keine Genehmigung für deinen Umbau."
      ]
    },
    {
      "id": "ausstattung",
      "title": "2. Wohnausstattung und Fahrplätze auseinanderhalten",
      "paragraphs": [
        "Die GTÜ nennt für die Anerkennung als Wohnmobil unter anderem Sitzgelegenheiten und Tisch, Schlafmöglichkeiten, eine dauerhaft eingebaute Kochmöglichkeit sowie Stauraum. Die Wohnausstattung ist grundsätzlich fest anzubringen; für den Tisch gibt es eine Ausnahme.",
        "Ein Platz, auf dem du im Stand sitzen kannst, ist deshalb noch kein zugelassener Sitzplatz für die Fahrt. Die GTÜ weist hierfür gesondert auf die Anforderungen an Sitze und Gurtverankerungen hin. Kläre auch, ob herausnehmbare Einrichtungen überhaupt zu einer Änderung der Fahrzeugart führen."
      ]
    },
    {
      "id": "erlaubnis",
      "title": "3. Änderung der Fahrzeugart technisch und behördlich behandeln",
      "paragraphs": [
        "Nach § 19 Absatz 2 StVZO erlischt die Betriebserlaubnis unter anderem, wenn Änderungen die genehmigte Fahrzeugart verändern. Für die Erteilung einer neuen Betriebserlaubnis verweist die Vorschrift auf § 21. Die Behörde benötigt dafür den erforderlichen technischen Nachweis.",
        "Unterscheide also zwischen einem geprüften Umbau und der anschließenden behördlichen Bearbeitung. Lass dir erklären, welche Unterlagen du nach der Begutachtung erhältst und welcher Antrag noch zu stellen ist. Ein Kennzeichenschild am Fahrzeug beantwortet nicht, ob der Umbau bereits zulässig dokumentiert ist."
      ]
    },
    {
      "id": "papiere",
      "title": "4. Fahrzeugdaten und Versicherung aktualisieren",
      "paragraphs": [
        "§ 15 FZV verlangt die unverzügliche Mitteilung bestimmter Änderungen, darunter Änderungen der Fahrzeugklasse und weiterer technischer Daten. Welche Angaben dein Umbau betrifft, ergibt sich aus dem tatsächlichen Ergebnis der Begutachtung.",
        "Kläre mit der Zulassungsstelle, welche Fahrzeugpapiere vorzulegen und zu ändern sind. Informiere den Versicherer über die geänderte Nutzung und die Fahrzeugdaten. Nenne ihm die bestätigten Angaben statt einer geschätzten Einstufung. Steuer- oder Beitragsersparnisse lassen sich aus dem Wort Wohnmobil allein nicht verlässlich ableiten."
      ]
    },
    {
      "id": "kennzeichen",
      "title": "5. Bestehende Kombination oder neue Schilder?",
      "paragraphs": [
        "Wenn die bisherige Kombination und Schildausführung weitergeführt werden können und die Schilder in Ordnung sind, ist ein Neukauf nicht allein wegen der Umschreibung nötig. Kläre diese Frage im Zulassungsvorgang, bevor du Ersatz bestellst.",
        "Möchtest du zusätzlich etwa auf eine bestätigte Saison-Ausführung wechseln, ist das ein eigener Schritt. Prüfe dann Zeitraum, Kombination und Platz für das Saisonfeld. Erst bei geklärter Zuteilung bestellst du die passenden Schilder. Der Shop liefert keine Betriebserlaubnis, Fahrzeugpapiere oder amtlichen Plaketten."
      ],
      "items": [
        "Ausbau mit geeigneter Prüfstelle vorab besprechen.",
        "Genehmigte Fahrplätze von Wohnsitzen im Stand unterscheiden.",
        "Gutachten und behördliche Änderung abschließen.",
        "Versicherung und tatsächlichen Schildbedarf klären."
      ]
    }
  ],
  "faq": [
    {
      "question": "Brauche ich nach der Wohnmobil-Umschreibung eine neue Nummer?",
      "answer": "Nicht automatisch. Kläre im konkreten Vorgang, ob Kombination und Ausführung weitergeführt werden. Nur die Umschreibung begründet keinen pauschalen Schilderneukauf."
    },
    {
      "question": "Reicht eine lose Campingausstattung für die Umschreibung?",
      "answer": "Das solltest du nicht voraussetzen. Die technische Einordnung hängt von der vorgesehenen Ausstattung und dem konkreten Ausbau ab. Stimme sie vorab mit einer geeigneten Prüfstelle ab."
    },
    {
      "question": "Kann der Schilderanbieter die Umschreibung erledigen?",
      "answer": "Die Schilderbestellung umfasst hier die Prägung und Lieferung der angebotenen Ausführung. Begutachtung und Änderung der Fahrzeugpapiere erfolgen separat."
    }
  ],
  "sources": [
    {
      "label": "StVZO § 19: Änderung der Fahrzeugart",
      "href": "https://www.gesetze-im-internet.de/stvzo_2012/__19.html"
    },
    {
      "label": "StVZO § 21: Betriebserlaubnis",
      "href": "https://www.gesetze-im-internet.de/stvzo_2012/__21.html"
    },
    {
      "label": "FZV § 15: Änderungen von Fahrzeugdaten",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__15.html"
    },
    {
      "label": "GTÜ: Technische Vorbereitung des Wohnmobilumbaus",
      "href": "https://www.gtue.de/de/privatkunden/technischer-dienst-fuer-privatkunden/umbau-zum-wohnmobil"
    }
  ],
  "related": [
    "vollgutachten-21-zulassung",
    "auto-anmelden-unterlagen",
    "saisonkennzeichen-zeitraum-aendern"
  ],
  "cta": "Falls du nach der behördlichen Klärung neue Schilder brauchst: Kontrolliere Kombination, Ausführung und Stückzahl im Konfigurator."
},
{
  "slug": "auto-geerbt-ummelden",
  "title": "Auto geerbt: Ummeldung und Kennzeichen nach einem Todesfall",
  "teaser": "Welche Punkte du bei einem geerbten Auto zuerst klärst: Berechtigung, Fahrzeugpapiere, Versicherung, Halterwechsel und möglicher Schilderbedarf.",
  "category": "Besondere Zulassungsfälle",
  "reviewedAt": "2026-11-23",
  "intro": [
    "Nach einem Todesfall müssen oft viele Dinge gleichzeitig geregelt werden. Beim Auto hilft eine klare Reihenfolge: Wer darf über das Fahrzeug verfügen, wer wird künftig Halter und sind die Unterlagen vollständig? Neue Kennzeichenschilder sind erst danach eine mögliche Aufgabe."
  ],
  "takeaway": "Kläre den Halterwechsel oder die Außerbetriebsetzung zeitnah mit der Zulassungsstelle. Fehlende Nachlass- oder Fahrzeugunterlagen lassen sich nicht durch neue Schilder ersetzen. Die bisherige Kombination muss nicht allein wegen des Todesfalls wechseln.",
  "sections": [
    {
      "id": "entscheidung",
      "title": "1. Künftige Nutzung und Berechtigung klären",
      "paragraphs": [
        "Soll das Fahrzeug weitergenutzt, verkauft oder zunächst abgemeldet werden? Stimme diese Frage bei mehreren Beteiligten ab. Die Zulassungsbehörde entscheidet keine privatrechtlichen Erbstreitigkeiten; das stellt § 14 Absatz 7 FZV klar.",
        "Besitz der Fahrzeugschlüssel allein ist kein ausreichender Grund, sich über ungeklärte Rechte hinwegzusetzen. Frage die Behörde, welche Nachweise sie für den konkreten Vorgang und die handelnde Person benötigt. Bei Streit über den Nachlass muss zuerst die Berechtigung geklärt werden."
      ]
    },
    {
      "id": "halter",
      "title": "2. Halterdaten nicht unverändert weiterlaufen lassen",
      "paragraphs": [
        "§ 15 FZV regelt die Mitteilungspflichten bei einem Halterwechsel. Der Landkreis Meißen weist für den Todesfall ausdrücklich auf die unverzügliche Umschreibung auf den neuen Halter oder die Außerbetriebsetzung hin.",
        "Plane deshalb nicht mit einer frei angenommenen mehrmonatigen Schonfrist. Melde dich bei der zuständigen Stelle, wenn Dokumente noch fehlen. Kläre mit dem Versicherer außerdem den weiteren Schutz und den benötigten Versicherungsnachweis. Ein vorhandenes Schild beantwortet diese Fragen nicht."
      ]
    },
    {
      "id": "unterlagen",
      "title": "3. Fahrzeug- und Nachlassunterlagen zusammenstellen",
      "paragraphs": [
        "Für die Vorbereitung gehören die Zulassungsbescheinigungen Teil I und II, Identitätsnachweise, der erforderliche HU-Nachweis und die Angaben zur Versicherung zusammen. Je nach Vorgang kommen SEPA-Mandat, Vollmacht und Nachweise zur Verfügungsberechtigung hinzu.",
        "Ein Erbschein ist nicht pauschal als Pflicht für jeden denkbaren Zulassungsvorgang anzunehmen. Lass dir die konkrete Liste geben. Meißen nennt ihn etwa ausdrücklich bei nicht mehr auffindbaren Fahrzeugpapieren des Verstorbenen und verlangt bei mehreren Erben eine bestimmte bevollmächtigte Person für das dort beschriebene Verfahren."
      ],
      "items": [
        "Vorhandene Fahrzeugpapiere vollständig suchen.",
        "Künftigen Halter und vertretende Person festlegen.",
        "Behördlich benötigte Nachlassnachweise erfragen.",
        "Versicherung und HU-Nachweis klären."
      ]
    },
    {
      "id": "kombination",
      "title": "4. Kennzeichen behalten oder ändern",
      "paragraphs": [
        "Bei einem weiterhin zugelassenen Fahrzeug ist die Kennzeichenmitnahme beim Halterwechsel grundsätzlich möglich. Die Behörde muss den Vorgang trotzdem bearbeiten. Ein Halterwechsel ist nicht dadurch erledigt, dass die vorhandenen Schilder am Auto bleiben.",
        "Ist das Auto bereits außer Betrieb gesetzt, prüfst du die erneute Zuteilung gesondert. Der vorhandene Mitnahmeratgeber erklärt diese Abgrenzung. Bestelle erst neue Schilder, wenn eine neue Kombination, andere Ausführung oder ein tatsächlicher Ersatzbedarf feststeht."
      ]
    },
    {
      "id": "termin",
      "title": "5. Einen realistischen Ablauf vereinbaren",
      "paragraphs": [
        "Fehlen Fahrzeugpapiere, kann insbesondere der Ersatz von Teil II ein Aufbietungsverfahren erfordern. Vereinbare dann keinen festen Schilder- und Zulassungstermin auf Grundlage einer geratenen Bearbeitungsdauer.",
        "Bestätige zunächst die vollständigen Unterlagen und die Kombination. Danach kannst du bei Bedarf die passenden Schilder bestellen. Die amtlichen Plaketten und die Umschreibung bleiben behördliche Schritte; die Schilderlieferung umfasst sie nicht."
      ]
    }
  ],
  "faq": [
    {
      "question": "Braucht das geerbte Auto zwingend eine neue Nummer?",
      "answer": "Nein. Bei einem zugelassenen Fahrzeug kann die bisherige Kombination beim Halterwechsel grundsätzlich beibehalten werden. Der konkrete Zulassungsstatus und der behördliche Vorgang sind trotzdem zu prüfen."
    },
    {
      "question": "Was ist bei mehreren Erben wichtig?",
      "answer": "Kläre, wer wirksam handeln darf, und welche Vollmachten oder Nachweise die Behörde benötigt. Eine Schilderbestellung löst keinen Streit über die Verfügungsberechtigung."
    },
    {
      "question": "Soll ich fehlende Papiere durch eine neue Schilderbestellung überbrücken?",
      "answer": "Nein. Melde fehlende Fahrzeugpapiere und kläre deren Ersatz. Insbesondere bei Teil II kann ein gesondertes Aufbietungsverfahren nötig sein."
    }
  ],
  "sources": [
    {
      "label": "FZV § 15: Halterwechsel",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__15.html"
    },
    {
      "label": "FZV § 14: Verfügungsberechtigung und Dokumentenersatz",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__14.html"
    },
    {
      "label": "Landkreis Meißen: Fahrzeughalter verstorben",
      "href": "https://www.kreis-meissen.de/Landratsamt/Die-Verwaltung/Dezernat-Verwaltung/Kreisverkehrsamt/Kfz-Zulassung/"
    },
    {
      "label": "BayernPortal: Umschreibung und Kennzeichenmitnahme",
      "href": "https://www.bayernportal.de/dokumente/leistung/0666452463?localize=false"
    }
  ],
  "related": [
    "auto-ummelden-kennzeichen-behalten",
    "fahrzeugpapiere-verloren",
    "auto-anmelden-vollmacht"
  ],
  "cta": "Die Behörde hat die Kombination geklärt und neue Schilder sind wirklich nötig? Wähle die passende Ausführung und Stückzahl. Nachlassklärung, Umschreibung und amtliche Plaketten sind nicht Teil der Bestellung."
},
{
  "slug": "auto-auf-firma-zulassen",
  "title": "Auto auf die Firma zulassen: Unternehmensdaten und Kennzeichen vorbereiten",
  "teaser": "Für Firmenfahrzeuge zählen neben den Fahrzeugpapieren auch Rechtsform, Anschrift und Vertretung. So vermeidest du unterschiedliche Angaben im Zulassungsprozess.",
  "category": "Besondere Zulassungsfälle",
  "reviewedAt": "2026-11-23",
  "intro": [
    "Das Fahrzeug soll auf dein Unternehmen zugelassen werden. Dann reicht die private Standardliste häufig nicht. Die Zulassungsstelle muss nachvollziehen können, welche Person oder Organisation Halter wird und wer für sie handeln darf."
  ],
  "takeaway": "Kläre zuerst den genauen Halter und die zuständige Behörde. Unternehmensnachweise, Vertretung, eVB und Reservierung müssen zusammenpassen. Die Anschrift für die Schilderlieferung ist davon getrennt.",
  "sections": [
    {
      "id": "rechtsform",
      "title": "1. Den Halter eindeutig benennen",
      "paragraphs": [
        "§ 6 FZV unterscheidet bei den Halterdaten zwischen natürlichen Personen, juristischen Personen und Vereinigungen. Für beruflich selbstständige Halter kommen Angaben zu Beruf oder Gewerbe hinzu.",
        "Ein Werbename auf der Website ist deshalb nicht automatisch die vollständige Halterbezeichnung. Übernimm die benötigten Angaben aus deinen maßgeblichen Unterlagen. Kläre bei Einzelunternehmen, Gesellschaften oder nicht eingetragenen Vereinigungen, welche Form die Behörde verlangt."
      ]
    },
    {
      "id": "zustaendig",
      "title": "2. Sitz und Niederlassung prüfen",
      "paragraphs": [
        "Nach § 75 FZV ist bei juristischen Personen, Gewerbetreibenden und Selbstständigen mit festem Betriebssitz grundsätzlich die Behörde des Sitzes beziehungsweise der beteiligten Niederlassung zuständig.",
        "Der private Wohnort einer angestellten Fahrerin oder eines Geschäftsführers ist daher nicht automatisch der richtige Ausgangspunkt. Halte fest, welche betriebliche Anschrift für diesen Vorgang maßgeblich ist. Eine gewünschte Buchstabenkombination aus einem anderen Bezirk ändert die Zuständigkeit nicht."
      ]
    },
    {
      "id": "nachweise",
      "title": "3. Organisation und Vertretung nachweisen",
      "paragraphs": [
        "Berlin nennt zusätzlich zu den Fahrzeugunterlagen beispielsweise Registerauszüge und einen Nachweis der örtlichen Anschrift. Bei nicht registrierten Organisationen können Errichtungsunterlagen erforderlich sein. Das ist eine örtliche Orientierung, keine abschließende Liste für jede Rechtsform und Behörde.",
        "Prüfe außerdem, wer unterschreiben darf und wer den Termin wahrnimmt. Eine Mitarbeiterin mit Fahrzeugschlüsseln ist nicht allein dadurch vertretungsberechtigt. Bereite eine passende Vollmacht und die verlangten Identitätsnachweise vor."
      ],
      "items": [
        "Vollständige Halterbezeichnung festhalten.",
        "Passende Organisations- und Anschriftnachweise beschaffen.",
        "Vertretungsberechtigung prüfen.",
        "Vollmacht und Ausweisnachweise nach örtlicher Vorgabe vorbereiten."
      ]
    },
    {
      "id": "abgleich",
      "title": "4. Versicherung, Steuer und Reservierung abgleichen",
      "paragraphs": [
        "Stimme den Versicherungsnachweis mit der Versicherung auf den vorgesehenen Halter und die Nutzung ab. Ein betrieblicher Einsatz, etwa Vermietung, kann weitere Anforderungen auslösen. Die allgemeine Firmenzulassung ersetzt solche Prüfungen nicht.",
        "Kontrolliere das erforderliche SEPA-Mandat und die Berechtigung für das angegebene Konto. Prüfe bei einer Wunschreservierung die Halterangaben. Unterschiedliche Schreibweisen oder die Reservierung auf eine andere Person solltest du vor dem Termin klären, nicht erst nach der Prägung."
      ]
    },
    {
      "id": "bestellen",
      "title": "5. Schilder eindeutig dem Fahrzeug zuordnen",
      "paragraphs": [
        "Für mehrere Firmenfahrzeuge lohnt eine einfache interne Liste: Fahrzeug-Identifizierungsnummer, bestätigte Kombination, Kennzeichenart, Maße und benötigte Anzahl. So vermeidest du, eine richtige Kombination dem falschen Auto zuzuordnen.",
        "Prüfe Liefer- und Rechnungsdaten getrennt von den behördlichen Halterdaten. Bestelle nur die im Shop angebotenen Ausführungen; eine Flottenverwaltung oder ein Zulassungsdienst ist damit nicht zugesagt. Die amtlichen Plaketten und die Zulassung folgen im dafür vorgesehenen Verfahren."
      ]
    }
  ],
  "faq": [
    {
      "question": "Kann ich einfach den Namen meines Betriebs als Halter verwenden?",
      "answer": "Die erforderlichen Halterangaben richten sich nach Rechtsform und behördlichem Verfahren. Ein bloßer Markenname reicht nicht automatisch. Kläre die vollständige Bezeichnung vor Reservierung und Zulassung."
    },
    {
      "question": "Darf ein Mitarbeiter den Termin übernehmen?",
      "answer": "Eine Vertretung ist grundsätzlich möglich, wenn die erforderliche Vollmacht, Vertretungsberechtigung und Identitätsnachweise vorliegen. Prüfe die örtliche Unterlagenliste."
    },
    {
      "question": "Ist die Schilderbestellung zugleich eine Firmenzulassung?",
      "answer": "Nein. Du bestellst die physischen Schilder. Organisationsprüfung, Versicherung, Steuerverfahren, Zulassung und amtliche Plaketten bleiben separate Schritte."
    }
  ],
  "sources": [
    {
      "label": "FZV § 6: Halterdaten im Zulassungsantrag",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__6.html"
    },
    {
      "label": "FZV § 75: örtliche Zuständigkeit",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__75.html"
    },
    {
      "label": "Berlin: Fahrzeuge auf Unternehmen und Vereinigungen zulassen",
      "href": "https://www.berlin.de/labo/mobilitaet/kfz-zulassung/artikel.274551.php"
    },
    {
      "label": "FZV § 15: besondere Verwendungen und Änderungen",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__15.html"
    }
  ],
  "related": [
    "auto-anmelden-vollmacht",
    "sepa-mandat-kfz-steuer",
    "wunschkennzeichen-reservieren",
    "taxi-zulassung-vorbereiten"
  ],
  "cta": "Unternehmensdaten und Kombination bestätigt? Konfiguriere die passenden angebotenen Schilder und kontrolliere die Zuordnung zum Fahrzeug vor der Bestellung."
},
{
  "slug": "fahrzeug-auf-minderjaehrige-zulassen",
  "title": "Fahrzeug auf Minderjährige zulassen: Was vor der Kennzeichenbestellung zu klären ist",
  "teaser": "Zustimmung der Eltern allein genügt nicht in jedem Fall. Prüfe Haltereigenschaft, örtliche Voraussetzungen, Versicherung und die passenden Unterlagen.",
  "category": "Besondere Zulassungsfälle",
  "reviewedAt": "2026-11-23",
  "intro": [
    "Das erste Motorrad oder Auto soll auf eine Person unter 18 zugelassen werden. Dafür ist eine gesonderte Prüfung nötig. Eine Wunschkennzeichenreservierung oder bezahlte Schilderbestellung bestätigt noch nicht, dass die Zulassung auf diese Person möglich ist."
  ],
  "takeaway": "Lass die Zulassungsstelle zuerst den konkreten Fall prüfen. Erforderliche Zustimmung, Identitätsnachweise und gegebenenfalls Fahrerlaubnis oder besondere Nachweise müssen vorliegen. Ein Haltereintrag erlaubt nicht automatisch das Fahren.",
  "sections": [
    {
      "id": "rollen",
      "title": "1. Halter und Fahrer nicht gleichsetzen",
      "paragraphs": [
        "Die Haltereigenschaft und die Fahrerlaubnis sind unterschiedliche Dinge. Wer ein Fahrzeug halten darf, darf es deshalb noch nicht selbst fahren. Für jede Fahrt müssen die passende Fahrerlaubnis und ihre Auflagen eingehalten werden.",
        "Die Berliner Zulassungsbehörde beschreibt Halter als Personen, die das Fahrzeug auf eigene Rechnung gebrauchen und über seine Verwendung bestimmen. Für Minderjährige nennt sie besondere Ausnahmefälle. Übertrage deshalb eine Aussage zur Zulassung Erwachsener ohne Führerschein nicht ungeprüft auf ein Kind oder einen Jugendlichen."
      ]
    },
    {
      "id": "fall",
      "title": "2. Die örtlichen Voraussetzungen vorab prüfen",
      "paragraphs": [
        "Berlin nennt für Minderjährige beispielsweise den Besitz der für das zulassungspflichtige Fahrzeug erforderlichen Fahrerlaubnis bei entsprechender Haltereigenschaft oder bestimmte Voraussetzungen aufgrund einer Schwerbehinderung. Hinzu kommt die schriftliche Zustimmung der Erziehungsberechtigten.",
        "Das ist eine konkrete Behördenauskunft. Frage deine zuständige Stelle nach deinem Fahrzeug und deiner Situation. Ein Hinweis wie „mit 17“ ist allein zu ungenau: Fahrzeugklasse, vorhandene Fahrerlaubnis und weitere Voraussetzungen müssen zusammen betrachtet werden."
      ]
    },
    {
      "id": "zustimmung",
      "title": "3. Zustimmung und Nachweise vorbereiten",
      "paragraphs": [
        "Nutze das Formular deiner Behörde, wenn eines vorgesehen ist. Kläre, welche gesetzlichen Vertreter zustimmen müssen und wie eine abweichende Vertretungslage nachgewiesen wird. Fehlende Unterschriften solltest du vor dem Termin bemerken.",
        "Berlin verlangt im beschriebenen Verfahren auch die Originalausweise der Erziehungsberechtigten. Andere Stellen können eigene Vorgaben zur Vorlage haben. Verlasse dich daher nicht darauf, dass eine Handyaufnahme überall ausreicht."
      ],
      "items": [
        "Konkreten Fall mit der Zulassungsstelle abstimmen.",
        "Zustimmungsformular und nötige Unterschriften prüfen.",
        "Identitäts- und Vertretungsnachweise zusammenstellen.",
        "Erforderliche Fahrerlaubnis oder besondere Nachweise bereithalten."
      ]
    },
    {
      "id": "versicherung",
      "title": "4. Versicherung und Halterangaben abstimmen",
      "paragraphs": [
        "Teile dem Versicherer mit, wer Halter und wer Fahrer sein soll. Der Versicherungsnachweis muss zum vorgesehenen Zulassungsvorgang passen. Eine Versicherung auf ein Elternteil beantwortet nicht automatisch die Frage, auf wen das Fahrzeug zugelassen werden kann.",
        "Prüfe auch das gegebenenfalls erforderliche SEPA-Mandat und die Berechtigung zur Kontonutzung. Die Zustimmung zur Zulassung, der Versicherungsvertrag und der Schilderkauf sind verschiedene Vorgänge."
      ]
    },
    {
      "id": "bestellung",
      "title": "5. Erst nach Klärung die Schilder auswählen",
      "paragraphs": [
        "Wenn die Zulassung auf die minderjährige Person möglich und die Kombination bestätigt ist, wählst du die richtige Fahrzeug- und Kennzeichenart. Ein Motorrad benötigt eine andere Schildform als ein Pkw. Der aktuelle Motorradkonfigurator bietet 180 × 200 Millimeter.",
        "Eine Reservierungsbestätigung oder ein fertiges Schild ersetzt keine Prüfung der Haltereigenschaft. Bestelle deshalb nicht vorsorglich eine Wunschkombination in der Hoffnung, sie werde anschließend schon zugeteilt. Amtliche Plaketten und Zulassung bleiben gesondert."
      ]
    }
  ],
  "faq": [
    {
      "question": "Reicht die Zustimmung der Eltern immer aus?",
      "answer": "Nein. Die Behörde prüft zusätzlich die Voraussetzungen des konkreten Falls. Kläre diese vor einer personalisierten Schilderbestellung."
    },
    {
      "question": "Darf die minderjährige Person mit dem zugelassenen Fahrzeug automatisch fahren?",
      "answer": "Nein. Die passende Fahrerlaubnis und ihre Auflagen müssen unabhängig vom Haltereintrag eingehalten werden."
    },
    {
      "question": "Sollte ich zuerst das Wunschkennzeichen prägen lassen?",
      "answer": "Kläre zunächst Zulässigkeit, Halterangaben und Kombination. Erst danach ist die Bestellung der passenden Schilder sinnvoll."
    }
  ],
  "sources": [
    {
      "label": "Berlin: persönliche Voraussetzungen und Minderjährige",
      "href": "https://www.berlin.de/labo/mobilitaet/kfz-zulassung/artikel.274605.php"
    },
    {
      "label": "Berlin: Erstzulassung und Unterlagen",
      "href": "https://service.berlin.de/dienstleistung/120882/"
    },
    {
      "label": "FZV § 6: Zulassungsantrag und Halterdaten",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__6.html"
    }
  ],
  "related": [
    "auto-anmelden-unterlagen",
    "wunschkennzeichen-reservieren",
    "kennzeichengroessen",
    "leichtkraftrad-kennzeichen-zuteilung"
  ],
  "cta": "Der konkrete Zulassungsfall und die Kombination sind bestätigt? Wähle die passende angebotene Schildart und prüfe die Vorschau. Die Schilderbestellung ersetzt weder Zustimmung noch Zulassung."
},
{
  "slug": "fahrzeugpapiere-verloren",
  "title": "Fahrzeugschein oder Fahrzeugbrief verloren: Ersatz vor dem Zulassungstermin",
  "teaser": "Was du bei fehlenden Fahrzeugpapieren klären musst und warum der Ersatz von Teil II länger dauern kann. Neue Kennzeichenschilder sind nicht automatisch nötig.",
  "category": "Besondere Zulassungsfälle",
  "reviewedAt": "2026-11-23",
  "intro": [
    "Vor dem Zulassungstermin fehlt plötzlich ein Fahrzeugdokument. Zuerst musst du feststellen, ob Teil I, Teil II oder beide fehlen. Die Ersatzverfahren unterscheiden sich. Eine bereits bezahlte Schilderbestellung beschleunigt diese Verfahren nicht."
  ],
  "takeaway": "Melde den Verlust der zuständigen Stelle und kläre die Ersatzausstellung. Bei Teil II ist ein Aufbietungsverfahren mit Frist vorgesehen. Allein durch Papierverlust ändert sich die Kennzeichenkombination nicht automatisch.",
  "sections": [
    {
      "id": "finden",
      "title": "1. Das fehlende Dokument bestimmen",
      "paragraphs": [
        "Teil I ist der Fahrzeugschein, Teil II wird häufig Fahrzeugbrief genannt. Suche getrennt nach beiden Dokumenten. Frage bei Finanzierung oder Leasing zuerst nach, ob Teil II planmäßig bei der Bank oder Leasinggesellschaft verwahrt wird.",
        "Ein verwahrter Fahrzeugbrief ist nicht verloren. Kläre in diesem Fall dessen Bereitstellung für den konkreten Vorgang. Erkläre gegenüber der Behörde genau, was fehlt und wann es zuletzt vorlag; vermische Verlust und vermuteten Diebstahl nicht."
      ]
    },
    {
      "id": "teil-eins",
      "title": "2. Fehlenden Teil I ersetzen lassen",
      "paragraphs": [
        "Die Berliner Dienstleistungsbeschreibung verlangt, Verlust oder Diebstahl von Teil I unverzüglich mitzuteilen und ein Ersatzdokument zu beantragen. Frage deine zuständige Behörde nach Unterlagen, Identitätsnachweis und dem möglichen Verfahren.",
        "§ 13 FZV regelt die Mitführpflicht für Teil I. Ein Foto auf dem Smartphone ist nicht einfach ein gleichwertiger Ersatz für das vorgeschriebene Dokument. Kläre eine Zwischenlösung direkt mit der Behörde, statt eine Fahrberechtigung aus der Terminbuchung abzuleiten."
      ]
    },
    {
      "id": "teil-zwei",
      "title": "3. Bei Teil II zusätzliche Zeit einplanen",
      "paragraphs": [
        "Nach § 14 Absatz 5 FZV ist der Verlust einer ausgefertigten Zulassungsbescheinigung Teil II unverzüglich der zuständigen Zulassungsbehörde anzuzeigen. Das Kraftfahrt-Bundesamt bietet das Dokument mit einer Vorlagefrist auf. Erst nach Ablauf dieser Frist darf ein neues ausgefertigt werden.",
        "Berlin weist darauf hin, dass auch ein geplanter Halterwechsel erst nach Abschluss des Aufbietungsverfahrens erfolgen kann. Verlasse dich nicht auf einen bundesweit garantierten Fertigstellungstag. Frage nach dem tatsächlichen Stand, bevor du Fahrzeugübergabe und Zulassung endgültig terminierst."
      ]
    },
    {
      "id": "nachweise",
      "title": "4. Den Ersatzantrag vollständig vorbereiten",
      "paragraphs": [
        "Kläre, welche Erklärung zum Verlust nötig ist und wer sie abgeben muss. Berlin nennt beim Verlust von Teil II eine Versicherung an Eides statt durch den letzten Gewahrsamsinhaber; bei Diebstahl das Anzeigeprotokoll. Die konkrete Abgabeform ist mit der zuständigen Stelle zu klären.",
        "Bereite vorhandene Fahrzeugdokumente, Identitätsnachweise und gegebenenfalls eine Vollmacht vor. Fehlen beide Teile oder sind Nachlassfragen beteiligt, sage das bereits bei der Terminvereinbarung. So kann die Behörde den richtigen Ablauf nennen."
      ],
      "items": [
        "Teil I, Teil II oder beide als fehlend benennen.",
        "Verwahrung bei Bank oder Leasinggeber ausschließen.",
        "Verlust beziehungsweise Diebstahl zutreffend erklären.",
        "Benötigte Originale und Vertretungsnachweise bereitlegen."
      ]
    },
    {
      "id": "schilder",
      "title": "5. Kennzeichenschilder erst bei echtem Bedarf bestellen",
      "paragraphs": [
        "Papierverlust ist kein Kennzeichendiebstahl. Solange die Schilder vorhanden sind und die Kombination unverändert bleibt, ist ein neuer Satz nicht allein wegen des Ersatzdokuments erforderlich.",
        "Wenn im anschließenden Zulassungsvorgang eine neue Kombination oder Ausführung vorgesehen ist, warte mit der Bestellung auf deren Bestätigung. Wiedergefundene alte Dokumente nach einer Ersatzausstellung gibst du der zuständigen Behörde zurück; verwende nicht beide Fassungen parallel."
      ]
    }
  ],
  "faq": [
    {
      "question": "Brauche ich wegen eines verlorenen Fahrzeugscheins neue Schilder?",
      "answer": "Nicht automatisch. Der Dokumentenersatz ist vom Schilderersatz getrennt. Kläre neue Schilder nur bei geänderter Kombination, Ausführung oder tatsächlicher Beschädigung."
    },
    {
      "question": "Warum dauert ein neuer Fahrzeugbrief länger?",
      "answer": "Für verlorenen Teil II schreibt die FZV ein Aufbietungsverfahren mit Vorlagefrist vor. Die neue Bescheinigung darf erst nach Ablauf der Frist ausgefertigt werden."
    },
    {
      "question": "Was mache ich mit wiedergefundenen Papieren?",
      "answer": "Nach Ersatzausstellung sind wiedergefundene alte Dokumente der zuständigen Behörde abzugeben. Verwende sie nicht zusätzlich zum Ersatzdokument."
    }
  ],
  "sources": [
    {
      "label": "FZV § 13: Teil I und wiedergefundene Dokumente",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__13.html"
    },
    {
      "label": "FZV § 14: Teil II und Aufbietung",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__14.html"
    },
    {
      "label": "Berlin: Ersatz für Teil I",
      "href": "https://service.berlin.de/dienstleistung/121575/"
    },
    {
      "label": "Berlin: Ersatz für Teil II",
      "href": "https://service.berlin.de/dienstleistung/121584/"
    }
  ],
  "related": [
    "fahrzeugschein-fahrzeugbrief-unterschied",
    "zulassung-abgelehnt-gruende",
    "auto-geerbt-ummelden"
  ],
  "cta": "Die Ersatzpapiere und die neue Zuteilung sind geklärt? Falls du tatsächlich andere oder neue Schilder benötigst, bestelle die bestätigte Kombination in der passenden Ausführung."
},
{
  "slug": "kennzeichen-fahrzeugwechsel-uebernehmen",
  "title": "Kennzeichen auf ein neues Auto übernehmen: So planst du den Fahrzeugwechsel",
  "teaser": "Du möchtest deine bisherige Kombination am nächsten Auto nutzen? Kläre Freigabe, örtliche Reservierung und Schilderzustand vor der neuen Zulassung.",
  "category": "Zulassung und Schilderwahl",
  "reviewedAt": "2026-11-23",
  "intro": [
    "Dein bisheriges Auto wird verkauft oder abgemeldet. Die vertraute Kombination soll am nächsten Fahrzeug bleiben. Das kann möglich sein, ist aber kein bloßes Umstecken der Schilder. Die Zulassungsbehörde muss die Nummer für das andere Fahrzeug zuteilen."
  ],
  "takeaway": "Kläre den Fahrzeugwechsel vor der Abmeldung mit deiner zuständigen Behörde. Eine Reservierung für die spätere Wiederzulassung desselben Autos ist nicht automatisch eine Reservierung für das Folgefahrzeug. Neue Schilder erst bestellen, wenn Kombination, Ausführung und Ablauf feststehen.",
  "sections": [
    {
      "id": "unterschied",
      "title": "1. Fahrzeugwechsel von Kennzeichenmitnahme unterscheiden",
      "paragraphs": [
        "Nach § 9 FZV wird das Kennzeichen einem Fahrzeug zugeteilt. Hier geht es um zwei verschiedene Autos: das bisherige und das neu erworbene. Das ist ein anderer Fall als ein Umzug mit demselben Auto oder dessen Verkauf mit unverändertem Kennzeichen.",
        "Befestige die bisherigen gestempelten Schilder deshalb nicht einfach am neuen Auto. Auch wenn du beide Fahrzeuge besitzt, übernimmt das neue dadurch keine Zulassung. Wenn beide parallel eingesetzt werden sollen, brauchst du eine passende eigenständige Zulassungslösung; eine normale Kombination wird nicht durch einen zweiten Schilderkauf verdoppelt."
      ]
    },
    {
      "id": "behoerde",
      "title": "2. Den örtlichen Ablauf vor der Abmeldung klären",
      "paragraphs": [
        "Frage deine Behörde ausdrücklich nach der Übernahme auf ein anderes Fahrzeug. Nenne die bisherige Kombination, den künftigen Halter und die geplanten Termine. So kann die Stelle unterscheiden, ob du dasselbe Auto später wieder zulassen oder ein Folgefahrzeug anmelden willst.",
        "§ 16 Absatz 1 FZV sieht eine Reservierung für die Wiederzulassung des außer Betrieb gesetzten Fahrzeugs vor. Diese Regel ist kein allgemeiner Anspruch auf dieselbe Nummer am nächsten Auto. Verlass dich daher nicht auf ein pauschales Häkchen „Kennzeichen reservieren“, ohne den Zweck zu prüfen.",
        "München nennt beispielsweise für ein Folgefahrzeug die Online-Reservierung am Tag nach der Außerbetriebsetzung und weist auf den fehlenden Rechtsanspruch hin. Andere örtliche Abläufe musst du bei deiner Behörde erfragen. Eine bundesweit einheitliche Freigabestunde oder garantierte Sofortübernahme gibt es aus diesem Beispiel nicht."
      ],
      "items": [
        "Kann meine bisherige Kombination für das Folgefahrzeug zugeteilt werden?",
        "Wann wird sie freigegeben und wie kann ich sie reservieren?",
        "Müssen Abmeldung und neue Zulassung getrennt erfolgen?",
        "Welche Bestätigung soll ich zum Termin mitbringen?"
      ]
    },
    {
      "id": "umzug",
      "title": "3. Nach einem Umzug besonders genau hinsehen",
      "paragraphs": [
        "Eine aus einem anderen Zulassungsbezirk mitgenommene Nummer kann am bisherigen Fahrzeug erhalten bleiben. Daraus folgt nicht, dass die jetzt zuständige Behörde diese Kombination einem anderen Fahrzeug neu zuteilen darf.",
        "Das BayernPortal weist darauf hin, dass eine bei Umzug oder Halterwechsel in einen anderen Bezirk übernommene Nummer nach Außerbetriebsetzung nicht erneut zugeteilt werden kann. Kläre diesen Punkt unbedingt vor dem Abmelden. Die reine Eingabe der alten Kombination im Schilderkonfigurator schafft keinen Anspruch auf ihre Verwendung."
      ]
    },
    {
      "id": "bleche",
      "title": "4. Prüfen, ob die bisherigen Bleche weiter passen",
      "paragraphs": [
        "Eine identische Kombination bedeutet nicht zwingend identische Schilder. Vergleiche die benötigten Maße und die Kennzeichenart am neuen Fahrzeug. Ein erstmals gewählter E- oder H-Zusatz oder ein geänderter Saisonzeitraum verändert die erforderliche Ausführung.",
        "Sind die bisherigen Bleche intakt und für die neue Zuteilung geeignet, frage die Zulassungsstelle nach ihrer Wiederverwendung. Du musst nicht allein wegen des Fahrzeugwechsels neue kaufen. Die Behörde muss aber die amtlichen Kennzeichnungen für den neuen Vorgang korrekt anbringen beziehungsweise erneuern.",
        "Bewahre die alten Schilder bis zur Klärung auf. Löse Siegel nicht zum Weiterkleben ab. Beschädigte, schlecht lesbare oder unpassende Schilder ersetzt du nach Bestätigung der richtigen Kombination und Maße."
      ]
    },
    {
      "id": "ablauf",
      "title": "5. Übergabe und Neuzulassung zusammen planen",
      "paragraphs": [
        "Vereinbare mit einem Käufer klar, ob das alte Fahrzeug abgemeldet übergeben wird. Die organisatorische Absprache ersetzt weder die Abmeldung noch eine geeignete Lösung für die anschließende Überführung.",
        "Für das neue Fahrzeug brauchst du dessen eigene Unterlagen und den passenden Versicherungsnachweis. Eine Reservierungsbestätigung für die Nummer ersetzt diese Dokumente nicht. Plane genügend Zeit zwischen Freigabe, Bestätigung, gegebenenfalls Schilderlieferung und Zulassung."
      ],
      "items": [
        "Bisherigen Zulassungsstatus und Übergabe klären.",
        "Örtlichen Ablauf für die Kombination bestätigen lassen.",
        "Dokumente und eVB für das neue Fahrzeug bereithalten.",
        "Vorhandene Bleche auf Zustand, Maße und Zusätze prüfen.",
        "Nur nötige Schilder nach bestätigter Kombination bestellen.",
        "Amtliche Kennzeichnung und Zulassung abschließen."
      ]
    },
    {
      "id": "danach",
      "title": "6. Dienste dem richtigen Fahrzeug zuordnen",
      "paragraphs": [
        "Prüfe nach dem Wechsel Parkberechtigungen und andere kennzeichenbezogene Dienste. Auch bei gleicher Nummer kann dort noch das bisherige Fahrzeug hinterlegt sein. Kontrolliere vor allem Dienste, die zusätzlich Fahrzeugdaten verlangen.",
        "Die Umweltplakette gehört zum jeweiligen Fahrzeug und dessen Voraussetzungen. Übertrage sie nicht allein wegen der gleichen Nummer auf eine andere Windschutzscheibe. Gleiche Zeichenkombinationen bedeuten nicht automatisch gleiche Fahrzeugdaten."
      ]
    }
  ],
  "faq": [
    {
      "question": "Kann ich die Nummer gleichzeitig auf dem alten und neuen Auto nutzen?",
      "answer": "Nicht durch einfaches Umstecken oder Nachbestellen normaler Schilder. Die Nummer muss dem jeweiligen Fahrzeug behördlich zugeteilt sein. Kläre für parallele Nutzung eigenständige Zulassungen oder eine dafür vorgesehene Lösung."
    },
    {
      "question": "Muss ich neue Kennzeichenschilder kaufen?",
      "answer": "Nicht zwingend. Wenn Kombination, Ausführung, Maße und Zustand passen, kläre mit der Behörde die Wiederverwendung. Amtliche Plaketten sind trotzdem Teil des neuen Zulassungsvorgangs."
    },
    {
      "question": "Ist die Nummer nach der Abmeldung sicher für mich reserviert?",
      "answer": "Nicht automatisch für ein anderes Fahrzeug. Die gesetzliche Reservierung zur Wiederzulassung betrifft das außer Betrieb gesetzte Fahrzeug. Für das Folgefahrzeug musst du den örtlichen Ablauf ausdrücklich klären."
    }
  ],
  "sources": [
    {
      "label": "FZV § 9: fahrzeugbezogene Zuteilung",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__9.html"
    },
    {
      "label": "FZV § 16: Außerbetriebsetzung und Wiederzulassung",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__16.html"
    },
    {
      "label": "München: Wunschkennzeichen und Folgefahrzeug",
      "href": "https://stadt.muenchen.de/service/info/burgerburo-scheidplatz/1064481/"
    },
    {
      "label": "BayernPortal: Umschreibung und Wiederzulassung",
      "href": "https://www.bayernportal.de/dokumente/leistung/0666452463?localize=false"
    }
  ],
  "related": [
    "auto-ummelden-kennzeichen-behalten",
    "wunschkennzeichen-reservieren",
    "kennzeichen-beschaedigt-ersetzen"
  ],
  "cta": "Die Kombination für das neue Fahrzeug ist bestätigt und du brauchst neue Bleche? Prüfe Maße und Kennzeichenart und bestelle genau die benötigte Ausführung. Die Zulassung und amtlichen Plaketten erledigst du separat."
},
{
  "slug": "eu-import-deutsche-kennzeichen",
  "title": "EU-Gebrauchtwagen importiert: So bereitest du die deutschen Kennzeichen vor",
  "teaser": "Welche Unterlagen beim EU- oder EWR-Gebrauchtwagen wichtig sind und wann du deutsche Kennzeichenschilder für die Zulassung bestellen solltest.",
  "category": "Zulassung und Schilderwahl",
  "reviewedAt": "2026-11-23",
  "intro": [
    "Du hast einen bereits zugelassenen Gebrauchtwagen aus einem EU- oder EWR-Staat gekauft und möchtest ihn in Deutschland anmelden. Neben den üblichen Zulassungsunterlagen brauchst du Informationen aus dem Herkunftsland. Prüfe diese zuerst, bevor du deutsche Schilder prägen lässt."
  ],
  "takeaway": "Kläre ausländische Fahrzeugpapiere, technische Nachweise und den Zulassungsablauf mit deiner Behörde. Bestelle deutsche Schilder erst mit bestätigter Kombination und passendem Format. Der Kauf der Bleche meldet das Fahrzeug weder in Deutschland an noch im Herkunftsland ab.",
  "sections": [
    {
      "id": "umfang",
      "title": "1. Den richtigen Zulassungsfall wählen",
      "paragraphs": [
        "Dieser Ratgeber behandelt ein Fahrzeug, das bereits in einem EU- oder EWR-Staat zugelassen war. Neufahrzeuge und Einfuhren aus Drittstaaten können zusätzliche oder andere Anforderungen haben. Wähle bei der Terminbuchung deshalb den passenden Importvorgang.",
        "Halte Herkunftsland, Datum der ersten Zulassung und Fahrzeug-Identifizierungsnummer bereit. Frage deine Behörde, ob sie besondere Nachweise, Übersetzungen oder eine Vorführung benötigt. Die Anforderungen für deinen Einzelfall solltest du vor einem fest gebuchten Zulassungstermin kennen."
      ]
    },
    {
      "id": "dokumente",
      "title": "2. Herkunftsdokumente vollständig beschaffen",
      "paragraphs": [
        "Für das Berliner Verfahren werden unter anderem Kaufvertrag oder Rechnung, Identitätsnachweis, eVB, SEPA-Mandat, ausländische Zulassungsdokumente und bei noch zugelassenen Fahrzeugen vorhandene ausländische Schilder genannt. Die Unterlagen sind dort grundsätzlich im Original vorzulegen. Nutze diese Liste als Vorbereitung und gleiche sie mit deiner eigenen Behörde ab.",
        "§ 8 FZV regelt ausdrücklich den Fall einer ausländischen Zulassungsbescheinigung aus zwei Teilen. Fehlt Teil II, ist eine Bestätigung der zuständigen ausländischen Behörde über das Kraftfahrt-Bundesamt erforderlich. Ein fehlendes Dokument ist daher kein Problem, das ein Schilderkauf behebt."
      ],
      "items": [
        "Kaufnachweis und Identitätsnachweis zusammenstellen.",
        "Alle Teile der ausländischen Zulassungsdokumente beschaffen.",
        "Fahrzeug-Identifizierungsnummer in den Unterlagen abgleichen.",
        "Versicherungsnachweis und erforderliches SEPA-Mandat vorbereiten.",
        "Unklare oder fehlende Nachweise vor dem Termin besprechen."
      ]
    },
    {
      "id": "technik",
      "title": "3. Typgenehmigung und HU-Nachweis klären",
      "paragraphs": [
        "Bei einem typgenehmigten Fahrzeug helfen das CoC-Papier, also die EG-Übereinstimmungsbescheinigung, beziehungsweise eine Datenbestätigung des Herstellers beim Nachweis der technischen Daten. Bei fehlender Typgenehmigung kann ein Gutachten nach § 21 StVZO erforderlich sein. Kläre die passende Nachweisform, statt pauschal eine zusätzliche Prüfung zu buchen.",
        "Für die Untersuchung eines bereits im EU- oder EWR-Raum betriebenen Fahrzeugs ist § 8 Absatz 2 FZV wichtig. Er berücksichtigt unter den dort genannten Voraussetzungen einen Nachweis über eine Untersuchung nach der europäischen Richtlinie. Eine deutsche HU ist also nicht allein wegen des Grenzübertritts immer neu erforderlich.",
        "Lass prüfen, ob dein konkreter Untersuchungsnachweis anerkannt wird und welche Frist gilt. Das Datum der ersten Inbetriebnahme ist dabei nachzuweisen. Eine unklare Plakette auf dem ausländischen Schild ersetzt keinen verwertbaren Nachweis."
      ]
    },
    {
      "id": "herkunft",
      "title": "4. Ausländische Abmeldung getrennt organisieren",
      "paragraphs": [
        "Die Zulassung in Deutschland darfst du nicht mit einer automatisch erledigten Abmeldung im Herkunftsland gleichsetzen. Berlin weist ausdrücklich darauf hin, dass eine Benachrichtigung erfolgt, der Halter aber selbst für eine noch nötige ausländische Abmeldung zuständig ist.",
        "Frage vorab, welche Dokumente oder Schilder im Herkunftsland benötigt werden. Bewahre Rückgaben und Bestätigungen auf. Kläre außerdem separat, wie das Fahrzeug zulässig zum Standort oder zur Prüfstelle gelangt. Ein neues deutsches Schild ohne die erforderliche Zulassung ist keine allgemeine Überführungserlaubnis."
      ]
    },
    {
      "id": "schilder",
      "title": "5. Deutsche Kombination und Format bestätigen",
      "paragraphs": [
        "Wenn die Unterlagen und der Ablauf passen, klärst du die deutsche Kennzeichenkombination bei der Zulassungsbehörde. Eine Wunschreservierung ist dabei ein eigener Schritt; sie ist noch keine abgeschlossene Zulassung.",
        "Miss die Kennzeichenaufnahme des Fahrzeugs. Die Größe des ausländischen Schilds ist keine automatische Freigabe für ein entsprechendes deutsches Format. Wenn die vorgesehene Aufnahme nicht passt, kläre die zulässige Lösung vor der Bestellung. Der Größenratgeber hilft bei der Orientierung.",
        "Bestelle nur eine tatsächlich angebotene, für deinen Fall passende Ausführung. Bei einem Pkw gehören normalerweise Schilder vorne und hinten dazu. Kennzeichenart, Zusätze und Stückzahl müssen mit der vorgesehenen Zuteilung übereinstimmen."
      ]
    },
    {
      "id": "abschluss",
      "title": "6. Bestellung und Zulassung abschließen",
      "paragraphs": [
        "Vergleiche die gelieferten Schilder mit der bestätigten Kombination und den vereinbarten Maßen. Die amtlichen Plaketten und die Zulassungsdokumente kommen nicht durch die Schilderbestellung hinzu. Sie werden im vorgesehenen Zulassungsverfahren erteilt.",
        "Behalte Dokumente zur Herkunft und zur ausländischen Abmeldung griffbereit, bis der gesamte Vorgang geklärt ist. Plane die Schilderlieferung mit ausreichend Abstand zum Termin. Der Shop übernimmt keine Zusage, dass fehlende Importunterlagen bis dahin beschafft werden können."
      ]
    }
  ],
  "faq": [
    {
      "question": "Kann ich die ausländische Kombination einfach auf deutsche Bleche prägen lassen?",
      "answer": "Für die deutsche Zulassung brauchst du eine von der zuständigen Behörde bestätigte deutsche Kombination. Das Nachprägen der bisherigen ausländischen Nummer erledigt keine deutsche Zulassung."
    },
    {
      "question": "Ist eine neue deutsche HU immer erforderlich?",
      "answer": "Nein, das lässt sich nicht pauschal sagen. § 8 Absatz 2 FZV berücksichtigt passende Untersuchungsnachweise aus EU- beziehungsweise EWR-Staaten. Lass deinen konkreten Nachweis und die Frist von der zuständigen Stelle prüfen."
    },
    {
      "question": "Wann bestelle ich die Kennzeichenschilder?",
      "answer": "Wenn die deutsche Kombination und das zulässige Format geklärt sind und dein Zulassungsablauf feststeht. Fehlende Fahrzeugdokumente solltest du vorher mit der Behörde klären."
    },
    {
      "question": "Erledigt die deutsche Anmeldung die Abmeldung im Herkunftsland?",
      "answer": "Verlass dich darauf nicht. Berlin weist ausdrücklich auf die Verantwortung des Halters für eine noch nötige Abmeldung im Herkunftsland hin. Kläre das Verfahren bei den beteiligten Behörden."
    }
  ],
  "sources": [
    {
      "label": "FZV § 8: Zulassung nach vorheriger Zulassung im Ausland",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__8.html"
    },
    {
      "label": "Berlin: EU-/EWR-Gebrauchtfahrzeug zulassen",
      "href": "https://service.berlin.de/dienstleistung/120884/"
    },
    {
      "label": "FZV § 12 und Anlage 4: Kennzeichenausführung",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__12.html"
    }
  ],
  "related": [
    "auto-anmelden-unterlagen",
    "kennzeichengroessen",
    "wunschkennzeichen-reservieren",
    "kurzzeitkennzeichen-fahrzeugueberfuehrung",
    "drittland-import-zulassung",
    "ausfuhrkennzeichen-ablauf",
    "quad-zulassung-kennzeichen",
    "auslaendische-kennzeichen-deutschland"
  ],
  "cta": "Deine deutsche Kombination und die passenden Maße stehen fest? Konfiguriere die angebotenen Schilder für deinen Zulassungstermin. Herkunftsdokumente, Versicherung, Zulassung und amtliche Plaketten bleiben eigenständige Schritte."
},
{
  "slug": "kennzeichen-freiwillig-aendern",
  "title": "Kennzeichen freiwillig ändern: neue Kombination, gleiches Auto",
  "teaser": "Du möchtest eine andere Nummer am bisherigen Auto? So planst du Antrag, Schildertausch und die nötigen Folgeänderungen.",
  "category": "Zulassung und Schilderwahl",
  "reviewedAt": "2026-11-16",
  "intro": [
    "Das Auto bleibt bei dir, aber die bisherige Kombination gefällt dir nicht mehr. Eine freiwillige Umkennzeichnung kann auch ohne Verkauf oder Umzug möglich sein. Dafür brauchst du einen behördlichen Vorgang: Neue Bleche mit einer anderen Nummer allein reichen nicht."
  ],
  "takeaway": "Beantrage die Änderung bei der Zulassungsbehörde. Lass die neue Kombination verbindlich klären, bevor du personalisierte Schilder bestellst. Alte Schilder, Fahrzeugpapiere und kennzeichenbezogene Dienste gehören in denselben Ablauf.",
  "sections": [
    {
      "id": "anlass",
      "title": "1. Den richtigen Vorgang wählen",
      "paragraphs": [
        "§ 9 Absatz 4 FZV erlaubt eine Änderung des zugeteilten Kennzeichens von Amts wegen oder auf Antrag. Hier geht es um deinen freiwilligen Wunsch nach einer neuen Kombination am selben Fahrzeug. Bei Verlust oder Diebstahl ist das entsprechende Ersatzverfahren richtig.",
        "Suche auf der Website deiner Behörde nach Umkennzeichnung auf Wunsch. Frage nach Termin, Unterlagen und dem Zeitpunkt der Schilderanfertigung. Eine allgemeine Wunschkennzeichenreservierung erledigt diesen Änderungsvorgang noch nicht."
      ]
    },
    {
      "id": "kombination",
      "title": "2. Verfügbarkeit und Zuteilung klären",
      "paragraphs": [
        "Prüfe eine Wunschkombination im offiziellen Reservierungssystem. Beachte Halterdaten, Frist und mögliche Einschränkungen für kurze Kombinationen oder besondere Kennzeichenarten. Ein freies Suchergebnis allein ist noch keine endgültige Zuteilung.",
        "Berlin empfiehlt beim freiwilligen Wechsel, die Schilder erst nach endgültiger Zuteilung prägen zu lassen. Kläre den Ablauf bei deiner eigenen Behörde. So vermeidest du eine individuell gefertigte Kombination, die im konkreten Vorgang nicht verwendet werden kann."
      ]
    },
    {
      "id": "unterlagen",
      "title": "3. Dokumente und alte Schilder bereitlegen",
      "paragraphs": [
        "Für das Berliner Verfahren werden unter anderem Ausweis, Zulassungsbescheinigungen Teil I und II sowie bisherige Schilder genannt. Je nach Fall kommen Reservierungsnachweis, Vollmacht oder HU-Nachweis hinzu. Die Liste deiner zuständigen Stelle ist maßgeblich.",
        "Liegt Teil II bei einer Bank oder Leasinggesellschaft, organisiere die Bereitstellung vor dem Termin. Reserviere nicht mehrere Behördentermine auf Verdacht, solange ein erforderliches Originaldokument fehlt."
      ],
      "items": [
        "Neue Kombination und Kennzeichenart bestätigen lassen.",
        "Fahrzeugpapiere und Identitätsnachweis zusammenstellen.",
        "Bisherige Schilder für das Verfahren aufbewahren.",
        "Bei Vertretung Vollmacht und erforderliche Ausweise prüfen."
      ]
    },
    {
      "id": "bestellen",
      "title": "4. Schilder passend zur neuen Zuteilung bestellen",
      "paragraphs": [
        "Übernimm Ortskürzel, Buchstaben und Zahlen genau aus der bestätigten Angabe. Prüfe E, H oder Saison getrennt von der Grundkombination. Auch das Format und die benötigte Anzahl müssen stimmen.",
        "Die Schilderlieferung enthält keine behördliche Umkennzeichnung und keine amtlichen Plaketten. Montiere die neue Nummer nicht vorzeitig und übertrage keine alten Siegel selbst. Lass den Schildertausch im vorgesehenen amtlichen Ablauf abschließen."
      ]
    },
    {
      "id": "folge",
      "title": "5. Hinterlegte Kennzeichen aktualisieren",
      "paragraphs": [
        "Nach dem Wechsel können weitere Angaben veraltet sein. Prüfe Umweltplakette, Parkberechtigung, Garagenzugang und andere Dienste, die dein Fahrzeug anhand der Nummer erkennen. Wenn ein Fahrradträger die Fahrzeugnummer wiederholt, muss auch dieses Zusatzschild zur neuen Kombination passen.",
        "Kläre mit der Versicherung, ob sie weitere Angaben benötigt. Bewahre Bescheid und Kaufunterlagen auf. Die Kennzeichenänderung ersetzt keine sonstigen Vertragsänderungen und keine neue Hauptuntersuchung."
      ],
      "items": [
        "Umweltplakette bei Bedarf auf neue Kombination ausstellen lassen.",
        "Park- und Zufahrtsberechtigungen abgleichen.",
        "Wiederholungskennzeichen am Fahrradträger prüfen.",
        "Versicherungs- und Vertragsdaten kontrollieren."
      ]
    },
    {
      "id": "kosten",
      "title": "Kosten und Zeit getrennt planen",
      "paragraphs": [
        "Unterscheide Gebühren für den Behördenvorgang, eine mögliche Wunschreservierung und die Schilderkosten. Eine günstige Schilderbestellung ist nicht der Gesamtpreis der Umkennzeichnung.",
        "Plane Lieferung und Termin mit etwas Abstand. Wenn du die bisherige Nummer später wieder nutzen möchtest, frage die Behörde ausdrücklich nach der Möglichkeit einer Reservierung. Das Aufbewahren der alten Bleche sichert dir die Kombination nicht."
      ]
    }
  ],
  "faq": [
    {
      "question": "Muss ich dafür ein anderes Auto kaufen?",
      "answer": "Nein. Eine Änderung auf Antrag kann auch beim bisherigen Fahrzeug möglich sein. Die zuständige Zulassungsbehörde entscheidet über den konkreten Vorgang."
    },
    {
      "question": "Darf ich die neue Nummer einfach prägen und montieren?",
      "answer": "Nein. Die neue Kombination muss dem Fahrzeug amtlich zugeteilt sein; die erforderlichen Kennzeichnungen und Papiere müssen dazu passen."
    },
    {
      "question": "Brauche ich bei gleicher Nummer nur wegen neuer Bleche diesen Vorgang?",
      "answer": "Ein Ersatz beschädigter Schilder mit unveränderter Kombination ist ein anderer Fall. Nutze dafür den verlinkten Ersatzratgeber."
    }
  ],
  "sources": [
    {
      "label": "FZV § 9",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__9.html"
    },
    {
      "label": "Berlin: Kennzeichen auf Wunsch ändern",
      "href": "https://service.berlin.de/dienstleistung/121473/"
    }
  ],
  "related": [
    "wunschkennzeichen-reservieren",
    "kennzeichen-beschaedigt-ersetzen",
    "kennzeichen-verloren-gestohlen",
    "kennzeichen-fahrzeugwechsel-uebernehmen"
  ],
  "cta": "Die neue Zuteilung ist geklärt? Konfiguriere die passenden Schilder. Reservierung, amtliche Änderung und Plaketten erledigst du getrennt davon."
},
{
  "slug": "anhaenger-gruenes-schwarzes-kennzeichen",
  "title": "Anhänger: grünes oder schwarzes Kennzeichen?",
  "teaser": "Nutzung, Steuerbefreiung und Schildform richtig unterscheiden – bevor du ein Kennzeichen für den Anhänger bestellst.",
  "category": "Zulassung und Schilderwahl",
  "reviewedAt": "2026-11-16",
  "intro": [
    "Ein gebrauchter Anhänger wird mit grünem Kennzeichen angeboten. Du möchtest damit künftig aber auch Gartenabfälle oder Möbel transportieren. Dann solltest du die Farbe nicht einfach übernehmen: Entscheidend sind Fahrzeugart, genehmigte Nutzung und die Voraussetzungen der Steuerbefreiung."
  ],
  "takeaway": "Grüne Schrift ist keine frei wählbare Gestaltung. Kläre die Einstufung anhand der Fahrzeugpapiere und deiner geplanten Nutzung. Bestelle danach die amtlich vorgesehene Farbe, Kombination und Schildform.",
  "sections": [
    {
      "id": "grundlage",
      "title": "1. Kennzeichenfarbe ist nicht Geschmackssache",
      "paragraphs": [
        "§ 10 FZV regelt grüne Kennzeichen für bestimmte steuerbefreite Fahrzeuge und enthält Ausnahmen. Die Voraussetzungen der Steuerbefreiung stehen im Kraftfahrzeugsteuergesetz. Nicht jede Steuerbefreiung führt zu grüner Schrift.",
        "Die Zulassungsbehörde und das zuständige Hauptzollamt haben dabei unterschiedliche Aufgaben. Ein Händler kann Schilder anfertigen, aber keine Steuerbefreiung durch die Wahl der Farbe herbeiführen."
      ]
    },
    {
      "id": "alltag",
      "title": "2. Die tatsächliche Nutzung beschreiben",
      "paragraphs": [
        "Ein normaler Anhänger für wechselnde private Transportaufgaben ist nicht allein deshalb ein Sportanhänger, weil gelegentlich Fahrräder darauf stehen. Prüfe, welche Fahrzeugart und welcher Verwendungszweck in den Unterlagen stehen.",
        "Schreibe vor einer Anfrage auf, was du tatsächlich transportieren willst. Ein konkretes Beispiel hilft mehr als die Frage, ob grüne Kennzeichen billiger sind. Gerade bei einem gebrauchten Pferde- oder Bootstransporter lohnt sich dieser Abgleich vor dem Kauf."
      ]
    },
    {
      "id": "sport",
      "title": "3. Den Sonderfall Sportanhänger verstehen",
      "paragraphs": [
        "Die FZV nimmt bestimmte Spezialanhänger von der Zulassungspflicht aus, wenn sie ausschließlich für die dort genannten Sport- oder Rettungszwecke verwendet werden. Zulassungsfrei bedeutet aber nicht automatisch ohne Kennzeichen: § 4 FZV sieht für bestimmte Anhänger ein eigenes amtliches Kennzeichen vor.",
        "Die Stadt Emden weist beispielsweise darauf hin, dass der Sportzweck aus den Fahrzeugunterlagen hervorgehen muss. Ein als Viehtransporter eingestufter Anhänger wird dort anders behandelt als ein entsprechend dokumentierter Sportanhänger. Das ist ein konkretes Behördenbeispiel, keine Freigabe für deinen Einzelfall."
      ]
    },
    {
      "id": "aenderung",
      "title": "4. Nutzungsänderungen vor der Fahrt klären",
      "paragraphs": [
        "Wenn eine Begünstigung an einen bestimmten Zweck gebunden ist, darfst du daraus keine beliebige Transporterlaubnis ableiten. Kläre eine geplante andere Nutzung mit den zuständigen Stellen. Nur das grüne Schild gegen ein schwarzes zu tauschen, ändert die Eintragung und steuerliche Behandlung nicht.",
        "Auch Versicherung und technische Anforderungen müssen zum tatsächlichen Betrieb passen. Frage deine Versicherung nach dem konkreten Fahrzeug und Einsatz. Aus grüner Schrift allein lässt sich weder vollständiger Versicherungsschutz noch Versicherungsfreiheit ablesen."
      ]
    },
    {
      "id": "bestellung",
      "title": "5. Erst Farbe, dann das passende Produkt wählen",
      "paragraphs": [
        "Für einen Anhänger mit bestätigtem schwarzem, einzeiligem Standardschild bietet die Anhängerseite im Shop die Ausführung 520 × 110 mm. Prüfe zuerst, ob genau diese Schildform zu deinem Anhänger passt.",
        "Grüne Ausführungen stehen im aktuellen Sortiment nur in den Landmaschinenformaten 240 × 130 und 255 × 130 mm zur Verfügung. Ein grünes 520-mm-Anhängerschild ist damit nicht angeboten. Bestelle nicht irgendeine andere Form, nur weil die Schriftfarbe stimmt."
      ],
      "items": [
        "Kombination aus amtlichen Unterlagen übernehmen.",
        "Vorgesehene Schriftfarbe bestätigen.",
        "Zulässiges Format und Befestigungsfläche abgleichen.",
        "Nur eine tatsächlich passende angebotene Ausführung wählen."
      ]
    },
    {
      "id": "grenzen",
      "title": "Schild, Steuer und Zulassung getrennt halten",
      "paragraphs": [
        "Eine erfolgreiche Bestellung bestätigt nur den Kauf des ausgewählten Produkts. Sie ersetzt weder eine behördliche Einordnung noch die Prüfung deiner Steuervergünstigung. Amtliche Stempel und gegebenenfalls HU-Plakette gehören ebenfalls zum zuständigen Verfahren.",
        "Bei fehlenden oder widersprüchlichen Fahrzeugpapieren klärst du zuerst die Unterlagen. Das vermeidet Fehlbestellungen und schafft eine belastbare Grundlage für den späteren Schilderkauf."
      ]
    }
  ],
  "faq": [
    {
      "question": "Kann ich mir die grüne Schrift frei aussuchen?",
      "answer": "Nein. Die Kennzeichnung muss zur amtlichen Einstufung passen. Eine Bestellung grüner Schilder bewirkt keine Steuerbefreiung."
    },
    {
      "question": "Ist jeder Anhänger mit grünem Schild zulassungsfrei?",
      "answer": "Nein. Steuerliche Behandlung, Zulassungspflicht und Kennzeichenpflicht sind getrennt zu prüfen. Fahrzeugart und Nutzung entscheiden."
    },
    {
      "question": "Gibt es hier ein grünes 520-mm-Anhängerschild?",
      "answer": "Im aktuell geprüften Sortiment nicht. Die Anhängerseite bietet das schwarze Standardschild; grüne Ausführungen gibt es nur in den genannten Landmaschinenformaten."
    }
  ],
  "sources": [
    {
      "label": "FZV § 3",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__3.html"
    },
    {
      "label": "FZV § 4",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__4.html"
    },
    {
      "label": "FZV § 10",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__10.html"
    },
    {
      "label": "KraftStG § 3: Steuerbefreiungen",
      "href": "https://www.gesetze-im-internet.de/kraftstg/__3.html"
    },
    {
      "label": "Emden: Anhänger für Sportzwecke",
      "href": "https://www.emden.de/rathaus/verwaltung/fb-400-oeffentliche-sicherheit-buergerservice/fd-433-buergerbuero-und-standesamt/kfz-angelegenheiten/anhaenger-fuer-sportzwecke"
    }
  ],
  "related": [
    "kennzeichengroessen",
    "auto-anmelden-unterlagen"
  ],
  "cta": "Farbe, Kombination und Format stehen fest? Prüfe das aktuelle Sortiment. Ein schwarzes Standardschild passt nur, wenn genau diese Ausführung für deinen Anhänger vorgesehen ist."
},
{
  "slug": "saisonkennzeichen-zeitraum-aendern",
  "title": "Saisonkennzeichen: den Zeitraum ändern",
  "teaser": "Die Saison verlängern oder verkürzen: So planst du Versicherung, Behördenvorgang und neue Schilder in der richtigen Reihenfolge.",
  "category": "Zulassung planen",
  "reviewedAt": "2026-11-15",
  "intro": [
    "Dein Cabrio soll künftig schon im März statt im April auf die Straße? Dafür reicht es nicht, Schilder mit anderen Monatszahlen zu bestellen. Der neue Betriebszeitraum muss zur Zulassung und zur Versicherung passen. Plane die Änderung, bevor du die zusätzliche Fahrzeit nutzen möchtest."
  ],
  "takeaway": "Kläre zuerst den neuen Zeitraum mit Versicherung und Zulassungsstelle. Lass anschließend die passende Ausführung prägen. Die Monatsangabe auf dem Schild ersetzt keine behördliche Änderung.",
  "sections": [
    {
      "id": "zeitraum",
      "title": "1. Den passenden Zeitraum festlegen",
      "paragraphs": [
        "Ein Saisonkennzeichen gilt für mindestens zwei und höchstens elf volle Monate. Die obere Zahl bezeichnet den ersten, die untere den letzten Monat. März bis Oktober umfasst damit auch den gesamten Oktober. Eine tagesgenaue Freigabe ab Mitte März bildet das Schild nicht ab.",
        "Überlege, wann du das Fahrzeug wirklich brauchst und wo es außerhalb der Saison steht. Auf öffentlichen Straßen darf es außerhalb des eingetragenen Zeitraums grundsätzlich weder gefahren noch abgestellt werden. Ein Stellplatz vor dem Haus kann öffentlicher Verkehrsraum sein; die bloße Nähe zum Grundstück genügt nicht."
      ]
    },
    {
      "id": "versicherung",
      "title": "2. Die Versicherung vorab einbeziehen",
      "paragraphs": [
        "Teile deiner Versicherung den gewünschten neuen Zeitraum mit. Frage nach der dafür erforderlichen Versicherungsbestätigung und nach Änderungen des Beitrags. Übernimm keine alte eVB ungeprüft für einen anderen Zeitraum.",
        "Lass dir erklären, wann die Anpassung wirksam wird. Eine neue Versicherungsbestätigung allein ändert die Zulassung noch nicht. Umgekehrt sollte ein neuer Eintrag nicht mit einem ungeklärten Versicherungsschutz zusammenfallen."
      ]
    },
    {
      "id": "unterlagen",
      "title": "3. Den örtlichen Änderungsablauf prüfen",
      "paragraphs": [
        "Suche auf der offiziellen Seite deiner Zulassungsbehörde nach Änderung des Saisonzeitraums. Prüfe Terminpflicht, Vollmacht und die konkrete Unterlagenliste. Die Zuständigkeit richtet sich nach deinem Zulassungsfall.",
        "Berlin nennt für das Saisonverfahren unter anderem Ausweis, Fahrzeugpapiere, bisherige Schilder, Versicherungsnachweis mit Saisonzeitraum und HU-Nachweis. Das ist ein örtliches Beispiel. Ob in deinem Fall weitere Unterlagen benötigt werden, bestätigt deine Behörde."
      ],
      "items": [
        "Gewünschten Beginn und Schlussmonat notieren.",
        "Zulassungsbescheinigungen und HU-Nachweis bereitlegen.",
        "Versicherungsbestätigung für den neuen Zeitraum klären.",
        "Alte Schilder bis zum abgeschlossenen Austausch aufbewahren."
      ]
    },
    {
      "id": "schilder",
      "title": "4. Neue Schilder erst mit geklärten Angaben bestellen",
      "paragraphs": [
        "Andere Monatszahlen erfordern eine dazu passende Prägung. Überklebe oder ändere die vorhandenen Ziffern nicht selbst. Kläre auch, ob die bisherige Kombination im konkreten Vorgang bestehen bleibt und welches Format zugelassen ist.",
        "Bei der Schilderbestellung wählst du die bestätigten Monate. Vergleiche die Vorschau Zeichen für Zeichen mit den Vorgaben. Der Shop liefert geprägte Schilder; amtliche Stempel und die Änderung der Fahrzeugpapiere gehören zum Zulassungsverfahren. Die Produktseite Saisonkennzeichen erreichst du über die Produktauswahl im Bestelleinstieg."
      ]
    },
    {
      "id": "wechsel",
      "title": "5. Den Übergang ohne Lücke planen",
      "paragraphs": [
        "Wenn die bisherige Saison im April beginnt, berechtigt dich eine geplante Verlängerung noch nicht zur Fahrt im März. Warte auf die wirksame Änderung und die erforderliche Kennzeichnung. Plane Behördentermin, Lieferung und Montage so, dass die Voraussetzungen vor der ersten Fahrt erfüllt sind.",
        "Die Saison kehrt im unveränderten Zeitraum jährlich wieder. Du musst sie nicht jedes Frühjahr neu beantragen. Dieser Ratgeber betrifft eine tatsächliche Änderung der Monate, nicht den normalen Saisonbeginn."
      ]
    },
    {
      "id": "kosten",
      "title": "Kosten getrennt betrachten",
      "paragraphs": [
        "Vergleiche Versicherungsänderung, Behördengebühren und Schilderkosten getrennt. Eine längere Saison bedeutet nicht nur neue Schilder. Ob sie wirtschaftlich sinnvoll ist, hängt von deiner Nutzung und deinem Vertrag ab.",
        "Bei einem H-Kennzeichen ist eine Saison grundsätzlich möglich. Der aktuelle Shop bietet die kombinierte Ausführung H mit Saison jedoch nicht an. Bestelle dafür nicht zwei getrennte Kennzeichenarten in der Hoffnung, daraus eine Kombination zu erhalten."
      ]
    }
  ],
  "faq": [
    {
      "question": "Kann ich die Monate auf dem alten Schild überkleben?",
      "answer": "Nein. Nutze eine passende neue Prägung und das behördliche Änderungsverfahren. Eine selbst veränderte Monatsangabe ersetzt weder Zulassung noch Versicherung."
    },
    {
      "question": "Muss ich das Auto jedes Jahr neu anmelden?",
      "answer": "Bei unverändertem Saisonzeitraum ist keine jährliche Neuanmeldung allein wegen des Saisonbeginns erforderlich. Außerhalb des Zeitraums bleiben Nutzung und öffentliches Abstellen eingeschränkt."
    },
    {
      "question": "Kann ich sofort nach der Schilderbestellung fahren?",
      "answer": "Nein. Entscheidend sind die wirksame Zulassung, der Versicherungsschutz und die erforderlichen amtlichen Kennzeichnungen. Eine Bestellbestätigung genügt nicht."
    }
  ],
  "sources": [
    {
      "label": "FZV § 10",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__10.html"
    },
    {
      "label": "Berlin: Saisonkennzeichen beantragen",
      "href": "https://service.berlin.de/dienstleistung/121480/"
    }
  ],
  "related": [
    "kennzeichengroessen",
    "auto-anmelden-unterlagen",
    "auto-ummelden-kennzeichen-behalten"
  ],
  "cta": "Zeitraum und Kombination bestätigt? Wähle im Konfigurator Saisonkennzeichen und prüfe beide Monatsangaben vor der Bestellung."
},
{
  "slug": "auto-online-zulassen-kennzeichen",
  "title": "Auto online zulassen: Wann brauchst du die Kennzeichen?",
  "teaser": "i-Kfz verständlich erklärt: Schilder bestellen, den amtlichen Bescheid abrufen und Plaketten richtig einplanen.",
  "category": "Zulassung planen",
  "reviewedAt": "2026-11-15",
  "intro": [
    "Bei einer Online-Zulassung läuft der Behördengang digital. Die Kennzeichenschilder bleiben trotzdem ein physisches Produkt. Wer diese beiden Vorgänge getrennt plant, vermeidet eine fertige Zulassung ohne passende Schilder oder eine Bestellung mit einer noch ungeklärten Kombination."
  ],
  "takeaway": "Nutze das offizielle i-Kfz-Portal deiner Behörde. Bestelle nur die geklärte Kombination. Für eine sofortige Nutzung brauchst du die behördliche Freigabe und die im Verfahren verlangten Nachweise – nicht nur eine Bestellbestätigung.",
  "sections": [
    {
      "id": "portal",
      "title": "1. Beim offiziellen Portal beginnen",
      "paragraphs": [
        "Rufe das Zulassungsportal über die Website deiner zuständigen Behörde auf. Prüfe dort, ob dein Vorgang online möglich ist. Erstzulassung, Wiederzulassung und Halterwechsel haben unterschiedliche Voraussetzungen. Ein privater Schilderkonfigurator ist kein behördliches Zulassungsportal.",
        "Lege die geforderten Identifikationsmittel, Fahrzeugdokumente, Versicherungsdaten und Zahlungsinformationen bereit. Welche Sicherheitscodes benötigt werden, hängt vom Vorgang ab. Ältere Dokumente ohne geeignete Codes können eine digitale Bearbeitung verhindern."
      ]
    },
    {
      "id": "vorbereiten",
      "title": "2. Angaben vor dem Antrag abgleichen",
      "paragraphs": [
        "Vergleiche Halterdaten, Fahrzeug-Identifizierungsnummer und die gewünschte Kennzeichenart. Prüfe, ob ein gültiger HU-Nachweis erforderlich ist und ob die Versicherungsbestätigung zum Vorgang passt. Lies die Hinweise des Portals vor dem Freilegen von Codes.",
        "Bei Leasing oder Finanzierung liegt Teil II möglicherweise beim Vertragspartner. Kläre rechtzeitig, wie die notwendigen Dokumente oder Daten für deinen Vorgang bereitgestellt werden. Ein Foto des Fahrzeugscheins ersetzt nicht automatisch alle geforderten Nachweise."
      ],
      "items": [
        "Offizielles Portal und unterstützten Vorgang prüfen.",
        "Identifikation und benötigte Originaldokumente bereitlegen.",
        "eVB und gegebenenfalls HU-/Steuerdaten abgleichen.",
        "Druckmöglichkeit für behördliche Nachweise einplanen."
      ]
    },
    {
      "id": "bestellen",
      "title": "3. Die Schilderbestellung richtig einordnen",
      "paragraphs": [
        "Eine Wunschkennzeichenreservierung hält eine Kombination nach den Bedingungen der Behörde vor. Sie ist noch keine Zulassung. Prüfe Schreibweise, Reservierungsdaten und die richtige Kennzeichenart, bevor du personalisierte Schilder bestellst.",
        "Wenn die Kombination erst im Antrag feststeht, warte diese Festlegung ab. Brauchst du die Schilder direkt nach der digitalen Entscheidung, plane Lieferung und Antrag entsprechend. Es gibt keine automatische Verbindung zwischen deiner Schilderbestellung und dem Behördenportal."
      ]
    },
    {
      "id": "bescheid",
      "title": "4. Bescheid und vorläufigen Nachweis sichern",
      "paragraphs": [
        "Nach erfolgreicher Entscheidung kann das Verfahren eine vorläufige Nutzung ermöglichen. Lade die bereitgestellten Dokumente innerhalb der im Portal genannten Abruffrist herunter. Folge den Druck- und Mitführungshinweisen. Ein Screenshot einer Zahlung ist kein Zulassungsbescheid.",
        "Maßgeblich ist das Enddatum im vorläufigen Zulassungsnachweis. § 32 FZV sieht diesen Nachweis im Fall der vorläufigen Inbetriebsetzung vor; beim Pkw muss er von außen gut lesbar ausgelegt werden. Zusätzlich sind die Vorgaben zur Mitführung des Zulassungsbescheids zu beachten. Verlasse dich nicht auf eine allgemeine Tageszahl aus einem älteren Ratgeber."
      ]
    },
    {
      "id": "plaketten",
      "title": "5. Amtliche Plaketten gesondert behandeln",
      "paragraphs": [
        "Die erforderlichen Unterlagen und Plakettenträger kommen im vorgesehenen behördlichen Verfahren. Bringe sie ausschließlich nach der mitgelieferten Anleitung an. Die Schilderlieferung aus dem Shop enthält keine behördliche Zulassung und keine frei verwendbaren amtlichen Siegel.",
        "Fehlt eine Sendung oder läuft der vorläufige Nachweis ab, kontaktiere rechtzeitig die Zulassungsbehörde. Die Wartezeit verlängert die Fahrberechtigung nicht automatisch. Nutze das Fahrzeug nur, wenn die Voraussetzungen tatsächlich vorliegen."
      ]
    },
    {
      "id": "fehler",
      "title": "Wenn das Portal nicht abschließt",
      "paragraphs": [
        "Eine abgebrochene Sitzung oder eine bezahlte Gebühr beweist noch keine erfolgreiche Zulassung. Sichere Vorgangsnummer und Fehlermeldung und kläre den Status mit der zuständigen Stelle. Vermeide einen zweiten Antrag, bevor klar ist, was mit dem ersten geschehen ist.",
        "Bestelle bei unklarer Kombination keine weiteren Schilder auf Verdacht. Wenn der digitale Weg für deine Dokumente nicht funktioniert, plane den von der Behörde genannten alternativen Weg ein."
      ]
    }
  ],
  "faq": [
    {
      "question": "Kann ich bei der Schilderbestellung das Auto gleich zulassen?",
      "answer": "Die Bestellung in diesem Shop betrifft Kennzeichenschilder. Die Zulassung erledigst du getrennt im amtlichen Portal oder bei der Behörde."
    },
    {
      "question": "Darf ich mit ungestempelten Schildern sofort losfahren?",
      "answer": "Nicht allein wegen der Bestellung. Eine vorläufige Nutzung setzt den erfolgreichen behördlichen Vorgang und alle dafür geforderten Nachweise voraus."
    },
    {
      "question": "Was mache ich ohne Drucker?",
      "answer": "Plane vor dem Antrag eine Möglichkeit zum Ausdruck ein, wenn du die vorläufige Nutzung brauchst. Folge den Anforderungen des Portals; eine Anzeige auf dem Handy ersetzt vorgeschriebene Ausdrucke nicht."
    }
  ],
  "sources": [
    {
      "label": "FZV § 31",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__31.html"
    },
    {
      "label": "FZV § 32",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__32.html"
    },
    {
      "label": "BMV: Internetbasierte Fahrzeugzulassung",
      "href": "https://www.bmv.de/i-Kfz"
    }
  ],
  "related": [
    "auto-anmelden-unterlagen",
    "wunschkennzeichen-reservieren",
    "fahrzeugschein-fahrzeugbrief-unterschied"
  ],
  "cta": "Kombination und Ausführung stehen fest? Bestelle die passenden Schilder und erledige die amtliche Zulassung getrennt davon."
},
{
  "slug": "kennzeichen-beschaedigt-ersetzen",
  "title": "Kennzeichen beschädigt: So ersetzt du das Schild",
  "teaser": "Verbogene oder unleserliche Schilder richtig austauschen: Was du vor der Bestellung mit der Behörde klärst und welche Unterlagen wichtig sind.",
  "category": "Schilder ersetzen",
  "reviewedAt": "2026-11-13",
  "intro": [
    "Ein Parkrempler hat das vordere Schild verbogen oder die Schrift ist trotz Reinigung kaum noch erkennbar. Dann geht es nicht nur um ein neues Stück Blech. Das Ersatzschild muss zur bisherigen Zuteilung passen und erforderliche Plaketten müssen im zuständigen Verfahren erneuert werden.",
    "Dieser Ratgeber betrifft vorhandene beschädigte Schilder. Fehlt ein Schild nach Verlust oder Diebstahl, gilt ein anderes Verfahren. Dafür findest du unten einen eigenen Ratgeber."
  ],
  "takeaway": "Bei einem vorhandenen beschädigten Schild kann die bisherige Kombination grundsätzlich erhalten bleiben. Kläre den Ablauf mit deiner Zulassungsstelle, bestelle die passende Ausführung und bewahre die alten Schilder für den Austausch auf.",
  "sections": [
    {
      "id": "schaden",
      "title": "1. Den Schaden richtig einordnen",
      "paragraphs": [
        "Prüfe zuerst, ob nur Schmutz die Zeichen verdeckt. Eine schonende Reinigung kann ausreichen. Bleiben Zeichen unleserlich, ist das Schild gerissen oder die Oberfläche beschädigt, solltest du den Austausch klären. Nicht mit Stift nachzeichnen oder mit Folie reparieren.",
        "Unterscheide Schild, Halter und Plaketten. Ein gebrochener Rahmen kann ersetzt werden, ohne das intakte Schild zu erneuern. Eine beschädigte amtliche Plakette dagegen lässt sich nicht durch den Kauf eines leeren Schilds lösen."
      ],
      "items": [
        "Schild vorhanden, aber beschädigt: Austauschverfahren prüfen.",
        "Nur Halter defekt: passende Befestigung erneuern.",
        "Plakette beschädigt: zuständige Stelle zur Erneuerung kontaktieren.",
        "Schild verschwunden: Verlust- oder Diebstahlverfahren nutzen."
      ]
    },
    {
      "id": "behoerde",
      "title": "2. Den Ablauf vor dem Kauf klären",
      "paragraphs": [
        "Rufe die offizielle Website deiner Zulassungsbehörde auf und suche nach Kennzeichentausch oder Ersatz wegen Unleserlichkeit. Frage, welche alten Schilder, Dokumente und Nachweise sie benötigt und ob du einen Termin brauchst.",
        "Das Berliner Serviceportal nennt beispielsweise alte und neue Schilder sowie die Zulassungsbescheinigung Teil I. Dort sollen beim Pkw auch dann beide bisherigen Schilder vorgelegt werden, wenn nur eines ersetzt wird. Das ist ein konkretes Behördenbeispiel, keine bundesweit identische Unterlagenliste."
      ]
    },
    {
      "id": "bestellung",
      "title": "3. Ersatz mit der richtigen Kombination bestellen",
      "paragraphs": [
        "Übernimm die zugeteilte Kombination aus dem Fahrzeugschein und gleiche sie mit dem bisherigen Schild ab. Prüfe das Format und besondere Merkmale wie E, H oder Saison. Die bloße Ähnlichkeit der Vorschau genügt nicht; alle Zeichen müssen stimmen.",
        "Bestelle die tatsächlich benötigte Anzahl. Wenn nur ein Schild defekt ist, musst du nicht automatisch beide neu anfertigen lassen. Ob der Shop die passende Einzelkonfiguration anbietet, prüfst du in der aktuellen Auswahl. Alte Schilder trotzdem bis zum Abschluss des Vorgangs behalten."
      ]
    },
    {
      "id": "plaketten",
      "title": "4. Amtliche Plaketten separat erledigen",
      "paragraphs": [
        "Die Schilderbestellung umfasst das geprägte Produkt. Sie beinhaltet keine amtliche Abstempelung. Löse die Stempelplakette nicht selbst ab, um sie auf ein neues Schild zu kleben. Nach der FZV ist sie so ausgeführt, dass sie beim Entfernen zerstört wird.",
        "Am hinteren Schild kann außerdem die HU-Plakette betroffen sein. Frage vor dem Termin nach dem nötigen Nachweis und dem zuständigen Ablauf. Ein neues Schild verändert nicht von selbst die Fälligkeit der Hauptuntersuchung."
      ]
    },
    {
      "id": "kosten",
      "title": "5. Schilderpreis und Behördenkosten trennen",
      "paragraphs": [
        "Plane die Anfertigung und gegebenenfalls Versand einerseits sowie die Gebühren für den behördlichen Vorgang andererseits. Die konkrete Summe hängt vom Fall ab. Ein günstiger Preis für das Blech ist deshalb nicht automatisch der Gesamtpreis für den Austausch.",
        "Prüfe den Warenkorb vor der Zahlung und die Gebührenangaben deiner Behörde. Vermeide eine feste Terminplanung auf Basis einer unbestätigten Lieferannahme. Bei einem knappen Termin klärst du zuerst, ob Schilder und erforderliche Unterlagen rechtzeitig vorliegen."
      ]
    },
    {
      "id": "abschluss",
      "title": "6. Sicher montieren und Vorgang abschließen",
      "paragraphs": [
        "Kontrolliere das Ersatzschild vor der Montage auf die richtige Kombination und sichtbare Schäden. Nach den erforderlichen behördlichen Schritten befestigst du es sicher am vorgesehenen Ort. Prüfe auch die Halterung: War sie Ursache des Schadens, sollte der Fehler nicht bestehen bleiben.",
        "Ein ungestempeltes Ersatzschild berechtigt nicht allgemein zur Fahrt. Besondere Fahrten im Zulassungsverfahren sind an Voraussetzungen gebunden. Kläre eine notwendige Fahrt vorab mit Behörde und Versicherung, statt aus der Bestellung eine Erlaubnis abzuleiten."
      ]
    }
  ],
  "faq": [
    {
      "question": "Muss ich wegen eines verbogenen Schilds eine neue Kombination wählen?",
      "answer": "Bei einem vorhandenen beschädigten Schild ist der Austausch grundsätzlich mit der bisherigen Kombination möglich. Die Behörde klärt den konkreten Vorgang. Bei Verlust oder Diebstahl ist das anders."
    },
    {
      "question": "Kann ich die alte Stempelplakette selbst übertragen?",
      "answer": "Nein. Sie ist nicht als wiederverwendbarer Aufkleber ausgeführt. Kläre die erforderliche Erneuerung mit der zuständigen Stelle."
    },
    {
      "question": "Reicht es, nur das defekte Schild mitzunehmen?",
      "answer": "Nicht überall. Berlin verlangt beim Pkw beispielsweise beide alten Schilder, auch wenn nur eines ersetzt wird. Maßgeblich sind die Hinweise deiner Behörde."
    }
  ],
  "sources": [
    {
      "label": "Service Berlin: Kennzeichen wegen Unleserlichkeit ersetzen",
      "href": "https://service.berlin.de/dienstleistung/324907/"
    },
    {
      "label": "FZV § 12: Ausgestaltung und Anbringung der Kennzeichen",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__12.html"
    }
  ],
  "related": [
    "auto-online-zulassen-kennzeichen",
    "kennzeichen-verloren-gestohlen",
    "kennzeichengroessen",
    "kennzeichen-online-bestellen"
  ],
  "cta": "Ablauf, Kombination und Format sind geklärt? Dann kannst du das passende Ersatzschild bestellen und den behördlichen Austausch vorbereiten."
},
{
  "slug": "kennzeichen-verloren-gestohlen",
  "title": "Kennzeichen verloren oder gestohlen: Was tun?",
  "teaser": "Die richtige Reihenfolge bei fehlenden Schildern: Meldung, behördliche Klärung, neue Kombination und passende Ersatzschilder.",
  "category": "Schilder ersetzen",
  "reviewedAt": "2026-11-13",
  "intro": [
    "Am geparkten Auto fehlt plötzlich ein Kennzeichen. Ob es verloren ging oder entwendet wurde, lässt sich nicht immer sofort erkennen. Bestelle jetzt nicht einfach dieselbe Kombination nach: Ein fehlendes amtliches Schild ist ein Fall für die zuständigen Stellen.",
    "Dieser Ratgeber bündelt Verlust und Diebstahl, weil beide zum behördlichen Ersatzverfahren führen. Er zeigt außerdem, welche Folgeänderungen du nach der neuen Kombination prüfen solltest."
  ],
  "takeaway": "Bei einem fehlenden amtlichen Schild zuerst den Verlust beziehungsweise Diebstahl melden und die Umkennzeichnung klären. Erst danach Schilder für die bestätigte neue Kombination bestellen.",
  "sections": [
    {
      "id": "sofort",
      "title": "1. Nicht einfach mit einem fehlenden Schild weiterfahren",
      "paragraphs": [
        "Kontrolliere, ob nur ein Schild oder beide fehlen. Notiere Zeitpunkt und Ort der Feststellung. Fotografiere eine beschädigte Halterung, wenn du Spuren bemerkst. Setze die Fahrt mit fehlendem vorgeschriebenem Kennzeichen nicht einfach fort.",
        "Eine selbst geschriebene Pappe oder ein Foto hinter der Scheibe ersetzt das amtliche Schild nicht. Kläre mit der zuständigen Stelle beziehungsweise einem Pannendienst, wie das Fahrzeug erforderlichenfalls bewegt werden kann. Bringe dich bei der Suche nach einem verlorenen Schild nicht im fließenden Verkehr in Gefahr."
      ]
    },
    {
      "id": "melden",
      "title": "2. Diebstahl und Verlust richtig melden",
      "paragraphs": [
        "Bei Diebstahl verständigst du die Polizei und bewahrst den Nachweis der Anzeige auf. Melde das fehlende Schild außerdem der Zulassungsbehörde. Beschreibe ehrlich, ob du einen Diebstahl vermutest oder lediglich festgestellt hast, dass es fehlt.",
        "Für einen Verlust kann eine entsprechende Erklärung oder Versicherung an Eides statt verlangt werden. Welche Form und Unterlagen erforderlich sind, erklärt deine Behörde. Übernimm nicht ungeprüft ein Formular einer anderen Stadt."
      ]
    },
    {
      "id": "mappe",
      "title": "3. Unterlagen für deinen konkreten Fall vorbereiten",
      "paragraphs": [
        "Als Orientierung nennt das Berliner Serviceportal Identitätsnachweis, Fahrzeugpapiere, HU-Nachweis und ein noch vorhandenes Schild. Bei Diebstahl kommt das Anzeigeprotokoll hinzu. Für Vertretung, Firmen oder besondere Fahrzeugfälle können weitere Nachweise erforderlich sein.",
        "Nutze diese Orientierung zum Vorbereiten, bestätige die Liste aber auf dem Portal deiner zuständigen Behörde. Eine eidesstattliche Erklärung, Terminverfügbarkeit und Gebühren hängen vom Verfahren ab."
      ],
      "items": [
        "Zuständige Zulassungsstelle und Leistung auswählen.",
        "Identität und Fahrzeugunterlagen bereitlegen.",
        "Noch vorhandenes Schild aufbewahren.",
        "Anzeigenachweis beziehungsweise verlangte Verlusterklärung vorbereiten.",
        "Bei Vertretung Vollmacht und notwendige Nachweise klären."
      ]
    },
    {
      "id": "kombination",
      "title": "4. Warum dieselbe Kombination nicht einfach nachbestellt wird",
      "paragraphs": [
        "Nach dem behördlichen Verfahren wird das verschwundene Kennzeichen gesperrt und das Fahrzeug erhält eine andere Kombination. So wird der fehlende Gegenstand von der weiteren Fahrzeugkennzeichnung getrennt. Das betrifft auch den Fall, dass beim Pkw nur eines der beiden Schilder fehlt.",
        "Bestelle neue Schilder erst, wenn die neue Kombination und Ausführung bestätigt sind. Eine im Shop frei eingetippte Wunschkombination ist keine behördliche Reservierung. Das noch vorhandene alte Schild wird nicht einfach mit einem anders beschrifteten neuen kombiniert."
      ]
    },
    {
      "id": "folgen",
      "title": "5. Was du nach der Umkennzeichnung aktualisieren solltest",
      "paragraphs": [
        "Prüfe anschließend Dienste und Zubehör, bei denen die alte Kombination hinterlegt ist. Dazu können Parkberechtigungen, Zufahrtskontrollen und ein Wiederholungskennzeichen am Fahrradträger gehören. Ob und wie eine Änderung gemeldet werden muss, sagt der jeweilige Anbieter.",
        "Gehe deine tatsächlich genutzten Dienste durch, statt neue unnötige Leistungen zu kaufen. Bei einem Fahrradträger muss das Schild zur aktuellen Fahrzeugkombination passen. Ein Träger mit dem alten Zusatzschild ist nach dem Wechsel nicht automatisch richtig gekennzeichnet."
      ]
    },
    {
      "id": "schutz",
      "title": "6. Neue Schilder prüfen und Befestigung kontrollieren",
      "paragraphs": [
        "Vergleiche die Lieferung mit der bestätigten neuen Kombination. Erledige die erforderlichen Plaketten im zuständigen Verfahren und montiere die Schilder sicher. Kontrolliere den Rahmen auf gebrochene Clips oder ausgerissene Aufnahmen.",
        "Eine bessere Befestigung ist keine Diebstahlgarantie. Sie kann aber vermeiden, dass ein bereits lockerer Verschluss erneut zum Problem wird. Wenn das alte Schild später wieder auftaucht, verwende es nicht eigenmächtig weiter, sondern melde den Fund der zuständigen Stelle."
      ]
    }
  ],
  "faq": [
    {
      "question": "Genügt es, ein einzelnes verlorenes Schild mit derselben Nummer nachzukaufen?",
      "answer": "Nein. Bei einem fehlenden amtlichen Schild muss zuerst das Verlust- oder Diebstahlverfahren geklärt werden. Die alte Kombination wird gesperrt und das Fahrzeug umgekennzeichnet."
    },
    {
      "question": "Was ist bei einem nur beschädigten Schild anders?",
      "answer": "Ist das Schild noch vorhanden, kann ein Austausch wegen Beschädigung grundsätzlich unter Beibehaltung der Kombination möglich sein. Dafür gibt es einen eigenen Ratgeber."
    },
    {
      "question": "Sind Polizei, Zulassung und neue Schilder im Shoppreis enthalten?",
      "answer": "Nein. Der Shop liefert geprägte Schilder. Meldungen, behördliche Vorgänge und amtliche Plaketten gehören nicht zur normalen Schilderbestellung."
    }
  ],
  "sources": [
    {
      "label": "Service Berlin: Kennzeichen nach Diebstahl oder Verlust ersetzen",
      "href": "https://service.berlin.de/dienstleistung/324196/"
    },
    {
      "label": "FZV § 12: Ausgestaltung und Anbringung der Kennzeichen",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__12.html"
    }
  ],
  "related": [
    "kennzeichen-beschaedigt-ersetzen",
    "auto-anmelden-vollmacht",
    "wunschkennzeichen-reservieren"
  ],
  "cta": "Die neue Kombination ist behördlich bestätigt? Bestelle dafür die passenden Schilder. Eine Nachprägung der verschwundenen alten Kombination ersetzt das Verfahren nicht."
},
  {
    slug: 'auto-anmelden-unterlagen', title: 'Auto anmelden: Welche Unterlagen brauche ich?',
    teaser: 'Die vollständige Vorbereitung für deinen Zulassungstermin: Fahrzeugpapiere, eVB, HU, SEPA-Mandat und wichtige Sonderfälle.',
    category: 'Zulassung vorbereiten',
    intro: [
      'Das Auto ist gekauft, die Vorfreude groß – und dann fehlt am Schalter ausgerechnet eine Unterschrift oder der richtige Fahrzeugbrief. Ein zweiter Termin kostet Zeit und kann die geplante Abholung verschieben. Mit einer geordneten Unterlagenmappe lässt sich vieles davon vermeiden.',
      'Entscheidend ist zuerst, welchen Vorgang du erledigen möchtest: Ein fabrikneues Auto erstmals anmelden, einen zugelassenen Gebrauchtwagen auf dich umschreiben oder ein abgemeldetes Fahrzeug wieder zulassen. Dieser Ratgeber hilft dir, die Unterlagen passend zu sortieren und die letzten Fragen vor dem Termin zu klären.'
    ],
    takeaway: 'Für einen üblichen Gebrauchtwagen mit Halterwechsel brauchst du insbesondere Identitätsnachweis, Fahrzeugpapiere, eVB, HU-Nachweis und ein gültiges SEPA-Mandat. Maßgeblich ist die Checkliste deiner zuständigen Zulassungsbehörde.',
    sections: [
      { id: 'vorgang', title: '1. Erst den Zulassungsvorgang bestimmen', paragraphs: [
        'Die Frage „Was brauche ich zum Autoanmelden?“ hat keine einzige Liste für alle Situationen. Bei der Erstzulassung sind zum Beispiel die Übereinstimmungsbescheinigung des Herstellers, häufig CoC genannt, und die Zulassungsbescheinigung Teil II wichtig. Ein alter Fahrzeugschein kann bei einem noch nie zugelassenen Fahrzeug dagegen nicht vorliegen.',
        'Bei einem Gebrauchtwagen spielen die vorhandenen Zulassungsbescheinigungen und die nächste Hauptuntersuchung eine zentrale Rolle. Bei einem bloßen Umzug mit demselben Auto gelten wiederum andere Anforderungen als bei einem Halterwechsel. Wähle deshalb auf dem offiziellen Behördenportal genau die Leistung, die zu deinem Fall passt.'
      ] },
      { id: 'checkliste', title: '2. Diese Unterlagen gehören in deine Mappe', paragraphs: ['Prüfe die folgende Grundausstattung für einen üblichen inländischen Gebrauchtwagen mit Halterwechsel. Ob Kopien ausreichen oder Originale benötigt werden, sagt dir die zuständige Stelle.'], items: [
        'Gültiger Personalausweis oder Reisepass; beim Reisepass gegebenenfalls zusätzlich eine aktuelle Meldebescheinigung.',
        'Zulassungsbescheinigung Teil I und Teil II, umgangssprachlich Fahrzeugschein und Fahrzeugbrief.',
        'Elektronische Versicherungsbestätigung, kurz eVB, für den geplanten Zulassungsvorgang.',
        'Nachweis der gültigen Hauptuntersuchung, soweit für das Fahrzeug erforderlich. Nimm den Prüfbericht mit, wenn die Fälligkeit nicht zuverlässig aus den Papieren hervorgeht.',
        'Vollständig ausgefülltes SEPA-Lastschriftmandat für die Kfz-Steuer mit den erforderlichen Unterschriften.',
        'Reservierungsbestätigung für ein Wunschkennzeichen, sofern du bereits eine Kombination reserviert hast.',
        'Bisherige Kennzeichenschilder, wenn der konkrete Vorgang eine Entstempelung oder einen Kennzeichenwechsel erfordert.'
      ] },
      { id: 'sonderfaelle', title: '3. Was bei Vertretung, Finanzierung und Importen hinzukommt', paragraphs: [
        'Schickst du eine andere Person zur Behörde, braucht sie zusätzlich eine passende Vollmacht und die verlangten Identitätsnachweise. Kläre die Form vorher: Ein Foto deines Ausweises auf dem Handy der Vertretung ist nicht automatisch ausreichend. Auch das SEPA-Mandat muss unabhängig von der Vollmacht richtig unterschrieben sein.',
        'Bei einem finanzierten oder geleasten Fahrzeug liegt Teil II häufig bei der Bank oder Leasinggesellschaft. Organisiere die Bereitstellung rechtzeitig und frage, wie lange das Dokument bei der Behörde verfügbar bleibt. Ein Termin hilft wenig, wenn der Brief erst danach eintrifft.',
        'Importfahrzeuge, technische Umbauten, Firmenzulassungen und Minderjährige benötigen eine eigene Prüfung. Bei Importen können etwa ausländische Zulassungsunterlagen, Genehmigungsnachweise und weitere technische oder steuerliche Nachweise verlangt werden. Übernimm dafür keine pauschale Standardliste.'
      ] },
      { id: 'ablauf', title: '4. So gehst du vor dem Termin Schritt für Schritt vor', paragraphs: [
        'Lege eine Mappe mit getrennten Bereichen für Person, Fahrzeug, Versicherung und Steuer an. Vergleiche Namen, Anschrift und Fahrzeug-Identifizierungsnummer sorgfältig. Ein Zahlendreher bei der FIN ist leichter am Küchentisch zu klären als zwischen zwei Behördenterminen.',
        'Kontaktiere bei fehlenden Informationen die passende Stelle: die Versicherung bei der eVB, den Verkäufer bei fehlenden Fahrzeugpapieren und die Prüforganisation beim HU-Bericht. Notiere dir außerdem Termin, Standort und akzeptierte Zahlungsart der Zulassungsstelle.'
      ], items: ['Vorgang und zuständige Behörde auswählen.', 'Offizielle Checkliste öffnen und mit deiner Mappe abgleichen.', 'Fehlende Originale, Freigaben und Unterschriften organisieren.', 'Kennzeichenkombination und erlaubte Schildform bestätigen lassen.', 'Schilder mit exakt dieser Kombination bestellen und ausreichend Lieferzeit einplanen.'] },
      { id: 'kennzeichen', title: '5. Die Schilder rechtzeitig vorbereiten', paragraphs: [
        'Wenn deine Kombination offiziell reserviert oder bereits zugeteilt ist und das passende Format feststeht, kannst du die Kennzeichenschilder vor dem Termin bestellen. So lässt sich der Schilderkauf als eigener Schritt vorbereiten. Die Eingabe im Shop ersetzt jedoch keine Reservierung bei der Behörde.',
        'Kontrolliere Ortskürzel, Buchstaben und Zahlen direkt anhand deiner Bestätigung. Berücksichtige gegebenenfalls E-, H- oder Saisonkennzeichen. Unsere Bestellung umfasst die geprägten Schilder; Zulassung und amtliche Plaketten erfolgen im zuständigen Verfahren. Bevor du losfährst, müssen dessen Voraussetzungen erfüllt sein.'
      ] }
    ],
    faq: [
      { question: 'Reicht der Kaufvertrag zum Anmelden?', answer: 'Nein. Er ersetzt weder Fahrzeugpapiere noch Versicherungsbestätigung oder erforderliche technische Nachweise. Bei besonderen Fällen kann er zusätzlich relevant sein.' },
      { question: 'Brauche ich bei jedem Umzug eine neue eVB?', answer: 'Bei einem reinen Anschriftenwechsel ohne Halterwechsel ist eine neue eVB nicht pauschal erforderlich. Prüfe die Anforderungen für deinen konkreten Vorgang.' },
      { question: 'Kann ich die Schilder schon vorher kaufen?', answer: 'Ja, wenn Kombination und passende Ausführung offiziell geklärt sind. Bestelle keine nur erhoffte Wunschkombination.' }
    ], sources: [registration, { label: 'FZV § 6: Antrag auf Zulassung', href: fzv('__6') }],
    related: ['auto-anmelden-kosten', 'auto-anmelden-vollmacht', 'sepa-mandat-kfz-steuer'],
    cta: 'Deine Unterlagen sind vorbereitet und die Kombination steht fest? Dann erledige jetzt den Schilderkauf bequem online.'
  },
  {
    slug: 'auto-anmelden-kosten', title: 'Was kostet es, ein Auto anzumelden?',
    teaser: 'Behördengebühr, Wunschkennzeichen, Schilder und weitere Ausgaben: So planst du dein Zulassungsbudget ohne Überraschungen.', category: 'Kosten verstehen',
    intro: [
      'Du möchtest dein Auto anmelden und suchst einen klaren Gesamtpreis. In vielen Übersichten steht aber nur eine einzelne Grundgebühr. Später kommen Schilder, Wunschkombination oder zusätzliche Leistungen dazu. Wer diese Posten von Anfang an trennt, kann Angebote besser vergleichen.',
      'Hier erfährst du, wie du dein Budget aufbaust, welche Kosten einmalig entstehen und welche zum laufenden Fahrzeugbetrieb gehören. Statt einer scheinbar exakten Pauschale bekommst du einen nachvollziehbaren Rechenweg für deinen eigenen Zulassungsfall.'
    ], takeaway: 'Die Gesamtkosten bestehen aus Behördengebühren, gegebenenfalls Wunschkennzeichen und Reservierung, Schildern sowie optionalen Dienstleistungen. Die Kfz-Steuer und Versicherung kommen als laufende Kosten hinzu.',
    sections: [
      { id: 'kostenbloecke', title: '1. Welche Kosten wirklich zur Anmeldung gehören', paragraphs: ['Am übersichtlichsten ist eine Aufteilung nach Zahlungsempfänger. Die Behörde berechnet den Zulassungsvorgang, ein Schilderanbieter die Kennzeichen und ein gegebenenfalls beauftragter Zulassungsdienst seine eigene Leistung. So erkennst du, ob ein Angebot nur einen Teil oder mehrere Leistungen enthält.'], table: { headers: ['Posten', 'Wovon hängt er ab?', 'So prüfst du ihn'], rows: [
        ['Behördengebühr', 'Erstzulassung, Umschreibung, Wiederzulassung, Online- oder Vor-Ort-Verfahren und Zusatzvorgänge', 'Gebührenseite der zuständigen Zulassungsstelle'],
        ['Wunschkennzeichen und Reservierung', 'Ob du eine Wunschkombination und eine Reservierung nutzt', 'Offizielles Reservierungsportal'],
        ['Kennzeichenschilder', 'Stückzahl, Format, Ausführung und Versand', 'Gesamtpreis im Shop vor Zahlung'],
        ['Zulassungsdienst', 'Leistungsumfang und vereinbarter Servicepreis', 'Schriftliches Angebot einschließlich Fremdgebühren'],
        ['Zusätzliche Unterlagen', 'Beispielsweise Ersatzpapiere oder notwendige Gutachten', 'Zuständige Behörde oder Prüfstelle']
      ] } },
      { id: 'behoerde', title: '2. Warum die Behördengebühr kein fester Einheitspreis ist', paragraphs: [
        'Die Gebühren richten sich nach der Gebührenordnung für Maßnahmen im Straßenverkehr. Der konkrete Betrag ergibt sich aus deinem Vorgang und gegebenenfalls weiteren gebührenpflichtigen Maßnahmen. Technische Änderungen oder Ersatzdokumente können den Aufwand erhöhen. Eine veröffentlichte Grundgebühr ist deshalb nicht zwingend der Betrag auf deinem Bescheid.',
        'Beispiel Berlin: Für die Erstzulassung nennt das Serviceportal am Recherchetag mindestens 30,60 Euro vor Ort und 22,22 Euro bei Online-Antragstellung. Das sind keine bundesweiten Endpreise; je nach Einzelfall kommen weitere Gebühren hinzu. Schilder und Versicherung sind dabei separat zu kalkulieren.',
        'Auch der gewählte Weg spielt eine Rolle. Ein geeigneter Vorgang kann über i-Kfz andere Gebühren auslösen als am Schalter. Prüfe zuerst, ob dein Fahrzeug, deine Dokumente und deine Identifizierung die Online-Abwicklung überhaupt erlauben. Erst danach ist ein Preisvergleich zwischen diesen Wegen sinnvoll.'
      ] },
      { id: 'schilder', title: '3. Schilderpreis und Zulassung getrennt kalkulieren', paragraphs: [
        'Die Kennzeichenschilder sind ein eigener Kauf. Bei einem Auto brauchst du im üblichen Fall ein Schild vorne und eines hinten; bei einem Motorrad oder Anhänger ist die benötigte Anzahl anders. Ein zusätzliches Schild für einen Fahrradträger sollte ebenfalls bewusst in deine Rechnung einfließen.',
        'Vergleiche den Endbetrag für dieselbe Zusammenstellung. Ein günstiger Stückpreis kann bei zwei Schildern, einer besonderen Oberfläche und Versand anders aussehen als erwartet. Im Konfigurator von kennzeichen-lieferung.de kannst du die aktuelle Ausführung und Menge auswählen; der Checkout zeigt dir den verbindlichen Gesamtpreis vor dem Bezahlen.',
        'Entscheide zuerst, welche Kombination und Schildform du tatsächlich benötigst. Ein zu früh bestelltes Schild mit einer nicht verfügbaren Kombination bringt keine Ersparnis. Reservierung beziehungsweise Zuteilung und Schilderkauf sollten aufeinander aufbauen.'
      ] },
      { id: 'rechenweg', title: '4. Mit diesem Rechenweg planst du dein Budget', paragraphs: [
        'Nutze eine kleine Kostenliste, bevor du buchst. Trage zuerst den für deinen Vorgang veröffentlichten Behördenbetrag ein und ergänze alle erkennbaren Zusatzposten. Daneben kommt der Endpreis deiner Schilderbestellung einschließlich Versand. Falls du einen Dienstleister beauftragst, lasse dir erklären, welche Fremdgebühren enthalten sind.',
        'Eine praktische Formel lautet: Behördenkosten plus Wunschkombination und Reservierung plus Schilder und Versand plus optionaler Service. Stelle daneben eine separate Zeile für noch ungeklärte Kosten. So erkennst du sofort, welche Angaben du vor dem Termin noch erfragen musst.'
      ], items: ['Zulassungsvorgang eindeutig benennen.', 'Offizielle Gebühren und mögliche Zusatzvorgänge prüfen.', 'Schilder mit richtiger Stückzahl und Versand kalkulieren.', 'Fremdgebühren und Servicekosten auf Doppelberechnung prüfen.', 'Versicherung und Kfz-Steuer zusätzlich im laufenden Budget berücksichtigen.'] },
      { id: 'sparen', title: '5. Wo du sinnvoll Aufwand und Kosten sparst', paragraphs: [
        'Die einfachste vermeidbare Ausgabe ist häufig ein unnötiger zweiter Anlauf. Vollständige Unterlagen, ein korrektes SEPA-Mandat und eine passende eVB helfen, die Anmeldung beim vorgesehenen Termin zu erledigen. Frage bei unklaren Sonderfällen vorher nach, statt auf gut Glück zur Behörde zu fahren.',
        'Bei einer Ummeldung kann die zulässige Weiterführung vorhandener Kennzeichen neue Schilder überflüssig machen. Brauchst du hingegen eine neue Kombination oder neue Schilder, kannst du die Bestellung vorher vorbereiten. Entscheide anhand deines tatsächlichen Bedarfs: Nicht jeder Zulassungsvorgang erfordert automatisch einen neuen Schilderkauf.'
      ] }
    ],
    faq: [
      { question: 'Ist die Kfz-Steuer in der Anmeldegebühr enthalten?', answer: 'Nein. Die Steuer wird gesondert durch die Zollverwaltung festgesetzt und gehört zu den laufenden Fahrzeugkosten.' },
      { question: 'Ist online anmelden immer möglich?', answer: 'Nein. Die Voraussetzungen hängen unter anderem vom Vorgang, den Fahrzeugpapieren und der verfügbaren digitalen Identifizierung ab.' },
      { question: 'Sind Kennzeichenschilder im Behördenpreis enthalten?', answer: 'Üblicherweise ist die Anfertigung der Schilder eine gesonderte Leistung eines Schilderanbieters. Prüfe bei Paketangeboten den genauen Umfang.' }
    ], sources: [{ label: 'GebOSt: Anlage zur Gebührenordnung', href: 'https://www.gesetze-im-internet.de/gebost/anlage.html' }, registration, { label: 'BMV: Internetbasierte Fahrzeugzulassung', href: 'https://www.bmv.de/SharedDocs/DE/Artikel/StV/Strassenverkehr/internetbasierte-fahrzeugzulassung.html' }],
    related: ['auto-anmelden-unterlagen', 'auto-ummelden-kennzeichen-behalten', 'kennzeichen-online-bestellen'], cta: 'Kombination bestätigt? Stelle deine Schilder zusammen und sieh dir den aktuellen Bestellpreis vor der Zahlung an.'
  },
  {
    slug: 'auto-anmelden-vollmacht', title: 'Kann jemand anderes mein Auto für mich anmelden?',
    teaser: 'So funktioniert die Zulassung durch eine bevollmächtigte Person – mit Unterlagencheck, Unterschriften und typischen Fehlern.', category: 'Zulassung organisieren',
    intro: [
      'Der Zulassungstermin liegt mitten in deiner Arbeitszeit und die Fahrzeugabholung ist schon geplant. Musst du dafür selbst zur Behörde? Bei üblichen Zulassungsvorgängen kannst du eine andere Person beauftragen. Die richtige Vorbereitung entscheidet darüber, ob diese Vertretung reibungslos funktioniert.',
      'Ob Partnerin, Familienmitglied oder Zulassungsdienst: Die Behörde muss nachvollziehen können, wer den Antrag stellen darf und auf wen das Fahrzeug zugelassen werden soll. Mit einer klaren Vollmacht und einer vollständigen Mappe kannst du die Aufgabe gezielt übergeben.'
    ], takeaway: 'Ja, eine andere Person kann die Anmeldung grundsätzlich mit passender Vollmacht erledigen. Sie benötigt zusätzlich die üblichen Zulassungsunterlagen und die von der Behörde verlangten Identitätsnachweise.',
    sections: [
      { id: 'vertretung', title: '1. Wen kannst du zur Zulassung schicken?', paragraphs: [
        'Für die Vertretung musst du nicht zwingend einen gewerblichen Dienstleister beauftragen. Auch eine geeignete private Vertrauensperson kommt infrage. Wichtig sind eine wirksame Bevollmächtigung und die Fähigkeit, den konkreten Vorgang mit den vorhandenen Unterlagen zu erledigen.',
        'Ein Zulassungsdienst kann praktisch sein, wenn du Zeit sparen oder mehrere Vorgänge bündeln möchtest. Vergleiche dann den Leistungsumfang: Terminorganisation, Abholung, Behördengebühren und Schilder sind nicht automatisch in jedem Servicepreis enthalten. Kläre auch, wie und wann du Dokumente und Kennzeichen zurückbekommst.'
      ] },
      { id: 'vollmacht', title: '2. Was in der Vollmacht stehen sollte', paragraphs: [
        'Verwende möglichst das Formular deiner zuständigen Zulassungsbehörde. Dadurch werden die dort benötigten Angaben und Erklärungen direkt abgefragt. Eine allgemeine Notiz ohne eindeutig beschriebenen Auftrag kann Rückfragen auslösen, obwohl du die Vertretung eigentlich beauftragen wolltest.',
        'Trage die Daten so ein, wie sie in den Ausweisdokumenten stehen. Der Auftrag sollte den gewünschten Zulassungsvorgang und das betroffene Fahrzeug eindeutig erkennen lassen. Achte außerdem auf zusätzliche Erklärungen des Formulars, etwa zur Bekanntgabe von Gebühren- oder Steuerrückständen.'
      ], items: ['Vollständiger Name und Anschrift der künftigen Halterin oder des Halters.', 'Vollständiger Name und erforderliche Daten der bevollmächtigten Person.', 'Konkreter Auftrag, beispielsweise Umschreibung eines bestimmten Fahrzeugs.', 'Fahrzeug-Identifizierungsnummer und gegebenenfalls bisheriges Kennzeichen.', 'Ort, Datum und erforderliche Unterschrift der vollmachtgebenden Person.', 'Zusätzliche Einverständniserklärungen nach dem Behördenformular.'] },
      { id: 'unterlagen', title: '3. Welche Unterlagen die Vertretung mitnimmt', paragraphs: [
        'Die Vollmacht ersetzt die eigentlichen Anmeldeunterlagen nicht. Fahrzeugpapiere, eVB, erforderlicher HU-Nachweis und SEPA-Mandat bleiben notwendig. Dazu kommen der Identitätsnachweis der Vertretung und der von der Behörde verlangte Nachweis zu deiner Person.',
        'Prüfe vor der Übergabe, ob die Behörde Originale, einfache Kopien oder beglaubigte Kopien verlangt. Zwischen verschiedenen Unterlagen kann sie dabei unterscheiden. Eine digitale Datei ist nicht automatisch mit einer akzeptierten Papierkopie gleichzusetzen.',
        'Erstelle eine Übergabeliste für Originaldokumente. Das hilft beiden Seiten: Deine Vertretung sieht, was sie bekommen hat, und du kannst bei der Rückgabe prüfen, ob alles vollständig ist. Bei Teil II ist eine besonders sorgfältige Übergabe sinnvoll.'
      ] },
      { id: 'sepa', title: '4. Die häufigste Unterschriftenfalle: das SEPA-Mandat', paragraphs: [
        'Eine Vollmacht zur Anmeldung ist nicht dasselbe wie die Ermächtigung zum Einzug der Kfz-Steuer. Bereite das SEPA-Mandat deshalb separat vor. Die notwendigen Unterschriften sollten vor dem Termin auf dem vorgesehenen Formular vorhanden sein.',
        'Ist die kontoführende Person nicht identisch mit dem Fahrzeughalter, sieht das Formular zusätzlich eine Erklärung beziehungsweise Unterschrift des Halters vor. Lasse die Vertretung nicht erst am Schalter improvisieren. Welche Unterschriften und Nachweise verlangt werden, erklären das Formular und die zuständige Stelle.'
      ] },
      { id: 'uebergabe', title: '5. So wird aus der Vollmacht ein klarer Auftrag', paragraphs: [
        'Besprich vor dem Termin die Entscheidungen, die deine Vertretung treffen soll: bisheriges Kennzeichen behalten oder wechseln, Wunschkombination nutzen und welche Schilder benötigt werden. Hinterlege eine erreichbare Telefonnummer, falls die Behörde eine Rückfrage hat.',
        'Falls deine Kombination schon bestätigt und die passende Schildform geklärt ist, kannst du die Schilder online bestellen und zur Unterlagenmappe legen. Deine Vertretung kümmert sich dann im vorgesehenen Verfahren um die Zulassung und die amtlichen Plaketten. Plane den Lieferzeitpunkt passend zum Termin ein.',
        'Nach der Rückgabe prüfst du Halterdaten, Fahrzeugdaten und Kennzeichen in den Unterlagen. So bemerkst du Unstimmigkeiten früh. Bewahre die Dokumente anschließend passend auf: Teil I für den Fahrzeugbetrieb, Teil II an einem sicheren Ort.'
      ] }
    ], faq: [
      { question: 'Muss meine Vertretung mit mir verwandt sein?', answer: 'Für eine übliche Bevollmächtigung ist ein Verwandtschaftsverhältnis grundsätzlich nicht Voraussetzung. Entscheidend sind Auftrag, Nachweise und die Anforderungen der Behörde.' },
      { question: 'Reicht eine mündliche Erlaubnis?', answer: 'Verlasse dich darauf bei einer Anmeldung nicht. Nutze die schriftliche Vollmacht beziehungsweise den für das Verfahren vorgesehenen Nachweis.' },
      { question: 'Darf die Vertretung alle Formulare für mich unterschreiben?', answer: 'Das solltest du nicht pauschal annehmen. Insbesondere das SEPA-Mandat hat eigene Unterschriftsanforderungen.' }
    ], sources: [registration, { label: 'Bundesportal: Umschreibung mit Halterwechsel', href: 'https://verwaltung.bund.de/leistungsverzeichnis/DE/leistung/99036048001000/herausgeber/HB-S1000030000018516/region/04' }, { label: 'Dortmund: SEPA-Lastschriftverfahren und Vertretung', href: 'https://www.dortmund.de/services/kraftfahrzeugsteuer-sepa-lastschriftverfahren.html' }],
    related: ['auto-anmelden-unterlagen', 'sepa-mandat-kfz-steuer', 'fahrzeugschein-fahrzeugbrief-unterschied'], cta: 'Die Vertretung ist organisiert und deine Kombination bestätigt? Bereite jetzt auch die passenden Kennzeichenschilder vor.'
  },
  {
    slug: 'sepa-mandat-kfz-steuer', title: 'Wie fülle ich das SEPA-Mandat für die Kfz-Steuer aus?',
    teaser: 'IBAN, Halterdaten und Unterschriften verständlich erklärt: So bereitest du das Lastschriftmandat für die Zulassung vor.', category: 'Formulare verstehen',
    intro: [
      'Du hast Fahrzeugpapiere und Versicherungsnummer bereit – doch ein unscheinbares Steuerformular kann den Termin trotzdem stoppen. Beim SEPA-Mandat kommt es weniger auf schwierige Fachbegriffe als auf vollständige Angaben und die richtigen Unterschriften an.',
      'Wenn du das Formular in Ruhe vorbereitest, ist dieser Schritt gut überschaubar. Hier erfährst du, welche Angaben du bereitlegst, was bei einem fremden Konto wichtig ist und warum eine Zulassungsvollmacht die Unterschriften auf dem Mandat nicht automatisch ersetzt.'
    ], takeaway: 'Nutze das aktuelle amtliche SEPA-Mandat, üblicherweise Formular 032021. Trage Halter- und Kontodaten sorgfältig ein und beachte die Unterschriftsfelder, besonders bei abweichendem Kontoinhaber.',
    sections: [
      { id: 'zweck', title: '1. Wofür du das Mandat erteilst', paragraphs: [
        'Mit dem SEPA-Mandat erlaubst du den Einzug der Kraftfahrzeugsteuer vom angegebenen Konto. Die Kfz-Steuer wird von der Zollverwaltung verwaltet. Das Mandat ist weder die Zahlung der Zulassungsgebühr noch die Erlaubnis für deinen Versicherer, Versicherungsbeiträge abzubuchen.',
        'Trenne diese drei Zahlungen in deinen Unterlagen: Behörde, Kfz-Steuer und Versicherung. So suchst du später nicht bei der falschen Stelle nach einer Buchung. Den Steuerbetrag legt nicht der Kennzeichenshop fest; er ergibt sich aus der steuerlichen Festsetzung für dein Fahrzeug.'
      ] },
      { id: 'vorbereiten', title: '2. Diese Angaben legst du vorher bereit', paragraphs: [
        'Öffne das Formular über die Zollverwaltung oder das offizielle Portal deiner Zulassungsstelle. Benutze eine aktuelle Fassung und lies zuerst die Ausfüllhinweise. Ein altes Muster aus einer beliebigen Downloadsammlung kann zusätzliche Rückfragen verursachen.',
        'Lege deinen Ausweis und die Bankdaten bereit. Falls ein anderes Konto genutzt werden soll, stimme die Angaben und Unterschriften mit dieser Person ab. Eine IBAN solltest du direkt aus einer zuverlässigen Bankunterlage übernehmen und nicht aus dem Gedächtnis notieren.'
      ], items: ['Name und Anschrift der Halterin oder des Halters.', 'Name und Anschrift der kontoführenden Person, soweit im Formular gefordert.', 'IBAN sowie weitere im konkreten Formular verlangte Bankangaben.', 'Fahrzeug- oder Kennzeichenangaben, soweit bereits bekannt und vorgesehen.', 'Ort, Datum und die erforderlichen Unterschriften.'] },
      { id: 'ausfuellen', title: '3. Schritt für Schritt ausfüllen', paragraphs: [
        'Beginne mit den persönlichen Angaben. Halterdaten müssen zu deinem Zulassungsantrag passen, Kontodaten zur Person, deren Konto belastet werden soll. Falls beide identisch sind, folgen daraus die entsprechenden Angaben und Unterschriftsfelder im Formular.',
        'Übertrage anschließend die IBAN Zeichen für Zeichen. Vergleiche danach Anfang, Ende und sämtliche Zifferngruppen mit deiner Bankunterlage. Ein Konto kann grundsätzlich funktionieren und trotzdem durch einen einzelnen Schreibfehler im Formular unbrauchbar werden.',
        'Fülle Fahrzeugangaben nur so aus, wie es das aktuelle Formular und die Behörde vorsehen. Wenn die künftige Kennzeichenkombination noch nicht feststeht, erfinde keine Nummer. Kläre mit der Zulassungsstelle, welche Felder für deinen Vorgang zunächst offenbleiben dürfen.',
        'Zum Schluss kontrollierst du Datum und Unterschriften. Plane diesen Schritt vor der Übergabe an eine Vertretung ein. Eine ansonsten vollständige Mappe hilft nicht, wenn die Person mit der notwendigen Unterschrift am Termintag nicht erreichbar ist.'
      ] },
      { id: 'anderes-konto', title: '4. Was gilt bei einem anderen Kontoinhaber?', paragraphs: [
        'Die Steuer kann über ein geeignetes Konto einer anderen Person eingezogen werden, wenn das Mandat entsprechend erteilt wird. Das Formular unterscheidet deshalb zwischen Fahrzeughalter und Kontoinhaber. Beide Rollen müssen sauber zugeordnet bleiben.',
        'Bei abweichendem Kontoinhaber ist zusätzlich die im Formular vorgesehene Halterunterschrift erforderlich. Beachte auch die Erklärung zum Umgang mit Erstattungen. Besprecht vorab, welches Konto verwendet wird und wer die Steuerzahlungen wirtschaftlich trägt, damit später keine Missverständnisse entstehen.',
        'Eine beauftragte Person sollte das Mandat nicht einfach stellvertretend unterschreiben. Die Zulassungsvollmacht und die Lastschriftermächtigung haben unterschiedliche Zwecke. Nutze die Hinweise der Behörde und die vorgesehenen Unterschriften der beteiligten Personen.'
      ] },
      { id: 'fehlercheck', title: '5. Der letzte Check vor dem Termin', paragraphs: [
        'Lege das fertige Mandat neben den Zulassungsantrag und gleiche Namen und Anschrift ab. Prüfe, ob alle Seiten vorhanden und die Einträge lesbar sind. Wenn du das Formular digital ausgefüllt hast, kontrolliere auch den Ausdruck: Abgeschnittene Felder oder fehlende Unterschriften fallen am Bildschirm leicht weniger auf.',
        'Bewahre für deine Unterlagen eine Kopie auf. Wenn sich die Bankverbindung später ändert, nutze den dafür vorgesehenen Weg bei der Zollverwaltung. Eine Mitteilung an die Versicherung oder an einen Schilderanbieter ändert das Steuerkonto nicht automatisch.',
        'Wenn das Mandat vorbereitet ist, kannst du die übrige Anmeldung weiterplanen: eVB prüfen, Fahrzeugpapiere sortieren und eine gewünschte Kennzeichenkombination offiziell klären. Die geprägten Schilder lassen sich anschließend als separater Schritt online bestellen.'
      ] }
    ], faq: [
      { question: 'Ist das SEPA-Mandat eine Zahlung an den Kennzeichenshop?', answer: 'Nein. Es betrifft die Kfz-Steuer. Schilderbestellung, Versicherung und Behördengebühr werden davon getrennt abgewickelt.' },
      { question: 'Muss ich einen Steuerbetrag selbst eintragen?', answer: 'Berechne keinen eigenen Betrag, wenn das Formular ihn nicht verlangt. Die Steuer wird durch die zuständige Verwaltung festgesetzt.' },
      { question: 'Kann ich ein Konto meiner Partnerin oder meines Partners nutzen?', answer: 'Das ist bei entsprechend erteiltem Mandat möglich. Achte besonders auf die korrekten Rollen und die zusätzlichen Unterschriften bei abweichendem Kontoinhaber.' }
    ], sources: [tax, { label: 'Amtliches Formular 032021', href: 'https://www.formulare-bfinv.de/ffw/action/invoke.do?id=032021' }, { label: 'Landkreis Friesland: Kfz-Steuer und Unterschriften', href: 'https://www.friesland.de/buergerservice/dienstleistungen/kfz-steuer-900000349-0.html' }], related: ['auto-anmelden-unterlagen', 'auto-anmelden-vollmacht', 'zulassung-abgelehnt-gruende'], cta: 'Formulare erledigt und Kombination geklärt? Dann kannst du jetzt die passenden Schilder für dein Fahrzeug konfigurieren.'
  },
  {
    slug: 'auto-ohne-tuev-anmelden', title: 'Kann ich ein Auto ohne gültigen TÜV anmelden?',
    teaser: 'Was eine abgelaufene Hauptuntersuchung für die Zulassung bedeutet und wie du Prüfung und Fahrzeugtransport sinnvoll organisierst.', category: 'Hauptuntersuchung & Technik',
    intro: [
      'Ein Gebrauchtwagen passt zu deinem Budget, doch die Hauptuntersuchung ist abgelaufen. Vielleicht steht er schon länger auf einem privaten Stellplatz und soll endlich wieder auf die Straße. Jetzt stellt sich die entscheidende Frage: Erst anmelden oder erst zur Prüfung?',
      'Die umgangssprachliche Frage nach dem „TÜV“ meint in diesem Zusammenhang die vorgeschriebene Hauptuntersuchung, kurz HU. Für deine Planung musst du drei Dinge unterscheiden: die reguläre Zulassung, einen eventuell beschränkten Weg zur Prüfstelle und den sicheren Transport eines nicht fahrbereiten Autos.'
    ], takeaway: 'Ist für das Fahrzeug eine HU erforderlich und diese abgelaufen, ist eine reguläre Zulassung in der Regel erst nach bestandener Prüfung möglich. Ein Kurzzeitkennzeichen erlaubt ohne gültige HU nur gesetzlich begrenzte Fahrten.',
    sections: [
      { id: 'regel', title: '1. Warum die HU bei der Zulassung wichtig ist', paragraphs: [
        'Die Hauptuntersuchung betrifft die Verkehrssicherheit und die vorgeschriebenen technischen Anforderungen des Fahrzeugs. Ein Kaufvertrag, eine bezahlte Versicherung oder neue Kennzeichenschilder ersetzen diesen Nachweis nicht. Prüfe deshalb vor der Terminbuchung, wann die nächste HU fällig ist.',
        'Bei einem gebrauchten Fahrzeug mit abgelaufener Prüffrist solltest du die Prüfung als eigenen Arbeitsschritt vor der regulären Anmeldung einplanen. Kläre bei Zweifeln mit der Behörde, welcher Nachweis erforderlich ist und ob die vorhandenen Angaben in den Fahrzeugpapieren ausreichen.'
      ] },
      { id: 'neuwagen', title: '2. Kein Prüfbericht bedeutet nicht automatisch abgelaufene HU', paragraphs: [
        'Ein fabrikneuer gewöhnlicher Pkw muss nicht schon vor seiner ersten Zulassung eine turnusmäßige HU hinter sich haben. Die erste Untersuchung wird nach dem für diese Fahrzeugart geltenden Intervall fällig. Deshalb ist „kein HU-Bericht vorhanden“ bei einem Neuwagen anders zu bewerten als bei einem älteren, lange abgestellten Auto.',
        'Auch ein verlorener Prüfbericht bedeutet nicht automatisch, dass die Prüfung nicht gültig ist. Prüfe die vorhandenen Zulassungsdaten und frage gegebenenfalls bei der Prüforganisation nach einer Zweitschrift. Fahrzeugart, Nutzung und Vorgeschichte bleiben dabei entscheidend; besondere Fahrzeuge können andere Intervalle haben.'
      ] },
      { id: 'pruefstelle', title: '3. Wie kommt das abgemeldete Auto zur Untersuchung?', paragraphs: [
        'Fahre nicht einfach mit alten, entstempelten oder fremden Schildern zur Prüfstelle. Ein abgemeldetes Fahrzeug darf nicht allein deshalb am öffentlichen Verkehr teilnehmen, weil eine Untersuchung geplant ist. Versicherungsschutz, zulässige Kennzeichnung und die Voraussetzungen des jeweiligen Verfahrens müssen zusammenpassen.',
        'Ein Kurzzeitkennzeichen kann unter den gesetzlichen Voraussetzungen einen begrenzten Weg zur Untersuchung ermöglichen. Ohne gültigen HU-Nachweis sind die Fahrten räumlich und nach ihrem Zweck beschränkt. Maßgeblich sind die gesetzlichen Vorgaben und die Eintragungen im zugehörigen Fahrzeugschein.',
        'Besprich die konkrete Strecke und den Fahrzeugstandort vorab mit der zuständigen Zulassungsstelle. Bei Unsicherheit oder fehlender Verkehrssicherheit ist ein geeigneter Transport auf Anhänger oder Transportfahrzeug die planbare Alternative. Eine Kennzeichnung macht ein technisch unsicheres Fahrzeug nicht sicher.'
      ] },
      { id: 'kurzzeit', title: '4. Warum ein Kurzzeitkennzeichen keine freie Überführung erlaubt', paragraphs: [
        'Die Ausnahme für Untersuchungsfahrten ist kein Freibrief für eine beliebige Überführung quer durch Deutschland. Ohne gültige HU sind grundsätzlich nur die dafür vorgesehenen Fahrten zur Untersuchungsstelle im Bezirk am Fahrzeugstandort oder in einen angrenzenden Bezirk und zurück möglich. Weitere Reparaturfahrten hängen vom festgestellten Mangelstatus und den gesetzlichen Bedingungen ab.',
        'Verlasse dich nicht auf Aussagen wie „Mit gelben Kennzeichen geht alles“. Prüfe den Einzelfall, bevor du eine Abholung organisierst. Für Fahrzeuge mit fehlender Betriebserlaubnis bestehen zusätzliche Voraussetzungen und Beschränkungen. Bei gefährlichen Mängeln kann eine Fahrt unzulässig bleiben.'
      ] },
      { id: 'plan', title: '5. Ein sinnvoller Ablauf für dein Fahrzeug', paragraphs: [
        'Beginne mit einer Bestandsaufnahme: gültige Fahrzeugpapiere, HU-Status, fahrbereiter Zustand und Standort. Lasse offensichtliche technische Probleme vor der Untersuchung einschätzen. So vermeidest du, Transport, Termin und Reparatur mehrfach organisieren zu müssen.',
        'Nach einer bestandenen HU ordnest du den Prüfbericht deinen Zulassungsunterlagen zu. Anschließend kümmerst du dich um Versicherung, Steuerformular und die konkrete Anmeldung. Wenn eine neue Kombination nötig ist, kläre sie offiziell und bestelle erst dann die passenden Kennzeichenschilder.',
        'Damit wird aus einer unklaren Situation eine nachvollziehbare Reihenfolge. Du weißt, welcher Schritt zuerst erledigt werden muss, und kannst den Zulassungstermin auf einen Zeitpunkt legen, an dem die erforderlichen Nachweise tatsächlich bereitliegen.'
      ], items: ['HU-Status und Fahrzeugzustand prüfen.', 'Zulässigen Transport oder beschränkte Untersuchungsfahrt klären.', 'Reparaturen und Untersuchung organisieren.', 'Nachweis sichern und Unterlagen vervollständigen.', 'Kombination klären, Schilder bestellen und reguläre Zulassung abschließen.'] }
    ], faq: [
      { question: 'Reichen zwei Monate Kulanz zum Anmelden?', answer: 'Plane nicht mit einer solchen pauschalen Kulanz. Eine abgelaufene HU wird dadurch nicht zu einem gültigen Nachweis für die Zulassung.' },
      { question: 'Darf ich neue Schilder vor der HU bestellen?', answer: 'Du kannst passende geprägte Schilder mit bestätigter Kombination kaufen. Der Kauf erlaubt aber keine Fahrt und ersetzt weder HU noch Zulassung.' },
      { question: 'Ist TÜV die einzige Prüforganisation?', answer: 'Nein. Die HU kann durch die dazu berechtigten Prüfstellen und Prüforganisationen durchgeführt werden.' }
    ], sources: [{ label: 'StVZO § 29: Hauptuntersuchung', href: 'https://www.gesetze-im-internet.de/stvzo_2012/__29.html' }, { label: 'StVZO Anlage VIII: Untersuchungsfristen', href: 'https://www.gesetze-im-internet.de/stvzo_2012/anlage_viii.html' }, { label: 'FZV § 42: Beschränkungen bei Kurzzeitkennzeichen', href: fzv('__42') }, shortTerm], related: ['kurzzeitkennzeichen-fahrzeugueberfuehrung', 'auto-anmelden-unterlagen', 'zulassung-abgelehnt-gruende'], cta: 'HU und Zulassung sind geklärt? Bereite jetzt die Schilder für deine bestätigte Kombination vor.'
  },
  {
    slug: 'fahrzeugschein-fahrzeugbrief-unterschied', title: 'Fahrzeugschein und Fahrzeugbrief: Was ist der Unterschied?',
    teaser: 'Teil I oder Teil II? Welche Fahrzeugpapiere du unterwegs brauchst, was die Behörde verlangt und wo du die Dokumente aufbewahrst.', category: 'Fahrzeugpapiere verstehen',
    intro: [
      'Der Verkäufer spricht vom Fahrzeugbrief, die Behörde verlangt Teil II und in deiner Tasche steckt ein Fahrzeugschein. Diese Begriffe meinen nicht vier unterschiedliche Dokumente. Wer die Bezeichnungen einmal richtig zuordnet, spart sich bei Kauf, Anmeldung und Kontrolle viel Unsicherheit.',
      'Beide Papiere gehören zum Fahrzeug, erfüllen aber verschiedene Aufgaben. Dieser Ratgeber zeigt dir die Unterschiede und hilft dir, die Unterlagen sicher aufzubewahren und für deinen nächsten Zulassungsvorgang richtig vorzubereiten.'
    ], takeaway: 'Der Fahrzeugschein heißt heute Zulassungsbescheinigung Teil I; der Fahrzeugbrief heißt Teil II. Teil I begleitet den Fahrzeugbetrieb. Teil II ist besonders für Zulassung und Verfügungsberechtigung wichtig und gehört sicher verwahrt.',
    sections: [
      { id: 'vergleich', title: '1. Die beiden Dokumente auf einen Blick', paragraphs: ['Die alten Namen sind im Alltag weiter gebräuchlich. Auf den heutigen Dokumenten und auf Behördenportalen findest du dagegen die Bezeichnungen Zulassungsbescheinigung Teil I und Teil II. Wenn jemand „den Brief“ verlangt, ist damit in der Regel Teil II gemeint.'], table: { headers: ['Frage', 'Teil I – Fahrzeugschein', 'Teil II – Fahrzeugbrief'], rows: [
        ['Wofür wichtig?', 'Fahrzeugbetrieb und Nachweis der Zulassungsdaten', 'Zulassungsverfahren und Prüfung der Verfügungsberechtigung'],
        ['Unterwegs dabei?', 'Beim Führen des Fahrzeugs grundsätzlich mitzuführen', 'Nicht als übliches Fahrtdokument mitnehmen'],
        ['Aufbewahrung', 'Für die berechtigte fahrende Person verfügbar halten', 'Sicher außerhalb des Fahrzeugs verwahren'],
        ['Bei Finanzierung', 'In der Regel für den Betrieb beim Nutzer', 'Häufig bei Bank oder Leasinggesellschaft'],
        ['Bei Anmeldung', 'Bei Gebrauchtfahrzeugen regelmäßig relevant', 'Bei vielen Zulassungsvorgängen erforderlich']
      ] } },
      { id: 'teil-eins', title: '2. Was im Fahrzeugschein steht', paragraphs: [
        'Teil I enthält Angaben zum Fahrzeug und zur Zulassung. Dazu gehören unter anderem Kennzeichen, Fahrzeug-Identifizierungsnummer und technische Daten. Die Felder sind standardisiert, damit sich bestimmte Informationen eindeutig zuordnen lassen. Für technische Fragen ist deshalb oft die konkrete Feldbezeichnung hilfreicher als eine freie Beschreibung.',
        'Wenn du Reifen, Fahrzeugklasse oder technische Änderungen prüfst, können zusätzliche Genehmigungen und Eintragungen relevant sein. Nicht jede zulässige Ausführung lässt sich aus einem einzelnen Blick auf eine Zeile ableiten. Bei Unklarheiten helfen die Fahrzeugunterlagen und eine fachkundige Prüfstelle.',
        'Beim Führen des Fahrzeugs ist Teil I grundsätzlich mitzuführen und auf Verlangen zur Prüfung auszuhändigen. Eine einfache Kopie oder ein Foto auf dem Smartphone ersetzt das erforderliche Dokument nicht ohne Weiteres. Organisiere die Übergabe deshalb auch dann, wenn mehrere Personen das Auto nutzen.'
      ] },
      { id: 'teil-zwei', title: '3. Was der Fahrzeugbrief aussagt – und was nicht', paragraphs: [
        'Teil II spielt eine wichtige Rolle, wenn über ein Fahrzeug verfügt oder eine Zulassung geändert werden soll. Für seine Ausfertigung ist die Verfügungsberechtigung nachzuweisen. Bewahre ihn deshalb sorgfältig auf und gib ihn nicht beiläufig mit anderen Unterlagen weiter.',
        'Die eingetragene Haltereigenschaft ist jedoch nicht automatisch mit dem zivilrechtlichen Eigentum gleichzusetzen. Bei Leasing oder Finanzierung können Fahrzeugnutzer, Halter und Eigentümer unterschiedliche Personen sein. Allein aus dem Namen im Dokument solltest du daher keine abschließende Eigentumsentscheidung ableiten.',
        'Beim Gebrauchtwagenkauf ist es sinnvoll, Fahrzeugdaten, Vertrag und Berechtigung des Verkäufers zusammen zu prüfen. Vergleiche die FIN in den Papieren mit dem Fahrzeug. Bei Widersprüchen oder fehlendem Teil II sollte der Sachverhalt geklärt sein, bevor du die weitere Abwicklung planst.'
      ] },
      { id: 'zulassung', title: '4. Welche Papiere brauche ich bei der Anmeldung?', paragraphs: [
        'Das hängt vom Vorgang ab. Bei einem inländischen Gebrauchtwagen mit Halterwechsel werden regelmäßig beide Teile benötigt. Bei einer reinen Anschriftenänderung kann die Vorlage von Teil I ausreichen; daraus folgt keine allgemeine Regel für jede Ummeldung.',
        'Liegt Teil II bei einer Bank, organisiere seine Bereitstellung vor dem Termin. Kläre mit Bank und Zulassungsstelle den Versandweg und den Zeitpunkt. Halte eine Bestätigung bereit, dass das Dokument tatsächlich bei der zuständigen Stelle angekommen ist, wenn der Vorgang davon abhängt.'
      ] },
      { id: 'verlust', title: '5. Bei Verlust oder beschädigten Dokumenten richtig reagieren', paragraphs: [
        'Fehlt ein Fahrzeugpapier, wende dich an die zuständige Zulassungsbehörde. Das Ersatzverfahren kann je nach Dokument unterschiedlich ausfallen. Besonders bei Teil II solltest du zusätzliche Zeit einplanen, statt einen kurzfristigen Zulassungstermin auf eine ungeklärte Grundlage zu setzen.',
        'Lege außerdem Sicherheitscodes nicht vorsorglich frei. Solche Felder sind für bestimmte internetbasierte Verfahren vorgesehen; das Freilegen kann die Gültigkeit des bisherigen Dokuments beeinflussen. Folge der offiziellen Anleitung genau dann, wenn du den passenden Online-Vorgang tatsächlich durchführst.',
        'Sobald deine Papiere vollständig sind, kannst du Kennzeichenart und bestätigte Kombination sauber daraus beziehungsweise aus der Reservierungsbestätigung übernehmen. Kontrolliere sie vor der Schilderbestellung erneut. Ein korrekt gefertigtes Schild mit falsch übertragener Kombination hilft dir bei der Zulassung nicht.'
      ] }
    ], faq: [
      { question: 'Ist der Fahrzeugbrief ein sicherer Eigentumsnachweis?', answer: 'Teil II ist ein wichtiges Zulassungsdokument. Eigentum und Haltereigenschaft sind aber nicht dasselbe; das Dokument allein beantwortet nicht jeden Eigentumsfall.' },
      { question: 'Soll ich Teil II im Handschuhfach lassen?', answer: 'Bewahre ihn sicher außerhalb des Fahrzeugs auf. Für den üblichen Fahrzeugbetrieb ist er nicht das mitzuführende Dokument.' },
      { question: 'Sind alte Fahrzeugpapiere automatisch ungültig?', answer: 'Nicht allein wegen der alten Bezeichnung. Ob ein Austausch erforderlich ist, hängt vom Dokument und vom jeweiligen Vorgang ab.' }
    ], sources: [{ label: 'FZV § 13: Zulassungsbescheinigung Teil I', href: fzv('__13') }, { label: 'FZV § 14: Zulassungsbescheinigung Teil II', href: fzv('__14') }, { label: 'FZV § 15: Änderungen und Anschriftenwechsel', href: fzv('__15') }], related: ['auto-anmelden-unterlagen', 'auto-anmelden-vollmacht', 'auto-ummelden-kennzeichen-behalten'], cta: 'Fahrzeugpapiere sortiert und Kombination bestätigt? Wähle jetzt die passenden Kennzeichenschilder für deinen nächsten Schritt.'
  },
  {
    slug: 'auto-ummelden-kennzeichen-behalten', title: 'Auto ummelden: Kann ich die bisherigen Kennzeichen behalten?',
    teaser: 'Umzug, Halterwechsel oder Wiederzulassung: Wann die Kennzeichenmitnahme möglich ist und wann du neue Schilder brauchst.', category: 'Ummeldung planen',
    intro: [
      'Du ziehst um und möchtest deine vertraute Buchstaben-Zahlen-Kombination behalten. Oder du kaufst ein zugelassenes Auto und fragst dich, ob seine Schilder am Fahrzeug bleiben können. In vielen Fällen ist das möglich – aber die nötige Ummeldung entfällt dadurch nicht.',
      'Für eine gute Entscheidung kommt es auf den genauen Vorgang an. Hier erfährst du, wie du Kennzeichenmitnahme, Halterwechsel und Wiederzulassung auseinanderhältst und wann eine neue Schilderbestellung tatsächlich sinnvoll ist.'
    ], takeaway: 'Bei einem Umzug kannst du das bisherige Kennzeichen grundsätzlich weiterführen, auch über Bezirksgrenzen hinweg. Auch bei einem Halterwechsel kommt die Weiterführung infrage. Das Fahrzeug muss trotzdem ordnungsgemäß umgeschrieben werden.',
    sections: [
      { id: 'umzug', title: '1. Umzug mit demselben Fahrzeug', paragraphs: [
        'Wenn du mit deinem zugelassenen Fahrzeug in einen anderen Zulassungsbezirk ziehst, kannst du grundsätzlich erklären, dass das bisherige Kennzeichen weitergeführt werden soll. Das vertraute Ortskürzel muss dann nicht allein wegen der neuen Anschrift verschwinden.',
        'Die neue Anschrift und die erforderlichen Register- beziehungsweise Dokumentänderungen bleiben wichtig. Informiere dich beim zuständigen Behördenportal über den Ablauf. Die Beibehaltung des Kennzeichens ersetzt keine Mitteilung des Wohnsitzwechsels.',
        'Praktisch bedeutet das: Prüfe zuerst, ob es sich nur um einen Anschriftenwechsel oder um weitere Änderungen handelt. Dadurch vermeidest du, vorsorglich neue Schilder zu bestellen, obwohl du die vorhandenen weiterverwenden möchtest und darfst.'
      ] },
      { id: 'halterwechsel', title: '2. Gebrauchtwagen kaufen und vorhandene Kennzeichen übernehmen', paragraphs: [
        'Auch bei einem Halterwechsel kann ein bisheriges Kennzeichen weitergeführt werden. Entscheidend ist der konkrete Zulassungsstatus und der beantragte Vorgang. Kläre mit dem Verkäufer, ob das Fahrzeug bis zur Übergabe zugelassen bleibt und wie die Umschreibung organisiert wird.',
        'Ein zugelassen gekauftes Auto muss auf den neuen Halter umgeschrieben werden. Ein Eintrag im Kaufvertrag allein erledigt das nicht. Bereite deshalb die für den Halterwechsel nötigen Unterlagen vor, insbesondere Versicherung und Steuerdaten.',
        'Notiere in deiner Planung ausdrücklich, ob du die Kombination behalten oder eine neue haben möchtest. Wenn diese Entscheidung erst am Schalter fällt, können vorbereitete Reservierungen oder neue Schilder überflüssig werden.'
      ] },
      { id: 'abmeldung', title: '3. Warum eine Abmeldung den Fall verändert', paragraphs: [
        'Ein bereits außer Betrieb gesetztes Fahrzeug wird nicht einfach so behandelt wie ein weiter zugelassenes Fahrzeug beim Umzug. Für eine Wiederzulassung musst du prüfen, welche Kombination verfügbar, reserviert oder erneut zuteilbar ist. Dass die alten Schilder noch im Kofferraum liegen, reicht nicht.',
        'Bei einer Außerbetriebsetzung kann unter den gesetzlichen Voraussetzungen eine Reservierung für die Wiederzulassung desselben Fahrzeugs erfolgen. Bei einem zuvor aus einem anderen Bezirk mitgenommenen Kennzeichen bestehen Besonderheiten. Lass dir die konkrete Möglichkeit und Frist deshalb von der Behörde bestätigen.',
        'Verwechsle außerdem die Weiterführung am selben Fahrzeug nicht mit der Übernahme einer Lieblingskombination auf ein anderes Auto. Letzteres ist ein eigener Vorgang und kann eine andere Reservierungs- und Freigabeplanung erfordern.'
      ] },
      { id: 'entscheidung', title: '4. Diese Fragen klärst du vor der Ummeldung', paragraphs: ['Mit wenigen Informationen kannst du das richtige Verfahren auswählen. Wenn du die Antworten vorab notierst, kann dir die Behörde oder ein beauftragter Zulassungsdienst gezielt weiterhelfen.'], items: [
        'Ist das Fahrzeug aktuell zugelassen oder bereits außer Betrieb gesetzt?',
        'Ändert sich nur deine Anschrift oder auch die Halterin beziehungsweise der Halter?',
        'Soll die Kombination am selben Fahrzeug weitergeführt werden?',
        'Sind die vorhandenen Schilder in einem geeigneten, lesbaren Zustand?',
        'Gibt es zusätzliche Änderungen, etwa eine andere Kennzeichenart?',
        'Welche Unterlagen verlangt die Behörde für genau diesen Vorgang?'
      ] },
      { id: 'neue-schilder', title: '5. Wann du neue Kennzeichenschilder brauchst', paragraphs: [
        'Neue Schilder sind naheliegend, wenn eine neue Kombination zugeteilt wird oder sich die benötigte Ausführung ändert. Auch ein beschädigtes Schild kann einen Austausch erforderlich machen. Bei Verlust oder Diebstahl solltest du zuerst das behördliche Verfahren klären; eine einfache Nachbestellung kann dann der falsche Weg sein.',
        'Wenn du dein Kennzeichen zulässig behältst und die Schilder weiterverwendbar sind, musst du nicht allein wegen des Umzugs neue kaufen. Möchtest du hingegen bewusst zu einer neuen Wunschkombination wechseln, reserviere beziehungsweise kläre sie zuerst offiziell.',
        'Sobald Kombination und Schildform bestätigt sind, kannst du bei uns die passenden Schilder konfigurieren. Prüfe dabei auch Zusätze wie E oder H sowie die Stückzahl. Die amtliche Änderung und die nötigen Plaketten gehören zum Zulassungsverfahren, nicht zur Schilderproduktion.'
      ] }
    ], faq: [
      { question: 'Darf ich bei einem Umzug in ein anderes Bundesland die Schilder behalten?', answer: 'Bei der Weiterführung am zugelassenen Fahrzeug ist das grundsätzlich möglich. Die erforderliche Ummeldung und Änderung deiner Anschrift bleiben bestehen.' },
      { question: 'Kann ich die Schilder eines abgemeldeten Autos einfach wieder montieren?', answer: 'Die vorhandenen Schilder allein berechtigen nicht zum Fahren. Wiederzulassung, Zuteilung und erforderliche Kennzeichnung müssen geklärt sein.' },
      { question: 'Spare ich durch Kennzeichenmitnahme alle Ummeldekosten?', answer: 'Nein. Du kannst gegebenenfalls neue Schilder und bestimmte Zusatzleistungen vermeiden; Gebühren für den eigentlichen Vorgang können weiterhin anfallen.' }
    ], sources: [{ label: 'FZV § 15: Weiterführung bei Umzug und Halterwechsel', href: fzv('__15') }, { label: 'FZV § 16: Außerbetriebsetzung und Reservierung', href: fzv('__16') }, { label: 'München: Umschreibung aus einem anderen Zulassungsbezirk', href: 'https://stadt.muenchen.de/service/info/kfz-zulassungsstelle/1064316/' }], related: ['auto-anmelden-kosten', 'fahrzeugschein-fahrzeugbrief-unterschied', 'wunschkennzeichen-reservieren'], cta: 'Du brauchst eine neue Kombination oder neue Schilder? Kläre die Zuteilung und bestelle anschließend die passende Ausführung online.'
  },
  {
    slug: 'kurzzeitkennzeichen-fahrzeugueberfuehrung', title: 'Wie bekomme ich ein Kurzzeitkennzeichen für die Fahrzeugüberführung?',
    teaser: 'Antrag, besondere eVB, Fahrzeugnachweise und Gültigkeit: So planst du die Überführung eines nicht zugelassenen Fahrzeugs.', category: 'Überführung organisieren',
    intro: [
      'Dein neues Auto steht beim Verkäufer, ist aber nicht zugelassen. Einfach ein paar Kennzeichen anschrauben und losfahren geht nicht. Für eine geplante Probe- oder Überführungsfahrt kann ein Kurzzeitkennzeichen der passende Weg sein, wenn die Voraussetzungen erfüllt sind.',
      'Besonders wichtig sind die richtige Versicherung, der konkrete Fahrzeugbezug und das Ablaufdatum. Dieser Ratgeber hilft dir, den Antrag passend zum Abholtermin vorzubereiten und die Grenzen des Verfahrens zu verstehen.'
    ], takeaway: 'Kurzzeitkennzeichen werden für ein bestimmtes Fahrzeug und Probe- oder Überführungsfahrten zugeteilt. Du brauchst insbesondere eine passende eVB und Fahrzeugnachweise. Ohne gültige HU gelten erhebliche Fahrtbeschränkungen.',
    sections: [
      { id: 'zweck', title: '1. Wofür das Kurzzeitkennzeichen gedacht ist', paragraphs: [
        'Ein Kurzzeitkennzeichen dient der zeitlich begrenzten Nutzung eines nicht regulär zugelassenen Fahrzeugs für die vorgesehenen Fahrtzwecke. Es ist kein allgemeines Ersatzkennzeichen für den Alltag und darf nicht nach Belieben zwischen verschiedenen Autos gewechselt werden.',
        'Das Fahrzeug wird im Antrag und im zugehörigen Fahrzeugschein bestimmt. Lege deshalb vor der Beantragung fest, welches Auto du tatsächlich abholen möchtest. Wenn der Kauf noch völlig offen ist, passt eine beliebige Verwendung für mehrere mögliche Fahrzeuge nicht zum Verfahren.'
      ] },
      { id: 'antrag', title: '2. Wo und mit welchen Unterlagen du den Antrag stellst', paragraphs: [
        'Als Anlaufstelle kommen die nach dem Verfahren zuständige Zulassungsbehörde beziehungsweise die für den Fahrzeugstandort zuständige Stelle in Betracht. Prüfe deren Informationen zu Zuständigkeit, Termin und Dokumenten, bevor du eine längere Anreise buchst.',
        'Für den Versicherungsnachweis brauchst du eine eVB, die ausdrücklich für Kurzzeitkennzeichen vorgesehen ist. Sage deiner Versicherung, welchen Vorgang du planst. Eine für eine andere Zulassungsart ausgestellte Nummer ist nicht automatisch geeignet.'
      ], items: ['Identitätsnachweis, gegebenenfalls mit Meldebescheinigung.', 'Passende elektronische Versicherungsbestätigung für Kurzzeitkennzeichen.', 'Erforderliche Fahrzeugdaten und Genehmigungsnachweise, beispielsweise aus den Fahrzeugpapieren.', 'Nachweis der gültigen HU beziehungsweise weiteren vorgeschriebenen Prüfung.', 'Bei Vertretung die verlangte Vollmacht und Identitätsnachweise.', 'Bei besonderen Fahrzeugen oder ausländischen Papieren die zusätzlich verlangten technischen Nachweise.'] },
      { id: 'gueltigkeit', title: '3. Wie lange gilt das Kennzeichen?', paragraphs: [
        'Verlasse dich nicht allein auf die umgangssprachliche Bezeichnung „Fünf-Tages-Kennzeichen“. Die aktuelle gesetzliche Regelung sieht ein Ablaufdatum bis zum Ende des fünften auf die Zuteilung folgenden Tages vor. Mit dem Zuteilungstag kann das bis zu sechs Kalendertage umfassen. Berlin beschreibt den Zuteilungszeitraum entsprechend mit maximal sechs Tagen ab Antragstellung.',
        'Für deine konkrete Fahrt zählen das tatsächlich zugeteilte Ablaufdatum und der Versicherungsschutz. Prüfe beides vor der Abholung. Nach Ablauf darf das Fahrzeug damit nicht mehr auf öffentlichen Straßen in Betrieb gesetzt werden.',
        'Plane Antrag, Abholung und mögliche Verzögerungen als zusammenhängenden Ablauf. Ein Kennzeichen zu früh zu beantragen kann unnötig Gültigkeitszeit verbrauchen. Eine spätere Abholung verlängert das aufgedruckte Datum nicht.'
      ] },
      { id: 'hu', title: '4. Was ohne gültige Hauptuntersuchung gilt', paragraphs: [
        'Ohne gültigen HU-Nachweis erlaubt das Kurzzeitkennzeichen keine beliebige Überführung. Dann sind nur die gesetzlich vorgesehenen beschränkten Fahrten zulässig, insbesondere zur Untersuchung am Fahrzeugstandort beziehungsweise im angrenzenden Bezirk und zurück. Die Beschränkungen werden im Fahrzeugschein vermerkt.',
        'Wenn die HU Mängel feststellt, hängen weitere Reparaturfahrten von der gesetzlichen Fallgruppe ab. Bei einem verkehrsunsicheren Fahrzeug darfst du nicht von einer freien Fahrtmöglichkeit ausgehen. Besprich den konkreten Zustand und die geplante Strecke vorab mit Behörde und gegebenenfalls Prüfstelle.',
        'Ein geeigneter Fahrzeugtransport ist die Alternative, wenn die Voraussetzungen nicht erfüllt sind. Kalkuliere ihn bereits beim Kauf mit ein. So steht die Abholung nicht kurzfristig still, weil ein vermeintlich unkomplizierter Kennzeichenweg rechtlich oder technisch nicht passt.'
      ] },
      { id: 'ausland', title: '5. Überführung im Inland und Fahrten ins Ausland unterscheiden', paragraphs: [
        'Die Anerkennung eines deutschen Kurzzeitkennzeichens im Ausland darfst du nicht pauschal voraussetzen. Wenn deine Strecke eine Grenze berührt, kläre vorab die Vorschriften und den Versicherungsschutz für alle betroffenen Länder. Für eine dauerhafte Ausfuhr kann ein anderes Verfahren erforderlich sein.',
        'Ebenso wichtig: Unser regulärer Konfigurator für Auto- und Motorradkennzeichen ist kein Antrag auf Kurzzeitkennzeichen. Die dafür nötige Kombination, Datumskennzeichnung und behördliche Zuteilung entstehen nicht durch die Eingabe einer beliebigen Nummer im Shop.',
        'Für die spätere reguläre Zulassung kannst du deine dauerhafte Kombination separat klären und die entsprechenden Schilder bei uns bestellen. Halte Übergangslösung und dauerhafte Kennzeichenbestellung auseinander, damit du für beide Schritte die passende Ausführung bekommst.'
      ] }
    ], faq: [
      { question: 'Kann ich das Kurzzeitkennzeichen für zwei Autos verwenden?', answer: 'Nein. Es ist dem konkret benannten Fahrzeug zugeordnet und darf nicht beliebig zwischen Fahrzeugen gewechselt werden.' },
      { question: 'Ist die Versicherung automatisch in den Schildern enthalten?', answer: 'Nein. Die passende Versicherung, die behördliche Zuteilung und die Herstellung der Schilder sind unterschiedliche Leistungen.' },
      { question: 'Verkauft der normale Auto-Konfigurator Kurzzeitkennzeichen?', answer: 'Nein. Der reguläre Konfigurator ersetzt weder den Antrag noch die besondere Ausführung eines Kurzzeitkennzeichens.' }
    ], sources: [shortTerm, { label: 'FZV § 42: Probefahrten und Überführungsfahrten', href: fzv('__42') }], related: ['auto-ohne-tuev-anmelden', 'auto-anmelden-unterlagen', 'kennzeichen-online-bestellen'], cta: 'Die spätere reguläre Zulassung ist vorbereitet? Bestelle hier deine dauerhaften Kennzeichenschilder mit bestätigter Kombination.'
  },
  {
    slug: 'zulassung-abgelehnt-gruende', title: 'Zulassung abgelehnt: Welche Gründe kann es geben?',
    teaser: 'Fehlende Papiere, unpassende eVB, HU oder offene Rückstände: So findest du den konkreten Hinderungsgrund und planst den nächsten Schritt.', category: 'Probleme lösen',
    intro: [
      'Du hast einen Termin organisiert und möchtest dein Auto endlich anmelden. Doch am Schalter oder im Online-Portal geht es nicht weiter. Das ist ärgerlich – lässt sich aber besser lösen, wenn du den tatsächlichen Hinderungsgrund kennst, statt den Antrag unverändert erneut zu stellen.',
      'Eine fehlende Unterlage, eine technische Online-Störung und eine förmliche Ablehnung sind unterschiedliche Situationen. Dieser Ratgeber hilft dir, sie zu sortieren und die nächste Nachfrage an die richtige Stelle zu richten.'
    ], takeaway: 'Lass dir den konkreten Grund nennen und unterscheiden, ob Unterlagen fehlen, ein Online-Schritt scheitert oder eine förmliche Entscheidung vorliegt. Erst danach kannst du gezielt nachreichen, Daten korrigieren oder den Sachverhalt klären.',
    sections: [
      { id: 'unterlagen', title: '1. Unterlagen fehlen oder passen nicht zusammen', paragraphs: [
        'Die häufigste praktische Frage lautet: Was genau fehlt? Es kann ein Originaldokument, eine Unterschrift oder ein Nachweis sein. Bitte um eine konkrete Liste mit der benötigten Form. „Fahrzeugpapiere unvollständig“ ist für die Vorbereitung weniger hilfreich als die genaue Angabe, welcher Teil oder welcher Genehmigungsnachweis benötigt wird.',
        'Vergleiche Name, Anschrift und FIN in den vorhandenen Unterlagen. Besonders bei älteren Fahrzeugen, Importen oder nach technischen Änderungen kann ein Vorgang zusätzliche Prüfung verlangen. Eine allgemeine Checkliste für einen Standard-Gebrauchtwagen deckt diese Fälle nicht vollständig ab.'
      ] },
      { id: 'versicherung', title: '2. Die eVB ist nicht für den Vorgang nutzbar', paragraphs: [
        'Wenn die elektronische Versicherungsbestätigung nicht akzeptiert wird, kontaktiere deinen Versicherer. Prüfe gemeinsam die übermittelte Nummer, die Halterdaten und die geplante Zulassungsart. Erkläre, ob du eine reguläre Anmeldung, eine besondere Nutzung oder ein Kurzzeitkennzeichen beantragen möchtest.',
        'Fordere nicht wahllos mehrere neue Nummern an. Notiere die Rückmeldung der Behörde und gib sie gezielt weiter. So kann die Versicherung prüfen, ob Daten oder Verwendungszweck angepasst werden müssen.'
      ] },
      { id: 'hu-genehmigung', title: '3. HU, Fahrzeugzustand oder Genehmigungsnachweise fehlen', paragraphs: [
        'Ist eine Hauptuntersuchung vorgeschrieben und abgelaufen, fehlt eine wichtige Voraussetzung für die reguläre Zulassung. Ein bereits vereinbarter Werkstatttermin oder neue Kennzeichenschilder lösen das Problem nicht. Organisiere zuerst die erforderliche Untersuchung beziehungsweise den Nachweis.',
        'Bei Importfahrzeugen oder erheblichen Umbauten können zudem Genehmigungsunterlagen oder technische Gutachten fehlen. Frage genau, welcher Nachweis erforderlich ist und welche Stelle ihn ausstellen kann. Plane notwendige Prüfungen ein, bevor du einen neuen Zulassungstermin festlegst.'
      ] },
      { id: 'rueckstaende', title: '4. Gebühren- oder Kfz-Steuerrückstände blockieren den Vorgang', paragraphs: [
        'Offene Kfz-Steuerforderungen und nach dem jeweiligen Landesrecht relevante Gebührenrückstände können der Zulassung entgegenstehen. Kläre, welche Forderung betroffen ist und welche Stelle die Erledigung bestätigen muss. Eine unklare Aussage über „offene Beträge“ solltest du konkretisieren lassen.',
        'Wenn du bereits gezahlt hast, bewahre den Zahlungsnachweis auf und frage, ob die Zahlung im zuständigen System verbucht wurde. Eine Abbuchung auf deinem Konto und die behördliche Aktualisierung können zeitlich auseinanderliegen. Ob ein Zahlungsnachweis für die Fortsetzung genügt, entscheidet die zuständige Stelle.',
        'Auch ein fehlerhaftes oder fehlendes SEPA-Mandat kann den Ablauf stoppen. Das ist von bestehenden Rückständen zu unterscheiden: Beim Mandat geht es um die künftige Abbuchung und die erforderlichen Erklärungen, bei Rückständen um bereits offene Forderungen.'
      ] },
      { id: 'online', title: '5. Ein gescheiterter Online-Antrag ist nicht immer eine Ablehnung', paragraphs: [
        'Im i-Kfz-Verfahren müssen unter anderem Identifizierung, Dokumentdaten, Versicherungsprüfung und Zahlung funktionieren. Scheitert ein technischer Schritt oder ist dein Vorgang für den Online-Weg nicht geeignet, bedeutet das nicht automatisch, dass das Fahrzeug grundsätzlich nicht zugelassen werden kann.',
        'Sichere die Fehlermeldung und eine vorhandene Vorgangsnummer. Notiere den Zeitpunkt und den zuletzt erfolgreich abgeschlossenen Schritt. Prüfe bei der Behörde, ob ein Antrag angelegt wurde und wie du weiter vorgehen sollst, bevor du erneut zahlst oder einen doppelten Vorgang startest.'
      ] },
      { id: 'naechster-schritt', title: '6. Mit einer klaren Rückfrage zur Lösung', paragraphs: [
        'Nutze eine kurze, sachliche Anfrage: „Welcher konkrete Nachweis fehlt, in welcher Form muss ich ihn einreichen und unter welcher Vorgangsnummer wird mein Antrag geführt?“ So erhältst du eher eine Antwort, mit der du handeln kannst. Halte deine vorhandenen Unterlagen griffbereit.',
        'Liegt ein förmlicher Bescheid vor, lies Begründung und Rechtsbehelfsbelehrung vollständig. Die dort genannten Fristen und Verfahrenswege sind maßgeblich. Ein allgemeiner Ratgeber kann diese Entscheidung nicht für deinen Einzelfall bewerten.',
        'Bestelle Schilder erst für eine offiziell geklärte Kombination und die passende Ausführung. Ein vorsorglicher Schilderkauf beseitigt keinen Hinderungsgrund. Wenn die Voraussetzungen anschließend feststehen, lässt sich die Bestellung als überschaubarer nächster Schritt erledigen.'
      ] }
    ], faq: [
      { question: 'Soll ich denselben Online-Antrag sofort erneut absenden?', answer: 'Kläre zunächst, ob bereits ein Vorgang oder eine Zahlung erfasst wurde. So vermeidest du unnötige Doppelvorgänge.' },
      { question: 'Helfen neue Kennzeichenschilder gegen die Ablehnung?', answer: 'Nur wenn genau die Schilderausführung das konkrete Problem ist und die Behörde dies geklärt hat. Fehlende Nachweise oder Rückstände lösen neue Schilder nicht.' },
      { question: 'Kann ich Unterlagen später nachreichen?', answer: 'Das hängt vom Vorgang und vom Bearbeitungsstand ab. Frage nach dem zulässigen Weg und einer möglichen Frist.' }
    ], sources: [{ label: 'Bundesportal: Kraftfahrzeug anmelden und Voraussetzungen', href: 'https://verwaltung.bund.de/leistungsverzeichnis/de/leistung/99036020001000/herausgeber/HB-S1000030000018506/region/040000000000' }, { label: 'BMV: Prüfungen und Ablauf bei i-Kfz', href: 'https://www.bmv.de/SharedDocs/DE/Artikel/StV/Strassenverkehr/internetbasierte-fahrzeugzulassung.html' }, registration], related: ['auto-anmelden-unterlagen', 'auto-ohne-tuev-anmelden', 'sepa-mandat-kfz-steuer'], cta: 'Alle offenen Punkte sind geklärt und deine Kombination ist bestätigt? Dann kannst du deine Kennzeichenschilder jetzt online vorbereiten.'
  },
  {
    slug: 'kennzeichengroessen', title: 'Welche Kennzeichengröße passt zu meinem Fahrzeug?',
    teaser: 'Auto, Motorrad oder Landmaschine: So vergleichst du die angebotenen Maße, die zugeteilte Kombination und die Anbringungsfläche.', category: 'Das passende Schild',
    intro: [
      'Ein Kennzeichen soll sauber am Fahrzeug sitzen und zu deiner Kombination passen. Trotzdem ist „Ich messe einfach die Halterung“ noch keine vollständige Entscheidung. Neben dem Platz am Auto zählen auch Fahrzeugart, Zeichenfolge und die von der Behörde zugelassene Ausführung.',
      'Hier findest du eine praktische Orientierung zu den Schildformen und zum aktuellen Shopangebot. Damit kannst du deine Bestellung gezielt vorbereiten und erkennst, wann du vor dem Kauf bei der Zulassungsstelle nachfragen solltest.'
    ], takeaway: 'Vergleiche zuerst die behördlich passende Schildform mit der Anbringungsfläche und der tatsächlich angebotenen Produktgröße. Gesetzlich mögliche Formate und im Shop auswählbare Produkte sind nicht automatisch identisch.',
    sections: [
      { id: 'auswahl', title: '1. Drei Fragen vor der Größenwahl', paragraphs: [
        'Beginne mit der Fahrzeugart: Pkw, Motorrad, Anhänger oder eine besondere Fahrzeugklasse benötigen nicht pauschal dasselbe Schild. Bestimme danach die Kennzeichenart, etwa Standard, E, H oder Saison. Zusätze und Datumsfelder verändern den Platzbedarf der Beschriftung.',
        'Prüfe dann die offiziell bestätigte Kombination. Ein kurzes Schild und eine lange Zeichenfolge passen nicht automatisch zusammen. Die Ausgestaltung unterliegt festen Anforderungen an Schrift, Abstände und Plakettenflächen. Eine optische Vorschau ist deshalb keine behördliche Zusage.'
      ], items: ['Welche Schildform ist für mein Fahrzeug vorgesehen oder zugeteilt?', 'Welche Kombination und welche Zusätze müssen darauf stehen?', 'Welche dieser passenden Ausführungen bietet der Konfigurator tatsächlich an?'] },
      { id: 'shopmasse', title: '2. Diese Maße kannst du im aktuellen Shop auswählen', paragraphs: ['Die folgende Tabelle beschreibt das aktuelle Produktangebot. Prüfe die Auswahl im Konfigurator vor der Zahlung nochmals, insbesondere wenn sich das Sortiment zwischenzeitlich ändert. Die Produktbezeichnung ersetzt keine Prüfung, ob dein Fahrzeug die Voraussetzungen für die Schildform erfüllt.'], table: { headers: ['Shopprodukt', 'Produktmaß', 'Wichtig vor der Bestellung'], rows: [
        ['Auto und reguläre einzeilige Varianten', '520 × 110 mm', 'Passende Kombination und gegebenenfalls E, H oder Saison prüfen'],
        ['Motorrad', '180 × 200 mm', 'Zweizeilige Anordnung und zulässige Zeichenfolge beachten'],
        ['Landmaschinen-Ausführung klein', '240 × 130 mm', 'Zuteilung des verkleinerten Formats und Zeichenlänge prüfen'],
        ['Landmaschinen-Ausführung breit', '255 × 130 mm', 'Fahrzeugart, Genehmigung und passende Anbringung klären']
      ] } },
      { id: 'rechtliche-masse', title: '3. Welche Maße die Vorschriften grundsätzlich vorsehen', paragraphs: [
        'Die Fahrzeug-Zulassungsverordnung unterscheidet mehrere Formate. Für einzeilige Schilder beträgt das Größtmaß der Breite 520 mm bei 110 mm Höhe. Für Kraftradkennzeichen nennt sie eine Breite von 180 bis 220 mm bei 200 mm Höhe. Daneben gibt es zweizeilige und verkleinerte zweizeilige Ausführungen.',
        'Diese Regelung beschreibt die zulässige Ausgestaltung und begründet keinen Anspruch auf jede Wunschgröße. Insbesondere verkleinerte zweizeilige Kennzeichen sind bestimmten Fahrzeugen beziehungsweise Voraussetzungen vorbehalten. Ein Traktor, ein Importauto und ein Motorrad dürfen deshalb nicht allein wegen einer ähnlich großen Halterung gleich behandelt werden.',
        'Für die Bestellung ist wichtig, was dir für dein konkretes Fahrzeug zugeteilt werden kann und welches Produkt verfügbar ist. Benötigst du ein Format außerhalb unseres aktuellen Konfigurators, bestelle kein ungefähr passendes Ersatzformat.'
      ] },
      { id: 'messen', title: '4. So prüfst du den Platz am Fahrzeug', paragraphs: [
        'Miss die tatsächlich nutzbare Fläche für das Schild und berücksichtige den Halter. Achte auf Kanten, Leuchten, Sensoren und andere Fahrzeugteile, die nicht verdeckt werden dürfen. Kontrolliere Vorder- und Rückseite getrennt; die Platzverhältnisse können unterschiedlich sein.',
        'Vergleiche Breite und Höhe immer zusammen. Ein vermeintlich „kleines“ Motorradkennzeichen ist höher als ein langes Autoschild. Auch Halterungen sind nicht automatisch für verschiedene Formen austauschbar. Frage bei Unsicherheit nach einem passenden Halter für genau dein Produktmaß.',
        'Nimm keine eigenmächtigen Veränderungen am Schild vor, um es passend zu machen. Abschneiden, Verformen oder Verändern der Beschriftung kann die vorgeschriebene Ausführung beeinträchtigen. Wenn die Montagefläche ungewöhnlich ist, kläre die Lösung vor dem Kauf mit der zuständigen Stelle.'
      ] },
      { id: 'kurz-sonderfall', title: '5. Kurze Kennzeichen, Saison und zusätzliche Schilder', paragraphs: [
        'Ein verkürztes einzeiliges Autokennzeichen ist im derzeitigen Auto-Konfigurator nicht auswählbar. Eine kurze Zeichenfolge führt daher nicht automatisch zu einer kürzeren gelieferten Platte. Entscheidend ist das konkret angebotene Maß.',
        'Bei E- und H-Kennzeichen gehören die entsprechenden Zusätze zur korrekten Ausführung. Bei Saisonkennzeichen benötigt das Saisonfeld Platz. Übernimm diese Informationen aus deiner Zuteilung, statt sie nur aus optischen Gründen auszuwählen.',
        'Für ein zusätzliches Schild am Fahrradträger brauchst du die passende Wiederholung der Fahrzeugkombination und eine geeignete Schildform. Prüfe die dafür vorgesehene Produktoption und die Halterung. Bei Verlust oder Diebstahl eines amtlichen Schilds klärst du dagegen zuerst das behördliche Verfahren; eine einfache Zusatzbestellung ist damit nicht gleichzusetzen.',
        'Wenn Form, Kombination und Anzahl zusammenpassen, ist der nächste Schritt einfach: Wähle das Produkt, kontrolliere die Vorschau und prüfe den Gesamtpreis. So gehst du mit einer konkreten und nachvollziehbaren Auswahl in die Bestellung.'
      ] }
    ], faq: [
      { question: 'Ist 520 × 110 mm die Standardgröße für Autos?', answer: 'Das ist das im regulären Auto-Konfigurator angebotene einzeilige Produktmaß. Bei besonderen Fahrzeugen können andere behördliche Vorgaben gelten.' },
      { question: 'Bekomme ich bei kurzer Kombination automatisch ein kurzes Schild?', answer: 'Nein. Die gelieferte Größe richtet sich nach dem angebotenen und gewählten Produkt. Ein verkürztes einzeiliges Schild ist derzeit nicht auswählbar.' },
      { question: 'Darf ich das kleinste zweizeilige Schild für jedes Fahrzeug wählen?', answer: 'Nein. Die verkleinerte Ausführung ist an Fahrzeugarten und Voraussetzungen gebunden. Kläre die Zuteilung vor der Bestellung.' }
    ], sources: [{ label: 'FZV Anlage 4: Maße und Ausgestaltung', href: fzv('anlage_4') }, { label: 'FZV § 12: Ausgestaltung und Anbringung', href: fzv('__12') }], related: ['kennzeichen-online-bestellen', 'wunschkennzeichen-reservieren', 'auto-anmelden-unterlagen'], cta: 'Du kennst Format und bestätigte Kombination? Wähle jetzt deine passenden Schilder im Konfigurator.'
  }
];

/** Editorial date, deliberately stable between builds. */
export const GUIDE_REVIEWED_DATE = '2026-10-24';
export function guideWordCount(guide: RegistrationGuide): number {
  const text = [guide.title, guide.teaser, ...guide.intro, guide.takeaway,
    ...guide.sections.flatMap(section => [section.title, ...section.paragraphs, ...(section.items ?? []), ...(section.table?.headers ?? []), ...(section.table?.rows.flat() ?? [])]),
    ...guide.faq.flatMap(item => [item.question, item.answer]), guide.cta].join(' ');
  return text.trim().split(/\s+/u).length;
}
export const guideReadingMinutes = (guide: RegistrationGuide) => Math.max(1, Math.ceil(guideWordCount(guide) / 200));
