game = {
    score: 0,
    currentGame: [],
    playerMoves: [],
    choices: ["button1", "button2", "button3", "button4"],
    turnNumber: 0,
    turnInProgress: false,
    lastButton: "",
}

function newGame () {
    for (button of document.getElementsByClassName("circle")) {
        if (button.getAttribute("data-listener") === "false") {
            button.addEventListener("click", (e) => {
                if (game.currentGame.length > 0 && !game.turnInProgress) {
                    move = e.target.getAttribute("id");
                    game.lastButton = move;
                    lightsOn(move);
                    game.playerMoves.push(move);
                    playerTurn();
                }
            });
            button.setAttribute("data-listener", "true");
        }
    }
    game.score = 0;
    game.currentGame = [];
    game.playerMoves = [];
    showScore();
    addTurn();
}

function showScore() {
    document.getElementById("score").innerText = game.score;
}

function addTurn() {
    game.playerMoves = [];
    game.currentGame.push(game.choices[Math.floor(Math.random() * 4)]);
    showTurns();
}

function showTurns() {
    game.turnInProgress = true;
    game.turnNumber = 0;
    let turns = setInterval( () => {
        lightsOn(game.currentGame[game.turnNumber]);
        game.turnNumber++;
        if (game.turnNumber >= game.currentGame.length) {
            clearInterval(turns);
            game.turnInProgress = false;
        }
    }, 800);
}

function lightsOn(circ) {
    let button = document.getElementById(circ);
    button.classList.add("light");
    setTimeout( () => {
        button.classList.remove("light");
    }, 400);
}

function playerTurn() {
    let i = game.playerMoves.length - 1;
    if (game.currentGame[i] === game.playerMoves[i]) {
        if (i === game.currentGame.length - 1) {
            ++game.score;
            showScore();
            addTurn();
        }
    }
    else {
        alert("Wrong Move!");
        newGame();
    }
}

module.exports = {game, newGame, showScore, addTurn, showTurns, lightsOn, playerTurn};