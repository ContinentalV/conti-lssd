const {Events, AttachmentBuilder} = require('discord.js');
const {createCanvas, Image} = require('@napi-rs/canvas');
const dbLssd = require('../models/lssd')


module.exports = {
    name: 'guildMemberAdd',

    async execute(interaction) {
        const {  member, user } = interaction



            const body = {
                id: user.id,
                discordName: user.username,
                grade: 'cadet',
                avatar: user.avatarURL({extension: 'png', size: 1024})
            }


            await dbLssd.create(body)
                .then((data)=> {
                    console.log(data)
                }, {upsert:true})

        return console.log("ok")



    },
}



