// ZIP-SHIP Revolution Demo — minimal vanilla JS
(function () {
  const $ = (sel) => document.querySelector(sel);
  const terminal = $("#terminal");
  const bar = $("#progressBar");
  const year = $("#year");
  const themeToggle = $("#themeToggle");

  year.textContent = new Date().getFullYear();

  // Theme: system by default, toggle stores preference.
  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") {
    document.documentElement.setAttribute("data-theme", stored);
  }

  themeToggle?.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });

  function sleep(ms){ return new Promise(r => setTimeout(r, ms)); }

  const frames = [
    { p: 14, t: "$ zipship upload zip-ship-revolution.zip\n✔ unpacking…" },
    { p: 28, t: "✔ unpacking…\n✔ creating github repo…" },
    { p: 45, t: "✔ creating github repo…\n✔ pushing commit…" },
    { p: 63, t: "✔ pushing commit…\n✔ detected: static site" },
    { p: 82, t: "✔ detected: static site\n→ ready to deploy: vercel / netlify" },
    { p: 100, t: "→ ready to deploy: vercel / netlify\n✔ done: https://example-deploy.zip-ship-revolution.com" },
  ];

  let running = false;

  async function runDemo() {
    if (running) return;
    running = true;
    $("#runDemo")?.setAttribute("disabled","true");

    for (const f of frames) {
      bar.style.width = f.p + "%";
      terminal.textContent = f.t;
      await sleep(700);
    }

    $("#runDemo")?.removeAttribute("disabled");
    running = false;
  }

  function resetDemo() {
    bar.style.width = "12%";
    terminal.textContent = "$ zipship upload zip-ship-revolution.zip\n✔ unpacking…\n✔ creating github repo…\n✔ pushing commit…\n✔ detected: static site\n→ ready to deploy: vercel / netlify";
  }

  $("#runDemo")?.addEventListener("click", runDemo);
  $("#resetDemo")?.addEventListener("click", resetDemo);

  // Copy buttons
  async function copy(text){
    try{
      await navigator.clipboard.writeText(text);
      toast("Kopiert ✓");
    }catch{
      // Fallback
      const ta = document.createElement("textarea");
      ta.value = text; document.body.appendChild(ta);
      ta.select(); document.execCommand("copy");
      ta.remove();
      toast("Kopiert ✓");
    }
  }

  function toast(msg){
    const n = document.createElement("div");
    n.className = "toast";
    n.textContent = msg;
    document.body.appendChild(n);
    requestAnimationFrame(() => n.classList.add("toast--in"));
    setTimeout(() => n.classList.remove("toast--in"), 1400);
    setTimeout(() => n.remove(), 1900);
  }

  document.querySelectorAll("[data-copy]").forEach(btn => {
    btn.addEventListener("click", () => copy(btn.getAttribute("data-copy") || ""));
  });

  $("#copyUrl")?.addEventListener("click", () => copy("https://example-deploy.zip-ship-revolution.com"));

  // Inject toast CSS (keeps styles.css clean-ish)
  const toastCSS = document.createElement("style");
  toastCSS.textContent = `
    .toast{
      position: fixed; left: 50%; bottom: 18px; transform: translateX(-50%) translateY(10px);
      padding: 10px 14px;
      border: 1px solid var(--line);
      border-radius: 999px;
      background: var(--card2);
      box-shadow: var(--shadow);
      color: var(--text);
      opacity: 0;
      transition: opacity .18s ease, transform .18s ease;
      z-index: 9999;
      pointer-events:none;
      font-size: 13px;
    }
    .toast--in{ opacity: 1; transform: translateX(-50%) translateY(0); }
  `;
  document.head.appendChild(toastCSS);
})();
