class FileManager {
    constructor() {
        this._fs = require('fs');
        this._path = require('path');
        this._os = require('os');

        if (this._os.type() == 'Linux') this._location = this._path.join(this._os.homedir(), '.local', 'share', 'halls');
        else if (this._os.type() == 'Windows_NT') this._location = this._path.join(this._os.homedir(), 'AppData', 'Local', 'halls');

        if (!this._fs.existsSync(this._location)) this._fs.mkdirSync(this._location);
    }

    get location() { return this._location; }

    getConfig() {
        try {
            let config = this._fs.readFileSync(this._path.join(this._location, 'config.json')) || '{}';
            return JSON.parse(config);
        } catch { return {}; };
    }
    setConfig(config) { this._fs.writeFileSync(this._path.join(this._location, 'config.json'), JSON.stringify(config)); }

    getKey(key) {
        let config = this.getConfig();
        return config[key];
    }

    setKey(key, value) {
        let config = this.getConfig();
        config[key] = value;
        this.setConfig(config);
    }
}

module.exports = new FileManager();