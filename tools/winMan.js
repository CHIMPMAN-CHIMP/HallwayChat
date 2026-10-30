const { ipcMain } = require('electron');
const { getMainWin } = require('./win');

ipcMain.on("main-minimize", () => getMainWin().minimize());
ipcMain.on("main-maximize", () => {
    let win = getMainWin();
    if (win.isMaximized()) win.unmaximize();
    else win.maximize();
});
ipcMain.on("main-close", () => getMainWin().close());