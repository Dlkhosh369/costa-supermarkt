// De repository is de enige plek die met de database praat.
// De rest van de code vraagt alleen: "geef me de producten".

import { db } from "../database/db";
import { Categorie } from "../models/Categorie";
import { Product } from "../models/Product";

// Zo ziet een rij uit de database eruit
interface CategorieRij {
  sleutel: string;
  titel: string;
}

interface ProductRij {
  naam: string;
  groep: string;
  foto: string | null;
  prijs_in_centen: number | null;
}

export class WinkelRepository {
  geefCategorieen(): Categorie[] {
    const rijen = db
      .prepare("SELECT sleutel, titel FROM categorieen ORDER BY id")
      .all() as unknown as CategorieRij[];

    return rijen.map((rij) => new Categorie(rij.sleutel, rij.titel));
  }

  geefProducten(groep?: string): Product[] {
    let sql = `
      SELECT p.naam, c.sleutel AS groep, p.foto, p.prijs_in_centen
      FROM producten p
      JOIN categorieen c ON c.id = p.categorie_id
      WHERE p.actief = 1
    `;
    const waarden: string[] = [];

    if (groep !== undefined) {
      sql += " AND c.sleutel = ?";
      waarden.push(groep); // het ? voorkomt SQL-injectie
    }

    sql += " ORDER BY p.id";

    const rijen = db.prepare(sql).all(...waarden) as unknown as ProductRij[];

    return rijen.map(
      (rij) => new Product(rij.naam, rij.groep, rij.foto, rij.prijs_in_centen)
    );
  }
}