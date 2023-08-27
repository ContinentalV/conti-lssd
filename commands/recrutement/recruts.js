const { SlashCommandBuilder } = require('discord.js')
const dbLssd = require('../../models/lssd')

const axios = require('axios');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('recrutement')
        .setDescription('recrrute et creer le profil d\'un agent')

        .addUserOption(option =>
            option
                .setName("agent-lssd")
                .setDescription('Veuillez selectionner l\'agent a recruter ')
                .setRequired(true))
        .addStringOption(option =>
        option
            .setName('nom')
            .setDescription("Indiquez le Nom de l'agent")
            .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('prenom')
                .setDescription("Indiquez le Prénom de l'agent")
                .setRequired(true)
        )
        .addNumberOption(option =>
            option
                .setName('matricule')
                .setDescription("Indiquez le matricule de l'agent")
                .setRequired(true)
        )
    ,
    async execute(interaction) {

        const {member, user, guild, client, options } = interaction;
        const targetId = options.getUser('agent-lssd').id
        const matricule = options.getNumber('matricule')
        const LSSD = await dbLssd.findOne({id: targetId})

        const target = await guild.members.fetch(targetId)
            .then((m) => console.log(m))
        //target.setNickname( `${matricule} | ${options.getString('nom')}`)



            const dataToUpdate = {
                nom: options.getString('nom') ,
                prenom: options.getString('prenom'),
                matricule: '',
            }

            interaction.reply({content: JSON.stringify(dataToUpdate)})


    }
}