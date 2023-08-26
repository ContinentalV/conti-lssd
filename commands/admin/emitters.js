const {SlashCommandBuilder, Events} = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('emitters')
        .setDescription('Search for an emitter')
        .addStringOption(option =>
            option
                .setName('params')
                .setDescription('params for emitter')
                .setRequired(true)
                .addChoices(
                    {name: 'Member', value: 'member'},
                    {name: 'Guild', value: 'guild'},
                ),
        )
        .addStringOption(option =>
            option
                .setName('query')

                .setDescription('The emiiter to search for')
                .setAutocomplete(true),
        ),

    async autocomplete(interaction) {
        const focusedValue = interaction.options.getFocused();
        const choices = interaction.client.eventNames();
        const filtered = choices.filter(choice => choice.startsWith(focusedValue));
        await interaction.respond(
            filtered.map(choice => ({name: choice, value: choice})),
        );
    },

    async execute(interaction) {
        const query = interaction.options.getString('query');
        console.log(query);
        const {options, member, guild, client} = interaction;
        try {
            client.emit(query, member);
            await interaction.reply({
                content: `Event Triggered: ${options.getString('query')}`,
            });
        } catch (error) {

            console.log(error)
            await interaction.reply({
                content: 'An error occurred while executing the command.',
                ephemeral: true,
            });
        }
    },
};
