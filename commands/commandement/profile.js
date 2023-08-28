const {
    ContextMenuCommandBuilder,
    ApplicationCommandType,
    EmbedBuilder,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder,
    ComponentType
} = require('discord.js');
const dayjs = require('dayjs')
const dbLssd = require('../../models/lssd')
const { minToHeure, showHistoryPds } = require('../../function/functions')
const { ForceFds, historyButton, backButton,  deleteAbsenceButton } = require('../../config/buttonFile')
const axios = require('axios')
const {headers} = require("../../config/configOptionsJson");



module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('LSSD PROFILE')
        .setType(2),
    async execute(interaction) {

        const { client, member, user, guild } = interaction

        const LSSD = await dbLssd.findOne({ id: interaction.targetUser.id })
        const {
            matricule,
            id,
            isService,
            historique,
            nom,
            prenom,
            grade,
            isCity,
            avatar,

        } = LSSD
        const rowService = new ActionRowBuilder()
            .addComponents(ForceFds, historyButton, backButton);

        try {
            let work = await minToHeure(LSSD.service.workingTime)
            const xRoles = await interaction.guild.members.fetch(interaction.targetUser.id)
            //const gradesTarget  = await dbgrade.findOne({gradeId: grade})
            const response = await axios.get(process.env.FIVEM_URL, {headers})
            const players = response.data.Data.players;
            const final = players.find(obj => obj.identifiers.includes(`discord:${id}`))
            console.log(final)




            const embeds = new EmbedBuilder()
                .setColor('Random')
                .setTitle(`Profile de: ${matricule}`)
                .setDescription(`
            ━━━━━━━━━❪❃❫━━━━━━━━━
            
            ${interaction.targetUser} - ${xRoles.roles.highest} 
            > - Temps effectuer: \`\`${work.hours ? ` ${work.hours} Heures et ${work.minute} minutes` : `0 Heures et ${work.minute} minutes`}\`\`
            > - Derniere prise de service: \`\` ${dayjs(LSSD?.historique[LSSD?.historique?.length - 1]?.pds).format('DD-MM-YYYY - HH:mm:ss')} \`\`
             
            ━━━━━━━━━❪❃❫━━━━━━━━━`)
                .addFields(
                    {
                        name: `EN PDS`,
                        value: ` \`\`${isService ? `🟢🟢🟢\n>  Démarrer à: ${dayjs(LSSD.service.pds).format('DD-MM-YYYY - HH:mm:ss')}` : "🔴🔴🔴"}\`\` `,
                        inline: true
                    },
                    { name: `EN VILLE`, value: ` \`\`${final ? "🟢🟢🟢" : "🔴🔴🔴"}\`\` `, inline: true },
                )
                .setTimestamp()
                .setThumbnail(avatar)
                .setFooter({ text: `Request by ${member.nickname}`, iconURL: member.displayAvatarURL({ dynamic: true }) })


            if (isService === false) ForceFds.setDisabled(true)
            else { ForceFds.setDisabled(false) }

            const ForceMsgInteraction = await interaction.reply({ embeds: [embeds], components: [rowService] })
            const collector = ForceMsgInteraction.createMessageComponentCollector({ componentType: ComponentType.Button, time: 300_000 });

            collector.on('collect', async i => {
                if (i.user.id === interaction.user.id) {



                    if (i.customId === 'force-fds') {
                        const dmEmbed = new EmbedBuilder()
                            .setColor('Random')
                            .setTitle(`Profile de: ${interaction.targetUser.username}`)
                            .setDescription(`
            ━━━━━━━━━❪❃❫━━━━━━━━━
            PDS FORCER PAR UN RESPONSABLE 
            ━━━━━━━━━❪❃❫━━━━━━━━━ 
            
            ${interaction.targetUser}  
            > - Temps effectuer: \`\`${work.hours ? ` ${work.hours} Heures et ${work.minute} minutes` : `0 Heures et ${work.minute} minutes`}\`\`
            > - Derniere prise de service: \`\` ${dayjs(LSSD?.historique[LSSD?.historique?.length -
                            1]?.pds).format('DD-MM-YYYY - HH:mm:ss')} \`\`
           
            ━━━━━━━━━❪❃❫━━━━━━━━━`)
                            .setTimestamp()
                            .setThumbnail(avatar)
                            .setFooter({text: `Request by ${member.nickname}`, iconURL: member.displayAvatarURL({dynamic: true})})
                        const targetDb = await dbLssd.findOne({ id: interaction.targetUser.id })
                        targetDb.service.fds = Date.now();
                        targetDb.isService = false;
                        await targetDb.save()
                        await targetDb.updateWorkingTime()
                        embeds.data.fields[0].value = `\`\`🔴🔴🔴\`\``
                        await ForceFds.setDisabled(true)
                        interaction.targetUser.send({embeds: [dmEmbed]})
                        await i.update({ embeds: [embeds], components: [rowService] })
                        await i.followUp({ content: 'La pds a bien été forcer', ephemeral: true })
                    }
                    if (i.customId === 'history') {

                        const embedsHisoty = new EmbedBuilder()
                            .setColor('Random')
                            .setTitle("Detail des pds")
                            .setTimestamp()
                            .setDescription(`
                        ━━━━━━━━━❪❃❫━━━━━━━━━
                        Détails des prise de service de l'agent: ${interaction.targetUser}
                        ━━━━━━━━━❪❃❫━━━━━━━━━ 
                        ${showHistoryPds(historique, 'DD-MM-YYYY - HH:mm:ss').map((shift) => `> - **Début shift:** \`\`${shift.pds}\`\`\n> - **Fin shift:** \`\`${shift.fds}\`\`\n> - **Temps effectuer:** \`\`${shift.working}\`\` `).join('\n\n')}
                        `)
                        backButton.setDisabled(false)
                        await i.update({ embeds: [embedsHisoty], components: [rowService] })
                    }

                    if (i.customId === 'back') {

                        await i.update({ embeds: [embeds], components: [rowService] })
                    }



                }
            })

            collector.on('end', collected => {
                console.log("Click collecter: " + collected.size)
            })

        }catch (e) {
            console.log(e.stack)
        }

    }
}



























