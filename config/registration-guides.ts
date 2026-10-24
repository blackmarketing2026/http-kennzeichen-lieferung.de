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
