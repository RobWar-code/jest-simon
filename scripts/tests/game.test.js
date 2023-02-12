/**
 * @jest-environment jsdom
 */

const { game, newGame, showScore, addTurn, showTurn } = require("../game");

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
});
