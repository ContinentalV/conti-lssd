const {Events, AttachmentBuilder} = require('discord.js');
const {createCanvas, Image} = require('@napi-rs/canvas');
const dbLssd = require('../models/lssd')
const grades = require('../utils/grades')


module.exports = {
    name: 'guildMemberAdd',

    async execute(interaction) {
        const {member, user} = interaction
        const LSSDMatricule = await dbLssd.find()
        let matriculTake = [];
        const max = 100;
        const min = 1;
        const body = {
            id: user.id,
            discordName: user.username,
            avatar: user.avatarURL({extension: 'png', size: 1024}),
        }

        LSSDMatricule.forEach(el => matriculTake.push(el.matricule));
        const freeMatricule = Array.from({length: max - min}, (_, index) => index + min)
            .filter(matricul => !matriculTake.includes(matricul));


        if (freeMatricule.length > 0) {

            const randomizeIndex = Math.floor(Math.random() * freeMatricule.length);
            const randomMatricule = freeMatricule[randomizeIndex];
            const fullGrade = grades.deputyTrainee.alias.replace('M', randomMatricule)
            body.matricule = randomMatricule;
            body.grade = fullGrade
        } else {
            return console.log('Plus de matricule disponible.')
        }

        if (!await dbLssd.findOne({id: user.id})) {
            await dbLssd.create(body)
                .then((data) => {
                }, {upsert: true})
        } else return


        return console.log("ok")


    },
}



