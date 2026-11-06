const { ipcMain } = require('electron');
const FileManager = require('./fileMan');

class Tokens {
    constructor(server_url) {
        ipcMain.handle('login', async (event, username, password) => {
            const response = await fetch(`${server_url}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            if (response.status === 200) {
                const json = await response.json();
                const token = json.token;
                if (token) {
                    FileManager.setKey('token', token);
                    FileManager.setKey('username', username);
                }
            }
            return response.status
        });

        ipcMain.handle('register', async (event, username, password) => {
            let response = await fetch(`${server_url}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            if (response.status === 200) {
                const json = await response.json();
                const token = json.token;
                if (token) {
                    FileManager.setKey('token', token);
                    FileManager.setKey('username', username);
                }
            }
            return response.status;
        });
    }
}

module.exports = Tokens;