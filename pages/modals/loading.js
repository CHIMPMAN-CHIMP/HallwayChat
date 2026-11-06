const { ipcRenderer } = require("electron");

async function main() {
    let stage = document.querySelector("h2").textContent;
    let dotCount = 0;

    setInterval(() => {
        dotCount = (dotCount + 1) % 4;
        document.querySelector("h2").textContent = stage + ".".repeat(dotCount);
    }, 500);

    const server_url = await ipcRenderer.invoke('get-server-url');
    const response = await fetch(`${server_url}/`);
    if (!response.ok) {
        ss = i => stage = `Unable to connect to server, retrying in ${i}`
        ss(5);
        setTimeout(() => ss(4), 1000);
        setTimeout(() => ss(3), 2000);
        setTimeout(() => ss(2), 3000);
        setTimeout(() => ss(1), 4000);
        setTimeout(main, 5000);
        return;
    } else stage = "Connected to server";

    ipcRenderer.send('start')
}

main();