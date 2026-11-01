# Stappenplan: de COSTA-website bouwen

Dit is mijn plan van idee tot live. Elke stap heeft een doel, taken en een
"klaar als"-regel, zodat ik weet wanneer ik door mag naar de volgende stap.

**Status:** ✅ klaar · 🟡 bezig · ⚪ straks

| # | Stap | Status |
|---|---|---|
| 1 | Doel en doelgroep | 🟡 |
| 2 | Onderzoek | 🟡 |
| 3 | Plan en prioriteiten (MoSCoW) | ⚪ |
| 4 | Structuur en ontwerp | ✅ |
| 5 | Content | 🟡 |
| 6 | Frontend bouwen | 🟡 |
| 7 | Backend en administratie | ⚪ |
| 8 | Chatbot | ⚪ |
| 9 | Testen, veiligheid en privacy | 🟡 |
| 10 | Hosting en publiceren | ⚪ |
| 11 | Promoten en beheer | ⚪ |

---

## 1. Doel en doelgroep 🟡
**Doel:** weten waarvoor de website is en voor wie.
**Taken**
- Hoofdvraag en deelvragen (staan in `onderzoek.md`)
- Met de eigenaren bespreken wat ze willen bereiken
- Doelgroepen noteren: klanten uit de buurt, Poolse/Oost-Europese klanten, medewerkers
**Klaar als:** ik het doel in twee zinnen kan opschrijven en de eigenaren het eens zijn.

## 2. Onderzoek 🟡
**Doel:** niet raden maar weten wat nodig is.
**Taken**
- Google-reviews analyseren (klaar)
- Websites van vergelijkbare winkels bekijken
- Interview met de eigenaren
- 3 tot 5 klantvragenlijsten (NL/EN, ook voor Oekraïense, Russische en Poolse klanten)
**Klaar als:** de conclusie in `onderzoek.md` staat, met bewijs uit interview en vragenlijsten.

## 3. Plan en prioriteiten ⚪
**Doel:** kiezen wat eerst gebouwd wordt.
**Taken**
- Wensen sorteren met MoSCoW (Must, Should, Could, Won't)
- Een planning per week (Newcomer gaat altijd voor)
- Kosten bespreken (domein, server, AI-gebruik)
**Klaar als:** het projectplan af is en de eigenaren de Musts hebben goedgekeurd.

## 4. Structuur en ontwerp ✅
**Doel:** weten welke pagina's er komen en hoe ze eruitzien.
**Taken (gedaan)**
- Pagina's: homepage, categoriepagina, privacy
- Kleuren: rood en wit
- Prototype en eerste ontwerp
**Klaar als:** de eigenaren het ontwerp mooi vinden.

## 5. Content 🟡
**Doel:** echte teksten, foto's en producten.
**Taken**
- Echte producten, prijzen en foto's per groep verzamelen
- Tekst "Over ons" schrijven met de eigenaren
- Foto's zonder prijskaartjes en zonder herkenbare mensen
- Controleren dat "elke vrijdag verse pierogi" klopt
**Klaar als:** alle `[PLAATSHOUDERS]` en voorbeeldproducten vervangen zijn.

## 6. Frontend bouwen 🟡
**Doel:** de pagina's in code.
**Taken**
- HTML en CSS (klaar)
- TypeScript met OOP: `Product`, `Categorie`, `Winkel` (klaar)
- Aanbiedingen uit dezelfde data (klaar)
- Kaart pas na toestemming (klaar)
- Chatvenster echt laten werken (na stap 8)
**Klaar als:** alle pagina's werken op computer en telefoon.

## 7. Backend en administratie ⚪
**Doel:** producten beheren zonder de code te openen.
**Eerst leren:** Linux, Node, SQL (zelf met video's).
**Taken**
1. Server met `GET /api/producten`
2. Database (PostgreSQL in Docker) en `ProductRepository`
3. De website haalt data op met `fetch`
4. Inloggen (wachtwoord-hash, sessies, limiet op pogingen)
5. Producten toevoegen, wijzigen en verbergen
6. Foto's veilig uploaden
**Klaar als:** de eigenaren zelf een prijs kunnen wijzigen.

## 8. Chatbot ⚪
**Doel:** klanten krijgen antwoord op vragen.
**Taken**
- `POST /api/chat` op de server
- AI-sleutel alleen in `.env` op de server
- Antwoorden uit de echte gegevens (openingstijden, producten, prijzen)
- Duidelijk tonen dat het een AI is en geen persoonlijke gegevens vragen
- Limiet op berichten per bezoeker
**Klaar als:** de chatbot de vragen uit het onderzoek goed beantwoordt.

## 9. Testen, veiligheid en privacy 🟡
**Doel:** niets kapot, niets onveilig.
**Taken**
- Testen op telefoon en computer
- Beveiligingschecklist (invoer controleren, geparametriseerde SQL, geheimen in `.env`, HTTPS)
- CI met GitHub Actions
- Privacyverklaring afmaken en bijwerken voor inloggen en chatbot
- Eigenaren laten meelezen
**Klaar als:** de checklist groen is en de eigenaren akkoord zijn.

## 10. Hosting en publiceren ⚪
**Doel:** de site online zetten.
> De server kies ik pas als de backend werkt, samen met de eigenaren.
**Taken**
- Domeinnaam registreren (op naam van de eigenaren)
- Server en database kiezen (in de EU) en kosten afspreken
- Instellingen op de server zetten (nooit in Git)
- HTTPS aanzetten en back-ups regelen
- Eventueel CD: automatisch uitrollen
**Klaar als:** de site op het echte adres werkt en een back-up terug te zetten is.

## 11. Promoten en beheer ⚪
**Doel:** klanten laten weten dat de site er is, en hem gezond houden.
**Taken**
- Google-bedrijfsprofiel en Facebook bijwerken met het websiteadres
- QR-code of poster in de winkel
- Updates uitvoeren, back-ups controleren
- Prijzen en aanbiedingen bijhouden (door de eigenaren)
**Klaar als:** vaste afspraken bestaan over wie wat doet.

---

## Wat doe ik nu?
1. Stap 2 afmaken: interview en klantvragen
2. Naast het onderzoek leren (Linux, Node, SQL)
3. Dan stap 3 en 5 met de eigenaren