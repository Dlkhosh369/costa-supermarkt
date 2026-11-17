export class Product {
  naam: string;
  groep: string;
  foto: string | null; // naam van het fotobestand, null = nog geen foto
  prijsInCenten: number | null; // null = nog geen prijs bekend

  constructor(
    naam: string,
    groep: string,
    foto: string | null = null,
    prijsInCenten: number | null = null
  ) {
    this.naam = naam;
    this.groep = groep;
    this.foto = foto;
    this.prijsInCenten = prijsInCenten;
  }
}