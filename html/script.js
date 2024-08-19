// feito por Felipe dos Reis Rocha 19/08/2024

// Exibe o modal com as regras do jogo ao carregar a página
window.onload = function() {
    document.getElementById('regraModal').style.display = 'block';
};

// Fecha o modal com as regras do jogo
function fecharModal() {
    document.getElementById('regraModal').style.display = 'none';
}

let tries = 10;       // Número de tentativas restantes
let tentativas = 0;   // Número de jogadas realizadas
let vitorias = 0;     // Número de vitórias
let derrotas = 0;     // Número de derrotas
let empates = 0;      // Número de empates

// Função principal que processa a jogada do jogador
function jogar() {
    const opcoes = ["", "Rock", "Paper", "Scissor"];  
    const pc = random(1, 3);  
    const escolha = document.querySelector("select").selectedIndex;  

    // Verifica se a escolha é válida 
    if (escolha > 0) {
        tentativas++;
        tries--;

        // Determina o resultado com base nas escolhas do jogador e do computador
        if ((pc == 1 && escolha == 3) ||
            (pc == 2 && escolha == 1) ||
            (pc == 3 && escolha == 2)) {
            resultado("Lost", "The PC chose " + opcoes[pc]);
            derrotas++;
        } else if (pc == escolha) {
            resultado("Draw", "The PC chose " + opcoes[pc]);
            empates++;
        } else {
            resultado("You win!", "The PC chose " + opcoes[pc]);
            vitorias++;
        }
    } else {
        // Se a escolha não for válida, exibe uma mensagem e não contabiliza a jogada
        resultado("Choose an option", "Rock, Paper or Scissor");
        return; // Impede que o placar seja atualizado se a escolha não for válida
    }

    // Atualiza o placar
    document.querySelector("#tentativas").innerHTML = "Plays: " + tentativas;
    document.querySelector("#tries").innerHTML = "tries: " + tries;
    document.querySelector("#vitorias").innerHTML = "Wins: " + vitorias;
    document.querySelector("#derrotas").innerHTML = "Defeats: " + derrotas;
    document.querySelector("#empates").innerHTML = "Draws: " + empates;

    // Verifica se o número de jogadas chegou a 10
    if (tentativas >= 10) {
        setTimeout(() => {
            mostrarResultadoFinal();
            reiniciarJogo();
        }, 100); 
    }
}

// Exibe o resultado da jogada atual
function resultado(mensagem, pc) {
    document.querySelector("h2").innerHTML = mensagem;
    document.querySelector("span").innerHTML = pc;
}

// Função para gerar um número aleatório entre min e max
function random(min, max) {
    return (Math.random() * (max - min) + min).toFixed();
}

// Função que muda a imagem exibida com base na escolha do jogador
function mudarimg() {
    const select = document.getElementById("imgslc");
    const imageContainer = document.getElementById("imageContainer");
    const displayImg = document.getElementById("displayImg");

    const ValorSelect = select.value;
    if (ValorSelect) {
        displayImg.src = ValorSelect;
        displayImg.style.display = 'block';
    } else {
        displayImg.src = '';
        displayImg.style.display = 'none';
    }
}

// Reinicia o jogo, resetando todas as variáveis e o placar
function reiniciarJogo() {
    tentativas = 0;
    vitorias = 0;
    derrotas = 0;
    empates = 0;
    tries = 10;

    document.querySelector("#tentativas").innerHTML = "Plays: ";
    document.querySelector("#tries").innerHTML = "Tries: 10";
    document.querySelector("#vitorias").innerHTML = "Wins: 0";
    document.querySelector("#derrotas").innerHTML = "Defeats: 0";
    document.querySelector("#empates").innerHTML = "Draws: 0";

    document.querySelector("h2").innerHTML = "Result";
    document.querySelector("span").innerHTML = "";
}

// Exibe uma mensagem final indicando o resultado geral do jogo
function mostrarResultadoFinal() {
    let mensagem;
    if (vitorias > derrotas) {
        mensagem = "Congratulations! You won the game!";
    } else if (derrotas > vitorias) {
        mensagem = "Sorry! You lost the game!";
    } else {
        mensagem = "It's a draw!";
    }
    alert(mensagem);
}
