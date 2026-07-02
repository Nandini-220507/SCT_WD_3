// ===============================
// ELEMENTS
// ===============================

const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

const restartBtn = document.getElementById("restartBtn");
const newGameBtn = document.getElementById("newGameBtn");

const playerModeBtn = document.getElementById("playerMode");
const computerModeBtn = document.getElementById("computerMode");

const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");
const drawScore = document.getElementById("drawScore");

// ===============================
// VARIABLES
// ===============================

let board = ["", "", "", "", "", "", "", "", ""];

let currentPlayer = "X";

let running = true;

let computerMode = false;

let xWins = 0;
let oWins = 0;
let draws = 0;

// Winning combinations

const winPatterns = [

    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,8],
    [2,4,6]

];

// ===============================
// START GAME
// ===============================

initializeGame();

function initializeGame(){

    cells.forEach(cell=>{

        cell.addEventListener("click",cellClicked);

    });

    restartBtn.addEventListener("click",restartGame);

    newGameBtn.addEventListener("click",newMatch);

    playerModeBtn.addEventListener("click",()=>{

        computerMode=false;

        playerModeBtn.classList.add("active");
        computerModeBtn.classList.remove("active");

        newMatch();

    });

    computerModeBtn.addEventListener("click",()=>{

        computerMode=true;

        computerModeBtn.classList.add("active");
        playerModeBtn.classList.remove("active");

        newMatch();

    });

    statusText.textContent="Player X's Turn";

}

// ===============================
// CELL CLICK
// ===============================

function cellClicked(){

    const index=this.getAttribute("data-index");

    if(board[index]!=="" || !running){

        return;

    }

    updateCell(this,index);

    checkWinner();

    if(computerMode && running && currentPlayer==="O"){

        setTimeout(computerMove,500);

    }

}

// ===============================
// UPDATE CELL
// ===============================

function updateCell(cell,index){

    board[index]=currentPlayer;

    cell.textContent=currentPlayer;

    if(currentPlayer==="X"){

        cell.style.color="#38bdf8";

    }else{

        cell.style.color="#f472b6";

    }

    currentPlayer=currentPlayer==="X"?"O":"X";

    statusText.textContent="Player "+currentPlayer+"'s Turn";

}// ===============================
// COMPUTER MOVE
// ===============================

function computerMove() {

    let emptyCells = [];

    board.forEach((value, index) => {
        if (value === "") {
            emptyCells.push(index);
        }
    });

    if (emptyCells.length === 0) return;

    const randomIndex =
        emptyCells[Math.floor(Math.random() * emptyCells.length)];

    board[randomIndex] = currentPlayer;

    cells[randomIndex].textContent = currentPlayer;
    cells[randomIndex].style.color = "#f472b6";

    currentPlayer = "X";

    statusText.textContent = "Player X's Turn";

    checkWinner();
}

// ===============================
// CHECK WINNER
// ===============================

function checkWinner() {

    let won = false;

    winPatterns.forEach(pattern => {

        const a = pattern[0];
        const b = pattern[1];
        const c = pattern[2];

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[b] === board[c]
        ) {

            won = true;

            cells[a].classList.add("win");
            cells[b].classList.add("win");
            cells[c].classList.add("win");

            const winner = board[a];

            statusText.textContent = "🎉 Player " + winner + " Wins!";

            running = false;

            if (winner === "X") {
                xWins++;
                scoreX.textContent = xWins;
            } else {
                oWins++;
                scoreO.textContent = oWins;
            }

        }

    });

    if (won) return;

    if (!board.includes("")) {

        statusText.textContent = "🤝 It's a Draw!";

        draws++;

        drawScore.textContent = draws;

        running = false;

    }

}

// ===============================
// RESTART GAME
// ===============================

function restartGame() {

    board = ["","","","","","","","",""];

    currentPlayer = "X";

    running = true;

    statusText.textContent = "Player X's Turn";

    cells.forEach(cell => {

        cell.textContent = "";

        cell.classList.remove("win");

        cell.style.color = "white";

    });

}

// ===============================
// NEW MATCH
// ===============================

function newMatch() {

    xWins = 0;
    oWins = 0;
    draws = 0;

    scoreX.textContent = "0";
    scoreO.textContent = "0";
    drawScore.textContent = "0";

    restartGame();

}