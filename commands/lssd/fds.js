const { SlashCommandBuilder, EmbedBuilder} = require('discord.js')
const dayjs = require('dayjs')
const dbLssd  = require('../../models/lssd')



module.exports = {
    data: new SlashCommandBuilder()
        .setName('fds')
        .setDescription('Mettre fin a son service'),
    async execute(interaction) {
        const {member, user, client, guild} = interaction;
        const date =  Date.now()
        const LSSD = await  dbLssd.findOne({id: user.id})
        if(!LSSD) return interaction.reply({content: "Vous n'êtes pas autoriser a effectuer cette commande."})
        if(!LSSD.isService) return interaction.reply({content: "Vous avez déjà mis fin a votre service"})

        LSSD.service.fds = date
        LSSD.isService = false
        await  LSSD.save()

        const embeds = new EmbedBuilder()
            .setAuthor({name: `Fin  de service: ${member.nickname ? member.nickname : user.username }`, iconURL: member.displayAvatarURL({dynamic: true})})
            .setDescription(`
            >>> - ${member} <@&${member.roles.highest.id}>
            - **Début de service:**\`\`${dayjs(LSSD.service.pds).format('DD-MM-YYYY HH:mm:ss')}\`\`
            - **Fin de service:**\`\`${dayjs(date).format('DD-MM-YYYY HH:mm:ss')}\`\` `)
            .setColor("Random")
            .setTimestamp()
            .setThumbnail(client.user.displayAvatarURL({dynamic:true}))
            .setFooter({text: "LSSD", iconURL: client.user.displayAvatarURL({dynamic:true})})
        await LSSD.updateWorkingTime()
            .then(d => d)
            .catch((err) => console.log(err))

        interaction.reply({embeds: [embeds]})
    }
}

