const jogarButton = document.querySelector("#jogar");
var escolha = '';
var arrayGerado = [];

const personagensBiblicos = [
    "Adão",
    "Abraão",
    "Daniel",
    "Davi",
    "Elias",
    "Eva",
    "Gabriel",
    "Isaque",
    "Jacó",
    "Jesus",
    "João Batista",
    "José do Egito",
    "José (pai de Jesus)",
    "Jonas",
    "Judas Iscariotes",
    "Maria",
    "Marta",
    "Moisés",
    "Noé",
    "Paulo",
    "Pedro",
    "Raabe",
    "Rute",
    "Salomão",
    "Samuel",
    "Sansão",
    "Sara",
    "Saul",
    "Tomé",
    "Zaqueu"
  ];

  const objetosBiblicos = [
    "Arca de Noé",
    "Arca da Aliança",
    "Cajado de Moisés",
    "Coroa de espinhos",
    "Cruz",
    "Estrela de Belém",
    "Fornalha ardente",
    "Funda de Davi",
    "Maná",
    "Mesa da Última Ceia",
    "Pão",
    "Peixe",
    "Pedra",
    "Altar",
    "Tabernáculo",
    "Serpente de bronze",     
    "Trombeta",
    "Véu do templo",
    "Vela",
    "Vinha",
    "Árvore da Vida",
    "Árvore do Conhecimento",
    "Óleo"
  ];

jogarButton.addEventListener("click", addSection)

function addSection(){
    var firstSection = document.querySelector("#firstSection");
    //Criação do novo section onde será o jogo
    var gameSection = document.createElement("section");
    gameSection.id = 'gameSection';
    document.body.appendChild(gameSection);

    // Escolher entre objeto ou personagem bíblico
    gameSection.innerHTML = 
    `<p><strong>ESCOLHA O MODO DE JOGO:</strong></p>
    <div class="circleButton" id="personagem">
    <i class="mdi mdi-account"></i>
    <h2><strong>PERSONAGEM</strong></h2>
    <p> O jogo será com um personagem bíblico</p>
    </div>
    <div class="circleButton" id="objeto">
    <i class="mdi mdi-church"></i>
    <h2><strong>OBJETO</strong></h2>
    <p> O jogo será com um objeto bíblico</p>
    </div>
    `;
    const personagem = document.querySelector("#personagem");
    const objeto = document.querySelector("#objeto");

    personagem.addEventListener("click",() => {
        sortear('personagem');
        quantidadePage('personagem', '<i class="mdi mdi-account"></i>');
    });

    objeto.addEventListener("click", () => {
        sortear('objeto');
        quantidadePage('objeto','<i class="mdi mdi-church"></i>' );
    })
    
    firstSection.remove()
}


// Tela para colocar a quantidade de pessoas
function quantidadePage(item, icon){
    var gameSection = document.querySelector("#gameSection");

    gameSection.innerHTML = 
    `<div class="circleButton" id="mudar">
    ${icon}
    <h2><strong>${item.toUpperCase()}</strong></h2>
    <p> Clique aqui para alterar o estilo de jogo</p>
    </div>
    <p><strong>SÃO QUANTOS JOGADORES?(ACIMA DE 3)</strong></p>
    <input type="number" value="3" min ="3" class="qntJogadores" id="qntJogadores">
    <input type="button" value="Confirmar" id="confirmar" class="button">
    `;

    var mudar = document.querySelector("#mudar");
    var input = document.getElementById("qntJogadores");
    var confirmarButton = document.getElementById("confirmar");
    
    mudar.addEventListener("click", () => {
        gameSection.remove();
        addSection(); // Volta pra outra tela
    })

    confirmarButton.addEventListener("click", () => {
        if ( input.value == '' || Number(input.value) < 3 ){
            alert('Preencha o campo corretamente')
        } else{
            arrayGerado = [];
            sortear(item);
            geradorArray(input.value); // Gerar array Novo
            aguardandoPage(1); // Tela de distribuição de Cargos
        }
    })


    // Formatar Número
    input.addEventListener("change", () => {
        if (input.value < 3){
            input.value = 3;
        }
    })
}

// Sorteio para escolher o personagem
function sortear(item){
    if( item === 'personagem' ){
        // Sortear personagem
        let numero = Math.floor(Math.random() * personagensBiblicos.length);
        escolha = personagensBiblicos[numero];
        
    } else if ( item === 'objeto' ){
        // Sortear objeto
        let numero = Math.floor(Math.random() * objetosBiblicos.length);
        escolha = objetosBiblicos[numero];
        
    }
}

// Gerar array para distribuir as classes
function geradorArray(quantidade){
    for ( let i = 0; i < quantidade; i++ ){
        arrayGerado.push(escolha); // Coloca a escolha em todas as posições
    }
    arrayGerado[Math.floor( Math.random() * arrayGerado.length)] = "Impostor"; // Coloca a classe impostor
    
    for ( let i = arrayGerado.length - 1; i > 0; i-- ){
        let a = Math.floor(Math.random() * (i + 1));
        [arrayGerado[i], arrayGerado[a]] = [arrayGerado[a], arrayGerado[i]];
    } // Embaralha o array 

    console.log(arrayGerado);
}



// Página de Cargos
function aguardandoPage(jogador){
    var gameSection = document.querySelector("#gameSection");
    if ( jogador <= arrayGerado.length ){
    gameSection.innerHTML = `
    ${personagensBiblicos.indexOf(escolha) === -1 ? '<i class="mdi mdi-church"></i>' : '<i class="mdi mdi-account"></i>' }
    <h2><strong>${personagensBiblicos.indexOf(escolha) === -1 ? 'Objeto' : 'Personagem' }</strong></h2>
    <p><strong>${jogador}/${arrayGerado.length} JOGADORES</strong></p>
    <p>AGUARDANDO JOGADOR ${jogador}<span id="ponto">.</span></p>
    <input type="button" value="PRÓXIMO" id="ver" class="button">
    `;
    reticencias(); // Animação
    var verClasse = document.getElementById("ver");

    verClasse.addEventListener("click", () => {
        classePage(jogador);
    });
    } else {
        gameSection.innerHTML = `
    <p><strong>${jogador - 1}/${arrayGerado.length} JOGADORES</strong></p>
    <p>BOM JOGO!</p>
    <p>
    <input type="button" value="NOVO JOGO" id="novo" class="button">
    `;
    var novoJogo = document.getElementById("novo");
    novoJogo.addEventListener("click", () => {
        gameSection.remove();
        addSection();
    })
    }
    
}

// Reticencias só pra ficar bonito
function reticencias(){
    var pontosEl = document.querySelector("#ponto");
    var ponto = '.';

    setInterval(()=>{
        if (ponto === '...'){
        ponto = "";
    } else {
        ponto += '.'
    }
    pontosEl.textContent = ponto
    },500)
    return ponto;
}

function classePage(jogador){
    var gameSection = document.querySelector("#gameSection");
    if ( arrayGerado[jogador - 1] === 'Impostor' ){
        gameSection.innerHTML = `
        ${personagensBiblicos.indexOf(escolha) === -1 ? '<i class="mdi mdi-church"></i>' : '<i class="mdi mdi-account"></i>' }
        <h2><strong>${personagensBiblicos.indexOf(escolha) === -1 ? 'Objeto' : 'Personagem' }</strong></h2>
        <p><strong>${jogador}/${arrayGerado.length} JOGADORES</strong></p>
        <div class="circleButton" id="mudar">
        <h2><strong>Você é o ${arrayGerado[jogador-1]}</strong></h2>
        <p>Finja que sabe qual é o tema e fale ele no fim do jogo</p>
        </div>
        <p>Se pensarem que você não é o impostor, você vence!</p>
        <input type="button" value="PÓXIMO JOGADOR" id="proximo" class="button">
        `;
    } else {
   
        gameSection.innerHTML = `
        ${personagensBiblicos.indexOf(escolha) === -1 ? '<i class="mdi mdi-church"></i>' : '<i class="mdi mdi-account"></i>' }
        <h2><strong>${personagensBiblicos.indexOf(escolha) === -1 ? 'Objeto' : 'Personagem' }</strong></h2>
        <p><strong>${jogador}/${arrayGerado.length} JOGADORES</strong></p>
        <div class="circleButton" id="mudar">
        <h2><strong>${arrayGerado[jogador-1]}</strong></h2>
        <p>Você é um jogador! Lembre-se desse tema</p>
        </div>
        <p>Não deixe o impostor saber o tema! Após o jogo, descubra a identidade dele para vencer!</p>
        <input type="button" value="PÓXIMO JOGADOR" id="proximo" class="button">
        `;
    }
    var proximo = document.getElementById("proximo");
    proximo.addEventListener("click", () => {
        
        aguardandoPage( jogador + 1 )
    })
   
}