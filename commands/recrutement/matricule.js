const { SlashCommandBuilder, EmbedBuilder} = require('discord.js')
const dayjs = require('dayjs')
const dbLssd  = require('../../models/lssd')



module.exports = {
    data: new SlashCommandBuilder()
        .setName('matricule')
        .setDescription('Mettre fin a son service'),
    async execute(interaction) {

        const x = Math.floor(Math.random() * 100   )
        console.log(x)


    }
}
