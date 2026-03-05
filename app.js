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

/** CÓDIGO DA UNIDADE DA CAMES
 *
 * document.addEventListener('DOMContentLoaded', function(){
    const aumentaFonteBotao = document.getElementById('aumentar-fonte');
    const diminuiFonteBotao = document.getElementById('diminuir-fonte');

    let tamanhoAtualFonte = 1;
    aumentaFonteBotao.addEventListener('click', function(){
        tamanhoAtualFonte += 0.1;
        document.body.style.fontSize = `${tamanhoAtualFonte}rem`;

    });

    diminuiFonteBotao.addEventListener('click', function(){
        tamanhoAtualFonte -= 0.1;
        document.body.style.fontSize = `${tamanhoAtualFonte}rem`;

    });

});
 */

// ====== Contraste (tema claro/escuro do Bootstrap) ======

const btnContraste = document.getElementById("btnContraste");
btnContraste.addEventListener("click", mudaTema);

function mudaTema() {
  const paginaHTML = document.documentElement;
  const temaAtual = paginaHTML.getAttribute("data-bs-theme");

  if (temaAtual === "light") {
    paginaHTML.setAttribute("data-bs-theme", "dark");
    btnContraste.setAttribute("aria-pressed", "true");
  } else {
    paginaHTML.setAttribute("data-bs-theme", "light");
    btnContraste.setAttribute("aria-pressed", "false");
  }
}

// ====== Leitura em voz alta ======

// variável que guarda se o sistema está lendo
let lendo = false;

// pegar o botão
let botaoLer = document.getElementById("btnLer");

// quando clicar no botão
botaoLer.addEventListener("click", iniciarLeitura);

function iniciarLeitura() {
  // verifica se o navegador suporta leitura
  if (!("speechSynthesis" in window)) {
    return;
  }

  // se já estiver lendo
  if (lendo == true) {
    // se estiver pausado → continuar
    if (speechSynthesis.paused == true) {
      speechSynthesis.resume();
    }

    // senão → pausar
    else {
      speechSynthesis.pause();
    }

    return;
  }

  // pegar o texto da página
  let conteudo = document.querySelector("main");
  let texto = conteudo.innerText;

  // criar objeto de fala
  let fala = new SpeechSynthesisUtterance(texto);

  // definir idioma
  fala.lang = "pt-BR";

  // quando terminar de ler
  fala.onend = finalizarLeitura;

  // marcar que começou a leitura
  lendo = true;

  // cancelar falas antigas
  speechSynthesis.cancel();

  // iniciar leitura
  speechSynthesis.speak(fala);
}

// função chamada quando a leitura termina
function finalizarLeitura() {
  lendo = false;
}

// ===== Checklist de golpes =====

// pegar elementos da página
var btnResultado = document.getElementById("btnResultadoGolpe");
var btnLimpar = document.getElementById("btnLimparGolpe");
var resultado = document.getElementById("resultadoGolpe");

// quando clicar no botão "Ver resultado"
btnResultado.addEventListener("click", verificarGolpe);

// função que verifica os critérios
function verificarGolpe() {
  // lista com os ids dos checkboxes
  var ids = ["c1", "c2", "c3", "c4", "c5"];

  // contador de itens marcados
  var marcados = 0;

  // percorrer a lista
  for (var i = 0; i < ids.length; i++) {
    var caixa = document.getElementById(ids[i]);

    if (caixa.checked == true) {
      marcados = marcados + 1;
    }
  }

  // mostrar área de resultado
  resultado.classList.remove("d-none");
  resultado.classList.remove("alert-danger");
  resultado.classList.remove("alert-success");
  resultado.classList.remove("alert-warning");

  // lógica do resultado
  if (marcados >= 3) {
    resultado.classList.add("alert-danger");

    resultado.innerHTML =
      "🚨 <strong>Alta chance de golpe.</strong> Não envie dados e não pague.";
  } else if (marcados == 2) {
    resultado.classList.add("alert-warning");

    resultado.innerHTML =
      "⚠️ <strong>Cuidado.</strong> Pode ser golpe. Confirme antes de agir.";
  } else {
    resultado.classList.add("alert-success");

    resultado.innerHTML =
      "✅ <strong>Baixa chance.</strong> Mesmo assim confirme links e números.";
  }
}

// ===== Modo simples =====

let btnSimples = document.getElementById("btnSimples");
// variável que guarda o estado do modo simples
let modoSimplesAtivo = false;

// quando clicar no botão
btnSimples.addEventListener("click", alternarModoSimples);

// função que ativa ou desativa o modo simples
function alternarModoSimples() {
  // inverter estado do modo simples
  if (modoSimplesAtivo == false) {
    modoSimplesAtivo = true;
  } else {
    modoSimplesAtivo = false;
  }

  // atualizar atributo de acessibilidade
  if (modoSimplesAtivo == true) {
    btnSimples.setAttribute("aria-pressed", "true");
  } else {
    btnSimples.setAttribute("aria-pressed", "false");
  }

  // pegar todas as seções não essenciais
  let secoes = document.querySelectorAll(".nao-essencial");

  // percorrer as seções
  for (let i = 0; i < secoes.length; i++) {
    if (modoSimplesAtivo == true) {
      secoes[i].classList.add("d-none");
    } else {
      secoes[i].classList.remove("d-none");
    }
  }

  // se o modo simples estiver ativo
  if (modoSimplesAtivo == true) {
    let inicio = document.querySelector("#inicio");

    if (inicio != null) {
      inicio.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }
}
