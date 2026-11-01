// winkel.ts
// Hier staan alle productgroepen en producten van de winkel.
// De productnamen komen uit het echte assortiment.
// Prijzen staan er nog NIET in: die komen later uit de administratie (database).

// ---------- Product ----------
export class Product {
  naam: string;
  prijs: number | null; // null = nog geen prijs bekend
  groep: string;
  foto?: string;
  inAanbieding: boolean = false;

  constructor(naam: string, prijs: number | null, groep: string, foto?: string) {
    this.naam = naam;
    this.prijs = prijs;
    this.groep = groep;
    this.foto = foto;
  }

  // Maakt van 2.5 de tekst "€ 2,50". Zonder prijs: "Prijs in de winkel"
  prijsTekst(): string {
    if (this.prijs === null) {
      return "Prijs in de winkel";
    }
    return this.prijs.toLocaleString("nl-NL", { style: "currency", currency: "EUR" });
  }

  // Maakt een productkaart (veilig: geen innerHTML)
  maakKaart(): HTMLElement {
    const kaart = document.createElement("article");
    kaart.className = "product";

    if (this.foto) {
      const img = document.createElement("img");
      img.className = "product-img";
      img.src = "../img/" + this.foto;
      img.alt = this.naam;
      kaart.appendChild(img);
    }

    const info = document.createElement("div");
    info.className = "product-info";

    const titel = document.createElement("h3");
    titel.textContent = this.naam;

    const prijs = document.createElement("p");
    prijs.className = "product-price";
    prijs.textContent = this.prijsTekst();

    info.appendChild(titel);
    info.appendChild(prijs);
    kaart.appendChild(info);
    return kaart;
  }
}

// ---------- Categorie (productgroep) ----------
export class Categorie {
  sleutel: string;
  titel: string;
  private producten: Product[] = [];

  constructor(sleutel: string, titel: string) {
    this.sleutel = sleutel;
    this.titel = titel;
  }

  voegToe(product: Product): void {
    this.producten.push(product);
  }

  geefProducten(): Product[] {
    return this.producten;
  }
}

// ---------- Aanbieding ----------
export interface Aanbieding {
  product: Product;
  categorieTitel: string;
}

// ---------- Winkel ----------
export class Winkel {
  private categorieen: Categorie[] = [];

  voegCategorieToe(categorie: Categorie): void {
    this.categorieen.push(categorie);
  }

  zoekCategorie(sleutel: string): Categorie | undefined {
    return this.categorieen.find((c) => c.sleutel === sleutel);
  }

  geefAanbiedingen(): Aanbieding[] {
    const lijst: Aanbieding[] = [];
    for (const categorie of this.categorieen) {
      for (const product of categorie.geefProducten()) {
        if (product.inAanbieding) {
          lijst.push({ product: product, categorieTitel: categorie.titel });
        }
      }
    }
    return lijst;
  }
}

// ---------- Hulpfunctie: een groep maken met een lijst namen ----------
// Zo hoef je niet voor elk product een aparte regel te schrijven.
function maakGroep(sleutel: string, titel: string, namen: string[], foto?: string): Categorie {
  const groep = new Categorie(sleutel, titel);
  for (const naam of namen) {
    groep.voegToe(new Product(naam, null, sleutel, foto));
  }
  return groep;
}

// ---------- De winkel vullen ----------
export function maakWinkel(): Winkel {
  const winkel = new Winkel();

  const vlees = maakGroep("vlees", "Vlees en vleeswaren", [
    "Kiełbasa śląska",
    "Kiełbasa toruńska",
    "Kabanosy",
    "Szynka sołtysowa",
    "Polędwica sopocka",
    "Parówki z szynki",
  ], "vlees.jpeg");

  const zuivel = maakGroep("zuivel", "Zuivel en kaas", [
    "Twaróg półtłusty (kwark)",
    "Śmietana 18% (zure room)",
    "Kefir 1 l",
    "Serek wiejski (hüttenkäse)",
    "Ser królewski (kaas)",
    "Maślanka (karnemelk)",
  ]);

  const groente = maakGroep("groente", "Groente en fruit", [
    "Malinowe tomaten",
    "Poolse aardappelen 2,5 kg",
    "Rode biet",
    "Wortel",
    "Appels",
    "Peren (Conference)",
  ], "groente.jpeg");

  const brood = maakGroep("brood", "Brood en gebak", [
    "Pumpernikkel (Mestemacher)",
    "Toastbrood",
    "Sernik krakowski (kwarktaart)",
    "Jabłecznik (appeltaart)",
  ], "brood.jpeg");

  const snoep = maakGroep("snoep", "Snoep, koek en chips", [
    "Prince Polo",
    "Ptasie Mleczko",
    "Delicje",
    "Michałki",
    "Chipsy wiejskie",
    "Paluszki (zoute sticks)",
  ], "snoep.jpeg");

  // Dranken: GEEN aanbiedingen (eerst de regels voor alcoholreclame controleren)
  const dranken = maakGroep("dranken", "Dranken", [
    "Tymbark (fruitdrank)",
    "Kubuś sap",
    "Berkensap",
    "Energiedrank",
  ]);

  const potten = maakGroep("potten", "Potten en conserven", [
    "Ogórki kiszone (zuurkool-augurken)",
    "Kapusta kiszona (zuurkool)",
    "Buraczki (rode bieten)",
    "Śledź w oleju (haring)",
    "Miód (honing)",
    "Powidła śliwkowe (pruimenjam)",
  ]);

  const pierogi = maakGroep("pierogi", "Pierogi en kant-en-klaar", [
    "Pierogi ruskie",
    "Pierogi z mięsem",
    "Pierogi z kapustą i grzybami",
    "Pierogi z jagodami",
    "Gołąbki",
    "Placki ziemniaczane",
  ]);

  // VOORBEELD-aanbiedingen om de strook te testen (nog niet echt!).
  // Alleen groepen met een foto, anders heeft de kaart geen plaatje.
  vlees.geefProducten()[0].inAanbieding = true;
  groente.geefProducten()[0].inAanbieding = true;
  brood.geefProducten()[2].inAanbieding = true;
  snoep.geefProducten()[0].inAanbieding = true;

  winkel.voegCategorieToe(vlees);
  winkel.voegCategorieToe(zuivel);
  winkel.voegCategorieToe(groente);
  winkel.voegCategorieToe(brood);
  winkel.voegCategorieToe(snoep);
  winkel.voegCategorieToe(dranken);
  winkel.voegCategorieToe(potten);
  winkel.voegCategorieToe(pierogi);

  return winkel;
}