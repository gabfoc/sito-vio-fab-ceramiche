// ========================
// CARICAMENTO GALLERIA
// ========================

let opere = []; // dati letti da ceramiche.json, riusati quando cambia la lingua

async function caricaGalleria() {
  try {
    const response = await fetch("ceramiche.json");
    const dati = await response.json();
    opere = dati.opere;
    disegnaGalleria();
  } catch (errore) {
    console.error("Errore nel caricamento delle opere:", errore);
  }
}

// Crea le card nella lingua corrente (t e campoOpera arrivano da lingua.js)
function disegnaGalleria() {
  const griglia = document.getElementById("gallery-grid");
  griglia.innerHTML = "";

  opere.forEach((opera) => {
    const titolo = campoOpera(opera, "titolo");
    const materiale = campoOpera(opera, "materiale");
    const prezzo = campoOpera(opera, "prezzo");

    // Ogni card è un link alla pagina di dettaglio dell'opera
    const card = document.createElement("a");
    card.classList.add("card");
    card.href = `opera.html?id=${opera.id}`;

    // La prima foto dell'elenco fa da copertina
    const copertina = opera.immagini && opera.immagini.length
      ? encodeURI(opera.immagini[0])
      : "";

    // Etichetta solo per le opere segnate "disponibile": false nel JSON
    const etichetta = opera.disponibile === false
      ? `<span class="badge-non-disponibile">${t("opere.nonDisponibile")}</span>`
      : "";

    card.innerHTML = `
      ${etichetta}
      <img src="${copertina}" alt="${titolo}" loading="lazy" onerror="this.onerror=null; this.style.visibility='hidden'" />
      <div class="card-info">
        <h3>${titolo}</h3>
        <p>${materiale}</p>
        ${prezzo ? `<p class="prezzo">${prezzo}</p>` : ""}
      </div>
    `;

    griglia.appendChild(card);
  });
}

// ========================
// NAVIGAZIONE — EVIDENZIA SEZIONE ATTIVA
// ========================

function evidenziaNavAttiva() {
  const sezioni = document.querySelectorAll("section");
  const voci = document.querySelectorAll("nav ul a");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          voci.forEach((voce) => voce.classList.remove("attiva"));
          const voceAttiva = document.querySelector(
            `nav ul a[href="#${entry.target.id}"]`
          );
          if (voceAttiva) voceAttiva.classList.add("attiva");
        }
      });
    },
    { threshold: 0.4 }
  );

  sezioni.forEach((sezione) => observer.observe(sezione));
}

// ========================
// AVVIO
// ========================

document.addEventListener("DOMContentLoaded", () => {
  caricaGalleria();
  evidenziaNavAttiva();
});

document.addEventListener("linguacambiata", disegnaGalleria);
