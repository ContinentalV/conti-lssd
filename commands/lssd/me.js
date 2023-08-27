const {
    ContextMenuCommandBuilder,
    ApplicationCommandType,
    EmbedBuilder,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder,
    ComponentType, SlashCommandBuilder
} = require('discord.js');
const dayjs = require('dayjs')
const dbLssd = require('../../models/lssd')
const { minToHeure, showHistoryPds,  } = require('../../function/functions')





module.exports = {

    data: new SlashCommandBuilder()
        .setName('mes-heures')
        .setDescription('Prendre son service'),
    async execute(interaction) {

        const { client, member, user, guild } = interaction

        const LSSD = await dbLssd.findOne({ id: user.id })
        const {
            avatar,
            discordName
        } = LSSD

        let work = await minToHeure(LSSD.service.workingTime)
        const embeds = new EmbedBuilder()
            .setColor('Random')
            .setTitle(`Profile de: ${discordName}`)
            .setDescription(`
            ━━━━━━━━━❪❃❫━━━━━━━━━
            > - Temps effectuer: \`\`${work.hours ? ` ${work.hours} Heures et ${work.minute} minutes` : `0 Heures et ${work.minute} minutes`}\`\`
            > - Derniere prise de service: \`\` ${dayjs(LSSD?.historique[LSSD?.historique?.length - 1]?.pds).format('DD-MM-YYYY - HH:mm:ss')} \`\`  
            ━━━━━━━━━❪❃❫━━━━━━━━━`)
            .setTimestamp()
            .setThumbnail(avatar)
            .setFooter({ text: `Request by ${member.nickname}`, iconURL: member.displayAvatarURL({ dynamic: true }) })
            interaction.reply({embeds: [embeds], ephemeral:true})
    }
}



























