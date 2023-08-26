const {Events, ActivityType} = require('discord.js');
const logLoad = require('../logs/logsload');




module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        logLoad('client', `${client.user.username} est prêt: 🪡🆗`, true)






    }
}