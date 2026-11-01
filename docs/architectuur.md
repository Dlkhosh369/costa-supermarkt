# Systeemarchitectuur: COSTA Supermarket

Dit document legt uit **wat ik gebruik, waarom, en in welke volgorde ik het bouw**.
Status: ontwerp (concept). Wordt bijgewerkt na het gesprek met de eigenaren.

---

## 1. Het grote plaatje

```
 KLANT of MEDEWERKER                    ONZE SERVER                      EXTERN
 (browser, telefoon)

 +------------------+   HTTPS    +----------------------------+
 | Frontend         | ---------> | Backend (Node + TypeScript)|
 | HTML, CSS, TS    |  verzoek   |                            |
 |                  | <--------- |  routes                    |
 | - homepage       |  antwoord  |    -> services             |
 | - categoriepagina|   (JSON)   |      -> repositories       |      +-------------+
 | - chatvenster    |            |        -> database  <------+----> | Database    |
 | - admin-scherm   |            |                            |      | (SQLite)    |
 +------------------+            |  /api/chat  -------------------->  +-------------+
                                 |        |                   |
                                 +--------+-------------------+      +-------------+
                                          +------------------------> | AI-API      |
                                           (sleutel blijft op de     | (chatbot)   |
                                            server, nooit in de      +-------------+
                                            browser)
```

**Eén regel om te onthouden:** de browser praat **alleen** met onze backend.
De backend praat met de database en met de AI. Zo blijven geheimen veilig.

---

## 2. Wat is wat? (in simpele woorden)

| Onderdeel | Wat doet het? | Voorbeeld uit dit project |
|---|---|---|
| **Frontend** | Wat de bezoeker ziet en aanklikt | `homepage.html`, `categorie.ts` |
| **Backend** | Een programma op een server dat verzoeken beantwoordt, regels bewaakt en met de database praat | "Geef alle producten van groep brood" |
| **API** | De lijst met "vragen" die de frontend aan de backend mag stellen | `GET /api/producten?groep=brood` |
| **Database** | De plek waar gegevens blijvend staan | tabel `producten` |

**Waarom heb je een backend nodig?**
- Een browser is **niet te vertrouwen**: iedereen kan de code lezen en aanpassen.
- Wachtwoorden, de AI-sleutel en de regels "wie mag producten wijzigen" moeten op een plek staan die bezoekers niet kunnen bereiken: de server.
- Producten moeten blijven bestaan als de pagina sluit: dat doet de database.

---

## 3. Keuzes en waarom

### 3.1 Taal en platform: Node.js met TypeScript
- **Waarom:** ik leer al TypeScript. Dan gebruik ik **één taal** voor frontend en backend, en kan ik classes (OOP) op beide plekken gebruiken.
- **Alternatieven:** Python (Flask/Django), PHP (Laravel), Java (Spring). Allemaal goed, maar dan moet ik een tweede taal leren terwijl ik net met TypeScript begin.
- **Nadeel:** Node geeft veel vrijheid, dus ik moet zelf netjes mappen en lagen maken.

### 3.2 Framework: Express
- **Waarom:** klein, veel uitleg, en je ziet precies wat er gebeurt (route -> functie -> antwoord). Goed om de basis te leren.
- **Alternatieven:** Fastify (sneller, iets nieuwer), NestJS (volledig class-based, maar veel regels en magie voor een beginner).
- **Later:** als ik Express goed begrijp, is NestJS een logische vervolgstap.

### 3.3 Database: SQLite eerst, PostgreSQL later
- **Waarom SQLite:** het is één bestand, je hoeft niets te installeren en het is genoeg voor één kleine winkel. Ik leer SQL zonder gedoe.
- **Waarom PostgreSQL later:** sterker bij meer gebruikers en bij hosting op meerdere plekken.
- **Hoe ik het omwisselbaar houd:** alle database-code zit in **repository-classes**. De rest van de code weet niet welke database erachter zit.
- **SQL of ORM (zoals Prisma)?** Ik begin met gewone SQL (bijv. `better-sqlite3`). Dan **leer ik SQL echt**. Een ORM kan later.

### 3.4 Structuur van de backend (lagen, OOP)
```
backend/
├── src/
│   ├── routes/          Welke URL's bestaan er?          (producten.routes.ts)
│   ├── services/        De regels van de winkel          (ProductService)
│   ├── repositories/    Praten met de database           (ProductRepository)
│   ├── models/          Classes met gegevens             (Product, Categorie, Gebruiker)
│   ├── middleware/      Controles vooraf                 (ingelogd?, rate limit)
│   └── server.ts        Start de server
├── data/                Het databasebestand (niet in Git)
├── uploads/             Geüploade foto's (niet in Git)
└── .env                 Geheimen (niet in Git)
```
**Waarom lagen?** Elke class heeft één taak. Een fout zoeken is makkelijker, en onderdelen zijn te vervangen.

Wat ik al heb in de frontend (`maakWinkel()` met de voorbeeldproducten) wordt in de backend een **`ProductRepository`**. Dezelfde gedachte, maar dan met een echte database.

### 3.5 Gegevens (datamodel)
| Tabel | Kolommen |
|---|---|
| `categorieen` | id, sleutel (`brood`), titel (`Brood`) |
| `producten` | id, naam, **prijs_in_centen**, categorie_id, foto, in_aanbieding, actief, gewijzigd_op |
| `gebruikers` | id, e-mail, wachtwoord_hash, rol (`eigenaar` / `medewerker`) |
| `bijzondere_dagen` | id, datum, open_van, open_tot, gesloten, opmerking (voor 1 januari en andere afwijkingen) |

- **Prijs in centen** (een geheel getal, € 2,50 = `250`): zo voorkom je afrondfouten met kommagetallen.
- `actief`: een product "verbergen" in plaats van verwijderen.

### 3.6 Inloggen (administratie)
- **Sessies met een veilige cookie** (server onthoudt wie je bent). Past bij één website met één server.
- **Alternatief:** JWT-tokens. Handig als meerdere apps dezelfde login gebruiken, maar lastiger veilig te maken.
- **Wachtwoorden:** nooit opslaan, alleen een **hash** (argon2id of bcrypt).
- **Extra:** limiet op inlogpogingen (rate limiting), cookie met `HttpOnly`, `Secure` en `SameSite`, en bescherming tegen CSRF.
- **Privacy:** een inlogcookie is functioneel nodig, maar ik pas de privacyverklaring wel aan.

### 3.7 Foto's uploaden
- Alleen bepaalde types (jpeg, png, webp), maximale grootte, en een **eigen bestandsnaam** (nooit de naam van de gebruiker).
- Opslaan buiten de code-map. Later eventueel op een bestandsopslag-dienst.

### 3.8 AI-chatbot
```
Browser  ->  POST /api/chat  ->  backend  ->  AI-API
                                   |
                              haalt producten, prijzen en
                              openingstijden uit de database
```
- De **API-sleutel staat alleen in `.env` op de server**.
- De chatbot krijgt **echte gegevens uit de database** als context. Zo verzint hij geen prijzen.
- Limiet op berichten per bezoeker (kosten en misbruik).
- De bezoeker ziet duidelijk: **"Je praat met een AI"** en: "vul geen persoonlijke gegevens in".
- Ik sla zo min mogelijk op van wat bezoekers typen.

### 3.9 Veiligheid in het kort (checklist)
- [ ] Alle invoer controleren (type, lengte, toegestane waarden) en niet vertrouwen
- [ ] Alleen **geparametriseerde** SQL-vragen (tegen SQL-injectie)
- [ ] Geen `innerHTML` met gebruikersgegevens (tegen XSS), wat ik nu al zo doe
- [ ] Geheimen in `.env`, nooit in Git
- [ ] HTTPS overal
- [ ] Beveiligingsheaders (bijv. met `helmet`)
- [ ] Beheer-routes alleen voor ingelogde gebruikers met de juiste rol
- [ ] Back-ups van de database
- [ ] Foutmeldingen naar bezoekers zonder technische details

### 3.10 Online zetten (later)
Een hostingdienst die Node ondersteunt, met automatische HTTPS, een eigen domeinnaam en een plek voor het databasebestand. Dit kies ik later, met de eigenaren (kosten, wie beheert het).

---

## 4. De API (eerste ontwerp)

| Methode en URL | Doet | Wie mag het? |
|---|---|---|
| `GET /api/categorieen` | Alle groepen | Iedereen |
| `GET /api/producten?groep=brood` | Producten van een groep | Iedereen |
| `GET /api/aanbiedingen` | Producten in de aanbieding | Iedereen |
| `POST /api/login` | Inloggen | Iedereen |
| `POST /api/logout` | Uitloggen | Ingelogd |
| `POST /api/producten` | Product toevoegen | Ingelogd |
| `PUT /api/producten/:id` | Product wijzigen | Ingelogd |
| `DELETE /api/producten/:id` | Product verbergen/verwijderen | Eigenaar |
| `POST /api/producten/:id/foto` | Foto uploaden | Ingelogd |
| `POST /api/chat` | Vraag aan de chatbot | Iedereen (met limiet) |

---

## 5. Bouwvolgorde (stap voor stap)

Elke stap werkt zelfstandig en eindigt met een commit.

1. **Hallo-server:** Node + Express + TypeScript, één route die "ok" teruggeeft
2. **Producten uit het geheugen:** `GET /api/producten` met de voorbeeldproducten
3. **Frontend haalt data op** via `fetch` in plaats van `maakWinkel()`
4. **SQLite + ProductRepository:** producten staan nu in een echte database
5. **Inloggen:** gebruikers, wachtwoord-hash, sessies, rate limiting
6. **Administratie:** toevoegen, wijzigen, verbergen
7. **Foto's uploaden** met controles
8. **Chatbot-endpoint** met de AI-API en gegevens uit de database
9. **Privacy bijwerken, testen, online zetten**

---

## 6. Open vragen (uit het gesprek met de eigenaren)

- Wie gaat de administratie gebruiken, en op welk apparaat?
- Hoeveel producten zijn het ongeveer, en hoe vaak veranderen prijzen?
- Willen ze producten uit een Excel-bestand kunnen importeren?
- Welke talen moet de site en de chatbot ondersteunen (NL, PL, UA, RU)?
- Wie beheert later de server en de kosten?

## 7. Wat ik hier bewust nog niet doe
- Online bestellen of betalen (valt buiten dit project)
- Meerdere winkels
- Een mobiele app