const texto = document.querySelector("#texto");
const entrada = document.querySelector("#entrada");
const reiniciar = document.querySelector("#reiniciar");
const resultado = document.querySelector("#resultado");
const historico = document.querySelector("#historico");
const alterarTema = document.querySelector("#alterartema");

const digitarTextos = [
    'Exemplo de texto para digitar.', 
    'Outro Exemplo de texto para digitar',
    'Mais um exemplo de texto para digitar',
    'Digite isso',
    'Você pode digitar isso aqui'
];

function novotexto() {
    let index = Math.floor(Math.random() * digitarTextos.length);
    texto.textContent = digitarTextos[index];
}

function iniciarTempo() {
    const statusDoTeste = JSON.parse(localStorage.getItem("testeEmAndamento"));
    if (!statusDoTeste) {
        localStorage.setItem("tempoInicial", new Date().getTime().toString());
        localStorage.setItem("testeEmAndamento", JSON.stringify(true));
    }
}

function adicionarAoHistorico(TextoDigitado,tempoGasto){
    const itemHistorico =document.createElement('p');
    itemHistorico.textContent = `Texto: '${TextoDigitado}' Tempo: ${tempoGasto}`
    historico.appendChild(itemHistorico);
}

function verificar() {
    const tempoFinal = new Date().getTime();
    const tempoGasto = (tempoFinal - parseInt(localStorage.getItem("tempoInicial"))) / 1000;
    resultado.textContent = `Parabéns! Você levou ${tempoGasto} segundos`;
    localStorage.setItem("testeEmAndamento", JSON.stringify(false));
    adicionarAoHistorico(texto.textContent,tempoGasto);
    entrada.value = "";
    novotexto();
}

function atualizarTeste() {
    iniciarTempo();
    if (entrada.value === texto.textContent) {
        verificar();
    }
}
function reiniciarTeste(){
    historico.textContent = "";
    resultado.textContent = "";
    entrada.value = "";
    localStorage.setItem("testeEmAndamento", JSON.stringify(false));    
    novotexto();
}

function tema(){
    const body = document.body;
    if(body.classList.contains("escuro")){
        body.classList.remove("escuro");
        body.classList.add("claro")
    }
    else{
        body.classList.remove("claro");
        body.classList.add("escuro")
    }
}

alterarTema.addEventListener("click", tema);


reiniciar.addEventListener("click", reiniciarTeste)

entrada.addEventListener("keyup", atualizarTeste);

novotexto();
