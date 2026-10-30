const { BrowserWindow } = require('electron')
const path = require('path');

let modalWin;
let mainWin;

async function createWindow(width, height) {
    let win = await new BrowserWindow({
        width: width,
        height: height,
        frame: false,
        icon: path.join(__dirname, '..', 'images', 'HALLS_LOGO_SMALL.png'),
        backgroundColor: '#222222',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            nodeIntegrationInSubFrames: true
        }
    });
    return Promise.resolve(win)
}

function getMainWin() {return mainWin;}
function getModalWin() {return modalWin;}

function setMainWin(win) {mainWin = win;}
function setModalWin(win) {modalWin = win;}


module.exports = { createWindow, getMainWin, getModalWin, setMainWin, setModalWin }