const {ipcRenderer} = require("electron");

function q(q) {return document.querySelector(q);}

document.addEventListener("DOMContentLoaded", () => {

    q("#minimize").addEventListener("click", () => ipcRenderer.send("main-minimize"));
    q("#maximize").addEventListener("click", () => ipcRenderer.send("main-maximize"));
    q("#close").addEventListener("click", () => ipcRenderer.send("main-close"));

})