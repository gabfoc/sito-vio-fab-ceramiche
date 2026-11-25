// ========================
// PAGINA DETTAGLIO OPERA
// Legge l'id dall'indirizzo (opera.html?id=1) e mostra l'opera corrispondente
// t e campoOpera arrivano da lingua.js
// ========================

let operaCorrente = null; // riusata quando cambia la lingua

async function caricaOpera() {
  const id = Number(new URLSearchParams(window.location.search).get("id"));

  try {
    const response = await fetch("ceramiche.json");
    const dati = await response.json();
    operaCorrente = dati.opere.find((o) => o.id === id) || null;

    if (!operaCorrente) {
      document.querySelector(".dettaglio-foto").style.display = "none";
      document.querySelector(".dettaglio-info .bottone").style.display = "none";
    } else {
      mostraFoto(operaCorrente);
    }
    mostraTesti();
  } catch (errore) {
    console.error("Errore nel caricamento dell'opera:", errore);
  }
}

// Testi dell'opera nella lingua corrente
function mostraTesti() {
  const titoloEl = document.getElementById("opera-titolo");

  if (!operaCorrente) {
    titoloEl.textContent = t("opera.nonTrovata");
    return;
  }

  const titolo = campoOpera(operaCorrente, "titolo");
  document.title = `${titolo} — Viola Fabiani Ceramiche`;
  titoloEl.textContent = titolo;
  document.getElementById("opera-materiale").textContent = campoOpera(operaCorrente, "materiale") || "";
  document.getElementById("opera-descrizione").textContent = campoOpera(operaCorrente, "descrizione") || "";
  document.getElementById("opera-prezzo").textContent = campoOpera(operaCorrente, "prezzo") || "";

  // Testi alternativi delle foto
  document.getElementById("foto-principale").alt = titolo;
  document.querySelectorAll("#miniature img").forEach((mini, i) => {
    mini.alt = `${titolo} — ${t("opera.foto")} ${i + 1}`;
  });
}

// Foto grande + miniature cliccabili per cambiarla
function mostraFoto(opera) {
  const principale = document.getElementById("foto-principale");
  const contenitore = document.getElementById("miniature");
  const immagini = (opera.immagini || []).map((src) => encodeURI(src));

  if (!immagini.length) return;

  principale.src = immagini[0];

  // Con una sola foto non servono le miniature
  if (immagini.length < 2) return;

  immagini.forEach((src, i) => {
    const mini = document.createElement("img");
    mini.src = src;
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
document.addEventListener("linguacambiata", mostraTesti);
