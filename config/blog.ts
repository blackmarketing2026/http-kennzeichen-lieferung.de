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
  "slug": "coc-papiere-verloren",
  "title": "CoC-Papiere verloren: Den passenden Nachweis vor der Zulassung beschaffen",
  "description": "Was eine fehlende Übereinstimmungsbescheinigung bedeutet, wo du Ersatz anfragst und wann ein elektronischer Nachweis möglich ist.",
  "category": "Kennzeichenwissen",
  "publishedAt": "2026-11-24",
  "intro": [
    "Die Zulassungsstelle fragt nach dem CoC, doch in deiner Fahrzeugmappe liegt nur der Kaufvertrag. Bevor du einen beliebigen Ersatznachweis bestellst, kläre, welches Dokument für dein Fahrzeug tatsächlich fehlt."
  ],
  "takeaway": "Das CoC weist die Übereinstimmung mit einem genehmigten Fahrzeugtyp nach. Es ist weder der Fahrzeugbrief noch eine Kennzeichenreservierung. Frage den Hersteller nach Ersatz und die Behörde nach dem benötigten Nachweis.",
  "sections": [
    {
      "id": "dokument",
      "title": "CoC und Fahrzeugbrief sind unterschiedliche Unterlagen",
      "paragraphs": [
        "CoC steht für Certificate of Conformity, also Übereinstimmungsbescheinigung. Bei der Erstzulassung eines Fahrzeugs mit EU-Typgenehmigung nennt § 6 Absatz 4 FZV dieses Dokument als Nachweis der Übereinstimmung mit dem genehmigten Typ.",
        "Die Zulassungsbescheinigung Teil II erfüllt eine andere Aufgabe. Wenn nur das CoC fehlt, ist das nicht automatisch ein Verlust des Fahrzeugbriefs. Benenne das fehlende Dokument genau, bevor du ein Ersatzverfahren anstößt."
      ]
    },
    {
      "id": "hersteller",
      "title": "Ersatz beim passenden Hersteller anfragen",
      "paragraphs": [
        "Wende dich mit den Fahrzeugdaten an den Hersteller oder einen vorgesehenen Markenpartner. Volkswagen verweist für seine Fahrzeuge beispielsweise auf einen eigenen CoC-Bestellservice. Das belegt einen möglichen Beschaffungsweg, keine Zusage für jede Marke oder jedes Fahrzeug.",
        "Halte insbesondere die Fahrzeug-Identifizierungsnummer bereit und frage nach den verlangten Berechtigungsnachweisen. Vergleiche Anbieter und Dokumentart sorgfältig: Ein allgemeines Datenblatt ist nicht automatisch die gesuchte Übereinstimmungsbescheinigung. Preise und Bearbeitungszeiten sind beim tatsächlichen Aussteller zu klären."
      ]
    },
    {
      "id": "elektronisch",
      "title": "Vorher prüfen, ob die Behörde die Daten abrufen kann",
      "paragraphs": [
        "§ 6 Absatz 4 FZV lässt den Nachweis auch durch den behördlichen Abruf der CoC-Daten aus den dort genannten Datenbanken zu. Du solltest deshalb vor einer kostenpflichtigen Ersatzbestellung fragen, ob dieser Weg für dein Fahrzeug und deinen Vorgang verfügbar ist.",
        "Das bedeutet nicht, dass jeder private Scan oder jedes Foto genügt. Die Behörde muss den vorgesehenen Nachweis erhalten. Bei einem Fahrzeug ohne entsprechende Typgenehmigung löst die Bestellung eines vermeintlichen CoC das grundlegende Genehmigungsproblem nicht."
      ]
    },
    {
      "id": "reihenfolge",
      "title": "Schilder erst auf geklärter Grundlage planen",
      "paragraphs": [
        "Ordne den erhaltenen Nachweis dem richtigen Fahrzeug zu und vergleiche die FIN. Kläre anschließend die weiteren Zulassungsunterlagen sowie Kombination und Schildausführung. Ein CoC enthält keine persönliche Wunschkennzeichenreservierung.",
        "Der Schilderkauf stellt kein CoC aus und ersetzt keine technische Genehmigung. Sobald dein Zulassungsvorgang vorbereitet und die Kombination bestätigt ist, kannst du die passenden angebotenen Kennzeichenschilder bestellen."
      ],
      "items": [
        "Fehlendes Dokument genau bestimmen.",
        "Hersteller und Behörde nach dem passenden Nachweis fragen.",
        "Elektronischen Abruf vor Ersatzbestellung klären.",
        "FIN und bestätigte Kennzeichenkombination getrennt prüfen."
      ]
    }
  ],
  "sources": [
    {
      "label": "FZV § 6 Absatz 4: Genehmigungsnachweise",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__6.html"
    },
    {
      "label": "Volkswagen: CoC-Bestellservice",
      "href": "https://www.volkswagen.de/de/besitzer-und-service/ueber-ihr-auto/hilfe-und-dialogcenter/fragen-und-antworten.html"
    }
  ],
  "relatedGuideSlugs": [
    "neuwagen-erstzulassung",
    "eu-import-deutsche-kennzeichen",
    "vollgutachten-21-zulassung"
  ],
  "relatedLinks": [
    {
      "href": "/kennzeichen-bestellen",
      "label": "Schilder für die bestätigte Kombination"
    }
  ]
},
{
  "slug": "hu-bericht-verloren-zweitschrift",
  "title": "HU-Bericht verloren: Zweitschrift oder anderer amtlicher Nachweis?",
  "description": "Ein fehlender Prüfbericht ist nicht automatisch eine abgelaufene HU. So klärst du den Nachweis für Zulassung oder Fahrzeugverkauf.",
  "category": "Kennzeichenwissen",
  "publishedAt": "2026-11-24",
  "intro": [
    "Der Termin zur Ummeldung steht, aber der letzte HU-Bericht ist nicht auffindbar. Trenne jetzt zwei Fragen: Ist die Untersuchung noch gültig, und welcher Nachweis wird für deinen Vorgang benötigt?"
  ],
  "takeaway": "Frage zuerst nach dem anerkannten Nachweis. Bei der Zulassung kann nach § 29 Absatz 10 StVZO ein anderes amtliches Dokument mit der HU-Fälligkeit genügen. Eine nötige Zweitschrift erhältst du bei der prüfenden Stelle.",
  "sections": [
    {
      "id": "status",
      "title": "Papierverlust ändert nicht das Untersuchungsdatum",
      "paragraphs": [
        "Dass du den Bericht nicht findest, bedeutet nicht automatisch, dass die HU abgelaufen ist. Umgekehrt verlängert eine neu ausgestellte Zweitschrift keine abgelaufene Untersuchung. Prüfe die tatsächliche Fälligkeit in den vorhandenen Unterlagen.",
        "Eine Rechnung für eine Reparatur ist kein HU-Bericht. Suche auch in der Fahrzeugmappe und frage beim Vorbesitzer oder der betreuenden Werkstatt nach, welche Prüforganisation die Untersuchung durchgeführt hat."
      ]
    },
    {
      "id": "zulassung",
      "title": "Für die Zulassung den konkreten Nachweis klären",
      "paragraphs": [
        "§ 29 Absatz 10 StVZO enthält eine Ausnahme von der Vorlage des HU-Berichts bei der Fahrzeugzulassung, wenn die nächste Fälligkeit für die Behörde aus einem anderen amtlichen Dokument ersichtlich ist. TÜV NORD weist außerdem auf den elektronisch verfügbaren HU-Datensatz hin.",
        "Frage deine Zulassungsstelle, ob die vorliegenden Daten für diesen Vorgang ausreichen. Verlasse dich nicht darauf, dass ein Foto der runden Plakette jeden fehlenden Nachweis ersetzt. Die allgemeine Pflicht zur Aufbewahrung des Berichts bleibt von dieser Zulassungsausnahme zu unterscheiden."
      ]
    },
    {
      "id": "zweitschrift",
      "title": "Die prüfende Stelle ist der richtige Ansprechpartner",
      "paragraphs": [
        "Benötigst du Ersatz, wende dich an die Stelle, die die HU durchgeführt hat. Bereite Fahrzeugdaten, möglichst das Untersuchungsdatum und einen Nachweis deiner Berechtigung vor. TÜV NORD nennt etwa Fahrzeugpapiere oder einen Kaufvertrag zusammen mit einem Identitätsnachweis.",
        "Anforderungen und verfügbare Altunterlagen hängen vom Aussteller ab. Eine beliebige andere Prüfstelle kann nicht ohne Weiteres jeden fremden Bericht neu ausstellen. Kläre Kosten und Bereitstellung direkt, bevor du einen neuen Untersuchungstermin nur wegen des Papierverlusts buchst."
      ]
    },
    {
      "id": "schilder",
      "title": "Bericht, Prüfplakette und Kennzeichenschild getrennt behandeln",
      "paragraphs": [
        "Eine Zweitschrift ist ein Dokument. Sie ersetzt weder ein beschädigtes Kennzeichenschild noch eine fehlende amtliche Prüfplakette. Bestelle deshalb keine vermeintlichen HU-Aufkleber als Ersatz für den Bericht.",
        "Sind Zulassungsnachweise und Kombination geklärt und brauchst du neue Schilder, kannst du die passende Prägung vorbereiten. Amtliche HU- und Stempelplaketten sind nicht Teil der normalen Schilderlieferung. Bewahre den neuen Bericht anschließend mindestens bis zur nächsten HU auf."
      ]
    }
  ],
  "sources": [
    {
      "label": "StVZO § 29 Absatz 10: Aufbewahrung und Ersatz",
      "href": "https://www.gesetze-im-internet.de/stvzo_2012/__29.html"
    },
    {
      "label": "TÜV NORD: Zweitschriften für HU-Berichte",
      "href": "https://www.tuev-nord.de/de/dienstleistungen/pruefung-und-gutachten/hauptuntersuchung/zweitschriften/"
    }
  ],
  "relatedGuideSlugs": [
    "auto-ohne-tuev-anmelden",
    "fahrzeugpapiere-verloren"
  ],
  "relatedLinks": [
    {
      "href": "/blog/hu-plakette-lesen",
      "label": "HU-Plakette richtig lesen"
    },
    {
      "href": "/kennzeichen-bestellen",
      "label": "Bei Bedarf neue Kennzeichenschilder bestellen"
    }
  ]
},
{
  "slug": "ladung-verdeckt-kennzeichen",
  "title": "Ladung verdeckt das Kennzeichen: Was vor der Transportfahrt zu prüfen ist",
  "description": "Kennzeichenwiederholung, Ladungsüberstand und sichere Befestigung unterscheiden – für Gepäck, Möbel und andere Transporte am Fahrzeugheck.",
  "category": "Kennzeichenwissen",
  "publishedAt": "2026-11-24",
  "intro": [
    "Beim Beladen ist noch alles übersichtlich. Erst die festgezurrte Tasche oder ein überstehendes Möbelstück verdeckt einen Teil des hinteren Kennzeichens. Prüfe deshalb das fertig beladene Fahrzeug, nicht nur den leeren Träger."
  ],
  "takeaway": "Schon eine teilweise Verdeckung des hinteren Kennzeichens durch Ladung oder Ladungsträger erfordert nach § 12 Absatz 10 FZV eine Kennzeichenwiederholung. Eine rote Fahne für überstehende Ladung erfüllt eine andere Aufgabe.",
  "sections": [
    {
      "id": "sicht",
      "title": "Teilweise verdeckt reicht bereits aus",
      "paragraphs": [
        "Die FZV unterscheidet hier nicht zwischen einem völlig unsichtbaren Schild und wenigen verdeckten Zeichen. Wird das hintere Kennzeichen durch mitgeführte Ladung oder einen Ladungsträger teilweise verdeckt, ist es am Fahrzeug oder Ladungsträger zu wiederholen.",
        "Prüfe nach dem Verzurren auch Gurte, Taschen und lose Abdeckungen. Was im Stand neben dem Schild liegt, kann sich während der Fahrt davor bewegen. Die Ladung muss so gesichert sein, dass sie auch bei Bremsen und Ausweichen nicht verrutscht."
      ]
    },
    {
      "id": "wiederholung",
      "title": "Die richtige Kombination wiederholen",
      "paragraphs": [
        "Das Wiederholungskennzeichen zeigt die Fahrzeugkombination. Nach § 12 Absatz 10 ist keine Abstempelung erforderlich. Ein handgeschriebener Zettel oder eine beliebige alte Nummer ist damit nicht gleichzusetzen.",
        "Wähle eine geeignete Anbringungsstelle und beachte die Vorgaben des verwendeten Trägers. Das eigentliche Fahrzeugkennzeichen bleibt Teil der regulären Kennzeichnung; der Wiederholungsbedarf ist kein Anlass, die amtlichen Plaketten selbst umzusetzen."
      ]
    },
    {
      "id": "ueberstand",
      "title": "Überstandskennzeichnung ist eine zusätzliche Prüfung",
      "paragraphs": [
        "§ 22 StVO regelt unter anderem die Sicherung und Kennzeichnung überstehender Ladung. Ragt deren äußerstes Ende mehr als einen Meter über die Rückstrahler hinaus, ist die dort vorgesehene Kenntlichmachung erforderlich. Je nach Lichtverhältnissen kommen weitere Beleuchtungsanforderungen hinzu.",
        "Eine solche Markierung macht ein verdecktes Kennzeichen nicht lesbar. Umgekehrt macht ein Zusatzschild eine unzulässige Transportanordnung nicht zulässig. Prüfe Maße, Ladungssicherung, Fahrzeugleuchten und Kennzeichnung als getrennte Punkte."
      ]
    },
    {
      "id": "abfahrt",
      "title": "Vor der Abfahrt am fertig beladenen Fahrzeug prüfen",
      "paragraphs": [
        "Kontrolliere die Kennzeichenkombination und den festen Sitz des Zusatzschilds. Achte darauf, dass vorgeschriebene Leuchten nicht durch die Ladung verdeckt werden. Bei unklarer Montage oder fehlender geeigneter Aufnahme solltest du die Transportlösung ändern, statt improvisierte Schilderhalter zu verwenden.",
        "Für eine passende Wiederholung kannst du die bestätigte Kombination im angebotenen Format bestellen. Kontrolliere Maße und Stückzahl ausdrücklich. Das Schild allein ist kein vollständiger Ladungsträger oder Beleuchtungssatz."
      ],
      "items": [
        "Kennzeichen nach dem Beladen vollständig sichtbar?",
        "Bei Verdeckung passende Wiederholung angebracht?",
        "Ladung sicher und Überstand gesondert geprüft?",
        "Leuchten und Zusatzschild frei und fest?"
      ]
    }
  ],
  "sources": [
    {
      "label": "FZV § 12 Absatz 10: Kennzeichenwiederholung",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__12.html"
    },
    {
      "label": "StVO § 22: Ladung sichern und kennzeichnen",
      "href": "https://www.gesetze-im-internet.de/stvo_2013/__22.html"
    }
  ],
  "relatedGuideSlugs": [
    "kennzeichengroessen"
  ],
  "relatedLinks": [
    {
      "href": "/blog/fahrradtraeger-kennzeichen-ohne-stempel",
      "label": "Zusatzschild am Fahrradträger"
    },
    {
      "href": "/kennzeichen-bestellen",
      "label": "Passendes Wiederholungskennzeichen bestellen"
    }
  ]
},
{
  "slug": "kennzeichen-magnethalter",
  "title": "Kennzeichen mit Magnethalter: Was du vor der Montage prüfen solltest",
  "description": "Fester Sitz, passende Materialien und freie Lesbarkeit zählen auch bei Magnethaltern. Eine Produktwerbung ersetzt keine Prüfung der konkreten Montage.",
  "category": "Kennzeichenwissen",
  "publishedAt": "2026-11-24",
  "intro": [
    "Ein abnehmbares Kennzeichen wirkt praktisch, etwa bei der Fahrzeugpflege. Für die Fahrt muss die Befestigung trotzdem zuverlässig passen. Die Aussage „magnetisch“ allein sagt weder etwas über die Eignung am Fahrzeug noch über die korrekte Anbringung aus."
  ],
  "takeaway": "§ 12 FZV verlangt für reguläre Kennzeichen eine feste Anbringung. Prüfe das vollständige Befestigungssystem und seine Anleitung. Wir geben hier keine pauschale Freigabe für beliebige Magnethalter.",
  "sections": [
    {
      "id": "anforderung",
      "title": "Die Befestigung muss am Fahrzeug funktionieren",
      "paragraphs": [
        "Die gesetzliche Anforderung betrifft das montierte Schild. Es muss vorhanden, fest angebracht und entsprechend den Vorgaben lesbar sein. Auch die vorgeschriebenen Maße, Neigung und Anbringungshöhen bleiben relevant.",
        "Ein Produktname, eine hohe beworbene Magnetkraft oder ein Foto am stehenden Auto belegen für sich allein nicht, dass deine Montage diese Anforderungen erfüllt. Frage bei Unsicherheit den Hersteller des Systems oder eine geeignete Werkstatt nach der konkreten Kombination aus Fahrzeug, Halter und Schild."
      ]
    },
    {
      "id": "material",
      "title": "Schildmaterial und Gegenstücke beachten",
      "paragraphs": [
        "Prüfe, wie das System tatsächlich hält. Nicht jede Schildplatte oder Fahrzeugfläche eignet sich unmittelbar für einen Magneten. Manche Systeme benötigen Gegenstücke, Trägerplatten oder eine zusätzliche Befestigung an der Karosserie.",
        "Verwende keine zufällige Mischung einzelner Magnete, Klebestreifen und Restteile. Entscheidend sind die vom Hersteller vorgesehenen Komponenten sowie ein geeigneter Untergrund. Auch die Vorbereitung und Aushärtung einer eventuell verwendeten Klebeverbindung gehören zur Montageanleitung."
      ]
    },
    {
      "id": "kontrolle",
      "title": "Lesbarkeit und Plaketten nicht beeinträchtigen",
      "paragraphs": [
        "Befestigungsteile dürfen die Kennzeichenkombination und die vorgeschriebene Ausgestaltung nicht verdecken. Eine zusätzliche transparente Abdeckung ist kein Ersatz für einen passenden Halter; § 12 schließt unzulässige Abdeckungen ausdrücklich aus.",
        "Kontrolliere auch die Heckbeleuchtung und die Lage des Schilds. Lässt sich das Schild ungewollt verschieben oder lösen, ist die Montage nicht durch die bloße Bezeichnung Magnethalter ausreichend erklärt. Fahre erst, wenn der sichere Zustand geklärt ist."
      ]
    },
    {
      "id": "alternative",
      "title": "Bei unklarer Eignung eine passende Alternative wählen",
      "paragraphs": [
        "Ein zum Fahrzeug und Schildformat passender konventioneller Halter kann die einfachere Lösung sein. Der Shop bietet Halter und Schrauben als Zusatz, aber keine hier geprüften oder zertifizierten Magnetsysteme an. Ein konkreter Magnetprodukttest wurde für diesen Artikel nicht durchgeführt.",
        "Brauchst du wegen einer beschädigten Platte ein neues Schild, kläre vor der Prägung Format und Montage. Die Schilderbestellung umfasst keine Freigabe der Befestigung am Fahrzeug."
      ],
      "items": [
        "Vollständiges System und Anleitung vorhanden?",
        "Materialien und Montagefläche geeignet?",
        "Schild fest und ohne Verschiebung angebracht?",
        "Zeichen, Plaketten und Beleuchtung frei?"
      ]
    }
  ],
  "sources": [
    {
      "label": "FZV § 12: feste Anbringung und Ausgestaltung",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__12.html"
    }
  ],
  "relatedGuideSlugs": [
    "kennzeichen-beschaedigt-ersetzen",
    "kennzeichengroessen"
  ],
  "relatedLinks": [
    {
      "href": "/blog/kennzeichen-bohren-befestigen",
      "label": "Halter und direkte Verschraubung"
    },
    {
      "href": "/kennzeichenhalter",
      "label": "Angebotene Halter und Schrauben"
    }
  ]
},
{
  "slug": "umweltplakette-4-euro-6",
  "title": "Grüne Plakette mit 4 trotz Euro 6: Warum das zusammenpasst",
  "description": "Die Zahl auf der Umweltplakette bezeichnet die Schadstoffgruppe, nicht die Euro-Abgasnorm. So prüfst du die richtige Kennzeichnung.",
  "category": "Kennzeichenwissen",
  "publishedAt": "2026-11-24",
  "intro": [
    "In den Papieren steht Euro 6, auf der grünen Umweltplakette aber eine große 4. Das ist nicht automatisch ein Fehler. Hier werden zwei unterschiedliche Einteilungen miteinander verwechselt."
  ],
  "takeaway": "Die 4 steht für Schadstoffgruppe 4 nach der 35. BImSchV. Sie ist keine Aussage, dass dein Fahrzeug nur die Abgasnorm Euro 4 erfüllt. Eine grüne Plakette erlaubt außerdem nicht jede beliebige Einfahrt.",
  "sections": [
    {
      "id": "gruppen",
      "title": "Schadstoffgruppe und Eurostufe unterscheiden",
      "paragraphs": [
        "Die 35. BImSchV ordnet Fahrzeuge den Schadstoffgruppen 1 bis 4 zu. Das Plakettenmuster für Gruppe 4 ist grün. Die Eurostufe ist dagegen eine andere technische Einstufung des Abgasverhaltens.",
        "Das Bundesumweltministerium ordnet in seiner Übersicht Diesel mit Euro 4 beziehungsweise bestimmten verbesserten Ausführungen und besser der grünen Gruppe zu. Die grüne Zahl wird deshalb nicht für jede neuere Eurostufe erhöht. Eine selbst gestaltete grüne Plakette mit 6 wäre keine Lösung."
      ]
    },
    {
      "id": "nachweis",
      "title": "Die Zuordnung anhand der Fahrzeugdaten prüfen",
      "paragraphs": [
        "Lass die richtige Einstufung anhand der erforderlichen Fahrzeugunterlagen feststellen. Baujahr, Modellbezeichnung oder ein Verkaufsinserat allein sind nicht in jedem Fall ausreichend. Nachrüstungen und besondere Ausführungen können für den Nachweis relevant sein.",
        "Wenn du einen Fehler vermutest, ändere die Zahl oder das Schriftfeld nicht selbst. Frage die ausstellende Stelle nach der Zuordnung. Das Kennzeichen im Schriftfeld und die Schadstoffgruppe erfüllen ebenfalls unterschiedliche Aufgaben."
      ]
    },
    {
      "id": "zone",
      "title": "Grün ist keine Erlaubnis für jede gesperrte Straße",
      "paragraphs": [
        "§ 2 der Verordnung verbindet die Wirkung der Plakette mit dem jeweiligen Verkehrszeichen. Weitere örtliche Beschränkungen können neben der Umweltzonenregelung bestehen. Das Bundesumweltministerium erläutert beispielsweise zusätzliche streckenbezogene Dieselbeschränkungen.",
        "Prüfe vor der Fahrt die aktuellen örtlichen Regeln und die Beschilderung. Aus der grünen Farbe allein lässt sich weder eine Parkberechtigung noch die Zulässigkeit jeder Route ableiten. Für besondere Ausnahmen ist ebenfalls die tatsächliche Fahrzeugkennzeichnung maßgeblich."
      ]
    },
    {
      "id": "wechsel",
      "title": "Bei neuen Kennzeichen den Eintrag mitprüfen",
      "paragraphs": [
        "Die technische Schadstoffgruppe ändert sich nicht allein dadurch, dass du eine neue Kennzeichenkombination erhältst. Die Kennzeichenangabe auf der Umweltplakette muss aber zum Fahrzeug passen. Der verlinkte Wechselartikel erklärt diesen eigenen Ersatzfall.",
        "Eine Schilderbestellung enthält nicht automatisch eine Umweltplakette. Prüfe den gewählten Lieferumfang und halte die benötigten Fahrzeugnachweise bereit. Amtliche HU- und Zulassungsplaketten sind wiederum andere Kennzeichnungen."
      ],
      "items": [
        "Eurostufe und Schadstoffgruppe nicht gleichsetzen.",
        "Einstufung anhand der Fahrzeugdaten prüfen lassen.",
        "Örtliche Verkehrsregeln gesondert beachten.",
        "Kennzeichenangabe und bestellten Lieferumfang kontrollieren."
      ]
    }
  ],
  "sources": [
    {
      "label": "35. BImSchV § 2: Schadstoffgruppen",
      "href": "https://www.gesetze-im-internet.de/bimschv_35/__2.html"
    },
    {
      "label": "35. BImSchV Anhang 1: Plakettenmuster",
      "href": "https://www.gesetze-im-internet.de/bimschv_35/anhang_1.html"
    },
    {
      "label": "Bundesumweltministerium: Umweltplaketten und Umweltzonen",
      "href": "https://www.bundesumweltministerium.de/themen/luft/umweltzonen-und-umweltplakette"
    }
  ],
  "relatedGuideSlugs": [
    "kennzeichen-freiwillig-aendern"
  ],
  "relatedLinks": [
    {
      "href": "/blog/umweltplakette-kennzeichenwechsel",
      "label": "Umweltplakette bei neuer Kombination"
    },
    {
      "href": "/kennzeichen-bestellen",
      "label": "Kennzeichenschilder und aktuellen Lieferumfang prüfen"
    }
  ]
},
{
  "slug": "halter-eigentuemer-zulassung",
  "title": "Halter, Eigentümer und Fahrer: Welche Angaben zählen bei der Zulassung?",
  "description": "Warum mehrere Personen an einem Fahrzeug beteiligt sein können und welche Rollen du vor Reservierung, Versicherung und Schilderbestellung klärst.",
  "category": "Kennzeichenwissen",
  "publishedAt": "2026-11-24",
  "intro": [
    "Du kaufst das Auto, eine andere Person soll es nutzen und der Zulassungstermin wird von einem Dienst erledigt. Dann hilft eine klare Zuordnung der Beteiligten. Rechnungsempfänger, Halter, Eigentümer und Vertreter müssen nicht dieselbe Person sein."
  ],
  "takeaway": "Lege vor dem Zulassungsantrag fest, wer als Halter geführt wird und wer wirksam handeln darf. Die Zulassung entscheidet keine privaten Eigentumsstreitigkeiten. Eine Lieferadresse für Schilder ersetzt keine Halterangabe.",
  "sections": [
    {
      "id": "rollen",
      "title": "Die Beteiligten getrennt erfassen",
      "paragraphs": [
        "Die FZV verlangt im Zulassungsantrag die Halterdaten. Sie unterscheidet an anderen Stellen ausdrücklich zwischen Halter und Eigentümer. Damit solltest du nicht automatisch annehmen, dass der Name auf einer Bestellung jede andere Rolle festlegt.",
        "Notiere für die Vorbereitung, wer das Fahrzeug erwirbt, wer Halter werden soll, wer fährt und wer den Antrag bearbeitet. Bei Finanzierung, Leasing oder betrieblicher Nutzung klärst du die Zuordnung anhand der jeweiligen Vereinbarungen. Dieser Artikel stellt keine Eigentumsrechte im Einzelfall fest."
      ]
    },
    {
      "id": "papiere",
      "title": "Fahrzeugpapiere lösen keinen Eigentumsstreit",
      "paragraphs": [
        "§ 14 Absatz 7 FZV stellt klar, dass die Zulassungsbehörde keine privatrechtlichen Sachverhalte entscheidet. Aus dem Besitz eines Fahrzeugbriefs oder eines Kennzeichens allein solltest du deshalb keine abschließende Aussage über streitige Rechte ableiten.",
        "Kläre ungeklärte Verfügungsrechte vor dem Zulassungsvorgang. Liegt Teil II bei einer Bank, ist zunächst der vereinbarte Dokumentenweg zu organisieren. Eine neue Schilderprägung hilft nicht, wenn die erforderliche Berechtigung oder Unterlage fehlt."
      ]
    },
    {
      "id": "versicherung",
      "title": "Versicherung und Vertretung passend vorbereiten",
      "paragraphs": [
        "Teile dem Versicherer die vorgesehenen Halterdaten und die tatsächliche Nutzung mit. Wenn Vertragspartner und Halter voneinander abweichen sollen, muss der Versicherungsnachweis dazu passen. Unterstelle nicht, dass jede beliebige eVB für jeden Beteiligten verwendet werden kann.",
        "Wer den Termin wahrnimmt, benötigt gegebenenfalls die vorgeschriebene Vollmacht und Identitätsnachweise. Eine Fahrerlaubnis oder die Tatsache, dass jemand das Auto häufig fährt, ist keine automatische Vollmacht für den Zulassungsantrag."
      ]
    },
    {
      "id": "bestellen",
      "title": "Bestellung und behördliche Daten abgleichen",
      "paragraphs": [
        "Prüfe bei einer Wunschreservierung, ob die Angaben zum vorgesehenen Vorgang passen. Für die Schilderprägung zählt die bestätigte Kombination mit der richtigen Ausführung. Liefer- und Rechnungsadresse kontrollierst du separat.",
        "So kann ein Händler die Schilder erhalten, obwohl das Fahrzeug auf dich zugelassen wird. Das muss jedoch zum vereinbarten Ablauf passen. Die Schilderlieferung enthält keine Eigentumsprüfung, Versicherung oder behördliche Zulassung."
      ],
      "items": [
        "Halter und Verfügungsberechtigung geklärt?",
        "Versicherungsnachweis auf den Vorgang abgestimmt?",
        "Vertretung und Vollmacht vorbereitet?",
        "Kombination, Lieferung und Rechnung getrennt kontrolliert?"
      ]
    }
  ],
  "sources": [
    {
      "label": "FZV § 6: Halterdaten und Versicherungsangaben",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__6.html"
    },
    {
      "label": "FZV § 14 Absatz 7: privatrechtliche Sachverhalte",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__14.html"
    },
    {
      "label": "FZV § 15: Halter und Eigentümer",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__15.html"
    }
  ],
  "relatedGuideSlugs": [
    "fahrzeugbrief-bank-zulassung",
    "auto-auf-firma-zulassen",
    "auto-anmelden-vollmacht"
  ],
  "relatedLinks": [
    {
      "href": "/kennzeichen-bestellen",
      "label": "Bestätigte Kombination konfigurieren"
    }
  ]
},
{
  "slug": "kennzeichen-umlaute-buchstaben",
  "title": "Umlaute auf Kennzeichen: Ortskürzel und Wunschbuchstaben unterscheiden",
  "description": "Warum Ä, Ö und Ü im Ortskürzel vorkommen können, bei den Wunschbuchstaben aber nicht erlaubt sind – und was du vor dem Prägen prüfst.",
  "category": "Kennzeichenwissen",
  "publishedAt": "2026-11-24",
  "intro": [
    "Ein Ortskürzel mit Umlaut ist kein Beleg dafür, dass du auch deine Wunschbuchstaben mit Ä, Ö oder Ü wählen kannst. Das Kennzeichen besteht aus unterschiedlichen Teilen. Für sie gelten unterschiedliche Regeln."
  ],
  "takeaway": "Übernimm das amtliche Ortskürzel unverändert. In der Erkennungsnummer sind Ä, Ö und Ü ausgeschlossen. Eine im Shop darstellbare Kombination ist noch keine behördliche Reservierung.",
  "sections": [
    {
      "id": "aufbau",
      "title": "Welche Buchstaben gehören zu welchem Teil?",
      "paragraphs": [
        "§ 9 FZV unterscheidet das Unterscheidungszeichen des Verwaltungsbezirks und die Erkennungsnummer des Fahrzeugs. Das Ortskürzel steht am Anfang. Dahinter folgen bei einem gewöhnlichen Kennzeichen die individuell zugeteilten Buchstaben und Zahlen.",
        "Die Regeln für Wunschbuchstaben beziehen sich auf diese Erkennungsnummer. Sie lassen sich nicht einfach auf das Ortskürzel übertragen. Prüfe beim Abschreiben deshalb zuerst, wo der Ortsbereich endet und wo die individuelle Kombination beginnt."
      ]
    },
    {
      "id": "umlaut",
      "title": "Ä, Ö und Ü: nicht bei den Wunschbuchstaben",
      "paragraphs": [
        "Anlage 1 FZV erlaubt die übrigen Buchstaben des Alphabets einzeln oder als Zweierkombination in der Erkennungsnummer. Die drei Umlaute sind davon ausdrücklich ausgenommen. Ein Vorname mit Umlaut führt also nicht zu einem Anspruch auf denselben Buchstaben auf dem Schild.",
        "Ersetze einen Umlaut im amtlichen Ortskürzel nicht eigenmächtig durch zwei Buchstaben. Eine solche Umschreibung kann eine andere Zeichenfolge ergeben. Maßgeblich ist die Schreibweise in der Zuteilung beziehungsweise Reservierungsbestätigung."
      ]
    },
    {
      "id": "vergabe",
      "title": "Erlaubte Zeichen bedeuten nicht freie Verfügbarkeit",
      "paragraphs": [
        "Auch eine grundsätzlich zulässige Buchstabenfolge kann schon vergeben oder nicht für deinen Vorgang verfügbar sein. Zusätzlich verbietet § 9 FZV Kombinationen, die gegen die guten Sitten verstoßen. Die zuständige Zulassungsstelle entscheidet über die konkrete Zuteilung.",
        "Eine selbst zusammengestellte Liste vermeintlich überall erlaubter Kombinationen hilft daher weniger als die Prüfung im zuständigen Reservierungsportal. Speichere die Bestätigung und kontrolliere, ob sie zu deinem Zulassungsvorgang gehört."
      ]
    },
    {
      "id": "bestellung",
      "title": "So überträgst du die bestätigte Kombination",
      "paragraphs": [
        "Gib Ortskürzel, individuelle Buchstaben und Zahlen in die dafür vorgesehenen Felder ein. Vergleiche danach die Vorschau Zeichen für Zeichen mit deiner Bestätigung. Die geprägte Beschriftung muss zur amtlichen Kombination passen; eine alternative Schreibweise ist kein gestalterisches Extra."
      ],
      "items": [
        "Ortskürzel einschließlich vorhandener Umlaute unverändert übernehmen.",
        "Nur bestätigte Wunschbuchstaben und Zahlen verwenden.",
        "E-, H- oder Saison-Ausführung gesondert kontrollieren.",
        "Bei widersprüchlicher Bestätigung vor der Bestellung nachfragen."
      ]
    }
  ],
  "sources": [
    {
      "label": "FZV § 9: Aufbau und Zuteilung",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__9.html"
    },
    {
      "label": "FZV Anlage 1: zulässige Buchstaben",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/anlage_1.html"
    }
  ],
  "relatedGuideSlugs": [
    "wunschkennzeichen-reservieren"
  ],
  "relatedLinks": [
    {
      "href": "/blog/kennzeichen-fe-schrift",
      "label": "Die vorgeschriebene FE-Schrift"
    },
    {
      "href": "/kennzeichen-bestellen",
      "label": "Bestätigte Kombination prägen lassen"
    }
  ]
},
{
  "slug": "fin-kennzeichen-unterschied",
  "title": "FIN und Kennzeichen: Welche Nummer gehört in die Schilderbestellung?",
  "description": "Fahrzeug-Identifizierungsnummer, amtliche Kombination und Bestelldaten unterscheiden. So vermeidest du eine falsche Zuordnung beim Fahrzeugwechsel.",
  "category": "Kennzeichenwissen",
  "publishedAt": "2026-11-24",
  "intro": [
    "In Kaufvertrag, Fahrzeugpapieren und Zulassungsantrag stehen mehrere Nummern. Für die Schilderprägung brauchst du die amtliche Kennzeichenkombination. Die Fahrzeug-Identifizierungsnummer, kurz FIN, erfüllt einen anderen Zweck."
  ],
  "takeaway": "Die FIN identifiziert das Fahrzeug. Das Kennzeichen wird behördlich zugeteilt und kann sich ändern. Gib die FIN deshalb nicht als Kennzeichenkombination in den Konfigurator ein.",
  "sections": [
    {
      "id": "identitaet",
      "title": "Die FIN gehört zur Fahrzeugidentität",
      "paragraphs": [
        "§ 59 StVZO regelt die Fahrzeug-Identifizierungsnummer und ihre Kennzeichnung am Fahrzeug. Bei den dort genannten standardisierten Nummern sind 17 Stellen vorgesehen; für andere Nummern nennt die Vorschrift abweichende Grenzen. Gerade bei historischen Fahrzeugen ist die Länge allein daher kein sicherer Fehlernachweis.",
        "Die FIN hilft dir, Unterlagen dem richtigen Fahrzeug zuzuordnen. Vergleiche sie bei einem Kauf mit den Fahrzeugpapieren und der Kennzeichnung am Fahrzeug. Unstimmigkeiten gehören vor die Zulassung geklärt, nicht durch eine Schilderbestellung übergangen."
      ]
    },
    {
      "id": "zuteilung",
      "title": "Das Kennzeichen ist eine andere Zuordnung",
      "paragraphs": [
        "Die Zulassungsbehörde teilt das Kennzeichen nach § 9 FZV zu. Ein Fahrzeug kann im Laufe seines Lebens unterschiedliche Kennzeichen erhalten, etwa bei einer freiwilligen Änderung der Kombination. Daraus entsteht keine neue Fahrzeugidentität.",
        "Umgekehrt beweist ein aufgeschraubtes Schild allein nicht, dass es zum vor dir stehenden Fahrzeug gehört. Bei der Übernahme eines Gebrauchtwagens sind Fahrzeug, Papiere und aktueller Zulassungsstatus gemeinsam zu prüfen."
      ]
    },
    {
      "id": "wechsel",
      "title": "Beim Fahrzeugwechsel beide Datensätze trennen",
      "paragraphs": [
        "Wenn du deine bisherige Kombination auf ein anderes Fahrzeug übernehmen möchtest, bleiben es zwei verschiedene Fahrzeuge mit eigenen Identifizierungsnummern. Die Übernahme der Kombination ist ein eigener behördlicher Vorgang. Das Umstecken der Schilder erledigt ihn nicht.",
        "Lege Kaufunterlagen für das neue Auto und Unterlagen zur bisherigen Kombination getrennt bereit. So vermeidest du, dass eine Reservierung oder Bestellung zwar die gewünschten Zeichen enthält, aber zeitlich nicht zur Zuteilung passt."
      ]
    },
    {
      "id": "eingabe",
      "title": "Was du für die Prägung kontrollierst",
      "paragraphs": [
        "Für die Beschriftung sind das bestätigte Ortskürzel, die Buchstaben und die Zahlen maßgeblich. Dazu kommen die tatsächlich benötigte Kennzeichenart, Größe und Stückzahl. Die FIN ist kein Ersatz für diese Angaben.",
        "Falls du vor der Bestellung nur die FIN kennst, kläre zuerst die Kombination bei der Zulassungsstelle. Eine Schilderbestellung ist weder eine Registerauskunft noch eine automatische Zulassung."
      ],
      "items": [
        "Richtiges Fahrzeug anhand der Originalunterlagen zuordnen.",
        "Zuteilung oder Reservierung der Kombination klären.",
        "Kennzeichenzeichen statt FIN in die Vorschau übernehmen.",
        "Vor der Zahlung Ausführung und Menge prüfen."
      ]
    }
  ],
  "sources": [
    {
      "label": "StVZO § 59: Fahrzeug-Identifizierungsnummer",
      "href": "https://www.gesetze-im-internet.de/stvzo_2012/__59.html"
    },
    {
      "label": "FZV § 9: Kennzeichenzuteilung",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__9.html"
    }
  ],
  "relatedGuideSlugs": [
    "fahrzeugschein-fahrzeugbrief-unterschied",
    "kennzeichen-fahrzeugwechsel-uebernehmen"
  ],
  "relatedLinks": [
    {
      "href": "/kennzeichen-bestellen",
      "label": "Kennzeichenschilder konfigurieren"
    }
  ]
},
{
  "slug": "rote-06-kennzeichen-probefahrt",
  "title": "Rote 06-Kennzeichen: Was bei Händlerprobefahrt und Abholung wichtig ist",
  "description": "Rote Händlerkennzeichen sind an Berechtigung, Fahrzweck und Dokumentation gebunden. So unterscheidest du Probefahrt und spätere reguläre Zulassung.",
  "category": "Kennzeichenwissen",
  "publishedAt": "2026-11-24",
  "intro": [
    "Ein rotes Kennzeichen am Händlerfahrzeug ermöglicht nicht jede beliebige Fahrt. Die Kennzeichen mit einer Erkennungsnummer beginnend mit 06 gehören zu einem besonderen Verfahren. Für private Käufer ist vor allem die Abgrenzung zur eigenen Zulassung wichtig."
  ],
  "takeaway": "Ein 06-Kennzeichen ist kein frei mietbares privates Überführungskennzeichen. Kläre mit dem verantwortlichen Betrieb Fahrzweck, Versicherung und Dokumentation. Für die spätere eigene Nutzung brauchst du das passende reguläre Verfahren.",
  "sections": [
    {
      "id": "berechtigung",
      "title": "Wer eine 06-Nummer erhalten kann",
      "paragraphs": [
        "§ 41 FZV nennt unter anderem zuverlässige Fahrzeughersteller, Werkstätten und Fahrzeughändler als mögliche Empfänger für die wiederkehrende betriebliche Verwendung. Die Behörde kann die Zuteilung befristen oder widerruflich vornehmen.",
        "Die rote Beschriftung allein zeigt dir deshalb nicht, dass eine bestimmte Fahrt erlaubt ist. Das Kennzeichen muss zum berechtigten Inhaber und zum vorgesehenen Verfahren gehören. Ein loses Schild aus einer privaten Anzeige reicht dafür nicht."
      ]
    },
    {
      "id": "zweck",
      "title": "Probefahrt ist ein konkreter Verwendungszweck",
      "paragraphs": [
        "Die Vorschrift behandelt Prüfungs-, Probe- und Überführungsfahrten. Außerdem nennt sie bestimmte notwendige Fahrten im Zusammenhang damit, etwa zum Tanken oder zur Reparatur. Daraus entsteht keine allgemeine Erlaubnis für private Alltagsfahrten.",
        "Besprich vor einer Händlerprobefahrt Strecke, Zeitraum, Fahrer und Versicherung mit dem Betrieb. Plane keine zusätzlichen privaten Erledigungen ein. Eine technisch fahrbereite Maschine und ein befestigtes rotes Schild ersetzen diese Klärung nicht."
      ]
    },
    {
      "id": "heft",
      "title": "Dokumentation gehört zur Fahrt",
      "paragraphs": [
        "Für das Fahrzeug muss der Inhaber die vorgeschriebenen Angaben im Fahrzeugscheinheft vor der ersten Fahrt eintragen. Das Heft ist während der Fahrt mitzuführen. Hinzu kommen fortlaufende Aufzeichnungen über die jeweiligen Fahrten.",
        "Lass dir deshalb nicht lediglich die Schlüssel geben, wenn unklar ist, welche Unterlagen mitfahren. Frage nach dem verantwortlichen Ansprechpartner. Für Käufer ist das ein praktischer Punkt in der Übergabeplanung, kein zusätzlicher Schilderauftrag."
      ]
    },
    {
      "id": "abholung",
      "title": "Was nach dem Kauf gilt",
      "paragraphs": [
        "Vereinbare vor der Abholung, ob das Fahrzeug bereits regulär zugelassen wird oder ein anderes zulässiges Überführungsverfahren erforderlich ist. Kurzzeitkennzeichen und rote Oldtimerkennzeichen mit 07 sind eigene Verfahren mit anderen Voraussetzungen.",
        "Unser Shop bietet keine roten 06-Kennzeichen oder deren Vermietung an. Wenn die reguläre deutsche Kombination für dein gekauftes Fahrzeug feststeht, kannst du hier die passenden angebotenen Schilder bestellen. Versicherung und Zulassung bleiben davon getrennt."
      ]
    }
  ],
  "sources": [
    {
      "label": "FZV § 41: Voraussetzungen und Dokumentation",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__41.html"
    }
  ],
  "relatedGuideSlugs": [
    "kurzzeitkennzeichen-fahrzeugueberfuehrung",
    "auto-anmelden-unterlagen"
  ],
  "relatedLinks": [
    {
      "href": "/blog/07-oder-h-kennzeichen",
      "label": "07-Kennzeichen und H-Kennzeichen unterscheiden"
    },
    {
      "href": "/kennzeichen-bestellen",
      "label": "Schilder für die reguläre Zulassung"
    }
  ]
},
{
  "slug": "auslaendisches-elektroauto-e-plakette",
  "title": "Ausländisches Elektroauto: E-Plakette oder deutsches E-Kennzeichen?",
  "description": "Für ein im Ausland zugelassenes Elektroauto gelten andere Kennzeichnungswege als bei einer deutschen Zulassung. Stand und zeitliche Grenze der Regelung.",
  "category": "Kennzeichenwissen",
  "publishedAt": "2026-11-24",
  "intro": [
    "Du fährst ein im Ausland zugelassenes Elektroauto in Deutschland? Dann ist ein zusätzlich bestelltes deutsches Schild mit E nicht automatisch der richtige Weg. Entscheidend ist, ob das Fahrzeug weiter ausländisch zugelassen bleibt oder in Deutschland zugelassen werden soll."
  ],
  "takeaway": "Für ausländisch zugelassene Fahrzeuge sieht § 11 FZV einen Plakettenweg vor und erkennt entsprechende ausländische Kennzeichnungen an. Stand 24.11.2026 ist die Anwendung dieser Vorschrift nach § 79 Absatz 9 bis Ende 2026 begrenzt. Für spätere Fahrten den dann geltenden Stand prüfen.",
  "sections": [
    {
      "id": "status",
      "title": "Vorübergehender Aufenthalt oder deutsche Zulassung?",
      "paragraphs": [
        "Bleibt das Fahrzeug nach den Vorschriften seines Herkunftsstaats zum Verkehr berechtigt, ist eine deutsche Kennzeichenprägung nicht der Ersatz für seine vorhandene Zulassung. § 11 Absatz 4 behandelt für berechtigte elektrisch betriebene Fahrzeuge die Kennzeichnung durch eine Plakette.",
        "Soll das Fahrzeug dagegen eine deutsche Zulassung erhalten, gehören Herkunftsunterlagen, Genehmigungsnachweise und die behördliche Zuteilung zum Importverfahren. Erst danach lässt sich das deutsche Kennzeichen korrekt anfertigen."
      ]
    },
    {
      "id": "antrag",
      "title": "Plakette bei einer vorgesehenen Ausgabestelle beantragen",
      "paragraphs": [
        "Die FZV nennt Zulassungsbehörden, weitere nach Landesrecht zuständige Stellen und anerkannte Stellen für Abgasuntersuchungen als Ausgabestellen. Als Nachweis kommen die Zulassungsbescheinigung, eine Übereinstimmungsbescheinigung oder ein anderes geeignetes Dokument infrage.",
        "Die Ausgabestelle trägt das Kennzeichen des Fahrzeugs ein. Die Plakette ist gut sichtbar an der Rückseite anzubringen. Bereits im Ausland erteilte Kennzeichen oder Plaketten für elektrisch betriebene Fahrzeuge werden nach Absatz 5 gleichgestellt; kläre bei unklarer Kennzeichnung die Anerkennung vor der Reise."
      ]
    },
    {
      "id": "vorteile",
      "title": "Kennzeichnung ist keine allgemeine Parkerlaubnis",
      "paragraphs": [
        "Ein Nachweis der elektrischen Fahrzeugart ersetzt nicht die örtlichen Verkehrsregeln. Prüfe am Zielort die konkrete Beschilderung und die Bedingungen einer möglichen Bevorrechtigung. Gehe nicht von deutschlandweit kostenlosem Parken oder einer freien Nutzung jeder Busspur aus.",
        "Die E-Plakette ist außerdem ein anderer Nachweis als eine Umweltplakette. Verwechsle die beiden Produkte bei einer Suche oder Bestellung nicht. Unser Shop bietet die hier beschriebene E-Plakette für ausländische Fahrzeuge nicht an."
      ]
    },
    {
      "id": "datum",
      "title": "Für 2027 erneut prüfen",
      "paragraphs": [
        "Der am 24. November 2026 geprüfte § 79 Absatz 9 FZV bestimmt, dass § 11 und Anlage 3 mit Ablauf des 31. Dezember 2026 nicht mehr anzuwenden sind. Daraus leiten wir keine unveränderte Fortgeltung für 2027 ab.",
        "Wenn deine Reise später beginnt, prüfe vor dem Antrag die aktuelle amtliche Regelung und frage die Ausgabestelle. Für eine geplante deutsche Zulassung hilft dir der Import-Ratgeber; die passende deutsche E-Ausführung bestellst du erst nach Klärung der Zuteilung."
      ]
    }
  ],
  "sources": [
    {
      "label": "FZV § 11: ausländische Fahrzeuge und Plakette",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__11.html"
    },
    {
      "label": "FZV § 79 Absatz 9: Anwendungsgrenze",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__79.html"
    }
  ],
  "relatedGuideSlugs": [
    "eu-import-deutsche-kennzeichen",
    "drittland-import-zulassung"
  ],
  "relatedLinks": [
    {
      "href": "/blog/e-kennzeichen-nachtraeglich",
      "label": "Deutsches E-Kennzeichen nachträglich beantragen"
    },
    {
      "href": "/kennzeichen-bestellen",
      "label": "Schilder für eine bestätigte deutsche Zuteilung"
    }
  ]
},
{
  "slug": "abgemeldetes-auto-abstellen",
  "title": "Abgemeldetes Auto abstellen: Stellplatz vor der Abmeldung klären",
  "description": "Was du beim Stellplatz, Transport und späteren Wiederzulassen eines abgemeldeten Autos vorbereitest – ohne öffentliche Parkplätze einzuplanen.",
  "category": "Kennzeichenwissen",
  "publishedAt": "2026-11-24",
  "intro": [
    "Du willst das Auto verkaufen, reparieren oder einige Zeit nicht nutzen? Kläre den Abstellort, bevor du es außer Betrieb setzt. Eine erfolgreiche Online-Abmeldung verschafft dir keinen privaten Stellplatz und verlängert keine öffentliche Parkerlaubnis."
  ],
  "takeaway": "Plane für das abgemeldete Auto einen geeigneten, erlaubten privaten Abstellort und einen zulässigen Transport dorthin. Neu geprägte Schilder allein machen das Fahrzeug weder wieder zugelassen noch öffentlich parkberechtigt.",
  "sections": [
    {
      "id": "strasse",
      "title": "Der öffentliche Parkplatz ist keine Dauerlösung",
      "paragraphs": [
        "Die amtliche Berliner Beschreibung der Außerbetriebsetzung weist darauf hin, dass das stillgelegte Fahrzeug anschließend nicht mehr auf öffentlichen Straßen gefahren oder abgestellt werden darf. Plane deshalb nicht mit einigen kostenlosen Übergangstagen am Straßenrand.",
        "Auch alte Schilder am Auto ändern den Zulassungsstatus nicht. Eine behördliche Aufforderung zur Entfernung ist kein sinnvoller Startpunkt für die Stellplatzsuche. Örtliche Maßnahmen und Kosten können sich unterscheiden; eine bundesweite Pauschalfrist nennen wir deshalb nicht."
      ]
    },
    {
      "id": "privat",
      "title": "Abstellort und Erlaubnis zusammen prüfen",
      "paragraphs": [
        "Frage den Eigentümer oder Vermieter, ob du das Fahrzeug am gewünschten Ort abstellen darfst. Prüfe Zufahrt, Platzbedarf und die Möglichkeit, es später wieder abzuholen. Eine private Grundstücksgrenze allein beantwortet nicht jede Frage zur tatsächlichen öffentlichen Zugänglichkeit.",
        "Bei einem frei zugänglichen Kundenparkplatz oder einer offenen Gemeinschaftsfläche solltest du die zulässige Nutzung ausdrücklich klären. Wähle im Zweifel einen eindeutig geeigneten privaten Stellplatz. Austretende Betriebsstoffe oder eine spätere Entsorgung sind zusätzliche Themen und werden durch die Abmeldung nicht erledigt."
      ]
    },
    {
      "id": "transport",
      "title": "Die letzte Fahrt vorher organisieren",
      "paragraphs": [
        "§ 12 Absatz 4 FZV enthält eine begrenzte Rückfahrtausnahme nach Entfernung der Stempelplakette: mit dem bisherigen Kennzeichen bis zum Ende des Abmeldetags, wenn die Haftpflichtversicherung diese Fahrt erfasst. Das ist keine allgemeine Erlaubnis, ein abgemeldetes Auto weiterzufahren.",
        "Kläre die Voraussetzungen und den Versicherungsschutz vorab. Passt die Ausnahme nicht, organisiere einen geeigneten Transport statt einer Fahrt auf eigener Achse. Für spätere Fahrten gibt es eigene Zulassungs- und Überführungsverfahren."
      ]
    },
    {
      "id": "rueckkehr",
      "title": "Vor der Wiederinbetriebnahme neu entscheiden",
      "paragraphs": [
        "Prüfe vor der erneuten Nutzung Unterlagen, Versicherungsnachweis, HU und die Kennzeichenzuteilung. Wenn die vorhandenen Schilder weiterhin zur bestätigten Kombination und Ausführung passen, ist nicht automatisch ein Neukauf erforderlich.",
        "Brauchst du wegen einer neuen Kombination oder beschädigter Schilder Ersatz, bestelle erst nach dieser Klärung. Die Lieferung umfasst die Schilder; die erforderliche Zulassung und amtliche Plaketten kommen nicht automatisch mit."
      ],
      "items": [
        "Erlaubten Abstellort vor der Abmeldung sichern.",
        "Fahrt oder Transport rechtzeitig klären.",
        "Unterlagen und alte Schilder geordnet aufbewahren.",
        "Vor erneuter Nutzung Zulassung und Schildbedarf prüfen."
      ]
    }
  ],
  "sources": [
    {
      "label": "Berlin: Außerbetriebsetzung und öffentliches Abstellen",
      "href": "https://service.berlin.de/dienstleistung/120877/standort/122304/"
    },
    {
      "label": "FZV § 12 Absatz 4: begrenzte Rückfahrtausnahme",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__12.html"
    }
  ],
  "relatedGuideSlugs": [
    "auto-online-zulassen-kennzeichen",
    "kurzzeitkennzeichen-fahrzeugueberfuehrung"
  ],
  "relatedLinks": [
    {
      "href": "/blog/kennzeichen-entsiegeln-online-abmeldung",
      "label": "Entsiegeln bei der Online-Abmeldung"
    },
    {
      "href": "/kennzeichen-bestellen",
      "label": "Bei Bedarf passende neue Schilder bestellen"
    }
  ]
},
{
  "slug": "traktor-gruenes-kennzeichen",
  "title": "Grünes Kennzeichen am Traktor: Nutzung vor der Schilderfarbe prüfen",
  "description": "Wann land- und forstwirtschaftliche Zugmaschinen für eine Steuerbefreiung infrage kommen und warum die grüne Prägung keine Bewilligung ersetzt.",
  "category": "Kennzeichenwissen",
  "publishedAt": "2026-11-24",
  "intro": [
    "Ein alter oder kleiner Traktor erhält nicht allein wegen seiner Bauform ein grünes Kennzeichen. Für die landwirtschaftliche Steuerbefreiung sind Fahrzeugart und tatsächliche Verwendung wichtig. Das muss geklärt sein, bevor du grüne Schilder bestellst."
  ],
  "takeaway": "Prüfe den begünstigten Verwendungszweck und die behördliche Zuteilung. Ein grünes Schild bewirkt keine Steuerbefreiung. Auch eine passende kleine Montagefläche erlaubt nicht automatisch jedes verkleinerte Format.",
  "sections": [
    {
      "id": "zweck",
      "title": "Welche Nutzung das Gesetz beschreibt",
      "paragraphs": [
        "§ 3 Nummer 7 KraftStG nennt unter anderem Zugmaschinen, ausgenommen Sattelzugmaschinen, die ausschließlich für die dort aufgeführten Zwecke eingesetzt werden. Dazu gehören Einsätze in land- oder forstwirtschaftlichen Betrieben und bestimmte Arbeiten oder Beförderungen für solche Betriebe.",
        "Es reicht daher nicht, dass das Fahrzeug früher auf einem Bauernhof stand. Bereite eine konkrete Beschreibung deiner Nutzung vor. Die steuerliche Einordnung klärst du mit dem zuständigen Hauptzollamt; sie ist keine Auswahloption des Schilderkonfigurators."
      ]
    },
    {
      "id": "hobby",
      "title": "Hobbyfahrten nicht ungeprüft als begünstigt behandeln",
      "paragraphs": [
        "Ein privat genutzter Sammlertraktor und eine ausschließlich begünstigt eingesetzte Zugmaschine sind unterschiedliche Fälle. Leite aus einem grünen Schild des Vorbesitzers keinen eigenen Anspruch ab. Eine neue oder gemischte Verwendung muss gesondert geklärt werden.",
        "Frage vor einer geplanten abweichenden Nutzung nach den steuerlichen Folgen. Dieser Artikel gibt keine Freigabe für einzelne Freizeitfahrten. Eine nachträgliche Bestellung schwarzer oder grüner Schilder ändert für sich allein weder den Steuerbescheid noch die Fahrzeugdaten."
      ]
    },
    {
      "id": "farbe",
      "title": "Steuerstatus und Kennzeichenzuteilung verbinden",
      "paragraphs": [
        "§ 10 Absatz 2 FZV regelt die grüne Beschriftung für steuerbefreite Fahrzeuge und enthält zugleich Ausnahmen. Deshalb bedeutet nicht jede denkbare Steuerbefreiung automatisch ein grünes Kennzeichen. Für deine Zugmaschine zählt die konkret vorgesehene Zuteilung.",
        "Kläre bei einer Änderung des Status mit der Zulassungsstelle, welche Unterlagen und Schilder vorzulegen sind. Bearbeite vorhandene schwarze Schrift nicht selbst mit grüner Farbe. Die vorgeschriebene Ausführung muss als Kennzeichenschild passen."
      ]
    },
    {
      "id": "format",
      "title": "Erst danach das angebotene Format wählen",
      "paragraphs": [
        "Der Shop bietet Landmaschinen-Ausführungen in 240 × 130 und 255 × 130 mm mit auswählbarer schwarzer oder grüner Schrift. Das sind Produktmaße, keine Genehmigung für jedes Fahrzeug. Prüfe die behördlich zulässige Schildform, die Kombination und den Montageort.",
        "Vergleiche außerdem die tatsächlich benötigte Anzahl. Wenn die Zuteilung geklärt ist und ein angebotenes Format passt, kannst du gezielt bestellen. Steuerantrag, Versicherung, Zulassung und amtliche Plaketten sind nicht im Schilderkauf enthalten."
      ]
    }
  ],
  "sources": [
    {
      "label": "KraftStG § 3 Nummer 7: landwirtschaftliche Verwendungszwecke",
      "href": "https://www.gesetze-im-internet.de/kraftstg/__3.html"
    },
    {
      "label": "FZV § 10 Absatz 2: grüne Kennzeichen",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__10.html"
    },
    {
      "label": "FZV Anlage 4: Schildformate",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/anlage_4.html"
    }
  ],
  "relatedGuideSlugs": [
    "anhaenger-gruenes-schwarzes-kennzeichen",
    "kennzeichengroessen"
  ],
  "relatedLinks": [
    {
      "href": "/blog/arbeitsmaschine-kennzeichen-20-kmh",
      "label": "Arbeitsmaschine und Kennzeichenpflicht"
    },
    {
      "href": "/landmaschinen-kennzeichen",
      "label": "Angebotene Landmaschinen-Schilder"
    }
  ]
},
{
  "slug": "kennzeichen-engschrift-kurzes-schild",
  "title": "Engschrift beim Kennzeichen: Wann ist die schmale Schrift vorgesehen?",
  "description": "Wenig Platz für das Kennzeichen? Erfahre, wann Engschrift vorgesehen ist und warum eine kurze Kombination noch keine Freigabe für jedes Schildformat bedeutet.",
  "category": "Kennzeichenwissen",
  "publishedAt": "2026-11-23",
  "intro": [
    "Die Kombination steht fest, aber in der Kennzeichenaufnahme wird es eng. Dann sind Schildbreite und Schriftart gemeinsam zu prüfen. Engschrift ist keine beliebige Designoption, mit der sich jedes Wunschformat passend machen lässt."
  ],
  "takeaway": "Für normale ein- und zweizeilige Kennzeichen ist grundsätzlich Mittelschrift vorgesehen. Engschrift kommt unter den Bedingungen der Anlage 4 FZV infrage. Kläre die konkrete Ausführung vor der Bestellung.",
  "sections": [
    {
      "id": "regel",
      "title": "Was die FZV zur Engschrift sagt",
      "paragraphs": [
        "Anlage 4 Abschnitt 1 Nummer 4 nennt die Mittelschrift als Ausgangspunkt. Reicht die vorgesehene Höchstlänge nicht aus oder lässt die vorgeschriebene beziehungsweise vom Hersteller vorgesehene Anbringungsstelle dies nicht zu, kann Engschrift für die dort genannten Zeichengruppen verwendet werden.",
        "Das ist etwas anderes als der persönliche Wunsch nach einer möglichst kleinen Tafel. Eine schmale Aufnahme muss am konkreten Fahrzeug beurteilt werden. Lass dir bei einem Sonderfall von der Zulassungsstelle erklären, welche Kombination und Ausführung geeignet sind."
      ]
    },
    {
      "id": "masse",
      "title": "Schrift und Schild sind zwei verschiedene Maße",
      "paragraphs": [
        "Die Muster führen Mittelschrift und Engschrift jeweils mit 75 Millimetern Höhe. Engschrift macht die Zeichen also nicht einfach in jeder Richtung kleiner. Für Kraftradkennzeichen und verkleinerte zweizeilige Schilder gibt es ein eigenes kleineres Schriftmuster.",
        "Außerdem brauchen Euro-Feld, Ränder, Zeichenabstände und Plaketten ihren vorgesehenen Platz. Eine kurze Kombination allein entscheidet deshalb nicht über das fertige Schildmaß. Messe die Aufnahme und halte Fotos sowie Fahrzeugunterlagen für eine Rückfrage bereit."
      ]
    },
    {
      "id": "problem",
      "title": "Wenn die vorgesehene Aufnahme nicht passt",
      "paragraphs": [
        "Die Anlage 4 enthält auch Regeln für Fälle, in denen kein vorschriftsmäßiges Kennzeichen an die vorgesehene Stelle passt. Je nach Fall sind Änderungen am Fahrzeug oder eine behördlich geprüfte Ausnahme nötig. Zubehör, das erst nachträglich den Platz einschränkt, schafft nicht automatisch einen Ausnahmeanspruch.",
        "Kürze ein gekauftes Blech deshalb nicht selbst und dränge die Beschriftung nicht durch Kleben oder Umarbeiten zusammen. Auch eine am Bildschirm passend wirkende Vorschau ersetzt keine Klärung des Sonderfalls."
      ]
    },
    {
      "id": "bestellung",
      "title": "Was der aktuelle Shop dafür anbietet",
      "paragraphs": [
        "Der normale Auto-Konfigurator bietet die 520-mm-Ausführung. Frei wählbare kurze Pkw-Schilder und eine gesonderte Engschrift-Auswahl sind hier nicht zugesagt. Wenn du eine davon abweichende Lösung brauchst, kläre zuerst die konkrete Lieferbarkeit und behördliche Eignung.",
        "Passt die angebotene Standardausführung, überträgst du die bestätigte Kombination unverändert. Bei einem Ersatz an einem zugelassenen Fahrzeug gehören die amtlichen Plaketten in den gesonderten Austauschvorgang."
      ],
      "items": [
        "Aufnahme am Fahrzeug messen.",
        "Bestätigte Kombination und Zusätze berücksichtigen.",
        "Engschrift oder Ausnahme mit der zuständigen Stelle klären.",
        "Nur eine tatsächlich angebotene passende Ausführung bestellen."
      ]
    }
  ],
  "sources": [
    {
      "label": "FZV Anlage 4: Schriftmuster und Ergänzungsbestimmungen",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/anlage_4.html"
    }
  ],
  "relatedGuideSlugs": [
    "kennzeichengroessen"
  ],
  "relatedLinks": [
    {
      "href": "/kennzeichen-bestellen",
      "label": "Angebotene Standardausführung konfigurieren"
    },
    {
      "href": "/blog/kennzeichen-fe-schrift",
      "label": "Was FE-Schrift bedeutet"
    }
  ]
},
{
  "slug": "kennzeichen-fe-schrift",
  "title": "FE-Schrift auf Kennzeichen: Warum die Zeichenform vorgegeben ist",
  "description": "Was fälschungserschwerende Schrift bedeutet, welche Muster für Kennzeichen gelten und warum Wunschschrift oder ein eigener Ausdruck keine Alternative sind.",
  "category": "Kennzeichenwissen",
  "publishedAt": "2026-11-23",
  "intro": [
    "Kennzeichenbuchstaben sehen anders aus als gewöhnliche Druckschrift. Die Formen sind vorgeschrieben. Beim Bestellen entscheidest du daher nicht wie bei einem Namensschild frei über die Schriftart."
  ],
  "takeaway": "FE steht für fälschungserschwerende Schrift. Die Beschriftung muss den amtlich vorgesehenen Mustern entsprechen. Weder eine ähnliche Computerschrift noch ein ausgedrucktes Kennzeichen ersetzt ein vorschriftsmäßiges Schild.",
  "sections": [
    {
      "id": "begriff",
      "title": "FE bezeichnet die Zeichenform",
      "paragraphs": [
        "Anlage 4 FZV benennt die fälschungserschwerende Schrift und verweist auf die Schriftmuster für Kfz-Kennzeichen. Vorgegeben sind nicht nur grobe Buchstabenformen, sondern auch Maße und Toleranzen.",
        "Der Name bedeutet nicht fälschungssicher. Er ist weder eine Garantie gegen Missbrauch noch ein eigenständiges Zertifikat für ein angebotenes Produkt. Auch ein Blech mit ähnlich aussehenden Buchstaben muss die weiteren Anforderungen erfüllen."
      ]
    },
    {
      "id": "varianten",
      "title": "Welche Muster unterschieden werden",
      "paragraphs": [
        "Die Anlage zeigt Mittelschrift und Engschrift mit 75 Millimetern Höhe sowie verkleinerte Mittelschrift mit 49 Millimetern für die dafür vorgesehenen Schildarten. Diese Muster sind an die Kennzeichenausführung gebunden.",
        "Für die Frage, wann Engschrift wegen Platzmangels eingesetzt werden darf, gibt es einen eigenen verlinkten Artikel. Hier ist die Grundentscheidung wichtig: Eine selbst gewählte Schreibschrift, Kursivschrift oder frei skalierte Schrift ist keine reguläre Bestelloption für ein amtliches Schild."
      ]
    },
    {
      "id": "kombination",
      "title": "Zeichenform ändert nicht die Kombination",
      "paragraphs": [
        "Prüfe den Text deiner Reservierungs- oder Zuteilungsbestätigung unabhängig vom Schriftbild. Eine Null bleibt eine Ziffer, ein O ein Buchstabe. Teile eine unklare Bestätigung der ausstellenden Stelle mit, statt das Zeichen nach persönlichem Geschmack zu wählen.",
        "Die Nummernfolge, ihre amtliche Zuteilung und die technische Fertigung sind getrennte Schritte. Ein korrekt geprägter Buchstabe macht eine falsch übertragene Kombination nicht richtig. Der verlinkte O-und-Null-Artikel hilft beim Abgleich."
      ]
    },
    {
      "id": "produkt",
      "title": "Worauf du am fertigen Schild achtest",
      "paragraphs": [
        "§ 12 FZV verlangt unter anderem die vorgeschriebene Ausführung, Reflexion sowie das DIN-Prüf- und Überwachungszeichen mit Registernummer. FE-Schrift ist nur ein Teil davon. Amtliche Stempel- und HU-Plaketten sind wiederum eigene Kennzeichnungen.",
        "Prüfe vor dem Kauf Kennzeichenart, Maße und Kombination. Nach der Lieferung vergleichst du die Zeichen erneut. Dekoschilder oder eigene Papierausdrucke sind kein Ersatz für die im Zulassungsverfahren benötigten Schilder."
      ],
      "items": [
        "Bestätigte Kombination Zeichen für Zeichen übertragen.",
        "Vorgesehene Kennzeichenart und Maße auswählen.",
        "Keine freie Wunschschrift für das amtliche Schild erwarten.",
        "Prägung und amtliche Plaketten getrennt behandeln."
      ]
    }
  ],
  "sources": [
    {
      "label": "FZV Anlage 4: FE-Schrift und Muster",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/anlage_4.html"
    },
    {
      "label": "FZV § 12: Anforderungen an Kennzeichenschilder",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__12.html"
    }
  ],
  "relatedGuideSlugs": [
    "kennzeichengroessen"
  ],
  "relatedLinks": [
    {
      "href": "/kennzeichen-bestellen",
      "label": "Kennzeichenschilder konfigurieren"
    },
    {
      "href": "/blog/kennzeichen-praegen-herstellung",
      "label": "Wie Kennzeichen geprägt werden"
    },
    {
      "href": "/blog/kennzeichen-o-oder-null",
      "label": "O und Null sicher unterscheiden"
    },
    {
      "href": "/blog/kennzeichen-engschrift-kurzes-schild",
      "label": "Engschrift bei begrenztem Platz"
    },
    {
      "href": "/blog/kennzeichen-umlaute-buchstaben",
      "label": "Umlaute im Ortskürzel und bei Wunschbuchstaben"
    }
  ]
},
{
  "slug": "kennzeichen-diebstahlschutz",
  "title": "Kennzeichen gegen Diebstahl sichern: Befestigung sinnvoll prüfen",
  "description": "Was eine festere Befestigung leisten kann, worauf du bei Sicherheitshaltern achten solltest und warum es keine Diebstahlgarantie gibt.",
  "category": "Kennzeichenwissen",
  "publishedAt": "2026-11-23",
  "intro": [
    "Die Schilder sind noch da, aber der Rahmen lässt sich sehr leicht öffnen. Jetzt kannst du die Befestigung prüfen, bevor etwas passiert. Eine Sicherung soll das unbemerkte Abnehmen erschweren, ohne die vorgeschriebene Lesbarkeit zu beeinträchtigen."
  ],
  "takeaway": "Prüfe die gesamte Befestigung von Schild und Halter. Eine festere Montage kann den Aufwand beim Abnehmen erhöhen, bietet aber keinen vollständigen Diebstahlschutz. Im Shop angebotene normale Halter sind keine geprüfte Sicherheitslösung.",
  "sections": [
    {
      "id": "grenzen",
      "title": "Keine Befestigung ist eine Diebstahlgarantie",
      "paragraphs": [
        "Der ADAC nennt verschraubte Schilder und spezielle Sicherheitshalter als Möglichkeiten, Dieben die Arbeit zu erschweren. Daraus folgt keine Garantie. Selbst verschraubte Schilder können mit Gewalt entfernt werden; auch die Polizei hat solche Fälle dokumentiert.",
        "Wähle deshalb nicht allein nach einer Werbeaussage wie diebstahlsicher. Für eine konkrete Schutzwirkung wären belastbare Nachweise zum jeweiligen Produkt nötig. Dieser Artikel enthält keinen eigenen Vergleichstest und keine Erfolgsquote."
      ]
    },
    {
      "id": "system",
      "title": "Schild und Halter als Einheit betrachten",
      "paragraphs": [
        "Eine besondere Schraube am Blech hilft wenig, wenn der gesamte Rahmen locker ist. Prüfe sichtbare Risse, offene Clips und die Verbindung zum Fahrzeug. Folge dabei der Anleitung des Halterherstellers.",
        "Wenn du ein System mit Spezialwerkzeug wählst, bewahre dieses so auf, dass du es beim späteren Schilderwechsel wiederfindest. Prüfe vorher, ob das System zu Aufnahme und Schildformat passt. Eine schwierige Demontage kann sonst auch den regulären Austausch behindern."
      ]
    },
    {
      "id": "sicht",
      "title": "Die Sicherung darf das Kennzeichen nicht verdecken",
      "paragraphs": [
        "§ 12 FZV verlangt die feste Anbringung und die vorgeschriebene Ausgestaltung. Befestigungsteile dürfen nicht einfach Buchstaben, Ziffern oder Plaketten überdecken. Eine zusätzliche Schutzscheibe oder Folie ist keine pauschal zulässige Sicherungsmethode.",
        "Wenn für die Montage gebohrt werden muss, kläre geeignete Stellen und die Befestigung am Fahrzeug. Die praktische Bohranleitung ist verlinkt. Beschädige weder die reflektierende Fläche unnötig noch amtliche Siegel."
      ]
    },
    {
      "id": "kontrolle",
      "title": "Kontrolle und Ersatz getrennt planen",
      "paragraphs": [
        "Ein kurzer Blick vor Fahrtbeginn hilft, lockere oder fehlende Schilder zu bemerken. Bei tatsächlichem Diebstahl zuerst Polizei und Zulassungsstelle einschalten. Ein zweites ungestempeltes Blech mit alter Kombination ist keine vorbereitete Ersatz-Zulassung.",
        "Der Shop bietet Kennzeichenschilder und normale Halteroptionen, aber keine hier nachgewiesenen Spezial-Sicherheitshalter. Bestelle neue Schilder erst bei wirklichem Ersatzbedarf und nach Klärung der Kombination."
      ],
      "items": [
        "Rahmen und Fahrzeugbefestigung gemeinsam kontrollieren.",
        "Herstellerangaben zur Montage prüfen.",
        "Lesbarkeit und Plaketten freihalten.",
        "Spezialwerkzeug für spätere Demontage aufbewahren.",
        "Bei fehlendem Schild das Verlustverfahren nutzen."
      ]
    }
  ],
  "sources": [
    {
      "label": "ADAC: Möglichkeiten und Grenzen des Kennzeichenschutzes",
      "href": "https://www.adac.de/verkehr/recht/verkehrsvorschriften-deutschland/kennzeichenverlust/"
    },
    {
      "label": "FZV § 12: Anbringung und Abdeckungen",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__12.html"
    },
    {
      "label": "Polizeipräsidium Mittelhessen: auch verschraubtes Schild entwendet",
      "href": "https://www.presseportal.de/blaulicht/pm/43647/5137879"
    }
  ],
  "relatedGuideSlugs": [
    "kennzeichen-verloren-gestohlen",
    "kennzeichen-beschaedigt-ersetzen"
  ],
  "relatedLinks": [
    {
      "href": "/blog/kennzeichen-bohren-befestigen",
      "label": "Kennzeichenschilder befestigen"
    },
    {
      "href": "/blog/kennzeichenhalter-wechseln",
      "label": "Defekten Kennzeichenhalter wechseln"
    },
    {
      "href": "/kennzeichen-bestellen",
      "label": "Schilder nach geklärtem Ersatzverfahren bestellen"
    }
  ]
},
{
  "slug": "arbeitsmaschine-kennzeichen-20-kmh",
  "title": "Arbeitsmaschine: Zulassungsfrei und trotzdem ein Kennzeichen?",
  "description": "Bei selbstfahrenden Arbeitsmaschinen und Staplern sind Zulassung, Kennzeichen und Genehmigung getrennt zu prüfen. Wichtig ist auch die bauartbedingte Geschwindigkeit.",
  "category": "Kennzeichenwissen",
  "publishedAt": "2026-11-23",
  "intro": [
    "Der Radlader wird nur kurz über die Straße zum nächsten Einsatz gefahren. Bedeutet zulassungsfrei, dass er kein Kennzeichen braucht? Nicht unbedingt. Fahrzeugart und bauartbedingte Höchstgeschwindigkeit entscheiden über unterschiedliche Pflichten."
  ],
  "takeaway": "Selbstfahrende Arbeitsmaschinen und Stapler sind nach § 3 FZV grundsätzlich vom Zulassungsverfahren ausgenommen. Bei mehr als 20 km/h verlangt § 4 dennoch ein zugeteiltes Kennzeichen. Ein normaler Traktor fällt nicht allein wegen seines Einsatzorts unter diese Ausnahme.",
  "sections": [
    {
      "id": "klasse",
      "title": "Die Eintragung ist wichtiger als der Alltagsname",
      "paragraphs": [
        "Prüfe die Fahrzeugunterlagen: Ist das Fahrzeug tatsächlich als selbstfahrende Arbeitsmaschine oder Stapler eingestuft? Ein landwirtschaftlich genutztes Fahrzeug ist nicht automatisch eine solche Arbeitsmaschine.",
        "Leite die Einordnung nicht nur aus einem Anbaugerät oder der Bezeichnung auf einem Verkaufsportal ab. Bei fehlenden oder unklaren Papieren klärst du Fahrzeugklasse und Genehmigung zunächst mit einer zuständigen Stelle. Die Schildergröße löst diese Frage nicht."
      ]
    },
    {
      "id": "tempo",
      "title": "Mehr als 20 km/h: eigene Kennzeichenzuteilung",
      "paragraphs": [
        "§ 4 Absatz 2 FZV verlangt für die dort genannten Arbeitsmaschinen und Stapler bei einer bauartbedingten Höchstgeschwindigkeit von mehr als 20 Kilometern pro Stunde ein Kennzeichen. Maßgeblich ist die technische Einstufung, nicht wie langsam du an diesem Tag fahren möchtest.",
        "Die Zuteilung erfolgt behördlich. Einfach eine vorhandene Nummer eines anderen Betriebsfahrzeugs nachprägen zu lassen, ersetzt sie nicht. Bei freiwilliger Zulassung oder besonderen Fahrzeugfällen ist der konkrete Status gesondert zu berücksichtigen."
      ]
    },
    {
      "id": "langsam",
      "title": "Bis 20 km/h bleiben weitere Pflichten",
      "paragraphs": [
        "Für die von § 4 Absatz 4 erfassten Fahrzeuge bis 20 km/h ist eine dauerhafte, deutlich lesbare Halterkennzeichnung auf der linken Fahrzeugseite vorgesehen: bei Privatpersonen Name und Wohnort, bei Firmen Bezeichnung und Sitz.",
        "Das ist kein normales amtliches Nummernschild. Auch die Genehmigungsvoraussetzungen und erforderlichen Fahrzeugnachweise bleiben zu beachten. Zulassungsfreiheit bedeutet zudem nicht automatisch Versicherungsfreiheit; kläre den Schutz für den konkreten Einsatz mit deinem Versicherer."
      ]
    },
    {
      "id": "kauf",
      "title": "Vor einer Schilderbestellung diese Angaben klären",
      "paragraphs": [
        "Wenn ein amtliches Kennzeichen zugeteilt wird, benötigst du die bestätigte Kombination, Farbe und zulässige Schildform. Der Shop bietet Landmaschinenformate in 240 × 130 und 255 × 130 Millimetern. Diese passen nicht automatisch zu jeder Arbeitsmaschine.",
        "Bestelle erst nach dem Abgleich mit deinen Unterlagen. Die physische Tafel enthält weder eine Betriebserlaubnis noch die amtliche Zuteilung. Für eine vorgeschriebene Halteranschrift ist der Kennzeichenkonfigurator nicht als Beschriftungsdienst vorgesehen."
      ],
      "items": [
        "Fahrzeugklasse und Genehmigung nachweisen.",
        "Bauartbedingte Höchstgeschwindigkeit prüfen.",
        "Kennzeichenzuteilung oder Halterbeschriftung unterscheiden.",
        "Bestätigte Farbe und Format mit dem Sortiment abgleichen."
      ]
    }
  ],
  "sources": [
    {
      "label": "FZV § 3: Ausnahmen vom Zulassungsverfahren",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__3.html"
    },
    {
      "label": "FZV § 4: Voraussetzungen und Kennzeichnung",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__4.html"
    }
  ],
  "relatedGuideSlugs": [
    "kennzeichengroessen"
  ],
  "relatedLinks": [
    {
      "href": "/landmaschinen-kennzeichen",
      "label": "Angebotene Landmaschinenformate ansehen"
    },
    {
      "href": "/blog/traktor-gruenes-kennzeichen",
      "label": "Grünes Kennzeichen für landwirtschaftliche Zugmaschinen"
    }
  ]
},
{
  "slug": "wohnwagen-eigenes-kennzeichen",
  "title": "Wohnwagen: Warum du ein eigenes Kennzeichen brauchst",
  "description": "Ein normaler Wohnanhänger führt seine eigene Kombination. So unterscheidest du ihn vom Fahrradträger und planst Schild, Saison und Zugwagenwechsel.",
  "category": "Kennzeichenwissen",
  "publishedAt": "2026-11-23",
  "intro": [
    "Das Auto hat ein Kennzeichen. Kann der Wohnwagen einfach ein zweites Schild mit derselben Nummer bekommen? Bei einem normalen privat genutzten Wohnanhänger ist das nicht der richtige Weg. Er wird als eigenes Fahrzeug zugelassen."
  ],
  "takeaway": "Der reguläre Wohnwagen braucht seine eigene Zulassung und ein hinteres Kennzeichenschild mit der zugeteilten Kombination. Das ist kein Wiederholungsschild des Zugautos. Ein Wechsel des Zugwagens ändert deshalb nicht automatisch die Wohnwagenkombination.",
  "sections": [
    {
      "id": "anhaenger",
      "title": "Wohnanhänger und Fahrradträger unterscheiden",
      "paragraphs": [
        "§ 3 FZV sieht grundsätzlich die Zulassung von Kraftfahrzeugen und ihren Anhängern vor. Die Ausnahmen sind konkret beschrieben. Die besondere Ausnahme für bestimmte Wohnwagen im Schaustellergewerbe ist keine allgemeine Freizeitwohnwagen-Regel.",
        "Ein Fahrradträger am Auto hat eine andere Funktion. Wird durch ihn das Fahrzeugkennzeichen verdeckt, kommt eine Wiederholung der Autokombination infrage. Übertrage diese Regel nicht auf einen regulär zulassungspflichtigen Wohnanhänger."
      ]
    },
    {
      "id": "schild",
      "title": "Ein amtliches Schild an der Rückseite",
      "paragraphs": [
        "Nach § 12 FZV wird das Kennzeichen am Anhänger hinten angebracht. Bestelle die für den Wohnwagen bestätigte Kombination und prüfe das Format der Aufnahme. Für den gewöhnlichen Wohnwagen brauchst du nicht wie beim Pkw ein vorderes und ein hinteres Schilderpaar.",
        "Die benötigten amtlichen Plaketten kommen über das vorgesehene Verfahren hinzu. Eine Tempo-100-Plakette ist wiederum eine andere Kennzeichnung mit eigenen Voraussetzungen. Sie ersetzt weder Zulassung noch Kennzeichenschild."
      ]
    },
    {
      "id": "zugwagen",
      "title": "Was beim Wechsel des Zugautos wichtig ist",
      "paragraphs": [
        "Der Wohnwagen behält seine eigene Identität und Zulassung. Prüfe beim anderen Zugwagen trotzdem, ob Anhängelast, zulässige Kombination und gegebenenfalls Tempo-100-Bedingungen passen.",
        "Du musst die Wohnwagenkombination nicht allein deshalb neu prägen lassen, weil das Zugauto eine andere Nummer hat. Bei einem tatsächlichen Halterwechsel oder einer behördlichen Änderung ist dagegen der entsprechende Vorgang zu klären."
      ]
    },
    {
      "id": "saison",
      "title": "Saison und Bestellung zusammen planen",
      "paragraphs": [
        "Bei einer Saisonzulassung richtet sich der erlaubte Betriebszeitraum nach dem Wohnwagenkennzeichen. Ein ganzjährig zugelassenes Zugauto verlängert die Saison des Anhängers nicht. Prüfe die Monate daher für beide Fahrzeuge getrennt.",
        "Wenn Kombination und Ausführung feststehen, wählst du ein passendes angebotenes Anhängerschild. Kontrolliere die Stückzahl vor der Zahlung. Für einen Saisonwunsch nutze nur eine dafür passende, bestätigte Ausführung."
      ],
      "items": [
        "Eigene Wohnwagenkombination statt Autonummer verwenden.",
        "Zulassungsstatus und mögliche Saisonmonate prüfen.",
        "Hintere Aufnahme messen.",
        "Ein benötigtes Schild und amtliche Plaketten unterscheiden."
      ]
    }
  ],
  "sources": [
    {
      "label": "FZV § 3: Zulassung und konkrete Anhängerausnahmen",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__3.html"
    },
    {
      "label": "FZV § 12: Anbringung an Anhängern",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__12.html"
    },
    {
      "label": "FZV § 10: Saisonkennzeichen",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__10.html"
    }
  ],
  "relatedGuideSlugs": [
    "saisonkennzeichen-zeitraum-aendern",
    "auto-anmelden-unterlagen"
  ],
  "relatedLinks": [
    {
      "href": "/anhaengerkennzeichen",
      "label": "Passendes Anhängerkennzeichen konfigurieren"
    },
    {
      "href": "/blog/anhaenger-100-plakette-kennzeichen",
      "label": "Tempo-100-Plakette richtig einordnen"
    }
  ]
},
{
  "slug": "tageszulassung-kennzeichen",
  "title": "Tageszulassung und Kennzeichen: Was gilt bei der Fahrzeugabholung?",
  "description": "Der Verkaufsbegriff Tageszulassung sagt noch nichts über die erlaubte Abholfahrt. Prüfe aktuellen Zulassungsstatus, Nachweis und die spätere Schilderbestellung.",
  "category": "Kennzeichenwissen",
  "publishedAt": "2026-11-23",
  "intro": [
    "Der Händler bietet ein Auto mit Tageszulassung an. Daraus folgt nicht, dass du es bei der Abholung einfach mit vorhandenen Schildern fahren darfst. Zuerst musst du klären, ob das Fahrzeug aktuell zugelassen oder bereits außer Betrieb gesetzt ist."
  ],
  "takeaway": "Die gesetzliche Tageszulassung nach § 7 FZV endet mit Ablauf des Tages der Erstzulassung. Sie ist keine mehrtägige Überführungserlaubnis. Für eine spätere Abholung brauchst du einen dafür gültigen Zulassungs- und Versicherungsstatus.",
  "sections": [
    {
      "id": "begriff",
      "title": "Verkaufsbeschreibung und aktueller Status trennen",
      "paragraphs": [
        "Eine Anzeige kann mit Tageszulassung die frühere kurze Zulassung eines angebotenen Autos meinen. Das Wort allein belegt weder eine heute bestehende Zulassung noch ein bestimmtes Datum für deine Fahrt.",
        "Lass dir vor der Abholung erklären, welches Verfahren genutzt wurde, wann es wirksam war und welchen Status das Fahrzeug jetzt hat. Prüfe dazu die Fahrzeugpapiere. So wird aus einer unklaren Verkaufsbeschreibung ein konkreter Ablauf für die Übergabe."
      ]
    },
    {
      "id": "gesetz",
      "title": "Was die Tageszulassung nach § 7 bedeutet",
      "paragraphs": [
        "Bei diesem Verfahren gilt die Erstzulassung ausschließlich für den Tag, an dem sie wirksam wird. Mit dessen Ablauf gilt das Fahrzeug ohne gesonderten Abmeldeantrag als außer Betrieb gesetzt.",
        "Eine Abstempelung der Kennzeichenschilder ist dabei nicht erforderlich. Für die erlaubte Inbetriebsetzung sind aber die vorgeschriebenen Schilder nötig und der vorläufige Zulassungsnachweis muss von außen gut lesbar im Fahrzeug ausliegen. Das ist eine eng begrenzte Sonderregel, keine allgemeine Fahrerlaubnis mit ungestempelten Blechen."
      ]
    },
    {
      "id": "abholung",
      "title": "Abholung nach dem Zulassungstag organisieren",
      "paragraphs": [
        "Liegt der Tag bereits zurück, vereinbare die passende weitere Zulassung oder einen rechtlich geeigneten Transport. Ein noch im Auto liegender vorläufiger Nachweis verlängert die Tageszulassung nicht.",
        "Eine neue Schilderbestellung allein schafft ebenfalls keinen gültigen Status. Stimme mit dem Händler ab, wer Unterlagen bereitstellt und wer den nächsten behördlichen Vorgang erledigt. Die Versicherung muss zu diesem Vorgang passen."
      ]
    },
    {
      "id": "schilder",
      "title": "Erst den folgenden Vorgang, dann die Bleche planen",
      "paragraphs": [
        "Kläre, welche Kombination für die spätere Zulassung bestätigt ist und ob vorhandene Schilder in passender Ausführung weiterverwendet werden können. Bestelle nicht automatisch die frühere Händlerkombination nach.",
        "Für eine bestätigte reguläre Kombination kannst du die passende angebotene Ausführung konfigurieren. Die Bestellung liefert Schilder, aber keine Tageszulassung, Versicherung oder amtlichen Plaketten. Plane die Lieferung mit Abstand zum vereinbarten Termin."
      ],
      "items": [
        "Aktuellen Zulassungsstatus statt nur Anzeigenbegriff prüfen.",
        "Tag und Gültigkeit eines vorläufigen Nachweises abgleichen.",
        "Spätere Zulassung oder Transport vor Abholung vereinbaren.",
        "Bestätigte Kombination und Schilderbedarf feststellen."
      ]
    }
  ],
  "sources": [
    {
      "label": "FZV § 7: gesetzliche Tageszulassung",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__7.html"
    },
    {
      "label": "FZV § 16: Wiederzulassung",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__16.html"
    }
  ],
  "relatedGuideSlugs": [
    "auto-online-zulassen-kennzeichen",
    "kurzzeitkennzeichen-fahrzeugueberfuehrung"
  ],
  "relatedLinks": [
    {
      "href": "/kennzeichen-bestellen",
      "label": "Schilder für die bestätigte Zulassung bestellen"
    },
    {
      "href": "/blog/evb-nummer-kennzeichenbestellung",
      "label": "Versicherungsnachweis und Schilderkauf trennen"
    }
  ]
},
{
  "slug": "evb-nummer-kennzeichenbestellung",
  "title": "eVB und Kennzeichenbestellung: Welche Nummer gehört wohin?",
  "description": "Versicherungscode, Wunschkennzeichen und Bestellnummer haben verschiedene Aufgaben. So bereitest du die Schilderbestellung ohne Verwechslungen vor.",
  "category": "Zulassung vorbereiten",
  "publishedAt": "2026-11-23",
  "intro": [
    "Deine Versicherung schickt dir eine eVB. Gleichzeitig hast du eine Wunschkombination reserviert. Beide Angaben brauchst du für unterschiedliche Schritte. Auf das Kennzeichenschild gehört die bestätigte Kombination der Zulassungsbehörde, nicht der Versicherungscode."
  ],
  "takeaway": "Die eVB weist die Kfz-Haftpflichtversicherung im Zulassungsverfahren nach. Für die Schilderbestellung verwendest du die bestätigte Kennzeichenkombination. Eine eVB reserviert keine Nummer und ersetzt keine Zulassung.",
  "sections": [
    {
      "id": "evb",
      "title": "Was die eVB tatsächlich erledigt",
      "paragraphs": [
        "Die elektronische Versicherungsbestätigung kommt von deiner Versicherung. Bei der eVB zum Abruf erhältst du einen siebenstelligen Code aus Buchstaben und Zahlen. Damit kann die Zulassungsbehörde die hinterlegten Versicherungsdaten abrufen.",
        "§ 49 FZV regelt diesen Versicherungsnachweis. Er kann auch Angaben zur vorgesehenen Kennzeichenart und bei einer Saison zum maximalen Zeitraum enthalten. Melde der Versicherung deshalb, welches Fahrzeug du wie zulassen möchtest. Eine eVB für einen anderen Vorgang solltest du nicht ungeprüft verwenden."
      ]
    },
    {
      "id": "reservierung",
      "title": "Die Reservierung betrifft deine Wunschkombination",
      "paragraphs": [
        "Die Wunschkennzeichenreservierung läuft über die zuständige Zulassungsbehörde. Ihre Bestätigung kann zusätzlich eine Reservierungsnummer oder PIN enthalten. Auch diese PIN wird nicht auf das Schild geprägt.",
        "Prüfe auf der Bestätigung die eigentliche Kombination, den Namen und die Frist. Halte die Vorgänge getrennt: Die Versicherung bestätigt den Schutz, die Behörde entscheidet über die Zuteilung. Ein verfügbares Kennzeichen im Suchfeld ist noch keine abgeschlossene Zulassung."
      ]
    },
    {
      "id": "bestellen",
      "title": "Was du im Konfigurator eingibst",
      "paragraphs": [
        "Übertrage Ortskürzel, Buchstaben und Ziffern aus der bestätigten Kombination. Wähle die passende Ausführung und Anzahl. Zusätze wie E oder H und ein Saisonzeitraum müssen zum behördlichen Vorgang passen.",
        "Der Schilderkonfigurator ist kein Versicherungsantrag. Trage den eVB-Code weder in das Nummernfeld noch als Wunschtext ein. Bewahre ihn für das Zulassungsverfahren auf. Auch eine erfolgreiche Zahlung im Shop stellt noch keine amtlichen Plaketten bereit."
      ]
    },
    {
      "id": "fehler",
      "title": "Wenn die eVB bei der Zulassung nicht passt",
      "paragraphs": [
        "Prüfe gemeinsam mit der Versicherung, ob Halterdaten, Fahrzeugart und geplanter Vorgang richtig hinterlegt sind. Frage dort auch nach der konkreten Gültigkeit. Eine pauschale Frist für jede Versicherung wäre unzuverlässig.",
        "Ändere bei einem eVB-Problem nicht vorschnell deine Schilderbestellung. Solange die bestätigte Kennzeichenkombination gleich bleibt, ist ein korrigierter Versicherungscode kein neuer Schildaufdruck. Ändert die Behörde dagegen die Kombination, musst du die Prägung erneut abgleichen."
      ]
    },
    {
      "id": "check",
      "title": "Vor der Bestellung kurz abgleichen",
      "paragraphs": [
        "Lege Reservierungsbestätigung und Zulassungsunterlagen nebeneinander. Lies die Vorschau Zeichen für Zeichen. So fällt auf, wenn du versehentlich die Reservierungs-PIN oder eine Ziffer aus einem anderen Dokument übernommen hast.",
        "Bestelle erst, wenn Kombination und Ausführung für deinen Vorgang geklärt sind. Die für die Zulassung erforderliche Versicherung und die amtlichen Plaketten organisierst du separat."
      ],
      "items": [
        "eVB für das richtige Fahrzeug und den richtigen Vorgang bereithalten.",
        "Bestätigte Kennzeichenkombination als Grundlage nehmen.",
        "Maße, Kennzeichenart und Stückzahl prüfen.",
        "Bestellbestätigung nach dem Kauf noch einmal vergleichen."
      ]
    }
  ],
  "sources": [
    {
      "label": "FZV § 49: Versicherungsnachweis",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__49.html"
    },
    {
      "label": "Landkreis Lichtenfels: elektronische Versicherungsbestätigung",
      "href": "https://www.lkr-lif.de/landratsamt/verkehr/zulassungsstelle/1909.Elektronische-Versicherungsbestaetigung-eVB.html"
    }
  ],
  "relatedGuideSlugs": [
    "auto-anmelden-unterlagen",
    "eu-import-deutsche-kennzeichen"
  ],
  "relatedLinks": [
    {
      "href": "/kennzeichen-bestellen",
      "label": "Schilder mit bestätigter Kombination bestellen"
    },
    {
      "href": "/blog/kennzeichen-o-oder-null",
      "label": "Buchstaben und Ziffern richtig übernehmen"
    },
    {
      "href": "/ratgeber/auto-auf-firma-zulassen",
      "label": "Zulassung auf ein Unternehmen"
    },
    {
      "href": "/ratgeber/fahrzeug-auf-minderjaehrige-zulassen",
      "label": "Zulassung auf Minderjährige"
    },
    {
      "href": "/blog/fin-kennzeichen-unterschied",
      "label": "FIN und Kennzeichen unterscheiden"
    },
    {
      "href": "/ratgeber/selbstfahrervermietfahrzeug-zulassen",
      "label": "Versicherung bei gewerblicher Vermietung vorbereiten"
    }
  ]
},
{
  "slug": "kennzeichen-ausland-d-schild",
  "title": "Mit dem Auto ins Ausland: Reicht das D im Euro-Kennzeichen?",
  "description": "Wann das integrierte D-Zeichen innerhalb der EU genügt und was du für Nicht-EU-Länder und Transitstrecken vor der Reise prüfen solltest.",
  "category": "Kennzeichen unterwegs",
  "publishedAt": "2026-11-23",
  "intro": [
    "Vor der Autofahrt ins Ausland taucht oft dieselbe Frage auf: Muss noch ein ovales D-Schild ans Heck? Bei einem vorschriftsmäßigen Euro-Kennzeichen gibt es innerhalb der EU eine klare Anerkennungsregel. Für die komplette Reise zählt aber auch deine Strecke."
  ],
  "takeaway": "Innerhalb der EU wird das vorgeschriebene Länderzeichen im Euro-Kennzeichen anerkannt. Für Ziele und Durchfahrten außerhalb der EU prüfst du die dortigen Vorgaben gesondert. Das D muss erkennbar bleiben.",
  "sections": [
    {
      "id": "eu",
      "title": "Die Regel für Fahrten innerhalb der EU",
      "paragraphs": [
        "Die Verordnung (EG) Nr. 2411/98 regelt die Anerkennung des Zulassungsstaats am linken Kennzeichenrand. Sie gilt für in einem Mitgliedstaat zugelassene Fahrzeuge im Verkehr innerhalb der EU.",
        "Ein entsprechend gestaltetes Euro-Kennzeichen mit D erfüllt dort die Funktion des Länderzeichens. Ein zusätzliches ovales D ist dafür nicht erforderlich. Die Regel betrifft das Erkennungszeichen des Zulassungsstaats; sie ersetzt weder Fahrzeugpapiere noch sonstige Reisevoraussetzungen."
      ]
    },
    {
      "id": "route",
      "title": "Ziel und Durchfahrtsländer getrennt prüfen",
      "paragraphs": [
        "Europa und EU sind nicht deckungsgleich. Auch eine Fahrt zwischen zwei EU-Ländern kann durch ein Nicht-EU-Land führen. Leite aus der EU-Regel deshalb keine pauschale Zusage für jede europäische Route ab.",
        "Notiere alle Durchfahrtsländer. Prüfe vor Abfahrt die aktuellen Fahrzeug- und Einreiseinformationen der jeweiligen Behörden oder offiziellen Ländervertretungen. Suche ausdrücklich nach dem Länderkennzeichen für in Deutschland zugelassene Fahrzeuge. Eine alte Packliste kann die aktuelle Auskunft nicht ersetzen."
      ]
    },
    {
      "id": "alt",
      "title": "Bei einem alten Schild ohne Euro-Feld",
      "paragraphs": [
        "Fehlt das integrierte Länderzeichen, greift diese Anerkennungsregel für dein Schild nicht. Kläre für die geplante Fahrt, welches gesonderte Unterscheidungszeichen erforderlich ist.",
        "Klebe nicht selbst einen blauen Streifen auf das amtliche Schild, um ein Euro-Kennzeichen nachzubauen. Wenn du auf neue Schilder wechseln möchtest, stimme den Austausch und die erforderlichen amtlichen Plaketten mit der Zulassungsstelle ab. Ein reiner Onlinekauf erledigt das nicht."
      ]
    },
    {
      "id": "sichtbar",
      "title": "Das Länderzeichen muss sichtbar bleiben",
      "paragraphs": [
        "Das vorgeschriebene Euro-Feld hat einen blauen Hintergrund, zwölf gelbe Sterne und das Länderzeichen. Eine schwarze Dekorfolie verändert diese Ausführung. Auch ein Urlaubsaufkleber gehört nicht über das D.",
        "Prüfe vor dem Beladen das hintere Schild und seine Beleuchtung. Ein Koffer oder Fahrradträger kann die Sicht verdecken. Für einen verdeckten Kennzeichenbereich gelten eigene Anforderungen; der verlinkte Fahrradträgerartikel erklärt das Wiederholungsschild."
      ]
    },
    {
      "id": "abfahrt",
      "title": "Deine kurze Abfahrtskontrolle",
      "paragraphs": [
        "Ein gut erhaltenes, richtig montiertes Schild muss allein wegen einer EU-Reise nicht neu bestellt werden. Ist es beschädigt oder schlecht lesbar, kümmere dich vor der Abfahrt um einen ordentlichen Ersatz samt behördlicher Abstimmung."
      ],
      "items": [
        "Alle Länder auf Hin- und Rückfahrt erfassen.",
        "Vorhandenes Länderzeichen und Schildzustand prüfen.",
        "Vorgaben außerhalb der EU aktuell nachlesen.",
        "Kennzeichen nach dem Beladen auf freie Sicht prüfen.",
        "Benötigten Schildertausch mit Zeit für die Zulassungsstelle planen."
      ]
    }
  ],
  "sources": [
    {
      "label": "EU-Verordnung 2411/98: Anerkennung des Länderzeichens",
      "href": "https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:31998R2411"
    },
    {
      "label": "FZV § 12: Ausgestaltung und Sichtbarkeit",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__12.html"
    }
  ],
  "relatedGuideSlugs": [
    "kennzeichengroessen",
    "kennzeichen-beschaedigt-ersetzen"
  ],
  "relatedLinks": [
    {
      "href": "/kennzeichen-bestellen",
      "label": "Passende Ersatzschilder konfigurieren"
    },
    {
      "href": "/blog/kennzeichen-eu-feld-ueberkleben",
      "label": "Warum das Euro-Feld unverändert bleiben muss"
    },
    {
      "href": "/blog/fahrradtraeger-kennzeichen-ohne-stempel",
      "label": "Kennzeichen am Fahrradträger"
    }
  ]
},
{
  "slug": "kennzeichen-eu-feld-ueberkleben",
  "title": "Euro-Feld überkleben: Ist ein schwarzer Kennzeichen-Sticker erlaubt?",
  "description": "Das blaue Euro-Feld ist vorgeschrieben. Warum ein schwarzer Sticker keine Carbon-Ausführung ist und was du bei einem beklebten Schild tun solltest.",
  "category": "Kennzeichenwissen",
  "publishedAt": "2026-11-23",
  "intro": [
    "Ein schwarzer Streifen am linken Kennzeichenrand soll oft besser zum Auto passen. Das Euro-Feld ist jedoch kein frei gestaltbarer Teil des Schilds. Auch wenn die Buchstaben deiner Kombination sichtbar bleiben, ist eine veränderte Länderkennung ein eigenes Problem."
  ],
  "takeaway": "Das vorgeschriebene blaue Euro-Feld darfst du nicht durch eine schwarze Dekorfolie ersetzen. Carbon-Optik der angebotenen Beschriftung ist etwas anderes. Verändere weder das Länderzeichen noch amtliche Plaketten.",
  "sections": [
    {
      "id": "vorgabe",
      "title": "Die Farbe gehört zur vorgeschriebenen Ausführung",
      "paragraphs": [
        "§ 12 FZV verlangt die Ausgestaltung nach Anlage 4. Diese verweist für das Länderzeichen auf die EU-Verordnung 2411/98. Dort sind ein blauer reflektierender Hintergrund, zwölf gelbe Sterne und das Länderzeichen festgelegt.",
        "Das D ist also nicht bloß eine Dekoration. Ein schwarzer Hintergrund entspricht dieser vorgeschriebenen Gestaltung nicht. Dass eine Folie passend zugeschnitten ist oder im Zubehörhandel angeboten wird, macht sie nicht zu einer zulässigen Änderung für den Straßenverkehr."
      ]
    },
    {
      "id": "folie",
      "title": "Lesbare Buchstaben allein reichen nicht",
      "paragraphs": [
        "Die FZV untersagt zusätzlich unzulässige Abdeckungen wie Folien. Für ein ordnungsgemäßes Schild zählen außerdem Reflexion, Maße und Ausführung. Du kannst die Anforderungen nicht auf die Frage reduzieren, ob ein Mensch die Nummer noch lesen kann.",
        "Überklebe auch keine Plaketten, Ränder oder Prüfkennzeichnungen. Eine transparente Folie ist ebenfalls keine allgemeine Erlaubnis, die Schildfläche abzudecken. Für vorgesehene technische Sonderbauarten gelten eigene Anforderungen; ein selbst geklebter Sticker ist damit nicht gleichzusetzen."
      ]
    },
    {
      "id": "carbon",
      "title": "Carbon-Optik lässt das Euro-Feld bestehen",
      "paragraphs": [
        "Im Shop bezeichnet Carbon eine angebotene Oberfläche der geprägten Aluminiumschilder. Das ist keine Bestellung eines schwarzen Euro-Felds. Wähle die Ausführung im Konfigurator, statt ein vorhandenes Schild selbst mit Folie umzugestalten.",
        "Der verlinkte Materialvergleich erklärt zusätzlich den Unterschied zu 3D-Kunststoffkennzeichen. Entscheidend für deinen Kauf sind das konkrete Produkt und die passende Kennzeichenart, nicht ein besonders auffälliges Beispielbild aus sozialen Medien."
      ]
    },
    {
      "id": "vorhanden",
      "title": "Wenn schon ein Sticker auf dem Schild klebt",
      "paragraphs": [
        "Prüfe, ob die ursprüngliche Oberfläche ohne Beschädigung wiederhergestellt werden kann. Arbeite nicht mit aggressiven Lösemitteln oder scharfen Werkzeugen an der reflektierenden Fläche. Beschädigte Beschichtung und unleserliche Zeichen sind kein guter Tausch gegen einen entfernten Sticker.",
        "Ist das Schild beschädigt oder eine amtliche Plakette betroffen, stimme das weitere Vorgehen mit der Zulassungsstelle ab. Amtliche Siegel nicht abziehen und auf ein anderes Blech kleben. Bei Bedarf lässt du die bestätigte Kombination neu prägen und erledigst die amtliche Kennzeichnung separat."
      ]
    },
    {
      "id": "kauf",
      "title": "Vor dem Kauf einer anderen Optik",
      "paragraphs": [
        "Ein sauberer Wechsel beginnt mit einer passenden Produktausführung. Prüfe in der Vorschau die unveränderte Kombination und die Kennzeichenart. Für den Schildertausch am zugelassenen Auto gehört die Abstimmung der Plaketten dazu."
      ],
      "items": [
        "Euro-Feld in vorgeschriebener Gestaltung belassen.",
        "Keine Dekorfolie über die Schildfläche kleben.",
        "Bei Carbon Material und Oberfläche des Produkts lesen.",
        "Ersatz bei beschädigter Reflexion oder Plaketten abstimmen."
      ]
    }
  ],
  "sources": [
    {
      "label": "FZV § 12: Schildausführung und Abdeckungen",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__12.html"
    },
    {
      "label": "FZV Anlage 4: Euro-Feld",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/anlage_4.html"
    },
    {
      "label": "EU-Verordnung 2411/98: Farben des Länderzeichens",
      "href": "https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:31998R2411"
    }
  ],
  "relatedGuideSlugs": [
    "kennzeichen-beschaedigt-ersetzen"
  ],
  "relatedLinks": [
    {
      "href": "/carbon-kennzeichen",
      "label": "Angebotene Carbon-Ausführung ansehen"
    },
    {
      "href": "/blog/carbon-3d-kennzeichen-unterschied",
      "label": "Carbon-Optik und 3D unterscheiden"
    },
    {
      "href": "/blog/kennzeichen-ausland-d-schild",
      "label": "Länderzeichen bei Auslandsfahrten"
    }
  ]
},
{
  "slug": "motorrad-kennzeichen-winkel",
  "title": "Motorrad-Kennzeichen: Welcher Winkel ist beim Heckumbau wichtig?",
  "description": "Beim kurzen Heck zählen Neigung, Sichtbarkeit und Beleuchtung gemeinsam. So prüfst du den Kennzeichenhalter und wählst das passende Schildformat.",
  "category": "Motorrad und Montage",
  "publishedAt": "2026-11-23",
  "intro": [
    "Ein kurzer Kennzeichenhalter verändert die Optik des Motorrads. Damit das Schild richtig sitzt, reicht ein Blick von der Seite nicht aus. Der Winkel ist nur ein Teil der Anforderungen. Auch Sichtachsen, Beleuchtung und die Unterlagen zum Umbau müssen passen."
  ],
  "takeaway": "Miss die Neigung gegenüber der Senkrechten, nicht gegenüber der Straße. Für die einschlägigen L-Fahrzeuge nennt EU 44/2014 in Anhang XIV einen Bereich von −15° bis +30°. Daraus allein folgt keine Freigabe deines Heckumbaus.",
  "sections": [
    {
      "id": "grundlage",
      "title": "Zuerst Fahrzeug und Halter zuordnen",
      "paragraphs": [
        "§ 12 Absatz 6 FZV verweist für entsprechende Fahrzeuge der L-Klasse auf Anhang XIV der Verordnung (EU) Nr. 44/2014. Dort sind Anforderungen an die Anbringungsstelle des hinteren Kennzeichens geregelt.",
        "Prüfe die Genehmigung deines Motorrads und die Unterlagen des Halters. Insbesondere bei älteren Fahrzeugen, ungewöhnlichen Halterungen oder einem seitlichen Umbau sollte eine Prüfstelle die konkrete Ausführung beurteilen. Eine allgemeine Gradzahl ersetzt weder die passende Teileunterlage noch eine gegebenenfalls erforderliche Abnahme."
      ]
    },
    {
      "id": "neigung",
      "title": "Die Senkrechte ist der Bezug",
      "paragraphs": [
        "Der genannte Bereich von −15° bis +30° steht in Anhang XIV Nummer 1.5.1.3.1. Er bezieht sich auf die Senkrechte. Ein Schild, das nur 30 Grad über der Fahrbahn liegt, ist damit nicht automatisch richtig ausgerichtet.",
        "Eine grobe Messung kann einen offensichtlichen Fehler zeigen. Sie ist aber keine technische Freigabe. Prüfe die Richtung der Neigung und die vorgesehene Einbaulage anhand der Fahrzeug- und Halterunterlagen. Verstelle einen Halter nicht nur für einen Prüftermin."
      ]
    },
    {
      "id": "sicht",
      "title": "Winkel, Sicht und Licht gehören zusammen",
      "paragraphs": [
        "Ein korrekt geneigtes Schild kann trotzdem durch Reifen, Gepäck oder Teile des Hecks verdeckt sein. Die EU-Vorgaben enthalten deshalb auch Anforderungen an Höhe und geometrische Sichtbarkeit.",
        "Die Kennzeichenbeleuchtung muss zur Fahrzeugausführung passen. Nach einem Heckumbau kann die alte Leuchte anders auf das Schild treffen. Kontrolliere die gesamte Fläche und achte darauf, dass Halter, Schrauben und Kabel nicht über Beschriftung oder Plaketten laufen. Den Beleuchtungstausch erklärt der verlinkte Artikel ausführlicher."
      ]
    },
    {
      "id": "montage",
      "title": "Vor der ersten Fahrt systematisch prüfen",
      "paragraphs": [
        "Lass bei einem Umbau auch Freigängigkeit und Befestigung beurteilen. Ein Abstand im unbelasteten Stand sagt noch nicht, ob bei Bewegung genug Platz bleibt. Das Schild darf weder als Anschlag dienen noch den Reifen berühren."
      ],
      "items": [
        "Halter ausdrücklich für dein Modell und Baujahr vorgesehen?",
        "Unterlagen zu Einbau und möglicher Abnahme vorhanden?",
        "Neigung gegenüber der Senkrechten geprüft?",
        "Sichtbarkeit und Beleuchtung vollständig gegeben?",
        "Befestigung und Freigängigkeit fachlich kontrolliert?"
      ]
    },
    {
      "id": "format",
      "title": "Das passende Schild für den passenden Halter",
      "paragraphs": [
        "Der Motorradkonfigurator bietet aktuell zweizeilige Schilder in 180 × 200 mm an. Miss vor der Bestellung und kläre, ob die bestätigte Kombination auf diese Ausführung passt. Ein schmaleres Schild macht einen ungeeigneten Halter nicht automatisch zulässig.",
        "Bestelle nur die benötigte Anzahl. Für ein zugelassenes Motorrad ist das hintere Schild vorgesehen; ein zusätzlich gekauftes Ersatzblech trägt nicht automatisch die nötigen amtlichen Plaketten. Wenn du wegen eines beschädigten Schilds ersetzt, kläre deren Erneuerung vorab."
      ]
    }
  ],
  "sources": [
    {
      "label": "FZV § 12: Anbringung, Sichtbarkeit und Beleuchtung",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__12.html"
    },
    {
      "label": "EU-Verordnung 44/2014, Anhang XIV: Kennzeichen-Anbringungsstelle",
      "href": "https://eur-lex.europa.eu/legal-content/DE/ALL/?uri=celex:32014R0044"
    }
  ],
  "relatedGuideSlugs": [
    "kennzeichengroessen",
    "kennzeichen-beschaedigt-ersetzen"
  ],
  "relatedLinks": [
    {
      "href": "/motorradkennzeichen-bestellen",
      "label": "Motorradschild in 180 × 200 mm konfigurieren"
    },
    {
      "href": "/blog/kennzeichenbeleuchtung-pruefen",
      "label": "Kennzeichenbeleuchtung prüfen"
    }
  ]
},
{
  "slug": "saisonkennzeichen-hu-ausserhalb-saison",
  "title": "Saisonkennzeichen: Was gilt, wenn die HU außerhalb der Saison fällig ist?",
  "description": "Die HU fällt in die Winterpause? Erfahre, wann die Prüfung nachzuholen ist, wie du den Termin planst und wann kein neues Schild nötig ist.",
  "category": "Saison und Termine",
  "publishedAt": "2026-11-23",
  "intro": [
    "Dein Saisonfahrzeug darf von April bis Oktober fahren, die HU-Plakette zeigt aber Januar. Musst du mitten in der Pause zur Prüfstelle? Für diese Konstellation gibt es eine eigene Regel. Entscheidend ist, ob die HU tatsächlich außerhalb des Betriebszeitraums fällig wird."
  ],
  "takeaway": "Fällt die HU außerhalb der eingetragenen Saison an, lässt du sie im ersten Monat des nächsten Betriebszeitraums durchführen. Eine bereits während der Saison überfällige HU wird dadurch nicht automatisch verschoben.",
  "sections": [
    {
      "id": "regel",
      "title": "Der erste Betriebsmonat ist die Frist",
      "paragraphs": [
        "Anlage VIII Nummer 2.6 StVZO regelt den Fall ausdrücklich: Wäre die Untersuchung außerhalb des Betriebszeitraums durchzuführen, gehört sie in den ersten Monat des nächsten Betriebszeitraums.",
        "Die Regel gilt nicht einfach für jedes Fahrzeug, das im Winter wenig gefahren wird. Maßgeblich ist das zugeteilte Saisonkennzeichen. Eine normale Ganzjahreszulassung wird durch Abstellen in der Garage nicht zur Saisonzulassung."
      ]
    },
    {
      "id": "beispiele",
      "title": "Zwei Fälle im direkten Vergleich",
      "paragraphs": [
        "Beispiel 1: Saison 04–10, HU fällig im Januar. Januar liegt außerhalb der Saison. Du lässt die HU im April, dem ersten Monat des nächsten Betriebszeitraums, durchführen.",
        "Beispiel 2: Saison 04–10, HU fällig im September. September liegt innerhalb der Saison. Du kannst die Prüfung nicht mit Hinweis auf die anschließende Winterpause bis April verschieben. Ist dieser Termin bereits verpasst, kläre den weiteren Ablauf mit der Prüfstelle."
      ]
    },
    {
      "id": "fahrt",
      "title": "Ein Termin erlaubt keine Fahrt außerhalb der Saison",
      "paragraphs": [
        "§ 10 Absatz 3 FZV begrenzt den Betrieb und das Abstellen auf öffentlichen Straßen auf den eingetragenen Zeitraum. Eine Terminbestätigung der Prüfstelle hebt diese Begrenzung nicht auf.",
        "Plane die Fahrt zur HU deshalb innerhalb der Saison. Soll das Fahrzeug vorher untersucht oder repariert werden, kläre eine rechtlich passende Transportlösung. Fahre nicht allein deshalb los, weil das Ziel eine Werkstatt oder Prüfstelle ist."
      ]
    },
    {
      "id": "plan",
      "title": "So vermeidest du Engpässe zum Saisonstart",
      "paragraphs": [
        "Reserviere früh einen Termin im ersten Betriebsmonat. Prüfe vorab HU-Bericht und Fahrzeugpapiere. Nach längerer Standzeit lohnt sich zudem die Kontrolle von Reifen, Bremsen, Batterie, Beleuchtung und Kennzeichenbefestigung.",
        "Besteht ein technischer Mangel, macht die Saisonregel das Fahrzeug nicht verkehrssicher. Kläre Reparatur und Transport, bevor du eine Fahrt planst. Die zeitliche HU-Regel und der tatsächliche Fahrzeugzustand sind zwei verschiedene Fragen."
      ]
    },
    {
      "id": "schild",
      "title": "Brauchst du wegen des HU-Termins neue Schilder?",
      "paragraphs": [
        "Nein, allein wegen dieses Termins musst du weder die Saisonmonate ändern noch neue Bleche bestellen. Bei bestandener HU wird die Prüfplakette nach dem vorgesehenen Verfahren erneuert. Sie ist nicht Bestandteil einer Schilderbestellung.",
        "Möchtest du die Saison wirklich verlängern, ist das ein eigener Zulassungsvorgang. Der verlinkte Ratgeber erklärt die Änderung. Erst bei bestätigtem neuem Zeitraum oder nötigem Schilderersatz wählst du die passende Ausführung im Shop."
      ],
      "items": [
        "Saisonmonate mit dem HU-Monat vergleichen.",
        "Termin im ersten Betriebsmonat einplanen, wenn die Sonderregel greift.",
        "Keine Fahrt außerhalb der Saison aus dem HU-Termin ableiten.",
        "Schilder nur bei tatsächlichem Änderungs- oder Ersatzbedarf bestellen."
      ]
    }
  ],
  "sources": [
    {
      "label": "StVZO Anlage VIII, Nummer 2.6: HU bei Saisonkennzeichen",
      "href": "https://www.gesetze-im-internet.de/stvzo_2012/anlage_viii.html"
    },
    {
      "label": "FZV § 10 Absatz 3: Betriebszeitraum",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__10.html"
    }
  ],
  "relatedGuideSlugs": [
    "saisonkennzeichen-zeitraum-aendern",
    "auto-ohne-tuev-anmelden"
  ],
  "relatedLinks": [
    {
      "href": "/saisonkennzeichen",
      "label": "Saisonschilder für einen bestätigten Zeitraum"
    },
    {
      "href": "/blog/hu-plakette-lesen",
      "label": "HU-Plakette richtig lesen"
    }
  ]
},
{
  "slug": "07-oder-h-kennzeichen",
  "title": "07 oder H-Kennzeichen: Welche Nutzung passt zu deinem Oldtimer?",
  "description": "H-Zulassung und rotes 07-Kennzeichen erlauben unterschiedliche Fahrten. Vergleiche den Einsatzzweck, bevor du Schilder für deinen Oldtimer bestellst.",
  "category": "Oldtimer",
  "publishedAt": "2026-11-23",
  "intro": [
    "Du möchtest deinen Oldtimer gelegentlich im Alltag fahren oder nur zu Veranstaltungen bewegen? Diese Entscheidung ist wichtiger als die Farbe der Schrift. Ein rotes 07-Kennzeichen ist kein frei nutzbarer Ersatz für ein H-Kennzeichen."
  ],
  "takeaway": "Das H-Kennzeichen gehört zur Zulassung eines einzelnen Oldtimers. Das rote 07-Kennzeichen ist auf bestimmte Fahrtzwecke begrenzt. Für gewöhnliche Alltagsfahrten ist die 07-Regelung nicht gedacht.",
  "sections": [
    {
      "id": "h",
      "title": "H: Zulassung des einzelnen Fahrzeugs",
      "paragraphs": [
        "§ 10 Absatz 1 FZV regelt das Oldtimerkennzeichen mit dem Zusatz H. Anders als die rote 07-Regelung knüpft diese Vorschrift die Nutzung nicht an eine einzelne Oldtimerveranstaltung oder Reparaturfahrt.",
        "Die allgemeinen Verkehrsregeln und die Bedingungen deines Versicherungsvertrags gelten trotzdem. Manche Tarife begrenzen die Nutzung oder Fahrleistung. Kläre daher getrennt, was die Zulassung erlaubt und was du mit deinem Versicherer vereinbart hast. Die Voraussetzungen für das H-Gutachten findest du im verlinkten Fachartikel."
      ]
    },
    {
      "id": "07",
      "title": "07: Der Zweck der Fahrt zählt",
      "paragraphs": [
        "§ 43 FZV nennt Veranstaltungen zur Darstellung von Oldtimern und zur Pflege des kraftfahrzeugtechnischen Kulturguts einschließlich der An- und Abfahrt. Hinzu kommen dort genannte Probe-, Überführungs-, Reparatur- und Wartungsfahrten.",
        "Fahrten zum Tanken und zur Außenreinigung sind in der Vorschrift anlässlich der Veranstaltungsfahrt genannt. Daraus entsteht keine allgemeine Erlaubnis für beliebige Ausflüge oder die tägliche Fahrt zur Arbeit. Entscheidend ist der konkrete zulässige Zweck."
      ]
    },
    {
      "id": "unterlagen",
      "title": "Fahrzeugscheinheft und zugeordnete Fahrzeuge",
      "paragraphs": [
        "Für das rote Oldtimerkennzeichen wird ein Fahrzeugscheinheft ausgegeben. Es ist bei jeder Fahrt mitzuführen und auf Verlangen vorzuzeigen. Das Kennzeichen darf nur an einem Fahrzeug verwendet werden, für das es ausgegeben wurde.",
        "Die entsprechende Anwendung des § 41 FZV bringt weitere Voraussetzungen und Aufzeichnungspflichten mit sich. Lass dir von der zuständigen Behörde erklären, welche Nachweise und Aufzeichnungen sie für deinen Fall benötigt. Ein beliebiges historisches Fahrzeug wird nicht allein durch Anschrauben eines vorhandenen 07-Schilds erfasst."
      ]
    },
    {
      "id": "entscheidung",
      "title": "Diese Fragen helfen bei der Auswahl",
      "paragraphs": [
        "Beginne mit deinen tatsächlichen Fahrten. Schreibe für die kommende Saison einige typische Anlässe auf. So erkennst du früh, ob eine eingeschränkte Fahrtzweckregel überhaupt zu deinem Vorhaben passt."
      ],
      "items": [
        "Willst du das Auto auch für gewöhnliche Alltagswege nutzen?",
        "Geht es überwiegend um passende Oldtimerveranstaltungen?",
        "Welche konkreten Fahrzeuge sollen erfasst werden?",
        "Welche Dokumentationspflichten kannst du zuverlässig erfüllen?",
        "Passt die geplante Nutzung zum Versicherungsvertrag?"
      ]
    },
    {
      "id": "bestellung",
      "title": "Erst entscheiden, dann Schilder bestellen",
      "paragraphs": [
        "Dieser Shop bietet H-Kennzeichenschilder an, aber keine roten 07-Schilder. Die Bestellung eines H-Schilds ersetzt weder das erforderliche Gutachten noch die Zuteilung durch die Zulassungsbehörde.",
        "Wenn die H-Zulassung und die Kombination geklärt sind, wählst du die passende Schilderausführung. Achte auf den Zusatz H und die bestätigten Maße. Für eine rote 07-Lösung klärst du das Verfahren direkt mit deiner Behörde; der normale Konfigurator ist dafür nicht vorgesehen."
      ]
    }
  ],
  "sources": [
    {
      "label": "FZV § 43: rote Oldtimerkennzeichen und Fahrtzwecke",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__43.html"
    },
    {
      "label": "FZV § 10 Absatz 1: H-Kennzeichen",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__10.html"
    },
    {
      "label": "FZV § 41: entsprechend geltende Voraussetzungen",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__41.html"
    }
  ],
  "relatedGuideSlugs": [
    "auto-anmelden-unterlagen"
  ],
  "relatedLinks": [
    {
      "href": "/h-kennzeichen",
      "label": "H-Kennzeichenschilder konfigurieren"
    },
    {
      "href": "/blog/h-kennzeichen-voraussetzungen",
      "label": "Voraussetzungen für das H-Kennzeichen"
    },
    {
      "href": "/blog/h-saisonkennzeichen",
      "label": "H-Kennzeichen mit Saisonzeitraum"
    },
    {
      "href": "/blog/rote-06-kennzeichen-probefahrt",
      "label": "Rote 06-Kennzeichen bei Händlerprobefahrten"
    }
  ]
},
{
  "slug": "anhaenger-100-plakette-kennzeichen",
  "title": "Anhänger: Tempo-100-Plakette und Kennzeichen sind zwei verschiedene Dinge",
  "description": "Ein 100-Aufkleber ersetzt keine Genehmigung und kein Kennzeichen. Was für die Kombination zählt und welches Schild du im Shop bestellen kannst.",
  "category": "Anhänger",
  "publishedAt": "2026-11-23",
  "intro": [
    "Am Anhänger können sowohl ein amtliches Kennzeichenschild als auch eine runde 100-Plakette sitzen. Beide haben unterschiedliche Aufgaben. Wenn du einen Anhänger kaufst oder neu beschilderst, solltest du sie nicht gemeinsam als bloße Aufkleberauswahl behandeln."
  ],
  "takeaway": "Die Tempo-100-Regelung setzt mehr voraus als einen Aufkleber: passende Technik, die erforderlichen Nachweise und Einträge sowie eine behördlich ausgegebene, gesiegelte Plakette. Das Kennzeichenschild identifiziert den Anhänger und bleibt davon getrennt.",
  "sections": [
    {
      "id": "regel",
      "title": "Was die 100-Plakette bedeutet",
      "paragraphs": [
        "Die 9. Ausnahmeverordnung zur StVO erlaubt unter ihren Voraussetzungen Tempo 100 auf Autobahnen und Kraftfahrstraßen. Dazu gehört eine von der zuständigen Behörde ausgegebene und gesiegelte Tempo-100-Plakette an der Rückseite des Anhängers.",
        "Ein frei gekaufter Aufkleber allein erteilt diese Berechtigung nicht. Ebenso wenig gilt damit automatisch Tempo 100 auf jeder Straße oder im Ausland. Niedrigere ausgeschilderte Grenzen und eine der Situation angepasste Geschwindigkeit bleiben maßgeblich."
      ]
    },
    {
      "id": "kombination",
      "title": "Auch das Zugfahrzeug muss passen",
      "paragraphs": [
        "Prüfe die konkrete Kombination aus Auto und Anhänger. Die Verordnung berücksichtigt unter anderem das Antiblockiersystem des Zugfahrzeugs, Massenverhältnisse sowie je nach Bauart Bremsen, Schwingungsdämpfer und Stabilisierung.",
        "Ein Anhänger mit vorhandener 100-Plakette passt deshalb nicht zwangsläufig zu jedem Auto. Lass die Bedingungen anhand der Fahrzeugpapiere und der technischen Unterlagen prüfen. Eine Kennzeichenbestellung und eine pauschale Gewichtsangabe ersetzen diese Beurteilung nicht."
      ]
    },
    {
      "id": "reifen",
      "title": "Die Reifen bleiben ein laufender Prüfpunkt",
      "paragraphs": [
        "§ 3 der Ausnahmeverordnung verlangt für die jeweilige Fahrt Reifen am Anhänger, die jünger als sechs Jahre sind und mindestens die Geschwindigkeitskategorie L tragen. Entscheidend ist das eingeprägte Herstellungsdatum, nicht das Datum des letzten Reifenwechsels.",
        "Die 100-Plakette erneuert sich nicht mit dem Reifenalter. Prüfe den Zustand und die Voraussetzungen daher auch bei einem lange unverändert genutzten Gespann. Fallen Bedingungen weg, richtet sich die zulässige Geschwindigkeit wieder nach den allgemeinen Regeln."
      ]
    },
    {
      "id": "anbringen",
      "title": "Zwei Kennzeichnungen, zwei Aufgaben",
      "paragraphs": [
        "Das reguläre Anhängerkennzeichen sitzt hinten und trägt die zugeteilte Kombination. Die Tempo-100-Plakette kommt ebenfalls an die Rückseite des Anhängers, aber nicht als Überklebung der Buchstaben, Ziffern oder amtlichen Plaketten des Kennzeichens.",
        "Ist die 100-Plakette beschädigt oder fehlt ihr Siegel, frage die zuständige Stelle nach dem Ersatzverfahren. Für ein beschädigtes Kennzeichenschild ist wiederum die bestätigte Kombination und die erforderliche amtliche Kennzeichnung maßgeblich. Verwechsle die beiden Ersatzvorgänge nicht."
      ]
    },
    {
      "id": "shop",
      "title": "Was du hier bestellen kannst",
      "paragraphs": [
        "Im Shop kannst du ein angebotenes Kennzeichenschild für den Anhänger konfigurieren. Eine amtliche Tempo-100-Plakette oder die Genehmigung für Tempo 100 ist darin nicht enthalten.",
        "Prüfe vor der Schilderbestellung die zugeteilte Kombination, Schriftfarbe, Maße und Anzahl. Ob ein grünes oder schwarzes Kennzeichen richtig ist, hängt vom behördlichen Vorgang ab und nicht von der gewünschten Geschwindigkeit. Dafür gibt es den verlinkten Ratgeber."
      ],
      "items": [
        "Kombination und Unterlagen für Tempo 100 prüfen lassen.",
        "Reifenalter und Kategorie kontrollieren.",
        "Gesiegelte 100-Plakette und Kennzeichenschild unterscheiden.",
        "Nur das tatsächlich benötigte, angebotene Kennzeichenschild bestellen."
      ]
    }
  ],
  "sources": [
    {
      "label": "9. Ausnahmeverordnung zur StVO: Tempo-100-Voraussetzungen",
      "href": "https://www.gesetze-im-internet.de/stvoausnv_9/BJNR317100998.html"
    },
    {
      "label": "FZV § 12: Kennzeichen am Anhänger",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__12.html"
    }
  ],
  "relatedGuideSlugs": [
    "anhaenger-gruenes-schwarzes-kennzeichen",
    "kennzeichen-beschaedigt-ersetzen"
  ],
  "relatedLinks": [
    {
      "href": "/anhaengerkennzeichen",
      "label": "Angebotenes Anhängerkennzeichen konfigurieren"
    },
    {
      "href": "/blog/wohnwagen-eigenes-kennzeichen",
      "label": "Eigenes Kennzeichen für den Wohnwagen"
    }
  ]
},
{
  "slug": "kennzeichen-vorne-hinten-vertauschen",
  "title": "Kennzeichen vorne und hinten vertauscht: So ordnest du die Schilder richtig zu",
  "description": "Beim Pkw gehört die HU-Plakette nach hinten. So erkennst du vertauschte Schilder und klärst, ob Umsetzen genügt oder Ersatz nötig ist.",
  "category": "Montage und Alltag",
  "publishedAt": "2026-11-23",
  "intro": [
    "Nach dem Wechsel der Kennzeichenhalter fällt dir auf: Die runde HU-Plakette sitzt jetzt vorne. Obwohl auf beiden Schildern dieselbe Kombination steht, sind sie nach der amtlichen Kennzeichnung nicht beliebig austauschbar."
  ],
  "takeaway": "Bei einem normalen zugelassenen Pkw gehört das Schild mit der HU-Prüfplakette nach hinten. Sind nur die beiden intakten Schilder vertauscht, ordnest du sie richtig zu. Löse dafür keine Plaketten ab.",
  "sections": [
    {
      "id": "erkennen",
      "title": "Das hintere Schild an der HU-Plakette erkennen",
      "paragraphs": [
        "§ 29 Absatz 2 StVZO schreibt die HU-Prüfplakette auf dem hinteren amtlichen Kennzeichen vor. Die Stempelplakette der Zulassungsbehörde hat eine andere Funktion. Verwechsle diese beiden Kennzeichnungen nicht.",
        "Der hier beschriebene Fall betrifft einen gewöhnlichen zugelassenen Pkw mit zwei Schildern. Bei Motorrad, Anhänger oder besonderen Kennzeichenarten ist die Anordnung anders. Ein Fahrradträger-Wiederholungsschild ist ebenfalls kein Ersatz für das amtlich gekennzeichnete hintere Fahrzeugschild."
      ]
    },
    {
      "id": "gleich",
      "title": "Gleiche Kombination, unterschiedliche Aufgabe",
      "paragraphs": [
        "Vor der amtlichen Kennzeichnung können zwei gleich ausgeführte neue Bleche gleich aussehen. Nach dem Anbringen der Plaketten ergibt sich die Zuordnung am Fahrzeug. Die passende Nummer allein reicht nicht als Montagekontrolle.",
        "Prüfe auch das Format. Manche Fahrzeuge nutzen vorne und hinten unterschiedliche Maße. Schraube ein Schild nicht in eine unpassende Aufnahme, nur weil seine Kombination stimmt. Maß und Position müssen gemeinsam passen."
      ]
    },
    {
      "id": "umsetzen",
      "title": "Wenn wirklich nur die Schilder vertauscht sind",
      "paragraphs": [
        "Steht das Fahrzeug sicher, löse die Halter nach deren Anleitung und setze die intakten Schilder an die richtige Position. Behalte die Plaketten auf dem jeweiligen Blech. Kontrolliere anschließend den festen Sitz und die freie Sicht auf die gesamte Fläche.",
        "Hinten gehört zusätzlich die passende Kennzeichenbeleuchtung dazu. Prüfe nach dem Umsetzen, ob der Halter Teile der Beschriftung oder Plaketten verdeckt. Wenn ein Rahmen gebrochen ist, sichere das Schild mit einem passenden Halter statt einer improvisierten Abdeckung."
      ]
    },
    {
      "id": "beschaedigt",
      "title": "Wenn eine Plakette oder das Schild beschädigt ist",
      "paragraphs": [
        "Ein abgerissenes Siegel oder eine beschädigte HU-Plakette lässt sich nicht durch Vertauschen der Bleche reparieren. Kläre den Ersatz mit der zuständigen Zulassungsstelle beziehungsweise der zur Untersuchung berechtigten Stelle.",
        "Klebe amtliche Plaketten nicht selbst von einem Schild auf das andere. Auch ein ungestempeltes Ersatzblech mit identischer Kombination ist nicht automatisch für die Fahrt bereit. Bei Verlust oder Diebstahl eines Schilds gilt ein eigener Ablauf; bestelle nicht einfach stillschweigend eine Kopie."
      ]
    },
    {
      "id": "bestellen",
      "title": "Wann du überhaupt ein neues Schild brauchst",
      "paragraphs": [
        "Ein bloßer Montagefehler erfordert bei unbeschädigten, passenden Schildern normalerweise keinen Neukauf. Ein Ersatz wird sinnvoll, wenn das Blech oder seine Oberfläche tatsächlich beschädigt ist und das Verfahren geklärt wurde.",
        "Bestelle dann die bestätigte Kombination, richtige Ausführung und tatsächlich benötigte Stückzahl. Die amtlichen Plaketten sind ein separater Schritt. So vermeidest du, wegen einer vertauschten Position unnötig ein komplettes Schilderpaar zu kaufen."
      ],
      "items": [
        "HU-Plakette am hinteren Pkw-Schild?",
        "Beide Kombinationen mit den Papieren abgeglichen?",
        "Schilder fest und vollständig sichtbar?",
        "Amtliche Plaketten unverletzt?",
        "Hintere Beleuchtung funktionsfähig?"
      ]
    }
  ],
  "sources": [
    {
      "label": "StVZO § 29 Absatz 2: HU-Plakette am hinteren Kennzeichen",
      "href": "https://www.gesetze-im-internet.de/stvzo_2012/__29.html"
    },
    {
      "label": "FZV § 12: amtliche Plaketten und Anbringung",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__12.html"
    }
  ],
  "relatedGuideSlugs": [
    "kennzeichen-beschaedigt-ersetzen",
    "kennzeichen-verloren-gestohlen"
  ],
  "relatedLinks": [
    {
      "href": "/kennzeichen-bestellen",
      "label": "Bei Bedarf passende Ersatzschilder bestellen"
    },
    {
      "href": "/blog/hu-plakette-lesen",
      "label": "HU-Plakette erkennen und lesen"
    },
    {
      "href": "/blog/kennzeichenhalter-wechseln",
      "label": "Kennzeichenhalter wechseln"
    }
  ]
},
{
  "slug": "carbon-3d-kennzeichen-unterschied",
  "title": "Carbon-Optik oder 3D-Kennzeichen: Was ist der Unterschied?",
  "description": "Oberfläche und Material sind zwei verschiedene Entscheidungen. So erkennst du, welche Kennzeichenausführung du tatsächlich bestellst.",
  "category": "Kennzeichenwissen",
  "publishedAt": "2026-11-16",
  "intro": [
    "Ein Kennzeichen mit Carbonmuster sieht anders aus als die klassische schwarze Ausführung. Daraus lässt sich aber noch nicht ableiten, ob es aus Aluminium oder Kunststoff besteht. Die Begriffe Carbon und 3D beschreiben unterschiedliche Eigenschaften."
  ],
  "takeaway": "Carbon bezeichnet hier die angebotene Optik. Der Shop verkauft geprägte Aluminiumschilder mit dieser Oberfläche, keine 3D-Kunststoffkennzeichen. Prüfe Material, Format und Kennzeichenart getrennt.",
  "sections": [
    {
      "id": "begriffe",
      "title": "Optik und Aufbau auseinanderhalten",
      "paragraphs": [
        "Carbon-Optik meint ein sichtbares Muster. Sie ist kein Beleg dafür, dass das gesamte Schild aus Carbonfasern besteht. Auch aus dem Begriff 3D allein solltest du keine Material- oder Zulassungszusage ableiten.",
        "Der Hersteller 3D-Kennzeichen beschreibt seine Produkte als Kunststoffschilder mit gesonderten Lettern. Solche Kunststoffprodukte können ebenfalls eine Carbon-Optik haben. Das zeigt: Die beiden Begriffe sind keine eindeutigen Gegensätze."
      ]
    },
    {
      "id": "shop",
      "title": "Was du in diesem Shop auswählst",
      "paragraphs": [
        "Die Carbon-Ausführung im aktuellen Sortiment basiert auf einem reflektierenden Aluminiumrohling. Du wählst eine Oberflächenvariante zur passenden Kennzeichenart. Die zugeteilte Kombination bleibt unverändert.",
        "Ein Kunststoffschild mit aufgesetzten Lettern ist hier nicht angeboten. Wenn du genau dieses Material suchst, löst die Auswahl Carbon im Konfigurator deinen Wunsch nicht. Lies deshalb die Produktangaben vor der Zahlung."
      ]
    },
    {
      "id": "anforderungen",
      "title": "Die rechtlichen Anforderungen gelten weiterhin",
      "paragraphs": [
        "§ 12 FZV verlangt unter anderem die vorgeschriebene Ausgestaltung, Reflexion und das DIN-Prüf- und Überwachungszeichen mit Registernummer. Ein auffälliges Muster ersetzt diese Anforderungen nicht.",
        "Entscheidend ist das konkrete fertige Schild, nicht allein der Werbename. Verwechsle das Prüfzeichen des Produkts nicht mit der amtlichen Stempelplakette. Die behördliche Kennzeichnung ist ein eigener Schritt."
      ]
    },
    {
      "id": "folie",
      "title": "Ein bestehendes Schild nicht selbst umgestalten",
      "paragraphs": [
        "Klebe keine Carbonfolie über vorhandene Buchstaben oder die Schildfläche. Die FZV untersagt zusätzliche unzulässige Abdeckungen. Eine selbst aufgebrachte Folie ist nicht dasselbe wie eine entsprechend gefertigte Produktausführung.",
        "Wenn du die Optik ändern möchtest, kläre den Austausch und die erforderlichen Plaketten. Löse amtliche Siegel nicht zum Wiederverwenden ab. Der Ersatzratgeber hilft bei der Vorbereitung."
      ]
    },
    {
      "id": "vergleich",
      "title": "Diese Angaben vor dem Kauf vergleichen",
      "paragraphs": [
        "Prüfe zunächst das Material, danach Kennzeichenart und Maße. Vergleiche anschließend die Anzahl sowie den vollständigen Warenkorb mit Versand. Ein Preis pro Schild lässt sich nicht direkt mit einem Paketpreis vergleichen.",
        "Es gibt hier keinen belastbaren eigenen Haltbarkeits- oder Sicherheitstest zwischen den Bauarten. Wähle nach den belegten Produktangaben und deiner gewünschten Optik, nicht nach unbewiesenen Aussagen wie unzerstörbar."
      ],
      "items": [
        "Aluminium oder Kunststoff eindeutig benannt?",
        "Carbon-Optik ausdrücklich gewählt?",
        "Kombination, Zusatz und Format passend?",
        "Gesamtpreis und Lieferumfang kontrolliert?"
      ]
    }
  ],
  "sources": [
    {
      "label": "FZV § 12",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__12.html"
    },
    {
      "label": "Hersteller: Aufbau und Oberflächen von 3D-Kennzeichen",
      "href": "https://3d-kennzeichen.de/3d-magazin/matt-hochglanz-carbon-gruen-und-rot-wie-entsteht-die-optik-der-3d-kennzeichen"
    }
  ],
  "relatedGuideSlugs": [
    "kennzeichen-beschaedigt-ersetzen"
  ],
  "relatedLinks": [
    {
      "href": "/carbon-kennzeichen",
      "label": "Carbon-Optik auf Aluminiumschildern"
    },
    {
      "href": "/blog/kennzeichen-praegen-herstellung",
      "label": "So entsteht ein geprägtes Schild"
    },
    {"href": "/blog/kennzeichen-eu-feld-ueberkleben", "label": "Euro-Feld nicht mit Dekorfolie verändern"}
  ]
},
{
  "slug": "kennzeichen-o-oder-null",
  "title": "O oder 0 auf dem Kennzeichen? So liest du die Kombination",
  "description": "Buchstaben und Zahlen sicher unterscheiden und fehlerfrei in den Konfigurator übertragen – mit einem einfachen Beispiel.",
  "category": "Kennzeichenwissen",
  "publishedAt": "2026-11-16",
  "intro": [
    "Auf einem kleinen Foto sehen O und 0 schnell ähnlich aus. Vor einer Schilderbestellung solltest du deshalb nicht raten. Die Position innerhalb der Kennzeichengruppen und die amtlichen Unterlagen helfen dir beim sicheren Abgleich."
  ],
  "takeaway": "Lies Ortskürzel, Buchstabengruppe und Zahlengruppe getrennt. In der Buchstabengruppe steht O, in der Zahlengruppe kann 0 vorkommen. Übernimm die bestätigte Kombination aus den Unterlagen.",
  "sections": [
    {
      "id": "gruppen",
      "title": "Die Kombination in Gruppen zerlegen",
      "paragraphs": [
        "Ein reguläres Kennzeichen besteht aus dem Unterscheidungszeichen des Zulassungsbezirks und der Erkennungsnummer. Diese enthält die zugeteilte Buchstaben- und Zahlengruppe. Die Gruppenstruktur ist hilfreicher als ein unscharfes Foto.",
        "Beim erfundenen Lesebeispiel OL BO 100 ist das O in BO ein Buchstabe. Die beiden runden Zeichen in 100 sind Nullen. Dieses Beispiel erklärt nur das Lesen und ist keine Aussage über eine freie oder reservierbare Kombination."
      ]
    },
    {
      "id": "zeichen",
      "title": "Auch ähnliche Buchstaben nicht ausschließen",
      "paragraphs": [
        "Anlage 1 FZV erlaubt in der Erkennungsnummer grundsätzlich die Buchstaben des Alphabets außer Ä, Ö und Ü. Ein O ist deshalb nicht schon wegen seiner Ähnlichkeit zur Null ausgeschlossen. Für das Ortskürzel gelten eigene Festlegungen; dort vorkommende Umlaute sind davon zu unterscheiden.",
        "Die Zahlengruppen beginnen in den dort genannten Reihen mit 1. Eine führende Null ist keine frei wählbare Gestaltung. Ändere die Nummer nicht, um eine gewünschte optische Wirkung zu erreichen."
      ]
    },
    {
      "id": "vorlage",
      "title": "Welche Vorlage du verwenden solltest",
      "paragraphs": [
        "Nutze die bestätigte Reservierungsangabe beziehungsweise die endgültig zugeteilte Kombination. Bei einem bestehenden Fahrzeug vergleichst du zusätzlich die Fahrzeugpapiere und beide Schilder. Screenshots aus Verkaufsanzeigen sind dafür eine schwache Grundlage.",
        "Wenn Unterlagen und vorhandenes Schild voneinander abweichen, halte vor der Bestellung inne. Kläre die Abweichung mit dem zuständigen Ansprechpartner. Ein Schilderhändler darf eine amtliche Angabe nicht auf Vermutung korrigieren."
      ]
    },
    {
      "id": "eingabe",
      "title": "Die Eingabe bewusst kontrollieren",
      "paragraphs": [
        "Trage Ortskürzel, Buchstaben und Zahlen in die vorgesehenen Felder ein. Prüfe E oder H als gesonderten Zusatz der gewählten Kennzeichenart. Ein im Konfigurator automatisch ergänzter Zusatz gehört nicht noch einmal in die Grundkombination.",
        "Lies die Vorschau anschließend Zeichen für Zeichen. Bitte bei Unsicherheit eine zweite Person, unabhängig mit der Vorlage zu vergleichen. Das ist besonders hilfreich bei diktierten Nummern oder einem Wechsel zwischen Handy und Papier."
      ],
      "items": [
        "Gruppen getrennt lesen.",
        "Buchstaben und Zahlen einzeln abgleichen.",
        "Zusätze und Saisonangaben prüfen.",
        "Erst danach die Bestellung abschließen."
      ]
    },
    {
      "id": "fehler",
      "title": "Wenn die Bestellung schon abgeschickt ist",
      "paragraphs": [
        "Prüfe sofort die Bestellbestätigung gegen die amtliche Angabe. Entdeckst du einen Fehler, kontaktiere den Anbieter mit Bestellnummer und klarer Korrektur. Ob die Produktion noch geändert werden kann, hängt vom tatsächlichen Bearbeitungsstand ab.",
        "Eine technisch akzeptierte Eingabe beweist nicht, dass die Kombination für dein Fahrzeug stimmt. Der verlinkte Beitrag zu Fehlbestellungen erklärt die nächsten Schritte."
      ]
    }
  ],
  "sources": [
    {
      "label": "FZV § 9",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__9.html"
    },
    {
      "label": "FZV Anlage 1: Buchstaben- und Zahlengruppen",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/anlage_1.html"
    }
  ],
  "relatedGuideSlugs": [
    "wunschkennzeichen-reservieren"
  ],
  "relatedLinks": [
    {
      "href": "/blog/kennzeichen-falsch-bestellt",
      "label": "Fehler nach der Bestellung klären"
    },
    {
      "href": "/blog/kennzeichen-lieferung-pruefen",
      "label": "Gelieferte Kombination kontrollieren"
    }
  ]
},
{
  "slug": "kennzeichenbeleuchtung-pruefen",
  "title": "Kennzeichenbeleuchtung prüfen: Licht statt neuer Schilder?",
  "description": "Ein dunkles hinteres Kennzeichen braucht nicht automatisch ein neues Schild. So grenzt du Beleuchtung, Verschmutzung und Halterung ab.",
  "category": "Kennzeichenwissen",
  "publishedAt": "2026-11-16",
  "intro": [
    "Die Rückleuchten funktionieren, aber die Nummer am Heck bleibt dunkel. Das Problem liegt dann möglicherweise an der Kennzeichenbeleuchtung. Bevor du neue Schilder bestellst, prüfe, welcher Teil tatsächlich betroffen ist."
  ],
  "takeaway": "Das hintere Kennzeichen braucht eine vorschriftsmäßige Beleuchtung. Kontrolliere sie am sicher abgestellten Fahrzeug. Ein neues Schild behebt weder eine defekte Leuchte noch einen elektrischen Fehler.",
  "sections": [
    {
      "id": "pflicht",
      "title": "Warum das hintere Schild beleuchtet wird",
      "paragraphs": [
        "§ 12 Absatz 7 FZV regelt die Beleuchtung des hinteren Kennzeichens. Sie soll die gesamte Kombination lesbar machen. Für die Technik und den Anbau gelten die dort genannten Anforderungen; eine beliebige Lampe genügt nicht.",
        "Verwechsle Kennzeichenbeleuchtung nicht mit der Rückstrahlung des Schilds. Eine reflektierende Fläche wirft einfallendes Licht zurück. Sie ersetzt keine vorgeschriebene Beleuchtungseinrichtung."
      ]
    },
    {
      "id": "sichtcheck",
      "title": "Ein einfacher Check ohne Demontage",
      "paragraphs": [
        "Stelle das Auto sicher ab und schalte die entsprechende Fahrzeugbeleuchtung nach Bedienungsanleitung ein. Sieh von hinten nach, ob die Kennzeichenfläche vollständig beleuchtet wird. Prüfe auch auf Flackern, auffällige Dunkelstellen und einen verdeckenden Rahmen.",
        "Ein Blick bei Tageslicht auf die Leuchte allein kann täuschen. Kontrolliere die Wirkung am Schild, ohne dafür auf der Fahrbahn zu stehen. Tagfahrlicht ist nicht automatisch ein geeigneter Nachweis, dass die hintere Beleuchtung eingeschaltet ist."
      ]
    },
    {
      "id": "ursache",
      "title": "Leuchte, Fläche und Befestigung unterscheiden",
      "paragraphs": [
        "Ist die Schildfläche sauber und unbeschädigt, aber dunkel, ist ein Schildertausch meist nicht die passende erste Maßnahme. Eine Werkstatt kann Lichtquelle, Fassung, Leitung oder das jeweilige Modul prüfen.",
        "Ist Licht vorhanden, die Nummer aber verschmutzt oder teilweise verdeckt, beseitige die Ursache. Ein falsch montierter Rahmen kann die Sicht beeinträchtigen. Folge für Ausbau und Befestigung den Fahrzeug- und Halterhinweisen."
      ]
    },
    {
      "id": "ersatz",
      "title": "Beim Ersatz passende Lichttechnik verwenden",
      "paragraphs": [
        "§ 49a StVZO verlangt die für die jeweilige Bauart bestimmten Lichtquellen. Tausche daher nicht beliebig gegen ein helleres oder farbiges Zubehörteil. Entscheidend sind Eignung und die erforderlichen Genehmigungen, nicht nur ein passender Stecker.",
        "Wenn du die Freigabe oder die Montage nicht sicher beurteilen kannst, lass das Bauteil fachgerecht prüfen. Im Kennzeichenshop werden keine Ersatzleuchten angeboten; eine Schilderbestellung ersetzt diese Reparatur nicht."
      ]
    },
    {
      "id": "traeger",
      "title": "Auch den Zustand mit Träger kontrollieren",
      "paragraphs": [
        "Bei einem Heckträger können Schild und Leuchten verdeckt werden. Prüfe deshalb nach dem Anbau erneut die Sichtbarkeit und die vorgesehene Beleuchtung des Trägers. Der Zustand ohne Ladung ist nicht automatisch der Zustand mit Fahrrädern.",
        "Ist das Schild selbst dauerhaft beschädigt, führt der Weg zum Ersatzratgeber. Trenne dabei die neue Prägung von Beleuchtungsreparatur und amtlichen Plaketten."
      ]
    }
  ],
  "sources": [
    {
      "label": "FZV § 12",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__12.html"
    },
    {
      "label": "StVZO § 49a: Lichttechnische Einrichtungen",
      "href": "https://www.gesetze-im-internet.de/stvzo_2012/__49a.html"
    }
  ],
  "relatedGuideSlugs": [
    "kennzeichen-beschaedigt-ersetzen"
  ],
  "relatedLinks": [
    {
      "href": "/blog/kennzeichenhalter-wechseln",
      "label": "Kennzeichenhalter richtig wechseln"
    },
    {
      "href": "/blog/fahrradtraeger-kennzeichen-ohne-stempel",
      "label": "Wiederholungskennzeichen am Fahrradträger"
    },
    {"href": "/blog/motorrad-kennzeichen-winkel", "label": "Motorrad: Winkel und Sichtbarkeit nach dem Heckumbau"}
  ]
},
{
  "slug": "auto-verkaufen-kennzeichen-uebergeben",
  "title": "Auto verkaufen: Kennzeichen mitgeben oder vorher abmelden?",
  "description": "Die Kennzeichenübergabe beim Privatverkauf planen: Zulassungsstatus, Verkaufsmeldung und die nächsten Schritte des Käufers.",
  "category": "Kennzeichenwissen",
  "publishedAt": "2026-11-16",
  "intro": [
    "Der Käufer möchte das Auto nach der Besichtigung direkt mitnehmen. Vor der Schlüsselübergabe solltest du klären, ob das Fahrzeug zugelassen bleibt oder vorher abgemeldet wird. Diese Entscheidung betrifft mehr als die Frage, wer die beiden Schilder bekommt."
  ],
  "takeaway": "Dokumentiere Zulassungsstatus und Übergabe genau. Melde einen Halterwechsel unverzüglich, soweit die gesetzliche Ausnahme nicht greift. Ein Kaufvertrag allein meldet das Fahrzeug nicht automatisch um.",
  "sections": [
    {
      "id": "status",
      "title": "Die Übergabevariante vorab vereinbaren",
      "paragraphs": [
        "Ein noch zugelassenes Auto kann andere organisatorische Schritte erfordern als ein bereits abgemeldetes Fahrzeug. Wenn du vorher abmeldest, muss der Käufer eine rechtmäßige Abholung oder spätere Zulassung organisieren. Alte Bleche am Fahrzeug erlauben dann keine gewöhnliche Heimfahrt.",
        "Wenn das Fahrzeug zugelassen übergeben wird, kläre den Versicherungsschutz und den zeitnahen Halterwechsel. Verlasse dich nicht allein auf die mündliche Zusage, irgendwann nächste Woche zur Zulassungsstelle zu gehen."
      ]
    },
    {
      "id": "protokoll",
      "title": "Die Übergabe nachvollziehbar festhalten",
      "paragraphs": [
        "Notiere Datum und Uhrzeit, Fahrzeug-Identifizierungsnummer, Kennzeichen und die übergebenen Dokumente. Gleiche die Käuferdaten mit einem geeigneten Identitätsnachweis ab und lasse den Empfang der Papiere bestätigen. Bewahre deine Vertragsausfertigung auf.",
        "Damit hast du die Angaben für die Verkaufsmeldung griffbereit. Ein Foto der Kennzeichen allein dokumentiert weder den Erwerber noch die Übergabe der Zulassungsbescheinigungen."
      ],
      "items": [
        "Zulassungsstatus schriftlich festhalten.",
        "Käufername und vollständige Anschrift prüfen.",
        "Zeitpunkt der Übergabe dokumentieren.",
        "Empfang von Papieren, Schlüsseln und Schildern bestätigen."
      ]
    },
    {
      "id": "meldung",
      "title": "Behörde und Versicherung gesondert informieren",
      "paragraphs": [
        "§ 15 Absatz 5 FZV regelt die Mitteilung des Halterwechsels. Sie enthält unter anderem Kennzeichen, Erwerberdaten und die Bestätigung der Dokumentenübergabe. Die Mitteilung ist entbehrlich, wenn der Erwerber seine dort genannten Pflichten bereits erfüllt hat.",
        "Das Berliner Serviceportal weist außerdem auf die gesonderte Meldung an die Versicherung hin. Der Verkauf selbst beendet nicht automatisch alle laufenden Pflichten. Prüfe den tatsächlichen Abschluss der Ummeldung oder Außerbetriebsetzung."
      ]
    },
    {
      "id": "kaeufer",
      "title": "Braucht der Käufer neue Schilder?",
      "paragraphs": [
        "Wenn die vorhandene Kombination im zulässigen Verfahren weitergeführt wird und die Schilder in Ordnung sind, ist nicht allein wegen des Verkaufs ein Neukauf nötig. Wählt der Käufer eine neue Kombination, müssen die Schilder dazu passen.",
        "Eine Behauptung wie Kennzeichen bleiben immer am Auto wäre zu pauschal. Entscheidend sind Zulassungsstatus, gewählter Vorgang und die amtliche Entscheidung. Der Ummelderatgeber erklärt die Kennzeichenmitnahme genauer."
      ]
    },
    {
      "id": "wunsch",
      "title": "Wenn du deine Kombination behalten möchtest",
      "paragraphs": [
        "Sprich eine gewünschte spätere Nutzung deiner Nummer vor der Übergabe mit der Zulassungsstelle ab. Eine private Vereinbarung mit dem Käufer ersetzt keine amtliche Reservierung. Auch das Abmontieren und Aufbewahren der Schilder reserviert die Kombination nicht.",
        "Für dein nächstes Auto bestellst du erst mit geklärter Zuteilung. So vermeidest du, dieselbe Wunschkombination auf Verdacht für zwei verschiedene Fahrzeuge einzuplanen."
      ]
    }
  ],
  "sources": [
    {
      "label": "FZV § 15",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__15.html"
    },
    {
      "label": "Berlin: Fahrzeugverkauf melden",
      "href": "https://service.berlin.de/dienstleistung/120900/"
    }
  ],
  "relatedGuideSlugs": [
    "auto-ummelden-kennzeichen-behalten",
    "wunschkennzeichen-reservieren"
  ],
  "relatedLinks": [
    {
      "href": "/blog/kennzeichen-entsiegeln-online-abmeldung",
      "label": "Online-Abmeldung vorbereiten"
    },
    {
      "href": "/ratgeber/kennzeichen-fahrzeugwechsel-uebernehmen",
      "label": "Bisherige Kombination für das Folgefahrzeug klären"
    },
    {
      "href": "/ratgeber/auto-geerbt-ummelden",
      "label": "Geerbtes Auto ummelden oder verkaufen"
    }
  ]
},
{
  "slug": "umweltplakette-kennzeichenwechsel",
  "title": "Neue Kennzeichen: Muss die Umweltplakette auch neu?",
  "description": "Wann eine neue Kombination oder Windschutzscheibe eine neue Umweltplakette erfordert – und wann ein Schildtausch allein nichts ändert.",
  "category": "Kennzeichenwissen",
  "publishedAt": "2026-11-16",
  "intro": [
    "Die neue Nummer ist montiert, auf der Windschutzscheibe steht aber noch die alte Kombination. Diesen kleinen Eintrag solltest du bei einer Umkennzeichnung nicht übersehen. Die Umweltplakette wird für das jeweilige Fahrzeug mit seiner Kennzeichenangabe ausgestellt."
  ],
  "takeaway": "Wenn du eine Umweltplakette benötigst und sich die Kennzeichenkombination ändert, muss die Plakette die neue Angabe tragen. Ein bloßer Austausch beschädigter Bleche bei gleicher Kombination ist davon zu unterscheiden.",
  "sections": [
    {
      "id": "neue-nummer",
      "title": "Bei neuer Kombination den Eintrag erneuern lassen",
      "paragraphs": [
        "§ 3 der 35. BImSchV sieht vor, dass die Ausgabestelle das Kennzeichen in die Plakette einträgt. Die Berliner Umweltinformationen nennen eine geänderte Kombination ausdrücklich als Grund für eine neue Plakette.",
        "Das betrifft beispielsweise eine freiwillige Umkennzeichnung oder einen Halterwechsel mit neuer Nummer. Eine passende Farbe allein genügt nicht, wenn im Schriftfeld noch das alte Kennzeichen steht."
      ]
    },
    {
      "id": "gleich",
      "title": "Gleiche Kombination bedeutet einen anderen Fall",
      "paragraphs": [
        "Wird ein beschädigtes Schild mit identischer zugeteilter Kombination ersetzt, ändert sich der Eintrag auf der Umweltplakette dadurch nicht. Auch ein reiner Halter- oder Anschriftenwechsel ist von einer neuen Nummer zu unterscheiden.",
        "Prüfe trotzdem, ob die vorhandene Plakette lesbar und unbeschädigt ist. Eine verblasste Kennzeichenangabe kann einen Austausch erforderlich machen. Das Alter allein bedeutet dagegen kein festes allgemeines Ablaufdatum."
      ]
    },
    {
      "id": "scheibe",
      "title": "Nach einem Scheibentausch nicht umkleben",
      "paragraphs": [
        "Die Verordnung verlangt eine nicht wiederverwendbare Plakette, die sich beim Ablösen zerstört. Übertrage sie deshalb nicht von der alten auf die neue Windschutzscheibe. Kläre beim Scheibentausch die Neuausstellung.",
        "Schreibe eine alte Nummer nicht selbst um und überklebe das Schriftfeld nicht. Die passende Ausgabestelle prüft die erforderlichen Fahrzeugangaben und stellt die neue Plakette aus."
      ]
    },
    {
      "id": "bedarf",
      "title": "Zuerst prüfen, ob du überhaupt eine brauchst",
      "paragraphs": [
        "Die Pflicht hängt von der jeweiligen Umweltzone und möglichen Ausnahmen ab. Für entsprechend gekennzeichnete Elektrofahrzeuge enthält die aktuell geprüfte Regelung eine Ausnahme. Diese behandeln wir im verlinkten E-Kennzeichen-Beitrag.",
        "Eine solche Ausnahme ist kein allgemeines Recht auf Einfahrt in jede gesperrte Straße. Parkregeln, Zufahrtsbeschränkungen und andere Verkehrszeichen bleiben gesondert zu beachten."
      ]
    },
    {
      "id": "bestellung",
      "title": "Die richtige Reihenfolge beim Wechsel",
      "paragraphs": [
        "Kläre zuerst die neue amtliche Kombination. Bestelle danach die passenden Schilder und organisiere bei Bedarf die Umweltplakette mit genau dieser Angabe. Halte die geforderten Fahrzeugnachweise bereit.",
        "Eine normale Schilderlieferung enthält nicht automatisch eine Umweltplakette. Wenn du im Warenkorb ein entsprechendes Zusatzprodukt auswählst, prüfe den Lieferumfang ausdrücklich. Behördliche Stempel und HU-Plakette sind wiederum andere Kennzeichnungen."
      ],
      "items": [
        "Neue Kombination endgültig geklärt?",
        "Umweltplakette tatsächlich erforderlich?",
        "Eintrag stimmt Zeichen für Zeichen?",
        "Alte Plakette nicht selbst geändert oder wiederverwendet?"
      ]
    }
  ],
  "sources": [
    {
      "label": "35. BImSchV § 3: Kennzeichnung",
      "href": "https://www.gesetze-im-internet.de/bimschv_35/__3.html"
    },
    {
      "label": "Berlin: Fahrzeug und Umweltplakette",
      "href": "https://www.berlin.de/sen/uvk/umwelt/luft/luftreinhaltung/umweltzone/fahrzeug-plakette/"
    }
  ],
  "relatedGuideSlugs": [
    "kennzeichen-freiwillig-aendern",
    "kennzeichen-beschaedigt-ersetzen"
  ],
  "relatedLinks": [
    {
      "href": "/blog/elektroauto-umweltplakette",
      "label": "Ausnahme bei E-Kennzeichen"
    },
    {
      "href": "/kennzeichen-bestellen",
      "label": "Schilder für die bestätigte Kombination"
    },
    {
      "href": "/blog/umweltplakette-4-euro-6",
      "label": "Warum die grüne Plakette trotz Euro 6 eine 4 zeigt"
    }
  ]
},
{
  "slug": "motorrad-versicherungskennzeichen-unterschied",
  "title": "Motorrad- oder Versicherungskennzeichen: Welches brauchst du?",
  "description": "Motorrad, Leichtkraftrad und Kleinkraftrad unterscheiden – damit du das richtige Verfahren und passende Schilder wählst.",
  "category": "Kennzeichenwissen",
  "publishedAt": "2026-11-16",
  "intro": [
    "Zwei Fahrzeuge sehen ähnlich aus, brauchen aber unterschiedliche Kennzeichen. Das gilt besonders bei Rollern und kleinen Motorrädern. Entscheidend ist die Fahrzeugklasse in den Unterlagen, nicht allein die Optik oder der Verkaufsname."
  ],
  "takeaway": "Prüfe zuerst die Fahrzeugklasse. Leichtkrafträder benötigen trotz ihrer besonderen Zulassungsregelung ein amtliches Kennzeichen. Versicherungskennzeichen für entsprechende Kleinkrafträder erhältst du im Versicherungsverfahren, nicht als frei geprägtes Motorradschild.",
  "sections": [
    {
      "id": "klasse",
      "title": "Mit den Fahrzeugunterlagen beginnen",
      "paragraphs": [
        "Lies Betriebserlaubnis, CoC oder vorhandene Zulassungsunterlagen. Die Einordnung als Kraftrad, Leichtkraftrad oder Kleinkraftrad bestimmt den weiteren Weg. Eine Beschreibung wie kleiner Roller reicht dafür nicht.",
        "Bei Umbauten oder unklaren Papieren lasse die Einstufung vor dem Kauf eines Schilds klären. Verlasse dich nicht auf das Kennzeichen eines ähnlich aussehenden Nachbarfahrzeugs."
      ]
    },
    {
      "id": "motorrad",
      "title": "Reguläres Motorrad: amtliche Zuteilung und Schild",
      "paragraphs": [
        "Bei einem zulassungspflichtigen Motorrad gehören Versicherung, Zulassung und die zugeteilte Kombination zusammen. Das physische Schild lässt du anschließend in der passenden Ausführung anfertigen. Die amtliche Stempelung ist davon getrennt.",
        "Prüfe das erforderliche Format und die Zeichenlänge. Im aktuellen Shop ist das Motorradformat 180 × 200 mm vorgesehen. Dass die Kombination im Formular akzeptiert wird, ersetzt keine behördliche Entscheidung zum konkreten Fahrzeug."
      ]
    },
    {
      "id": "leichtkraftrad",
      "title": "Leichtkraftrad heißt nicht ohne amtliches Kennzeichen",
      "paragraphs": [
        "Die FZV nimmt Leichtkrafträder von der regulären Zulassungspflicht aus. § 4 verlangt für diese Fahrzeuggruppe dennoch ein amtliches Kennzeichen. Zulassungsfrei ist deshalb kein Synonym für Versicherungskennzeichen.",
        "Kläre mit der Behörde die Kennzeichenzuteilung und Schildform. Bestelle nicht automatisch das angebotene Motorradformat, wenn für dein Leichtkraftrad eine andere Ausführung vorgesehen ist. Der Größenratgeber hilft beim Abgleich."
      ]
    },
    {
      "id": "versicherung",
      "title": "Kleinkraftrad: das Versicherungskennzeichen ist ein Nachweis",
      "paragraphs": [
        "Für die in § 4 Absatz 3 FZV genannten Fahrzeuge dient das Versicherungskennzeichen als Nachweis der Haftpflichtversicherung. Nach § 52 wird es im vorgesehenen Versicherungsverfahren ausgegeben und gilt für das jeweilige Verkehrsjahr.",
        "Dieses Verkehrsjahr läuft vom 1. März bis Ende Februar des Folgejahres. Ein nachgemachtes Schild mit alten Zeichen verlängert keinen Versicherungsschutz. Prüfe beim Versicherer den tatsächlichen Vertrag und die Gültigkeit."
      ]
    },
    {
      "id": "kaufen",
      "title": "Was der Shop anbietet und was nicht",
      "paragraphs": [
        "Hier kannst du passende geprägte Motorradkennzeichenschilder für eine geklärte amtliche Kombination bestellen. Versicherungskennzeichen oder Versicherungsverträge sind nicht Teil dieses Angebots.",
        "Wähle erst nach der Einordnung das Produkt. Das verhindert einen teuren Umweg über ein Schild, das zwar an die Halterung passt, aber nicht zum vorgeschriebenen Verfahren gehört."
      ],
      "items": [
        "Fahrzeugklasse aus Originalunterlagen bestimmen.",
        "Amtliche Zuteilung oder Versicherungsverfahren klären.",
        "Passendes Format bestätigen lassen.",
        "Nur die tatsächlich benötigte Schildart bestellen."
      ]
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
      "label": "FZV § 52",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__52.html"
    }
  ],
  "relatedGuideSlugs": [
    "kennzeichengroessen",
    "auto-anmelden-unterlagen"
  ],
  "relatedLinks": [
    {
      "href": "/motorradkennzeichen-bestellen",
      "label": "Motorradschilder im angebotenen Format"
    }
  ]
},
{
  "slug": "namensaenderung-fahrzeugpapiere-kennzeichen",
  "title": "Namensänderung: Brauchst du neue Kennzeichen?",
  "description": "Nach Heirat oder anderer Namensänderung die Fahrzeugpapiere berichtigen – und einen freiwilligen Nummernwechsel davon trennen.",
  "category": "Kennzeichenwissen",
  "publishedAt": "2026-11-16",
  "intro": [
    "Dein Nachname hat sich geändert, etwa nach einer Heirat. Die Initialen auf dem Kennzeichen passen vielleicht nicht mehr. Daraus folgt aber nicht automatisch, dass du neue Schilder brauchst. Pflicht zur Datenänderung und Wunsch nach einer neuen Kombination sind zwei verschiedene Dinge."
  ],
  "takeaway": "Melde die Namensänderung der Zulassungsbehörde und lasse die Fahrzeugpapiere berichtigen. Die bestehende Kombination muss nicht allein wegen eines neuen Namens ersetzt werden. Andere Initialen beantragst du gesondert.",
  "sections": [
    {
      "id": "melden",
      "title": "Die Halterdaten zeitnah berichtigen",
      "paragraphs": [
        "§ 15 FZV regelt die unverzügliche Mitteilung bestimmter Halterdatenänderungen. Warte deshalb nicht auf einen späteren Fahrzeugverkauf, um einen geänderten Namen in den Unterlagen korrigieren zu lassen.",
        "Suche auf dem offiziellen Behördenportal nach Namensänderung in Fahrzeugpapieren. Ein Eintrag beim Einwohnermeldeamt bedeutet nicht, dass jeder weitere Vorgang bereits erledigt ist. Prüfe den konkreten Ablauf deiner Zulassungsstelle."
      ]
    },
    {
      "id": "unterlagen",
      "title": "Die passende Unterlagenliste nutzen",
      "paragraphs": [
        "Berlin nennt für diesen Vorgang unter anderem Teil I und Teil II der Zulassungsbescheinigung sowie einen Identitätsnachweis. Bei Vertretung kommen die dort geforderten Vollmachts- und Ausweisdokumente hinzu.",
        "Welche Nachweise zur Namensänderung in deinem Fall erforderlich sind, klärst du örtlich. Verwende Originale beziehungsweise die ausdrücklich akzeptierte Form. Eine allgemeine Checkliste für einen Umzug passt nicht automatisch zu einer Namensänderung."
      ]
    },
    {
      "id": "leasing",
      "title": "Bei verwahrtem Fahrzeugbrief früh abstimmen",
      "paragraphs": [
        "Liegt Teil II bei einer Bank oder Leasinggesellschaft, frage rechtzeitig nach dem vorgesehenen Verfahren. Plane den Termin erst, wenn die benötigten Dokumente verfügbar gemacht werden können.",
        "Bleibt dieselbe Person Halter, ist die reine Namensänderung von einem Wechsel auf eine andere Person zu unterscheiden. Wenn das Fahrzeug zugleich auf den Ehepartner übergehen soll, beschreibe der Behörde beide Änderungen, statt nur einen neuen Namen einzutragen."
      ]
    },
    {
      "id": "initialen",
      "title": "Neue Initialen sind eine freiwillige Entscheidung",
      "paragraphs": [
        "Du kannst die vorhandene Kombination weiter nutzen, wenn nur der Name geändert wird und kein anderer Anlass für einen Wechsel besteht. Persönliche Initialen sind keine vorgeschriebene Übereinstimmung zwischen Nummer und Haltername.",
        "Möchtest du trotzdem andere Buchstaben, prüfe eine freiwillige Umkennzeichnung. Dabei müssen Verfügbarkeit und Zuteilung der neuen Kombination geklärt werden. Erst danach ist der Kauf neuer Schilder sinnvoll."
      ]
    },
    {
      "id": "abgleich",
      "title": "Nach Abschluss die Folgedaten vergleichen",
      "paragraphs": [
        "Kontrolliere den Namen in den berichtigten Papieren und gleiche ihn mit Versicherungs- und Vertragsdaten ab. Bei einer zusätzlichen Kennzeichenänderung kommen kennzeichenbezogene Dienste und gegebenenfalls die Umweltplakette hinzu.",
        "Bestelle keine neuen Bleche nur zur Berichtigung eines Namens, der auf dem Schild gar nicht steht. Der verlinkte Ratgeber zur freiwilligen Änderung ist für den gesonderten Wunsch nach einer neuen Nummer gedacht."
      ]
    }
  ],
  "sources": [
    {
      "label": "FZV § 15",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__15.html"
    },
    {
      "label": "Berlin: Namensänderung in Fahrzeugpapieren",
      "href": "https://service.berlin.de/dienstleistung/324173/"
    }
  ],
  "relatedGuideSlugs": [
    "kennzeichen-freiwillig-aendern",
    "auto-anmelden-vollmacht"
  ],
  "relatedLinks": [
    {
      "href": "/blog/leasing-wunschkennzeichen",
      "label": "Abstimmung bei Leasingfahrzeugen"
    }
  ]
},
{
  "slug": "wunschkennzeichen-nicht-verfuegbar",
  "title": "Wunschkennzeichen nicht verfügbar: Was steckt dahinter?",
  "description": "Vergeben, örtlich gesperrt oder für das Format ungeeignet? So prüfst du eine abgelehnte Wunschkombination vor der Schilderbestellung.",
  "category": "Kennzeichenwissen",
  "publishedAt": "2026-11-16",
  "intro": [
    "Deine Wunschkombination erscheint im Reservierungsportal nicht. Das bedeutet nicht immer, dass jemand anderes genau diese Nummer fährt. Auch örtliche Vergaberegeln, reservierte Bereiche oder die benötigte Schildart können eine Rolle spielen."
  ],
  "takeaway": "Prüfe die Meldung im offiziellen Portal und frage bei unklarem Ergebnis die Behörde. Eine Schildervorschau ist keine Verfügbarkeitsprüfung. Bestelle die Kombination erst, wenn ihre Verwendung für deinen Vorgang geklärt ist.",
  "sections": [
    {
      "id": "belegt",
      "title": "Vergeben und reserviert sind verschiedene Zustände",
      "paragraphs": [
        "Eine Kombination kann bereits zugeteilt oder für einen anderen Vorgang reserviert sein. Aus einem nicht verfügbaren Ergebnis lässt sich ohne weitere Auskunft nicht erkennen, welcher Grund tatsächlich vorliegt.",
        "Plane deshalb keine Bestellung auf Grundlage der Hoffnung, dass eine Nummer bald frei wird. Auch alte Schilder aus einer früheren Zulassung beweisen keine aktuelle Verfügbarkeit."
      ]
    },
    {
      "id": "regeln",
      "title": "Es gibt keine verlässliche bundesweite Internet-Sperrliste",
      "paragraphs": [
        "§ 9 FZV schließt Kombinationen aus, die gegen die guten Sitten verstoßen. Die konkrete Vergabepraxis kann darüber hinaus örtliche Einschränkungen enthalten. Prüfe die Angaben deiner zuständigen Behörde.",
        "Berlin nennt beispielsweise mehrere generell nicht verfügbare Buchstabenserien und eigene Regeln für kurze Kombinationen. Das ist ein lokales Beispiel. Eine Liste aus einem anderen Bundesland ist keine verbindliche Zusage für deinen Wohnort."
      ]
    },
    {
      "id": "format",
      "title": "Nicht jede Kombination passt zu jeder Schildart",
      "paragraphs": [
        "Eine gewünschte Zeichenfolge kann für ein bestimmtes Format zu lang sein. E, H oder Saisonangaben benötigen zusätzlichen Platz. Sehr kurze Kombinationen können wiederum einer besonderen Vergabepraxis unterliegen.",
        "Kläre deshalb Kennzeichenart und Format zusammen mit der Kombination. Ein kleiner Halter am Fahrzeug begründet nicht automatisch einen Anspruch auf eine besonders kurze Nummer. Der Größenratgeber erklärt den Unterschied zwischen Befestigungsfläche und zulässigem Schild."
      ]
    },
    {
      "id": "alternativen",
      "title": "Eine Alternative systematisch vorbereiten",
      "paragraphs": [
        "Notiere zwei oder drei Varianten, die dir ebenfalls gefallen. Ändere bewusst einen Teil, statt wahllos viele Reservierungen anzulegen. Prüfe jeweils die passende Person, den Zulassungsbezirk und den vorgesehenen Fahrzeugtyp.",
        "Achte auf örtliche Reservierungsdauer und Bedingungen. Eine bereits abgelaufene Bestätigung solltest du erneut klären, bevor du personalisierte Schilder kaufst. Aus einem Shop-Warenkorb entsteht keine Reservierung."
      ],
      "items": [
        "Meldung und zuständige Behörde prüfen.",
        "Kennzeichenart und Format festlegen.",
        "Wenige sinnvolle Alternativen auswählen.",
        "Gültigen amtlichen Nachweis abwarten."
      ]
    },
    {
      "id": "bestellen",
      "title": "Erst die bestätigte Variante prägen lassen",
      "paragraphs": [
        "Übertrage die bestätigten Zeichen genau in den Konfigurator. Prüfe Zusatz und Maße separat. Die technische Eingabeprüfung im Shop prüft nicht, ob die Behörde diese Nummer gerade vergeben darf.",
        "Wenn du eine bestehende Fahrzeugnummer freiwillig ändern möchtest, reicht auch eine neue Reservierung allein nicht. Der verlinkte Umkennzeichnungsratgeber führt durch den anschließenden behördlichen Wechsel."
      ]
    }
  ],
  "sources": [
    {
      "label": "FZV § 9",
      "href": "https://www.gesetze-im-internet.de/fzv_2023/__9.html"
    },
    {
      "label": "Berlin: Bedingungen der Wunschkennzeichenreservierung",
      "href": "https://service.berlin.de/dienstleistung/121484/"
    }
  ],
  "relatedGuideSlugs": [
    "wunschkennzeichen-reservieren",
    "kennzeichengroessen",
    "kennzeichen-freiwillig-aendern"
  ],
  "relatedLinks": [
    {
      "href": "/blog/kennzeichen-o-oder-null",
      "label": "O und Null sicher unterscheiden"
    }
  ]
},
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
    },
    {
      "href": "/blog/auslaendisches-elektroauto-e-plakette",
      "label": "Kennzeichnung ausländischer Elektroautos"
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
    },
    {"href": "/blog/07-oder-h-kennzeichen", "label": "H und rote 07 nach dem Fahrtzweck vergleichen"}
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
    },
    {
      "href": "/blog/saisonkennzeichen-hu-ausserhalb-saison",
      "label": "HU-Termin außerhalb der Saison"
    },
    {
      "href": "/blog/kennzeichen-vorne-hinten-vertauschen",
      "label": "Vertauschte Schilder richtig zuordnen"
    },
    {
      "href": "/blog/hu-bericht-verloren-zweitschrift",
      "label": "Fehlenden HU-Bericht ersetzen"
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
    },
    {
      "href": "/blog/abgemeldetes-auto-abstellen",
      "label": "Stellplatz vor der Abmeldung vorbereiten"
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
    },
    {
      "href": "/ratgeber/fahrzeugbrief-bank-zulassung",
      "label": "Fahrzeugbrief bei der Bank: Dokumentenweg organisieren"
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
    },
    {
      "href": "/blog/kennzeichen-diebstahlschutz",
      "label": "Befestigung und Diebstahlschutz"
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
    },
    {
      "href": "/blog/kennzeichen-magnethalter",
      "label": "Magnethalter vor der Montage prüfen"
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
      },
    {"href": "/ratgeber/kennzeichen-fahrzeugwechsel-uebernehmen", "label": "Alte Kombination für ein neues Auto übernehmen"}
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
    },
    {
      "href": "/blog/ladung-verdeckt-kennzeichen",
      "label": "Kennzeichen bei sonstiger Ladung frei halten"
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
      {"href": "/blog/kennzeichen-o-oder-null", "label": "O oder Null: Eingabe sicher prüfen"},
      {
        "href": "/blog/kennzeichen-lieferung-pruefen",
        "label": "Checkliste für gelieferte Kennzeichen"
      },
      {
        "href": "/impressum",
        "label": "Kontakt zum Anbieter"
      },
    {"href": "/blog/evb-nummer-kennzeichenbestellung", "label": "eVB und Kennzeichenkombination unterscheiden"}
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
      "href": "/blog/carbon-3d-kennzeichen-unterschied",
      "label": "Carbon und 3D unterscheiden"
    },
    {
      "href": "/din-74069",
      "label": "Informationen zur Kennzeichenausführung"
    },
    {
      "href": "/blog/kennzeichen-falsch-bestellt",
      "label": "Was bei einer falschen Bestellung zu tun ist"
    },
    {
      "href": "/blog/kennzeichen-fe-schrift",
      "label": "FE-Schrift: vorgeschriebene Zeichenform"
    },
    {
      "href": "/blog/kennzeichen-engschrift-kurzes-schild",
      "label": "Engschrift und begrenzter Platz"
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
