// Phosphor toggle (same two themes as the Virtual Dyno) and the fallback-font check for the ASCII banner.
(() => {
  const root = document.documentElement;
  const KEY = "vdl-phosphor";
  const meta = document.querySelector('meta[name="theme-color"]');
  function setPhos(p, save) {
    root.dataset.phosphor = p;
    document.querySelectorAll("#phos button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.p === p)));
    if (meta) meta.content = getComputedStyle(root).getPropertyValue("--desk").trim() || meta.content;
    if (save) { try { localStorage.setItem(KEY, p); } catch { /* storage unavailable */ } }
  }
  document.querySelectorAll("#phos button").forEach(b => b.addEventListener("click", () => setPhos(b.dataset.p, true)));
  setPhos(["green", "color"].includes(root.dataset.phosphor) ? root.dataset.phosphor : "green", false);

  // The banner is sized for VT323 (0.40em per character). A wider fallback font would overflow, so show a plain heading.
  function noFont() {
    const s = document.createElement("span");
    s.style.cssText = "position:absolute;visibility:hidden;white-space:pre;font:100px var(--mono)";
    s.textContent = "..........";
    document.body.appendChild(s);
    const wide = s.getBoundingClientRect().width / 1000 > 0.45;
    s.remove();
    root.classList.toggle("nofont", wide);
  }
  if (document.querySelector(".ban")) {
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(noFont, noFont);
    setTimeout(noFont, 3500);
  }
})();
