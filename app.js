// app.js (completo e simples)

// ====== Fonte (A+ / A-) ======
let tamanhoFonte = 18;

function aplicarFonte() {
  document.documentElement.style.fontSize = tamanhoFonte + "px";
}

document.getElementById("btnFonteMais").addEventListener("click", () => {
  tamanhoFonte = Math.min(tamanhoFonte + 2, 28);
  aplicarFonte();
});

document.getElementById("btnFonteMenos").addEventListener("click", () => {
  tamanhoFonte = Math.max(tamanhoFonte - 2, 16);
  aplicarFonte();
});

aplicarFonte();

// ====== Contraste (tema claro/escuro do Bootstrap) ======
const btnContraste = document.getElementById("btnContraste");

btnContraste.addEventListener("click", () => {
  const html = document.documentElement;
  const temaAtual = html.getAttribute("data-bs-theme");

  if (temaAtual === "light") {
    html.setAttribute("data-bs-theme", "dark");
    btnContraste.setAttribute("aria-pressed", "true");
  } else {
    html.setAttribute("data-bs-theme", "light");
    btnContraste.setAttribute("aria-pressed", "false");
  }
});

// ====== Leitura em voz alta (simples) ======
let lendo = false;

document.getElementById("btnLer").addEventListener("click", () => {
  if (!("speechSynthesis" in window)) return;

  if (lendo) {
    if (speechSynthesis.paused) speechSynthesis.resume();
    else speechSynthesis.pause();
    return;
  }

  const texto = document.querySelector("main").innerText;
  const fala = new SpeechSynthesisUtterance(texto);
  fala.lang = "pt-BR";

  fala.onend = () => {
    lendo = false;
  };

  lendo = true;
  speechSynthesis.cancel();
  speechSynthesis.speak(fala);
});

// ====== Navegação (rolagem suave) ======
document.querySelectorAll("[data-go]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const alvo = document.querySelector(btn.getAttribute("data-go"));
    if (alvo) alvo.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// ====== Checklist de golpes ======
const btnResultado = document.getElementById("btnResultadoGolpe");
const btnLimpar = document.getElementById("btnLimparGolpe");
const resultado = document.getElementById("resultadoGolpe");

btnResultado.addEventListener("click", () => {
  const ids = ["c1", "c2", "c3", "c4", "c5"];
  let marcados = 0;

  ids.forEach((id) => {
    if (document.getElementById(id).checked) marcados++;
  });

  resultado.classList.remove("d-none", "alert-danger", "alert-success", "alert-warning");

  if (marcados >= 3) {
    resultado.classList.add("alert-danger");
    resultado.innerHTML =
      "🚨 <strong>Alta chance de golpe.</strong> Não envie dados e não pague. Confirme com alguém de confiança.";
  } else if (marcados === 2) {
    resultado.classList.add("alert-warning");
    resultado.innerHTML =
      "⚠️ <strong>Cuidado.</strong> Pode ser golpe. Confirme por outro canal antes de agir.";
  } else {
    resultado.classList.add("alert-success");
    resultado.innerHTML =
      "✅ <strong>Baixa chance pelo checklist.</strong> Mesmo assim, confirme links e números.";
  }
});

btnLimpar.addEventListener("click", () => {
  ["c1", "c2", "c3", "c4", "c5"].forEach((id) => {
    document.getElementById(id).checked = false;
  });

  resultado.classList.add("d-none");
  resultado.textContent = "";
});

// ====== Modo simples (esconde seções não essenciais) ======
const btnSimples = document.getElementById("btnSimples");
let modoSimplesAtivo = false;

btnSimples.addEventListener("click", () => {
  modoSimplesAtivo = !modoSimplesAtivo;

  btnSimples.setAttribute("aria-pressed", modoSimplesAtivo ? "true" : "false");

  document.querySelectorAll(".nao-essencial").forEach((sec) => {
    if (modoSimplesAtivo) sec.classList.add("d-none");
    else sec.classList.remove("d-none");
  });

  if (modoSimplesAtivo) {
    const inicio = document.querySelector("#inicio");
    if (inicio) inicio.scrollIntoView({ behavior: "smooth", block: "start" });
  }
});
