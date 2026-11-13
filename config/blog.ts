/** Veröffentlichte Blogartikel. Entwürfe nicht in dieses Array aufnehmen. */
export type BlogArticle = {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string; // ISO-Datum, z. B. 2026-11-13
  updatedAt?: string;
  intro: string[];
  takeaway: string;
  sections: { id: string; title: string; paragraphs: string[]; items?: string[] }[];
  sources?: { label: string; href: string }[];
  relatedGuideSlugs?: string[];
  relatedLinks?: { href: string; label: string }[];
};

export const blogArticles: BlogArticle[] = [
  {
    "slug": "kennzeichen-reinigen",
    "title": "Kennzeichen reinigen: schonend und gut lesbar",
    "description": "So entfernst du Schmutz vom Nummernschild und erkennst, wann Reinigen nicht mehr reicht. Mit kurzer Checkliste für die nächste Fahrt.",
    "category": "Kennzeichen im Alltag",
    "publishedAt": "2026-11-13",
    "intro": [
      "Nach Regen, einer Landstraßenfahrt oder dem Winterdienst ist das Nummernschild oft das schmutzigste Teil am Auto. Ein schneller Blick vor der Abfahrt zeigt, ob Buchstaben, Zahlen und Plaketten noch deutlich zu erkennen sind. Für die normale Pflege brauchst du keine Spezialpolitur."
    ],
    "takeaway": "Weiche Schmutz mit Wasser ein und reinige vorsichtig. Bleiben Zeichen oder Oberfläche beschädigt, ist ein fachgerechter Austausch sinnvoller als Nachmalen.",
    "sections": [
      {
        "id": "vorbereiten",
        "title": "Erst prüfen, dann reinigen",
        "paragraphs": [
          "Sieh dir das Schild bei Tageslicht an. Liegt nur Schmutz auf der Fläche oder fehlt bereits Farbe? Prüfe auch den Rand, die Halterung und die Plaketten. Ein lockerer Rahmen wird durch Putzen nicht wieder sicher.",
          "Löse trockenen Sand nicht mit kräftigem Reiben. Spüle lose Partikel zunächst ab. Arbeite am abgestellten Fahrzeug und vermeide scharfe Werkzeuge an der Oberfläche."
        ]
      },
      {
        "id": "reinigen",
        "title": "Eine einfache Pflegeroutine",
        "paragraphs": [
          "Verwende lauwarmes Wasser, ein weiches sauberes Tuch und bei Bedarf geeignetes Autowaschmittel nach dessen Anleitung. Lasse fest sitzende Verschmutzungen zunächst aufweichen. Wische anschließend ohne starken Druck und spüle Rückstände ab.",
          "Der ADAC empfiehlt diese milde Reinigung und rät von aggressiven Mitteln wie Felgenreiniger ab. Bei den Plaketten besonders vorsichtig arbeiten; nicht daran kratzen oder ziehen."
        ],
        "items": [
          "Sauberes Tuch statt Scheuerschwamm verwenden.",
          "Keinen Eiskratzer auf Schrift und Plaketten einsetzen.",
          "Keine Politur oder zusätzliche Schutzfolie aufbringen."
        ]
      },
      {
        "id": "kontrollieren",
        "title": "Nach dem Trocknen erneut ansehen",
        "paragraphs": [
          "Vergleiche die gesamte Kombination mit dem Fahrzeugschein. Achte auf verblasste Zeichen, Risse und abgelöste Oberflächen. Prüfe beide Schilder getrennt: Vorne sitzen häufig Insekten, hinten eher Spritzwasser und Straßenschmutz.",
          "Wenn das Schild sauber, vollständig und fest montiert ist, besteht allein wegen seines Alters kein Anlass zum Neukauf. Wiederhole den kurzen Sichtcheck besonders bei Schnee und Matsch."
        ]
      },
      {
        "id": "ersetzen",
        "title": "Wenn Reinigung nicht mehr hilft",
        "paragraphs": [
          "Nachmalen kann die vorgeschriebene Ausführung verändern. Auch eine transparente Zusatzabdeckung ist keine allgemeine Lösung. Bei dauerhaft unleserlichem oder beschädigtem Schild klärst du den Austausch mit der Zulassungsstelle. Die bisherigen Schilder aufbewahren.",
          "Bestelle Ersatz erst mit der geklärten Kombination und Ausführung. Das geprägte Schild erhält die erforderlichen amtlichen Plaketten im zuständigen Verfahren; diese sind kein Bestandteil der normalen Schilderlieferung."
        ]
      }
    ],
    "sources": [
      {
        "label": "FZV § 12: Ausgestaltung und Anbringung der Kennzeichen",
        "href": "https://www.gesetze-im-internet.de/fzv_2023/__12.html"
      },
      {
        "label": "ADAC: Hinweise zur schonenden Kennzeichenreinigung",
        "href": "https://www.adac.de/news/kennzeichen-unlesbar-bussgeld/"
      }
    ],
    "relatedGuideSlugs": [
      "kennzeichen-beschaedigt-ersetzen"
    ],
    "relatedLinks": [
      {
        "href": "/blog/kennzeichenhalter-wechseln",
        "label": "Lockeren Kennzeichenhalter wechseln"
      }
    ]
  },
  {
    "slug": "kennzeichenhalter-wechseln",
    "title": "Kennzeichenhalter wechseln: so gehst du vor",
    "description": "Rahmen defekt oder Verschluss locker? So bereitest du den Wechsel vor und kontrollierst anschließend den festen Sitz deines Kennzeichens.",
    "category": "Kennzeichen im Alltag",
    "publishedAt": "2026-11-13",
    "intro": [
      "Ein beschädigter Halter ist kein Grund, automatisch neue Schilder zu kaufen. Ist das Kennzeichen selbst in Ordnung, kannst du es häufig weiterverwenden. Entscheidend sind ein passender Rahmen, intakte Befestigungspunkte und die Anleitung des Halterherstellers."
    ],
    "takeaway": "Erst den Verschluss erkennen, dann das Schild herausnehmen. Montiere einen passenden Rahmen an den vorgesehenen Punkten und kontrolliere alle Verriegelungen.",
    "sections": [
      {
        "id": "system",
        "title": "Welchen Verschluss hat dein Rahmen?",
        "paragraphs": [
          "Gängige Rahmen haben eine abnehmbare untere Leiste, seitliche Clips oder einen Klappmechanismus. Die Öffnungsrichtung ist nicht bei jedem Modell gleich. Suche vor dem Hebeln nach kleinen Markierungen oder der Montageanleitung.",
          "Lege ein weiches Tuch bereit, damit das Schild nicht auf den Boden fällt. Setzt du ein Werkzeug ein, darf es weder die Schildfläche noch den Fahrzeuglack beschädigen. Bei brüchigem Kunststoff ist kräftiges Ziehen selten hilfreich."
        ]
      },
      {
        "id": "ausbau",
        "title": "Schild und alten Rahmen ausbauen",
        "paragraphs": [
          "Öffne den vorgesehenen Verschluss und halte das Schild dabei fest. Lege es mit geschützter Oberfläche ab. Die amtlichen Plaketten bleiben am Schild. Anschließend löst du die Befestigung des leeren Rahmens.",
          "Merke dir die Lage der Schrauben und vorhandenen Distanzteile. Kontrolliere, ob Gewinde oder Aufnahmen beschädigt sind. Ist die Aufnahme im Fahrzeug ausgerissen, behebt ein neuer Rahmen allein das Problem nicht."
        ]
      },
      {
        "id": "einbau",
        "title": "Passenden Rahmen montieren",
        "paragraphs": [
          "Vergleiche Schildformat, Lochabstände und Befestigung mit dem Ersatzhalter. Nutze die vorgesehenen Fahrzeugaufnahmen und geeignete Schrauben nach Herstellerangaben. Es gibt keine Schraubenlänge, die für jedes Auto passt.",
          "Setze das Schild vollständig in die Führung und schließe alle vorgesehenen Clips. Es darf nicht nur an einer Ecke eingehakt sein. Schrift, Plaketten und vorgeschriebene Kennzeichnungen müssen sichtbar bleiben."
        ],
        "items": [
          "Schild sitzt in allen Führungen.",
          "Verschluss ist vollständig eingerastet.",
          "Rahmen und Schild wackeln nicht.",
          "Beleuchtung und vorhandene Sensoren werden nicht verdeckt."
        ]
      },
      {
        "id": "entscheidung",
        "title": "Wann brauchst du zusätzlich ein neues Schild?",
        "paragraphs": [
          "Risse, ausgerissene Löcher oder dauerhaft unleserliche Zeichen sind ein anderer Fall als ein defekter Rahmen. Kläre dann auch den Schilderaustausch. Ein fehlendes Schild gehört dagegen zum Verfahren bei Verlust oder Diebstahl.",
          "Im Shop sind Kennzeichenhalter als passende Zusatzartikel zur Schilderbestellung vorgesehen. Prüfe die aktuelle Auswahl und Maße. Für die alleinige Reparatur eines intakten Schilds musst du kein unnötiges Schilderpaket kaufen."
        ]
      }
    ],
    "sources": [
      {
        "label": "FZV § 12: Ausgestaltung und Anbringung der Kennzeichen",
        "href": "https://www.gesetze-im-internet.de/fzv_2023/__12.html"
      }
    ],
    "relatedGuideSlugs": [
      "kennzeichen-beschaedigt-ersetzen",
      "kennzeichen-verloren-gestohlen"
    ],
    "relatedLinks": [
      {
        "href": "/kennzeichenhalter",
        "label": "Halter als Zusatz zur Schilderbestellung"
      },
      {
        "href": "/blog/kennzeichen-bohren-befestigen",
        "label": "Direkte Verschraubung oder Rahmen?"
      }
    ]
  },
  {
    "slug": "kennzeichen-bohren-befestigen",
    "title": "Kennzeichen bohren oder im Halter befestigen?",
    "description": "Was du vor einer direkten Verschraubung prüfen solltest: Befestigungspunkte, Lesbarkeit und Alternativen ohne Löcher im Schild.",
    "category": "Kennzeichen im Alltag",
    "publishedAt": "2026-11-13",
    "intro": [
      "Neue Kennzeichen liegen bereit, am Auto sind aber nur zwei Befestigungspunkte zu sehen. Jetzt einfach durch das Schild zu bohren, kann die falsche Entscheidung sein. Prüfe zuerst, ob ein passender Halter die vorhandenen Aufnahmen nutzt."
    ],
    "takeaway": "Eine Halterung vermeidet zusätzliche Löcher im Schild. Bei direkter Befestigung müssen Position, Schrauben und Untergrund zum Fahrzeug passen; eine universelle Bohrschablone gibt es nicht.",
    "sections": [
      {
        "id": "halter",
        "title": "Die Lösung ohne zusätzliche Schildlöcher",
        "paragraphs": [
          "Ein geeigneter Rahmen wird am Fahrzeug befestigt und hält das Kennzeichen über seine Führungen und Verschlüsse. Dadurch brauchst du für diese Montage keine Löcher durch die Schildfläche. Vergleiche vor dem Kauf das Schildformat mit dem Rahmen.",
          "Ein beschädigter oder nicht vollständig geschlossener Halter ist keine sichere Alternative. Das Kennzeichen muss fest sitzen. Prüfe außerdem, ob der Rahmen die vorgeschriebene Beschriftung frei lässt."
        ]
      },
      {
        "id": "planung",
        "title": "Direkte Verschraubung zuerst planen",
        "paragraphs": [
          "Für eine direkte Montage sind die Anweisungen für Fahrzeug und Befestigung maßgeblich. Löcher und Schraubenköpfe dürfen die Erkennbarkeit der Kombination und die vorgeschriebene Ausgestaltung nicht beeinträchtigen. Plaketten und wichtige Kennzeichnungen sind keine Bohrstellen.",
          "Übertrage vorhandene Befestigungspunkte nicht blind: Das neue Schild kann anders angeordnet sein. Halte es zunächst an, kontrolliere die Lage und kläre im Zweifel mit Werkstatt oder Zulassungsstelle, ob die geplante Ausführung geeignet ist."
        ]
      },
      {
        "id": "grenzen",
        "title": "Nicht am montierten Schild ins Fahrzeug bohren",
        "paragraphs": [
          "Nimm das Schild für Arbeiten ab. Hinter der Montagefläche können Bauteile liegen, die du von außen nicht siehst. Unbekannte Aufnahmen oder fehlende Herstellerangaben sind ein Grund, die Montage von einer Werkstatt ausführen zu lassen.",
          "Eine fachgerechte Arbeit muss auch scharfe Kanten, lockere Schrauben und ein Verziehen des Schilds vermeiden. Drehe Schrauben nicht so fest, dass sich das dünne Schild sichtbar verformt. Halte die Vorgaben des Befestigungssystems ein."
        ]
      },
      {
        "id": "kontrolle",
        "title": "Der abschließende Befestigungscheck",
        "paragraphs": [
          "Kontrolliere den festen Sitz und die freie Sicht auf Zeichen und Plaketten. Prüfe am Heck auch die Kennzeichenbeleuchtung. Das Schild darf nicht hinter der Scheibe liegen oder lose am Fahrzeug hängen.",
          "Sind bereits falsche Löcher oder Risse vorhanden, löst eine weitere Schraube nicht jedes Problem. Prüfe den Ersatz des Schilds. Neue geprägte Schilder und amtliche Plaketten sind getrennte Schritte."
        ],
        "items": [
          "Passt die Befestigung zum Fahrzeug?",
          "Sind Kombination und Kennzeichnungen vollständig sichtbar?",
          "Sitzen Schild und Schrauben sicher?",
          "Ist die Fläche unverformt und ohne scharfe Kanten?"
        ]
      }
    ],
    "sources": [
      {
        "label": "FZV § 12: Ausgestaltung und Anbringung der Kennzeichen",
        "href": "https://www.gesetze-im-internet.de/fzv_2023/__12.html"
      }
    ],
    "relatedGuideSlugs": [
      "kennzeichen-beschaedigt-ersetzen"
    ],
    "relatedLinks": [
      {
        "href": "/blog/kennzeichenhalter-wechseln",
        "label": "Kennzeichenhalter wechseln"
      },
      {
        "href": "/kennzeichenhalter",
        "label": "Passende Halter und Zusätze ansehen"
      }
    ]
  },
  {
    "slug": "alte-kennzeichen-entsorgen",
    "title": "Alte Kennzeichen entsorgen oder aufbewahren?",
    "description": "Was nach Abmeldung oder Schildertausch wichtig ist: behördlichen Vorgang abschließen, Wiederverwendung prüfen und Metall richtig abgeben.",
    "category": "Kennzeichen im Alltag",
    "publishedAt": "2026-11-13",
    "intro": [
      "Nach einem Fahrzeugwechsel liegen die alten Schilder häufig noch in der Garage. Bevor du sie entsorgst, kläre ihren Status. Ein abmontiertes Schild ist nicht automatisch entstempelt und ein weggeworfenes Schild meldet kein Auto ab."
    ],
    "takeaway": "Erst das Zulassungsverfahren abschließen. Danach kannst du nicht mehr benötigte Aluminiumschilder nach den örtlichen Vorgaben als Altmetall abgeben oder als Erinnerung behalten.",
    "sections": [
      {
        "id": "status",
        "title": "Ist der behördliche Vorgang abgeschlossen?",
        "paragraphs": [
          "Bei einer Abmeldung müssen die erforderlichen Schritte der Außerbetriebsetzung abgeschlossen sein. Bei einem Ersatz wegen Beschädigung kann die Behörde die bisherigen Schilder noch benötigen. Entsorge sie deshalb nicht vor deinem Termin.",
          "Befolge bei einer Online-Abmeldung genau die Anweisungen des offiziellen Portals. Lege Sicherheitscodes nicht vorsorglich frei. Das ist ein Verfahrensschritt und keine gewöhnliche Reinigung oder Vorbereitung für den Verkauf."
        ]
      },
      {
        "id": "behalten",
        "title": "Kannst du die Schilder später erneut verwenden?",
        "paragraphs": [
          "Prüfe vor einer Entsorgung, ob du die Kombination reservieren oder das Schild später wieder nutzen möchtest. Die weitere Verfügbarkeit der Kombination ist eine behördliche Frage. Dass du das Blech besitzt, sichert dir die Buchstaben-Zahlen-Folge nicht automatisch.",
          "Bewahre die Schilder trocken und so auf, dass die Oberfläche nicht zerkratzt. Bei späterer Verwendung müssen Kombination, Zustand, Ausführung und Zuteilung wieder zusammenpassen. Ein dekoratives Erinnerungsstück darf nicht als gültiges Schild an einem anderen Fahrzeug eingesetzt werden."
        ]
      },
      {
        "id": "recycling",
        "title": "Welcher Entsorgungsweg passt?",
        "paragraphs": [
          "Für Aluminiumschilder ist die örtliche Altmetallsammlung beziehungsweise ein geeigneter Wertstoffhof ein sinnvoller Anlaufpunkt. Frage den kommunalen Entsorger nach seinen Annahmeregeln. Sie können sich zwischen Gemeinden unterscheiden.",
          "Eine Gelbe Tonne ist nicht überall eine Wertstofftonne für beliebige Metallgegenstände. Wirf die Schilder deshalb nicht allein wegen ihres Materials hinein. Kunststoffhalter und Schrauben gegebenenfalls nach den örtlichen Vorgaben getrennt abgeben."
        ]
      },
      {
        "id": "abschluss",
        "title": "Vor der Abgabe kurz sortieren",
        "paragraphs": [
          "Prüfe, welche Teile du noch brauchst: Schilder, Halter und Befestigung sind unterschiedliche Gegenstände. Ein intakter Rahmen kann unter Umständen weiterverwendet werden, wenn er zum neuen Fahrzeug und Schild passt."
        ],
        "items": [
          "Abmeldung oder Austausch vollständig erledigt?",
          "Alte Schilder von der Behörde nicht mehr benötigt?",
          "Reservierung beziehungsweise Wiederverwendung geklärt?",
          "Örtlichen Annahmeweg für Altmetall geprüft?"
        ]
      },
      {
        "id": "neue",
        "title": "Neue Schilder nur für die bestätigte Kombination",
        "paragraphs": [
          "Für das nächste Auto bestellst du erst, wenn Kombination und Format feststehen. Eine frühere Reservierung lässt sich nicht allein durch dieselbe Eingabe im Shop verlängern. Die Bestellvorschau prüft deine Auswahl, ersetzt aber keine behördliche Zuteilung."
        ]
      }
    ],
    "sources": [
      {
        "label": "MV-Serviceportal: Außerbetriebsetzung und entstempelte Schilder",
        "href": "https://www.mv-serviceportal.de/leistung?leistungId=108343211&ortId=7438"
      },
      {
        "label": "FZV § 12: Ausgestaltung und Anbringung der Kennzeichen",
        "href": "https://www.gesetze-im-internet.de/fzv_2023/__12.html"
      }
    ],
    "relatedGuideSlugs": [
      "auto-ummelden-kennzeichen-behalten",
      "wunschkennzeichen-reservieren"
    ],
    "relatedLinks": [
      {
        "href": "/blog/kennzeichenhalter-wechseln",
        "label": "Intakten Rahmen weiterverwenden oder wechseln"
      }
    ]
  },
  {
    "slug": "fahrradtraeger-kennzeichen-ohne-stempel",
    "title": "Fahrradträger-Kennzeichen: Braucht es einen Stempel?",
    "description": "Wann du ein Wiederholungskennzeichen am Fahrradträger brauchst und warum es ohne amtliche Abstempelung auskommt.",
    "category": "Kennzeichen im Alltag",
    "publishedAt": "2026-11-13",
    "intro": [
      "Die Fahrräder sind aufgeladen, aber das hintere Kennzeichen ist kaum noch zu sehen. Für diesen Fall gibt es das Wiederholungskennzeichen. Es zeigt die Kombination des Autos noch einmal am Fahrzeug oder Ladungsträger."
    ],
    "takeaway": "Verdeckt der Träger oder die Ladung das hintere Kennzeichen teilweise oder vollständig, ist eine Wiederholung erforderlich. Nach § 12 Absatz 10 FZV benötigt sie keine Abstempelung.",
    "sections": [
      {
        "id": "pflicht",
        "title": "Entscheidend ist die Sicht mit montierter Ladung",
        "paragraphs": [
          "Prüfe den beladenen Zustand. Auch wenn der leere Träger die Nummer frei lässt, können Fahrräder oder Zubehör sie später verdecken. Ein teilweise verdecktes Schild ist bereits relevant.",
          "Das Zusatzschild ersetzt nicht die sonst erforderlichen Kennzeichen am Auto. Es sorgt dafür, dass die Fahrzeugkombination trotz Träger erkennbar bleibt. Prüfe außerdem die Sichtbarkeit der Fahrzeugleuchten und die Vorgaben für den Träger."
        ]
      },
      {
        "id": "ausfuehrung",
        "title": "Ohne Stempel heißt nicht selbst gebastelt",
        "paragraphs": [
          "Die Ausnahme betrifft die Abstempelung des Wiederholungskennzeichens. Verwende deshalb trotzdem ein geeignetes Kennzeichenschild in der vorgeschriebenen Ausführung. Eine Pappkopie, ein handgeschriebenes Schild oder eine frei erfundene Kombination sind kein Ersatz.",
          "Übernimm die tatsächlich zugeteilte Kombination des Zugfahrzeugs. Achte bei einer besonderen Ausführung wie einem E- oder Saisonkennzeichen auf die passende Wiederholung und kläre Zweifelsfälle vor der Bestellung."
        ]
      },
      {
        "id": "wechsel",
        "title": "Wenn der Träger an ein anderes Auto kommt",
        "paragraphs": [
          "Der Träger kann für mehrere Fahrzeuge geeignet sein, seine Kennzeichenkombination aber nicht automatisch. Vor einem Fahrzeugwechsel musst du prüfen, ob das eingesetzte Schild zur neuen Fahrzeugkombination passt.",
          "Das gilt auch beim Ausleihen eines Trägers. Lass ein fremdes Schild nicht aus Bequemlichkeit darin. Nutze die dafür vorgesehene Kennzeichenaufnahme und die modellbezogene Montageanleitung."
        ]
      },
      {
        "id": "check",
        "title": "Kontrolle vor der Fahrt",
        "paragraphs": [
          "Setze das Schild vollständig in die vorgesehene Aufnahme. Teste Verschlüsse und Leuchten nach der Anleitung des Trägers. Lade Fahrräder so, dass sie die notwendige Kennzeichnung und Beleuchtung nicht wieder verdecken."
        ],
        "items": [
          "Kombination stimmt mit dem Auto überein.",
          "Zusatzschild sitzt fest im Träger.",
          "Nummer ist mit aufgeladenen Rädern sichtbar.",
          "Leuchtenträger und Anschlüsse sind geprüft."
        ]
      },
      {
        "id": "bestellen",
        "title": "Die passende Bestelloption wählen",
        "paragraphs": [
          "Auf unserer Fahrradträger-Produktseite wird das Zusatzschild im dort beschriebenen Schilderpaket angeboten. Prüfe vor der Zahlung Anzahl und Zusammenstellung; dieser Artikel verspricht keinen separaten Einzelverkauf.",
          "Du brauchst für diesen Anwendungsfall keine amtlichen Plaketten mitzubestellen. Das unterscheidet das Wiederholungskennzeichen vom Ersatz eines beschädigten amtlichen Schilds am Auto."
        ]
      }
    ],
    "sources": [
      {
        "label": "FZV § 12: Ausgestaltung und Anbringung der Kennzeichen",
        "href": "https://www.gesetze-im-internet.de/fzv_2023/__12.html"
      },
      {
        "label": "Thule: Sicherheitshinweise für Fahrradträger",
        "href": "https://www.thule.com/-/s/approved/std.lang.all/fe/ty/bikesafety.pdf?rev=2.3"
      }
    ],
    "relatedGuideSlugs": [
      "kennzeichengroessen"
    ],
    "relatedLinks": [
      {
        "href": "/fahrradtraeger-kennzeichen",
        "label": "Bestelloption für das Fahrradträger-Zusatzschild"
      },
      {
        "href": "/blog/kennzeichen-lieferung-pruefen",
        "label": "Gelieferte Schilder kontrollieren"
      }
    ]
  },
  {
    "slug": "kennzeichen-falsch-bestellt",
    "title": "Kennzeichen falsch bestellt: Was jetzt hilft",
    "description": "Zahlendreher, falsches Format oder fehlender Zusatz? So prüfst du die Bestellung und klärst eine mögliche Korrektur.",
    "category": "Kennzeichen im Alltag",
    "publishedAt": "2026-11-13",
    "intro": [
      "In der Bestätigung steht eine andere Zahl als in deiner Reservierung. Jetzt zählt eine klare Nachricht mit den richtigen Angaben. Eine zweite Bestellung auf Verdacht kann die Sache teurer und unübersichtlicher machen."
    ],
    "takeaway": "Vergleiche Bestätigung und behördliche Unterlagen. Melde den Fehler sofort beim Anbieter. Ob eine Änderung noch möglich ist, hängt unter anderem vom Produktionsstand ab.",
    "sections": [
      {
        "id": "abgleich",
        "title": "Den Fehler genau benennen",
        "paragraphs": [
          "Öffne Bestellbestätigung und Reservierungsnachweis beziehungsweise Fahrzeugschein nebeneinander. Prüfe zuerst die Kombination Zeichen für Zeichen. Vergleiche danach Format, Oberfläche, Anzahl sowie E-, H- oder Saisonangaben, falls relevant.",
          "Unterscheide eine falsche Eingabe von einer fehlerhaften Lieferung. Steht die Kombination korrekt in der Bestellung, aber anders auf dem gelieferten Schild, ist das ein anderer Sachverhalt als ein von dir eingegebener Zahlendreher."
        ]
      },
      {
        "id": "kontakt",
        "title": "Mit diesen Angaben meldest du dich",
        "paragraphs": [
          "Nutze den Kontaktweg aus der Bestätigung oder dem Impressum. Teile die Bestellnummer, den konkreten Fehler und die gewünschte korrekte Ausführung mit. Bei einer abweichenden Lieferung helfen Fotos des Schilds und der Verpackung.",
          "Sende nicht ungefragt vollständige Ausweisdokumente. Für die erste Klärung reicht eine präzise Beschreibung. Bitte um Rückmeldung, ob die Bestellung gestoppt oder geändert werden kann; eine sofortige Korrektur lässt sich nicht versprechen."
        ],
        "items": [
          "Bestellnummer nennen.",
          "Bestellte und richtige Kombination klar gegenüberstellen.",
          "Fehlerart angeben: Eingabe, Ausführung oder Lieferung.",
          "Bei gelieferten Schildern aussagekräftiges Foto ergänzen."
        ]
      },
      {
        "id": "anfertigung",
        "title": "Warum eine Standardrückgabe nicht immer passt",
        "paragraphs": [
          "Kennzeichen werden für eine individuelle Kombination gefertigt. Für solche Waren kann die gesetzliche Ausnahme vom Widerrufsrecht greifen. Daraus folgt aber nicht, dass du eine fehlerhafte Herstellung akzeptieren musst: Ein Eingabefehler und ein Mangel sind getrennt zu beurteilen.",
          "Prüfe die geltenden Bedingungen des Anbieters und kläre den Einzelfall. Dieser Artikel verspricht weder eine kostenlose Neuanfertigung noch schließt er gesetzliche Mängelrechte aus."
        ]
      },
      {
        "id": "nutzung",
        "title": "Ein falsches Schild nicht montieren",
        "paragraphs": [
          "Ein Schild mit abweichender Kombination passt nicht zur Zuteilung. Versuche nicht, einen Buchstaben mit Folie, Stift oder Überkleben zu korrigieren. Bewahre das gelieferte Schild für die Klärung auf.",
          "Wenn eine neue Anfertigung nötig ist, kontrolliere vor dem erneuten Kauf auch die Menge. Bei mehreren Schildern muss dieselbe bestätigte Kombination durchgängig stimmen. Ein kurzer Gegencheck durch eine zweite Person kann einen weiteren Tippfehler vermeiden."
        ]
      }
    ],
    "sources": [
      {
        "label": "BGB § 312g: Widerrufsrecht und Ausnahmen",
        "href": "https://www.gesetze-im-internet.de/bgb/__312g.html"
      },
      {
        "label": "FZV § 12: Ausgestaltung und Anbringung der Kennzeichen",
        "href": "https://www.gesetze-im-internet.de/fzv_2023/__12.html"
      }
    ],
    "relatedGuideSlugs": [
      "kennzeichen-online-bestellen"
    ],
    "relatedLinks": [
      {
        "href": "/blog/kennzeichen-lieferung-pruefen",
        "label": "Checkliste für gelieferte Kennzeichen"
      },
      {
        "href": "/impressum",
        "label": "Kontakt zum Anbieter"
      }
    ]
  },
  {
    "slug": "kennzeichen-praegen-herstellung",
    "title": "Wie werden Kennzeichen geprägt?",
    "description": "Vom Rohling zur erhabenen Kombination: Was beim Prägen entsteht und weshalb ein fertiges Schild noch keine Zulassung ersetzt.",
    "category": "Kennzeichen im Alltag",
    "publishedAt": "2026-11-13",
    "intro": [
      "Ein deutsches Kennzeichenschild ist mehr als eine bedruckte Metallplatte. Bei einem geprägten Schild stehen die Buchstaben und Zahlen erhaben aus der Fläche heraus. Die Formgebung und die kontrastreiche Beschriftung erfüllen unterschiedliche Aufgaben."
    ],
    "takeaway": "Die Kombination wird in einen geeigneten Rohling geprägt und sichtbar ausgeführt. Die behördliche Zuteilung und die amtlichen Plaketten gehören zu einem anderen Vorgang.",
    "sections": [
      {
        "id": "rohling",
        "title": "Am Anfang steht die passende Schildform",
        "paragraphs": [
          "Vor der Fertigung muss feststehen, welche Ausführung benötigt wird. Ein einzeiliges Autoschild und ein Motorradschild haben andere Formate. Auch Platz für besondere Kennzeichenmerkmale ist bei der Auswahl zu berücksichtigen.",
          "Für Kennzeichenschilder gelten Vorgaben zur Ausgestaltung und Reflexion. Ein ähnliches Aussehen allein belegt nicht, dass ein beliebiges Dekoschild für den Straßenverkehr geeignet ist. Prüfe die Produktangaben zur vorgesehenen Nutzung."
        ]
      },
      {
        "id": "praegung",
        "title": "Was das Prägen verändert",
        "paragraphs": [
          "Beim Prägen wird die Zeichenform mechanisch in das Material eingebracht. Anders als bei einer flachen Beschriftung entsteht eine fühlbare Kontur. Die fertige Kombination muss mit der bestellten und behördlich geklärten Zeichenfolge übereinstimmen.",
          "Dieser Artikel erläutert das Grundprinzip. Er ist kein Einblick in eine bestimmte Fertigungsanlage und verspricht weder eine bestimmte Maschine noch eine konkrete Bearbeitungszeit. Wie der Anbieter produziert und versendet, ergibt sich aus seinen aktuellen Angaben."
        ]
      },
      {
        "id": "schrift",
        "title": "Warum Schriftbild und Lesbarkeit wichtig sind",
        "paragraphs": [
          "Die gesetzlichen Muster legen die Ausgestaltung fest. Zusätzliche Gestaltungsideen dürfen nicht einfach an die Stelle der vorgeschriebenen Beschriftung treten. Gerade bei vermeintlich ähnlichen Zeichen ist eine sorgfältige Kontrolle wichtig.",
          "Vergleiche Ortskürzel, Buchstaben und Zahlen mit deiner offiziellen Bestätigung. Achte auch darauf, dass die gewählte Ausführung zum Fahrzeug passt. Eine technisch mögliche Eingabe im Shop bedeutet nicht automatisch, dass die Behörde sie zuteilt."
        ]
      },
      {
        "id": "zulassung",
        "title": "Prägung, Reservierung und Zulassung auseinanderhalten",
        "paragraphs": [
          "Eine Reservierung sichert eine Kombination im jeweiligen behördlichen Verfahren. Die Bestellung beauftragt die Anfertigung der physischen Schilder. Die Zulassung und erforderliche Abstempelung erfolgen separat.",
          "Die normale Schilderlieferung enthält deshalb keine amtliche Zulassung und keine Stempelplaketten. Für das Wiederholungskennzeichen am Fahrradträger gilt eine besondere Regel zur fehlenden Abstempelung; das macht es nicht zu einem Ersatz für das amtliche Schild am Auto."
        ]
      },
      {
        "id": "bestellcheck",
        "title": "Vor der Fertigung lohnt der letzte Blick",
        "paragraphs": [
          "Prüfe die Vorschau vor dem Absenden. Korrekturen nach Beginn der individuellen Fertigung sind nicht selbstverständlich möglich."
        ],
        "items": [
          "Kombination offiziell bestätigt?",
          "Richtiges Format und richtige Kennzeichenart gewählt?",
          "Anzahl der Schilder geprüft?",
          "Lieferadresse und Gesamtpreis kontrolliert?"
        ]
      }
    ],
    "sources": [
      {
        "label": "FZV § 12: Ausgestaltung und Anbringung der Kennzeichen",
        "href": "https://www.gesetze-im-internet.de/fzv_2023/__12.html"
      },
      {
        "label": "FZV Anlage 4: Gestaltung der Kennzeichen",
        "href": "https://www.gesetze-im-internet.de/fzv_2023/anlage_4.html"
      }
    ],
    "relatedGuideSlugs": [
      "kennzeichen-online-bestellen",
      "wunschkennzeichen-reservieren"
    ],
    "relatedLinks": [
      {
        "href": "/din-74069",
        "label": "Informationen zur Kennzeichenausführung"
      },
      {
        "href": "/blog/kennzeichen-falsch-bestellt",
        "label": "Was bei einer falschen Bestellung zu tun ist"
      }
    ]
  },
  {
    "slug": "kennzeichen-lieferung-pruefen",
    "title": "Kennzeichen geliefert: Was solltest du prüfen?",
    "description": "Die kurze Wareneingangskontrolle vor Montage und Zulassung: Kombination, Ausführung, Anzahl und sichtbare Schäden.",
    "category": "Kennzeichen im Alltag",
    "publishedAt": "2026-11-13",
    "intro": [
      "Das Paket ist da und der Zulassungstermin steht bevor. Nimm dir vor der Montage ein paar Minuten für die Kontrolle. So erkennst du eine Abweichung, solange Verpackung und Bestellbestätigung noch griffbereit sind."
    ],
    "takeaway": "Vergleiche jedes Schild mit Bestellung und offizieller Kombination. Prüfe anschließend Format, Anzahl und Zustand. Abweichungen vor Montage oder weiterer Bearbeitung melden.",
    "sections": [
      {
        "id": "auspacken",
        "title": "Vorsichtig öffnen und vollständig auslegen",
        "paragraphs": [
          "Öffne die Verpackung so, dass Messer oder Schere nicht über die Schildfläche fahren. Lege die Schilder auf eine saubere weiche Unterlage. Zähle sie einzeln, insbesondere wenn du ein Zusatzschild gewählt hast.",
          "Vergleiche auch bestellte Zusatzartikel mit der Bestätigung. Halter und Schrauben sind nur enthalten, wenn sie Bestandteil deiner konkreten Auswahl sind. Aus einem Bild auf einer Informationsseite lässt sich der Lieferumfang nicht ableiten."
        ]
      },
      {
        "id": "kombination",
        "title": "Jedes Zeichen einzeln vergleichen",
        "paragraphs": [
          "Lies nicht nur die bekannte Kombination als Ganzes. Vergleiche Ortskürzel, Buchstaben und Zahlen nacheinander mit dem amtlichen Nachweis. Prüfe bei mehreren Schildern jedes Exemplar.",
          "Kontrolliere E- oder H-Zusatz und gegebenenfalls Saisonmonate. Ein falscher Zusatz ist keine Kleinigkeit, die sich durch Montage erledigt. Wenn Bestellung und Lieferung auseinanderfallen, fotografiere die Abweichung für die Kontaktaufnahme."
        ]
      },
      {
        "id": "zustand",
        "title": "Format und Oberfläche ansehen",
        "paragraphs": [
          "Miss bei Unsicherheit Breite und Höhe und vergleiche das Ergebnis mit dem bestellten Produktmaß. Kontrolliere Kanten, Prägung und Oberfläche bei gutem Licht. Deutliche Knicke, Risse oder beschädigte Zeichen solltest du vor der Nutzung klären.",
          "Entferne oder bearbeite keine vorgeschriebenen Bestandteile des Schilds. Eine Wareneingangskontrolle ersetzt keine technische Prüfung; sie hilft dir, sichtbare Abweichungen zu entdecken. Bei Zweifeln schicke dem Anbieter ein klares Foto statt selbst nachzubessern."
        ]
      },
      {
        "id": "melden",
        "title": "Abweichungen nachvollziehbar melden",
        "paragraphs": [
          "Notiere Bestellnummer und betroffene Stückzahl. Halte die Verpackung zunächst bereit und dokumentiere sichtbare Transportschäden. Frage den Anbieter, wie der konkrete Fall weiter bearbeitet wird.",
          "Plane einen Termin nicht allein anhand eines vermuteten Ersatzlieferdatums um. Warte auf eine bestätigte Auskunft. Dieser Artikel gibt keine pauschale Lieferzeit und keine Zusage für eine kostenlose Neuanfertigung."
        ]
      },
      {
        "id": "weiter",
        "title": "Was nach der Kontrolle folgt",
        "paragraphs": [
          "Stimmen Schilder und Unterlagen überein, kannst du den nächsten vorgesehenen Schritt vorbereiten. Bei amtlichen Fahrzeugschildern gehört die erforderliche Abstempelung zum Zulassungsverfahren. Ein geliefertes ungestempeltes Schild ist allein noch keine allgemeine Fahrerlaubnis.",
          "Für die Montage nutze passende Halter oder ein geeignetes Befestigungssystem. Alte Schilder erst entsorgen, wenn die Behörde sie nicht mehr benötigt."
        ],
        "items": [
          "Alle bestellten Schilder und Zusätze vorhanden.",
          "Kombination und Ausführung stimmen.",
          "Keine ungeklärten sichtbaren Schäden.",
          "Behördlicher nächster Schritt und Montage vorbereitet."
        ]
      }
    ],
    "sources": [
      {
        "label": "FZV § 12: Ausgestaltung und Anbringung der Kennzeichen",
        "href": "https://www.gesetze-im-internet.de/fzv_2023/__12.html"
      }
    ],
    "relatedGuideSlugs": [
      "kennzeichen-online-bestellen",
      "kennzeichen-beschaedigt-ersetzen"
    ],
    "relatedLinks": [
      {
        "href": "/blog/kennzeichen-falsch-bestellt",
        "label": "Abweichung oder Bestellfehler klären"
      },
      {
        "href": "/blog/kennzeichenhalter-wechseln",
        "label": "Montage im Kennzeichenhalter"
      }
    ]
  }
];

export function blogReadingMinutes(article: BlogArticle) {
  const text = [article.title, article.description, ...article.intro, article.takeaway,
    ...article.sections.flatMap(section => [section.title, ...section.paragraphs, ...(section.items ?? [])])].join(' ');
  return Math.max(1, Math.ceil(text.trim().split(/\s+/u).length / 200));
}

export function formatBlogDate(date: string) {
  return new Intl.DateTimeFormat('de-DE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${date}T00:00:00Z`));
}
