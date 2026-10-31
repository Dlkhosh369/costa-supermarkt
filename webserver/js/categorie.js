import { maakWinkel } from "./winkel.js";
// ===== Class CategoriePagina: zet de producten van één groep op het scherm =====
class CategoriePagina {
    constructor(winkel, titelElement, lijstElement) {
        this.winkel = winkel;
        this.titelElement = titelElement;
        this.lijstElement = lijstElement;
    }
    toon(sleutel) {
        const categorie = sleutel ? this.winkel.zoekCategorie(sleutel) : undefined;
        // Onbekende groep: laat een nette melding zien
        if (!categorie) {
            this.titelElement.textContent = "Groep niet gevonden";
            this.lijstElement.replaceChildren();
            return;
        }
        this.titelElement.textContent = categorie.titel;
        this.lijstElement.replaceChildren();
        for (const product of categorie.geefProducten()) {
            this.lijstElement.append(product.maakKaart());
        }
    }
}
// ===== Starten =====
const params = new URLSearchParams(window.location.search);
const groep = params.get("groep");
const titelElement = document.getElementById("categorie-titel");
const lijstElement = document.getElementById("product-lijst");
if (titelElement && lijstElement) {
    const pagina = new CategoriePagina(maakWinkel(), titelElement, lijstElement);
    pagina.toon(groep);
}
