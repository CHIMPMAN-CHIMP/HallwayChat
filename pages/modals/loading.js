const { ipcRenderer } = require("electron");

let stage = document.querySelector("h2").textContent;
let dotCount = 0;

setInterval(() => {
    dotCount = (dotCount + 1) % 4;
    document.querySelector("h2").textContent = stage + ".".repeat(dotCount);
}, 500);

ipcRenderer.send('start')