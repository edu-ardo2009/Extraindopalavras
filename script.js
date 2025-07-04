import { PALAVRAS_RUINS } from "./palavrasRuins.js";

const botaoMostraPalavras = document.querySelector('#botao-palavrachave');
botaoMostraPalavras.addEventListener('click', mostraPalavrasChave);

function mostraPalavrasChave() {
  const texto = document.querySelector('#entrada-de-texto').value;
  const campoResultado = document.querySelector('#resultado-palavrachave');
  const palavrasChave = processaTexto(texto);

  campoResultado.textContent = palavrasChave.join(", ");
}

function processaTexto(texto) {
 
  let palavras = texto.split(/[^a-zA-ZÀ-ÿ]+/);

  palavras = palavras.map(p => p.toLowerCase());
  palavras = tiraPalavrasRuins(palavras);

  const frequencias = contaFrequencias(palavras);
  const ordenadas = Object.keys(frequencias).sort((a, b) => frequencias[b] - frequencias[a]);

  return ordenadas.slice(0, 10);
}

function contaFrequencias(palavras) {
  const freq = {};
  for (const palavra of palavras) {
    freq[palavra] = (freq[palavra] || 0) + 1;
  }
  return freq;
}

function tiraPalavrasRuins(palavras) {
  return palavras.filter(p => !PALAVRAS_RUINS.has(p) && p.length > 2);
}
