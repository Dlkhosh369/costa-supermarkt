# Projectplan: COSTA Supermarket website met chatbot

**Maker:** Dlkhosh Sharif · **Status:** concept, [op basis van het onderzoek ](OnderzoekResultaten.md)

## 1. Doel
Een veilige, professionele website voor COSTA Supermarket (Meeuwenlaan 102, Amsterdam-Noord) waarop klanten openingstijden, producten, prijzen, aanbiedingen en het leverschema vinden. Een chatbot beantwoordt vragen in meerdere talen. De eigenaren beheren de gegevens zelf.

**Leerdoel (voor mij):** full stack leren, met OOP in TypeScript, en een backend, database, beveiliging en een AI-koppeling bouwen.

## 2. Doelgroep
- Klanten: Pools, Oekraïens, Nederlands (en Bulgaars, Roemeens, reizigers)
- Talen: Pools, Oekraïens, Engels, Nederlands
- Gebruikers van het beheer: de eigenaren en het personeel

## 3. Wat valt binnen en buiten
**Binnen:** informatiewebsite, productoverzicht, beheeromgeving, chatbot, privacyverklaring.
**Buiten:** online bestellen en betalen, een mobiele app, meerdere winkels.

## 4. MoSCoW

| | Onderdeel | Waarom (uit het onderzoek) |
|---|---|---|
| **Must** | Openingstijden, adres, telefoon, kaart | Basisinformatie |
| **Must** | Productgroepen met producten en prijzen | Klanten zoeken producten |
| **Must** | Leverschema: wanneer komt wat binnen | Meest gestelde vraag |
| **Must** | Beheer door de eigenaren, zonder code | Prijzen en aanbod wisselen |
| **Must** | Privacyverklaring, kaart pas na toestemming | Wet en vertrouwen |
| **Should** | Chatbot in NL, EN, PL en UA | Klanten spreken veel talen |
| **Should** | Aanbiedingen van de week | Wisselen elke week |
| **Should** | Markering "deze week beschikbaar" | Producten zijn niet altijd er |
| **Should** | Groepen Zuivel, Dranken, Diepvries/pierogi | Populairste producten |
| **Could** | Zoeken op productnaam | Handig, geen noodzaak |
| **Could** | Melding aan klanten als een product binnen is | Extra service |
| **Won't** | Online bestellen en betalen | Te groot voor dit project |
| **Won't** | Mobiele app | Website werkt op telefoon |

*Deze verdeling wordt tijdens het bouwen met de eigenaren gecontroleerd.*

## 5. Aanpak en volgorde

| Fase | Wat | Status |
|---|---|---|
| 1 | Onderzoek (reviews, interview, klantvragen) | ✅ eerste ronde klaar |
| 2 | Ontwerp en frontend (HTML, CSS, TypeScript met OOP) | 🟡 bijna klaar |
| 3 | Leren: Linux, Node, SQL | 🟡 bezig |
| 4 | Backend en database (API, repository) | ⚪ |
| 5 | Administratie (inloggen, producten beheren, foto's) | ⚪ |
| 6 | Chatbot via de server | ⚪ |
| 7 | Testen, veiligheid, CI, privacy | ⚪ |
| 8 | Live zetten en afspraken over beheer | ⚪ |

**Planning:** het schoolproject Newcomer gaat altijd voor. Dit project doe ik in de uren daarnaast, met kleine stappen en regelmatige commits.

## 6. Technische keuzes (kort)
Frontend in TypeScript, backend in Node met Express, PostgreSQL (lokaal in Docker), inloggen met sessies en gehashte wachtwoorden, AI-sleutel alleen op de server. Uitleg staat in `architectuur.md`.

## 7. Risico's

| Risico | Wat ik doe |
|---|---|
| Te weinig tijd door school | Newcomer eerst, kleine stappen, per fase een werkend resultaat |
| Onveilige code (inloggen, uploads, AI) | Beveiligingschecklist, code laten nakijken, niets live zonder controle |
| De chatbot verzint prijzen of antwoorden | Alleen antwoorden uit de database, duidelijk tonen dat het een AI is |
| Verkeerde of oude prijzen op de site | "Prijzen onder voorbehoud" en een snelle manier om prijzen te wijzigen |
| Persoonsgegevens (accounts, chatberichten) | Zo min mogelijk bewaren, privacyverklaring bijwerken |
| Afhankelijk van de eigenaren voor producten en foto's | Klein beginnen met voorbeeldproducten |
| Regels voor reclame voor alcohol | Controleren voordat alcohol in aanbiedingen komt |
| Kosten lopen op | Eerst afspreken wat de eigenaren willen betalen, en alles op hun naam zetten |

## 8. Kosten (indicatie)
Zoals opgezocht op 31 oktober 2026 (nog controleren op de officiële sites):
- Kleine server: ongeveer **€ 5,49 tot € 6,49 per maand** zonder btw (Hetzner)
- Domeinnaam `.nl`: ongeveer **€ 4,38 het eerste jaar**, daarna ongeveer **€ 5,84 per jaar** zonder btw
- Gebruik van de AI-API: nog **onbekend**, hangt af van het aantal vragen

Tijdens het bouwen is alles gratis, op mijn eigen laptop.

## 9. Klaar als
- De eigenaren kunnen zelf producten, prijzen en aanbiedingen wijzigen.
- De website werkt op telefoon en computer.
- De chatbot beantwoordt de gebruikelijke vragen goed, in meerdere talen.
- De beveiligingschecklist en de privacyverklaring zijn af en gelezen door de eigenaren.
- Het is duidelijk wie de site beheert en betaalt.