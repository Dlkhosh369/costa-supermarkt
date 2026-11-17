// Zet de beginwaarden uit winkelData.ts in de database.
// Dit gebeurt alleen als de database nog leeg is.
// Later voegen de eigenaren producten toe in de administratie.

import { db } from "./db";
import { categorieen, producten } from "../data/winkelData";

export function vulDatabase(): void {
  const telling = db.prepare("SELECT COUNT(*) AS aantal FROM categorieen").get();

  if (Number(telling?.aantal) > 0) {
    return; // er staan al gegevens in, niks doen
  }

  const voegCategorieToe = db.prepare(
    "INSERT INTO categorieen (sleutel, titel) VALUES (?, ?)"
  );
  const zoekCategorie = db.prepare("SELECT id FROM categorieen WHERE sleutel = ?");
  const voegProductToe = db.prepare(
    "INSERT INTO producten (naam, categorie_id, prijs_in_centen, foto) VALUES (?, ?, ?, ?)"
  );

  for (const categorie of categorieen) {
    voegCategorieToe.run(categorie.sleutel, categorie.titel);
  }

  for (const product of producten) {
    const rij = zoekCategorie.get(product.groep);
    voegProductToe.run(
      product.naam,
      Number(rij?.id),
      product.prijsInCenten,
      product.foto
    );
  }

  console.log("Database gevuld met de beginwaarden.");
}