//foi criado a função lá embaixo de gerar número aleatório, mas o escopo é interno, então não vai refletir no código se ele não chamado. É por isso que criamos uma variável no começo do código para chamar aquela função.

let listaDeNumeroSorteados = [];
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

//document.querySelector serve para chamar a algum parametro do html para dentro do javascript
// .innerhtml serve para atribuir valor para esse parametro do html, através do javascript

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}

function exibirMensageminicial() {
    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

exibirMensageminicial();

// input será onde o usuário vai colocar o número, é a entrada do usuário
// o value serve para que retorne somente o valor, o que tem dentro do input

function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) { 
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = 'tentativas' > 1 ? 'tentativa' : 'tentativas';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else{
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O Número Secreto é Menor!');
        } else {
            exibirTextoNaTela('p', 'O Número Secreto é Maior!');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() *10 + 1);
    let quantidadeDeElementosNaLista = listaDeNumeroSorteados.length;

    if (quantidadeDeElementosNaLista == 10) {
        listaDeNumeroSorteados = [];
    }

    if (listaDeNumeroSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumeroSorteados.push(numeroEscolhido);
        console.log(listaDeNumeroSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = ' ';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensageminicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}