
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const logLoad = require('../logs/logsload');




module.exports = (client) => {
  const foldersPath = path.join(__dirname, './../commands');

  const commandFolders = fs.readdirSync(foldersPath);
  for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs
      .readdirSync(commandsPath)
      .filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const command = require(filePath);
      // Set a new item in the Collection with the key as the command name and the value as the exported module
      if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);

        logLoad('command', command.data.name, true);

      } else {
        console.log((`{Commands}-[ERROR]:: La commande: ${command.data.name} \n path: ${filePath} \n state: n'a pas pu être charger.(require data or execute)`));
      }
    }
  }
}


