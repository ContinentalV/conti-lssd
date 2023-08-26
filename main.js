const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');

const fs = require('fs');
const logLoad = require('./logs/logsload');
const mongoose = require('mongoose');
require('dotenv').config();
const TOKEN = process.env.TOKEN;



const client = new Client({
  intents: [GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent,
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildPresences,
  GatewayIntentBits.DirectMessages,]
});
client.commands = new Collection();
module.exports = client;






fs.readdirSync('./handlers').forEach(handler => {
  require(`./handlers/${handler}`)(client);
  logLoad('handlers', handler, true)
});


mongoose.connect(process.env.MONGO_URI, {}).then(() => {
  logLoad('mongoose', 'Connected to database', true)
}).catch((err) => {
  logLoad('mongoose', 'Error while connecting to database', false)
  console.log(err)
})



client.login(TOKEN);
client.on('guildMemberAdd', (member) => {

  console.log(member.user.username)
})

