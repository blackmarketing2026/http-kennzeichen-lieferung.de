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
    "wunschkennzeichen-reservieren"
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
    "kennzeichengroessen"
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
    "kurzzeitkennzeichen-fahrzeugueberfuehrung"
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
