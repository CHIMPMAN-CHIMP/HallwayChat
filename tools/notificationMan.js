const { Notification } = require('electron')

function sendNotification(title, body) {
    const notif = new Notification({ title, body })
    notif.show()
}

module.exports = { sendNotification }