// ========================
// PAGINA DETTAGLIO OPERA
// Legge l'id dall'indirizzo (opera.html?id=1) e mostra l'opera corrispondente
// ========================

async function caricaOpera() {
  const id = Number(new URLSearchParams(window.location.search).get("id"));

  try {
    const response = await fetch("ceramiche.json");
    const dati = await response.json();
    const opera = dati.opere.find((o) => o.id === id);

    if (!opera) {
      document.getElementById("opera-titolo").textContent = "Opera non trovata";
      document.querySelector(".dettaglio-foto").style.display = "none";
      document.querySelector(".dettaglio-info .bottone").style.display = "none";
      return;
    }

    document.title = `${opera.titolo} — Viola Fabiani Ceramiche`;
    document.getElementById("opera-titolo").textContent = opera.titolo;
    document.getElementById("opera-materiale").textContent = opera.materiale || "";
    document.getElementById("opera-descrizione").textContent = opera.descrizione || "";
    document.getElementById("opera-prezzo").textContent = opera.prezzo || "";

    mostraFoto(opera);
  } catch (errore) {
    console.error("Errore nel caricamento dell'opera:", errore);
  }
}

// Foto grande + miniature cliccabili per cambiarla
function mostraFoto(opera) {
  const principale = document.getElementById("foto-principale");
  const contenitore = document.getElementById("miniature");
  const immagini = (opera.immagini || []).map((src) => encodeURI(src));

  if (!immagini.length) return;

  principale.src = immagini[0];
  principale.alt = opera.titolo;

  // Con una sola foto non servono le miniature
  if (immagini.length < 2) return;

  immagini.forEach((src, i) => {
    const mini = document.createElement("img");
    mini.src = src;
    mini.alt = `${opera.titolo} — foto ${i + 1}`;
    mini.loading = "lazy";
    if (i === 0) mini.classList.add("selezionata");

    mini.addEventListener("click", () => {
      principale.src = src;
      contenitore.querySelectorAll("img").forEach((m) => m.classList.remove("selezionata"));
      mini.classList.add("selezionata");
    });

    contenitore.appendChild(mini);
  });
}

document.addEventListener("DOMContentLoaded", caricaOpera);
