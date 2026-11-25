// ========================
// CARICAMENTO GALLERIA
// ========================

async function caricaGalleria() {
  try {
    const response = await fetch("ceramiche.json");
    const dati = await response.json();
    const griglia = document.getElementById("gallery-grid");

    dati.opere.forEach((opera) => {
      // Ogni card è un link alla pagina di dettaglio dell'opera
      const card = document.createElement("a");
      card.classList.add("card");
      card.href = `opera.html?id=${opera.id}`;

      // La prima foto dell'elenco fa da copertina
      const copertina = opera.immagini && opera.immagini.length
        ? encodeURI(opera.immagini[0])
        : "img/placeholder.jpg";

      // Etichetta solo per le opere segnate "disponibile": false nel JSON
      const etichetta = opera.disponibile === false
        ? `<span class="badge-non-disponibile">Non disponibile</span>`
        : "";

      card.innerHTML = `
        ${etichetta}
        <img src="${copertina}" alt="${opera.titolo}" loading="lazy" onerror="this.src='img/placeholder.jpg'" />
        <div class="card-info">
          <h3>${opera.titolo}</h3>
          <p>${opera.materiale}</p>
          ${opera.prezzo ? `<p class="prezzo">${opera.prezzo}</p>` : ""}
        </div>
      `;

      griglia.appendChild(card);
    });

  } catch (errore) {
    console.error("Errore nel caricamento delle opere:", errore);
  }
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