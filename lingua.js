// ========================
// GESTIONE LINGUA (italiano / inglese)
// - I testi fissi delle pagine hanno l'attributo data-i18n="chiave"
//   (o data-i18n-placeholder per i campi del modulo)
// - I testi delle opere in inglese stanno in ceramiche.json, dentro "en"
// - La lingua scelta viene ricordata tra pagine e visite
// Per aggiungere una lingua: nuovo blocco in TRADUZIONI + pulsante nel menu
// ========================

const LINGUA_PRINCIPALE = "it";

const TRADUZIONI = {
  it: {
    "nav.home": "Home",
    "nav.chiSono": "Chi sono",
    "nav.opere": "Opere",
    "nav.contatti": "Contatti",

    "hero.sottotitolo": "Ceramiche artigianali realizzate a mano",

    "chiSono.titolo": "Chi sono",
    "chiSono.p1":
      "Sono Viola Fabiani e lavoro la ceramica a mano nel mio laboratorio. Ogni pezzo nasce al tornio o modellato a mano, poi viene smaltato e cotto in piccole serie: per questo non esistono due oggetti identici.",
    "chiSono.p2":
      "Realizzo soprattutto oggetti d'uso quotidiano — tazze, ciotole, piatti e vasi — con forme semplici e smalti dai toni naturali, pensati per durare e per essere usati ogni giorno.",

    "opere.titolo": "Opere",
    "opere.nonDisponibile": "Non disponibile",

    "contatti.titolo": "Contatti",
    "contatti.telefono": "Telefono:",
    "form.nome": "Il tuo nome",
    "form.email": "La tua email",
    "form.messaggio": "Il tuo messaggio",
    "form.invia": "Invia",

    "footer.diritti": "© 2026 Viola Fabiani — tutti i diritti riservati",

    "opera.tutte": "← Tutte le opere",
    "opera.contattami": "Per info contattami",
    "opera.nonTrovata": "Opera non trovata",
    "opera.foto": "foto",
  },

  en: {
    "nav.home": "Home",
    "nav.chiSono": "About",
    "nav.opere": "Works",
    "nav.contatti": "Contact",

    "hero.sottotitolo": "Handmade artisan ceramics",

    "chiSono.titolo": "About me",
    "chiSono.p1":
      "I'm Viola Fabiani and I make ceramics by hand in my studio. Every piece is thrown on the wheel or hand-built, then glazed and fired in small batches: that's why no two pieces are ever the same.",
    "chiSono.p2":
      "I mainly make everyday objects — mugs, bowls, plates and vases — with simple shapes and natural-toned glazes, designed to last and to be used every day.",

    "opere.titolo": "Works",
    "opere.nonDisponibile": "Not available",

    "contatti.titolo": "Contact",
    "contatti.telefono": "Phone:",
    "form.nome": "Your name",
    "form.email": "Your email",
    "form.messaggio": "Your message",
    "form.invia": "Send",

    "footer.diritti": "© 2026 Viola Fabiani — all rights reserved",

    "opera.tutte": "← All works",
    "opera.contattami": "Contact me for info",
    "opera.nonTrovata": "Work not found",
    "opera.foto": "photo",
  },
};

function linguaCorrente() {
  const salvata = localStorage.getItem("lingua");
  return TRADUZIONI[salvata] ? salvata : LINGUA_PRINCIPALE;
}

// Testo fisso tradotto (se manca in inglese usa l'italiano)
function t(chiave) {
  return TRADUZIONI[linguaCorrente()][chiave] ?? TRADUZIONI[LINGUA_PRINCIPALE][chiave] ?? chiave;
}

// Campo di un'opera nella lingua corrente, es. campoOpera(opera, "descrizione")
// Se la traduzione manca nel JSON mostra il testo italiano
function campoOpera(opera, campo) {
  const lingua = linguaCorrente();
  if (lingua !== LINGUA_PRINCIPALE && opera[lingua] && opera[lingua][campo]) {
    return opera[lingua][campo];
  }
  return opera[campo];
}

function applicaTraduzioni() {
  const lingua = linguaCorrente();
  document.documentElement.lang = lingua;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });

  // Evidenzia la lingua attiva nel selettore
  document.querySelectorAll(".lingua-switch button").forEach((btn) => {
    const attivo = btn.dataset.lingua === lingua;
    btn.classList.toggle("attiva", attivo);
    btn.setAttribute("aria-pressed", attivo);
  });
}

function impostaLingua(lingua) {
  localStorage.setItem("lingua", lingua);
  applicaTraduzioni();
  // Avvisa main.js / opera.js di ridisegnare i contenuti delle opere
  document.dispatchEvent(new CustomEvent("linguacambiata"));
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".lingua-switch button").forEach((btn) => {
    btn.addEventListener("click", () => impostaLingua(btn.dataset.lingua));
  });
  applicaTraduzioni();
});
