// Tijdelijke plek voor de gegevens van de winkel.
// Later komen ze uit een database en vult de eigenaar ze in de administratie.
// Prijzen staan er nog niet in: die zijn nog niet bekend.

import { Categorie } from "../models/Categorie";
import { Product } from "../models/Product";

export const categorieen: Categorie[] = [
  new Categorie("vlees", "Vlees en vleeswaren"),
  new Categorie("zuivel", "Zuivel en kaas"),
  new Categorie("groente", "Groente en fruit"),
  new Categorie("brood", "Brood en gebak"),
  new Categorie("snoep", "Snoep, koek en chips"),
  new Categorie("dranken", "Dranken"),
  new Categorie("potten", "Potten en conserven"),
  new Categorie("pierogi", "Pierogi en kant-en-klaar"),
];

// Maakt van een lijst namen een lijst Product-objecten voor één groep
function maakProducten(groep: string, foto: string, namen: string[]): Product[] {
  return namen.map((naam) => new Product(naam, groep, foto));
}

export const producten: Product[] = [
  ...maakProducten("vlees", "vlees.jpeg", [
    "Kiełbasa śląska",
    "Kiełbasa toruńska",
    "Kabanosy",
    "Szynka sołtysowa",
    "Polędwica sopocka",
    "Parówki z szynki",
  ]),
  ...maakProducten("zuivel", "zuivel.png", [
    "Twaróg półtłusty (kwark)",
    "Śmietana 18% (zure room)",
    "Kefir 1 l",
    "Serek wiejski (hüttenkäse)",
    "Ser królewski (kaas)",
    "Maślanka (karnemelk)",
  ]),
  ...maakProducten("groente", "groente.jpeg", [
    "Malinowe tomaten",
    "Poolse aardappelen 2,5 kg",
    "Rode biet",
    "Wortel",
    "Appels",
    "Peren (Conference)",
  ]),
  ...maakProducten("brood", "brood.jpeg", [
    "Pumpernikkel (Mestemacher)",
    "Toastbrood",
    "Sernik krakowski (kwarktaart)",
    "Jabłecznik (appeltaart)",
  ]),
  ...maakProducten("snoep", "snoep.jpeg", [
    "Prince Polo",
    "Ptasie Mleczko",
    "Delicje",
    "Michałki",
    "Chipsy wiejskie",
    "Paluszki (zoute sticks)",
  ]),
  ...maakProducten("dranken", "dranken.png", [
    "Tymbark (fruitdrank)",
    "Kubuś sap",
    "Berkensap",
    "Energiedrank",
  ]),
  ...maakProducten("potten", "potten.png", [
    "Ogórki kiszone (zuurkool-augurken)",
    "Kapusta kiszona (zuurkool)",
    "Buraczki (rode bieten)",
    "Śledź w oleju (haring)",
    "Miód (honing)",
    "Powidła śliwkowe (pruimenjam)",
  ]),
  ...maakProducten("pierogi", "pierogi.png", [
    "Pierogi ruskie",
    "Pierogi z mięsem",
    "Pierogi z kapustą i grzybami",
    "Pierogi z jagodami",
    "Gołąbki",
    "Placki ziemniaczane",
  ]),
];