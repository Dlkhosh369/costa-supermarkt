// De kaart mag alleen van Google Maps komen
const TOEGESTAANDE_URL = "https://www.google.com/maps/embed";

// ===== Class KaartLader: laadt de kaart pas als de bezoeker op de knop klikt =====
class KaartLader {
  constructor(
    private vak: HTMLElement,
    private knop: HTMLButtonElement
  ) {}

  start(): void {
    this.knop.addEventListener("click", () => this.laad());
  }

  private laad(): void {
    const url = this.vak.dataset.url;

    // Veiligheid: laad alleen een kaart van Google Maps
    if (!url || !url.startsWith(TOEGESTAANDE_URL)) {
      return;
    }

    const kaart = document.createElement("iframe");
    kaart.className = "map";
    kaart.title = "Kaart: COSTA Supermarket, Meeuwenlaan 102";
    kaart.src = url;
    kaart.loading = "lazy";
    kaart.referrerPolicy = "strict-origin-when-cross-origin";
    kaart.allowFullscreen = true;

    this.vak.replaceChildren(kaart);
  }
}

// ===== Starten =====
const vak = document.getElementById("kaart-vak");
const knop = document.getElementById("kaart-knop");

if (vak && knop instanceof HTMLButtonElement) {
  new KaartLader(vak, knop).start();
}