const gameBoard = document.querySelector('.game__board');
const messagePlayer = document.querySelector('.game__turn');
const endGame = document.querySelector('.endgame');
const endGameResult = document.querySelector('.endgame__result');
const resetGame = document.querySelector('.endgame__button');

let isTurnX = true;
let currentTurns = 0;
let maxTurn = 9;
let players = {
    x: 'cross',
    o: 'circle'
}
const winningPosition = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
]


// Se inicia el juego cuando se carga el HTML.
document.addEventListener("DOMContentLoaded", function(){
    startGame();
});

// Reiniciamos el Juego.
resetGame.addEventListener('click', startGame);


function startGame(){
    createBoard();
    
    messagePlayer.textContent = isTurnX ? 'X' : 'O';
    isTurnX = true;
    currentTurns = 0;

    endGame.classList.remove('show');
    gameBoard.classList.remove("disabled");
}

// Funcion que crea el table
function createBoard(){
    const totalCells = 9;

    // Eliminar todos los hijos de board
    while(gameBoard.firstElementChild){
        gameBoard.firstElementChild.remove();
    }

    //Agregar elementos nuevos por cada celda nueva.

    for (let i = 0; i < totalCells; i++) {
        const div = document.createElement('div');
    
        div.classList.add('cell');
        div.addEventListener('click', handleCell , {once:true});

        gameBoard.append(div);
    }
}

function handleCell(e){

    const currentCell = e.currentTarget;
    const currentPlayer = isTurnX ? players.x : players.o;
    currentTurns++;

    drawShape(currentCell, currentPlayer);

    // Verificamos si hay un ganador
    if(checkWinner(currentPlayer)){
        return;
    }

    // Verificamos si hemos pasado los turnos máximos
    if(currentTurns === maxTurn){
        showEndGame(false);
    }

    // Cambiamos de turno
    changeTurn();
}

// Dibuja una X o un O
function drawShape(element, newClass){
    element.classList.add(newClass);
}

// Cambiamos de turno
function changeTurn(){
    isTurnX = !isTurnX;
    messagePlayer.textContent = isTurnX ? 'X' : 'O';
}

// Verificamos si hay un ganador
function checkWinner(currentPlayer){
    const cells = document.querySelectorAll('.cell');
    const winner = winningPosition.some(array =>{
        
        return array.every(position =>{
            
            return cells[position].classList.contains(currentPlayer);

        });

    });

    console.log(winner);

    if(!winner){
        return;
    }

    showEndGame(true);
    return true;
}

function showEndGame(winner){
    gameBoard.classList.add("disabled");
    endGame.classList.add('show');
    
    if(winner){
        endGameResult.textContent = `😍 ¡${isTurnX ? "X" : "O"} ha ganado el juego!`;
    }else{
        endGameResult.textContent = `🥲 ¡El juego se ha empatado!`;
    }
}

