import { DatabaseSync } from "node:sqlite";
import fs from "node:fs";
import path from "node:path";

// De database is één bestand: backend/data/costa.db
// (__dirname is hier backend/dist/database, dus twee mappen omhoog)
const mapMetData = path.join(__dirname, "..", "..", "data");
fs.mkdirSync(mapMetData, { recursive: true });

export const db = new DatabaseSync(path.join(mapMetData, "costa.db"));

// Maak de tabellen aan als ze er nog niet zijn
db.exec(`
  CREATE TABLE IF NOT EXISTS categorieen (
    id      INTEGER PRIMARY KEY AUTOINCREMENT,
    sleutel TEXT NOT NULL UNIQUE,
    titel   TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS producten (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    naam            TEXT NOT NULL,
    categorie_id    INTEGER NOT NULL REFERENCES categorieen(id),
    prijs_in_centen INTEGER,
    foto            TEXT,
    in_aanbieding   INTEGER NOT NULL DEFAULT 0,
    actief          INTEGER NOT NULL DEFAULT 1
  );
`);