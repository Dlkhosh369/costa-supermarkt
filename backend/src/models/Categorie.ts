export class Categorie {
  sleutel: string; // het woord in de URL, bijvoorbeeld "zuivel"
  titel: string; // wat de bezoeker ziet, bijvoorbeeld "Zuivel en kaas"

  constructor(sleutel: string, titel: string) {
    this.sleutel = sleutel;
    this.titel = titel;
  }
}