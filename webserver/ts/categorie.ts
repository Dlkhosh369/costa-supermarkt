// ===== 1. Class Product: één product in de winkel =====
class Product {
  constructor(
    public naam: string,
    public prijs: number,
    public groep: string,
    public foto?: string // bestandsnaam in de map img, bijvoorbeeld "brood.jpeg"
  ) {}

  // Maakt van 1.5 de tekst "€ 1,50"
  prijsTekst(): string {
    return this.prijs.toLocaleString("nl-NL", {
      style: "currency",
      currency: "EUR",
    });
  }

  // Maakt de kaart die de klant op de pagina ziet
  maakKaart(): HTMLElement {
    const kaart = document.createElement("article");
    kaart.className = "product";

    // De foto is optioneel: alleen tonen als er een is
    if (this.foto) {
      const afbeelding = document.createElement("img");
      afbeelding.className = "product-img";
      afbeelding.src = "../img/" + this.foto;
      afbeelding.alt = this.naam;
      afbeelding.loading = "lazy";
      kaart.append(afbeelding);
    }

    const info = document.createElement("div");
    info.className = "product-info";

    const naam = document.createElement("h3");
    naam.textContent = this.naam;

    const prijs = document.createElement("p");
    prijs.className = "product-price";
    prijs.textContent = this.prijsTekst();

    info.append(naam, prijs);
    kaart.append(info);
    return kaart;
  }
}

// ===== 2. Class Categorie: een groep met producten =====
class Categorie {
  private producten: Product[] = [];

  constructor(
    public sleutel: string, // zoals in de link: "brood"
    public titel: string // zoals de klant het leest: "Brood"
  ) {}

  voegToe(product: Product): void {
    this.producten.push(product);
  }

  geefProducten(): Product[] {
    return this.producten;
  }
}

// ===== 3. Class Winkel: kent alle categorieën =====
class Winkel {
  private categorieen: Categorie[] = [];

  voegCategorieToe(categorie: Categorie): void {
    this.categorieen.push(categorie);
  }

  zoekCategorie(sleutel: string): Categorie | undefined {
    return this.categorieen.find((c) => c.sleutel === sleutel);
  }
}

// ===== 4. Class CategoriePagina: zet alles op het scherm =====
class CategoriePagina {
  constructor(
    private winkel: Winkel,
    private titelElement: HTMLElement,
    private lijstElement: HTMLElement
  ) {}

  toon(sleutel: string | null): void {
    const categorie = sleutel ? this.winkel.zoekCategorie(sleutel) : undefined;

    // Onbekende groep: laat een nette melding zien
    if (!categorie) {
      this.titelElement.textContent = "Groep niet gevonden";
      this.lijstElement.replaceChildren();
      return;
    }

    this.titelElement.textContent = categorie.titel;

    // Eerst de tijdelijke kaarten weghalen, dan de echte neerzetten
    this.lijstElement.replaceChildren();
    for (const product of categorie.geefProducten()) {
      this.lijstElement.append(product.maakKaart());
    }
  }
}

// ===== 5. De gegevens (TIJDELIJK: voorbeeldproducten) =====
// Let op: dit zijn verzonnen namen en prijzen om te testen.
// De echte producten en prijzen komen na het gesprek met de eigenaren.
function maakWinkel(): Winkel {
  const winkel = new Winkel();

  const brood = new Categorie("brood", "Brood");
  brood.voegToe(new Product("Voorbeeld brood 1", 2.5, "brood", "brood.jpeg"));
  brood.voegToe(new Product("Voorbeeld brood 2", 3.0, "brood", "brood.jpeg"));

  const vlees = new Categorie("vlees", "Vlees");
  vlees.voegToe(new Product("Voorbeeld vlees 1", 4.99, "vlees", "vlees.jpeg"));
  vlees.voegToe(new Product("Voorbeeld vlees 2", 6.5, "vlees", "vlees.jpeg"));

  const groente = new Categorie("groente", "Groente en fruit");
  groente.voegToe(new Product("Voorbeeld groente 1", 1.25, "groente", "groente.jpeg"));
  groente.voegToe(new Product("Voorbeeld fruit 1", 2.0, "groente", "groente.jpeg"));

  const snoep = new Categorie("snoep", "Snoep");
  snoep.voegToe(new Product("Voorbeeld snoep 1", 1.5, "snoep", "snoep.jpeg"));
  snoep.voegToe(new Product("Voorbeeld snoep 2", 2.75, "snoep", "snoep.jpeg"));

  winkel.voegCategorieToe(brood);
  winkel.voegCategorieToe(vlees);
  winkel.voegCategorieToe(groente);
  winkel.voegCategorieToe(snoep);

  return winkel;
}

// ===== 6. Starten =====
const params = new URLSearchParams(window.location.search);
const groep = params.get("groep");

const titelElement = document.getElementById("categorie-titel");
const lijstElement = document.getElementById("product-lijst");

if (titelElement && lijstElement) {
  const pagina = new CategoriePagina(maakWinkel(), titelElement, lijstElement);
  pagina.toon(groep);
}