const { ipcRenderer } = require('electron');
function q(q) { return document.querySelector(q); }

ipcRenderer.invoke('get-account').then(async account => {
    if (!account) return;
    if (!account.token) return;
    if (!account.username) return;
    const url = await ipcRenderer.invoke('get-server-url');
    
    try {
        const displayName = await fetch(`${url}/get-user-display-name?username=${account.username}&target=${account.username}`, 
            { headers: { Authorization: 'Bearer ' + account.token } });
        let json = await displayName.json();
        q('#self-profile-username-holder').textContent = json.display_name;
    } catch (e) { console.log(e); }

    try {
        const profileImage = await fetch(`${url}/resolve-profile-image?username=${account.username}&target=${account.username}`, 
            { headers: { Authorization: 'Bearer ' + account.token } });
        q('#self-profile-pic > img').src = await profileImage.text();
    } catch (e) { console.log(e); }
    
    try {
        const groups = await fetch(`${url}/get-your-groups?username=${account.username}`, 
            { headers: { Authorization: 'Bearer ' + account.token } });
        let json = await groups.json();
        if (json.groups.length === 0) {
            const div = document.createElement('div');
            div.className = 'no-group';
            div.textContent = 'You are not in any groups. :(';
            q('#groups').appendChild(div);
        }
        json.groups.forEach(group => {
            const div = document.createElement('div');
            div.className = 'group';
            div.textContent = group.name;
            q('#groups').appendChild(div);
        });
    } catch (e) { console.log(e); }
});