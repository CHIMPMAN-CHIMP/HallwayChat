const {ipcRenderer} = require("electron");
function q(q) {return document.querySelector(q);}

ipcRenderer.invoke('get-token').then(async token => {
    if (!token) return;

    console.log(token);

    const url = await ipcRenderer.invoke('get-server-url');
    const res = await fetch(`${url}/check-token`, { headers: { Authorization: 'Bearer ' + token } })
    const json = await res.json();
    if (json.username) q('iframe').src = "./iframe.html";
})

ipcRenderer.on('change-page', (event, page) => q('iframe').src = page);

document.addEventListener("DOMContentLoaded", () => {

    q("#minimize").addEventListener("click", () => ipcRenderer.send("main-minimize"));
    q("#maximize").addEventListener("click", () => ipcRenderer.send("main-maximize"));
    q("#close").addEventListener("click", () => ipcRenderer.send("main-close"));

    q('iframe').contentWindow.addEventListener('load', () => {
        const doc = q('iframe').contentWindow.document;
        const title = doc?.head?.querySelector('title')?.textContent || '';
        document.querySelector('#left > span').textContent = title ? `: ${title}` : '';
        document.querySelector('title').textContent = title ? `Halls: ${title}` : 'Halls';
    })
})