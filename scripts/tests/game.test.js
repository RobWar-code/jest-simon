/**
 * @jest-environment jsdom
 */

const { game } = require("../game");

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
});
