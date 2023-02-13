/**
 * @jest-environment jsdom
 */

const { game, newGame, showScore, addTurn, showTurns, lightsOn, playerTurn } = require("../game");

jest.spyOn(window, "alert").mockImplementation(() => {});

beforeEach(() => {
    let fs = require("fs");
    let htmlContent = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(htmlContent);
    document.close();
});

describe("game object contains correct keys", () => {
    test("score exists", () => {
        expect("score" in game).toBe(true);
    });
    test("current game key exists", () => {
        expect("currentGame" in game).toBe(true);
    });
    test("player moves exists", () => {
        expect("playerMoves" in game).toBe(true);
    });
    test("choices exists", () => {
        expect("choices" in game).toBe(true);
    });
    test("button choices are present", () => {
        expect(game.choices).toEqual(["button1", "button2", "button3", "button4"]);
    });
    test("turn number exists", () => {
        expect(game.turnNumber).toBe(0);
    });
});

describe("newGame works correctly", () => {
    beforeEach(() => {
        game.score = 42;
        game.currentGame = ["button3, button4, button1, button2"];
        game.playerMoves = ["button4", "button2", "button1", "button3"];
        document.getElementById("score").innerText = "42";
        newGame();
    });
    test("should set game score to zero", () => {
        expect(game.score).toBe(0);
    });
    test("length of current game array should be one", () => {
        expect(game.currentGame.length).toBe(1);
    });
    test("should clear game player moves array", () => {
        expect(game.playerMoves).toEqual([]);
    });
    test("should display score equals 0", () => {
        expect(document.getElementById("score").innerText).toBe(0);
    });
    test("buttons should have event listener attached", () => {
        let elements = document.getElementsByClassName("circle");
        for (element of elements) {
            expect(element.getAttribute("data-listener")).toEqual("true");
        }
    });
});

describe("game play works correctly", () => {
    beforeEach( () => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
        addTurn();
    });
    afterEach( () => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
    });
    test("Check that add turn adds to length of current game", () => {
        addTurn();
        expect(game.currentGame.length).toBe(2);
    });
    test("Should add correct class for the button", () => {
        let button = document.getElementById(game.currentGame[0]);
        lightsOn(game.currentGame[0]);
        expect(button.classList).toContain("light");
    });
    test("Check the showTurns resets the turn number", () => {
        game.turnNumber = 42;
        showTurns();
        expect(game.turnNumber).toBe(0);
    });
    test("Check if score incremented following player match", () => {
        game.playerMoves.push(game.currentGame[0]);
        playerTurn();
        expect(game.score).toBe(1);
    });
    test("Check if alert raised with wrong move", () => {
        game.playerMoves.push("Wrong");
        playerTurn();
        expect(window.alert).toBeCalledWith("Wrong Move!");
    });
});

