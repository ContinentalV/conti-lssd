const { SlashCommandBuilder, EmbedBuilder} = require('discord.js')
const dayjs = require('dayjs')
const dbLssd  = require('../../models/lssd')


module.exports = {
    data: new SlashCommandBuilder()
        .setName('pds')
        .setDescription('Prendre son service'),
    async execute(interaction) {

        const {member, user, client, guild} = interaction;

        const date =  Date.now()
        const LSSD = await dbLssd.findOne({id: user.id})
        console.log(LSSD)
        if(!LSSD) return interaction.reply({content: "Vous n'êtes pas autoriser a effectuer cette commande."})
        if(LSSD.isService) return interaction.reply({content: "Vous êtes déjà en service."})

        LSSD.service.pds = date
        LSSD.isService = true
        await LSSD.save().then((res) => {console.log(res.service)}, {upsert: true})



        const embeds = new EmbedBuilder()
            .setAuthor({name: `Prise de service: ${member.nickname ? member.nickname : user.username }`, iconURL: member.displayAvatarURL({dynamic: true})})
            .setDescription(`> - ${member} <@&${member.roles.highest.id}> - **Prise de service:**  \`\`${dayjs(date).format('DD-MM-YYYY HH:mm:ss')}\`\` `)
            .setThumbnail(client.user.displayAvatarURL({dynamic:true}))
            .setColor("Random")
            .setTimestamp()
            .setFooter({text: "CN5 LSSD", iconURL: client.user.displayAvatarURL({dynamic:true})})

        interaction.reply({embeds: [embeds]})

    }
}