const { SlashCommandBuilder, EmbedBuilder} = require('discord.js')
const dbLssd = require('../../models/lssd')
const dayjs = require("dayjs");
const grades = require('../../utils/grades')




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
        ),
    async execute(interaction) {

        const {member, user, guild, client, options } = interaction;
        const targetId = options.getUser('agent-lssd').id
        const LSSD = await dbLssd.findOne({id: targetId})

        if(LSSD.profileCompleted) return interaction.reply({content: 'Cette agent a deja été recruter. '})

        const target = await guild.members.fetch(targetId)
        target.setNickname( `${LSSD.grade} | ${options.getString('nom')}`)

        const roleIdGrade = Object.values(grades).find(grade => grade.alias === `${LSSD.grade.replace(LSSD.matricule, "M")}`)

        // const gradeName = guild.roles.cache.find(r => r.id === grade)


            const dataToUpdate = {
                nom: options.getString('nom') ,
                prenom: options.getString('prenom'),
            }
            LSSD.nom = dataToUpdate.nom;
            LSSD.prenom = dataToUpdate.prenom;
            LSSD.profileCompleted = true
            await LSSD.save()

        const embeds = new EmbedBuilder()

            .setDescription(`
# ${member}:  __Vous venez de recruté un nouvel agent:__ 
>>>           - **Nom:** ${dataToUpdate.nom} 
              - **Prénom:** ${dataToUpdate.prenom}
              - **Matricule:** ${LSSD.matricule}
              - **Pseudo sur radio:** ${LSSD.grade} | ${options.getString('nom')} - ${target}
              - **Grade:** ${LSSD.grade} - <@&${roleIdGrade.id}>
              `)
            .setThumbnail(client.user.displayAvatarURL({dynamic:true}))
            .setColor("Random")
            .setTimestamp()
            .setFooter({text: `recruté par ${member.nickname} - LSSD `, iconURL: client.user.displayAvatarURL({dynamic:true})})

            interaction.reply({embeds: [embeds]})


    }
}