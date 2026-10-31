import { maakWinkel } from "./winkel.js";
// ===== Class AanbiedingenStrook: de bewegende aanbiedingen op de homepage =====
class AanbiedingenStrook {
    constructor(winkel, spoorElement) {
        this.winkel = winkel;
        this.spoorElement = spoorElement;
    }
    toon() {
        const aanbiedingen = this.winkel.geefAanbiedingen();
        this.spoorElement.replaceChildren();
        // Twee keer dezelfde kaarten, zodat de animatie zonder gat doorloopt.
        // De tweede reeks is alleen voor de animatie, niet voor schermlezers.
        for (const aanbieding of aanbiedingen) {
            this.spoorElement.append(this.maakKaart(aanbieding, false));
        }
        for (const aanbieding of aanbiedingen) {
            this.spoorElement.append(this.maakKaart(aanbieding, true));
        }
    }
    maakKaart(aanbieding, kopie) {
        const { product, categorieTitel } = aanbieding;
        // De hele kaart is een link naar de pagina van de groep
        const kaart = document.createElement("a");
        kaart.className = "offer";
        kaart.href = "categorie.html?groep=" + encodeURIComponent(product.groep);
        // De kopie is alleen voor de animatie: verberg hem voor schermlezers
        // en sla hem over als iemand met de Tab-toets door de pagina gaat.
        if (kopie) {
            kaart.setAttribute("aria-hidden", "true");
            kaart.tabIndex = -1;
        }
        if (product.foto) {
            const afbeelding = document.createElement("img");
            afbeelding.className = "offer-img";
            afbeelding.src = "../img/" + product.foto;
            afbeelding.alt = kopie ? "" : product.naam;
            kaart.append(afbeelding);
        }
        const info = document.createElement("div");
        info.className = "offer-info";
        const label = document.createElement("span");
        label.className = "offer-badge";
        label.textContent = "Aanbieding";
        const categorie = document.createElement("p");
        categorie.className = "offer-category";
        categorie.textContent = categorieTitel;
        const naam = document.createElement("h3");
        naam.textContent = product.naam;
        const prijs = document.createElement("p");
        prijs.className = "offer-price";
        prijs.textContent = product.prijsTekst();
        info.append(label, categorie, naam, prijs);
        kaart.append(info);
        return kaart;
    }
}
// ===== Starten =====
const spoorElement = document.getElementById("aanbiedingen-lijst");
if (spoorElement) {
    new AanbiedingenStrook(maakWinkel(), spoorElement).toon();
}
