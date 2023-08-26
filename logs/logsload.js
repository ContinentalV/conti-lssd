const chalk = require('chalk');

function logLoad(type, name, success, error) {
  let logType;

  if (success) {
    logType = chalk.green.bold('[SUCCESS]');
  } else {
    logType = chalk.red.bold('[ERROR]');
  }

  let color;

  if (type === 'event') {
    color = chalk.yellow;
  } else if (type === 'command') {
    color = chalk.magenta;
  } else if (type === 'client') {
    color = chalk.blue;
  } else if (type === 'db') {
    color = chalk.gray;
  } else {
    color = chalk.hex('#FFA500');
  }

  console.log(color.bold(`[${type.toUpperCase()}] - Chargement de ${name}:`), logType);

  if (error) {
    console.error(chalk.yellow('Message:'), error);
  }
}

module.exports = logLoad;
