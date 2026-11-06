const { ipcRenderer } = require('electron');
function q(q) { return document.querySelector(q); }

function getDetails() {
    const username = q('#username').value;
    const password = q('#password').value;
    return { username, password };
}

async function login() {
    const { username, password } = getDetails();
    const status = await ipcRenderer.invoke('login', username, password);

    if (status === 200) ipcRenderer.send('change-page', './iframe.html');
    else if ([401, 404].includes(status)) alert('Invalid username or password!');
    else alert(`Something went wrong! (${status})`);
}

async function register() {
    const { username, password } = getDetails();
    const status = await ipcRenderer.invoke('register', username, password);

    if (status === 200) ipcRenderer.send('change-page', './iframe.html');
    else if (status === 409) alert('Username already taken!');
    else alert(`Something went wrong! (${status})`);
}