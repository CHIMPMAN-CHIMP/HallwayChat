const { createWindow, getMainWin, getModalWin, setMainWin, setModalWin } = require('./tools/win');
const { sendNotification } = require('./tools/notificationMan');
require("./tools/winMan");

const { app, ipcMain } = require('electron');

app.on('ready', async () => {

    console.log('app is ready!')

    let win = await createWindow(400, 600);
    win.loadFile('pages/modals/loading.html');
    setModalWin(win);

})

ipcMain.on("start", async () => {
    let modal = getModalWin();
    if (modal) modal.close();
    setModalWin(undefined);

    sendNotification("Hey Tom", "Chat apps ready");

    let main = getMainWin();
    if (!main) {
        let win = await createWindow(400, 600);
        win.maximize();
        win.loadFile('pages/root.html');
        setMainWin(win);
    }
})
