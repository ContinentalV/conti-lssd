const {ButtonBuilder, ButtonStyle} = require("discord.js");

const ForceFds = new ButtonBuilder()
    .setCustomId("force-fds")
    .setLabel('Forcez la FDS')
    .setStyle(ButtonStyle.Danger)
    .setEmoji('1111599683752706049')

const historyButton = new ButtonBuilder()
    .setCustomId("history")
    .setLabel('Details des pds')
    .setStyle(ButtonStyle.Primary)
    .setEmoji('1115429544233554001')


const backButton = new ButtonBuilder()
    .setCustomId("back")
    .setLabel('Back')
    .setStyle(ButtonStyle.Secondary)
    .setEmoji('1115429544233554001')
    .setDisabled(true)


const finishButton = new ButtonBuilder()
    .setLabel('Finish')
    .setCustomId('finish')
    .setStyle(ButtonStyle.Success)

const confirm = new ButtonBuilder()

    .setLabel('Confirmez le clear des heures')
    .setCustomId('confirm')
    .setStyle(ButtonStyle.Success)


const refused = new ButtonBuilder()

    .setLabel('Annulez le clear des heures')
    .setCustomId('refused')
    .setStyle(ButtonStyle.Danger)

const clearButton = new ButtonBuilder()

    .setLabel('Reset des heures')
    .setCustomId('clear')
    .setStyle(ButtonStyle.Danger)
    .setEmoji("1065114682463096925")

const deleteAbsenceButton = new ButtonBuilder()

    .setLabel('Supprimer derniere absence')
    .setCustomId('delabsence')
    .setStyle(ButtonStyle.Danger)
    .setEmoji("1121676304627028062")

module.exports =  {
    ForceFds, historyButton, backButton, finishButton, clearButton, confirm, refused, deleteAbsenceButton
}


