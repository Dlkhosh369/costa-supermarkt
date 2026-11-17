// categorie.ts
// De categoriepagina haalt titel en producten op bij de backend.

const API_URL = "http://localhost:3000";

// Zo ziet de data eruit die de backend teruggeeft
interface CategorieData {
  sleutel: string;
  titel: string;
}

interface ProductData {
  naam: string;
  groep: string;
  foto: string | null;
  prijsInCenten: number | null;
}

class CategoriePagina {
  private titelElement: HTMLElement;
  private lijstElement: HTMLElement;

  constructor(titelElement: HTMLElement, lijstElement: HTMLElement) {
    this.titelElement = titelElement;
    this.lijstElement = lijstElement;
  }

  async toon(sleutel: string): Promise<void> {
    try {
      const categorieen = await this.haalOp<CategorieData[]>("/api/categorieen");
      const categorie = categorieen.find((c) => c.sleutel === sleutel);

      if (!categorie) {
        this.titelElement.textContent = "Groep niet gevonden";
        this.lijstElement.replaceChildren();
        return;
      }

      this.titelElement.textContent = categorie.titel;

      const producten = await this.haalOp<ProductData[]>(
        "/api/producten?groep=" + encodeURIComponent(sleutel)
      );

      this.lijstElement.replaceChildren();
      for (const product of producten) {
        this.lijstElement.appendChild(this.maakKaart(product));
      }
    } catch {
      this.toonFout();
    }
  }

  // Vraagt iets op bij de backend en geeft het antwoord terug
  private async haalOp<T>(pad: string): Promise<T> {
    const antwoord = await fetch(API_URL + pad);
    if (!antwoord.ok) {
      throw new Error("De server antwoordde met status " + antwoord.status);
    }
    return (await antwoord.json()) as T;
  }

  // Maakt één productkaart (veilig: textContent, geen innerHTML)
  private maakKaart(product: ProductData): HTMLElement {
    const kaart = document.createElement("article");
    kaart.className = "product";

    if (product.foto) {
      const img = document.createElement("img");
      img.className = "product-img";
      img.src = "../img/" + product.foto;
      img.alt = product.naam;
      kaart.appendChild(img);
    }

    const info = document.createElement("div");
    info.className = "product-info";

    const titel = document.createElement("h3");
    titel.textContent = product.naam;

    const prijs = document.createElement("p");
    prijs.className = "product-price";
    prijs.textContent = this.prijsTekst(product.prijsInCenten);

    info.appendChild(titel);
    info.appendChild(prijs);
    kaart.appendChild(info);
    return kaart;
  }

  // 250 centen wordt "€ 2,50". Zonder prijs: "Prijs in de winkel"
  private prijsTekst(prijsInCenten: number | null): string {
    if (prijsInCenten === null) {
      return "Prijs in de winkel";
    }
    return (prijsInCenten / 100).toLocaleString("nl-NL", {
      style: "currency",
      currency: "EUR",
    });
  }

  private toonFout(): void {
    this.titelElement.textContent = "Producten";
    this.lijstElement.replaceChildren();
    const bericht = document.createElement("p");
    bericht.textContent =
      "De producten konden niet geladen worden. Probeer het later opnieuw.";
    this.lijstElement.appendChild(bericht);
  }
}

// ---------- Starten ----------
const titelElement = document.getElementById("categorie-titel");
const lijstElement = document.getElementById("product-lijst");

if (titelElement && lijstElement) {
  const sleutel = new URLSearchParams(window.location.search).get("groep") ?? "";
  const pagina = new CategoriePagina(titelElement, lijstElement);
  pagina.toon(sleutel);
}

export {};