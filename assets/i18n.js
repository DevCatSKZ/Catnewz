/* Catnewz – gemeinsamer Sprachumschalter (DE/EN/ES/FR/IT)
   Setzt data-lang auf <html>. Kurztexte via window.TR + [data-i18n];
   lange Blöcke (Datenschutz) via CSS [data-lang-block]. */
(function () {
  var LANGS = ["de", "en", "es", "fr", "it"];
  var KEY = "catnewz-lang";

  function pick() {
    var saved = null;
    try { saved = localStorage.getItem(KEY); } catch (e) {}
    if (saved && LANGS.indexOf(saved) >= 0) return saved;
    var nav = (navigator.language || "de").slice(0, 2).toLowerCase();
    return LANGS.indexOf(nav) >= 0 ? nav : "de";
  }

  function applyText(lang) {
    if (!window.TR) return;
    var dict = window.TR[lang] || window.TR.de;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var v = dict[el.getAttribute("data-i18n")];
      if (v != null) el.textContent = v;
    });
  }

  function setLang(lang) {
    if (LANGS.indexOf(lang) < 0) lang = "de";
    document.documentElement.setAttribute("data-lang", lang);
    document.documentElement.setAttribute("lang", lang);
    try { localStorage.setItem(KEY, lang); } catch (e) {}
    applyText(lang);
    document.querySelectorAll(".langswitch button").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-set-lang") === lang);
    });
  }

  document.addEventListener("click", function (e) {
    var b = e.target.closest ? e.target.closest("[data-set-lang]") : null;
    if (b) { e.preventDefault(); setLang(b.getAttribute("data-set-lang")); }
  });

  setLang(pick());
  window.CatnewzSetLang = setLang;
})();
