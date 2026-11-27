// ========================
// MENU A SCOMPARSA (☰) PER SMARTPHONE
// Sugli schermi stretti le voci del menu sono nascoste dentro il pulsante ☰.
// Il menu si chiude toccando una voce, toccando fuori o premendo Esc.
// ========================

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  const pulsante = document.querySelector(".menu-toggle");
  const menu = document.getElementById("menu-principale");
  if (!header || !pulsante || !menu) return;

  function apriChiudi(aperto) {
    header.classList.toggle("menu-aperto", aperto);
    pulsante.setAttribute("aria-expanded", aperto);
  }

  pulsante.addEventListener("click", () => {
    apriChiudi(!header.classList.contains("menu-aperto"));
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => apriChiudi(false));
  });

  document.addEventListener("click", (e) => {
    if (!header.contains(e.target)) apriChiudi(false);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") apriChiudi(false);
  });
});
