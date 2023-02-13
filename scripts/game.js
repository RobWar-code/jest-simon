game = {
    score: 0,
    currentGame: [],
    playerMoves: [],
    choices: ["button1", "button2", "button3", "button4"],
    turnNumber: 0
}

function newGame () {
    for (button of document.getElementsByClassName("circle")) {
        if (button.getAttribute("data-listener") == "false") {
            button.addEventListener("click", e => {
                move = e.getAttribute("id");
                lightsOn(move);
                game.playerMoves.push(move);
                playerTurn();
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
    game.turnNumber = 0;
    let turns = setInterval( () => {
        lightsOn(game.currentGame[game.turnNumber]);
        game.turnNumber++;
        if (game.turnNumber >= game.currentGame.length) {
            clearInterval(turns);
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

module.exports = {game, newGame, showScore, addTurn, showTurns, lightsOn};