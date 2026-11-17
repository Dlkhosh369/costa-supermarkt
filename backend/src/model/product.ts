export class Product {
  naam: string;
  groep: string;
  prijsInCenten: number | null; // null = nog geen prijs bekend

  constructor(naam: string, groep: string, prijsInCenten: number | null = null) {
    this.naam = naam;
    this.groep = groep;
    this.prijsInCenten = prijsInCenten;
  }
}