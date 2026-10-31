// ===== Class Product: één product in de winkel =====
export class Product {
    constructor(naam, prijs, groep, foto, // bestandsnaam in de map img, bijvoorbeeld "brood.jpeg"
    inAanbieding = false) {
        this.naam = naam;
        this.prijs = prijs;
        this.groep = groep;
        this.foto = foto;
        this.inAanbieding = inAanbieding;
    }
    // Maakt van 1.5 de tekst "€ 1,50"
    prijsTekst() {
        return this.prijs.toLocaleString("nl-NL", {
            style: "currency",
            currency: "EUR",
        });
    }
    // Kaart voor de categoriepagina
    maakKaart() {
        const kaart = document.createElement("article");
        kaart.className = "product";
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
// ===== Class Categorie: een groep met producten =====
export class Categorie {
    constructor(sleutel, // zoals in de link: "brood"
    titel // zoals de klant het leest: "Brood"
    ) {
        this.sleutel = sleutel;
        this.titel = titel;
        this.producten = [];
    }
    voegToe(product) {
        this.producten.push(product);
    }
    geefProducten() {
        return this.producten;
    }
}
// ===== Class Winkel: kent alle categorieën =====
export class Winkel {
    constructor() {
        this.categorieen = [];
    }
    voegCategorieToe(categorie) {
        this.categorieen.push(categorie);
    }
    zoekCategorie(sleutel) {
        return this.categorieen.find((c) => c.sleutel === sleutel);
    }
    // Alle producten die in de aanbieding zijn, uit alle groepen
    geefAanbiedingen() {
        const resultaat = [];
        for (const categorie of this.categorieen) {
            for (const product of categorie.geefProducten()) {
                if (product.inAanbieding) {
                    resultaat.push({ product, categorieTitel: categorie.titel });
                }
            }
        }
        return resultaat;
    }
}
// ===== De gegevens (TIJDELIJK: voorbeeldproducten) =====
// Let op: dit zijn verzonnen namen en prijzen om te testen.
// Later komen ze uit de database van de administratie.
export function maakWinkel() {
    const winkel = new Winkel();
    const brood = new Categorie("brood", "Brood");
    brood.voegToe(new Product("Voorbeeld brood 1", 2.5, "brood", "brood.jpeg", true));
    brood.voegToe(new Product("Voorbeeld brood 2", 3.0, "brood", "brood.jpeg"));
    const vlees = new Categorie("vlees", "Vlees");
    vlees.voegToe(new Product("Voorbeeld vlees 1", 4.99, "vlees", "vlees.jpeg", true));
    vlees.voegToe(new Product("Voorbeeld vlees 2", 6.5, "vlees", "vlees.jpeg"));
    const groente = new Categorie("groente", "Groente en fruit");
    groente.voegToe(new Product("Voorbeeld groente 1", 1.25, "groente", "groente.jpeg", true));
    groente.voegToe(new Product("Voorbeeld fruit 1", 2.0, "groente", "groente.jpeg"));
    const snoep = new Categorie("snoep", "Snoep");
    snoep.voegToe(new Product("Voorbeeld snoep 1", 1.5, "snoep", "snoep.jpeg", true));
    snoep.voegToe(new Product("Voorbeeld snoep 2", 2.75, "snoep", "snoep.jpeg"));
    winkel.voegCategorieToe(brood);
    winkel.voegCategorieToe(vlees);
    winkel.voegCategorieToe(groente);
    winkel.voegCategorieToe(snoep);
    return winkel;
}
