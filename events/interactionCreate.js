const {Events} = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {


        if (interaction.isChatInputCommand()) {
            const command = interaction.client.commands.get(interaction.commandName);
            if (!command) {
                console.error(`No command matching ${interaction.commandName} was found.`);
                return;
            }
            try {
                await command.execute(interaction)
            } catch (error) {
                console.error(`Error executing command ${interaction.commandName}: ${error}`);
            }
        } else if (interaction.isAutocomplete()) {
            const command = interaction.client.commands.get(interaction.commandName);

            if (!command) {
                console.error(`No command matching ${interaction.commandName} was found.`);
                return;
            }
            try {
                await command.autocomplete(interaction)
            } catch (error) {
                console.error(`Error executing command ${interaction.commandName}: ${error}`);
            }
        }


        // if (!interaction.isChatInputCommand()) return;

        // const command = interaction.client.commands.get(interaction.commandName);

        // if (!command) {
        //   console.error(`No command matching ${interaction.commandName} was found.`);
        //   return;

        // }
        // try {
        //   await command.execute(interaction)
        // } catch (error) {
        //   console.error(`Error executing command ${interaction.commandName}: ${error}`);
        // }

    }
}