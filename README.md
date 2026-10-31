# COSTA Supermarket website

Een website met (later) een AI-chatbot voor COSTA Supermarket, een Poolse supermarkt aan de Meeuwenlaan 102 in Amsterdam-Noord.

Dit is een leerproject naast mijn studie ICT (HvA). Ik bouw het stap voor stap, van onderzoek tot een werkende website.

> **Status:** in ontwikkeling. De producten en prijzen op de site zijn **voorbeelden**, geen echte gegevens.

## Wat kan de site nu?

- Homepage met openingstijden, productgroepen, banner, aanbiedingen, contact en kaart
- Aanbiedingen in een bewegende strook (klikbaar)
- Pagina per productgroep (`categorie.html?groep=brood`) met producten en prijzen
- Werkt op computer en telefoon
- Alle producten komen uit één plek (`winkel.ts`), zodat gegevens niet dubbel staan

## Technieken

- HTML en CSS
- TypeScript met OOP (classes `Product`, `Categorie`, `Winkel`)
- Git en GitHub

## Mappen

```
costa supermarkt/
├── docs/            Onderzoek, interviewvragen en planning
├── webserver/
│   ├── css/         Opmaak (style.css)
│   ├── img/         Foto's
│   ├── template/    HTML-pagina's (homepage, categorie)
│   ├── ts/          TypeScript (hier schrijf ik de code)
│   └── js/          JavaScript, door tsc gemaakt (niet zelf aanpassen)
└── CLAUDE.md        Afspraken voor de AI-assistent
```

## Starten

1. Installeer [Node.js](https://nodejs.org) en de VS Code-extensie **Live Server**.
2. Compileer de TypeScript, in de map `webserver`:

   ```
   npx tsc
   ```

3. Open `webserver/template/homepage.html` met Live Server (rechtermuisknop, "Open with Live Server").

## Veiligheid

- Geheimen (zoals API-sleutels) staan in `.env` en komen **nooit** in de repository.
- De AI-sleutel komt later alleen op de server, nooit in de browser.
- Gegevens uit de database worden veilig op de pagina gezet (geen `innerHTML`).

## Plannen

- [x] Homepage en categoriepagina
- [x] Producten en aanbiedingen uit TypeScript
- [ ] Onderzoek afronden: interview eigenaren en klantvragen
- [ ] Projectplan met MoSCoW
- [ ] Backend en database voor producten
- [ ] Administratiegedeelte met inloggen voor de medewerkers
- [ ] AI-chatbot (via de server)
- [ ] Privacyverklaring en cookiemelding voordat de site online gaat

## Maker

Dlkhosh Sharif, eerstejaars ICT-student (HvA).