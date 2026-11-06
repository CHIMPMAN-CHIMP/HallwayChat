const SERVER_URL = 'https://halls.theadelaidegame.org';

const { createWindow, getMainWin, getModalWin, setMainWin, setModalWin } = require('./tools/win');
const { sendNotification } = require('./tools/notificationMan');
const FileManager = require('./tools/fileMan');
require("./tools/winMan");
new (require("./tools/tokens"))(SERVER_URL);

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

ipcMain.handle("get-server-url", () => SERVER_URL);
ipcMain.handle("get-token", () => FileManager.getKey('token'));
ipcMain.handle("get-account", () => ({
    username: FileManager.getKey('username'),
    token: FileManager.getKey('token')
}));
ipcMain.on("change-page", (event, page) => getMainWin().webContents.send("change-page", page));