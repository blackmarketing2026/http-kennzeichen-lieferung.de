# Kennzeichen-Dropshipping API integrieren

## Ziel

Erweitere das bestehende Shop-Projekt um die serverseitige Bestellung von geprägten Kennzeichen über die Kennzeichen-Services-Dropshipping-API.

Die Stripe-Anbindung ist bereits vorhanden. Nach einer serverseitig bestätigten erfolgreichen Zahlung soll genau eine Bestellung an den Kennzeichenhersteller übertragen werden. Versandstatus und Tracking sollen anschließend über Webhooks verarbeitet werden.

In diesem Arbeitsschritt geht es ausschließlich um das Prägen und Versenden von Kennzeichen. Die Verfügbarkeitsprüfung und Reservierung von Wunschkennzeichen gehören nicht zum Umfang.

## Verbindliche Quelldateien

Im Projekt müssen diese Dateien als technische Datenbasis verwendet werden:

- `openApi.yml`: OpenAPI-3.0.3-Spezifikation der Dropshipping-API, Version 2.2.0
- `Produktkatalog.csv`: Produktvarianten, Produkt-IDs, SKUs, Zeichenbegrenzungen, Einkaufspreise und Versandkosten

Lies beide Dateien vollständig, bevor du Änderungen am Projekt vornimmst. Erfinde keine Endpunkte, Produkt-IDs, Request-Felder oder Statuswerte.

## Vorgehen vor der Implementierung

1. Analysiere zunächst die vorhandene Projektstruktur und ermittle:
   - verwendetes Framework und Backend
   - bestehende Stripe-Checkout- und Stripe-Webhook-Logik
   - vorhandenes Bestell- oder Datenbankmodell
   - vorhandene Umgebungsvariablen
   - aktuelle Produkt- und Kennzeichenauswahl im Frontend
   - bestehende Fehlerprotokollierung
2. Fasse kurz zusammen, welche vorhandenen Dateien angepasst werden müssen.
3. Nutze die bestehende Architektur und den vorhandenen Programmierstil.
4. Führe keine vollständige Neuentwicklung des Shops durch.
5. Implementiere anschließend die API-Anbindung inklusive Tests.

## API-Konfiguration

API-Version: `2.2.0` (DEV und LIVE)

| Umgebung | Client-ID | API-Host | Portal |
|---|---|---|---|
| DEV (lokal) | `105` | `api.kennzeichen.dev` | kennzeichen.dev |
| LIVE (Vercel Production, seit 24.09.2026) | `26` | `api.kennzeichen.link` (von Jens zu bestätigen) | https://dev.kennzeichen.link |

Für LIVE wurde im Portal unter `/users` ein eigener API-User angelegt. Login-String und Passwort stehen ausschließlich in den Vercel-Production-Variablen.

DEV-Basis-URL:

```text
https://api.kennzeichen.dev/dropshipping-api/105/2.2.0
```

Bestellendpunkt:

```text
POST /orders
```

Vollständige DEV-URL:

```text
https://api.kennzeichen.dev/dropshipping-api/105/2.2.0/orders
```

LIVE-Basis-URL:

```text
https://api.kennzeichen.link/dropshipping-api/26/2.2.0
```

Die in älteren Linkzielen eventuell vorkommende Client-ID `84` darf nicht verwendet werden. Es gilt: `105` = DEV, `26` = LIVE. Lokal (`.env.local`) bleibt immer DEV, damit Tests keine echten Aufträge auslösen.

## Authentifizierung

Die API verwendet HTTP Basic Authentication. Es gibt keinen separaten Login-Request. Bei jedem API-Request werden Benutzername und Passwort des im Portal angelegten API-Users übertragen.

Der API-Benutzername ist der im Portal zugeteilte Login-String und nicht die E-Mail-Adresse des Portalzugangs.

Im Portal ist bereits ein API-User vorhanden. Übernimm dessen angezeigten Login-String ausschließlich in die lokale beziehungsweise produktive Secret-Konfiguration. Der Login-String darf ebenso wie das Passwort nicht in diese Dokumentation, `.env.example`, Logs oder ein Git-Repository geschrieben werden.

Benötigte Header:

```http
Authorization: Basic BASE64(API_USERNAME:API_PASSWORD)
Content-Type: application/json
Accept: application/json
```

Zugangsdaten dürfen ausschließlich serverseitig verwendet werden.

## Umgebungsvariablen

Nutze Umgebungsvariablen. Keine Zugangsdaten, Secrets oder Basic-Auth-Header dürfen im Quellcode, Git-Repository, Browser-Bundle oder Frontend erscheinen.

Werte für DEV/lokal. In Vercel Production stattdessen `KENNZEICHEN_API_HOST=api.kennzeichen.link` und `KENNZEICHEN_API_CLIENT_ID=26` sowie die LIVE-Zugangsdaten.

```env
KENNZEICHEN_API_HOST=api.kennzeichen.dev
KENNZEICHEN_API_CLIENT_ID=105
KENNZEICHEN_API_VERSION=2.2.0
KENNZEICHEN_API_USERNAME=
KENNZEICHEN_API_PASSWORD=
KENNZEICHEN_API_TIMEOUT_SECONDS=55

KENNZEICHEN_WEBHOOK_SECRET=
```

Ergänze entsprechende Platzhalter in `.env.example`. Füge niemals reale Zugangsdaten in `.env.example` ein.

## Produktkatalog

`Produktkatalog.csv` ist semikolongetrennt und UTF-8-codiert. Er enthält folgende Spalten:

```text
product_type
product_variant_name
product_variant_id
utsch_sku
supplier_id
cost_item_1
cost_item_2
cost_item_3
cost_item_4
license_plate_number_length
shipping_cost
```

Der Katalog enthält 206 eindeutige Produkte:

- 186 Kennzeichenvarianten mit `product_type = LICENSE_PLATE`
- 19 Zubehörprodukte mit `product_type = OTHER`
- 1 Umweltplakette mit `product_type = EMISSION_STICKER`

Alle `product_variant_id`-Werte und alle SKUs sind eindeutig.

### Datenschutz und Preisschutz

Der vollständige Produktkatalog darf nicht öffentlich an den Browser ausgeliefert werden, da er Einkaufspreise und Lieferantendaten enthält.

Verarbeite ihn serverseitig. Das Frontend darf nur die für den Verkauf notwendigen Daten erhalten, beispielsweise:

- interne Shop-Produktkennung
- Produkt-ID des Herstellers
- Produktname
- Größe
- Kennzeichentyp
- maximale Zeichenlänge
- eigener Verkaufspreis

Folgende Katalogfelder dürfen nicht ungeschützt an das Frontend ausgegeben werden:

- `supplier_id`
- `cost_item_1` bis `cost_item_4`
- interne Einkaufskalkulation

### Wichtige Standardvarianten

| Produkt | productVariantId | SKU | maximale Zeichen |
| --- | ---: | --- | ---: |
| KFZ-Kennzeichen 520x110 mm, einzeilig | 2 | UD44520 | 8 |
| Elektro-Kennzeichen 520x110 mm, einzeilig | 166 | UU44520 | 7 |
| Oldtimer-Kennzeichen 520x110 mm, einzeilig | 240 | UH44520 | 7 |
| Saison-Kennzeichen 520x110 mm, einzeilig | 131 | US44520 | 7 |
| Elektro-Saison-Kennzeichen 520x110 mm, einzeilig | 204 | UF44520 | 6 |
| Oldtimer-Saison-Kennzeichen 520x110 mm, einzeilig | 276 | UZ44520 | 6 |
| Feinstaubplakette | 389 | N/A | – |

Diese Tabelle ist nur eine Schnellübersicht. Für sämtliche weiteren Größen und Varianten ist ausschließlich `Produktkatalog.csv` maßgeblich.

## Kennzeichenbestandteile

Eine deutsche Kennzeichennummer wird für den API-Request in drei Bestandteile zerlegt:

```json
{
  "city": "HB",
  "middle": "SJ",
  "end": "1991"
}
```

- `city`: Ortskürzel
- `middle`: Buchstabenblock
- `end`: Ziffernblock

Leerzeichen und Bindestriche gehören nicht in die einzelnen Werte.

Bei Elektro-, Oldtimer- und Saisonkennzeichen wird die jeweilige Ausführung über die gewählte Produktvariante bestimmt. Ein `E` oder `H` darf nicht zusätzlich in `end` geschrieben werden.

Nutze `license_plate_number_length` aus dem Produktkatalog zur serverseitigen Plausibilitätsprüfung der gewählten Variante. Eine Frontend-Prüfung allein reicht nicht aus.

## Saisonkennzeichen

Bei Saisonvarianten müssen zusätzlich Start- und Endmonat übertragen werden:

```json
{
  "seasonStartMonth": 4,
  "seasonEndMonth": 10
}
```

Beide Werte müssen ganzzahlig zwischen 1 und 12 liegen. Bei normalen Kennzeichen dürfen diese Felder nicht mitgesendet werden.

## Request für eine normale Kennzeichenbestellung

Beispiel für zwei normale KFZ-Kennzeichen in 520x110 mm:

```json
{
  "externalId": "shop-order-12345",
  "email": "kunde@example.de",
  "deliveryAddress": {
    "firstName": "Max",
    "lastName": "Mustermann",
    "gender": "MALE",
    "streetName": "Musterstraße",
    "houseNumber": "1",
    "zipCode": "12345",
    "cityName": "Berlin",
    "countryCode": "DE",
    "phoneNumber": "+491701234567"
  },
  "invoiceAddress": {
    "firstName": "Max",
    "lastName": "Mustermann",
    "gender": "MALE",
    "streetName": "Musterstraße",
    "houseNumber": "1",
    "zipCode": "12345",
    "cityName": "Berlin",
    "countryCode": "DE"
  },
  "items": [
    {
      "productVariantId": 2,
      "name": "KFZ-Kennzeichen 520x110mm - einzeilig",
      "sku": "UD44520",
      "quantity": 2,
      "customization": {
        "productType": "LICENSE_PLATE",
        "licensePlateNumberComponents": {
          "usageType": "EURO",
          "city": "HB",
          "middle": "SJ",
          "end": "1991"
        }
      }
    }
  ]
}
```

`quantity: 2` bestellt zwei identische Schilder derselben Produktvariante.

## Optionale Request-Felder

Für Client-ID `105` ist der alternative Absendername `Function Concept` konfiguriert (für LIVE-Client `26` bei Jens bestätigen). Wenn der Shop unter diesem Namen versenden soll, darf folgender Wert verwendet werden:

```json
{
  "shipperName": "Function Concept"
}
```

Andere Werte dürfen nicht gesendet werden, solange sie nicht zusätzlich im Portal als alternativer Name hinterlegt wurden. Wenn kein abweichender Absendername benötigt wird, kann das Feld vollständig entfallen.

Optionale Adressfelder:

```text
taxNumber
companyName
additionalField
phoneNumber
```

Sende optionale Felder nur, wenn sie tatsächlich befüllt sind. Keine leeren Strings übertragen.

## Pflichtfelder und Validierungsregeln

### Bestellung

| Feld | Regel |
| --- | --- |
| `externalId` | 1 bis 100 Zeichen |
| `email` | gültige E-Mail, 3 bis 255 Zeichen |
| `items` | mindestens ein Artikel |
| `productVariantId` | ganzzahlig und im Produktkatalog vorhanden |
| `name` | 1 bis 100 Zeichen |
| `sku` | 1 bis 20 Zeichen |
| `quantity` | Ganzzahl, mindestens 1 |

### Adresse

| Feld | Regel |
| --- | --- |
| `firstName` | 1 bis 100 Zeichen |
| `lastName` | 1 bis 100 Zeichen |
| `gender` | `FEMALE`, `MALE` oder `UNSPECIFIED` |
| `streetName` | 1 bis 100 Zeichen |
| `houseNumber` | 1 bis 10 Zeichen |
| `zipCode` | 1 bis 12 Zeichen |
| `cityName` | 1 bis 100 Zeichen |
| `countryCode` | für dieses Projekt `DE` |
| `taxNumber` | optional, maximal 20 Zeichen |
| `companyName` | optional, maximal 100 Zeichen |
| `additionalField` | optional, maximal 100 Zeichen |
| `phoneNumber` | optional, maximal 20 Zeichen |

Validiere alle Daten serverseitig, bevor der Hersteller-Request ausgeführt wird.

## Erfolgreiche API-Antwort

`POST /orders` liefert bei Erfolg HTTP `201 Created`.

Beispiel:

```json
{
  "id": 98765,
  "deliveries": [
    {
      "id": 45678,
      "items": [
        {
          "orderItemIndex": 0
        }
      ]
    }
  ],
  "costNetValue": "7.74"
}
```

Speichere mindestens:

- eigene `externalId`
- Hersteller-Bestell-ID `id`
- Lieferungs-ID beziehungsweise Lieferungs-IDs
- `costNetValue` als Dezimalwert ohne Fließkomma-Rundungsfehler
- Stripe-Session- oder Payment-Intent-ID
- Zeitpunkt der Übertragung
- aktuellen internen Status
- letzten Fehler und `X-Trace-Id`, falls vorhanden

`orderItemIndex` ist ein nullbasierter Index und verweist auf die Position des zugehörigen Artikels im gesendeten `items`-Array.

## Stripe-Ablauf

Die Herstellerbestellung darf nicht durch die öffentliche Stripe-Erfolgsseite ausgelöst werden.

Verwende ausschließlich den vorhandenen, serverseitig signaturgeprüften Stripe-Webhook. Übertrage eine Bestellung erst, nachdem die Zahlung verbindlich als erfolgreich bestätigt wurde.

Empfohlener Ablauf:

1. Kunde stellt Kennzeichen und Lieferdaten zusammen.
2. Shop speichert einen internen Bestellentwurf.
3. Stripe Checkout wird mit der internen Bestell-ID als Metadata gestartet.
4. Der serverseitige Stripe-Webhook bestätigt die erfolgreiche Zahlung.
5. Die Anwendung sperrt die interne Bestellung atomar gegen Mehrfachverarbeitung.
6. Die Anwendung validiert Produktvariante, SKU, Menge, Kennzeichendaten und Adressen erneut.
7. Die Anwendung sendet genau einen `POST /orders`-Request an den Hersteller.
8. Hersteller-Bestell-ID, Lieferungs-ID und `costNetValue` werden gespeichert.
9. Die interne Bestellung erhält den Status `submitted_to_manufacturer`.
10. Spätere Versand-Webhooks aktualisieren Versandstatus und Trackingcode.

## Schutz vor Doppelbestellungen

Das Verhalten der Hersteller-API bei einer wiederholten `externalId` ist nicht dokumentiert. Verlasse dich deshalb nicht auf eine Idempotenzprüfung des Herstellers.

Implementiere lokal mindestens:

- eindeutige interne Bestell-ID
- eindeutige Stripe-Event-ID
- eindeutige Stripe-Payment-Intent- oder Checkout-Session-ID
- persistentes Feld wie `manufacturerSubmittedAt`
- persistente Hersteller-Bestell-ID
- atomare Statusänderung oder Datenbanksperre vor dem API-Aufruf

Wenn eine Bestellung bereits an den Hersteller übertragen wurde, darf ein erneut zugestellter Stripe-Webhook keinen weiteren Herstellerauftrag auslösen.

Behandle auch den kritischen Fall, dass der Hersteller den Auftrag erfolgreich erstellt, aber die eigene Anwendung vor dem Speichern der Antwort abbricht. Protokolliere dafür `externalId`, Request-Zeitpunkt und `X-Trace-Id`. Erzeuge bei unklarem Ergebnis nicht automatisch einen zweiten Auftrag.

## Fehlerbehandlung

Bei jeder fehlerhaften API-Antwort:

1. HTTP-Status erfassen.
2. Antwortinhalt erfassen, aber keine personenbezogenen Daten unnötig protokollieren.
3. `X-Trace-Id` aus dem Response-Header erfassen.
4. Die interne Bestellung auf einen klaren Fehlerstatus setzen.
5. Technischen Fehler für eine kontrollierte erneute Prüfung bereitstellen.
6. Keine automatische Endlosschleife implementieren.

Die Zugangsdaten und der `Authorization`-Header dürfen niemals protokolliert werden.

Bei Transportfehlern oder Timeouts darf nicht automatisch angenommen werden, dass der Hersteller keinen Auftrag erstellt hat.

## Webhooks des Herstellers

Implementiere einen öffentlichen HTTPS-Endpunkt zum Empfang der Hersteller-Webhooks.

Mindestens relevante Ereignisse:

- `PING`
- `DELIVERY_SHIPMENT`
- `DELIVERY_RETURN`
- `DELIVERY_CANCELLATION`

Relevante Header:

```http
X-Signature
X-Webhook-Id
X-Webhook-Version
```

Die Signatur ist ein HMAC-SHA256-Hash über den unveränderten UTF-8-Request-Body mit dem konfigurierten `signatureSecret` als Schlüssel.

Pseudocode:

```text
expectedSignature = HMAC_SHA256(rawRequestBody, webhookSecret)
constantTimeCompare(expectedSignature, X-Signature)
```

Anforderungen:

- Verwende den unveränderten Raw Body vor jeder JSON-Neukodierung.
- Vergleiche Signaturen in konstanter Zeit.
- Lehne ungültige Signaturen mit HTTP `401` ab.
- Speichere empfangene Ereignisse vor der weiteren Verarbeitung.
- Antworte auf akzeptierte Ereignisse schnell mit HTTP `202 Accepted`.
- Verarbeite Ereignisse anschließend idempotent.
- Rechne mit mehrfacher Zustellung und nicht garantierter Reihenfolge.
- Speichere eine eindeutige Ereigniskennung oder einen stabilen Ereignis-Fingerprint zur Duplikaterkennung.

### Versandereignis

Bei `DELIVERY_SHIPMENT` müssen mindestens folgende Informationen verarbeitet werden:

- Hersteller-Bestell-ID
- eigene `externalId`, falls vorhanden
- Lieferungs-ID
- Trackingcode, sofern vorhanden
- Ereigniszeitpunkt

Aktualisiere die interne Bestellung auf `shipped`. Sende Kundenbenachrichtigungen nur einmal.

### Rücksendung

Bei `DELIVERY_RETURN` muss die zurückgesendete Lieferungs-ID gespeichert werden. Ein erneuter Versand darf nicht automatisch und nicht ohne eine ausdrückliche interne Entscheidung über `/orders/reshippedOrders` ausgelöst werden.

## Empfohlene interne Statuswerte

Nutze bestehende Statuswerte, wenn das Projekt bereits ein Bestellmodell besitzt. Andernfalls sind folgende Werte sinnvoll:

```text
draft
payment_pending
paid
submitting_to_manufacturer
submitted_to_manufacturer
manufacturer_submission_uncertain
manufacturer_submission_failed
shipped
returned
cancelled_by_manufacturer
```

## Protokollierung

Protokolliere strukturiert:

- interne Bestell-ID
- `externalId`
- Hersteller-Bestell-ID
- Stripe-Event-ID
- Zielendpunkt
- HTTP-Status
- `X-Trace-Id`
- Verarbeitungsstatus
- Zeitstempel

Maskiere beziehungsweise entferne:

- Basic-Auth-Header
- API-Passwort
- Webhook-Secret
- vollständige personenbezogene Daten

## DEV-Umgebung

In der DEV-Umgebung erfolgt kein echter Versand. Trackingcodes werden erst in der Produktivumgebung über Webhooks zurückgespielt.

Für Tests muss Jens beziehungsweise der Hersteller Webhook-Ereignisse manuell auslösen können. Die Anwendung muss daher auch in DEV einen erreichbaren Test-Webhook besitzen.

## Webhook LIVE

Im LIVE-Portal (https://dev.kennzeichen.link → Webhooks) eingetragen:

- URL: `https://www.kennzeichen-lieferung.de/api/kennzeichen-webhook` (immer mit `www`, die Apex-Domain leitet per 308 um)
- Events: `DELIVERY_SHIPMENT`, `DELIVERY_RETURN`, `DELIVERY_CANCELLATION`, `PING`
- SignatureSecret: identisch mit `KENNZEICHEN_WEBHOOK_SECRET` in Vercel Production, niemals im Repository

Schnelltest: Ein unsignierter `POST` auf die URL muss `401` liefern (`503` = Secret fehlt im Deployment). Ein mit dem Secret per HMAC-SHA256 (hex, Header `X-Signature`) signierter `PING` muss `202` liefern.

## Tests

Implementiere mindestens folgende automatisierte Tests:

1. Erfolgreiche Erstellung eines Requests für zwei normale Kennzeichen.
2. Richtige Zuordnung von `productVariantId`, SKU und Produktname aus dem Produktkatalog.
3. Ablehnung einer unbekannten Produkt-ID.
4. Ablehnung einer zu langen Kennzeichennummer für die gewählte Variante.
5. Ablehnung einer Menge kleiner als 1.
6. Saisonmonate werden nur bei Saisonvarianten übertragen.
7. Leere optionale Felder werden nicht übertragen.
8. Basic Auth wird ausschließlich serverseitig gesetzt.
9. Erfolgreiche `201`-Antwort wird korrekt gespeichert.
10. `costNetValue` wird ohne Fließkommafehler verarbeitet.
11. `X-Trace-Id` wird bei Fehlerantworten gespeichert.
12. Ein erneut zugestellter Stripe-Webhook erzeugt keine Doppelbestellung.
13. Ein ungültig signierter Hersteller-Webhook wird mit `401` abgelehnt.
14. Ein gültiger Webhook wird mit `202` bestätigt.
15. Ein mehrfach zugestelltes Versandereignis löst keine doppelte Kundenbenachrichtigung aus.
16. API-Zugangsdaten erscheinen weder in Logs noch in Client-Bundles.

## Abnahmekriterien

Die Aufgabe ist erst abgeschlossen, wenn:

- die API ausschließlich serverseitig aufgerufen wird
- API-Version `2.2.0` und Client-ID `105` (DEV) bzw. `26` (LIVE) verwendet werden
- Produkt-IDs und SKUs aus `Produktkatalog.csv` stammen
- keine erfundenen Produktvarianten verwendet werden
- eine erfolgreiche Stripe-Zahlung genau einen Herstellerauftrag erzeugt
- die Herstellerantwort vollständig gespeichert wird
- Doppelbestellungen lokal verhindert werden
- Fehler inklusive `X-Trace-Id` nachvollziehbar sind
- Hersteller-Webhooks signaturgeprüft und idempotent verarbeitet werden
- alle relevanten Tests erfolgreich laufen
- bestehende Stripe- und Shop-Funktionen weiterhin funktionieren
- `.env.example` vollständig, aber frei von echten Secrets ist
- die geänderten Dateien und der neue Ablauf abschließend dokumentiert werden

## Nicht umsetzen

In diesem Arbeitsschritt ausdrücklich nicht umsetzen:

- Wunschkennzeichen-Verfügbarkeitsprüfung
- Wunschkennzeichenreservierung
- Umweltplakettenbestellung
- automatischer Neuversand einer Rücksendung
- Produktivschaltung ohne separate Produktivzugangsdaten
- Offenlegung der Einkaufspreise im Frontend

## Abschlussbericht von Codex

Gib nach der Implementierung kurz und konkret aus:

1. welche Dateien geändert oder erstellt wurden
2. wie der Stripe-zu-Hersteller-Ablauf funktioniert
3. welche Umgebungsvariablen gesetzt werden müssen
4. wie eine DEV-Testbestellung ausgelöst wird
5. wie der Webhook lokal und in DEV getestet wird
6. welche Tests ausgeführt wurden und mit welchem Ergebnis
7. welche Punkte vor dem Produktivstart noch offen sind
