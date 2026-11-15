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
  "slug": "e-kennzeichen-nachtraeglich",
  "title": "E-Kennzeichen nachträglich beantragen: der Ablauf",
  "description": "Schon zugelassen, aber noch ohne E? So klärst du Eignung, Behördenunterlagen und die Bestellung neuer Schilder.",
  "category": "Kennzeichen und Zulassung",
  "publishedAt": "2026-11-15",
  "intro": [
    "Dein Elektroauto ist bereits zugelassen, fährt aber noch mit normalen Schildern. Ein E am Ende lässt sich nicht einfach aufkleben. Wenn du die Kennzeichnung nachträglich möchtest, gehören die behördliche Änderung und neue passende Schilder zusammen."
  ],
  "takeaway": "Prüfe die Eignung deines Fahrzeugs und beantrage die Änderung bei der Zulassungsstelle. Bestelle die E-Schilder erst mit bestätigter Kombination und passendem Format.",
  "sections": [
    {
      "id": "eignung",
      "title": "Nicht jedes Fahrzeug mit Elektromotor erfüllt die Bedingungen",
      "paragraphs": [
        "Die Kennzeichnung richtet sich nach § 11 FZV und den dort genannten Voraussetzungen des Elektromobilitätsgesetzes. Bei einem Plug-in-Hybrid genügt die Bezeichnung Hybrid allein nicht. Die technischen Nachweise des konkreten Fahrzeugs sind entscheidend.",
        "Halte die Fahrzeugpapiere und gegebenenfalls die Übereinstimmungsbescheinigung (CoC) bereit. Lass unklare Angaben vor der Bestellung von der zuständigen Stelle prüfen. Der Schilderhersteller entscheidet nicht über die Berechtigung."
      ]
    },
    {
      "id": "antrag",
      "title": "Den nachträglichen Antrag vorbereiten",
      "paragraphs": [
        "Suche bei deiner Behörde nach E-Kennzeichen oder Änderung der Kennzeichenart. Das Berliner Serviceportal beschreibt auch den Antrag für bereits zugelassene Fahrzeuge. Die dortige Unterlagenliste umfasst unter anderem Fahrzeugpapiere, bisherige Schilder und Nachweise zur Eignung.",
        "Ob zusätzlich eine neue Versicherungsbestätigung benötigt wird, hängt vom Vorgang ab. Übernimm eine lokale Liste nicht ungeprüft für einen anderen Zulassungsbezirk. Kläre auch, ob die vorhandene Kombination erhalten bleiben kann."
      ]
    },
    {
      "id": "format",
      "title": "Das zusätzliche E braucht Platz",
      "paragraphs": [
        "Ein weiterer Buchstabe verändert den Platzbedarf. Prüfe die zulässige Kombination und das bestätigte Schildformat gemeinsam. Eine bisher knapp passende kurze Ausführung muss nicht auch mit E möglich sein.",
        "Wähle im Shop die Kennzeichenart E. Der Konfigurator ergänzt den Zusatz; gib das E nicht noch einmal als Teil der Grundkombination ein. Kontrolliere die fertige Vorschau und die Anzahl der benötigten Schilder."
      ]
    },
    {
      "id": "wechsel",
      "title": "Alte und neue Schilder sauber auseinanderhalten",
      "paragraphs": [
        "Bewahre die bisherigen Schilder für das behördliche Verfahren auf. Übertrage Stempel- oder HU-Plaketten nicht eigenmächtig. Die Bestellung neuer Schilder allein macht die Änderung nicht wirksam.",
        "Prüfe nach Abschluss alle Dienste, die deine Kennzeichenangabe verwenden: etwa eine Parkberechtigung, Garage oder hinterlegte Fahrzeugdaten. Ob etwas angepasst werden muss, richtet sich nach dem jeweiligen Anbieter."
      ],
      "items": [
        "Bestätigte Kombination samt E prüfen.",
        "Amtliche Änderung und Schildertausch abschließen.",
        "Hinterlegte Kennzeichenangaben vergleichen.",
        "Örtliche Parkregeln gesondert lesen."
      ]
    },
    {
      "id": "vorteile",
      "title": "Ein E ist kein allgemeiner Gratisparkschein",
      "paragraphs": [
        "Park- oder sonstige Nutzungsvorteile hängen von den örtlichen Regelungen und der Beschilderung ab. Auch mit E können Gebühren, Höchstparkdauer oder zusätzliche Nachweise gelten.",
        "Für Umweltzonen enthält die aktuelle 35. BImSchV eine Ausnahme für entsprechend gekennzeichnete Elektrofahrzeuge. Die Frage nach der Umweltplakette behandeln wir im verlinkten Beitrag gesondert."
      ]
    }
  ],
  "sources": [
    {
      "label": "FZV § 11",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__11.html"
    },
    {
      "label": "Berlin: E-Kennzeichen beantragen",
      "href": "https://service.berlin.de/dienstleistung/327084/"
    }
  ],
  "relatedGuideSlugs": [
    "kennzeichengroessen",
    "auto-anmelden-unterlagen"
  ],
  "relatedLinks": [
    {
      "href": "/e-kennzeichen",
      "label": "E-Kennzeichenschilder konfigurieren"
    },
    {
      "href": "/blog/elektroauto-umweltplakette",
      "label": "Braucht das Elektroauto eine Umweltplakette?"
    }
  ]
},
{
  "slug": "elektroauto-umweltplakette",
  "title": "Elektroauto und Umweltplakette: Was gilt mit E-Kennzeichen?",
  "description": "Die aktuelle Ausnahme für E-Kennzeichen erklärt – und warum Elektroantrieb und sichtbare Kennzeichnung nicht dasselbe sind.",
  "category": "Kennzeichen und Zulassung",
  "publishedAt": "2026-11-15",
  "intro": [
    "Du möchtest mit einem Elektroauto in eine Umweltzone fahren und fragst dich, ob zusätzlich eine grüne Plakette nötig ist. Die Antwort hängt nicht nur vom Antrieb ab. Wichtig ist auch, wie das Fahrzeug amtlich gekennzeichnet ist."
  ],
  "takeaway": "Nach der aktuell geprüften 35. BImSchV sind Fahrzeuge mit einer Kennzeichnung nach § 11 FZV von den dort erfassten Umweltzonen-Verboten auch ohne Umweltplakette ausgenommen. Ein Elektroauto ohne diese Kennzeichnung ist nicht allein wegen seines Antriebs automatisch davon befreit.",
  "sections": [
    {
      "id": "ausnahme",
      "title": "Die aktuelle Ausnahme richtig lesen",
      "paragraphs": [
        "Anhang 3 Nummer 11 der 35. BImSchV nennt Fahrzeuge mit einer Kennzeichnung für elektrisch betriebene Fahrzeuge nach § 11 FZV. Für ein entsprechend gekennzeichnetes deutsches Fahrzeug ist das E am Kennzeichen daher für diese Ausnahme entscheidend.",
        "Ältere Ratgeber können noch pauschal eine grüne Plakette für jedes Elektroauto verlangen. Prüfe bei widersprüchlichen Angaben den aktuellen Gesetzesstand und die Hinweise zur konkreten Umweltzone."
      ]
    },
    {
      "id": "ohne-e",
      "title": "Was ist bei einem Elektroauto ohne E?",
      "paragraphs": [
        "Ein Elektroantrieb ist von außen nicht immer eindeutig erkennbar. Die gesetzliche Ausnahme knüpft an die vorgeschriebene Kennzeichnung an. Verlasse dich deshalb nicht allein auf Modellname, Ladebuchse oder einen privaten Elektro-Aufkleber.",
        "Ohne passende Kennzeichnung prüfst du vor der Einfahrt die üblichen Anforderungen an eine Umweltplakette oder eine andere tatsächlich einschlägige Ausnahme. Eine erforderliche Plakette muss zu den Fahrzeugdaten passen; das bloße Bestellen eines E-Schilds schafft keine Berechtigung."
      ]
    },
    {
      "id": "ausland",
      "title": "Ausländische Kennzeichen gesondert prüfen",
      "paragraphs": [
        "§ 11 FZV enthält auch Regelungen für Fahrzeuge mit ausländischer Zulassung. Die vorgesehene Kennzeichnung kann sich von einem deutschen E-Kennzeichen unterscheiden. Ein beliebiger Aufkleber aus einem anderen Land ist nicht automatisch gleichwertig.",
        "Nutze dafür die amtlichen Hinweise zum ausländischen Fahrzeug. Bestelle keine deutschen Schilder, nur um eine Umweltzone zu befahren; Fahrzeugzulassung und Kennzeichnung müssen zusammenpassen."
      ]
    },
    {
      "id": "grenzen",
      "title": "Die Ausnahme hebt andere Regeln nicht auf",
      "paragraphs": [
        "Eine Umweltzone ist etwas anderes als eine Fußgängerzone, ein Bewohnerparkbereich oder eine zeitlich beschränkte Zufahrt. Auch Ladeplätze können eigene Nutzungsbedingungen haben. Lies deshalb weiterhin Schilder und Zusatzzeichen.",
        "Die Umweltzonen-Ausnahme bedeutet weder kostenloses Parken noch ein allgemeines Durchfahrtsrecht. Prüfe das Ziel vor der Fahrt, besonders wenn mehrere Verkehrsregelungen gleichzeitig gelten."
      ]
    },
    {
      "id": "entscheidung",
      "title": "Vor dem Kauf kurz abgleichen",
      "paragraphs": [
        "Schau zuerst auf deine vorhandenen Schilder und die Fahrzeugpapiere. Ist die passende E-Kennzeichnung bereits vorhanden, brauchst du allein für die hier beschriebene Ausnahme keine zusätzliche Umweltplakette.",
        "Möchtest du ein berechtigtes Fahrzeug nachträglich auf E umstellen, beginne beim Behördenverfahren. Die passende Schilderbestellung folgt auf die geklärten Angaben. So kaufst du kein Zubehör, das dein eigentliches Anliegen nicht löst."
      ]
    }
  ],
  "sources": [
    {
      "label": "35. BImSchV: Anhang 3, insbesondere Nummer 11",
      "href": "https://www.gesetze-im-internet.de/bimschv_35/anhang_3.html"
    },
    {
      "label": "FZV § 11",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__11.html"
    }
  ],
  "relatedGuideSlugs": [
    "auto-anmelden-unterlagen"
  ],
  "relatedLinks": [
    {
      "href": "/blog/e-kennzeichen-nachtraeglich",
      "label": "E-Kennzeichen nachträglich beantragen"
    },
    {
      "href": "/e-kennzeichen",
      "label": "E-Kennzeichenschilder ansehen"
    }
  ]
},
{
  "slug": "h-kennzeichen-voraussetzungen",
  "title": "H-Kennzeichen: Welche Voraussetzungen muss dein Auto erfüllen?",
  "description": "Alter allein genügt nicht: Zustand, Oldtimergutachten und Zulassung vor der Bestellung eines H-Kennzeichens prüfen.",
  "category": "Kennzeichen und Zulassung",
  "publishedAt": "2026-11-15",
  "intro": [
    "Dein Auto wird 30 Jahre alt. Damit stellt sich die Frage nach dem H-Kennzeichen. Das Alter ist ein wichtiger Einstieg, aber noch keine automatische Freigabe. Zustand und Begutachtung gehören ebenfalls dazu."
  ],
  "takeaway": "Ein Oldtimer muss die gesetzlichen Voraussetzungen erfüllen und für die H-Zulassung entsprechend begutachtet werden. Bestelle H-Schilder erst, wenn Kennzeichenart, Kombination und Format geklärt sind.",
  "sections": [
    {
      "id": "alter",
      "title": "30 Jahre sind nur ein Teil der Definition",
      "paragraphs": [
        "Die FZV beschreibt Oldtimer als Fahrzeuge, die vor mindestens 30 Jahren erstmals in Verkehr gekommen sind. Hinzu kommen ein weitgehend originaler Zustand, ein guter Erhaltungszustand und die Pflege des kraftfahrzeugtechnischen Kulturguts.",
        "Orientiere dich nicht nur am Modelljahr einer Baureihe. Prüfe die Angaben deines konkreten Fahrzeugs. Ein jüngeres Exemplar derselben Baureihe erfüllt die Altersvoraussetzung nicht automatisch."
      ]
    },
    {
      "id": "zustand",
      "title": "Umbauten vor der Begutachtung ansprechen",
      "paragraphs": [
        "Lass den Zustand und vorhandene Veränderungen fachlich beurteilen. Nicht jede Reparatur verhindert die Einstufung; umgekehrt ist ein altes Fahrzeug mit beliebigen Umbauten nicht automatisch geeignet. Eine pauschale Zusage anhand von Fotos wäre zu wenig.",
        "Stelle Unterlagen zu Umbauten und zur Fahrzeughistorie zusammen. Frage die Prüfstelle vor einem Termin, welche Nachweise sie benötigt. So vermeidest du, nur wegen fehlender Dokumentation erneut erscheinen zu müssen."
      ]
    },
    {
      "id": "gutachten",
      "title": "Oldtimergutachten und HU unterscheiden",
      "paragraphs": [
        "§ 23 StVZO regelt das Gutachten zur Einstufung als Oldtimer. Die Vorschrift sieht dabei grundsätzlich auch eine Untersuchung im Umfang der Hauptuntersuchung vor; für ein gleichzeitig erstelltes Gutachten nach § 21 gilt die dort genannte Ausnahme.",
        "Kläre mit der Prüfstelle den konkreten Umfang und welche Bescheinigungen du für die Zulassungsstelle erhältst. Ein positiver eigener Eindruck vom Auto ersetzt das erforderliche Gutachten nicht."
      ]
    },
    {
      "id": "zulassung",
      "title": "Erst die behördliche Grundlage, dann die Schilder",
      "paragraphs": [
        "Die Zuteilung des Oldtimerkennzeichens erfolgt auf Antrag. Neben dem Gutachten werden die Unterlagen für den jeweiligen Zulassungsvorgang benötigt. Prüfe die lokale Liste und die gewünschte Kombination vorab.",
        "Im Shop wählst du die H-Ausführung. Das H wird als Zusatz berücksichtigt und gehört nicht nochmals in die Grundkombination. Plane genug Platz für den zusätzlichen Buchstaben ein. Amtliche Plaketten erhältst du im Zulassungsverfahren, nicht als Bestandteil der normalen Schilderlieferung."
      ]
    },
    {
      "id": "entscheidung",
      "title": "Ganzjährig oder nur in einer Saison?",
      "paragraphs": [
        "Wenn du den Oldtimer nur zeitweise nutzt, kann eine Kombination mit Saison interessant sein. Sie verlangt aber eine eigene Entscheidung zu Monaten, Stellplatz und Versicherung. Der aktuelle Shop bietet H mit Saison nicht als kombinierte Ausführung an.",
        "Für die reguläre H-Ausführung findest du unten die Produktseite. Wenn du eine Kombination benötigst, bestelle nicht versehentlich ein ganzjähriges H-Schild als Ersatz dafür."
      ]
    }
  ],
  "sources": [
    {
      "label": "FZV: Begriffsbestimmungen, § 2 Nummer 22",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__2.html"
    },
    {
      "label": "FZV § 10",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__10.html"
    },
    {
      "label": "StVZO § 23: Oldtimergutachten",
      "href": "https://www.gesetze-im-internet.de/stvzo_2012/__23.html"
    }
  ],
  "relatedGuideSlugs": [
    "auto-anmelden-unterlagen",
    "kennzeichengroessen"
  ],
  "relatedLinks": [
    {
      "href": "/h-kennzeichen",
      "label": "Reguläre H-Kennzeichenschilder"
    },
    {
      "href": "/blog/h-saisonkennzeichen",
      "label": "H und Saison kombinieren"
    }
  ]
},
{
  "slug": "h-saisonkennzeichen",
  "title": "H und Saison kombinieren: Was du vorher klären solltest",
  "description": "Oldtimer nur einige Monate nutzen: Voraussetzungen, Platz auf dem Schild und Grenzen des aktuellen Shopangebots.",
  "category": "Kennzeichen und Zulassung",
  "publishedAt": "2026-11-15",
  "intro": [
    "Der Oldtimer steht im Winter ohnehin in der Garage. Ein H-Saisonkennzeichen kann dann zur Nutzung passen. Es verbindet die Oldtimerkennzeichnung mit einem festgelegten jährlichen Betriebszeitraum. Für die Bestellung ist das eine eigene kombinierte Ausführung."
  ],
  "takeaway": "H und Saison lassen sich grundsätzlich kombinieren. Dafür müssen sowohl die H-Voraussetzungen als auch die Regeln des Saisonzeitraums erfüllt sein. Die kombinierte Ausführung ist im aktuellen Shop nicht bestellbar.",
  "sections": [
    {
      "id": "kombination",
      "title": "Zwei Voraussetzungen gelten gleichzeitig",
      "paragraphs": [
        "§ 10 FZV ermöglicht die Saisonkennzeichnung auch für Oldtimerkennzeichen. Das ersetzt nicht das notwendige Oldtimergutachten. Ebenso hebt das H die Grenzen des Saisonzeitraums nicht auf.",
        "Kläre mit der Behörde, ob du eine bestehende H-Zulassung ändern möchtest oder das Fahrzeug erstmals als Oldtimer zulässt. Davon hängt ab, welche Nachweise bereits vorliegen und welche neu gebraucht werden."
      ]
    },
    {
      "id": "monate",
      "title": "Die Saison nach deiner Nutzung wählen",
      "paragraphs": [
        "Der Zeitraum umfasst mindestens zwei und höchstens elf volle Monate. Wähle ihn so, dass geplante Ausfahrten und Veranstaltungen hineinfallen. Außerhalb der Saison ist auch das Abstellen auf öffentlichen Straßen grundsätzlich unzulässig.",
        "Ein privater geeigneter Stellplatz ist deshalb ein wichtiger Teil der Entscheidung. Wenn du das Fahrzeug spontan ganzjährig nutzen möchtest, kann die reguläre H-Zulassung praktischer sein."
      ]
    },
    {
      "id": "platz",
      "title": "H und Monatszahlen brauchen Fläche",
      "paragraphs": [
        "Auf dem Schild müssen Kombination, H und Saisonangabe gemeinsam Platz finden. Bestelle nicht einfach die bisherige kleine Schildgröße mit zusätzlichen Angaben. Lass Kombination und Format für den konkreten Fall klären.",
        "Nimm Maße der vorhandenen Befestigung auf und gleiche sie mit der zulässigen Ausführung ab. Die Größe des Kennzeichenhalters allein entscheidet nicht darüber, was die Behörde zulässt."
      ]
    },
    {
      "id": "kosten",
      "title": "Die Entscheidung nicht nur am Schilderpreis festmachen",
      "paragraphs": [
        "Vergleiche den tatsächlichen Nutzungsbedarf mit Versicherungsbedingungen und den anfallenden Gebühren für die Änderung. Frage die Versicherung nach einem konkreten Angebot für deinen Zeitraum. Pauschale Sparversprechen helfen hier wenig.",
        "Auch die neuen Schilder und der organisatorische Aufwand gehören in den Vergleich. Für wenige zusätzliche Fahrten außerhalb der bisherigen Saison kann eine Änderung sinnvoll sein; entscheide anhand deiner Termine statt nur anhand eines beworbenen Monatsbeitrags."
      ]
    },
    {
      "id": "angebot",
      "title": "Wichtig für die Schilderbestellung",
      "paragraphs": [
        "Der aktuelle Konfigurator bietet H-Kennzeichen und Saisonkennzeichen als getrennte Arten. Die kombinierte Variante H mit Saison ist darin nicht enthalten. Zwei getrennte Bestellungen ergeben kein zulässiges kombiniertes Schild.",
        "Kläre eine passende Bezugsquelle für die bestätigte kombinierte Ausführung. Falls du dich bewusst für ein reguläres ganzjähriges H-Kennzeichen entscheidest, kannst du dafür die vorhandene H-Produktseite nutzen. Die behördliche Entscheidung muss dazu passen."
      ]
    }
  ],
  "sources": [
    {
      "label": "FZV § 10",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__10.html"
    }
  ],
  "relatedGuideSlugs": [
    "saisonkennzeichen-zeitraum-aendern",
    "kennzeichengroessen"
  ],
  "relatedLinks": [
    {
      "href": "/blog/h-kennzeichen-voraussetzungen",
      "label": "Voraussetzungen für das H-Kennzeichen"
    },
    {
      "href": "/h-kennzeichen",
      "label": "Ganzjährige H-Ausführung ansehen"
    }
  ]
},
{
  "slug": "hu-plakette-lesen",
  "title": "HU-Plakette lesen: Monat und Jahr schnell erkennen",
  "description": "So liest du die Prüfplakette am hinteren Kennzeichen und vergleichst den Termin mit deinen Unterlagen.",
  "category": "Kennzeichen und Zulassung",
  "publishedAt": "2026-11-15",
  "intro": [
    "Die runde Plakette hinten am Auto zeigt den nächsten HU-Termin. Du musst dafür keine Farben auswendig lernen. Zwei Angaben reichen: die Zahl in der Mitte und der Monat ganz oben."
  ],
  "takeaway": "Die mittlere Zahl steht für das Jahr, die oberste Zahl am Rand für den Monat. Kontrolliere beides zusammen und gleiche unklare Angaben mit dem Untersuchungsbericht ab.",
  "sections": [
    {
      "id": "ablesen",
      "title": "So liest du den Termin in drei Schritten",
      "paragraphs": [
        "Stelle das Fahrzeug sicher ab und sieh dir das hintere Kennzeichen gerade von hinten an. In der Mitte stehen die letzten beiden Ziffern des Jahres. Der oben stehende Wert am Rand bezeichnet den fälligen Monat.",
        "Steht oben die 6 und in der Mitte die 28, ist Juni 2028 gemeint. Die schwarze Markierung ist eine optische Hilfe; für deinen Termin liest du die Zahlen. Verwechsle den oberen Randwert nicht mit dem Monat, der gerade aktuell ist."
      ],
      "items": [
        "Jahreszahl in der Mitte ablesen.",
        "Obersten Monatswert am Rand ablesen.",
        "Monat und Jahr im Kalender vormerken."
      ]
    },
    {
      "id": "farbe",
      "title": "Warum die Farbe allein nicht reicht",
      "paragraphs": [
        "Die gesetzlich vorgesehenen Plakettenfarben wiederholen sich im Sechsjahresrhythmus. Eine Farbe ist deshalb kein dauerhaft eindeutiges Jahr. Bei älteren Fahrzeugfotos oder unklaren Bildern kann eine Zuordnung nur nach Farbe irreführen.",
        "Für den konkreten Termin sind die aufgedruckten Zahlen maßgeblich. Ist die Plakette verschmutzt, reinige sie behutsam. Kratze nicht an ihr und übermale keine unleserlichen Stellen."
      ]
    },
    {
      "id": "abgleich",
      "title": "Bei Unklarheit die Unterlagen prüfen",
      "paragraphs": [
        "Vergleiche die Plakette mit dem HU-Bericht und den Angaben in deinen Fahrzeugunterlagen. Stimmen sie nicht überein oder ist etwas nicht lesbar, kläre die Abweichung mit der zuständigen Prüfstelle beziehungsweise Behörde.",
        "Ein Kalenderhinweis aus einer App ist bequem, ersetzt aber keinen überprüften Termin. Plane den Untersuchungstermin rechtzeitig im angegebenen Monat. Eine neue Schilderbestellung verschiebt die HU nicht."
      ]
    },
    {
      "id": "unterschied",
      "title": "HU-Plakette, Stempel und Umweltplakette unterscheiden",
      "paragraphs": [
        "Die HU-Plakette sitzt am hinteren Kennzeichen und zeigt den Untersuchungszeitpunkt. Die amtliche Stempelplakette erfüllt eine andere Aufgabe im Zulassungsverfahren. Die Umweltplakette gehört bei entsprechendem Bedarf an die Windschutzscheibe.",
        "Kaufe deshalb keine beliebige Plakette, wenn eine Kennzeichnung fehlt. Frage nach dem richtigen Verfahren. Amtliche Prüf- oder Stempelplaketten sind kein frei austauschbares Zubehör zur Schilderbestellung."
      ]
    },
    {
      "id": "ersatz",
      "title": "Was passiert bei einem neuen hinteren Schild?",
      "paragraphs": [
        "Ist das hintere Schild beschädigt, kläre neben der Neuanfertigung auch die erforderliche Erneuerung der Plaketten. Bewahre das alte Schild und den HU-Nachweis auf. Löse die Plakette nicht zum Umkleben ab.",
        "Der verlinkte Ersatzratgeber erklärt die Vorbereitung des Schildtausches. Bestelle erst die bestätigte Kombination und Ausführung; der HU-Termin bleibt davon getrennt."
      ]
    }
  ],
  "sources": [
    {
      "label": "StVZO Anlage IX: Prüfplaketten",
      "href": "https://www.gesetze-im-internet.de/stvzo_2012/anlage_ix.html"
    },
    {
      "label": "StVZO § 29: Untersuchung und Prüfplakette",
      "href": "https://www.gesetze-im-internet.de/stvzo_2012/__29.html"
    }
  ],
  "relatedGuideSlugs": [
    "kennzeichen-beschaedigt-ersetzen",
    "auto-ohne-tuev-anmelden"
  ],
  "relatedLinks": [
    {
      "href": "/blog/kennzeichen-reinigen",
      "label": "Kennzeichen schonend reinigen"
    }
  ]
},
{
  "slug": "kennzeichen-entsiegeln-online-abmeldung",
  "title": "Online-Abmeldung: Kennzeichen erst im richtigen Schritt entsiegeln",
  "description": "Sicherheitscodes und amtliche Plaketten: So bereitest du die digitale Abmeldung vor und vermeidest einen unnötigen Abbruch.",
  "category": "Kennzeichen und Zulassung",
  "publishedAt": "2026-11-15",
  "intro": [
    "Für die digitale Außerbetriebsetzung werden Sicherheitscodes benötigt. Manche liegen unter Abdeckungen an Dokumenten und Stempelplaketten. Das Freilegen ist kein unverbindlicher Test: Bereite den Vorgang vollständig vor, bevor du damit beginnst."
  ],
  "takeaway": "Nutze die Anleitung des amtlichen Portals. Lege Codes erst im vorgesehenen Schritt frei und sichere die abschließende Bestätigung. Eine beschädigte Plakette allein ist keine bestätigte Abmeldung.",
  "sections": [
    {
      "id": "voraussetzungen",
      "title": "Zuerst prüfen, ob der digitale Weg passt",
      "paragraphs": [
        "§ 24 FZV beschreibt die internetbasierte Außerbetriebsetzung. Dafür müssen die Kennzeichenschilder und die Zulassungsbescheinigung Teil I die erforderlichen Sicherheitsmerkmale besitzen. Nicht jeder ältere Dokumentensatz ist geeignet.",
        "Öffne das Portal über die offizielle Website deiner Zulassungsbehörde. Prüfe den Vorgang zunächst ohne Beschädigung von Plaketten oder Dokumenten. Wenn Codes fehlen, nutze den von der Behörde vorgesehenen anderen Weg."
      ]
    },
    {
      "id": "vorbereiten",
      "title": "Fahrzeug und Unterlagen vorbereiten",
      "paragraphs": [
        "Stelle das Fahrzeug vor Beginn an einem geeigneten Ort ab und plane keine anschließende normale Fahrt mit entsiegelten Schildern. Halte alle benötigten Schilder und die Originaldokumente griffbereit. Sorge für eine stabile Verbindung und die vom Portal angebotene Zahlungsmöglichkeit.",
        "Wenn du die Kombination später wiederverwenden möchtest, lies vor Abschluss die Hinweise zur Reservierung. Die Aufbewahrung der Bleche allein reserviert die Nummer nicht."
      ],
      "items": [
        "Offizielles Portal und Voraussetzungen kontrollieren.",
        "Geeigneten Abstellplatz vor dem Entsiegeln wählen.",
        "Benötigte Schilder und Teil I bereitlegen.",
        "Reservierungswunsch und Abschlussnachweis einplanen."
      ]
    },
    {
      "id": "codes",
      "title": "Nur die verlangten Codes freilegen",
      "paragraphs": [
        "Folge den dargestellten Schritten des Portals für das konkrete Sicherheitsmerkmal. Bearbeite nicht versehentlich die HU-Plakette. Vermeide ein wahlloses Abschaben, bei dem der benötigte Code beschädigt wird.",
        "Behandle die freigelegten Codes vertraulich. Veröffentliche keine Fotos davon und sende sie nicht an einen Schilderhändler. Die Codes gehören in das amtliche Verfahren, nicht in den Konfigurator für neue Schilder."
      ]
    },
    {
      "id": "abschluss",
      "title": "Den Abschluss ausdrücklich kontrollieren",
      "paragraphs": [
        "Überprüfe nach Eingabe der Daten, ob der Vorgang tatsächlich erfolgreich abgeschlossen wurde. Speichere Bescheid, Bestätigung und Vorgangsnummer entsprechend den Portalhinweisen. Eine Zahlungsbuchung oder ein abgebrochener Bildschirm ist kein ausreichender Statusnachweis.",
        "Funktioniert der Abschluss nicht, wende dich mit der Fehlermeldung an die Behörde. Klebe abgelöste Stempel nicht wieder an und gehe nicht davon aus, dass der alte Zustand dadurch wiederhergestellt wäre."
      ]
    },
    {
      "id": "danach",
      "title": "Alte Schilder und spätere Nutzung trennen",
      "paragraphs": [
        "Erst nach geklärtem Status entscheidest du über Aufbewahrung oder Entsorgung. Für eine spätere Wiederzulassung kann eine neue Schilderbestellung nötig sein, etwa bei anderer Kombination oder beschädigtem Material.",
        "Die digitale Abmeldung selbst erfordert keinen vorsorglichen Schilderkauf. Der verlinkte Beitrag zur Wiederzulassung erklärt, wann Schilder und amtliche Nachweise wieder zusammenkommen."
      ]
    }
  ],
  "sources": [
    {
      "label": "FZV § 24",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__24.html"
    },
    {
      "label": "FZV § 12",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__12.html"
    }
  ],
  "relatedGuideSlugs": [
    "auto-online-zulassen-kennzeichen"
  ],
  "relatedLinks": [
    {
      "href": "/blog/alte-kennzeichen-entsorgen",
      "label": "Alte Kennzeichen aufbewahren oder entsorgen"
    }
  ]
},
{
  "slug": "wechselkennzeichen-zwei-autos",
  "title": "Wechselkennzeichen für zwei Autos: Passt das zu deinem Alltag?",
  "description": "Voraussetzungen, gemeinsamer Kennzeichenteil und Abstellplatz: Was du vor der Entscheidung für ein Wechselkennzeichen wissen solltest.",
  "category": "Kennzeichen und Zulassung",
  "publishedAt": "2026-11-15",
  "intro": [
    "Zwei Fahrzeuge, aber immer nur eines im Einsatz: Dafür kann ein Wechselkennzeichen infrage kommen. Es ist jedoch nicht einfach ein normales Schild, das du beliebig zwischen zwei Autos umsteckst. Beide Fahrzeuge müssen entsprechend zugelassen sein."
  ],
  "takeaway": "Das Wechselkennzeichen erlaubt keine gleichzeitige Nutzung beider Fahrzeuge. Das Fahrzeug ohne vollständige Kennzeichnung darf auch nicht auf öffentlichen Straßen abgestellt werden. Diese Ausführung wird im aktuellen Shop nicht angeboten.",
  "sections": [
    {
      "id": "fahrzeuge",
      "title": "Welche Fahrzeuge zusammenpassen müssen",
      "paragraphs": [
        "§ 9 FZV erlaubt die Zuteilung für zwei Fahrzeuge desselben Halters unter bestimmten Voraussetzungen. Sie müssen derselben der dort genannten Fahrzeugklassen M1, L oder O1 angehören und Schilder gleicher Anzahl und Abmessungen verwenden können.",
        "Zwei beliebige Fahrzeuge sind damit nicht automatisch kombinierbar. Lass die konkreten Fahrzeugdaten und die Kennzeichenausführung von der Zulassungsstelle prüfen. Eine optisch passende Halterung ist kein Nachweis der Zulässigkeit."
      ]
    },
    {
      "id": "teile",
      "title": "Wie die Kennzeichenteile zusammenarbeiten",
      "paragraphs": [
        "Die Ausführung besteht aus einem gemeinsamen Teil und einem am jeweiligen Fahrzeug verbleibenden Teil. Der gemeinsame Teil wird für die Nutzung umgesteckt. Erst die vollständige Kombination kennzeichnet das jeweilige Fahrzeug ordnungsgemäß.",
        "Lass dir vor der Anfertigung erklären, welche Teile in welcher Anzahl benötigt werden. Ein Satz normaler Schilder mit derselben Kombination ersetzt dieses System nicht."
      ]
    },
    {
      "id": "parken",
      "title": "Der Abstellplatz ist oft die entscheidende Frage",
      "paragraphs": [
        "Das Fahrzeug ohne vollständiges Wechselkennzeichen darf weder auf öffentlichen Straßen betrieben noch dort abgestellt werden. Du brauchst für das jeweils nicht genutzte Fahrzeug deshalb eine passende Abstellmöglichkeit außerhalb des öffentlichen Verkehrsraums.",
        "Wenn beide Autos morgens von verschiedenen Personen gebraucht werden, passt das Modell nicht. Auch ein Zweitwagen, der regelmäßig am Straßenrand wartet, lässt sich so nicht ohne Weiteres einplanen."
      ]
    },
    {
      "id": "alternativen",
      "title": "Mit getrennten Zulassungen und Saison vergleichen",
      "paragraphs": [
        "Ein Wechselkennzeichen kann nicht gleichzeitig als Saison-, rotes, Kurzzeit- oder Ausfuhrkennzeichen zugeteilt werden. Überlege deshalb, ob du wirklich zwischen zwei Fahrzeugen wechseln oder eines nur während bestimmter Monate nutzen möchtest.",
        "Vergleiche konkrete Versicherungsangebote und behördliche Kosten. Leite aus dem gemeinsamen Schild keine pauschale Halbierung aller laufenden Kosten ab. Der praktische Nutzen hängt vor allem von Nutzungszeiten und Stellplatz ab."
      ]
    },
    {
      "id": "bestellung",
      "title": "Keine normale Bestellung als Ersatz verwenden",
      "paragraphs": [
        "Der aktuelle Shop bietet keine Wechselkennzeichenausführung. Bestelle dafür nicht zwei gewöhnliche Kennzeichensätze. Kläre nach behördlicher Prüfung eine passende Anfertigung der speziellen Teile.",
        "Entscheidest du dich stattdessen für zwei reguläre Zulassungen, braucht jedes Fahrzeug seine eigene zugeteilte Kombination und passende Schilder. Für diese regulären Ausführungen kannst du den vorhandenen Konfigurator nutzen."
      ]
    }
  ],
  "sources": [
    {
      "label": "FZV § 9",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__9.html"
    }
  ],
  "relatedGuideSlugs": [
    "saisonkennzeichen-zeitraum-aendern",
    "kennzeichengroessen"
  ],
  "relatedLinks": [
    {
      "href": "/kennzeichen-bestellen",
      "label": "Schilder für eine reguläre Zulassung konfigurieren"
    }
  ]
},
{
  "slug": "leasing-wunschkennzeichen",
  "title": "Wunschkennzeichen beim Leasing: Wer kümmert sich um was?",
  "description": "Reservierung, Fahrzeugpapiere und Schilderkauf mit Händler und Leasinggesellschaft abstimmen – ohne doppelte Bestellung.",
  "category": "Kennzeichen und Zulassung",
  "publishedAt": "2026-11-15",
  "intro": [
    "Du möchtest dein neues Leasingauto mit einer persönlichen Kombination übernehmen. Bevor du selbst Schilder bestellst, kläre den Ablauf mit dem Händler. Häufig übernimmt ein Zulassungsdienst einzelne Schritte, während wichtige Fahrzeugpapiere bei der Leasinggesellschaft liegen."
  ],
  "takeaway": "Kläre Zuständigkeit, Halterdaten und die Einbindung deiner Reservierung schriftlich. Bestelle erst dann selbst Schilder, wenn feststeht, dass der Händler sie nicht bereits beschafft und die Kombination im Vorgang verwendet werden kann.",
  "sections": [
    {
      "id": "zustaendigkeit",
      "title": "Zuerst einen Ansprechpartner festlegen",
      "paragraphs": [
        "Frage beim Händler oder Leasinganbieter, wer die Zulassung tatsächlich erledigt. Das kann der Händler, ein externer Dienst oder nach Vereinbarung auch du selbst sein. Ein allgemeines Leasingangebot sagt noch nichts über deinen konkreten Ablauf aus.",
        "VWFS beschreibt für ein eigenes Angebot beispielsweise die Übergabe einer Wunschkennzeichenreservierung an den Zulassungspartner. Das zeigt eine mögliche Organisation, ist aber keine Zusage für jeden Leasingvertrag."
      ]
    },
    {
      "id": "reservierung",
      "title": "Die Reservierung mit dem Zulassungsvorgang verbinden",
      "paragraphs": [
        "Lass dir die vorgesehenen Halterdaten und den zuständigen Zulassungsbezirk bestätigen. Stimme ab, unter welchen Angaben die Wunschkombination reserviert werden soll und wie der Nachweis an den Bearbeiter gelangt.",
        "Prüfe die Gültigkeit deiner Reservierung gegen den geplanten Übergabetermin. Bei Lieferverzögerungen klärst du rechtzeitig, ob eine Verlängerung nötig und möglich ist. Eine abgelaufene Reservierung wird durch bereits geprägte Schilder nicht gerettet."
      ]
    },
    {
      "id": "papiere",
      "title": "Fahrzeugpapiere nicht einfach voraussetzen",
      "paragraphs": [
        "Bei Leasing liegt die Zulassungsbescheinigung Teil II häufig bei der Leasinggesellschaft. VWFS weist auf diese Dokumentenverwahrung hin. Frage deshalb vor einem eigenen Termin, wie die Papiere zur zuständigen Stelle gelangen.",
        "Plane keine Abholung oder Online-Zulassung mit Unterlagen, die du noch gar nicht erhalten sollst. Die genaue Bereitstellung und spätere Rückgabe richten sich nach dem Vertrag und dem vereinbarten Zulassungsweg."
      ]
    },
    {
      "id": "schilder",
      "title": "Doppelte Schilderbestellungen vermeiden",
      "paragraphs": [
        "Prüfe, ob Zulassung und Schilder im vereinbarten Händlerpaket enthalten sind. Wenn du die Schilder selbst besorgen darfst, bestätige Kombination, Kennzeichenart, Format und Lieferadresse. Bei E, H oder Saison muss die Ausführung zum zugelassenen Fahrzeug passen.",
        "Lass dir sagen, bis wann und an wen die Schilder übergeben werden sollen. Der Preis für geprägte Schilder umfasst nicht automatisch eine Reservierung oder die Dienstleistung des Zulassungspartners."
      ],
      "items": [
        "Wer reserviert und wer meldet an?",
        "Welche Halterdaten werden verwendet?",
        "Sind Schilder bereits im Paket enthalten?",
        "Wohin gehen Reservierungsnachweis und Schilder?",
        "Was passiert bei verschobener Fahrzeugübergabe?"
      ]
    },
    {
      "id": "rueckgabe",
      "title": "Den späteren Fahrzeugwechsel getrennt planen",
      "paragraphs": [
        "Wenn du die Kombination nach Vertragsende erneut nutzen möchtest, kläre den Ablauf rechtzeitig mit Händler und Behörde. Die Rückgabe des Autos reserviert die Nummer nicht automatisch für dein nächstes Fahrzeug.",
        "Bewahre Reservierungsnachweise und Absprachen auf. Für die neue Bestellung zählt die dann tatsächlich bestätigte Kombination. Der allgemeine Wunschkennzeichenratgeber erklärt die behördliche Reservierung im Detail."
      ]
    }
  ],
  "sources": [
    {
      "label": "VWFS: Abholung, Lieferung und Zulassung",
      "href": "https://gebrauchtwagen.vwfs.de/gebrauchtwagenkauf/abholunglieferung.html"
    },
    {
      "label": "VWFS: Informationen zum Auto-Leasing",
      "href": "https://www.vwfs.de/service/produkte/auto-leasing.html"
    }
  ],
  "relatedGuideSlugs": [
    "wunschkennzeichen-reservieren",
    "auto-anmelden-vollmacht"
  ],
  "relatedLinks": [
    {
      "href": "/kennzeichen-bestellen",
      "label": "Bestätigte Wunschkombination prägen lassen"
    },
    {
      "href": "/blog/kennzeichen-lieferung-pruefen",
      "label": "Gelieferte Schilder vor Übergabe prüfen"
    }
  ]
},
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
      "auto-online-zulassen-kennzeichen",
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
