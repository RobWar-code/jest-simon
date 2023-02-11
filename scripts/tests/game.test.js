/**
 * @jest-environment jsdom
 */

beforeEach(() => {
    let fs = require("fs");
    let htmlContent = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(htmlContent);
    document.close();
});
