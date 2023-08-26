const {SlashCommandBuilder} = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('purge')
        .setDescription('Purge messages'),

    async execute(interaction) {
        const {options, member, guild, client} = interaction;


        const msg = await interaction.channel.messages.fetch({limit: 100, before: interaction.id});

        await interaction.channel.bulkDelete(msg, true);
        await interaction.reply({content: `Purged ${msg.size} messages!`, ephemeral: true});


    }
}