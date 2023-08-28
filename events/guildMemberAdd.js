const {Events, AttachmentBuilder} = require('discord.js');
const {createCanvas, Image} = require('@napi-rs/canvas');
const dbLssd = require('../models/lssd')
const grades = require('../utils/grades')


module.exports = {
    name: 'guildMemberAdd',

    async execute(interaction) {
        const {member, user, guild} = interaction
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
            const target = await guild.members.fetch(user.id)
            const roleDept =   guild.roles.cache.find(r => r.id === grades.deputyTrainee.id)
            const role1 =   guild.roles.cache.find(r => r.id === "822594177753284659")
            const role2 =   guild.roles.cache.find(r => r.id === "830775241726361617")

            body.matricule = randomMatricule;
            body.grade = fullGrade
            target.roles.add(roleDept)
            target.roles.add(role1)
            target.roles.add(role2)
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



