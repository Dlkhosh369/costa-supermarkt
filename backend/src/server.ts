import express from "express";
import cors from "cors";
import { vulDatabase } from "./database/seed";
import { WinkelRepository } from "./repositories/WinkelRepository";

vulDatabase(); // maakt de database aan en vult hem de eerste keer

const winkel = new WinkelRepository();
const app = express();

// Alleen onze eigen website (Live Server) mag met de backend praten
app.use(
  cors({
    origin: ["http://127.0.0.1:5500", "http://localhost:5500"],
  })
);

// Test: leeft de server?
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Alle productgroepen
app.get("/api/categorieen", (req, res) => {
  res.json(winkel.geefCategorieen());
});

// Alle producten, of alleen die van één groep: /api/producten?groep=zuivel
app.get("/api/producten", (req, res) => {
  const groep = req.query.groep;

  if (typeof groep === "string") {
    res.json(winkel.geefProducten(groep));
    return;
  }

  res.json(winkel.geefProducten());
});

const PORT = 3000;

app.listen(PORT, (error) => {
  if (error) {
    console.error("Server kon niet starten:", error.message);
    return;
  }
  console.log(`Server draait op http://localhost:${PORT}`);
});